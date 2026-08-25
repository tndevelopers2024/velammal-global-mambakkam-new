"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./useReducedMotion";

/** The live instance, so modals can pause the page behind them. */
let active: Lenis | null = null;

/**
 * Freeze the page behind a modal. Lenis owns the scroll on pointer-fine
 * devices, so stopping it is what actually works there; the class is the
 * fallback for touch, where Lenis never mounts.
 */
export function lockScroll(locked: boolean): void {
  if (locked) active?.stop();
  else active?.start();
  document.documentElement.classList.toggle("is-scroll-locked", locked);
}

/**
 * Smooth scroll. Driven off rAF and wired into motion's `useScroll` by letting
 * Lenis scroll the real document (motion reads window scroll natively).
 * Disabled outright under prefers-reduced-motion and on coarse pointers.
 */
export function useLenis(): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({ lerp: 0.09 });
    active = lenis;
    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links must still work while Lenis owns the scroll position.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (active === lenis) active = null;
    };
  }, [reduced]);
}
