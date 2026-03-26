import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3345e4d2-6a9b-485a-9bd1-384ca648e1e9/files/543d7606-0cf8-4aec-88e3-aab3f77274a1.jpg";

const NAV_LINKS = [
  { id: "home",     label: "Главная" },
  { id: "about",   label: "О нас" },
  { id: "catalog", label: "Каталог" },
  { id: "price",   label: "Прайс" },
  { id: "contacts",label: "Контакты" },
];

const CATEGORIES = ["Все", "Зерновые", "Овощи", "Фрукты", "Молочное", "Консервы", "Масла и жиры"];

const PRODUCTS = [
  { id: 1,  name: "Пшеница 3 класс",         category: "Зерновые",    price: 12500, unit: "тонна", emoji: "🌾", desc: "ГОСТ 9353-2016, влажность до 14%" },
  { id: 2,  name: "Сахар-песок",              category: "Зерновые",    price: 58000, unit: "тонна", emoji: "🍬", desc: "ГОСТ 21-94, мешки по 50 кг" },
  { id: 3,  name: "Мука пшеничная в/с",       category: "Зерновые",    price: 24000, unit: "тонна", emoji: "🫙", desc: "ГОСТ 26574-2017, фасовка 50 кг" },
  { id: 4,  name: "Картофель столовый",       category: "Овощи",       price: 18000, unit: "тонна", emoji: "🥔", desc: "Сортовой, калибр 50+, мешки 30 кг" },
  { id: 5,  name: "Морковь столовая",         category: "Овощи",       price: 22000, unit: "тонна", emoji: "🥕", desc: "Мытая, фасовка сетки по 25 кг" },
  { id: 6,  name: "Капуста белокочанная",     category: "Овощи",       price: 15000, unit: "тонна", emoji: "🥬", desc: "Поздних сортов, от 1 кг" },
  { id: 7,  name: "Яблоки Голден",            category: "Фрукты",      price: 65000, unit: "тонна", emoji: "🍎", desc: "Калибр 65+, ящики по 18 кг" },
  { id: 8,  name: "Масло подсолнечное",       category: "Масла и жиры",price: 95000, unit: "тонна", emoji: "🫒", desc: "Рафинированное, ПЭТ-бутылки 5 л" },
  { id: 9,  name: "Молоко пастеризованное",   category: "Молочное",    price: 48000, unit: "тонна", emoji: "🥛", desc: "Жирность 3.2%, Тетра Пак 1 л" },
  { id: 10, name: "Консервы томатные",        category: "Консервы",    price: 72000, unit: "тонна", emoji: "🥫", desc: "Паста томатная, жестяные банки 3 кг" },
  { id: 11, name: "Гречиха ядрица",           category: "Зерновые",    price: 35000, unit: "тонна", emoji: "🫘", desc: "1 сорт, ГОСТ Р 55290-2012" },
  { id: 12, name: "Лук репчатый",             category: "Овощи",       price: 16000, unit: "тонна", emoji: "🧅", desc: "Сортовой, сетки по 25 кг" },
];

const STATS = [
  { value: "12+",      label: "лет на рынке",        emoji: "🌻" },
  { value: "500+",     label: "партнёров по России",  emoji: "🤝" },
  { value: "85",       label: "регионов поставок",    emoji: "🗺️" },
  { value: "50 000+",  label: "тонн в год",           emoji: "🚜" },
];

const DOCS = [
  { name: "Прайс-лист",       desc: "Актуальные цены на все позиции",      icon: "FileText",  emoji: "📋" },
  { name: "Договор поставки", desc: "Типовой договор для партнёров",       icon: "FileCheck", emoji: "📝" },
  { name: "Реквизиты",        desc: "Банковские и юридические данные",     icon: "Building2", emoji: "🏦" },
];

const TICKER_ITEMS = [
  "🫒 Масла и жиры", "🧈 Спреды", "🥛 Топлёные смеси", "✨ Топлёное масло",
  "📋 Договор поставки", "🚚 Доставка по России",
];

const DIVIDER = "— ✦ —";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["home"]));
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const filteredProducts = PRODUCTS.filter(p => {
    const catOk = activeCategory === "Все" || p.category === activeCategory;
    const priceOk = p.price <= maxPrice;
    return catOk && priceOk;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
            setActiveSection(entry.target.id);
          }
        });
      },
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      if (res.ok) {
        setFormStatus("ok");
        setForm({ name: "", company: "", phone: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-body overflow-x-hidden" style={{ backgroundColor: '#fdf6e3' }}>

      {/* ═══ NAVBAR ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: '#3d2008', borderBottom: '3px solid #c8812a' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="text-3xl">🌾</span>
            <div className="leading-none">
              <div className="font-display text-xl font-bold italic" style={{ color: '#e8b84b' }}>
                ЮМА ТРЕЙД
              </div>
              <div className="font-hand text-xs" style={{ color: '#f4d98a', opacity: 0.8 }}>
                продукты питания
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-sm px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  color: activeSection === link.id ? '#3d2008' : '#f4d98a',
                  backgroundColor: activeSection === link.id ? '#e8b84b' : 'transparent',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="tel:+74951234567"
            className="hidden md:flex items-center gap-2 font-body font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: '#c8812a', color: '#fdf6e3' }}
          >
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>

          <button className="md:hidden" style={{ color: '#f4d98a' }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 py-4 flex flex-col gap-2" style={{ backgroundColor: '#4a2a10', borderTop: '1px solid #c8812a' }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left font-body text-base py-2 border-b transition-colors"
                style={{ color: '#f4d98a', borderColor: 'rgba(200,129,42,0.2)' }}
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+74951234567"
              className="mt-2 flex items-center justify-center gap-2 font-body font-semibold px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#c8812a', color: '#fdf6e3' }}
            >
              <Icon name="Phone" size={16} />
              +7 (495) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* ═══ TICKER ═══ */}
      <div className="fixed top-16 left-0 right-0 z-40 h-8 overflow-hidden flex items-center" style={{ backgroundColor: '#c8812a' }}>
        <div className="animate-ticker flex gap-16 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-body font-semibold text-sm tracking-wide" style={{ color: '#fdf6e3' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(61,32,8,0.92) 0%, rgba(61,32,8,0.5) 40%, rgba(61,32,8,0.15) 100%)' }} />

        {/* Decorative corner flourishes */}
        <div className="absolute top-28 left-6 text-5xl opacity-30 animate-sway">🌿</div>
        <div className="absolute top-32 right-8 text-4xl opacity-25 animate-float">🌼</div>
        <div className="absolute top-1/3 right-4 text-6xl opacity-20 animate-sway" style={{ animationDelay: '1.5s' }}>🐄</div>

        <div className="relative w-full max-w-7xl mx-auto px-4 pb-0">
          {/* Main hero content */}
          <div className="max-w-3xl mb-0">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 text-xs font-body font-semibold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase"
              style={{ backgroundColor: 'rgba(232,184,75,0.2)', border: '1px solid rgba(232,184,75,0.5)', color: '#e8b84b' }}
            >
              🚜 Прямые поставки по всей России
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold italic leading-none mb-4" style={{ color: '#fdf6e3' }}>
              Настоящие продукты<br />
              <span style={{ color: '#e8b84b' }}>с родной земли</span>
            </h1>

            <p className="font-body text-lg mb-8 max-w-xl leading-relaxed" style={{ color: 'rgba(253,246,227,0.75)' }}>
              Поставки зерновых, масел, спредов и продовольствия оптом — от поля до вашего склада. Работаем честно, как в деревне.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollTo("catalog")}
                className="flex items-center justify-center gap-2 font-body font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#e8b84b', color: '#3d2008' }}
              >
                🛒 Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="flex items-center justify-center gap-2 font-body font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300"
                style={{ border: '2px solid rgba(232,184,75,0.5)', color: '#e8b84b' }}
              >
                ✉️ Написать нам
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-t-3xl overflow-hidden" style={{ backgroundColor: 'rgba(61,32,8,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(200,129,42,0.4)', borderBottom: 'none' }}>
            {STATS.map((stat, i) => (
              <div key={i} className="text-center py-6 px-4" style={{ borderRight: i < 3 ? '1px solid rgba(200,129,42,0.2)' : 'none' }}>
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-display text-2xl md:text-3xl font-bold italic" style={{ color: '#e8b84b' }}>{stat.value}</div>
                <div className="font-body text-xs mt-1" style={{ color: 'rgba(244,217,138,0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ backgroundColor: '#fdf6e3', backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(61,32,8,0.015) 20px, rgba(61,32,8,0.015) 21px)" }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div
            className="grid md:grid-cols-2 gap-16 items-center"
            style={{ opacity: isVisible("about") ? 1 : 0, transform: isVisible("about") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}
          >
            {/* Left — text */}
            <div>
              <div className="font-hand text-brand-amber text-xl mb-2">О нашей компании</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic leading-tight mb-2" style={{ color: '#3d2008' }}>
                Надёжный партнёр
              </h2>
              <div className="font-display text-2xl italic mb-6" style={{ color: '#c8812a' }}>с 2012 года</div>

              <p className="font-body text-base leading-relaxed mb-4" style={{ color: '#4a2a10' }}>
                ЮМА ТРЕЙД — оптовый поставщик продуктов питания с прямыми контрактами с производителями в 20+ регионах России. Мы обеспечиваем стабильные поставки для торговых сетей, производственных предприятий и HoReCa.
              </p>
              <p className="font-body text-sm leading-relaxed mb-8" style={{ color: '#6b3a1f' }}>
                Работаем с сертифицированными производителями, обеспечиваем полный пакет документов: ТТН, сертификаты соответствия, ветеринарные свидетельства.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: "🏅", text: "Сертифицированная продукция" },
                  { emoji: "🚛", text: "Собственная логистика" },
                  { emoji: "🛡️", text: "Гарантия качества" },
                  { emoji: "🤝", text: "Гибкие условия оплаты" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl p-3" style={{ backgroundColor: '#fff8e8', border: '1px solid rgba(200,129,42,0.2)' }}>
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-body text-sm" style={{ color: '#3d2008' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — village card grid */}
            <div className="relative">
              <div className="rounded-3xl p-8" style={{ backgroundColor: '#fff8e8', border: '2px solid rgba(200,129,42,0.25)', boxShadow: '0 8px 40px rgba(61,32,8,0.08)' }}>
                {/* Decorative header */}
                <div className="text-center mb-6">
                  <div className="font-hand text-2xl" style={{ color: '#c8812a' }}>Что мы поставляем</div>
                  <div className="w-24 h-0.5 mx-auto mt-2" style={{ backgroundColor: '#e8b84b' }} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🌾", label: "Зерновые" },
                    { emoji: "🥔", label: "Овощи" },
                    { emoji: "🍎", label: "Фрукты" },
                    { emoji: "🥛", label: "Молочное" },
                    { emoji: "🫒", label: "Масла" },
                    { emoji: "🥫", label: "Консервы" },
                  ].map((cat, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-4 text-center transition-all duration-300 cursor-default group hover:scale-105"
                      style={{ backgroundColor: '#fdf6e3', border: '1px solid rgba(200,129,42,0.15)' }}
                    >
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="font-body text-xs font-semibold" style={{ color: '#6b3a1f' }}>{cat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating accent */}
              <div className="absolute -top-5 -right-5 text-5xl animate-float">🌻</div>
              <div className="absolute -bottom-4 -left-4 text-4xl animate-sway" style={{ animationDelay: '1s' }}>🐄</div>
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div className="text-center pb-8 font-hand text-xl" style={{ color: '#c8812a', opacity: 0.5 }}>
          {DIVIDER}
        </div>
      </section>

      {/* ═══ CATALOG ═══ */}
      <section id="catalog" style={{ backgroundColor: '#fff8e8' }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div
            style={{ opacity: isVisible("catalog") ? 1 : 0, transform: isVisible("catalog") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="font-hand text-2xl mb-1" style={{ color: '#c8812a' }}>прямо с полей</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: '#3d2008' }}>
                Наш ассортимент
              </h2>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: '#e8b84b' }} />
            </div>

            {/* Filters row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="font-body font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200"
                    style={
                      activeCategory === cat
                        ? { backgroundColor: '#3d2008', color: '#e8b84b' }
                        : { backgroundColor: '#fdf6e3', color: '#6b3a1f', border: '1px solid rgba(107,58,31,0.25)' }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-1 min-w-[220px]">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm" style={{ color: '#8b5e3c' }}>Цена до</span>
                  <span className="font-body font-bold" style={{ color: '#c8812a' }}>{maxPrice.toLocaleString()} ₽/т</span>
                </div>
                <input
                  type="range" min={12000} max={100000} step={1000} value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full cursor-pointer accent-amber-700"
                />
              </div>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl p-5 group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default"
                  style={{ backgroundColor: '#fdf6e3', border: '1.5px solid rgba(200,129,42,0.2)', boxShadow: '0 2px 12px rgba(61,32,8,0.06)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{product.emoji}</div>
                    <div
                      className="text-xs font-body font-semibold px-2 py-1 rounded-lg"
                      style={{ backgroundColor: 'rgba(200,129,42,0.12)', color: '#8b5e3c' }}
                    >
                      {product.category}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold italic mb-1 group-hover:text-amber-700 transition-colors" style={{ color: '#3d2008' }}>
                    {product.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: '#8b5e3c' }}>
                    {product.desc}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display text-2xl font-bold italic" style={{ color: '#c8812a' }}>
                        {product.price.toLocaleString()} ₽
                      </div>
                      <div className="font-body text-xs" style={{ color: '#8b5e3c' }}>за {product.unit}</div>
                    </div>
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="text-xs font-body font-bold px-3 py-2 rounded-xl transition-all duration-200 hover:opacity-80"
                      style={{ backgroundColor: '#3d2008', color: '#e8b84b' }}
                    >
                      Запрос цены
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 font-body" style={{ color: '#8b5e3c' }}>
                <div className="text-5xl mb-4">🔍</div>
                Ничего не найдено по выбранным фильтрам
              </div>
            )}
          </div>
        </div>

        <div className="text-center pb-8 font-hand text-xl" style={{ color: '#c8812a', opacity: 0.5 }}>{DIVIDER}</div>
      </section>

      {/* ═══ DOCUMENTS ═══ */}
      <section id="price" style={{ backgroundColor: '#fdf6e3' }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div
            style={{ opacity: isVisible("price") ? 1 : 0, transform: isVisible("price") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}
          >
            <div className="text-center mb-14">
              <div className="font-hand text-2xl mb-1" style={{ color: '#c8812a' }}>скачайте и сохраните</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: '#3d2008' }}>
                Прайс и документы
              </h2>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: '#e8b84b' }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {DOCS.map((doc, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer"
                  style={{ backgroundColor: '#fff8e8', border: '2px solid rgba(200,129,42,0.2)', boxShadow: '0 4px 20px rgba(61,32,8,0.07)' }}
                >
                  <div className="text-5xl mb-5">{doc.emoji}</div>
                  <h3 className="font-display text-xl font-bold italic mb-2 group-hover:text-amber-700 transition-colors" style={{ color: '#3d2008' }}>
                    {doc.name}
                  </h3>
                  <p className="font-body text-sm mb-6" style={{ color: '#8b5e3c' }}>{doc.desc}</p>
                  <div className="flex items-center gap-2 font-body text-sm font-semibold" style={{ color: '#c8812a' }}>
                    <Icon name="Download" size={16} />
                    Скачать
                  </div>
                </div>
              ))}
            </div>

            {/* CTA banner */}
            <div
              className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: 'linear-gradient(135deg, #3d2008 0%, #6b3a1f 100%)', boxShadow: '0 8px 40px rgba(61,32,8,0.2)' }}
            >
              <div>
                <div className="font-hand text-xl mb-1" style={{ color: '#e8b84b' }}>не теряйте время!</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold italic" style={{ color: '#fdf6e3' }}>
                  Нужен актуальный прайс?
                </h3>
                <p className="font-body text-base mt-2 max-w-md" style={{ color: 'rgba(253,246,227,0.65)' }}>
                  Оставьте заявку — пришлём прайс-лист и договор поставки в течение 30 минут
                </p>
              </div>
              <button
                onClick={() => scrollTo("contacts")}
                className="whitespace-nowrap flex items-center gap-3 font-body font-bold text-base px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#e8b84b', color: '#3d2008' }}
              >
                <Icon name="Send" size={18} />
                Запросить прайс
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pb-8 font-hand text-xl" style={{ color: '#c8812a', opacity: 0.5 }}>{DIVIDER}</div>
      </section>

      {/* ═══ CONTACTS ═══ */}
      <section id="contacts" style={{ backgroundColor: '#fff8e8' }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div
            style={{ opacity: isVisible("contacts") ? 1 : 0, transform: isVisible("contacts") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}
          >
            <div className="text-center mb-14">
              <div className="font-hand text-2xl mb-1" style={{ color: '#c8812a' }}>заходите в гости</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: '#3d2008' }}>
                Свяжитесь с нами
              </h2>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: '#e8b84b' }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact cards */}
              <div className="space-y-4">
                {[
                  { icon: "Phone",  label: "Телефон",        value: "+7 (495) 123-45-67",  href: "tel:+74951234567",          emoji: "📞" },
                  { icon: "Mail",   label: "Email",           value: "info@yumatrade.ru",    href: "mailto:info@yumatrade.ru",  emoji: "📧" },
                  { icon: "MapPin", label: "Адрес",           value: "г. Москва, ул. Пищевая, 1", href: "#",                  emoji: "📍" },
                  { icon: "Clock",  label: "Режим работы",    value: "Пн–Пт: 9:00–18:00",   href: "#",                        emoji: "🕘" },
                ].map((contact, i) => (
                  <a
                    key={i}
                    href={contact.href}
                    className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 group hover:scale-[1.01]"
                    style={{ backgroundColor: '#fdf6e3', border: '1.5px solid rgba(200,129,42,0.2)', boxShadow: '0 2px 12px rgba(61,32,8,0.05)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300"
                      style={{ backgroundColor: 'rgba(200,129,42,0.12)' }}
                    >
                      {contact.emoji}
                    </div>
                    <div>
                      <div className="font-body text-xs mb-0.5" style={{ color: '#8b5e3c' }}>{contact.label}</div>
                      <div className="font-body font-semibold group-hover:text-amber-700 transition-colors" style={{ color: '#3d2008' }}>
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}

                <div className="flex gap-3 pt-2">
                  {[
                    { label: "WhatsApp", emoji: "💬", color: '#25d366' },
                    { label: "Telegram", emoji: "✈️", color: '#229ed9' },
                  ].map((soc, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 font-body font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 flex-1 justify-center hover:opacity-85 hover:scale-[1.02]"
                      style={{ backgroundColor: soc.color, color: '#fff' }}
                    >
                      {soc.emoji} {soc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleFormSubmit}
                className="rounded-3xl p-8"
                style={{ backgroundColor: '#fdf6e3', border: '2px solid rgba(200,129,42,0.2)', boxShadow: '0 4px 30px rgba(61,32,8,0.08)' }}
              >
                <div className="font-hand text-xl mb-1" style={{ color: '#c8812a' }}>напишите нам</div>
                <h3 className="font-display text-2xl font-bold italic mb-6" style={{ color: '#3d2008' }}>Оставить заявку</h3>

                {formStatus === "ok" ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="text-6xl">🎉</div>
                    <div className="font-display text-2xl italic font-bold text-center" style={{ color: '#3d2008' }}>Заявка отправлена!</div>
                    <div className="font-body text-center" style={{ color: '#8b5e3c' }}>Мы свяжемся с вами в течение 30 минут</div>
                    <button type="button" onClick={() => setFormStatus("idle")} className="mt-4 font-body text-sm underline" style={{ color: '#8b5e3c' }}>
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { label: "Ваше имя *",   name: "name",    type: "text",  placeholder: "Иван Иванов",         required: true },
                      { label: "Компания",      name: "company", type: "text",  placeholder: "ООО «Пример»",        required: false },
                      { label: "Телефон *",     name: "phone",   type: "tel",   placeholder: "+7 (___) ___-__-__",  required: true },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="font-body text-xs mb-2 block" style={{ color: '#8b5e3c' }}>{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleFormChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full font-body rounded-xl px-4 py-3 outline-none transition-colors"
                          style={{ backgroundColor: '#fff8e8', border: '1.5px solid rgba(200,129,42,0.25)', color: '#3d2008' }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="font-body text-xs mb-2 block" style={{ color: '#8b5e3c' }}>Что интересует?</label>
                      <textarea
                        rows={3} name="message" value={form.message} onChange={handleFormChange}
                        placeholder="Опишите потребность или укажите интересующие позиции..."
                        className="w-full font-body rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                        style={{ backgroundColor: '#fff8e8', border: '1.5px solid rgba(200,129,42,0.25)', color: '#3d2008' }}
                      />
                    </div>
                    {formStatus === "error" && (
                      <div className="font-body text-sm text-center text-red-600">
                        Ошибка отправки. Пожалуйста, позвоните нам напрямую.
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full font-body font-bold text-base py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ backgroundColor: '#3d2008', color: '#e8b84b' }}
                    >
                      <Icon name={formStatus === "sending" ? "Loader" : "Send"} size={18} />
                      {formStatus === "sending" ? "Отправляем..." : "Отправить заявку"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ backgroundColor: '#3d2008', borderTop: '3px solid #c8812a' }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌾</span>
              <div>
                <div className="font-display text-xl font-bold italic" style={{ color: '#e8b84b' }}>ЮМА ТРЕЙД</div>
                <div className="font-hand text-xs" style={{ color: 'rgba(244,217,138,0.6)' }}>продукты питания оптом</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-sm transition-colors hover:opacity-80"
                  style={{ color: 'rgba(244,217,138,0.55)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="font-body text-sm text-center" style={{ color: 'rgba(244,217,138,0.35)' }}>
              © 2024 ЮМА ТРЕЙД
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}