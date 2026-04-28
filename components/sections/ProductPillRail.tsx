"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { MOTION, RALLY_EASE } from "@/lib/motion-tokens";

export type ProductPillItem = {
  id: string;
  label: string;
  href?: string;
};

const DEFAULT_PILLS: ProductPillItem[] = [
  { id: "system", label: "Daily system — prebiotic · probiotic · support", href: "/products/daily-gut-system" },
  { id: "sunroot", label: "Sunroot-derived prebiotic substrate", href: "/ingredients" },
  { id: "delivery", label: "Delayed-release capsule · HPMC", href: "/science" },
  { id: "strains", label: "Multi-strain · species-level on label", href: "/products/daily-gut-system" },
  { id: "testing", label: "Third-party tested · COA by lot (Phase 2)", href: "/coa" },
  { id: "facts", label: "Full Supplement Facts — no mystery blends", href: "/faq" },
];

type Props = {
  items?: ProductPillItem[];
  variant?: "light" | "dark";
};

export function ProductPillRail({ items = DEFAULT_PILLS, variant = "light" }: Props) {
  const reduce = useReducedMotion();
  const dark = variant === "dark";
  const surface = dark ? "border-white/15 bg-white/[0.06]" : "border-line bg-ivory";
  const pillInteractive = dark
    ? "border-white/20 text-ivory/90 hover:border-clay/60 hover:bg-white/[0.08]"
    : "border-line text-charcoal hover:border-sage-deep hover:bg-paper/80";
  const eyebrow = dark ? "text-mineral" : "text-graphite";

  return (
    <div className={`border-b py-4 md:py-5 ${dark ? "border-white/10 bg-sage-deep/30" : "border-line bg-bone"}`}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.14em] ${eyebrow}`}>
          System snapshot
        </p>
        <div
          className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item, i) => {
            const pill = (
              <span
                className={`inline-flex max-w-[min(100%,22rem)] shrink-0 scroll-mx-4 rounded-pill border px-4 py-2 text-left text-[11px] font-semibold leading-snug transition-colors md:text-xs ${surface} ${pillInteractive}`}
                style={{ scrollSnapAlign: "start" }}
              >
                {item.label}
              </span>
            );

            const animated = reduce ? (
              pill
            ) : (
              <motion.span
                className="inline-flex shrink-0"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: MOTION.revealMs / 1000,
                  delay: Math.min(i * 0.04, 0.35),
                  ease: RALLY_EASE,
                }}
              >
                {pill}
              </motion.span>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className="inline-flex shrink-0 focus-visible:rounded-pill">
                  {animated}
                </Link>
              );
            }
            return (
              <span key={item.id} className="inline-flex shrink-0">
                {animated}
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-[10px] text-mineral">
          Manual scroll only — no autoplay. Structure/function language; finalize numbers with counsel.
        </p>
      </div>
    </div>
  );
}
