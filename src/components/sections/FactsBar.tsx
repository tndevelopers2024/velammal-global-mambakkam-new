"use client";

import { m } from "motion/react";
import { facts, sectionIds } from "@/content/site";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { CountUp } from "@/components/ui/CountUp";

/**
 * A ledger, not cards. Five columns divided by hairlines, each hairline capped
 * with an accent dot so the dividers read as architecture rather than borders.
 * The bar rides up over the foot of the hero on its own raised paper, which is
 * what makes the fold and the page below read as one composition.
 */
export function FactsBar() {
  return (
    <section
      id={sectionIds.facts}
      aria-label="School at a glance"
      className="vgs-facts-overlap"
    >
      <div className="container-page">
        <m.dl
          data-motion
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 rounded-panel border border-line bg-[color-mix(in_srgb,var(--paper)_88%,var(--paper-2))] shadow-[var(--shadow-card)] backdrop-blur-xl md:grid-cols-5"
        >
          {facts.map((fact, i) => (
            <m.div
              key={fact.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
              }}
              className={`relative px-6 py-7 md:px-7 md:py-9 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i < facts.length - 1 ? "border-b border-line md:border-b-0" : ""} md:border-l md:border-line ${
                i === 0 ? "md:border-l-0" : ""
              } ${i === facts.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              {/* the accent dot that caps this column's divider — only where a
                  divider actually exists at that breakpoint */}
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className={`absolute -top-[2.5px] -left-[2.5px] size-[5px] rounded-pill bg-accent-bright ${
                    i % 2 === 1 ? "block" : "hidden md:block"
                  }`}
                />
              ) : null}
              <dt className="eyebrow">{fact.label}</dt>
              <dd className="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.75rem)] leading-[1.15] font-light tracking-[-0.02em] text-fg">
                <CountUp value={fact.value} />
              </dd>
            </m.div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}
