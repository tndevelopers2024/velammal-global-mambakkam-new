"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { whyConsider, sectionIds } from "@/content/site";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActWipe } from "@/components/ui/ActWipe";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** 7/5 then 5/7 then 7/5 — the column split refuses to settle. */
const WIDE_IMAGE = [true, false, true];

export function WhyConsider() {
  const ref = useRef<HTMLElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  // The heading holds the top of the viewport while the pillars ride up over
  // it on their own opaque paper — and dissolves as they arrive, so it is
  // never guillotined by the covering edge. Desktop only: on a narrow screen
  // nothing is stacked and the heading simply scrolls away.
  const pinned = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress: pillarsIn } = useScroll({
    target: pillarsRef,
    offset: ["start 88%", "start 34%"],
  });
  const headingOpacity = useTransform(pillarsIn, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      id={sectionIds.why}
      /* clip, not hidden: `overflow: hidden` would make this a scroll
         container and the sticky heading below would never stick */
      className="surface relative isolate overflow-clip py-section"
    >
      <ActWipe target={ref} />

      <div className="container-page">
        <m.div
          className="grid-12 lg:sticky lg:top-[7.5rem] lg:z-0"
          style={pinned && !reduced ? { opacity: headingOpacity } : undefined}
        >
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow index="01">Why Velammal</Eyebrow>
            <SectionHeading
              className="mt-7"
              text={whyConsider.heading}
              headingClassName="text-h2 font-light text-fg"
            />
          </div>
          <m.div
            data-motion
            className="relative col-span-12 mt-8 self-end lg:col-span-5 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: 0.1 }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-[0.28em] -left-[0.12em] -z-10 font-display text-[clamp(9rem,16vw,16rem)] leading-none font-light text-fg/[0.055] select-none"
            >
              &ldquo;
            </span>
            <p className="max-w-[52ch] text-lead text-fg-mute">{whyConsider.intro}</p>
          </m.div>
        </m.div>

        <div
          ref={pillarsRef}
          className="relative z-10 mt-[clamp(4rem,9vh,7rem)] bg-paper"
        >
          {whyConsider.pillars.map((pillar, i) => {
            const wide = WIDE_IMAGE[i % WIDE_IMAGE.length];
            return (
              <m.article
                data-motion
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.slow, ease: EASE }}
                className="group grid-12 items-center border-t border-line py-[clamp(2.5rem,5vh,4.5rem)] last:border-b"
              >
                <div
                  className={
                    wide
                      ? "col-span-12 md:order-1 md:col-span-7"
                      : "col-span-12 md:order-2 md:col-span-5 md:col-start-8"
                  }
                >
                  <m.div
                    data-motion
                    className="relative aspect-[3/2] w-full overflow-hidden rounded-card bg-paper-3"
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={VIEWPORT}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.08 }}
                  >
                    <Image
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      sizes={wide ? "(max-width: 768px) 100vw, 56vw" : "(max-width: 768px) 100vw, 40vw"}
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </m.div>
                </div>

                <div
                  className={`col-span-12 mt-8 md:mt-0 ${
                    wide
                      ? "md:order-2 md:col-span-4 md:col-start-9"
                      : "md:order-1 md:col-span-6 md:col-start-1"
                  }`}
                >
                  <p className="eyebrow tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-h3 font-light text-fg">
                    {pillar.title}
                  </h3>
                  <p className="measure mt-5 text-body text-fg-mute">{pillar.body}</p>
                </div>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
