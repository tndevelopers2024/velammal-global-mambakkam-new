"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import { updates, sectionIds } from "@/content/site";
import { DUR, EASE, VIEWPORT } from "@/lib/motion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Updates() {
  return (
    <section id={sectionIds.updates} className="surface-2 py-section">
      <div className="container-page">
        <div className="grid-12">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="06">Journal</Eyebrow>
            <SectionHeading
              className="mt-7"
              text={updates.heading}
              headingClassName="text-h2 font-light text-fg"
            />
          </div>
          <m.p
            data-motion
            className="col-span-12 mt-8 max-w-[46ch] self-end text-lead text-fg-mute lg:col-span-5 lg:col-start-8 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: DUR.base, ease: EASE, delay: 0.1 }}
          >
            {updates.sub}
          </m.p>
        </div>

        <div className="mt-[clamp(3.5rem,8vh,6rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-16 md:grid-cols-2">
          {updates.items.map((item, i) => {
            const external = item.href.startsWith("http");
            return (
              // motion owns the transform, so the card lift is a variant
              // rather than a hover: utility it would overwrite
              <m.article
                data-motion
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: DUR.slow, ease: EASE, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.45, ease: EASE } }}
                className="group card overflow-hidden transition-[background-color,box-shadow,border-color] duration-500 hover:border-line-strong hover:shadow-[var(--shadow-lift)]"
              >
                <Link
                  href={item.href}
                  className="block p-[clamp(1.25rem,2vw,1.75rem)]"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {/* a warm, desaturated print that comes back to full colour
                      on hover — not a binary greyscale switch */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-paper-3">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 46vw"
                      className="object-cover [filter:sepia(0.45)_saturate(0.55)_contrast(1.04)] transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:[filter:none]"
                    />
                  </div>

                  <p className="mt-7 flex items-center gap-3">
                    <span aria-hidden="true" className="block h-3 w-px bg-accent-bright" />
                    <span className="eyebrow [--eyebrow-color:var(--accent)]">
                      {item.tag}
                    </span>
                  </p>

                  <h3 className="mt-4 max-w-[22ch] text-h3 font-light text-fg transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="measure mt-4 text-body text-fg-mute">
                    {item.excerpt}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-3 text-[0.9375rem] font-medium text-fg">
                    {updates.readMore}
                    {/* pulls back a beat before it accelerates away */}
                    <span
                      aria-hidden="true"
                      className="inline-block group-hover:animate-[vgs-arrow-nudge_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </m.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
