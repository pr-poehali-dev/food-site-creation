import { useState, useEffect } from "react";
import { C, NAV_LINKS } from "@/components/site/constants";
import SiteHeader from "@/components/site/SiteHeader";
import HeroAboutCatalog from "@/components/site/HeroAboutCatalog";
import PriceContacts from "@/components/site/PriceContacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["home"]));
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
          setActiveSection(entry.target.id);
        }
      }),
      { threshold: 0.1 }
    );
    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setFormStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/3d8d3969-0789-45a9-938b-3b78ac5b9cba", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setFormStatus("ok"); setForm({ name: "", company: "", phone: "", message: "" }); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  return (
    <div className="min-h-screen font-body overflow-x-hidden" style={{ backgroundColor: C.cream }}>
      <SiteHeader
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroAboutCatalog
        isVisible={isVisible}
        scrollTo={scrollTo}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <PriceContacts
        isVisible={isVisible}
        scrollTo={scrollTo}
        form={form}
        formStatus={formStatus}
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        setFormStatus={setFormStatus}
      />
    </div>
  );
}
