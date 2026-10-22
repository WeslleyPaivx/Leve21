import { useState } from "react";
import { challenges } from "../content";
import { Reveal } from "../lib/motion";

export function Challenges() {
  const [active, setActive] = useState(0);
  const item = challenges.items[active];

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-36" aria-labelledby="desafios-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal as="p" className="mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage-ink">
          {challenges.kicker}
        </Reveal>
        <Reveal as="h2" delay={80} variant="blur" className="max-w-[18ch] font-display text-[clamp(2.1rem,7.5vw,4.4rem)] font-light leading-[1.02] text-forest">
          <span id="desafios-title">
            {challenges.title} <em className="text-sage-ink">{challenges.titleAccent}</em>
          </span>
        </Reveal>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-14">
          <Reveal delay={150}>
            <p className="mb-4 text-sm text-ink/60" id="desafios-hint">
              {challenges.hint}
            </p>
            <div role="tablist" aria-labelledby="desafios-hint" className="flex flex-wrap gap-2.5">
              {challenges.items.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.label}
                    role="tab"
                    id={`desafio-tab-${i}`}
                    aria-selected={on}
                    aria-controls="desafio-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const n = (i + (e.key === "ArrowRight" ? 1 : -1) + challenges.items.length) % challenges.items.length;
                        setActive(n);
                        document.getElementById(`desafio-tab-${n}`)?.focus();
                      }
                    }}
                    className={`rounded-full border px-5 py-3 text-[0.95rem] font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-95 ${
                      on
                        ? "border-forest bg-forest text-cream shadow-[0_12px_30px_-12px_rgb(38_61_50/0.6)]"
                        : "border-forest/15 bg-white/60 text-forest hover:-translate-y-0.5 hover:border-forest/40 hover:bg-white"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={250} variant="scale">
            <div
              id="desafio-panel"
              role="tabpanel"
              aria-labelledby={`desafio-tab-${active}`}
              aria-live="polite"
              className="relative min-h-[220px] overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_30px_80px_-40px_rgb(38_61_50/0.45)] md:p-10"
            >
              <span className="pointer-events-none absolute -right-6 -top-10 font-display text-[9rem] italic leading-none text-sage/15" aria-hidden="true">
                “
              </span>
              <div key={active} className="swap-enter relative">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">Como o Leve21 olha para isso</p>
                <p className="mt-4 font-display text-[1.5rem] leading-snug text-forest md:text-[1.8rem]">{item.answer}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
