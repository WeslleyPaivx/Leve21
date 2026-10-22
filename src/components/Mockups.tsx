/** Mockups ilustrativos do e-book e do planner, desenhados em CSS (sem imagens pesadas). */

export function BookCover({ className = "" }: { className?: string }) {
  return (
    <div className={`book ${className}`} aria-hidden="true">
      <div className="absolute inset-0 flex flex-col justify-between p-[9%] pl-[13%]">
        <div className="flex items-center justify-between text-[0.55em] uppercase tracking-[0.28em] text-gold-soft/80">
          <span>E-book</span>
          <span>21 dias</span>
        </div>
        <div>
          <div className="mb-[8%] h-px w-1/3 bg-gold/70" />
          <p className="font-display text-[2.6em] leading-[0.9] italic">Leve</p>
          <p className="font-display text-[2.6em] leading-[0.9]">
            21<span className="text-gold">.</span>
          </p>
          <p className="mt-[8%] max-w-[85%] text-[0.62em] leading-snug text-cream/70">
            Organização, autocuidado e pequenas mudanças
          </p>
        </div>
        <svg viewBox="0 0 100 24" className="w-1/2 text-gold/80" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 18 C 20 2, 40 2, 50 12 S 80 22, 100 6" />
        </svg>
      </div>
    </div>
  );
}

export function PlannerPage({ className = "", day = 1 }: { className?: string; day?: number }) {
  return (
    <div className={`paper relative overflow-hidden rounded-[18px] ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between bg-forest px-[8%] py-[6%] text-cream">
        <span className="font-display text-[1.25em] italic">Planner</span>
        <span className="rounded-full bg-gold/90 px-[0.7em] py-[0.15em] text-[0.6em] font-bold tracking-wider text-forest-deep">
          DIA {String(day).padStart(2, "0")}
        </span>
      </div>
      <div className="space-y-[7%] px-[8%] py-[8%] text-ink">
        {[0.82, 0.64, 0.74].map((w, i) => (
          <div key={i} className="flex items-center gap-[6%]">
            <span
              className={`grid aspect-square w-[11%] shrink-0 place-items-center rounded-full border border-sage ${
                i === 0 ? "bg-sage" : ""
              }`}
            >
              {i === 0 && (
                <svg viewBox="0 0 12 12" className="w-1/2 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6.5 5 9l5-6" />
                </svg>
              )}
            </span>
            <span className="h-[0.42em] rounded-full bg-ink/12" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
        <div className="grid grid-cols-7 gap-[3%] pt-[3%]">
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-full ${i < 4 ? "bg-sage/80" : "bg-ink/8"}`}
            />
          ))}
        </div>
        <div className="space-y-[5%] rounded-[12px] bg-cream-deep/80 p-[6%]">
          <span className="block h-[0.38em] w-1/3 rounded-full bg-gold/70" />
          <span className="block h-[0.38em] w-11/12 rounded-full bg-ink/10" />
          <span className="block h-[0.38em] w-3/4 rounded-full bg-ink/10" />
        </div>
      </div>
    </div>
  );
}
