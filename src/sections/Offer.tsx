import { offer } from "../content";
import { config } from "../config";
import { useRef } from "react";
import { Reveal, useTilt, usePauseOffscreen } from "../lib/motion";
import { BuyButton } from "../components/BuyButton";
import { BookCover, PlannerPage } from "../components/Mockups";

export function Offer() {
  const tilt = useTilt<HTMLDivElement>(6);
  const [reais, centavos] = config.price.split(",");
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreen(sectionRef);

  return (
    <section ref={sectionRef} id="oferta" className="relative overflow-hidden bg-cream py-24 md:py-36" aria-labelledby="oferta-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal variant="scale">
          <div
            ref={tilt}
            className="tilt grain on-dark relative isolate overflow-hidden rounded-[36px] bg-forest-deep text-cream shadow-[0_50px_120px_-50px_rgb(27_44_36/0.95)]"
          >
            <div className="hero-aurora aurora-1 -left-1/4 -top-1/3 -z-10 h-[600px] w-[600px] opacity-40" aria-hidden="true" />
            <div className="hero-aurora aurora-2 -bottom-1/3 -right-1/4 -z-10 h-[500px] w-[500px] opacity-30" aria-hidden="true" />

            <div className="grid gap-10 p-7 md:grid-cols-[1.1fr_0.9fr] md:p-14">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-soft">{offer.kicker}</p>
                <h2 id="oferta-title" className="mt-4 font-display text-[clamp(2.3rem,7vw,4rem)] font-light leading-[1.02]">
                  {offer.title}
                </h2>

                <ul className="mt-8 space-y-4">
                  {offer.includes.map((it, i) => (
                    <Reveal as="li" key={it} delay={150 + i * 100} variant="left" className="flex items-center gap-4 text-lg">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/15 text-gold" aria-hidden="true">
                        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M2 6.5 5 9l5-6" />
                        </svg>
                      </span>
                      {it}
                    </Reveal>
                  ))}
                </ul>

                <div className="mt-10 flex items-end gap-2">
                  <span className="pb-2 text-cream/60">R$</span>
                  <span className="font-display text-[4.5rem] font-light leading-none md:text-[5.5rem]">{reais}</span>
                  {centavos && <span className="pb-3 font-display text-2xl">,{centavos}</span>}
                </div>
                <p className="mt-1 text-sm text-cream/55">Pagamento único · acesso digital</p>

                <div className="mt-8 max-w-sm">
                  <BuyButton size="lg" full label="Quero começar o Leve21" />
                </div>

                <ul className="mt-6 space-y-2 text-sm text-cream/60">
                  <li>Compra no checkout seguro e oficial da Cakto.</li>
                  <li>Acesso enviado por e-mail após a confirmação do pagamento.</li>
                  {config.guaranteeDays && (
                    <li>
                      {config.guaranteeDays} dias para solicitar o reembolso, se não for para você.
                    </li>
                  )}
                </ul>
              </div>

              <div className="relative hidden min-h-[380px] md:block" aria-hidden="true">
                <div className="absolute left-[6%] top-[14%] w-[52%] float-b" style={{ ["--r" as string]: "-8deg" }}>
                  <PlannerPage className="text-[11px]" day={21} />
                </div>
                <div className="absolute right-[4%] top-[4%] w-[58%] float-a" style={{ ["--r" as string]: "6deg" }}>
                  <BookCover className="text-[14px]" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
