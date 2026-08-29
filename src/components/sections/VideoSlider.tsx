"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { heroVideos } from "@/content/site";
import { Lightbox } from "@/components/ui/Lightbox";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitText } from "@/components/ui/SplitText";
import useEmblaCarousel from "embla-carousel-react";

export function VideoSlider() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  // Embla Carousel configuration for infinite loop
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      aria-label={heroVideos.heading}
      className="surface-2 py-section overflow-hidden relative"
    >
      <div className="container-page flex flex-col md:flex-row md:items-end md:justify-between gap-8 relative z-20">
        <div>
          <Eyebrow index="01">{heroVideos.eyebrow}</Eyebrow>
          <SplitText
            as="h2"
            text={heroVideos.heading}
            className="mt-6 block max-w-[22ch] text-h2 font-light text-fg"
            stagger={0.045}
          />
          <p className="measure mt-6 text-lead text-fg-mute">{heroVideos.sub}</p>
        </div>

        {/* Navigation Arrows for Desktop */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous videos"
            className="group flex size-14 items-center justify-center rounded-full border border-line bg-paper text-fg transition-all hover:border-accent hover:text-accent hover:shadow-[var(--shadow-lift)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next videos"
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
          <ul className="flex touch-pan-y -ml-5">
            {heroVideos.videos.map((video) => (
              <li key={video.id} className="min-w-0 shrink-0 flex-[0_0_85vw] pl-5 sm:flex-[0_0_52vw] md:flex-[0_0_35vw] lg:flex-[0_0_28vw]">
                <button
                  type="button"
                  onClick={() => setActiveVideoId(video.id)}
                  className="group relative flex w-full flex-col text-left outline-none cursor-pointer"
                  aria-label={`Play ${video.title}`}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-card bg-paper-3 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lift)]">
                    <Image
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 52vw, (max-width: 1024px) 35vw, 28vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/10">
                      <span className="relative flex size-14 items-center justify-center rounded-pill border border-white/40 bg-black/40 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-black/60">
                        <span
                          aria-hidden="true"
                          className="ml-1 block size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white"
                        />
                      </span>
                    </div>
                  </div>
                  <span className="mt-4 block font-medium text-fg transition-colors group-hover:text-accent">
                    {video.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 flex justify-center">
        <a 
          href="https://www.youtube.com/@VelammalNewGenEduNetwork"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line bg-paper px-8 py-4 font-medium text-fg transition-all hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-[var(--shadow-lift)]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
          Explore more on YouTube
        </a>
      </div>

      {/* Lightbox for playing videos */}
      <Lightbox
        videoId={activeVideoId || ""}
        title={heroVideos.videos.find((v) => v.id === activeVideoId)?.title || "Video"}
        open={activeVideoId !== null}
        onClose={() => setActiveVideoId(null)}
      />
    </section>
  );
}
