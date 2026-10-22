import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { hero, marquee } from "../content";
import { config } from "../config";
import { prefersReducedMotion, scrollToId, useParallax, onScrollFrame } from "../lib/motion";
import { BookCover, PlannerPage } from "../components/Mockups";

function HeroVideo() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    // Vídeo opcional: só carrega se configurado, sem movimento reduzido e sem economia de dados.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (config.heroVideoUrl && !prefersReducedMotion() && !conn?.saveData) setOk(true);
  }, []);
  if (!config.heroVideoUrl && !config.heroPosterUrl) return null;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {ok ? (
        <video
          className="h-full w-full object-cover opacity-45"
          src={config.heroVideoUrl}
          poster={config.heroPosterUrl || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : config.heroPosterUrl ? (
        <img src={config.heroPosterUrl} alt="" className="h-full w-full object-cover opacity-45" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest/40 to-forest-deep/90" />
    </div>
  );
}

export function Hero() {
  const stage = useParallax<HTMLDivElement>(-0.06);
  const backBook = useParallax<HTMLDivElement>(0.08);
  const chip = useParallax<HTMLDivElement>(-0.14);
  const content = useRef<HTMLDivElement>(null);

  // Saída cinematográfica: o texto desvanece e recua ao rolar.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    return onScrollFrame((y, vh) => {
      const el = content.current;
      if (!el) return;
      const p = Math.min(1, Math.max(0, y / (vh * 0.85)));
      el.style.opacity = String(1 - p * 0.9);
      el.style.transform = `translate3d(0, ${p * -40}px, 0) scale(${1 - p * 0.04})`;
    });
  }, []);

  let wordIndex = 0;

  return (
    <section
      id="topo"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-deep text-cream"
      aria-labelledby="hero-title"
    >
      {/* atmosfera */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="hero-aurora aurora-1 left-[-20%] top-[-10%] h-[70vmax] w-[70vmax]" />
        <div className="hero-aurora aurora-2 right-[-25%] top-[20%] h-[55vmax] w-[55vmax]" />
        <div className="hero-aurora aurora-3 bottom-[-30%] left-[10%] h-[60vmax] w-[60vmax]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(15_24_19/0.65)_100%)]" />
      </div>
      <HeroVideo />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 pb-28 pt-28 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pb-32 md:pt-32">
        <div ref={content} className="will-change-transform">
          <p className="fade-in mb-6 inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-gold-soft" style={{ "--d": "100ms" } as CSSProperties}>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="max-w-[13ch] font-display text-[clamp(2.7rem,11vw,5.2rem)] md:max-w-[14.5ch] font-light leading-[0.98]">
            {hero.titleLines.map((line, li) => (
              <span key={li}>
                {line.map((w) => {
                  const d = 250 + wordIndex++ * 85;
                  return (
                    <span key={w.t} className="word mr-[0.22em]">
                      <span
                        className={w.accent ? "italic text-gold-soft" : ""}
                        style={{ "--d": `${d}ms` } as CSSProperties}
                      >
                        {w.t}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p
            className="fade-in mt-7 max-w-[34ch] text-[1.06rem] leading-relaxed text-cream/75 md:text-lg"
            style={{ "--d": "1100ms" } as CSSProperties}
          >
            {hero.subtitle}
          </p>

          <div className="fade-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "1300ms" } as CSSProperties}>
            <a
              href="#jornada"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("jornada");
              }}
              className="btn btn-gold"
            >
              {hero.ctaPrimary}
              <span className="btn-dot" aria-hidden="true" />
            </a>
            <a
              href="#pilares"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("pilares");
              }}
              className="btn btn-ghost text-cream"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* cena de produto */}
        <div className="fade-in relative mx-auto mt-6 w-full max-w-[360px] md:mt-0 md:max-w-[470px]" style={{ "--d": "700ms" } as CSSProperties}>
          <div ref={stage} className="parallax relative aspect-[4/4.1] w-full">
            <div ref={backBook} className="parallax absolute left-[4%] top-[6%] w-[46%]">
              <div className="float-b" style={{ "--r": "-9deg" } as CSSProperties}>
                <PlannerPage className="text-[10px] sm:text-[11px]" day={8} />
              </div>
            </div>
            <div className="absolute right-[6%] top-0 w-[56%]">
              <div className="float-a" style={{ "--r": "5deg" } as CSSProperties}>
                <BookCover className="text-[11px] sm:text-[13px]" />
              </div>
            </div>
            <div ref={chip} className="parallax absolute bottom-[4%] left-0">
              <div className="float-c rounded-2xl border border-cream/15 bg-cream/10 px-4 py-3 backdrop-blur-md" style={{ "--r": "-2deg" } as CSSProperties}>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/60">Sua jornada</p>
                <div className="mt-2 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-5 w-[5px] rounded-full ${i < 7 ? "bg-gold" : i < 14 ? "bg-sage" : "bg-cream/25"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-[14%] right-[2%] rounded-full bg-gold px-4 py-2 text-xs font-bold text-forest-deep shadow-lg float-b" style={{ "--r": "4deg" } as CSSProperties}>
              21 dias
            </div>
          </div>
        </div>
      </div>

      {/* faixa em movimento */}
      <div className="marquee relative border-t border-cream/10 py-4 text-cream/70" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[...marquee, ...marquee].map((m, i) => (
                <span key={`${k}-${i}`} className="flex items-center whitespace-nowrap px-6 font-display text-lg italic">
                  {m}
                  <span className="ml-12 h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-20 left-1/2 hidden h-12 w-px -translate-x-1/2 overflow-hidden bg-cream/15 md:block" aria-hidden="true">
        <span className="scroll-cue block h-1/2 w-full bg-gold" />
      </div>
    </section>
  );
}
