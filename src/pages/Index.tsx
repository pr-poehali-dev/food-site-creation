import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3345e4d2-6a9b-485a-9bd1-384ca648e1e9/files/543d7606-0cf8-4aec-88e3-aab3f77274a1.jpg";

// ── Палитра ──────────────────────────────────────────────
const C = {
  earth:  '#2a1200',   // очень тёмный тёмно-коричневый фон шапки
  brown:  '#5c2d0a',   // коричневый
  amber:  '#d4780a',   // насыщенный оранжево-янтарный
  gold:   '#f0a500',   // яркое золото
  sunny:  '#ffd130',   // солнечно-жёлтый
  straw:  '#fff0a0',   // соломенный светлый
  cream:  '#fffbef',   // молочный фон
  warm:   '#fff5d6',   // чуть желтее
  grass:  '#2e7d1e',   // сочный луговой зелёный
  meadow: '#4caf32',   // яркая зелень
  leaf:   '#7dd44a',   // светло-зелёный
  red:    '#c0392b',   // акцент красный
};

const NAV_LINKS = [
  { id: "home",     label: "Главная" },
  { id: "about",   label: "О нас" },
  { id: "catalog", label: "Каталог" },
  { id: "price",   label: "Прайс" },
  { id: "contacts",label: "Контакты" },
];

const CATEGORIES = ["Все", "Спреды", "Масло", "Сыры", "Топлёные смеси", "Топлёное масло"];

const PRODUCTS = [
  { id: 1,  name: "Спред растительно-сливочный",  category: "Спреды",         emoji: "🧈", desc: "Жирность 72.5%, брикеты 180 г и 500 г" },
  { id: 2,  name: "Спред сливочно-растительный",  category: "Спреды",         emoji: "🧈", desc: "Жирность 82.5%, фасовка по заказу" },
  { id: 3,  name: "Спред «Молочный Вальс»",       category: "Спреды",         emoji: "🧈", desc: "Собственная ТМ. Мягкий вкус, натуральный состав" },
  { id: 4,  name: "Масло сливочное ГОСТ",         category: "Масло",          emoji: "🫙", desc: "Жирность 82.5%, фольга 200 г / монолит 20 кг" },
  { id: 5,  name: "Масло крестьянское",           category: "Масло",          emoji: "🫙", desc: "Жирность 72.5%, ГОСТ 32261-2013" },
  { id: 6,  name: "Масло «Молочный Вальс»",       category: "Масло",          emoji: "🫙", desc: "Собственная ТМ. Традиционный рецепт" },
  { id: 7,  name: "Сыр твёрдый «Российский»",    category: "Сыры",           emoji: "🧀", desc: "Жирность 50%, головки по 5–6 кг" },
  { id: 8,  name: "Сыр полутвёрдый «Гауда»",     category: "Сыры",           emoji: "🧀", desc: "Жирность 45%, фасовка от 500 г" },
  { id: 9,  name: "Сыр «Молочный Вальс»",         category: "Сыры",           emoji: "🧀", desc: "Собственная ТМ. Нежный и ароматный" },
  { id: 10, name: "Топлёная смесь классическая",  category: "Топлёные смеси", emoji: "✨", desc: "Жирность 99%, монолит 25 кг" },
  { id: 11, name: "Топлёная смесь премиум",       category: "Топлёные смеси", emoji: "✨", desc: "Высшая очистка, нейтральный вкус" },
  { id: 12, name: "Топлёное масло Ghee",          category: "Топлёное масло", emoji: "🫒", desc: "Жирность 99.9%, банки 0.5 л и 1 л" },
  { id: 13, name: "Топлёное масло «Молочный Вальс»", category: "Топлёное масло", emoji: "🫒", desc: "Собственная ТМ. Традиционный деревенский рецепт" },
];

const STATS = [
  { value: "Екб",     label: "Свердловская область", emoji: "📍" },
  { value: "500+",    label: "партнёров по России",  emoji: "🤝" },
  { value: "85",      label: "регионов поставок",    emoji: "🗺️" },
  { value: "50 000+", label: "тонн в год",           emoji: "🚜" },
];

const DOCS = [
  { name: "Прайс-лист",       desc: "Актуальные цены на все позиции",  icon: "FileText",  emoji: "📋", bg: C.gold },
  { name: "Договор поставки", desc: "Типовой договор для партнёров",   icon: "FileCheck", emoji: "📝", bg: C.meadow },
  { name: "Реквизиты",        desc: "Банковские и юридические данные", icon: "Building2", emoji: "🏦", bg: C.amber },
];

const TICKER_ITEMS = [
  "🫒 Масла и жиры", "🧈 Спреды", "🥛 Топлёные смеси", "✨ Топлёное масло",
  "📋 Договор поставки", "🚚 Доставка по России",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["home"]));
  const [form, setForm] = useState({ name: "", company: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const filteredProducts = PRODUCTS.filter(p =>
    activeCategory === "Все" || p.category === activeCategory
  );

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

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: `linear-gradient(135deg, ${C.earth} 0%, ${C.brown} 100%)`, borderBottom: `4px solid ${C.gold}`, boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">🌾</span>
            <div className="leading-none">
              <div className="font-display text-xl font-bold italic" style={{ color: C.sunny }}>ЮМА ТРЕЙД</div>
              <div className="font-hand text-xs" style={{ color: C.straw, opacity: 0.9 }}>продукты питания</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-sm px-4 py-2 rounded-full transition-all duration-200 font-semibold"
                style={activeSection === link.id
                  ? { backgroundColor: C.gold, color: C.earth, boxShadow: `0 0 14px ${C.gold}88` }
                  : { color: C.straw }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="tel:+74951234567"
            className="hidden md:flex items-center gap-2 font-body font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 100%)`, color: C.earth, boxShadow: `0 4px 16px ${C.amber}66` }}
          >
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>

          <button className="md:hidden" style={{ color: C.gold }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 py-4 flex flex-col gap-2" style={{ backgroundColor: C.brown, borderTop: `2px solid ${C.amber}` }}>
            {NAV_LINKS.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="text-left font-body text-base py-2.5 border-b font-semibold transition-colors hover:pl-2"
                style={{ color: C.sunny, borderColor: `${C.amber}33` }}>
                {link.label}
              </button>
            ))}
            <a href="tel:+74951234567"
              className="mt-2 flex items-center justify-center gap-2 font-body font-bold px-4 py-3 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`, color: C.earth }}>
              <Icon name="Phone" size={16} />+7 (495) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          TICKER
      ══════════════════════════════════════ */}
      <div className="fixed top-16 left-0 right-0 z-40 h-9 overflow-hidden flex items-center"
        style={{ background: `linear-gradient(90deg, ${C.grass} 0%, ${C.meadow} 50%, ${C.grass} 100%)`, boxShadow: '0 3px 12px rgba(46,125,30,0.5)' }}>
        <div className="animate-ticker flex gap-16 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-body font-bold text-sm tracking-wide" style={{ color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: 'brightness(1.05) saturate(1.2)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30,12,0,0.93) 0%, rgba(30,12,0,0.55) 45%, rgba(30,12,0,0.1) 100%)' }} />

        {/* Яркие плавающие акценты */}
        <div className="absolute top-28 left-8 text-6xl opacity-60 animate-sway drop-shadow-xl">🌿</div>
        <div className="absolute top-36 right-10 text-5xl opacity-50 animate-float drop-shadow-xl">🌼</div>
        <div className="absolute top-1/3 right-6 text-7xl opacity-40 animate-sway drop-shadow-2xl" style={{ animationDelay: '1.5s' }}>🐄</div>
        <div className="absolute bottom-52 left-12 text-4xl opacity-40 animate-float drop-shadow-lg" style={{ animationDelay: '0.8s' }}>🌻</div>

        <div className="relative w-full max-w-7xl mx-auto px-4 pb-0">
          <div className="max-w-3xl mb-0">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 text-xs font-body font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase"
              style={{ background: `linear-gradient(135deg, ${C.meadow}33, ${C.meadow}11)`, border: `2px solid ${C.meadow}`, color: C.leaf, backdropFilter: 'blur(4px)' }}>
              🚜 Прямые поставки по всей России
            </div>

            <h1 className="font-display font-bold italic leading-none mb-5" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#ffffff', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
              Настоящие продукты<br />
              <span style={{ color: C.sunny, textShadow: `0 0 40px ${C.gold}99, 0 4px 16px rgba(0,0,0,0.5)` }}>с родной земли</span>
            </h1>

            <p className="font-body text-lg mb-10 max-w-xl leading-relaxed" style={{ color: 'rgba(255,240,160,0.85)' }}>
              Поставки масел, спредов и продовольствия оптом — от поля до вашего склада. Работаем честно, как в деревне.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button onClick={() => scrollTo("catalog")}
                className="flex items-center justify-center gap-2 font-body font-bold text-lg px-9 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${C.sunny} 0%, ${C.gold} 100%)`, color: C.earth, boxShadow: `0 6px 28px ${C.gold}77` }}>
                🛒 Смотреть каталог
              </button>
              <button onClick={() => scrollTo("contacts")}
                className="flex items-center justify-center gap-2 font-body font-bold text-lg px-9 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ border: `2.5px solid ${C.meadow}`, color: C.leaf, backdropFilter: 'blur(4px)', boxShadow: `0 4px 20px ${C.grass}44` }}>
                ✉️ Написать нам
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-t-3xl overflow-hidden"
            style={{ background: 'rgba(20,8,0,0.88)', backdropFilter: 'blur(16px)', border: `2px solid ${C.amber}55`, borderBottom: 'none', boxShadow: `0 -8px 40px rgba(0,0,0,0.4)` }}>
            {STATS.map((stat, i) => (
              <div key={i} className="text-center py-6 px-4 group hover:bg-white/5 transition-colors"
                style={{ borderRight: i < 3 ? `1px solid ${C.amber}22` : 'none' }}>
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-display text-2xl md:text-3xl font-bold italic group-hover:scale-110 transition-transform" style={{ color: C.sunny }}>{stat.value}</div>
                <div className="font-body text-xs mt-1" style={{ color: `${C.straw}88` }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" style={{ background: `linear-gradient(180deg, ${C.cream} 0%, ${C.warm} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center"
            style={{ opacity: isVisible("about") ? 1 : 0, transform: isVisible("about") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}>

            <div>
              <div className="font-hand text-2xl mb-2" style={{ color: C.meadow }}>О нашей компании</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic leading-tight mb-1" style={{ color: C.earth }}>
                Молодые, но надёжные
              </h2>
              <div className="font-display text-2xl italic mb-6" style={{ color: C.amber }}>с душой к делу</div>

              <p className="font-body text-base leading-relaxed mb-4" style={{ color: C.brown }}>
                Компания ЮМА ТРЕЙД на рынке недавно, но уже успела завоевать доверие партнёров по всей России — честным словом, прозрачными условиями и строгим отношением к качеству каждой поставки.
              </p>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: C.brown }}>
                Мы не гонимся за объёмами ради объёмов. Нам важно, чтобы каждый клиент получил именно то, что ожидал: свежий товар, полный пакет документов и живое человеческое общение — без скриптов и бюрократии.
              </p>
              <p className="font-body text-base leading-relaxed mb-4" style={{ color: C.brown }}>
                Работаем напрямую с производителями, держим цены честными и выстраиваем долгосрочные отношения — такие, когда партнёр звонит не по прайсу, а потому что доверяет.
              </p>
              <div className="flex items-center gap-4 rounded-2xl p-4 mb-4"
                style={{ background: `linear-gradient(135deg, ${C.gold}22, ${C.amber}11)`, border: `2px solid ${C.gold}66` }}>
                <div className="text-4xl flex-shrink-0">🎵</div>
                <div>
                  <div className="font-hand text-base" style={{ color: C.amber }}>Наша собственная торговая марка</div>
                  <div className="font-display text-2xl italic font-bold" style={{ color: C.earth }}>«Молочный Вальс»</div>
                  <div className="font-body text-sm mt-1" style={{ color: C.brown }}>Спреды, масло, сыры и топлёные смеси под собственным брендом</div>
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed mb-8 italic font-semibold px-4 py-3 rounded-xl"
                style={{ color: C.grass, backgroundColor: `${C.meadow}18`, border: `1.5px solid ${C.meadow}44` }}>
                📍 Мы находимся в Свердловской области, г. Екатеринбург — и работаем по всей России.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: "🏅", text: "Сертифицированная продукция", color: C.gold },
                  { emoji: "🚛", text: "Собственная логистика",       color: C.amber },
                  { emoji: "🛡️", text: "Гарантия качества",           color: C.meadow },
                  { emoji: "🤝", text: "Гибкие условия оплаты",       color: C.grass },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl p-3.5 hover:scale-[1.03] transition-transform"
                    style={{ backgroundColor: '#fff', border: `2px solid ${item.color}44`, boxShadow: `0 2px 12px ${item.color}22` }}>
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-body text-sm font-semibold" style={{ color: C.earth }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl p-8"
                style={{ background: `linear-gradient(145deg, #fff 0%, ${C.warm} 100%)`, border: `3px solid ${C.gold}55`, boxShadow: `0 12px 60px ${C.amber}22` }}>
                <div className="text-center mb-6">
                  <div className="font-hand text-2xl" style={{ color: C.amber }}>Что мы поставляем</div>
                  <div className="w-28 h-1 mx-auto mt-2 rounded-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.meadow})` }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { emoji: "🧈", label: "Спреды",          color: C.gold },
                    { emoji: "🫙", label: "Масло",            color: C.amber },
                    { emoji: "✨", label: "Топлёные смеси",   color: C.meadow },
                    { emoji: "🧀", label: "Сыры",             color: C.grass },
                  ].map((cat, i) => (
                    <div key={i}
                      className="rounded-2xl p-4 text-center transition-all duration-300 cursor-default hover:scale-110 hover:-rotate-1"
                      style={{ backgroundColor: `${cat.color}15`, border: `2px solid ${cat.color}44` }}>
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="font-body text-xs font-bold" style={{ color: C.brown }}>{cat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl p-4 text-center"
                  style={{ background: `linear-gradient(135deg, ${C.gold}22, ${C.amber}11)`, border: `2px solid ${C.gold}66` }}>
                  <div className="text-2xl mb-1">🎵</div>
                  <div className="font-hand text-base font-bold" style={{ color: C.amber }}>Собственная ТМ</div>
                  <div className="font-display text-lg italic font-bold" style={{ color: C.earth }}>«Молочный Вальс»</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 text-6xl animate-float drop-shadow-2xl">🌻</div>
              <div className="absolute -bottom-5 -left-5 text-5xl animate-sway drop-shadow-xl" style={{ animationDelay: '1s' }}>🐄</div>
            </div>
          </div>
        </div>

        <div className="text-center pb-8 font-hand text-2xl" style={{ color: C.amber }}>— ✦ —</div>
      </section>

      {/* ══════════════════════════════════════
          CATALOG
      ══════════════════════════════════════ */}
      <section id="catalog" style={{ background: `linear-gradient(180deg, ${C.warm} 0%, #fff9e0 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div style={{ opacity: isVisible("catalog") ? 1 : 0, transform: isVisible("catalog") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}>

            <div className="text-center mb-12">
              <div className="font-hand text-2xl mb-1" style={{ color: C.meadow }}>прямо с полей</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: C.earth }}>Наш ассортимент</h2>
              <div className="w-24 h-1.5 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.meadow})` }} />
            </div>

            {/* Фильтры */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="font-body font-bold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                    style={activeCategory === cat
                      ? { background: `linear-gradient(135deg, ${C.earth}, ${C.brown})`, color: C.sunny, boxShadow: `0 4px 16px ${C.brown}66` }
                      : { backgroundColor: '#fff', color: C.brown, border: `2px solid ${C.amber}44`, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }
                    }>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Карточки */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div key={product.id}
                  className="rounded-3xl p-5 group transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-default flex flex-col"
                  style={{ backgroundColor: '#fff', border: `2px solid ${C.gold}44`, boxShadow: `0 4px 20px rgba(200,120,0,0.1)` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl group-hover:scale-110 transition-transform">{product.emoji}</div>
                    <div className="text-xs font-body font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${C.meadow}20`, color: C.grass, border: `1px solid ${C.meadow}44` }}>
                      {product.category}
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold italic mb-1 group-hover:text-amber-700 transition-colors" style={{ color: C.earth }}>
                    {product.name}
                  </h3>
                  <p className="font-body text-sm leading-relaxed mb-4 flex-1" style={{ color: C.brown, opacity: 0.8 }}>
                    {product.desc}
                  </p>
                  <button onClick={() => scrollTo("contacts")}
                    className="w-full font-body font-bold text-sm py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${C.earth}, ${C.brown})`, color: C.sunny, boxShadow: `0 3px 10px ${C.brown}55` }}>
                    Запрос цены
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 font-body" style={{ color: C.brown }}>
                <div className="text-6xl mb-4">🔍</div>
                Ничего не найдено по выбранным фильтрам
              </div>
            )}
          </div>
        </div>
        <div className="text-center pb-8 font-hand text-2xl" style={{ color: C.amber }}>— ✦ —</div>
      </section>

      {/* ══════════════════════════════════════
          DOCUMENTS
      ══════════════════════════════════════ */}
      <section id="price" style={{ background: `linear-gradient(180deg, #fff9e0 0%, ${C.cream} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div style={{ opacity: isVisible("price") ? 1 : 0, transform: isVisible("price") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}>

            <div className="text-center mb-14">
              <div className="font-hand text-2xl mb-1" style={{ color: C.meadow }}>скачайте и сохраните</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: C.earth }}>Прайс и документы</h2>
              <div className="w-24 h-1.5 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.meadow})` }} />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {DOCS.map((doc, i) => (
                <div key={i}
                  className="rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 group cursor-pointer"
                  style={{ backgroundColor: '#fff', border: `3px solid ${doc.bg}55`, boxShadow: `0 6px 32px ${doc.bg}22` }}>
                  <div className="text-6xl mb-5 group-hover:scale-110 transition-transform">{doc.emoji}</div>
                  <h3 className="font-display text-xl font-bold italic mb-2 transition-colors" style={{ color: C.earth }}>
                    {doc.name}
                  </h3>
                  <p className="font-body text-sm mb-6" style={{ color: C.brown, opacity: 0.75 }}>{doc.desc}</p>
                  <div className="flex items-center gap-2 font-body text-sm font-bold px-4 py-2.5 rounded-xl w-fit transition-all duration-200 group-hover:scale-105"
                    style={{ background: `${doc.bg}22`, color: doc.bg, border: `1.5px solid ${doc.bg}55` }}>
                    <Icon name="Download" size={16} />
                    Скачать
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: `linear-gradient(135deg, ${C.earth} 0%, ${C.brown} 60%, ${C.grass} 100%)`, boxShadow: `0 12px 60px rgba(0,0,0,0.25)` }}>
              <div>
                <div className="font-hand text-xl mb-1" style={{ color: C.sunny }}>не теряйте время!</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold italic" style={{ color: '#fff' }}>
                  Нужен актуальный прайс?
                </h3>
                <p className="font-body text-base mt-2 max-w-md" style={{ color: 'rgba(255,240,160,0.75)' }}>
                  Оставьте заявку — пришлём прайс-лист и договор поставки в течение 30 минут
                </p>
              </div>
              <button onClick={() => scrollTo("contacts")}
                className="whitespace-nowrap flex items-center gap-3 font-body font-bold text-lg px-9 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${C.sunny}, ${C.gold})`, color: C.earth, boxShadow: `0 6px 28px ${C.gold}77` }}>
                <Icon name="Send" size={18} />
                Запросить прайс
              </button>
            </div>
          </div>
        </div>
        <div className="text-center pb-8 font-hand text-2xl" style={{ color: C.amber }}>— ✦ —</div>
      </section>

      {/* ══════════════════════════════════════
          CONTACTS
      ══════════════════════════════════════ */}
      <section id="contacts" style={{ background: `linear-gradient(180deg, ${C.cream} 0%, ${C.warm} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div style={{ opacity: isVisible("contacts") ? 1 : 0, transform: isVisible("contacts") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}>

            <div className="text-center mb-14">
              <div className="font-hand text-2xl mb-1" style={{ color: C.meadow }}>заходите в гости</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: C.earth }}>Свяжитесь с нами</h2>
              <div className="w-24 h-1.5 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.meadow})` }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                {[
                  { emoji: "📞", label: "Телефон",     value: "+7 (495) 123-45-67",  href: "tel:+74951234567",        color: C.meadow },
                  { emoji: "📧", label: "Email",        value: "info@yumatrade.ru",   href: "mailto:info@yumatrade.ru",color: '#4a90d9' },
                  { emoji: "📍", label: "Адрес",        value: "г. Екатеринбург, Свердловская область", href: "#",   color: C.amber },
                  { emoji: "🕘", label: "Режим работы", value: "Пн–Пт: 9:00–18:00",  href: "#",                       color: C.gold },
                ].map((contact, i) => (
                  <a key={i} href={contact.href}
                    className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-0.5"
                    style={{ backgroundColor: '#fff', border: `2px solid ${contact.color}33`, boxShadow: `0 4px 20px ${contact.color}18` }}>
                    <div className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${contact.color}18`, border: `2px solid ${contact.color}44` }}>
                      {contact.emoji}
                    </div>
                    <div>
                      <div className="font-body text-xs font-semibold mb-0.5" style={{ color: contact.color }}>{contact.label}</div>
                      <div className="font-body font-bold text-base" style={{ color: C.earth }}>{contact.value}</div>
                    </div>
                  </a>
                ))}

                <div className="flex gap-3 pt-2">
                  {[
                    { label: "WhatsApp", emoji: "💬", bg: '#25d366', shadow: '#25d36655' },
                    { label: "Telegram", emoji: "✈️", bg: '#229ed9', shadow: '#229ed955' },
                  ].map((soc, i) => (
                    <button key={i}
                      className="flex items-center gap-2 font-body font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 flex-1 justify-center hover:scale-105 hover:-translate-y-0.5"
                      style={{ backgroundColor: soc.bg, color: '#fff', boxShadow: `0 4px 18px ${soc.shadow}` }}>
                      {soc.emoji} {soc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Форма */}
              <form onSubmit={handleFormSubmit} className="rounded-3xl p-8"
                style={{ backgroundColor: '#fff', border: `3px solid ${C.gold}44`, boxShadow: `0 8px 48px ${C.amber}18` }}>
                <div className="font-hand text-xl mb-1" style={{ color: C.meadow }}>напишите нам</div>
                <h3 className="font-display text-2xl font-bold italic mb-6" style={{ color: C.earth }}>Оставить заявку</h3>

                {formStatus === "ok" ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <div className="text-7xl animate-float">🎉</div>
                    <div className="font-display text-2xl italic font-bold text-center" style={{ color: C.grass }}>Заявка отправлена!</div>
                    <div className="font-body text-center" style={{ color: C.brown }}>Мы свяжемся с вами в течение 30 минут</div>
                    <button type="button" onClick={() => setFormStatus("idle")}
                      className="mt-4 font-body text-sm underline" style={{ color: C.brown }}>
                      Отправить ещё
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[
                      { label: "Ваше имя *", name: "name",    type: "text", placeholder: "Иван Иванов",        required: true },
                      { label: "Компания",   name: "company", type: "text", placeholder: "ООО «Пример»",       required: false },
                      { label: "Телефон *",  name: "phone",   type: "tel",  placeholder: "+7 (___) ___-__-__", required: true },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="font-body text-xs font-bold mb-2 block" style={{ color: C.brown }}>{field.label}</label>
                        <input type={field.type} name={field.name} value={form[field.name as keyof typeof form]}
                          onChange={handleFormChange} required={field.required} placeholder={field.placeholder}
                          className="w-full font-body rounded-xl px-4 py-3 outline-none transition-all"
                          style={{ backgroundColor: C.warm, border: `2px solid ${C.gold}44`, color: C.earth }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="font-body text-xs font-bold mb-2 block" style={{ color: C.brown }}>Что интересует?</label>
                      <textarea rows={3} name="message" value={form.message} onChange={handleFormChange}
                        placeholder="Опишите потребность или укажите интересующие позиции..."
                        className="w-full font-body rounded-xl px-4 py-3 outline-none transition-all resize-none"
                        style={{ backgroundColor: C.warm, border: `2px solid ${C.gold}44`, color: C.earth }}
                      />
                    </div>
                    {formStatus === "error" && (
                      <div className="font-body text-sm text-center text-red-600 font-semibold">
                        Ошибка отправки. Позвоните нам напрямую.
                      </div>
                    )}
                    <button type="submit" disabled={formStatus === "sending"}
                      className="w-full font-body font-bold text-lg py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ background: `linear-gradient(135deg, ${C.earth}, ${C.brown})`, color: C.sunny, boxShadow: `0 6px 24px ${C.brown}55` }}>
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

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background: `linear-gradient(135deg, ${C.earth} 0%, ${C.brown} 100%)`, borderTop: `4px solid ${C.gold}` }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌾</span>
              <div>
                <div className="font-display text-2xl font-bold italic" style={{ color: C.sunny }}>ЮМА ТРЕЙД</div>
                <div className="font-hand text-sm" style={{ color: `${C.straw}88` }}>продукты питания оптом</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="font-body text-sm font-semibold transition-all hover:scale-105"
                  style={{ color: `${C.straw}77` }}>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="font-body text-sm text-center" style={{ color: `${C.straw}44` }}>
              © 2024 ЮМА ТРЕЙД
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}