"use client";

import { closingCta, sectionIds } from "@/content/site";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticWrap } from "@/components/ui/MagneticWrap";
import { Button } from "@/components/ui/Button";

/**
 * The finale. The name is set at the display tier — the largest type on the
 * page, and now a size that still lets the sentence read as a sentence — over
 * a slow-drifting field of hairlines and a warm accent pool, with a button
 * whose glow breathes rather than blinks.
 */
export function ClosingCta() {
  return (
    <section
      id={sectionIds.closing}
      className="vgs-closing-field surface overflow-clip bg-[radial-gradient(82%_70%_at_50%_44%,var(--accent-soft)_0%,color-mix(in_srgb,var(--accent)_3%,transparent)_46%,transparent_78%)] py-section-lg text-center"
    >
      <div className="container-page">
        <p className="eyebrow mb-8">{closingCta.eyebrow}</p>

        <SplitText
          as="h2"
          text={closingCta.line}
          className="text-display mx-auto block max-w-[14ch] font-light text-fg"
          accent="Global"
          accentClassName="text-accent pr-[0.14em] font-normal italic"
          stagger={0.055}
        />

        <div className="mt-[clamp(2.75rem,6vh,4.5rem)] flex flex-wrap items-center justify-center gap-5">
          <MagneticWrap>
            <span className="vgs-cta-glow inline-block rounded-pill">
              <Button href="#admissions" size="xl">
                {closingCta.cta}
              </Button>
            </span>
          </MagneticWrap>
          <MagneticWrap>
            <Button href={closingCta.ctaSecondary.href} variant="ghost" size="xl">
              {closingCta.ctaSecondary.label}
            </Button>
          </MagneticWrap>
        </div>
      </div>
    </section>
  );
}
