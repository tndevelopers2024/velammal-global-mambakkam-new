/**
 * One motion vocabulary for the whole page. Inconsistent easing is the
 * fastest way to make a build feel amateur, so nothing defines its own.
 */

/** Primary easing — every entrance uses this. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** For morphs and pins. */
export const EASE_IO = [0.76, 0, 0.24, 1] as const;

export const DUR = {
  fast: 0.3,
  base: 0.6,
  slow: 1.0,
  hero: 1.4,
} as const;

/** Shared viewport trigger for scroll-in reveals. */
export const VIEWPORT = { once: true, margin: "-15% 0px" } as const;
