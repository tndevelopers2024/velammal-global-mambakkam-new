"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { admissionsPopup, hero } from "@/content/site";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticWrap } from "@/components/ui/MagneticWrap";
import { Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const PLAYER = new URLSearchParams({
  autoplay: "1",
  mute: "1",
  loop: "1",
  playlist: hero.stageVideoId,
  controls: "0",
  disablekb: "1",
  modestbranding: "1",
  playsinline: "1",
  rel: "0",
  iv_load_policy: "3",
  fs: "0",
}).toString();

/**
 * The fold is a film, not a photograph.
 *
 * A poster frame paints on the first byte so the LCP stays an image, and the
 * muted loop fades over it only once it is genuinely running — the stage opens
 * through an inset wipe while the frame settles back from a slight over-scale,
 * which reads as a lens finding focus rather than a video simply appearing.
 *
 * Copy sits in a paper wash on the left so it is dark-on-light in the light
 * theme and light-on-dark in the dark one, without a second set of colours.
 * Under reduced motion the film never mounts at all: the poster holds, and the
 * introduction is still one press away in the lightbox.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [filmReady, setFilmReady] = useState(false);
  const [mountFilm, setMountFilm] = useState(false);
  const reduced = usePrefersReducedMotion();

  // The film waits for the preloader to clear so it is never competing with
  // the curtain for bandwidth on a cold load.
  useEffect(() => {
    if (reduced) return;
    const warm = document.documentElement.dataset.warm === "1";
    const id = window.setTimeout(() => setMountFilm(true), warm ? 240 : 1600);
    return () => window.clearTimeout(id);
  }, [reduced]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // three rates: the film trails, the wash follows, the copy lifts fastest
  const filmY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const filmScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0px", "-110px"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.12]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper pt-[52svh] pb-16 md:justify-center md:pt-28 md:pb-20"
    >
      {/* ---------------------------------------------------------- stage */}
      <m.div
        className="absolute inset-x-0 top-0 z-0 h-[62svh] md:inset-0 md:h-full"
        style={reduced ? undefined : { y: filmY, scale: filmScale }}
      >
        <div className="vgs-stage">
          <div className="vgs-stage__frame">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              fetchPriority="high"
              quality={70}
              sizes="100vw"
              className="scale-105 object-cover object-center"
            />
            {mountFilm ? (
              <iframe
                className="vgs-stage__player"
                data-ready={filmReady ? "true" : "false"}
                src={`https://www.youtube-nocookie.com/embed/${hero.stageVideoId}?${PLAYER}`}
                title=""
                aria-hidden="true"
                tabIndex={-1}
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                onLoad={() => {
                  // the player reports load before the first frame decodes;
                  // hold a beat so the fade never crosses a black frame
                  window.setTimeout(() => setFilmReady(true), 1200);
                }}
              />
            ) : null}
          </div>
        </div>
      </m.div>

      {/* ------------------------------------------------------------ wash */}
      {/* mobile: the film band dissolves into the paper it sits on */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[1] h-[62svh] bg-[linear-gradient(to_top,var(--paper)_0%,color-mix(in_srgb,var(--paper)_58%,transparent)_38%,color-mix(in_srgb,var(--paper)_12%,transparent)_100%)] md:hidden"
      />
      {/* Desktop: a left-weighted paper wash carries the reading column while
          the film stays open across the right of the frame — a directional
          sweep for the overall balance, plus an elliptical pool anchored to
          the copy itself so the paragraph is legible at every width rather
          than only at the one this was composed on. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block md:bg-[linear-gradient(100deg,var(--paper)_0%,color-mix(in_srgb,var(--paper)_93%,transparent)_30%,color-mix(in_srgb,var(--paper)_58%,transparent)_54%,color-mix(in_srgb,var(--paper)_14%,transparent)_76%,transparent_92%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block md:bg-[radial-gradient(78%_88%_at_2%_56%,var(--paper)_0%,color-mix(in_srgb,var(--paper)_86%,transparent)_44%,color-mix(in_srgb,var(--paper)_34%,transparent)_74%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block md:bg-[linear-gradient(to_top,var(--paper)_0%,color-mix(in_srgb,var(--paper)_52%,transparent)_16%,transparent_46%)]"
      />
      {/* a whisper of vignette so the film has a centre of gravity */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] hidden md:block md:bg-[radial-gradient(118%_96%_at_74%_40%,transparent_0%,transparent_44%,color-mix(in_srgb,var(--paper)_46%,transparent)_100%)]"
      />

      {/* the layer between film and copy: one architectural rule */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
      >
        <span className="absolute top-0 bottom-0 left-[54%] w-px bg-[linear-gradient(to_bottom,transparent_0%,var(--line)_26%,color-mix(in_srgb,var(--accent)_50%,transparent)_60%,transparent_100%)]" />
        <span className="absolute top-[64%] right-0 left-[54%] h-px bg-[linear-gradient(to_right,color-mix(in_srgb,var(--accent)_40%,transparent)_0%,transparent_100%)]" />
      </div>

      {/* ------------------------------------------------------------ copy */}
      <m.div
        className="relative z-10 container-page"
        style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
      >
        <div className="grid-12">
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <p
              className="fade-up-in mb-7 flex items-center gap-3"
              style={{ animationDelay: "calc(var(--hero-in) + 0.15s)" }}
            >
              <span aria-hidden="true" className="block h-5 w-px bg-accent-bright" />
              <span className="eyebrow">
                <span aria-hidden="true">CBSE</span>
                <span aria-hidden="true" className="mx-2">
                  —
                </span>
                {hero.eyebrow}
              </span>
            </p>

            <SplitText
              as="h1"
              text={hero.h1}
              immediate
              delay={0}
              style={{ "--split-delay": "calc(var(--hero-in) + 0.25s)" } as CSSProperties}
              stagger={0.055}
              duration={1.3}
              accent="Global"
              accentClassName="text-accent pr-[0.14em] font-normal italic"
              className="text-hero block max-w-[13ch] font-light text-fg"
            />

            <div className="measure mt-8 space-y-4 text-body text-fg-mute">
              {hero.paragraphs.slice(0, 1).map((p, i) => (
                <p
                  key={p.slice(0, 24)}
                  className="fade-up-in"
                  style={{
                    animationDelay: `calc(var(--hero-in) + ${0.8 + i * 0.14}s)`,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              className="fade-up-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
              style={{ animationDelay: "calc(var(--hero-in) + 1s)" }}
            >
              <MagneticWrap>
                <Button href="#admissions" size="lg">
                  {hero.ctaPrimary}
                </Button>
              </MagneticWrap>

              <MagneticWrap>
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  aria-haspopup="dialog"
                  className="group inline-flex items-center gap-4"
                >
                  <span className="relative flex size-14 items-center justify-center rounded-pill border border-line-strong transition-colors duration-300 group-hover:border-accent">
                    <span aria-hidden="true" className="vgs-play-ring" />
                    <span
                      aria-hidden="true"
                      className="ml-1 block size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-fg transition-colors duration-300 group-hover:border-l-accent"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block font-medium text-fg">{hero.ctaVideoLong}</span>
                    <span className="eyebrow mt-1.5 block">{hero.ctaVideo}</span>
                  </span>
                </button>
              </MagneticWrap>

              <span className="inline-flex items-center gap-3 rounded-pill border border-[color-mix(in_srgb,var(--gold)_42%,transparent)] bg-[color-mix(in_srgb,var(--gold)_9%,transparent)] px-4 py-2">
                <span
                  aria-hidden="true"
                  className="relative block size-1.5 rounded-pill bg-gold"
                >
                  <span className="vgs-play-ring [--ring-color:var(--gold)]" />
                </span>
                <span className="eyebrow [--eyebrow-color:var(--gold)]">
                  {admissionsPopup.badge}
                </span>
              </span>
            </div>
          </div>
        </div>
      </m.div>

      {/* Scroll invitation — pulses in once the entrance has finished. Sits
          high enough to clear the facts bar, which rides up over the foot of
          the hero. */}
      <span
        aria-hidden="true"
        className="vgs-scroll-hint pointer-events-none absolute inset-x-0 bottom-[7rem] z-10 hidden justify-center md:flex"
      >
        <span className="flex flex-col items-center gap-2">
          <span className="block h-10 w-px bg-[linear-gradient(to_bottom,transparent,var(--line-strong))]" />
          <span className="block size-1.5 rotate-45 border-r border-b border-fg-mute" />
        </span>
      </span>

      <Lightbox
        videoId={hero.videoId}
        title={`${hero.ctaVideoLong} — ${hero.h1}`}
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </section>
  );
}
