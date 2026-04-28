"use client";

import { useState } from "react";
import { useCart, type CartInterval } from "@/lib/cart";
import { Button } from "@/components/ui/Button";

type Props = {
  slug: string;
  name: string;
  priceMonthly: number;
  priceOneTime: number;
};

/** Stable across server/client (avoid `toLocaleString` hydration mismatches). */
function formatUsd(n: number) {
  const rounded = Math.round(n * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

export function AddToCartButton({ slug, name, priceMonthly, priceOneTime }: Props) {
  const [interval, setInterval] = useState<CartInterval>("subscribe");
  const { addItem } = useCart();

  const price = interval === "subscribe" ? priceMonthly : priceOneTime;

  function handleAdd() {
    addItem({ slug, name, price, interval });
  }

  return (
    <div className="mt-8 rounded-md border border-line bg-paper p-5">
      {/* Interval selector */}
      <fieldset className="mb-5">
        <legend className="sr-only">Purchase type</legend>
        <div className="flex rounded-md border border-line bg-ivory">
          {(
            [
              { value: "subscribe" as CartInterval, label: "Subscribe & save" },
              { value: "one-time" as CartInterval, label: "One-time" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.value}
              className={[
                "flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium transition-colors",
                interval === opt.value
                  ? "bg-charcoal text-ivory"
                  : "text-graphite hover:bg-paper",
              ].join(" ")}
            >
              <input
                type="radio"
                name={`purchase-type-${slug}`}
                value={opt.value}
                checked={interval === opt.value}
                onChange={() => setInterval(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price display */}
      <div className="mb-1 flex items-baseline gap-3">
        <span className="font-display text-3xl text-charcoal">${formatUsd(price)}</span>
        <span className="text-sm text-mineral">
          {interval === "subscribe" ? "/ month" : "one-time"}
        </span>
      </div>
      {interval === "subscribe" && (
        <p className="mb-5 text-xs text-mineral">
          Save ${formatUsd(priceOneTime - priceMonthly)} vs. one-time. Cancel anytime.
        </p>
      )}
      {interval === "one-time" && (
        <p className="mb-5 text-xs text-mineral">
          Full 30-day supply. No subscription commitment.
        </p>
      )}

      {/* CTA */}
      <Button
        type="button"
        variant="primary"
        className="w-full !py-3 text-sm"
        onClick={handleAdd}
      >
        Add to cart — ${formatUsd(price)}
        {interval === "subscribe" ? "/mo" : ""}
      </Button>

      <p className="mt-3 text-[10px] leading-snug text-mineral">
        † These statements have not been evaluated by the Food and Drug Administration. This product is
        not intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </div>
  );
}
