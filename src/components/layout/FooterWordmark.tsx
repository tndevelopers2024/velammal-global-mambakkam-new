"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { logos } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * The closing wordmark, drifting up a little slower than the page as the last
 * of the footer arrives. Kept as the logo artwork rather than repeated text so
 * it stays decorative and is never audited for contrast — but sized from its
 * HEIGHT, because this lockup is 3.235:1 and a full-bleed width would make it
 * ~590px tall with the tree swallowing the footer.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["28%", "0%"]);

  return (
    <div ref={ref} className="overflow-clip">
      <m.div className="container-page" style={reduced ? undefined : { y }}>
        <Image
          src={logos.network.src}
          alt=""
          aria-hidden="true"
          width={logos.network.width}
          height={logos.network.height}
          className="h-auto w-full brightness-0 saturate-0 opacity-[0.07] select-none dark:opacity-[0.1] dark:invert"
        />
      </m.div>
    </div>
  );
}
