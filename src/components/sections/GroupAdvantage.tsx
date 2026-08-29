"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { groupAdvantage, sectionIds } from "@/content/site";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tabs } from "@/components/ui/Tabs";
import { ActWipe } from "@/components/ui/ActWipe";

export function GroupAdvantage() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      id={sectionIds.advantage}
      className="surface relative isolate overflow-clip py-section"
    >
      {/* bone → ink: the act change is a designed moment, not a rule */}
      <ActWipe
        target={ref}
        className="bg-paper"
        bandColor="color-mix(in srgb, var(--accent) 12%, transparent)"
      />

      <div className="container-page">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="05">The network</Eyebrow>
            <SectionHeading
              className="mt-7"
              text={groupAdvantage.heading}
              headingClassName="text-h2 font-light text-fg"
            />
          </div>
          <m.p
            data-motion
            className="col-span-12 mt-8 max-w-[46ch] self-end text-lead text-fg-mute lg:col-span-5 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: 0.1 }}
          >
            {groupAdvantage.sub}
          </m.p>
        </div>

        <div className="mt-[clamp(3rem,7vh,5rem)] grid-12">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <Tabs tabs={groupAdvantage.tabs} />
          </div>
        </div>

        <Journey />
        <Approach />
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- journey */

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="mt-[clamp(5rem,12vh,9rem)]">
      <h3 className="text-h3 font-light text-fg">
        {groupAdvantage.journey.title}
      </h3>

      <ol className="relative mt-12 pl-8 md:pl-0">
        {/* rail */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-0 w-px bg-line md:left-[clamp(7rem,14vw,12rem)]"
        />
        <m.span
          aria-hidden="true"
          data-motion
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-[linear-gradient(to_bottom,var(--accent-bright),var(--accent)_55%,color-mix(in_srgb,var(--accent)_35%,transparent))] md:left-[clamp(7rem,14vw,12rem)]"
        />

        {groupAdvantage.journey.milestones.map((milestone, i) => (
          <m.li
            data-motion
            key={milestone.year}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: i * 0.08 }}
            className="relative grid gap-4 pb-[clamp(3rem,7vh,5.5rem)] last:pb-0 md:grid-cols-[clamp(7rem,14vw,12rem)_1fr] md:gap-0"
          >
            {/* the marker that sits on the rail, punched out of the act */}
            <span
              aria-hidden="true"
              className="absolute top-[0.9rem] left-0 size-2.5 -translate-x-1/2 rounded-pill bg-accent-bright ring-4 ring-[var(--paper)] md:left-[clamp(7rem,14vw,12rem)]"
            />
            <p className="display-num text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.9] text-fg [text-shadow:0_0_44px_color-mix(in_srgb,var(--accent)_38%,transparent)] md:pr-10 md:text-right">
              {milestone.year}
            </p>
            <p className="measure text-body text-fg-mute md:pl-[clamp(2rem,4vw,4rem)]">
              {milestone.body}
            </p>
          </m.li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------- approach */

function Approach() {
  return (
    <div className="mt-[clamp(4rem,10vh,7rem)]">
      <h3 className="text-h3 font-light text-fg">
        {groupAdvantage.approach.title}
      </h3>
      <div className="mt-10 grid gap-px border-t border-line md:grid-cols-2">
        {groupAdvantage.approach.items.map((item, i) => (
          <m.div
            data-motion
            key={item}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: i * 0.08 }}
            /* motion owns the transform, so the lift is a variant rather than
               a hover: utility that it would overwrite */
            whileHover={{ y: -4, transition: { duration: 0.4, ease: EASE } }}
            className="border-b border-line py-10 transition-[box-shadow,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[color-mix(in_srgb,var(--paper-2)_70%,transparent)] hover:shadow-[var(--shadow-card)] md:border-b-0 md:py-12 md:odd:pr-12 md:even:border-l md:even:border-l-line md:even:pl-12"
          >
            <p className="eyebrow tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="measure mt-5 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-[1.4] font-light text-fg">
              {item}
            </p>
          </m.div>
        ))}
      </div>
    </div>
  );
}
