"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsapp } from "@/content/site";
import { EASE } from "@/lib/motion";

/**
 * WhatsApp FAB, bottom-left, mounted only after 40% of the page — a gate on
 * mount rather than on opacity, so reduced motion cannot leave a
 * non-interactive button sitting visible at the top of the page.
 */
export function FloatingActions() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => setShow(v > 0.4));

  return (
    <AnimatePresence>
      {show ? (
        <m.div
          className="fixed bottom-6 left-6 z-40"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <a
            href={whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-pill border border-moss/40 bg-moss/12 text-moss backdrop-blur-sm transition-colors duration-300 hover:bg-moss/25"
          >
            <span className="sr-only">{whatsapp.label}</span>
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>
          </a>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
