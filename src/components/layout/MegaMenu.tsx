"use client";

import Image from "next/image";
import { useState } from "react";
import { m } from "motion/react";
import { EASE } from "@/lib/motion";
import { schoolGroups } from "@/content/site";

/**
 * Full-width mega panel: the taxonomy in typographic columns with a campus
 * photo that swaps as you move across the groups.
 */
export function MegaMenu({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState(0);

  return (
    <m.div
      data-motion
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="absolute inset-x-0 top-full border-t border-line bg-[color-mix(in_srgb,var(--paper)_94%,transparent)] shadow-[var(--shadow-card)] backdrop-blur-xl"
    >
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem] lg:py-16">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {schoolGroups.map((group, i) => (
            <div
              key={group.group}
              onMouseEnter={() => setPreview(i)}
              onFocus={() => setPreview(i)}
            >
              <p className="eyebrow mb-4 [--eyebrow-color:var(--accent)]">{group.group}</p>
              {group.campuses.length > 0 ? (
                <ul className="space-y-1.5">
                  {group.campuses.map((campus) => (
                    <li key={`${group.group}-${campus}`}>
                      <a
                        href="#schools"
                        onClick={onClose}
                        className="text-[0.9375rem] text-fg-mute transition-colors duration-200 hover:text-accent"
                      >
                        {campus}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <a
                  href="#schools"
                  onClick={onClose}
                  className="text-[0.9375rem] text-fg-mute transition-colors duration-200 hover:text-accent"
                >
                  {group.group}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:block" aria-hidden="true">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-paper-3">
            {schoolGroups.map((group, i) => (
              <m.div
                key={group.group}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === preview ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Image
                  src={group.preview.src}
                  alt=""
                  fill
                  sizes="20rem"
                  className="object-cover"
                />
              </m.div>
            ))}
          </div>
          <p className="eyebrow mt-4">{schoolGroups[preview].group}</p>
        </div>
      </div>
    </m.div>
  );
}
