"use client";

import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { gallery, sectionIds } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Slight height + offset variation so the track reads as a contact sheet.
    Offsets are in px because the parallax drift is added to them. */
const RHYTHM = [
  { h: "clamp(11rem,26vh,17rem)", offset: 0 },
  { h: "clamp(14rem,34vh,22rem)", offset: -32 },
  { h: "clamp(12rem,29vh,19rem)", offset: 40 },
  { h: "clamp(15rem,38vh,24rem)", offset: -16 },
  { h: "clamp(11rem,26vh,17rem)", offset: 24 },
  { h: "clamp(14rem,34vh,22rem)", offset: -40 },
  { h: "clamp(13rem,31vh,20rem)", offset: 16 },
  { h: "clamp(15rem,36vh,23rem)", offset: -24 },
];

export function Gallery() {
  const reduced = usePrefersReducedMotion();
  // The pin is desktop + fine-pointer only; touch gets a real carousel.
  const canPin = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  return canPin && !reduced ? <PinnedGallery /> : <ScrollGallery />;
}

function GalleryHeader({ counter = false }: { counter?: boolean }) {
  return (
    <div className="relative container-page">
      {counter ? (
        <span
          aria-hidden="true"
          className="display-num pointer-events-none absolute top-0 right-gutter hidden text-[clamp(4rem,7vw,7.5rem)] leading-none text-fg/[0.1] tabular-nums select-none lg:block"
        >
          {String(gallery.images.length).padStart(2, "0")}
        </span>
      ) : null}
      <Eyebrow index="02">Campus life</Eyebrow>
      <SplitText
        as="h2"
        text={gallery.heading}
        className="mt-6 block max-w-[22ch] text-h2 font-light text-fg"
        stagger={0.045}
      />
      <p className="measure mt-6 text-lead text-fg-mute">{gallery.sub}</p>
    </div>
  );
}

/* ------------------------------------------------------------- pinned */

function PinnedGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      id={sectionIds.gallery}
      aria-label={gallery.heading}
      className="surface-2 relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 top-[clamp(6rem,15vh,9rem)] z-10">
          <GalleryHeader counter />
        </div>
        <m.ul
          ref={trackRef}
          data-motion
          style={{ x }}
          className="absolute bottom-[clamp(3rem,9vh,6rem)] left-0 flex w-max items-end gap-[clamp(1.5rem,3vw,3.5rem)] pr-[12vw] pl-gutter will-change-transform"
        >
          {gallery.images.map((img, i) => (
            <GalleryFigure key={img.src} img={img} i={i} progress={scrollYProgress} />
          ))}
        </m.ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- touch / RM */

function ScrollGallery() {
  return (
    <section
      id={sectionIds.gallery}
      aria-label={gallery.heading}
      className="surface-2 py-section"
    >
      <GalleryHeader />
      <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-6 [scrollbar-width:thin]">
        {gallery.images.map((img, i) => (
          <li key={img.src} className="w-[78vw] shrink-0 snap-start sm:w-[52vw]">
            <figure>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card bg-paper-3">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, 52vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="eyebrow mt-4">
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2">—</span>
                {img.alt}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GalleryFigure({
  img,
  i,
  progress,
}: {
  img: (typeof gallery.images)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const r = RHYTHM[i % RHYTHM.length];
  // ±8px of vertical drift on top of the resting offset as the track travels,
  // alternating direction, so the contact sheet has depth rather than being
  // one rigid plane
  const drift = useTransform(
    progress,
    [0, 1],
    i % 2 === 0 ? [r.offset - 8, r.offset + 8] : [r.offset + 8, r.offset - 8],
  );

  return (
    <m.li className="group relative shrink-0" style={{ y: drift }}>
      <figure>
        <div
          className="relative overflow-hidden rounded-card bg-paper-3 shadow-[var(--shadow-card)]"
          style={{ height: r.h, width: `calc(${r.h} * 1.5)` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="45vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden">
            <span className="block bg-[linear-gradient(to_top,rgb(8_9_12/0.92),transparent)] px-5 pt-8 pb-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="block translate-y-[120%] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                <span className="eyebrow block [--eyebrow-color:var(--color-bone-300)]">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="mt-2 block max-w-[34ch] text-[0.9375rem] text-bone-100">
                  {img.alt}
                </span>
              </span>
            </span>
            {/* the bar the caption rises from behind */}
            <span
              aria-hidden="true"
              className="block h-[3px] origin-left scale-x-0 bg-accent-bright transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
          </figcaption>
        </div>
      </figure>
    </m.li>
  );
}
