"use client";

import { useCallback, useState } from "react";
import { instagramReels } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import { Lightbox } from "@/components/ui/Lightbox";
import useEmblaCarousel from "embla-carousel-react";

export function InstagramSlider() {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      aria-label={instagramReels.heading}
      className="surface-1 py-section overflow-hidden relative"
    >
      <div className="container-page flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-20">
        <div>
          <Eyebrow index="08">{instagramReels.eyebrow}</Eyebrow>
          <SplitText
            as="h2"
            text={instagramReels.heading}
            className="mt-6 block max-w-[22ch] text-h2 font-light text-fg"
            stagger={0.045}
          />
          <p className="measure mt-6 text-lead text-fg-mute">{instagramReels.sub}</p>
        </div>

        {/* Navigation Arrows for Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous reels"
            className="group flex size-14 items-center justify-center rounded-full border border-line bg-paper text-fg transition-all hover:border-accent hover:text-accent hover:shadow-[var(--shadow-lift)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next reels"
            className="group flex size-14 items-center justify-center rounded-full border border-line bg-paper text-fg transition-all hover:border-accent hover:text-accent hover:shadow-[var(--shadow-lift)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-12">
        {/* Edge Gradients for Fading Effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[10vw] bg-[linear-gradient(to_right,var(--paper)_0%,transparent_100%)] md:w-[15vw]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[10vw] bg-[linear-gradient(to_left,var(--paper)_0%,transparent_100%)] md:w-[15vw]" />

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Embla Carousel Container */}
          <ul className="flex touch-pan-y -ml-5 py-4">
            {instagramReels.videos.map((filename, index) => (
              <li key={index} className="min-w-0 shrink-0 flex-[0_0_85vw] pl-5 sm:flex-[0_0_50vw] md:flex-[0_0_40vw] lg:flex-[0_0_20%]">
                <div className="relative w-full overflow-hidden rounded-2xl bg-paper-3 shadow-[var(--shadow-card)] transition-transform duration-500 hover:scale-[1.02]">
                  
                  {/* The Glass Overlay for Smooth Dragging and Click-out */}
                  <button 
                    type="button"
                    onClick={() => setActiveReelId(filename)}
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]"
                    aria-label="View Reel on Instagram"
                  >
                    <span className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-6 py-3 text-sm font-medium text-white border border-white/40 shadow-lg">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Play Reel
                    </span>
                  </button>

                  {/* The Video Preview */}
                  <div className="relative z-10 w-full pt-[177.77%] pointer-events-none bg-black">
                    <video
                      src={`/videos/${filename}#t=999`}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 flex justify-center">
        <a 
          href="https://www.instagram.com/velammalnewgengroup/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line bg-paper px-8 py-4 font-medium text-fg transition-all hover:border-accent hover:text-accent hover:shadow-[var(--shadow-lift)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Explore more on Instagram
        </a>
      </div>

      <Lightbox
        localVideoSrc={activeReelId ? `/videos/${activeReelId}` : undefined}
        title="Instagram Reel"
        open={activeReelId !== null}
        onClose={() => setActiveReelId(null)}
      />
    </section>
  );
}
