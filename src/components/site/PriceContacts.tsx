import Icon from "@/components/ui/icon";
import { C, DOCS, NAV_LINKS } from "./constants";

interface FormData {
  name: string;
  company: string;
  phone: string;
  message: string;
}

interface PriceContactsProps {
  isVisible: (id: string) => boolean;
  scrollTo: (id: string) => void;
  form: FormData;
  formStatus: "idle" | "sending" | "ok" | "error";
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  setFormStatus: (s: "idle" | "sending" | "ok" | "error") => void;
}

export default function PriceContacts({
  isVisible, scrollTo, form, formStatus, handleFormChange, handleFormSubmit, setFormStatus,
}: PriceContactsProps) {
  return (
    <>
      {/* ══ DOCUMENTS ══ */}
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

      {/* ══ CONTACTS ══ */}
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
                  { emoji: "📞", label: "Общий телефон",  value: "8 963 041 71 69",                                                                    href: "tel:+79630417169", color: C.meadow },
                  { emoji: "📧", label: "Общая почта",    value: "info@umotrade.ru",                                                                    href: "mailto:info@umotrade.ru", color: '#4a90d9' },
                  { emoji: "📍", label: "Адрес",          value: "г. Екатеринбург, ул. Машинная, д. 42а, оф. 203, Свердловская область",               href: "#", color: C.amber },
                  { emoji: "🕘", label: "Режим работы",   value: "Пн–Пт: 9:00–18:00",                                                                  href: "#", color: C.gold },
                ].map((contact, i) => (
                  <a key={i} href={contact.href}
                    className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 group hover:scale-[1.02] hover:-translate-y-0.5"
                    style={{ backgroundColor: '#fff', border: `2px solid ${contact.color}33`, boxShadow: `0 4px 20px ${contact.color}18` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${contact.color}18`, border: `2px solid ${contact.color}44` }}>
                      {contact.emoji}
                    </div>
                    <div>
                      <div className="font-body text-xs font-semibold mb-0.5" style={{ color: contact.color }}>{contact.label}</div>
                      <div className="font-body font-bold text-base" style={{ color: C.earth }}>{contact.value}</div>
                    </div>
                  </a>
                ))}

                <div className="rounded-2xl p-5 space-y-3"
                  style={{ backgroundColor: '#fff', border: `2px solid ${C.gold}33`, boxShadow: `0 4px 20px ${C.gold}18` }}>
                  <div className="font-body text-xs font-semibold mb-2" style={{ color: C.brown }}>Отделы компании</div>
                  {[
                    { dept: "Отдел продаж",         email: "headsales@umotrade.ru" },
                    { dept: "Отдел приёма заказов", email: "order@umotrade.ru" },
                    { dept: "Отдел снабжения",      email: "supply@umotrade.ru" },
                    { dept: "Региональный отдел",   email: "region@umotrade.ru" },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-2 border-b last:border-0"
                      style={{ borderColor: `${C.gold}22` }}>
                      <div className="font-body text-xs font-bold" style={{ color: C.earth }}>{d.dept}</div>
                      <a href={`mailto:${d.email}`} className="font-body text-xs font-semibold hover:underline" style={{ color: '#4a90d9' }}>{d.email}</a>
                    </div>
                  ))}
                </div>

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
                        <input type={field.type} name={field.name} value={form[field.name as keyof FormData]}
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

      {/* ══ FOOTER ══ */}
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
    </>
  );
}