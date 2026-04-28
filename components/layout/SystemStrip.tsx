"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SystemStrip() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      const threshold = window.innerHeight * 0.5;
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Daily Gut System quick-shop"
      className={[
        "fixed bottom-0 left-0 right-0 z-[100]",
        "border-t border-line bg-bone/95 backdrop-blur-md",
        // transition-transform is suppressed by globals.css prefers-reduced-motion
        "transition-transform duration-[240ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-widest text-graphite"
          aria-hidden
        >
          <span className="text-sage-deep">Daily Gut System</span>
          <span className="hidden text-mineral sm:inline">·</span>
          <span className="hidden sm:inline">Prebiotic</span>
          <span className="hidden text-mineral sm:inline">·</span>
          <span className="hidden sm:inline">Probiotic</span>
          <span className="hidden text-mineral sm:inline">·</span>
          <span className="hidden sm:inline">Digestive Support</span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/products/daily-gut-system"
            className="rounded-pill bg-charcoal px-4 py-1.5 text-[11px] font-semibold text-ivory transition-colors duration-200 hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            Shop the System →
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss Daily Gut System strip"
            className="rounded-sm p-1.5 text-mineral transition-colors hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
