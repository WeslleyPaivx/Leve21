import { config } from "../config";

/** Único domínio aceito: o checkout hospedado oficial da Cakto. */
const ALLOWED_HOST = "pay.cakto.com.br";

/** Valores de UTM aceitos: letras, números e - _ . ~ + espaço, até 100 caracteres. */
const SAFE_VALUE = /^[\p{L}\p{N}\-_.~+ ]{1,100}$/u;
/** Nomes de parâmetro aceitos para repasse: só rastreamento (utm_*, src, sck). */
const SAFE_KEY = /^(?:utm_[a-z]{1,20}|src|sck)$/;
/** Forma exata exigida do link: https://pay.cakto.com.br/<caminho>, sem espaços, \\ ou @. */
const RAW_SHAPE = /^https:\/\/pay\.cakto\.com\.br\/[^\s\\@]+$/;

let cachedBase: URL | null | undefined;

/**
 * Retorna a URL base do checkout se for segura: https, domínio oficial exato,
 * porta padrão, sem usuário/senha embutidos. Qualquer outra coisa é recusada.
 */
export function getCheckoutBase(): URL | null {
  if (cachedBase !== undefined) return cachedBase ? new URL(cachedBase) : null;
  cachedBase = null;
  const raw = config.checkoutUrl;
  if (!raw || raw.length > 500 || !RAW_SHAPE.test(raw)) return null;
  try {
    const url = new URL(raw);
    if (
      url.protocol === "https:" &&
      url.hostname === ALLOWED_HOST &&
      url.port === "" &&
      url.username === "" &&
      url.password === "" &&
      url.pathname.length > 1
    ) {
      url.hash = "";
      cachedBase = url;
    }
  } catch {
    cachedBase = null;
  }
  return cachedBase ? new URL(cachedBase) : null;
}

export const isCheckoutReady = () => getCheckoutBase() !== null;

const forwardKeys = config.forwardParams.filter((k) => SAFE_KEY.test(k)).slice(0, 10);

/**
 * Monta o link final do checkout repassando somente os parâmetros permitidos
 * (por padrão utm_source, utm_medium, utm_campaign) presentes na URL de entrada.
 * Valores fora do padrão são descartados; parâmetros já definidos no link da Cakto
 * nunca são sobrescritos.
 */
export function buildCheckoutUrl(search: string = typeof window !== "undefined" ? window.location.search : ""): string | null {
  const base = getCheckoutBase();
  if (!base) return null;
  let incoming: URLSearchParams;
  try {
    incoming = new URLSearchParams(search.slice(0, 2000));
  } catch {
    return base.toString();
  }
  for (const key of forwardKeys) {
    const value = incoming.get(key)?.trim();
    if (value && SAFE_VALUE.test(value) && !base.searchParams.has(key)) {
      base.searchParams.set(key, value);
    }
  }
  return base.toString();
}
