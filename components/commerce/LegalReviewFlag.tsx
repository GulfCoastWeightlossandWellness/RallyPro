"use client";

import { useState } from "react";

export function LegalReviewFlag({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `${id}-legal-panel`;

  return (
    <div className="rounded-md border border-amber-flag/40 bg-amber-flag-bg px-3 py-2 text-sm">
      <button
        type="button"
        id={`${id}-legal-btn`}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-2 text-left font-semibold text-amber-flag focus-visible:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-amber-flag" aria-hidden />
        Needs Legal Review
        <span className="ml-auto text-charcoal/60">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div id={panelId} role="region" aria-labelledby={`${id}-legal-btn`} className="mt-2 text-graphite">
          <p className="mb-2 leading-relaxed">
            This SKU comes from the Armenian catalog with naming (“Detox”) or ingredients (zeolite)
            that receive extra scrutiny in the United States. Marketing copy, structure/function
            claims, and labels here are <strong>draft placeholders</strong> only.
          </p>
          <p className="leading-relaxed">
            Before checkout, ads, or inventory: run final text through qualified FDA/FTC supplement
            counsel, confirm import and GMP documentation, and replace imagery with U.S.-approved
            assets. No medical outcome promises are intended on this preview.
          </p>
        </div>
      ) : null}
    </div>
  );
}
