"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/useReducedMotion";

const STRENGTH = 0.25;
const RADIUS = 60;

/** Wraps a primary CTA so it drifts toward the cursor. Pointer-fine only. */
export function MagneticWrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const reach = Math.max(r.width, r.height) / 2 + RADIUS;
    if (dist > reach) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * STRENGTH);
    y.set(dy * STRENGTH);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      className={`inline-block ${className}`}
      style={active ? { x: sx, y: sy } : undefined}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </m.span>
  );
}
