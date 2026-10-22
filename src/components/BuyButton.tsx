import type { MouseEvent } from "react";
import { buildCheckoutUrl, isCheckoutReady } from "../lib/checkout";

type Props = {
  label?: string;
  className?: string;
  variant?: "gold" | "forest";
  size?: "md" | "lg";
  full?: boolean;
};

/**
 * Botão de compra → checkout hospedado oficial da Cakto.
 * Sem VITE_CAKTO_CHECKOUT_URL válida, fica desativado (sem checkout fictício).
 */
export function BuyButton({ label = "Quero o Leve21", className = "", variant = "gold", size = "md", full }: Props) {
  const ready = isCheckoutReady();
  const cls = `btn btn-${variant} ${size === "lg" ? "min-h-[58px] px-8 text-[1.02rem]" : ""} ${full ? "w-full" : ""} ${className}`;

  if (!ready) {
    return (
      <span role="link" aria-disabled="true" className={cls} title="O link de compra ainda não foi configurado">
        Checkout em configuração
      </span>
    );
  }

  // Monta o link no clique para incluir as UTMs da visita atual.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const url = buildCheckoutUrl();
    if (url) e.currentTarget.href = url;
  };

  return (
    <a href={buildCheckoutUrl() ?? "#oferta"} onClick={handleClick} className={cls} rel="noopener">
      <span>{label}</span>
      <span className="btn-dot" aria-hidden="true" />
    </a>
  );
}
