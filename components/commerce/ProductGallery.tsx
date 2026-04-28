"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { RALLY_EASE } from "@/lib/motion-tokens";

type Props = {
  name: string;
  heroSrc: string;
  detailSrc?: string;
};

export function ProductGallery({ name, heroSrc, detailSrc }: Props) {
  const thumbs = detailSrc && detailSrc !== heroSrc ? [heroSrc, detailSrc] : [heroSrc];
  const [active, setActive] = useState(0);
  const current = thumbs[active] ?? heroSrc;

  return (
    <div className="space-y-4">
      <motion.div
        className="relative aspect-square overflow-hidden rounded-md border border-line bg-ivory"
        transition={{ duration: 0.25, ease: RALLY_EASE }}
      >
        <Image
          src={current}
          alt={`${name} — product photography`}
          fill
          priority
          sizes="(max-width:1024px)100vw,50vw"
          className="object-cover"
        />
      </motion.div>
      {thumbs.length > 1 ? (
        <div className="flex gap-2" role="tablist" aria-label={`${name} images`}>
          {thumbs.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`product-panel-${i}`}
              id={`product-tab-${i}`}
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border transition-colors md:h-20 md:w-20 ${
                active === i ? "border-sage-deep ring-2 ring-sage-deep/25" : "border-line hover:border-mineral"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
