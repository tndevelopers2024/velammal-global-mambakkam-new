"use client";

import { m } from "motion/react";
import { Fragment, type CSSProperties, type ElementType } from "react";
import { EASE, VIEWPORT } from "@/lib/motion";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** seconds between words */
  stagger?: number;
  delay?: number;
  duration?: number;
  /**
   * Run on first paint instead of on scroll. Uses CSS keyframes, not motion,
   * so above-the-fold headlines are not gated on hydration.
   */
  immediate?: boolean;
  /** In immediate mode, set `--split-delay` here to offset the whole reveal. */
  style?: CSSProperties;
  /**
   * A single word inside `text` that carries a different treatment — the
   * accent word in a headline. Matched ignoring case and trailing punctuation,
   * so "Global" still matches "Global," in the source string.
   */
  accent?: string;
  /**
   * Applied to the accent word only. An italic here needs a little padding on
   * the right — the reveal mask clips, and the slant overhangs its own box.
   */
  accentClassName?: string;
};

/** "Global," → "global" — punctuation must not defeat the accent match. */
const normalise = (w: string) => w.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();

/**
 * Word-level mask reveal. Words — not letters: letter splitting breaks screen
 * readers. The animated words are aria-hidden and the full string is exposed
 * once, visually hidden.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className = "",
  stagger = 0.06,
  delay = 0,
  duration = 1,
  immediate = false,
  style,
  accent,
  accentClassName = "",
}: Props) {
  const words = text.split(" ");
  const accentKey = accent ? normalise(accent) : null;
  const isAccent = (word: string) =>
    accentKey !== null && normalise(word) === accentKey;

  if (immediate) {
    return (
      <Tag className={className} style={style}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline">
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className="word-mask">
                <span
                  className={`word-rise ${isAccent(word) ? accentClassName : ""}`}
                  style={{
                    animationDelay: `calc(var(--split-delay, 0s) + ${(
                      delay +
                      i * stagger
                    ).toFixed(3)}s)`,
                  }}
                >
                  {word}
                </span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        data-motion
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className="inline"
      >
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="word-mask">
              <m.span
                className={`inline-block ${isAccent(word) ? accentClassName : ""}`}
                variants={{
                  hidden: { y: "110%" },
                  show: { y: "0%", transition: { duration, ease: EASE } },
                }}
              >
                {word}
              </m.span>
            </span>
            {/* space lives outside the mask so it is not clipped */}
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </m.span>
    </Tag>
  );
}
