"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * `domAnimation` only — no drag, no layout projection. `strict` makes the
 * heavyweight `motion.*` components throw, so nothing can quietly pull the
 * full feature bundle back into the entry chunk.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
