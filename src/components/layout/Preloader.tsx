import Image from "next/image";
import { hero, logos } from "@/content/site";

/**
 * Server-rendered so it exists at first paint and never waits on hydration —
 * a JS-driven overlay would sit on top of the hero until React booted and
 * push LCP out by seconds.
 *
 * "The flight": a paper plane draws its route across the page, calling at a
 * pencil, a book and a graduation cap on the way — the school's own journey
 * from Kindergarten to A+ — while the wordmark rises beneath it. The route
 * then straightens into a hairline that becomes the seam of a curtain, and
 * the two paper halves part around it into the hero.
 *
 * One inline SVG and a stylesheet: nothing to download before it can begin,
 * beyond the mark the page was already preloading. 1.76s end to end, skipped
 * outright on a warm session and under prefers-reduced-motion.
 */

/** The route. Three chained cubics, so every join is a point ON the curve —
 *  which is what lets the stations sit exactly on the line. */
const ROUTE =
  "M 26 138 C 92 138 118 74 186 84 C 268 96 292 136 380 126 C 452 118 500 68 592 40";

/** Each station is a cubic's endpoint, drawn in its own 24-unit box and set
 *  at 40 units on the route so the glyph is actually legible at speed. */
const STATION_BOX = 40;
const STATION_SCALE = STATION_BOX / 24;

const STATIONS = [
  {
    x: 186,
    y: 84,
    color: "var(--accent-bright)",
    label: "pencil",
    art: (
      <>
        <path d="M4.8 19.2 8.6 18.1 19.6 7.1 16.9 4.4 5.9 15.4Z" />
        <path d="M15.1 6.2 17.8 8.9" />
      </>
    ),
  },
  {
    x: 380,
    y: 126,
    color: "var(--color-moss)",
    label: "book",
    art: (
      <>
        <path d="M3.6 6.4C6.4 5 9.4 5.2 12 7c2.6-1.8 5.6-2 8.4-.6v11.8c-2.8-1.4-5.8-1.2-8.4.6-2.6-1.8-5.6-2-8.4-.6Z" />
        <path d="M12 7v11.8" />
      </>
    ),
  },
  {
    x: 592,
    y: 40,
    color: "var(--gold)",
    label: "cap",
    art: (
      <>
        <path d="M12 4.2 22.2 9 12 13.8 1.8 9Z" />
        <path d="M6.4 11.4v4.5c0 1 2.5 2.3 5.6 2.3s5.6-1.3 5.6-2.3v-4.5" />
      </>
    ),
  },
];

export function Preloader() {
  return (
    <div className="vgs-preloader" aria-hidden="true">
      <div className="vgs-preloader__panel vgs-preloader__panel--top">
        <div className="vgs-preloader__stack">
          <div className="vgs-preloader__flight">
            <div className="vgs-preloader__scene">
              <svg
                className="vgs-preloader__route"
                viewBox="0 0 640 180"
                fill="none"
                focusable="false"
              >
                <path className="vgs-preloader__line" pathLength={1000} d={ROUTE} />

                {STATIONS.map((station, i) => (
                  <g
                    key={station.label}
                    transform={`translate(${station.x - STATION_BOX / 2} ${
                      station.y - STATION_BOX / 2
                    }) scale(${STATION_SCALE})`}
                  >
                    <g className={`vgs-preloader__stop vgs-preloader__stop--${i + 1}`}>
                      <circle
                        className="vgs-preloader__stop-disc"
                        cx="12"
                        cy="12"
                        r="13.5"
                      />
                      <g
                        stroke={station.color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      >
                        {station.art}
                      </g>
                    </g>
                  </g>
                ))}
              </svg>

              <span className="vgs-preloader__plane">
                <svg viewBox="0 0 24 24" fill="none" focusable="false">
                  <path d="M23 12 1 2l5.5 10L1 22Z" fill="currentColor" />
                  <path
                    d="M6.5 12H23"
                    stroke="var(--paper)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          <span className="vgs-preloader__mark">
            <span className="vgs-preloader__mark-in">
              <Image
                src={logos.network.src}
                alt=""
                width={logos.network.width}
                height={logos.network.height}
                preload
                fetchPriority="high"
                className="vgs-preloader__logo"
              />
            </span>
          </span>
        </div>
      </div>

      <div className="vgs-preloader__panel vgs-preloader__panel--bottom">
        <span className="vgs-preloader__note">{hero.eyebrow}</span>
      </div>

      <span className="vgs-preloader__seam" />
    </div>
  );
}

/**
 * Runs before first paint, deciding whether the preloader is allowed to show.
 *
 * Default: it plays on EVERY load. Production wants it once per session, which
 * is what ONCE_PER_SESSION gives you — it is off by default because a
 * preloader you only ever see once is a preloader you cannot review.
 */
const ONCE_PER_SESSION = false;

const WARM_ONCE = `try{var w=sessionStorage.getItem('vgs-preloaded');document.documentElement.dataset.warm=w?'1':'0';sessionStorage.setItem('vgs-preloaded','1')}catch(e){document.documentElement.dataset.warm='1'}`;
const ALWAYS = `document.documentElement.dataset.warm='0'`;

export const preloaderWarmScript = ONCE_PER_SESSION ? WARM_ONCE : ALWAYS;
