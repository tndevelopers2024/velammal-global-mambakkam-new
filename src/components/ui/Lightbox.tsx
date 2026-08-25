"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Full-screen YouTube lightbox. Native <dialog>.showModal() gives us the focus
 * trap and Esc-to-close for free; the iframe only mounts while open.
 */
export function Lightbox({
  videoId,
  title,
  open,
  onClose,
}: {
  videoId: string;
  title: string;
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      setMounted(true);
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setMounted(false);
    onClose();
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current) handleClose();
      }}
      aria-label={title}
      className="m-auto w-[min(96vw,1200px)] rounded-panel bg-transparent p-0 text-fg"
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 flex items-center gap-2 rounded-pill border border-line bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] px-4 py-2.5 text-[0.75rem] tracking-[0.12em] text-fg uppercase backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
        >
          Close
          <span aria-hidden="true" className="relative block size-3">
            <span className="absolute top-1/2 left-0 h-px w-3 rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 h-px w-3 -rotate-45 bg-current" />
          </span>
        </button>
        <div className="aspect-video w-full overflow-hidden rounded-panel bg-paper-3 shadow-[var(--shadow-lift)]">
          {mounted ? (
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
