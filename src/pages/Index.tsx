import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/3345e4d2-6a9b-485a-9bd1-384ca648e1e9/files/52b1fdb0-4620-4087-94b2-55ae65850140.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "catalog", label: "Каталог" },
  { id: "price", label: "Прайс" },
  { id: "contacts", label: "Контакты" },
];

const CATEGORIES = ["Все", "Зерновые", "Овощи", "Фрукты", "Молочное", "Консервы", "Масла и жиры"];

const PRODUCTS = [
  { id: 1, name: "Пшеница 3 класс", category: "Зерновые", price: 12500, unit: "тонна", emoji: "🌾", desc: "ГОСТ 9353-2016, влажность до 14%" },
  { id: 2, name: "Сахар-песок", category: "Зерновые", price: 58000, unit: "тонна", emoji: "🍬", desc: "ГОСТ 21-94, мешки по 50 кг" },
  { id: 3, name: "Мука пшеничная в/с", category: "Зерновые", price: 24000, unit: "тонна", emoji: "🫙", desc: "ГОСТ 26574-2017, фасовка 50 кг" },
  { id: 4, name: "Картофель столовый", category: "Овощи", price: 18000, unit: "тонна", emoji: "🥔", desc: "Сортовой, калибр 50+, мешки 30 кг" },
  { id: 5, name: "Морковь столовая", category: "Овощи", price: 22000, unit: "тонна", emoji: "🥕", desc: "Мытая, фасовка сетки по 25 кг" },
  { id: 6, name: "Капуста белокочанная", category: "Овощи", price: 15000, unit: "тонна", emoji: "🥬", desc: "Поздних сортов, от 1 кг" },
  { id: 7, name: "Яблоки Голден", category: "Фрукты", price: 65000, unit: "тонна", emoji: "🍎", desc: "Калибр 65+, ящики по 18 кг" },
  { id: 8, name: "Масло подсолнечное", category: "Масла и жиры", price: 95000, unit: "тонна", emoji: "🫒", desc: "Рафинированное, ПЭТ-бутылки 5 л" },
  { id: 9, name: "Молоко пастеризованное", category: "Молочное", price: 48000, unit: "тонна", emoji: "🥛", desc: "Жирность 3.2%, Тетра Пак 1 л" },
  { id: 10, name: "Консервы томатные", category: "Консервы", price: 72000, unit: "тонна", emoji: "🥫", desc: "Паста томатная, жестяные банки 3 кг" },
  { id: 11, name: "Гречиха ядрица", category: "Зерновые", price: 35000, unit: "тонна", emoji: "🫘", desc: "1 сорт, ГОСТ Р 55290-2012" },
  { id: 12, name: "Лук репчатый", category: "Овощи", price: 16000, unit: "тонна", emoji: "🧅", desc: "Сортовой, сетки по 25 кг" },
];

const STATS = [
  { value: "12+", label: "лет на рынке" },
  { value: "500+", label: "партнёров по России" },
  { value: "85", label: "регионов поставок" },
  { value: "50 000+", label: "тонн в год" },
];

const DOCS = [
  { name: "Прайс-лист", desc: "Актуальные цены на все позиции", icon: "FileText", color: "bg-brand-lime" },
  { name: "Договор поставки", desc: "Типовой договор для партнёров", icon: "FileCheck", color: "bg-brand-orange" },
  { name: "Реквизиты", desc: "Банковские и юридические данные", icon: "Building2", color: "bg-brand-green" },
];

const TICKER_ITEMS = [
  "🌾 Зерновые культуры", "🥔 Овощи оптом", "🍎 Фрукты", "🥛 Молочная продукция",
  "🫒 Масла и жиры", "🥫 Консервы", "🚚 Доставка по России", "📋 Договор поставки",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["home"]));

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

  return (
    <div className="bg-brand-dark min-h-screen font-body text-white overflow-x-hidden">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div
            className="font-display text-2xl font-bold cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo("home")}
          >
            <span className="text-brand-lime">АГРО</span>
            <span className="text-white">ТРЕЙД</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`font-body text-sm font-medium transition-all duration-200 hover:text-brand-lime ${
                  activeSection === link.id ? "text-brand-lime" : "text-white/70"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a
            href="tel:+74951234567"
            className="hidden md:flex items-center gap-2 bg-brand-lime text-brand-dark font-display font-bold text-sm px-4 py-2 rounded-full hover:bg-brand-orange hover:text-white transition-all duration-200"
          >
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-brand-dark border-t border-white/10 px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left font-body text-base text-white/80 hover:text-brand-lime py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+74951234567"
              className="mt-2 flex items-center justify-center gap-2 bg-brand-lime text-brand-dark font-display font-bold px-4 py-3 rounded-full"
            >
              <Icon name="Phone" size={16} />
              +7 (495) 123-45-67
            </a>
          </div>
        )}
      </header>

      {/* TICKER */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-brand-lime h-8 overflow-hidden flex items-center">
        <div className="animate-ticker flex gap-12 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-brand-dark font-display font-semibold text-sm tracking-wide">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />

        <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full border border-brand-lime/20 animate-float" />
        <div className="absolute top-1/4 right-20 w-32 h-32 rounded-full border border-brand-orange/30 animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-2xl" style={{ opacity: 1, transform: "translateY(0)", transition: "all 0.8s ease-out" }}>
            <div className="inline-flex items-center gap-2 bg-brand-lime/20 border border-brand-lime/40 text-brand-lime text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              <Icon name="Truck" size={12} />
              Поставки по всей России
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-6 uppercase tracking-tight">
              Продукты<br />
              <span className="text-brand-lime">питания</span><br />
              <span className="text-brand-orange">оптом</span>
            </h1>

            <p className="font-body text-lg text-white/70 mb-10 max-w-xl leading-relaxed">
              Прямые поставки зерновых, овощей, фруктов и продовольствия по всей России. Работаем с сетями, предприятиями и дистрибьюторами.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="flex items-center justify-center gap-2 bg-brand-lime text-brand-dark font-display font-bold text-lg px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:scale-105"
              >
                <Icon name="ShoppingCart" size={20} />
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="flex items-center justify-center gap-2 border-2 border-white/30 text-white font-display font-semibold text-lg px-8 py-4 rounded-full hover:border-brand-lime hover:text-brand-lime transition-all duration-300"
              >
                <Icon name="MessageCircle" size={20} />
                Связаться с нами
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-bold text-brand-lime">{stat.value}</div>
                <div className="font-body text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="grid md:grid-cols-2 gap-16 items-center"
            style={{
              opacity: isVisible("about") ? 1 : 0,
              transform: isVisible("about") ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out"
            }}
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-6 tracking-widest uppercase">
                О КОМПАНИИ
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-6">
                Надёжный партнёр<br />
                <span className="text-brand-lime">с 2012 года</span>
              </h2>
              <p className="font-body text-white/70 text-lg leading-relaxed mb-6">
                АгроТрейд — оптовый поставщик продуктов питания с прямыми контрактами с производителями в 20+ регионах России. Мы обеспечиваем стабильные поставки для торговых сетей, производственных предприятий и компаний HoReCa.
              </p>
              <p className="font-body text-white/60 text-base leading-relaxed mb-8">
                Работаем с сертифицированными производителями, обеспечиваем полный пакет документов: ТТН, сертификаты соответствия, ветеринарные свидетельства.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Сертифицированная продукция" },
                  { icon: "Truck", text: "Собственная логистика" },
                  { icon: "ShieldCheck", text: "Гарантия качества" },
                  { icon: "Handshake", text: "Гибкие условия оплаты" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <div className="bg-brand-lime/20 text-brand-lime rounded-lg p-2">
                      <Icon name={item.icon} size={18} fallback="Check" />
                    </div>
                    <span className="font-body text-sm text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-brand-green/30 to-brand-lime/10 rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
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
                      className="bg-white/5 hover:bg-brand-lime/20 rounded-2xl p-4 text-center transition-all duration-300 cursor-default group border border-white/5 hover:border-brand-lime/40"
                    >
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="font-display text-sm font-semibold text-white/80 group-hover:text-brand-lime transition-colors">{cat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center text-2xl animate-float">
                🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-[#0a1208]">
        <div className="max-w-7xl mx-auto px-4">
          <div
            style={{
              opacity: isVisible("catalog") ? 1 : 0,
              transform: isVisible("catalog") ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out"
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-lime/20 border border-brand-lime/40 text-brand-lime text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                  КАТАЛОГ
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold uppercase leading-tight">
                  Наш <span className="text-brand-lime">ассортимент</span>
                </h2>
              </div>

              <div className="flex flex-col gap-2 min-w-[220px]">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-white/50">Максимальная цена</span>
                  <span className="font-display font-bold text-brand-lime">{maxPrice.toLocaleString()} ₽/т</span>
                </div>
                <input
                  type="range"
                  min={12000}
                  max={100000}
                  step={1000}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-lime cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-display font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand-lime text-brand-dark"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="bg-white/5 border border-white/10 hover:border-brand-lime/50 rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{product.emoji}</div>
                    <div className="bg-brand-green/30 text-brand-lime text-xs font-display font-bold px-2 py-1 rounded-lg">
                      {product.category}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-lime transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="font-body text-sm text-white/50 mb-4 leading-relaxed">
                    {product.desc}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display text-2xl font-bold text-brand-lime">
                        {product.price.toLocaleString()} ₽
                      </div>
                      <div className="font-body text-xs text-white/40">за {product.unit}</div>
                    </div>
                    <button className="bg-brand-lime/20 hover:bg-brand-lime text-brand-lime hover:text-brand-dark text-xs font-display font-bold px-3 py-2 rounded-xl transition-all duration-200">
                      Запрос цены
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-white/30 font-body">
                <div className="text-5xl mb-4">🔍</div>
                Ничего не найдено по выбранным фильтрам
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DOCUMENTS / PRICE */}
      <section id="price" className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div
            style={{
              opacity: isVisible("price") ? 1 : 0,
              transform: isVisible("price") ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out"
            }}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                ДОКУМЕНТЫ
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
                Прайс и <span className="text-brand-orange">документы</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {DOCS.map((doc, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-brand-orange/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                >
                  <div className={`${doc.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon name={doc.icon} size={26} fallback="File" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-lime transition-colors mb-2">
                    {doc.name}
                  </h3>
                  <p className="font-body text-white/50 text-sm mb-6">{doc.desc}</p>
                  <div className="flex items-center gap-2 text-brand-lime font-display text-sm font-semibold">
                    <Icon name="Download" size={16} />
                    Скачать
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-brand-green/20 to-brand-lime/10 border border-brand-lime/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Нужен актуальный прайс?
                </h3>
                <p className="font-body text-white/60 text-base max-w-md">
                  Оставьте заявку — вышлем актуальный прайс-лист и договор поставки в течение 30 минут
                </p>
              </div>
              <button
                onClick={() => scrollTo("contacts")}
                className="whitespace-nowrap flex items-center gap-3 bg-brand-lime text-brand-dark font-display font-bold text-lg px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:scale-105"
              >
                <Icon name="Send" size={20} />
                Запросить прайс
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0a1208]">
        <div className="max-w-7xl mx-auto px-4">
          <div
            style={{
              opacity: isVisible("contacts") ? 1 : 0,
              transform: isVisible("contacts") ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s ease-out"
            }}
          >
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-lime/20 border border-brand-lime/40 text-brand-lime text-xs font-display font-semibold px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
                КОНТАКТЫ
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
                Свяжитесь <span className="text-brand-lime">с нами</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", href: "tel:+74951234567" },
                  { icon: "Mail", label: "Email", value: "info@agrotreid.ru", href: "mailto:info@agrotreid.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Пищевая, 1", href: "#" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00–18:00", href: "#" },
                ].map((contact, i) => (
                  <a
                    key={i}
                    href={contact.href}
                    className="flex items-center gap-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-lime/40 rounded-2xl p-5 transition-all duration-300 group"
                  >
                    <div className="bg-brand-lime/20 text-brand-lime rounded-xl p-3 group-hover:bg-brand-lime group-hover:text-brand-dark transition-all duration-300">
                      <Icon name={contact.icon} size={22} fallback="Info" />
                    </div>
                    <div>
                      <div className="font-body text-xs text-white/40 mb-1">{contact.label}</div>
                      <div className="font-display font-semibold text-white group-hover:text-brand-lime transition-colors">{contact.value}</div>
                    </div>
                  </a>
                ))}

                <div className="flex gap-3 pt-2">
                  {[
                    { icon: "MessageCircle", label: "WhatsApp", color: "hover:bg-green-600" },
                    { icon: "Send", label: "Telegram", color: "hover:bg-blue-500" },
                  ].map((soc, i) => (
                    <button
                      key={i}
                      className={`flex items-center gap-2 bg-white/10 ${soc.color} text-white font-display text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-200 flex-1 justify-center`}
                    >
                      <Icon name={soc.icon} size={18} fallback="Link" />
                      {soc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="font-display text-xl font-bold text-white mb-6">Оставить заявку</h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs text-white/50 mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-lime text-white placeholder:text-white/30 font-body rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/50 mb-2 block">Компания</label>
                    <input
                      type="text"
                      placeholder="ООО «Пример»"
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-lime text-white placeholder:text-white/30 font-body rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/50 mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-lime text-white placeholder:text-white/30 font-body rounded-xl px-4 py-3 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-white/50 mb-2 block">Что интересует?</label>
                    <textarea
                      rows={3}
                      placeholder="Опишите потребность или укажите интересующие позиции..."
                      className="w-full bg-white/10 border border-white/20 focus:border-brand-lime text-white placeholder:text-white/30 font-body rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-brand-lime text-brand-dark font-display font-bold text-lg py-4 rounded-xl hover:bg-white transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
                    <Icon name="Send" size={20} />
                    Отправить заявку
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-display text-2xl font-bold">
              <span className="text-brand-lime">АГРО</span>
              <span className="text-white">ТРЕЙД</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="font-body text-sm text-white/40 hover:text-brand-lime transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="font-body text-sm text-white/30 text-center">
              © 2024 АгроТрейд. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
