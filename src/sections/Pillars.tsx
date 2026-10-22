import { useEffect, useRef, useState } from "react";
import { pillars } from "../content";
import { Reveal, useInView, prefersReducedMotion } from "../lib/motion";

/** Ilustração abstrata de cada pilar (CSS leve, animada na troca de aba). */
function PillarArt({ id }: { id: string }) {
  if (id === "alimentacao") {
    // um prato: metade vegetais, um quarto grãos, um quarto proteína (ilustrativo)
    return (
      <div className="relative grid h-full w-full place-items-center" aria-hidden="true">
        <span className="swap-enter absolute aspect-square w-[64%] rounded-full bg-cream/90 shadow-[0_30px_50px_-25px_rgb(0_0_0/0.45)]" />
        <span
          className="swap-enter absolute aspect-square w-[50%] rounded-full"
          style={{
            animationDelay: "120ms",
            background:
              "conic-gradient(from -30deg, #4f6b55 0 50%, #e6d4ad 50% 75%, #c9a96b 75% 100%)",
          }}
        />
        <span className="swap-enter absolute aspect-square w-[22%] rounded-full bg-cream/95" style={{ animationDelay: "220ms" }} />
      </div>
    );
  }
  if (id === "movimento") {
    return (
      <div className="relative h-full w-full" aria-hidden="true">
        <div className="flex h-full w-full items-end justify-center gap-[4%] px-[14%] pb-[22%]">
          {[22, 34, 46, 58, 70, 82].map((h, i) => (
            <span
              key={i}
              className="swap-enter w-[12%] rounded-t-xl"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 90}ms`,
                background: i === 5 ? "var(--color-gold)" : `rgb(247 243 234 / ${0.18 + i * 0.1})`,
              }}
            />
          ))}
        </div>
        <span className="absolute inset-x-0 bottom-[8%] text-center font-display text-xl italic text-forest-deep">no seu ritmo</span>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {["Lista de compras", "Plano B", "Pausa"].map((label, i) => (
        <div
          key={label}
          className="swap-enter absolute left-1/2 w-[64%] -translate-x-1/2 rounded-2xl bg-cream p-4 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.4)]"
          style={{ top: `${16 + i * 22}%`, animationDelay: `${i * 120}ms`, rotate: `${(i - 1) * -3}deg` }}
        >
          <div className="flex items-center gap-3">
            <span className={`h-4 w-4 shrink-0 rounded-full border-2 ${i === 0 ? "border-sage bg-sage" : "border-sage"}`} />
            <span className="text-sm font-semibold text-forest">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Pillars() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const visible = useInView(box, { once: false, threshold: 0.4 });
  const p = pillars[active];

  // Avança sozinho enquanto visível, até a pessoa interagir.
  useEffect(() => {
    if (!auto || !visible || prefersReducedMotion()) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % pillars.length), 5200);
    return () => clearTimeout(t);
  }, [active, auto, visible]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  return (
    <section id="pilares" className="relative bg-cream pb-24 md:pb-36" aria-labelledby="pilares-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal as="p" className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage-ink">
              Os três pilares
            </Reveal>
            <Reveal as="h2" delay={80} className="font-display text-[clamp(2.2rem,7vw,4rem)] font-light leading-[1.02] text-forest">
              <span id="pilares-title">
                Três caminhos, <em className="text-sage-ink">uma rotina.</em>
              </span>
            </Reveal>
          </div>
        </div>

        <Reveal variant="scale" delay={100}>
          <div ref={box} className="overflow-hidden rounded-[32px] bg-forest text-cream shadow-[0_40px_100px_-50px_rgb(27_44_36/0.9)]">
            {/* abas */}
            <div role="tablist" aria-label="Pilares do Leve21" className="grid grid-cols-3 border-b border-cream/10">
              {pillars.map((pl, i) => {
                const on = i === active;
                return (
                  <button
                    key={pl.id}
                    role="tab"
                    id={`pilar-tab-${i}`}
                    aria-selected={on}
                    aria-controls="pilar-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => pick(i)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        const n = (i + (e.key === "ArrowRight" ? 1 : -1) + pillars.length) % pillars.length;
                        pick(n);
                        document.getElementById(`pilar-tab-${n}`)?.focus();
                      }
                    }}
                    className={`relative px-2 py-5 text-left transition-colors duration-500 md:px-8 md:py-6 ${on ? "text-cream" : "text-cream/65 hover:text-cream"}`}
                  >
                    <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-gold md:text-xs">{pl.n}</span>
                    <span className="mt-1 block font-display text-[0.98rem] leading-tight md:text-xl">{pl.name}</span>
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-cream/10">
                      <span
                        key={on && auto && visible ? `run-${active}` : `idle-${i}`}
                        className={`block h-full origin-left bg-gold ${on ? (auto && visible ? "tab-run" : "scale-x-100") : "scale-x-0"}`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* painel */}
            <div id="pilar-panel" role="tabpanel" aria-labelledby={`pilar-tab-${active}`} className="grid md:grid-cols-2">
              <div key={`t-${p.id}`} className="swap-enter flex flex-col justify-center p-7 md:p-12">
                <p className="font-display text-[clamp(1.9rem,6vw,3rem)] italic leading-[1.05] text-gold-soft">{p.lead}</p>
                <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-cream/75">{p.body}</p>
              </div>
              <div key={`a-${p.id}`} className="relative m-3 aspect-[4/3] overflow-hidden rounded-[24px] bg-sage md:m-5 md:aspect-auto md:min-h-[360px]">
                <PillarArt id={p.id} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
