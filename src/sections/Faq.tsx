import { useState } from "react";
import { faq } from "../content";
import { config } from "../config";
import { Reveal } from "../lib/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [...faq];
  if (config.guaranteeDays) {
    items.splice(4, 0, {
      q: "E se eu perceber que não é para mim?",
      a: `Você tem ${config.guaranteeDays} dias após a compra para pedir o reembolso, conforme as regras do checkout da Cakto.`,
    });
  }
  if (config.contactEmail) {
    items.push({ q: "Ficou alguma dúvida?", a: `Escreva para ${config.contactEmail}.` });
  }

  return (
    <section id="duvidas" className="bg-cream pb-24 md:pb-36" aria-labelledby="duvidas-title">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-8">
        <div>
          <Reveal as="p" className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage-ink">
            Dúvidas
          </Reveal>
          <Reveal as="h2" delay={80} className="font-display text-[clamp(2.2rem,7vw,3.6rem)] font-light leading-[1.02] text-forest md:sticky md:top-28">
            <span id="duvidas-title">
              Perguntas <em className="text-sage-ink">frequentes.</em>
            </span>
          </Reveal>
        </div>

        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {items.map((it, i) => {
            const on = open === i;
            return (
              <Reveal key={it.q} delay={i * 60}>
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-[1.2rem] leading-snug text-forest transition-colors group-hover:text-sage-ink md:text-[1.4rem]">
                      {it.q}
                    </span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                        on ? "border-forest bg-forest text-cream" : "border-forest/20 text-forest group-hover:border-forest/50"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" className="acc-icon h-4 w-4" data-open={on} fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="acc-panel" data-open={on}>
                  <div>
                    <p className="max-w-[56ch] pb-7 pr-14 leading-relaxed text-ink/70">{it.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
