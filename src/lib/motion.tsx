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

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/* ---------- loop único de rolagem ---------- */
type ScrollFn = (y: number, vh: number) => void;
const subscribers = new Set<ScrollFn>();
let ticking = false;
let listening = false;

function run() {
  ticking = false;
  const y = window.scrollY;
  const vh = window.innerHeight;
  subscribers.forEach((fn) => fn(y, vh));
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
  requestAnimationFrame(() => fn(window.scrollY, window.innerHeight));
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
    return onScrollFrame((_, vh) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const delta = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.setProperty("--px", axis === "x" ? `${delta.toFixed(1)}px` : "0px");
      el.style.setProperty("--py", axis === "y" ? `${delta.toFixed(1)}px` : "0px");
    });
  }, [speed, axis]);
  return ref;
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
