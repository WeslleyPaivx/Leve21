import { useState } from "react";
import { products } from "../content";
import { Reveal, useTilt } from "../lib/motion";
import { BookCover, PlannerPage } from "../components/Mockups";

export function Products() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const tilt = useTilt<HTMLDivElement>(12);
  const p = products[tab];

  return (
    <section id="material" className="relative overflow-hidden bg-cream-deep py-24 md:py-36" aria-labelledby="material-title">
      <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-sage/20 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* palco do mockup */}
        <Reveal variant="scale" className="order-2 md:order-1">
          <div ref={tilt} className="tilt relative mx-auto aspect-square w-full max-w-[440px]">
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(132_155_131/0.35),transparent_70%)]" aria-hidden="true" />
            {tab === 0 ? (
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-pressed={open}
                aria-label={open ? "Fechar o e-book" : "Abrir o e-book"}
                className="swap-enter group absolute left-1/2 top-1/2 w-[52%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <div className="book3d aspect-[3/4.2]" data-open={open}>
                  <div className="inner paper flex flex-col justify-center gap-3 p-[12%] text-left">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold">Boas-vindas</span>
                    <span className="font-display text-lg italic leading-tight text-forest">Uma rotina mais leve começa aqui.</span>
                    <span className="h-1.5 w-11/12 rounded-full bg-ink/10" />
                    <span className="h-1.5 w-4/5 rounded-full bg-ink/10" />
                    <span className="h-1.5 w-2/3 rounded-full bg-ink/10" />
                  </div>
                  <div className="cover">
                    <BookCover className="h-full w-full text-[12px] sm:text-[14px]" />
                  </div>
                </div>
                <span className="mt-5 block text-center text-xs font-medium text-forest/60 transition-colors group-hover:text-forest">
                  {open ? "Toque para fechar" : "Toque para abrir"}
                </span>
              </button>
            ) : (
              <div className="swap-enter absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2">
                <div className="float-a" style={{ ["--r" as string]: "-3deg" }}>
                  <PlannerPage className="text-[12px] sm:text-[14px]" day={1} />
                </div>
                <div className="absolute -right-[22%] top-[12%] w-[46%] float-b" style={{ ["--r" as string]: "8deg" }}>
                  <PlannerPage className="text-[6px] opacity-90 sm:text-[7px]" day={2} />
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <div className="order-1 md:order-2">
          <Reveal as="p" className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-sage-ink">
            O que você recebe
          </Reveal>
          <Reveal as="h2" delay={80} className="font-display text-[clamp(2.2rem,7vw,4rem)] font-light leading-[1.02] text-forest">
            <span id="material-title">
              Feito para <em className="text-sage-ink">usar,</em> não só ler.
            </span>
          </Reveal>

          <Reveal delay={160} className="mt-8">
            <div role="tablist" aria-label="Materiais" className="inline-flex rounded-full bg-white/70 p-1.5 shadow-inner">
              {products.map((pr, i) => (
                <button
                  key={pr.id}
                  role="tab"
                  aria-selected={tab === i}
                  aria-controls="produto-panel"
                  id={`produto-tab-${i}`}
                  onClick={() => {
                    setTab(i);
                    setOpen(false);
                  }}
                  className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-500 ${
                    tab === i ? "bg-forest text-cream shadow-md" : "text-forest/60 hover:text-forest"
                  }`}
                >
                  {pr.tab}
                </button>
              ))}
            </div>

            <div id="produto-panel" role="tabpanel" aria-labelledby={`produto-tab-${tab}`} key={p.id} className="swap-enter mt-8">
              <h3 className="font-display text-2xl text-forest md:text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-ink/70">{p.body}</p>
              <ul className="mt-6 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-forest">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-sage/25" aria-hidden="true">
                      <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
