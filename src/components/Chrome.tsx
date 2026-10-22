import { useEffect, useRef, useState } from "react";
import { onScrollFrame, scrollToId } from "../lib/motion";
import { BuyButton } from "./BuyButton";
import { config } from "../config";

/** Barra de progresso de rolagem (transform: scaleX, sem re-render). */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let last = -1;
    return onScrollFrame((y, vh) => {
      const max = document.documentElement.scrollHeight - vh;
      const p = Math.round((max > 0 ? Math.min(1, y / max) : 0) * 1000) / 1000;
      if (p === last) return;
      last = p;
      return () => {
        if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      };
    });
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div ref={bar} className="h-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

const NAV = [
  { id: "pilares", label: "Pilares" },
  { id: "material", label: "Material" },
  { id: "jornada", label: "Jornada" },
  { id: "duvidas", label: "Dúvidas" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    let last: boolean | null = null;
    return onScrollFrame((y, vh) => {
      const next = y > vh * 0.75;
      if (next !== last) {
        last = next;
        setSolid(next);
      }
    });
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        solid ? "bg-cream/85 text-forest shadow-[0_1px_0_rgb(38_61_50/0.08)] backdrop-blur-xl" : "text-cream"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#topo" className="font-display text-[1.45rem] leading-none" aria-label="Leve21, voltar ao início">
          <span className="italic">Leve</span>21<span className="text-gold">.</span>
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(n.id);
              }}
              className="relative opacity-80 transition-opacity after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:opacity-100 hover:after:origin-left hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#oferta"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("oferta");
          }}
          className={`btn min-h-[40px] px-5 text-sm ${solid ? "btn-forest" : "btn-ghost"}`}
        >
          R$ {config.price}
        </a>
      </div>
    </header>
  );
}

/** Botão de compra fixo no mobile: aparece após o hero e some na oferta/rodapé. */
export function StickyBuy() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    // A barra só existe no celular: no desktop não mede nada a cada quadro.
    const mobile = window.matchMedia("(max-width: 767.98px)");
    const offer = document.getElementById("oferta");
    const foot = document.getElementById("rodape");
    let last: boolean | null = null;
    const hide = (el: HTMLElement | null, vh: number) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < vh * 0.9 && r.bottom > 0;
    };
    return onScrollFrame((y, vh) => {
      if (!mobile.matches) return;
      const next = y > vh * 0.9 && !hide(offer, vh) && !hide(foot, vh);
      if (next !== last) {
        last = next;
        setShow(next);
      }
    });
  }, []);
  return (
    <div
      className="sticky-buy fixed inset-x-0 bottom-0 z-40 px-3 pt-3 md:hidden"
      data-show={show ? "true" : "false"}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center gap-3 rounded-[22px] bg-forest-deep/95 p-2 pl-5 text-cream shadow-[0_20px_50px_-15px_rgb(0_0_0/0.5)] backdrop-blur-xl">
        <div className="leading-tight">
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-cream/60">Leve21</p>
          <p className="font-display text-lg">R$ {config.price}</p>
        </div>
        <div className="on-dark ml-auto flex-1">
          <BuyButton label="Quero o Leve21" full className="min-h-[48px] px-4 text-[0.92rem]" />
        </div>
      </div>
    </div>
  );
}
