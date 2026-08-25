"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries as an external store — no setState-in-effect, no hydration
 * flash. The server snapshot is always `false`, so motion-dependent behaviour
 * is opt-in once the client has actually measured.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Pointer-fine devices only — magnetic buttons, custom cursor, Lenis. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}
