import Image from "next/image";
import { footer, identity, logos } from "@/content/site";
import { FooterWordmark } from "./FooterWordmark";

/**
 * The locations are a flat list of Chennai-area campuses with no regional
 * grouping in the source, so the directory is indexed alphabetically into
 * three even columns and each column labelled with the range it actually
 * covers — structure the copy supports, rather than regions invented for it.
 */
const COLUMNS = 3;

function indexLocations(locations: readonly string[]) {
  const seen = new Set<string>();
  const sorted = locations
    .filter((loc) => {
      const key = loc.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

  const per = Math.ceil(sorted.length / COLUMNS);

  return Array.from({ length: COLUMNS }, (_, i) => {
    const entries = sorted.slice(i * per, (i + 1) * per);
    const first = entries[0]?.[0].toUpperCase() ?? "";
    const last = entries[entries.length - 1]?.[0].toUpperCase() ?? "";
    return {
      label: first === last ? first : `${first} — ${last}`,
      entries,
    };
  }).filter((column) => column.entries.length > 0);
}

/** Three zones, then the wordmark set very large and clipped by the edge. */
export function Footer() {
  const columns = indexLocations(footer.locations);

  return (
    <footer className="surface-2 relative overflow-clip pt-section">
      <div className="container-page">
        <div className="grid-12 gap-y-14 border-t border-line pt-16">
          <div className="col-span-12 md:col-span-4">
            <Image
              src={logos.network.src}
              alt={logos.network.alt}
              width={logos.network.width}
              height={logos.network.height}
              className="h-10 w-auto brightness-0 saturate-0 dark:invert"
            />

            <h2 className="eyebrow mt-12">{footer.contactTitle}</h2>
            {/* the contact block reads as one card, lifting under the pointer */}
            <address className="card mt-5 block p-6 text-body text-fg-mute not-italic transition-[background-color,border-color,box-shadow] duration-500 hover:border-accent hover:shadow-[var(--shadow-lift)]">
              <span className="space-y-1">
                {footer.contact
                  .filter((line) => line !== footer.phone)
                  .map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
              </span>
              <a
                href={`tel:${footer.phone}`}
                className="mt-5 block font-display text-h3 leading-none font-light text-fg transition-colors duration-300 hover:text-accent"
              >
                {footer.phone}
              </a>
            </address>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <h2 className="eyebrow">{footer.locationsTitle}</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              {columns.map((column) => (
                <div key={column.label}>
                  <p className="eyebrow hairline-b pb-3 [--eyebrow-color:var(--accent)]">
                    {column.label}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {column.entries.map((loc) => (
                      <li key={loc}>
                        <a
                          href="#schools"
                          className="text-[0.9375rem] text-fg-mute transition-colors duration-300 hover:text-accent"
                        >
                          {loc}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(4rem,10vh,8rem)] border-t border-line pt-12 pb-12">
        <FooterWordmark />
      </div>

      <div className="container-page hairline-t pb-10 pt-6">
        <p className="eyebrow">
          © {new Date().getFullYear()} {identity.brand}. All rights reserved.
        </p>
      </div>

      {/* TODO: chat widget slot — the ExtraaEdge bot is deliberately not
          rebuilt; mount whatever replaces it here. */}
      <div id="chat-widget-slot" data-chat-widget-slot />
    </footer>
  );
}
