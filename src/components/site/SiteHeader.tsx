import Icon from "@/components/ui/icon";
import { C, NAV_LINKS, TICKER_ITEMS } from "./constants";

interface SiteHeaderProps {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function SiteHeader({ activeSection, menuOpen, setMenuOpen, scrollTo }: SiteHeaderProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50"
        style={{ background: `linear-gradient(135deg, ${C.earth} 0%, ${C.brown} 100%)`, borderBottom: `4px solid ${C.gold}`, boxShadow: '0 4px 24px rgba(0,0,0,0.35)' }}>
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
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="font-body text-sm px-4 py-2 rounded-full transition-all duration-200 font-semibold"
                style={activeSection === link.id
                  ? { backgroundColor: C.gold, color: C.earth, boxShadow: `0 0 14px ${C.gold}88` }
                  : { color: C.straw }}>
                {link.label}
              </button>
            ))}
          </nav>

          <a href="tel:+74951234567"
            className="hidden md:flex items-center gap-2 font-body font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${C.gold} 0%, ${C.amber} 100%)`, color: C.earth, boxShadow: `0 4px 16px ${C.amber}66` }}>
            <Icon name="Phone" size={14} />
            +7 (495) 123-45-67
          </a>

          <button className="md:hidden" style={{ color: C.gold }} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={26} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 py-4 flex flex-col gap-2"
            style={{ backgroundColor: C.brown, borderTop: `2px solid ${C.amber}` }}>
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

      {/* TICKER */}
      <div className="fixed top-16 left-0 right-0 z-40 h-9 overflow-hidden flex items-center"
        style={{ background: `linear-gradient(90deg, ${C.grass} 0%, ${C.meadow} 50%, ${C.grass} 100%)`, boxShadow: '0 3px 12px rgba(46,125,30,0.5)' }}>
        <div className="animate-ticker flex gap-16 whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-body font-bold text-sm tracking-wide"
              style={{ color: '#ffffff', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
