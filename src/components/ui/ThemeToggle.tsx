"use client";

import { useCallback, useSyncExternalStore } from "react";

export const THEME_KEY = "vgs-theme";

/**
 * Runs before the body parses, so a returning visitor's dark preference is on
 * the element before anything paints. No preference means light — the OS
 * setting is deliberately not consulted, because the light page is the
 * designed experience and dark is something the visitor asks for.
 */
export const themeInitScript = `try{if(localStorage.getItem('${THEME_KEY}')==='dark'){document.documentElement.dataset.theme='dark'}}catch(e){}`;

type Theme = "light" | "dark";

/**
 * The attribute on <html> is the single source of truth, so the control reads
 * it rather than keeping a copy — which also means it stays correct if
 * anything else ever changes the theme.
 */
function useTheme(): Theme {
  const subscribe = useCallback((onChange: () => void) => {
    const mo = new MutationObserver(onChange);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  return useSyncExternalStore<Theme>(
    subscribe,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

/**
 * Light / dark switch. The swap is a View Transition wherever one is
 * available — the incoming theme is revealed as a circle growing out of this
 * control, so the change reads as coming from the thing you pressed. Browsers
 * without it (and anyone on reduced motion) get a short colour transition
 * instead, applied only for the length of the swap.
 *
 * The knob and icons are positioned by the `dark:` variant rather than by
 * state, so they are already correct on the first painted frame for a
 * returning visitor — no hydration slide.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === "dark";

  const toggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    const box = event.currentTarget.getBoundingClientRect();

    root.style.setProperty("--theme-x", `${box.left + box.width / 2}px`);
    root.style.setProperty("--theme-y", `${box.top + box.height / 2}px`);

    const apply = () => {
      if (next === "dark") root.dataset.theme = "dark";
      else delete root.dataset.theme;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* private mode — the theme still applies for this session */
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = document.startViewTransition?.bind(document);

    if (!start || reduced) {
      root.classList.add("is-theme-swapping");
      apply();
      window.setTimeout(() => root.classList.remove("is-theme-swapping"), 520);
      return;
    }

    start(apply);
  }, []);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark theme"
      onClick={toggle}
      className={`group relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-pill border border-line bg-[color-mix(in_srgb,var(--paper)_72%,transparent)] p-1 backdrop-blur-md transition-colors duration-300 hover:border-line-strong ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 z-0 block size-7 translate-x-0 rounded-pill bg-accent-bright shadow-[0_2px_10px_-2px_color-mix(in_srgb,var(--accent-bright)_70%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] dark:translate-x-[2.125rem]"
      />
      <span
        aria-hidden="true"
        className="relative z-10 flex size-7 items-center justify-center"
      >
        <SunIcon className="size-4 text-on-accent transition-colors duration-300 dark:text-fg-mute" />
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 ml-[0.375rem] flex size-7 items-center justify-center"
      >
        <MoonIcon className="size-[0.9375rem] text-fg-mute transition-colors duration-300 dark:text-on-accent" />
      </span>
    </button>
  );
}

function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2" />
        <path d="M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
      </g>
    </svg>
  );
}

function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
