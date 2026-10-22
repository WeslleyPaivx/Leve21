/**
 * Configuração vinda das variáveis de ambiente (Vite expõe apenas VITE_*).
 * Nada aqui é secreto: tudo vai para o navegador. Não coloque chaves de API.
 */
const env = import.meta.env;

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const config = {
  checkoutUrl: clean(env.VITE_CAKTO_CHECKOUT_URL),
  forwardParams: (clean(env.VITE_CAKTO_FORWARD_PARAMS) || "utm_source,utm_medium,utm_campaign")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean),
  price: clean(env.VITE_PRICE) || "39,90",
  guaranteeDays: clean(env.VITE_GUARANTEE_DAYS),
  heroVideoUrl: clean(env.VITE_HERO_VIDEO_URL),
  heroPosterUrl: clean(env.VITE_HERO_POSTER_URL),
  legalName: clean(env.VITE_LEGAL_NAME),
  legalDocument: clean(env.VITE_LEGAL_DOCUMENT),
  contactEmail: clean(env.VITE_CONTACT_EMAIL),
} as const;
