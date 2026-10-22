/**
 * Configuração vinda das variáveis de ambiente (Vite expõe apenas VITE_*).
 * Nada aqui é secreto: tudo vai para o navegador. Não coloque chaves de API.
 * Cada valor é validado; valores fora do formato esperado são ignorados.
 */
const env = import.meta.env;

const clean = (v: unknown, max = 200) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max) : "";

const match = (v: string, re: RegExp) => (re.test(v) ? v : "");

/** Só aceita arquivos do próprio site (ex.: /media/hero.mp4), exigência da CSP. */
const localAsset = (v: string, ext: RegExp) =>
  /^\/(?!\/)[A-Za-z0-9/_.-]{1,150}$/.test(v) && !v.includes("..") && ext.test(v) ? v : "";

export const config = {
  checkoutUrl: clean(env.VITE_CAKTO_CHECKOUT_URL, 500),
  forwardParams: (clean(env.VITE_CAKTO_FORWARD_PARAMS) || "utm_source,utm_medium,utm_campaign")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean),
  price: match(clean(env.VITE_PRICE, 12), /^\d{1,4},\d{2}$/) || "39,90",
  guaranteeDays: match(clean(env.VITE_GUARANTEE_DAYS, 3), /^(?:[1-9]|[1-9]\d)$/),
  heroVideoUrl: localAsset(clean(env.VITE_HERO_VIDEO_URL), /\.(mp4|webm)$/i),
  heroPosterUrl: localAsset(clean(env.VITE_HERO_POSTER_URL), /\.(jpe?g|png|webp|avif)$/i),
  legalName: clean(env.VITE_LEGAL_NAME, 120),
  legalDocument: clean(env.VITE_LEGAL_DOCUMENT, 40),
  contactEmail: match(clean(env.VITE_CONTACT_EMAIL, 120), /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,24}$/),
} as const;
