"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePointerFine, usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Small accent dot; scales up and hollows out over interactive elements. */
export function Cursor() {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.25 });

  const active = fine && !reduced;

  useEffect(() => {
    if (!active) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setHot(Boolean(el?.closest?.("a, button, summary, [role='tab'], input, select")));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [active, x, y]);

  if (!active) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <m.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-pill"
        animate={{
          width: hot ? 44 : 10,
          height: hot ? 44 : 10,
          borderWidth: hot ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          borderStyle: "solid",
          borderColor: "var(--accent)",
          backgroundColor: hot
            ? "color-mix(in srgb, var(--accent) 14%, transparent)"
            : "var(--accent-bright)",
        }}
      />
    </m.div>
  );
}
