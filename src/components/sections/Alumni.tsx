"use client";

import { alumni, sectionIds } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";

export function Alumni() {
  return (
    <section
      id={sectionIds.alumni}
      className="surface overflow-clip py-section"
      aria-label={alumni.heading}
    >
      <div className="container-page">
        <Eyebrow index="06">Where they are now</Eyebrow>
        <SectionHeading
          className="mt-7"
          text={alumni.heading}
          headingClassName="text-h2 font-light text-fg"
        />
      </div>

      <div className="mt-[clamp(3rem,7vh,5rem)]">
        <Marquee people={alumni.people} />
      </div>
    </section>
  );
}
