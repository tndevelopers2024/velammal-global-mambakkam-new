"use client";

import Image from "next/image";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import type { Alum } from "@/content/site";

/**
 * Two counter-running rows of alumni. The second row is the same people in
 * reverse and is hidden from assistive tech — it is a texture, not a list.
 * Reduced motion falls back to a static grid; everyone else gets a real pause
 * control plus pause-on-hover.
 */
export function Marquee({ people }: { people: readonly Alum[] }) {
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduced) {
    return (
      <ul className="container-page grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {people.map((p) => (
          <li key={p.name}>
            <AlumCard alum={p} />
          </li>
        ))}
      </ul>
    );
  }

  const state = paused ? "paused" : "running";

  return (
    <div>
      <div
        className="vgs-marquee-fade group relative space-y-6 overflow-hidden md:space-y-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Row people={people} state={state} />
        <Row people={[...people].reverse()} state={state} reverse />
      </div>

      <div className="container-page mt-8">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="eyebrow rounded-pill border border-line px-4 py-2 [--eyebrow-color:var(--fg)] transition-colors hover:border-accent hover:[--eyebrow-color:var(--accent)]"
        >
          {paused ? "Play alumni marquee" : "Pause alumni marquee"}
        </button>
      </div>

      <style>{`
        @keyframes vgs-marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </div>
  );
}

function Row({
  people,
  state,
  reverse = false,
}: {
  people: readonly Alum[];
  state: "paused" | "running";
  /** The decorative counter-running row — duplicate content, so it is hidden. */
  reverse?: boolean;
}) {
  const loop = [...people, ...people];

  return (
    <ul
      aria-hidden={reverse ? "true" : undefined}
      className="flex w-max gap-6 md:gap-10"
      style={{
        animation: `vgs-marquee ${reverse ? 68 : 56}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        animationPlayState: state,
      }}
    >
      {loop.map((p, i) => (
        <li
          key={`${p.name}-${i}`}
          className="w-[58vw] shrink-0 sm:w-[34vw] lg:w-[19vw]"
          aria-hidden={!reverse && i >= people.length ? "true" : undefined}
        >
          <AlumCard alum={p} />
        </li>
      ))}
    </ul>
  );
}

/**
 * The name sits on the photograph rather than under it, held down by a
 * gradient — so you can read who someone is without hovering, and hovering
 * only lifts the type and returns the colour.
 */
function AlumCard({ alum }: { alum: Alum }) {
  return (
    <figure className="group/card relative aspect-[550/613] overflow-hidden rounded-card bg-paper-3 shadow-[var(--shadow-card)]">
      <Image
        src={alum.image.src}
        alt={alum.image.alt}
        fill
        sizes="(max-width: 640px) 58vw, (max-width: 1024px) 34vw, 19vw"
        className="object-cover grayscale-100 transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.03] group-hover/card:grayscale-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-wine-900/45 mix-blend-color transition-opacity duration-700 group-hover/card:opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(to_top,rgb(8_9_12/0.94)_0%,rgb(8_9_12/0.5)_48%,transparent_100%)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-1">
        <p className="font-display text-[clamp(1.1rem,1.5vw,1.5rem)] leading-tight font-light text-bone-50">
          {alum.name}
        </p>
        <p className="eyebrow mt-2 line-clamp-2 [--eyebrow-color:color-mix(in_srgb,var(--color-bone-300)_78%,transparent)]">
          {alum.role}
        </p>
      </figcaption>
    </figure>
  );
}
