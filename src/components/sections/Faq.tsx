"use client";

import { AnimatePresence, m } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { faq, hero, identity, sectionIds } from "@/content/site";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useReducedMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticWrap } from "@/components/ui/MagneticWrap";
import { Button } from "@/components/ui/Button";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  identity.subject,
)}&output=embed`;

/**
 * The admissions desk — an index and a reader, not a stack of drawers.
 *
 * Every question is visible at once down the left rail, and choosing one opens
 * it as a full editorial page on the right rather than pushing the rest of the
 * list down the screen. That inverts the accordion's central problem: here the
 * shape of the section never changes, so nothing below it ever jumps, and the
 * whole of what admissions covers is legible before you read a word of it.
 *
 * Implemented as a real ARIA tablist — roving tabindex, arrow keys, Home/End —
 * because that is exactly the interaction this is.
 */
export function Faq() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState({ top: 0, height: 0 });
  // the index is a column on desktop and a strip on mobile, so the tablist
  // has to say which axis the arrow keys are actually running along
  const vertical = useMediaQuery("(min-width: 1024px)");

  const panels = faq.panels;
  const last = panels.length - 1;
  const current = panels[active];

  // The rail marker tracks the real box of the active tab, because the labels
  // wrap to different heights and a fixed step would drift.
  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    const list = listRef.current;
    if (!el || !list) return;

    const measure = () => {
      setMarker({ top: el.offsetTop, height: el.offsetHeight });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const select = useCallback((i: number) => {
    setActive(i);
    tabRefs.current[i]?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(next);
  };

  return (
    <section id={sectionIds.faq} className="surface-2 isolate py-section">
      <div className="container-page">
        <div className="grid-12 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="07">Admissions</Eyebrow>
            <SectionHeading
              className="mt-7"
              text={faq.heading}
              headingClassName="text-h2 font-light text-fg"
            />
          </div>
          <div className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:justify-self-end">
            <MagneticWrap>
              <Button href="#closing" size="lg">
                {hero.ctaPrimary}
              </Button>
            </MagneticWrap>
          </div>
        </div>

        <div className="mt-[clamp(3rem,7vh,5rem)] grid-12 gap-y-10">
          {/* ------------------------------------------------------- index */}
          <div className="col-span-12 lg:col-span-4">
            <div
              ref={listRef}
              role="tablist"
              aria-orientation={vertical ? "vertical" : "horizontal"}
              aria-label={faq.heading}
              onKeyDown={onKeyDown}
              className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 lg:block lg:snap-none lg:overflow-visible lg:border-l lg:border-line lg:pb-0"
            >
              {/* the rail marker — desktop only, where the list is vertical */}
              <m.span
                aria-hidden="true"
                className="pointer-events-none absolute -left-px hidden w-[2px] bg-accent-bright lg:block"
                animate={{ y: marker.top, height: marker.height }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ top: 0 }}
              />

              {panels.map((panel, i) => {
                const selected = i === active;
                return (
                  <button
                    key={panel.q}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`${uid}-t-${i}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-p-${i}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`group flex shrink-0 snap-start items-baseline gap-3 rounded-pill border border-line px-4 py-3 text-left transition-colors duration-300 lg:w-full lg:shrink lg:rounded-none lg:border-0 lg:py-3.5 lg:pr-4 lg:pl-6 ${
                      selected
                        ? "border-accent bg-accent-soft text-fg lg:bg-transparent"
                        : "text-fg-mute hover:border-line-strong hover:text-fg lg:hover:bg-[color-mix(in_srgb,var(--fg)_4%,transparent)]"
                    }`}
                  >
                    <span
                      className={`eyebrow shrink-0 tabular-nums transition-colors duration-300 ${
                        selected ? "[--eyebrow-color:var(--accent)]" : ""
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] leading-snug font-medium whitespace-nowrap lg:whitespace-normal">
                      {panel.q}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------ reader */}
          <div className="relative col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="card relative isolate overflow-hidden px-[clamp(1.5rem,3.5vw,3.25rem)] py-[clamp(2rem,4vw,3.25rem)]">
              {/* the ghosted index numeral behind the page */}
              <span
                aria-hidden="true"
                className="display-num pointer-events-none absolute -top-6 right-2 -z-10 text-[clamp(7rem,13vw,13rem)] leading-none text-fg/[0.05] tabular-nums select-none"
              >
                {String(active + 1).padStart(2, "0")}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={current.q}
                  data-motion
                  role="tabpanel"
                  id={`${uid}-p-${active}`}
                  aria-labelledby={`${uid}-t-${active}`}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="min-h-[16rem] focus-visible:outline-none"
                >
                  <p className="eyebrow">
                    <span aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="mx-2">
                      —
                    </span>
                    Admissions
                  </p>

                  <h3 className="mt-5 max-w-[20ch] text-h3 font-light text-fg">
                    {current.q}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="mt-7 block h-px w-16 bg-accent-bright"
                  />

                  {current.a.length > 0 ? (
                    <div className="measure mt-7 space-y-4 text-body text-fg-mute">
                      {current.a.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                  ) : null}

                  {current.map ? <LazyMap /> : null}
                </m.div>
              </AnimatePresence>
            </div>

            {/* ------------------------------------------------- pagination */}
            <div className="mt-6 flex items-center justify-between">
              <p className="eyebrow tabular-nums">
                <span className="text-fg">{String(active + 1).padStart(2, "0")}</span>
                <span className="mx-2">/</span>
                {String(panels.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <PagerButton
                  label="Previous question"
                  disabled={active === 0}
                  onClick={() => setActive((i) => Math.max(0, i - 1))}
                  direction="prev"
                />
                <PagerButton
                  label="Next question"
                  disabled={active === last}
                  onClick={() => setActive((i) => Math.min(last, i + 1))}
                  direction="next"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
  direction,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex size-11 items-center justify-center rounded-pill border border-line text-fg transition-colors duration-300 hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={`block size-2 border-t border-r border-current ${
          direction === "next" ? "-ml-1 rotate-45" : "-mr-1 -rotate-135"
        }`}
      />
    </button>
  );
}

/** The map iframe only mounts once its panel has actually been opened. */
function LazyMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div
      ref={ref}
      className="mt-7 aspect-[4/3] w-full overflow-hidden rounded-card bg-paper-3 sm:aspect-[16/10]"
    >
      {show ? (
        <iframe
          src={MAP_SRC}
          title={`Map of ${identity.subject}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      ) : null}
    </div>
  );
}
