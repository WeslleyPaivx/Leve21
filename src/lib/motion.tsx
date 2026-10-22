/**
 * Camada de movimento leve, sem dependências:
 * IntersectionObserver para revelações, um único listener de rolagem com rAF para
 * parallax/progresso e CSS para as transições (GPU: transform + opacity).
 * Tudo respeita prefers-reduced-motion.
 */
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

const reduceMQ =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;

export const prefersReducedMotion = () => !!reduceMQ?.matches;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (!reduceMQ) return;
    const on = () => setReduced(reduceMQ.matches);
    reduceMQ.addEventListener("change", on);
    return () => reduceMQ.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ---------- loop único de rolagem ----------
 * Cada assinante LÊ o que precisa (posições, medidas) e devolve opcionalmente uma
 * função que ESCREVE (estilos). Todas as leituras acontecem antes de todas as
 * escritas no mesmo quadro, evitando recálculos forçados de layout/estilo.
 */
type Writer = () => void;
type ScrollFn = (y: number, vh: number) => Writer | void;
const subscribers = new Set<ScrollFn>();
let ticking = false;
let listening = false;

function flush(fns: Iterable<ScrollFn>) {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const writes: Writer[] = [];
  for (const fn of fns) {
    const w = fn(y, vh);
    if (w) writes.push(w);
  }
  for (const w of writes) w();
}
function run() {
  ticking = false;
  flush(subscribers);
}
function onScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(run);
  }
}
export function onScrollFrame(fn: ScrollFn) {
  subscribers.add(fn);
  if (!listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    listening = true;
  }
  requestAnimationFrame(() => {
    if (subscribers.has(fn)) flush([fn]);
  });
  return () => {
    subscribers.delete(fn);
  };
}

/** Parallax: desloca o elemento conforme sua posição relativa ao centro da tela. */
export function useParallax<T extends HTMLElement>(speed = 0.1, axis: "y" | "x" = "y") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let last = "";
    return onScrollFrame((_, vh) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const d = ((r.top + r.height / 2 - vh / 2) * -speed).toFixed(1);
      const t = axis === "x" ? `translate3d(${d}px, 0px, 0)` : `translate3d(0px, ${d}px, 0)`;
      if (t === last) return;
      last = t;
      // transform direto (não variável CSS herdada): recalcula só este elemento
      return () => {
        el.style.transform = t;
      };
    });
  }, [speed, axis]);
  return ref;
}

/**
 * Pausa animações infinitas (CSS) enquanto o elemento está fora da tela:
 * marca data-offscreen="true" e o CSS pausa as animações dentro dele.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        el.dataset.offscreen = e.isIntersecting ? "false" : "true";
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

/** Visibilidade (uma vez por padrão). */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, rootMargin = "0px 0px -12% 0px", threshold = 0.15 } = {},
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin, threshold]);
  return inView;
}

type RevealProps = {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale" | "left" | "right" | "blur";
  style?: CSSProperties;
  id?: string;
};

/** Revela o conteúdo quando entra na tela (classes em index.css). */
export function Reveal({ as = "div", children, className = "", delay = 0, variant = "up", style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return createElement(
    as,
    {
      ref,
      id,
      className: `reveal reveal-${variant} ${className}`,
      "data-in": inView ? "true" : "false",
      style: { ...style, "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}

/** Inclinação 3D que segue o ponteiro (apenas em dispositivos com hover fino). */
export function useTilt<T extends HTMLElement>(max = 10) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(0)}%`);
        el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(0)}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

/** Rolagem suave até uma âncora, respeitando movimento reduzido e o cabeçalho fixo. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
