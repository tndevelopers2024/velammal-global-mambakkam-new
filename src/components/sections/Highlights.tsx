"use client";

import Image from "next/image";
import { m } from "motion/react";
import { gallery, highlights, sectionIds } from "@/content/site";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** An ambient campus frame carried over from the contact sheet. */
const AMBIENT = gallery.images[4];

export function Highlights() {
  return (
    <section id={sectionIds.highlights} className="surface py-section">
      <div className="container-page">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="04">{highlights.eyebrowTitle}</Eyebrow>
            <SectionHeading
              className="mt-7"
              text={highlights.heading}
              headingClassName="text-h2 font-light text-fg"
            />
          </div>
        </div>

        {/* Desktop splits: a standing image on the left, the ledger on the
            right. The image is ambient, so it is dropped rather than stacked
            on narrow screens. */}
        <div className="mt-[clamp(3.5rem,8vh,6rem)] grid-12">
          <m.div
            data-motion
            className="col-span-5 hidden lg:block"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <div className="sticky top-[8rem]">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-panel bg-paper-3 shadow-[var(--shadow-card)]">
                <Image
                  src={AMBIENT.src}
                  alt={AMBIENT.alt}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
              <p className="eyebrow mt-5">{highlights.eyebrowTitle}</p>
            </div>
          </m.div>

          <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
            {highlights.items.map((item, i) => (
              <m.li
                data-motion
                key={item}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.base, ease: EASE, delay: (i % 2) * 0.08 }}
                className="group relative border-t border-line last:border-b"
              >
                <div className="relative flex items-center py-[clamp(1.75rem,3.5vh,3rem)]">
                  {/* oversized outlined numeral, sitting behind the line */}
                  <span
                    aria-hidden="true"
                    className="display-num pointer-events-none absolute -top-2 left-0 z-0 text-[clamp(3.25rem,9vw,9rem)] leading-none text-transparent opacity-[0.13] transition-opacity duration-700 select-none group-hover:opacity-25 [-webkit-text-stroke:1px_var(--fg)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="relative z-10 pl-[clamp(4.5rem,7vw,7.5rem)] text-[clamp(1.125rem,1.9vw,1.75rem)] leading-[1.35] font-light tracking-[-0.015em] text-fg">
                    {item}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />
              </m.li>
            ))}
          </ol>
        </div>

        {/* the closing thought, set as a pull-quote between two wine rules */}
        <m.div
          data-motion
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: DUR.slow, ease: EASE }}
          className="mx-auto mt-[clamp(4rem,10vh,8rem)] max-w-[58ch] border-y border-[color-mix(in_srgb,var(--accent)_38%,transparent)] py-[clamp(2.5rem,5vh,4rem)]"
        >
          <p className="text-center text-lead text-fg-mute">{highlights.closing}</p>
        </m.div>
      </div>
    </section>
  );
}
