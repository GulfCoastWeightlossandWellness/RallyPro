"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  getExternalStoreCheckoutUrl,
  getExternalStoreShopUrl,
  RALLY_SUNROOT_ECWID_STORE_ID,
} from "@/lib/commerce/rally-sunroot-store";
import { useExternalCheckout } from "@/lib/external-checkout";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 2l12 12M14 2L2 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Modal shown when the user chooses checkout: explains handoff to the official
 * Rally Sunroot Ecwid store and opens that cart in a new tab (no iframe — third-party checkout blocks embedding).
 */
export function ExternalCheckoutDialog() {
  const { externalCheckoutOpen, setExternalCheckoutOpen } = useExternalCheckout();
  const checkoutUrl = getExternalStoreCheckoutUrl();
  const shopUrl = getExternalStoreShopUrl();

  return (
    <Dialog.Root open={externalCheckoutOpen} onOpenChange={setExternalCheckoutOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[220] bg-charcoal/40 backdrop-blur-[2px] data-[state=open]:animate-[overlayShow_200ms_ease]" />
        <Dialog.Content
          className={[
            "fixed left-1/2 top-1/2 z-[221] w-[min(100%,26rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-lg border border-line bg-ivory p-6 shadow-[var(--shadow-float)]",
            "focus:outline-none",
            "data-[state=open]:animate-[overlayShow_200ms_ease]",
          ].join(" ")}
        >
          <VisuallyHidden asChild>
            <Dialog.Description>
              Continue to the official Rally Sunroot store to complete payment and shipping.
            </Dialog.Description>
          </VisuallyHidden>

          <div className="flex items-start justify-between gap-3">
            <Dialog.Title className="font-display text-xl font-normal leading-snug text-charcoal">
              Complete your purchase on the official store
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="shrink-0 rounded-md p-1.5 text-graphite transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-graphite">
            Rally Pro (this U.S. preview) uses a local cart for browsing and price reference only.
            <strong className="font-semibold text-charcoal"> Your items here are not sent</strong>{" "}
            to checkout automatically. Payment, currency, and fulfillment run on the{" "}
            <span className="whitespace-nowrap">Rally Sunroot</span> storefront in Armenia, powered by
            Ecwid (store {RALLY_SUNROOT_ECWID_STORE_ID}).
          </p>

          <ul className="mt-3 list-inside list-disc space-y-1 text-xs text-mineral">
            <li>Add the products you want on the official site.</li>
            <li>Shipping, taxes, and support follow that store&apos;s policies.</li>
          </ul>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-pill bg-charcoal px-5 py-3 text-center text-sm font-semibold text-ivory transition-colors hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
            >
              Open cart / checkout — new tab
            </a>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center rounded-pill border border-line px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                Not now
              </button>
            </Dialog.Close>
          </div>

          <p className="mt-4 text-center text-[10px] text-mineral">
            <a
              href={shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sage-deep underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
            >
              Browse full shop →
            </a>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
