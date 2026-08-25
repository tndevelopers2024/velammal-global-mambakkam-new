"use client";

import { m, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * The section change. A full-bleed panel of the incoming surface whose
 * clip-path opens downward as the section arrives, so one band of paper gives
 * way to the next as a designed moment rather than a hard edge — with a soft
 * tonal band riding the clip line so the two tones pass through each other
 * instead of meeting as a cut.
 *
 * The band is dropped entirely under reduced motion, where the wipe resolves
 * to a plain panel and there is no travelling line for it to sit on.
 */
export function ActWipe({
  target,
  className = "bg-paper",
  bandColor = "color-mix(in srgb, var(--fg) 8%, transparent)",
}: {
  target: RefObject<HTMLElement | null>;
  className?: string;
  /** The tone the wipe passes through. */
  bandColor?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 95%", "start 45%"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(inset, (v) => `inset(0% 0% ${v}% 0%)`);
  const bandTop = useTransform(inset, (v) => `calc(${100 - v}% - 14vh)`);
  // the band exists only while the wipe is travelling
  const bandOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);

  return (
    <>
      <m.div
        aria-hidden="true"
        data-motion
        className={`absolute inset-0 -z-10 ${className}`}
        style={{ clipPath }}
      />
      {reduced ? null : (
        <m.div
          aria-hidden="true"
          className="absolute inset-x-0 -z-10 h-[14vh]"
          style={{
            top: bandTop,
            opacity: bandOpacity,
            backgroundImage: `linear-gradient(to bottom, transparent 0%, ${bandColor} 100%)`,
          }}
        />
      )}
    </>
  );
}
