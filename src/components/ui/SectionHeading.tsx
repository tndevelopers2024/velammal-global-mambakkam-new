"use client";

import { m } from "motion/react";
import { EASE, VIEWPORT } from "@/lib/motion";
import { SplitText } from "./SplitText";

/** H2 with the wine underline that draws itself on scroll-in. */
export function SectionHeading({
  text,
  className = "",
  underline = true,
  headingClassName = "text-h2 font-light",
}: {
  text: string;
  className?: string;
  underline?: boolean;
  headingClassName?: string;
}) {
  return (
    <div className={className}>
      <SplitText as="h2" text={text} className={headingClassName} stagger={0.05} />
      {underline ? <UnderlineRule /> : null}
    </div>
  );
}

export function UnderlineRule({ className = "" }: { className?: string }) {
  return (
    <m.span
      aria-hidden="true"
      data-motion
      className={`mt-8 block h-px w-full max-w-[min(28rem,60%)] origin-left bg-accent ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay: 0.15 }}
    />
  );
}
