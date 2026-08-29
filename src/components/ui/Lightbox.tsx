"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Full-screen YouTube lightbox. Native <dialog>.showModal() gives us the focus
 * trap and Esc-to-close for free; the iframe only mounts while open.
 */
export function Lightbox({
  videoId,
  instagramId,
  localVideoSrc,
  title,
  open,
  onClose,
}: {
  videoId?: string;
  instagramId?: string;
  localVideoSrc?: string;
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

  const isInsta = !!instagramId || !!localVideoSrc;

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current) handleClose();
      }}
      aria-label={title}
      className={`m-auto ${isInsta ? "w-[min(96vw,500px,calc(85vh*9/16))]" : "w-[min(96vw,1200px,calc(85vh*16/9))]"} rounded-panel bg-transparent p-0 text-fg backdrop:bg-black/60 backdrop:backdrop-blur-sm`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleClose}
          className={`absolute ${isInsta ? "-top-12 right-0" : "top-3 right-3"} z-10 flex items-center gap-2 rounded-pill border border-line bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] px-4 py-2.5 text-[0.75rem] tracking-[0.12em] text-fg uppercase backdrop-blur-md transition-colors hover:border-accent hover:text-accent`}
        >
          Close
          <span aria-hidden="true" className="relative block size-3">
            <span className="absolute top-1/2 left-0 h-px w-3 rotate-45 bg-current" />
            <span className="absolute top-1/2 left-0 h-px w-3 -rotate-45 bg-current" />
          </span>
        </button>
        <div className={`${isInsta ? "aspect-[9/16]" : "aspect-video"} w-full overflow-hidden rounded-panel bg-paper-3 shadow-[var(--shadow-lift)]`}>
          {mounted ? (
            localVideoSrc ? (
              <video
                src={localVideoSrc}
                className="size-full object-contain bg-black"
                controls
                autoPlay
                playsInline
              />
            ) : instagramId ? (
              <iframe
                className="size-full bg-white"
                src={`https://www.instagram.com/reel/${instagramId}/embed`}
                title={title}
                frameBorder="0"
                scrolling="no"
                allowTransparency
              />
            ) : (
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
