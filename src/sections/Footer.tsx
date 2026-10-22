import { config } from "../config";
import { BuyButton } from "../components/BuyButton";
import { Reveal } from "../lib/motion";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="rodape" className="relative overflow-hidden bg-forest-deep text-cream">
      {/* fechamento */}
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 text-center md:px-8 md:pt-32">
        <Reveal as="p" variant="blur" className="mx-auto max-w-[16ch] font-display text-[clamp(2.4rem,9vw,5rem)] font-light leading-[1]">
          Leve, <em className="text-gold-soft">um dia de cada vez.</em>
        </Reveal>
        <Reveal delay={150} className="on-dark mt-10 flex justify-center">
          <BuyButton label={`Começar por R$ ${config.price}`} size="lg" />
        </Reveal>
      </div>

      {/* informações legais */}
      <div className="mx-auto max-w-6xl border-t border-cream/10 px-5 py-10 text-[0.82rem] leading-relaxed text-cream/65 md:px-8">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <p>
              <strong className="font-semibold text-cream/80">Aviso importante.</strong> O Leve21 é um conteúdo educativo
              sobre organização, autocuidado e hábitos. Não é tratamento, não promete resultados específicos e não substitui
              a orientação de médico, nutricionista, psicólogo ou outro profissional de saúde.
            </p>
            <p>
              Os pagamentos são processados pela Cakto. Este site não coleta, não processa e não armazena dados de pagamento,
              e não usa cookies de rastreamento.
            </p>
          </div>
          <div className="space-y-1 md:text-right">
            <p className="font-display text-lg text-cream/85">
              <span className="italic">Leve</span>21<span className="text-gold">.</span>
            </p>
            {config.legalName && <p>{config.legalName}</p>}
            {config.legalDocument && <p>{config.legalDocument}</p>}
            {config.contactEmail && (
              <p>
                <a className="underline decoration-cream/30 underline-offset-4 hover:text-cream" href={`mailto:${config.contactEmail}`}>
                  {config.contactEmail}
                </a>
              </p>
            )}
            <p>© {year} Leve21. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>

      {/* assinatura — final absoluto do site */}
      <div className="border-t border-cream/10 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 text-center">
        <p className="text-[0.72rem] tracking-[0.04em] text-cream/65">
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/orbyn.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A96B] transition-opacity hover:opacity-80"
          >
            Orbyn Tech
          </a>
        </p>
      </div>
    </footer>
  );
}
