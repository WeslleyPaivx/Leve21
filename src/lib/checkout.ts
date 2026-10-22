import { config } from "../config";

/** Domínios aceitos para o checkout hospedado oficial da Cakto. */
const ALLOWED_HOSTS = ["pay.cakto.com.br"];

/** Retorna a URL base do checkout se for válida (https + domínio oficial). */
export function getCheckoutBase(): URL | null {
  if (!config.checkoutUrl) return null;
  try {
    const url = new URL(config.checkoutUrl);
    if (url.protocol !== "https:") return null;
    if (!ALLOWED_HOSTS.includes(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

export const isCheckoutReady = () => getCheckoutBase() !== null;

/**
 * Monta o link final do checkout repassando somente os parâmetros permitidos
 * (por padrão utm_source, utm_medium, utm_campaign) presentes na URL de entrada.
 * Parâmetros já definidos no link da Cakto não são sobrescritos.
 */
export function buildCheckoutUrl(search: string = window.location.search): string | null {
  const base = getCheckoutBase();
  if (!base) return null;
  const incoming = new URLSearchParams(search);
  const out = new URL(base.toString());
  for (const key of config.forwardParams) {
    const value = incoming.get(key);
    if (value && !out.searchParams.has(key)) {
      out.searchParams.set(key, value.slice(0, 200));
    }
  }
  return out.toString();
}
