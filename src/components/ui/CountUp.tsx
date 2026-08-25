"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** "750 students" → ["750", " students"]. Anything else is left alone. */
const NUMERIC = /^(\d[\d,]*)([\s\S]*)$/;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Counts a numeric value up from zero the first time it is scrolled into view.
 *
 * Values that do not open with a number — most of the ledger, as the copy
 * stands — render untouched, so this is safe to wrap around anything. The
 * ticking numerals are aria-hidden and the settled string is exposed once, so
 * a screen reader is never read a running total.
 */
export function CountUp({
  value,
  duration = 1.6,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = NUMERIC.exec(value);
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string | null>(null);

  const digits = match?.[1] ?? "";
  const target = digits ? Number(digits.replace(/,/g, "")) : 0;
  const grouped = digits.includes(",");

  useEffect(() => {
    const el = ref.current;
    if (!el || !digits || reduced) return;

    let raf = 0;
    let start = 0;
    const format = (n: number) =>
      grouped ? n.toLocaleString("en-IN") : String(n);

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / (duration * 1000));
      setShown(format(Math.round(easeOutExpo(t) * target)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    // hold at zero until the ledger is actually reached
    setShown("0");

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [digits, duration, grouped, reduced, target]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {shown ?? digits}
      </span>
      <span aria-hidden="true">{match[2]}</span>
    </span>
  );
}
