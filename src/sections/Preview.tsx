import { useEffect, useRef, useState } from "react";
import { previewImages } from "../content";
import { Reveal, prefersReducedMotion } from "../lib/motion";
import { BookCover, PlannerPage } from "../components/Mockups";

/** Composições ilustrativas usadas enquanto não houver páginas reais em /public/previews. */
const illustrative = [
  {
    label: "Capa do e-book",
    node: <BookCover className="h-full w-full text-[13px]" />,
  },
  {
    label: "Abertura de capítulo",
    node: (
      <div className="paper flex h-full w-full flex-col justify-between rounded-[14px] p-[12%]">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">Pilar 01</span>
        <div>
          <p className="font-display text-[1.9rem] italic leading-none text-forest">Organização</p>
          <div className="mt-5 space-y-2">
            {[0.95, 0.88, 0.92, 0.6].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-ink/10" style={{ width: `${w * 100}%` }} />
            ))}
          </div>
        </div>
        <span className="font-display text-sm text-sage-ink">— 01</span>
      </div>
    ),
  },
  {
    label: "Página do planner",
    node: <PlannerPage className="h-full w-full text-[12px]" day={3} />,
  },
  {
    label: "Visão das 3 semanas",
    node: (
      <div className="paper flex h-full w-full flex-col rounded-[14px] p-[10%]">
        <p className="font-display text-xl italic text-forest">Minhas 3 semanas</p>
        <div className="mt-5 grid flex-1 grid-cols-7 content-start gap-1.5">
          {Array.from({ length: 21 }).map((_, i) => (
            <span
              key={i}
              className={`grid aspect-square place-items-center rounded-md text-[0.55rem] font-semibold ${
                i < 7 ? "bg-forest text-cream" : i < 14 ? "bg-sage/60 text-forest" : "bg-cream-deep text-forest/60"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export function Preview() {
  const row = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const usingReal = previewImages.length > 0;
  const slides = usingReal
    ? previewImages.map((im) => ({
        label: im.alt,
        node: <img src={im.src} alt={im.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" width={695} height={983} />,
      }))
    : illustrative;

  const go = (i: number) => {
    const el = row.current;
    if (!el) return;
    const n = Math.max(0, Math.min(slides.length - 1, i));
    const card = el.children[n] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  // Mede o carrossel no máximo uma vez por quadro.
  const rowRaf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(rowRaf.current), []);
  const onScroll = () => {
    if (rowRaf.current) return;
    rowRaf.current = requestAnimationFrame(() => {
      rowRaf.current = 0;
      measure();
    });
  };
  const measure = () => {
    const el = row.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const h = c as HTMLElement;
      const d = Math.abs(h.offsetLeft + h.clientWidth / 2 - center);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    setIdx(best);
  };

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-36" aria-labelledby="previa-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal as="p" className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage-ink">
              Por dentro
            </Reveal>
            <Reveal as="h2" delay={80} className="font-display text-[clamp(2.2rem,7vw,4rem)] font-light leading-[1.02] text-forest">
              <span id="previa-title">
                Uma prévia do <em className="text-sage-ink">material.</em>
              </span>
            </Reveal>
          </div>
          <div className="hidden gap-2 md:flex">
            {[
              { d: -1, l: "Anterior" },
              { d: 1, l: "Próxima" },
            ].map((b) => (
              <button
                key={b.l}
                onClick={() => go(idx + b.d)}
                aria-label={`${b.l} página`}
                className="grid h-12 w-12 place-items-center rounded-full border border-forest/20 text-forest transition-all duration-500 hover:bg-forest hover:text-cream active:scale-95"
              >
                <svg viewBox="0 0 24 24" className={`h-5 w-5 ${b.d < 0 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={row}
        onScroll={onScroll}
        className="snap-row relative mt-12 flex gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pb-6"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Prévia das páginas"
        tabIndex={0}
      >
        {slides.map((s, i) => (
          <figure
            key={s.label}
            className={`w-[64vw] max-w-[300px] shrink-0 transition-all duration-700 ease-[var(--ease-out-expo)] md:w-[260px] ${
              i === idx ? "scale-100 opacity-100" : "scale-[0.94] opacity-60"
            }`}
          >
            <Reveal variant="up" delay={i * 90}>
              <div className="aspect-[210/297] w-full overflow-hidden rounded-[14px] shadow-[0_24px_50px_-24px_rgb(38_61_50/0.45)] transition-transform duration-700 hover:-translate-y-2 hover:rotate-[-1deg]">{s.node}</div>
              <figcaption className="mt-4 text-sm font-medium text-forest/70">{s.label}</figcaption>
            </Reveal>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <div className="flex gap-2" aria-hidden="true">
          {slides.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-forest" : "w-1.5 bg-forest/20"}`} />
          ))}
        </div>
        {!usingReal && <p className="text-xs text-ink/65">Visualização ilustrativa</p>}
      </div>
    </section>
  );
}
