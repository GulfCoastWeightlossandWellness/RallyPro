"use client";

import { useReducedMotion } from "motion/react";

const ITEMS = [
  "Third-party tested",
  "Patented sunroot extraction · AM",
  "Delayed-release capsule intent",
  "No proprietary blends on-label",
  "Subscription-friendly checkout · soon",
  "Structure/function copy review · counsel",
];

export function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const reduce = useReducedMotion();
  const row = [...ITEMS, ...ITEMS];
  const fg = dark ? "text-ivory/45" : "text-mineral";
  const dot = dark ? "bg-clay/80" : "bg-clay";
  const edge = dark ? "border-white/10 bg-black/10" : "border-line bg-paper/45";
  return (
    <div className={`overflow-hidden border-y py-3.5 ${edge}`}>
      <div
        className={`flex gap-10 ${reduce ? "w-full flex-wrap justify-center" : "w-max"}`}
        style={reduce ? undefined : { animation: "marquee 36s linear infinite" }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2.5 px-3">
            <span className={`h-1 w-1 rounded-full ${dot}`} aria-hidden />
            <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${fg}`}>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
