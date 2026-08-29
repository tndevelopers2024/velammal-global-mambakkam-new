"use client";

import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { admissionsPopup, logos } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { DUR, EASE, EASE_IO } from "@/lib/motion";
import { lockScroll } from "@/lib/useLenis";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Arrival delay. The preloader owns the screen for ~2s, so this lands about
 *  a second after the curtain opens — the hero has painted and settled. */
const DELAY_MS = 3000;

/**
 * Like the preloader's warm-session skip: production wants this once per
 * session, review wants it on every load. Flip to `true` to stop it nagging.
 */
const ONCE_PER_SESSION = false;

const SEEN_KEY = "vgs-admissions-seen";

/** Backstop for the exit animation, in case its frames never run. */
const EXIT_GRACE_MS = 1200;

function alreadySeen(): boolean {
  if (!ONCE_PER_SESSION) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode — showing it again next load is the harmless failure */
  }
}

/**
 * Admissions interstitial, three seconds after arrival.
 *
 * Native `<dialog>.showModal()` for the focus trap, Esc and top-layer paint —
 * the same contract the video Lightbox uses. The element stays open through
 * the exit animation and only really closes on `onExitComplete`, so the card
 * can leave rather than blink out.
 *
 * The content column is the one that scrolls, never the card: on a short
 * laptop viewport the photograph and the CTAs both stay put.
 */
export function AdmissionsPopup() {
  const ref = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (alreadySeen()) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        markSeen();
        setOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    ref.current?.showModal();
    lockScroll(true);
  }, [open]);

  /* Scroll is released on the click, not on exit: the primary CTA is an
     anchor, and Lenis has to be free to run its scrollTo behind the card. */
  const close = useCallback(() => {
    lockScroll(false);
    setOpen(false);
    /* onExitComplete does the real close, but rAF stalls in a backgrounded
       tab — without this the dialog would still be open, invisible and
       holding focus, when the user came back. */
    window.setTimeout(() => ref.current?.close(), EXIT_GRACE_MS);
  }, []);

  useEffect(() => () => lockScroll(false), []);

  /* Short viewports scroll the content column. Track whether anything is
     still below the fold so the fade only appears when it means something. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!open || !el) return;
    const measure = () =>
      setClipped(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [open]);

  /* One stagger for the whole right column, so the card assembles itself in
     reading order instead of arriving as a single slab. */
  const list = reduced
    ? {}
    : { transition: { staggerChildren: 0.055, delayChildren: 0.16 } };
  const item = reduced
    ? { hidden: {}, shown: {} }
    : {
        hidden: { opacity: 0, y: 14 },
        shown: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
      };

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        // Let the card animate out instead of the browser yanking it.
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      aria-labelledby="admissions-popup-title"
      className="m-auto max-h-[92dvh] w-[min(94vw,68rem)] overflow-visible bg-transparent p-0 text-fg"
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>
        {open ? (
          <m.div
            className="vgs-popup relative grid max-h-[92dvh] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-panel shadow-[var(--shadow-lift)] ring-1 ring-[var(--line)] md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:grid-rows-1"
            initial={{ opacity: 0, y: reduced ? 0 : 32, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.99 }}
            transition={{ duration: reduced ? 0 : DUR.slow, ease: EASE }}
          >
            {/* Wine rule draws across the head — the preloader's own gesture,
                so the card arrives speaking the page's language. */}
            <m.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-30 h-px origin-left bg-accent-bright"
              initial={{ scaleX: reduced ? 1 : 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduced ? 0 : DUR.slow,
                ease: EASE_IO,
                delay: reduced ? 0 : 0.12,
              }}
            />

            {/* ------------------------------------------------ photograph */}
            <div className="relative min-h-[6.5rem] md:min-h-[30rem]">
              <Image
                src={admissionsPopup.image.src}
                alt={admissionsPopup.image.alt}
                fill
                sizes="(min-width: 768px) 30rem, 94vw"
                className="object-cover object-[50%_40%] md:object-[50%_28%]"
              />
              {/* Ink floor for the overlaid figures, wine only as a tint in
                  the upper corner where it meets the panel's own pool. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[rgb(8_9_12/0.94)] via-[rgb(8_9_12/0.45)] via-45% to-[rgb(8_9_12/0.05)]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-wine-950/70 via-transparent to-transparent"
              />
              <span
                aria-hidden="true"
                className="vgs-popup__grain absolute inset-0 opacity-70"
              />

              <Image
                src={logos.global.src}
                alt=""
                width={logos.global.width}
                height={logos.global.height}
                className="absolute top-5 left-7 w-11 drop-shadow-[0_2px_10px_rgb(8_9_12/0.85)] md:top-7 md:left-8 md:w-[3.25rem]"
              />

              {/* Below md the photograph is a band rather than a column, so
                  the same proof collapses to one line under it. */}
              <p className="eyebrow absolute inset-x-0 bottom-0 px-7 pb-4 [--eyebrow-color:var(--color-bone-100)] md:hidden">
                {admissionsPopup.statLine}
              </p>

              <div className="absolute inset-x-0 bottom-0 hidden px-8 pb-8 text-bone-100 [--eyebrow-color:color-mix(in_srgb,var(--color-bone-300)_82%,transparent)] md:block">
                <p className="display-num text-[clamp(3rem,5vw,4.25rem)] leading-[0.85] text-bone-50">
                  {admissionsPopup.stat.value}
                </p>
                <p className="eyebrow mt-3">{admissionsPopup.stat.label}</p>

                <dl className="hairline-t mt-6 grid grid-cols-2 gap-4 pt-5">
                  {admissionsPopup.statSide.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1.5">
                      <dt className="eyebrow">{f.label}</dt>
                      <dd className="text-[0.9375rem] text-bone-100">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* --------------------------------------------------- content */}
            <m.div
              ref={scrollRef}
              data-clipped={clipped}
              /* showModal() focuses the first tabbable child otherwise, which
                 puts a loud focus ring on the primary CTA the instant the card
                 lands. Parking focus on the column keeps it inside the dialog
                 for screen readers and keyboards without drawing the ring. */
              autoFocus
              tabIndex={-1}
              className="vgs-popup__scroll flex min-h-0 flex-col gap-4 overflow-y-auto px-7 py-6 focus:outline-none sm:gap-6 sm:px-10 sm:py-11 md:hairline-l"
              initial="hidden"
              animate="shown"
              {...list}
            >
              <m.div variants={item} className="flex flex-wrap items-center gap-x-4 gap-y-3 pr-24">
                <span className="inline-flex items-center gap-2.5 rounded-pill border border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-accent-soft px-3.5 py-1.5">
                  <span aria-hidden="true" className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-pill bg-accent opacity-75 motion-reduce:hidden" />
                    <span className="relative inline-flex size-1.5 rounded-pill bg-accent" />
                  </span>
                  <span className="eyebrow [--eyebrow-color:var(--accent)]">{admissionsPopup.badge}</span>
                </span>
                <span className="eyebrow">{admissionsPopup.eyebrow}</span>
              </m.div>

              <m.h2
                variants={item}
                id="admissions-popup-title"
                className="text-h3 text-balance text-fg"
              >
                {admissionsPopup.headingLead}{" "}
                <span className="text-accent italic">{admissionsPopup.headingAccent}</span>
              </m.h2>

              <m.p
                variants={item}
                className="measure text-[0.9375rem] leading-relaxed text-fg-mute"
              >
                {admissionsPopup.body}
              </m.p>

              <m.dl
                variants={item}
                className="hairline-t hairline-b grid grid-cols-3 gap-x-4 gap-y-3 py-4 sm:py-5"
              >
                {admissionsPopup.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-2">
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="text-[0.9375rem] text-fg">{fact.value}</dd>
                  </div>
                ))}
              </m.dl>

              <m.ul variants={item} className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
                {admissionsPopup.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.875rem] leading-snug text-fg-mute">
                    <span
                      aria-hidden="true"
                      className="mt-[0.4rem] block size-1.5 shrink-0 bg-accent-bright"
                    />
                    {h}
                  </li>
                ))}
              </m.ul>

              <m.div variants={item} className="mt-1 flex flex-wrap items-center gap-3">
                <Button href={admissionsPopup.ctaPrimary.href} onClick={close}>
                  {admissionsPopup.ctaPrimary.label}
                </Button>
                <Button
                  href={admissionsPopup.ctaSecondary.href}
                  variant="ghost"
                  onClick={close}
                >
                  {admissionsPopup.ctaSecondary.label}
                </Button>
              </m.div>

              <m.div
                variants={item}
                className="hairline-t mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4 sm:pt-5"
              >
                <p className="eyebrow">
                  {admissionsPopup.footnote.label}
                  <span className="mx-2" aria-hidden="true">
                    —
                  </span>
                  {admissionsPopup.footnote.value}
                </p>
                <a
                  href={`tel:${admissionsPopup.phone}`}
                  className="text-[0.9375rem] text-fg transition-colors hover:text-accent"
                >
                  <span className="sr-only">{admissionsPopup.phoneLabel} </span>
                  {admissionsPopup.phone}
                </a>
              </m.div>
            </m.div>

            <button
              type="button"
              onClick={close}
              className="absolute top-5 right-5 z-30 flex items-center gap-2 rounded-pill border border-line bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] px-4 py-2.5 text-[0.75rem] tracking-[0.12em] text-fg uppercase shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
            >
              {admissionsPopup.dismiss}
              <span aria-hidden="true" className="relative block size-3">
                <span className="absolute top-1/2 left-0 h-px w-3 rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-3 -rotate-45 bg-current" />
              </span>
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
