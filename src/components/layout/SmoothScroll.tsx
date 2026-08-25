"use client";

import { useLenis } from "@/lib/useLenis";

/** Mount-only side effect: Lenis at lerp 0.09, off under reduced motion. */
export function SmoothScroll() {
  useLenis();
  return null;
}
