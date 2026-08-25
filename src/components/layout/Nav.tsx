"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE, EASE_IO } from "@/lib/motion";
import { logos, nav, navCtas, schoolGroups } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MegaMenu } from "./MegaMenu";

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > window.innerHeight * 0.6);
  });

  // The read-position rule. Sprung so a Lenis frame never makes it stutter.
  const progress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 40,
    restDelta: 0.001,
  });

  const closeMega = useCallback(() => setMega(false), []);

  // Esc closes; focus is kept inside the open panel.
  useEffect(() => {
    if (!mega && !drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mega) {
          setMega(false);
          megaTriggerRef.current?.focus();
        }
        setDrawer(false);
        return;
      }
      if (e.key !== "Tab" || !mega) return;
      const root = headerRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega, drawer]);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawer]);

  const shell = solid || mega;
  const navHeight = solid ? 60 : 92;

  // wine rule that slides in from the left under a nav item
  const underline =
    "relative after:absolute after:inset-x-0 after:-bottom-px after:h-px " +
    "after:origin-left after:bg-accent after:transition-transform " +
    "after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] " +
    "hover:after:scale-x-100";

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={closeMega}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          shell
            ? "border-b border-line bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] shadow-[0_1px_40px_-22px_color-mix(in_srgb,var(--fg)_60%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* While transparent the bar floats over the hero stage, so a soft
            paper scrim keeps the mark and links legible over moving video. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--paper)_78%,transparent)_0%,transparent_100%)] transition-opacity duration-500 ${
            shell ? "opacity-0" : "opacity-100"
          }`}
        />
        <m.span
          aria-hidden="true"
          className="vgs-nav-progress"
          style={{ scaleX: progress }}
        />

        <div
          className="relative container-page flex items-center justify-between gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ height: navHeight }}
        >
          <Link href="#top" className="flex items-center gap-3" aria-label={logos.network.alt}>
            <m.span
              className="block origin-left"
              animate={{ scale: solid ? 0.84 : 1 }}
              transition={{ duration: 0.5, ease: EASE_IO }}
            >
              <Image
                src={logos.network.src}
                alt={logos.network.alt}
                width={logos.network.width}
                height={logos.network.height}
                className="h-9 w-auto brightness-0 saturate-0 md:h-10 dark:invert"
              />
            </m.span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) =>
              item.mega ? (
                <button
                  key={item.label}
                  ref={megaTriggerRef}
                  type="button"
                  aria-expanded={mega}
                  aria-haspopup="true"
                  onClick={() => setMega((m) => !m)}
                  onMouseEnter={() => setMega(true)}
                  className={`group flex items-center gap-1.5 py-2 text-[0.9375rem] font-medium text-fg-mute transition-colors hover:text-fg ${underline} ${
                    mega ? "after:scale-x-100" : "after:scale-x-0"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`inline-block size-1.5 rotate-45 border-r border-b border-current transition-transform duration-300 ${
                      mega ? "-translate-y-px rotate-[225deg]" : ""
                    }`}
                  />
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onMouseEnter={closeMega}
                  className={`py-2 text-[0.9375rem] font-medium text-fg-mute transition-colors hover:text-fg ${underline} after:scale-x-0`}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <span aria-hidden="true" className="block h-6 w-px bg-line" />
            {navCtas.map((cta) => (
              <Button key={cta.label} href={cta.href} size="sm" variant={cta.variant}>
                {cta.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={drawer}
              aria-controls="mobile-nav"
              onClick={() => setDrawer((d) => !d)}
              className="flex size-11 items-center justify-center"
            >
              <span className="sr-only">{drawer ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-fg transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    drawer ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-fg transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    drawer ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>{mega ? <MegaMenu onClose={closeMega} /> : null}</AnimatePresence>
      </header>

      {/* A sibling of the header, not a child: the header's backdrop-filter
          makes it a containing block, which collapses a fixed drawer inside it
          to the height of the bar. */}
      <AnimatePresence>
        {drawer ? (
          <m.div
            id="mobile-nav"
            data-motion
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_IO }}
            style={{ top: navHeight }}
            className="fixed inset-x-0 bottom-0 z-[45] overflow-y-auto bg-paper lg:hidden"
          >
            <div className="container-page py-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {nav.map((item, i) => (
                  <m.a
                    key={item.label}
                    data-motion
                    href={item.href}
                    onClick={() => setDrawer(false)}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.07 }}
                    className="hairline-b py-5 font-display text-h3 font-light"
                  >
                    {item.label}
                  </m.a>
                ))}
              </nav>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {schoolGroups.map((group) => (
                  <div key={group.group}>
                    <p className="eyebrow mb-3 [--eyebrow-color:var(--accent)]">{group.group}</p>
                    <ul className="space-y-1.5">
                      {group.campuses.map((c) => (
                        <li key={`${group.group}-${c}`} className="text-[0.9375rem] text-fg-mute">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                {navCtas.map((cta) => (
                  <Button
                    key={cta.label}
                    href={cta.href}
                    size="md"
                    variant={cta.variant}
                    onClick={() => setDrawer(false)}
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
