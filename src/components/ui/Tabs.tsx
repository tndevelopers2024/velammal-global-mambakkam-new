"use client";

import { m, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import { EASE_IO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import type { AdvantageTab } from "@/content/site";

/** Segmented control with a sliding wine pill; panel image cross-fades. */
export function Tabs({ tabs }: { tabs: readonly AdvantageTab[] }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // The photograph drifts up inside its frame as the panel crosses the
  // viewport — depth without the frame itself ever moving.
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["44px", "-44px"]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Velammal Group institutions"
        onKeyDown={onKeyDown}
        className="relative inline-grid auto-cols-fr grid-flow-col rounded-pill border border-line bg-[color-mix(in_srgb,var(--paper-2)_70%,transparent)] p-1"
      >
        {/* the pill itself — a plain transform, no layout projection */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-pill bg-accent-bright shadow-[0_6px_18px_-8px_color-mix(in_srgb,var(--accent-bright)_80%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            width: `calc((100% - 0.5rem) / ${tabs.length})`,
            transform: `translateX(${active * 100}%)`,
          }}
        />
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-t-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-p-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className="relative rounded-pill px-6 py-2.5 text-[0.875rem] font-medium"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${
                  selected ? "text-on-accent" : "text-fg-mute hover:text-fg"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* The frame carries the drift as a custom property and the image layer
          reads it back through `parallax-slow` — motion owns the value, CSS
          owns the transform, so neither fights the other for `transform`. */}
      <m.div
        ref={panelRef}
        className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-panel bg-paper-3 shadow-[var(--shadow-card)] sm:aspect-[2/1]"
        style={reduced ? undefined : ({ "--parallax": imageY } as MotionStyle)}
      >
        {tabs.map((tab, i) => (
          <div
            key={tab.label}
            role="tabpanel"
            id={`${uid}-p-${i}`}
            aria-labelledby={`${uid}-t-${i}`}
            hidden={i !== active}
            className="absolute inset-0"
          >
            <m.div
              className="relative size-full"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE_IO }}
            >
              <div className="parallax-slow absolute inset-x-0 -top-[8%] -bottom-[8%]">
                <Image
                  src={tab.image.src}
                  alt={tab.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </m.div>
          </div>
        ))}
      </m.div>
    </div>
  );
}
