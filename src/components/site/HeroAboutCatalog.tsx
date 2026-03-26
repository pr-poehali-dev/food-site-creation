import { C, HERO_IMAGE, STATS, CATEGORIES, PRODUCTS } from "./constants";

interface HeroAboutCatalogProps {
  isVisible: (id: string) => boolean;
  scrollTo: (id: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export default function HeroAboutCatalog({ isVisible, scrollTo, activeCategory, setActiveCategory }: HeroAboutCatalogProps) {
  const filteredProducts = PRODUCTS.filter(p =>
    activeCategory === "Все" || p.category === activeCategory
  );

  return (
    <>
      {/* ══ HERO ══ */}
      <section id="home" className="relative min-h-screen flex items-end overflow-hidden pt-24">
        <div className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, filter: 'brightness(1.05) saturate(1.2)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(30,12,0,0.93) 0%, rgba(30,12,0,0.55) 45%, rgba(30,12,0,0.1) 100%)' }} />

        <div className="absolute top-28 left-8 text-6xl opacity-60 animate-sway drop-shadow-xl">🌿</div>
        <div className="absolute top-36 right-10 text-5xl opacity-50 animate-float drop-shadow-xl">🌼</div>
        <div className="absolute top-1/3 right-6 text-7xl opacity-40 animate-sway drop-shadow-2xl" style={{ animationDelay: '1.5s' }}>🐄</div>
        <div className="absolute bottom-52 left-12 text-4xl opacity-40 animate-float drop-shadow-lg" style={{ animationDelay: '0.8s' }}>🌻</div>

        <div className="relative w-full max-w-7xl mx-auto px-4 pb-0">
          <div className="max-w-3xl mb-0">
            <div className="inline-flex items-center gap-2 text-xs font-body font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase"
              style={{ background: `linear-gradient(135deg, ${C.meadow}33, ${C.meadow}11)`, border: `2px solid ${C.meadow}`, color: C.leaf, backdropFilter: 'blur(4px)' }}>
              🚜 Прямые поставки по всей России
            </div>

            <h1 className="font-display font-bold italic leading-none mb-5"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: '#ffffff', textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}>
              Настоящий вкус —<br />
              <span style={{ color: C.sunny, textShadow: `0 0 40px ${C.gold}99, 0 4px 16px rgba(0,0,0,0.5)` }}>честная цена</span>
            </h1>

            <p className="font-body text-lg mb-10 max-w-xl leading-relaxed" style={{ color: 'rgba(255,240,160,0.85)' }}>Качество без переплат — масла, спреды, топленые смеси и сыры оптом напрямую от производителя. </p>

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

      {/* ══ ABOUT ══ */}
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

              <div className="flex items-center gap-5 rounded-2xl p-4 mb-4"
                style={{ background: `linear-gradient(135deg, ${C.gold}22, ${C.amber}11)`, border: `2px solid ${C.gold}66` }}>
                <img
                  src="https://cdn.poehali.dev/projects/3345e4d2-6a9b-485a-9bd1-384ca648e1e9/bucket/f56a5cac-5f68-4331-93f9-9dd21fcbec80.jpg"
                  alt="Молочный Вальс"
                  className="w-24 h-24 object-contain flex-shrink-0 rounded-xl"
                />
                <div>
                  <div className="font-hand text-base" style={{ color: C.amber }}>Наша собственная торговая марка</div>
                  <div className="font-display text-2xl italic font-bold" style={{ color: C.earth }}>«Молочный Вальс»</div>
                  <div className="font-body text-sm mt-1" style={{ color: C.brown }}>Спреды, масло и топлёные смеси под собственным брендом</div>
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
                    { emoji: "🧈", label: "Спреды",        color: C.gold },
                    { emoji: "🫙", label: "Масло",          color: C.amber },
                    { emoji: "✨", label: "Топлёные смеси", color: C.meadow },
                    { emoji: "🧀", label: "Сыры",           color: C.grass },
                  ].map((cat, i) => (
                    <div key={i}
                      className="rounded-2xl p-4 text-center transition-all duration-300 cursor-default hover:scale-110 hover:-rotate-1"
                      style={{ backgroundColor: `${cat.color}15`, border: `2px solid ${cat.color}44` }}>
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="font-body text-xs font-bold" style={{ color: C.brown }}>{cat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl p-4 flex items-center gap-4"
                  style={{ background: `linear-gradient(135deg, ${C.gold}22, ${C.amber}11)`, border: `2px solid ${C.gold}66` }}>
                  <img
                    src="https://cdn.poehali.dev/projects/3345e4d2-6a9b-485a-9bd1-384ca648e1e9/bucket/f56a5cac-5f68-4331-93f9-9dd21fcbec80.jpg"
                    alt="Молочный Вальс"
                    className="w-16 h-16 object-contain flex-shrink-0"
                  />
                  <div>
                    <div className="font-hand text-sm" style={{ color: C.amber }}>Собственная ТМ</div>
                    <div className="font-display text-lg italic font-bold" style={{ color: C.earth }}>«Молочный Вальс»</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 text-6xl animate-float drop-shadow-2xl">🌻</div>
              <div className="absolute -bottom-5 -left-5 text-5xl animate-sway drop-shadow-xl" style={{ animationDelay: '1s' }}>🐄</div>
            </div>
          </div>
        </div>
        <div className="text-center pb-8 font-hand text-2xl" style={{ color: C.amber }}>— ✦ —</div>
      </section>

      {/* ══ CATALOG ══ */}
      <section id="catalog" style={{ background: `linear-gradient(180deg, ${C.warm} 0%, #fff9e0 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div style={{ opacity: isVisible("catalog") ? 1 : 0, transform: isVisible("catalog") ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease-out" }}>

            <div className="text-center mb-12">
              <div className="font-hand text-2xl mb-1" style={{ color: C.meadow }}>прямо с полей</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold italic" style={{ color: C.earth }}>Наш ассортимент</h2>
              <div className="w-24 h-1.5 mx-auto mt-4 rounded-full" style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.meadow})` }} />
            </div>

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
    </>
  );
}