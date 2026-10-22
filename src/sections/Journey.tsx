import { useEffect, useRef, useState } from "react";
import { weeks } from "../content";
import { Reveal, onScrollFrame, prefersReducedMotion } from "../lib/motion";

const weekOf = (day: number) => weeks.findIndex((w) => day >= w.days[0] && day <= w.days[1]);

export function Journey() {
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState<number>(1);
  const section = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const programmatic = useRef(0);

  // Linha dos 21 dias preenche conforme a rolagem pela seção.
  useEffect(
    () =>
      onScrollFrame((_, vh) => {
        const el = section.current;
        if (!el || !fill.current) return;
        const r = el.getBoundingClientRect();
        const p = prefersReducedMotion() ? 1 : Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height * 0.6)));
        fill.current.style.transform = `scaleX(${p})`;
      }),
    [],
  );

  const selectWeek = (i: number, scroll = true) => {
    setWeek(i);
    setDay(weeks[i].days[0]);
    if (scroll && row.current) {
      const card = row.current.children[i] as HTMLElement | undefined;
      if (card && row.current.scrollWidth > row.current.clientWidth) {
        programmatic.current = Date.now() + 800;
        row.current.scrollTo({
          left: card.offsetLeft - (row.current.clientWidth - card.clientWidth) / 2,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    }
  };

  // No mobile, rolar o carrossel atualiza a semana ativa.
  const onRowScroll = () => {
    const el = row.current;
    if (!el || el.scrollWidth <= el.clientWidth || Date.now() < programmatic.current) return;
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
    if (best !== week) {
      setWeek(best);
      setDay(weeks[best].days[0]);
    }
  };

  const w = weeks[week];

  return (
    <section
      id="jornada"
      ref={section}
      className="grain relative isolate overflow-hidden bg-forest py-24 text-cream md:py-36"
      aria-labelledby="jornada-title"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-sage/25 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal as="p" className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-soft">
          A jornada
        </Reveal>
        <Reveal as="h2" delay={80} className="max-w-[16ch] font-display text-[clamp(2.2rem,7vw,4.2rem)] font-light leading-[1.02]">
          <span id="jornada-title">
            Três semanas. <em className="text-gold-soft">Um passo por dia.</em>
          </span>
        </Reveal>

        {/* linha dos 21 dias */}
        <Reveal delay={160} className="mt-14">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-cream/15" aria-hidden="true" />
            <div
              ref={fill}
              className="absolute left-0 right-0 top-1/2 h-px origin-left -translate-y-1/2 bg-gold"
              style={{ transform: "scaleX(0)" }}
              aria-hidden="true"
            />
            <div className="relative flex justify-between" role="group" aria-label="Os 21 dias">
              {Array.from({ length: 21 }, (_, i) => i + 1).map((d) => {
                const wi = weekOf(d);
                const inWeek = wi === week;
                const on = d === day;
                return (
                  <button
                    key={d}
                    onClick={() => {
                      if (wi !== week) selectWeek(wi);
                      setDay(d);
                    }}
                    aria-label={`Dia ${d}, semana ${wi + 1}`}
                    aria-pressed={on}
                    className="group grid h-9 w-[4.2%] min-w-[11px] place-items-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-500 ease-[var(--ease-out-expo)] ${
                        on
                          ? "h-3.5 w-3.5 bg-gold ring-4 ring-gold/25"
                          : inWeek
                            ? "h-2.5 w-2.5 bg-cream group-hover:scale-125"
                            : "h-1.5 w-1.5 bg-cream/35 group-hover:bg-cream/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-sm text-cream/65" aria-live="polite">
            <span className="font-semibold text-gold-soft">Dia {String(day).padStart(2, "0")}</span> · Semana {w.n} · {w.theme}
          </p>
        </Reveal>

        {/* cartões das semanas */}
        <div
          ref={row}
          onScroll={onRowScroll}
          className="snap-row relative -mx-5 mt-10 flex gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
        >
          {weeks.map((wk, i) => {
            const on = i === week;
            return (
              <Reveal key={wk.n} delay={200 + i * 120} className="w-[82%] shrink-0 md:w-auto">
                <button
                  onClick={() => selectWeek(i, false)}
                  aria-pressed={on}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] p-7 text-left transition-all duration-700 ease-[var(--ease-out-expo)] md:p-8 ${
                    on
                      ? "bg-cream text-forest shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] md:-translate-y-3"
                      : "bg-cream/[0.06] text-cream ring-1 ring-cream/10 hover:-translate-y-1 hover:bg-cream/10"
                  }`}
                >
                  <span className={`text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${on ? "text-sage-ink" : "text-cream/50"}`}>
                    Dias {wk.days[0]}–{wk.days[1]}
                  </span>
                  <span className="mt-6 flex items-baseline gap-3">
                    <span className={`font-display text-6xl font-light leading-none ${on ? "text-gold" : "text-cream/30"}`}>
                      {wk.n}
                    </span>
                    <span className="font-display text-3xl italic">{wk.theme}</span>
                  </span>
                  <span className={`mt-5 leading-relaxed ${on ? "text-ink/70" : "text-cream/60"}`}>{wk.text}</span>
                  <span
                    className={`mt-8 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      on ? "bg-sage/20 text-forest" : "bg-cream/10 text-cream/70"
                    }`}
                  >
                    Pilar · {wk.pillar}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
