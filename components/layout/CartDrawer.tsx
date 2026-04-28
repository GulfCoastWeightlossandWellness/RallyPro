"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useCart, type CartInterval } from "@/lib/cart";

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

function QtyButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-sm border border-line text-sm leading-none text-graphite transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
    >
      {children}
    </button>
  );
}

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, total, count } =
    useCart();

  const hasSubscribe = items.some((i) => i.interval === "subscribe");
  const hasOneTime = items.some((i) => i.interval === "one-time");
  const subtotalSuffix =
    hasSubscribe && !hasOneTime ? "/mo" : "";
  const subtotalHint =
    hasSubscribe && hasOneTime
      ? "Subtotal mixes monthly subscription and one-time prices."
      : null;

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[200] bg-charcoal/30 backdrop-blur-[2px] data-[state=open]:animate-[overlayShow_200ms_ease]" />
        <Dialog.Content
          className={[
            "fixed right-0 top-0 z-[201] flex h-full w-full max-w-[360px] flex-col",
            "border-l border-line bg-ivory shadow-[var(--shadow-float)]",
            "focus:outline-none",
            "data-[state=open]:animate-[drawerIn_320ms_cubic-bezier(0.32,0.72,0,1)]",
            "data-[state=closed]:animate-[drawerOut_240ms_cubic-bezier(0.32,0.72,0,1)]",
          ].join(" ")}
        >
          <VisuallyHidden asChild>
            <Dialog.Description>Your shopping cart items</Dialog.Description>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="font-display text-lg font-normal text-charcoal">
              Cart{" "}
              {count > 0 && (
                <span className="font-sans text-sm text-mineral">({count})</span>
              )}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close cart"
                className="rounded-md p-1.5 text-graphite transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                <p className="text-sm text-mineral">Your cart is empty.</p>
                <Dialog.Close asChild>
                  <Link
                    href="/products/daily-gut-system"
                    className="rounded-pill border border-sage-deep px-5 py-2 text-xs font-semibold text-sage-deep transition-colors hover:bg-sage-deep hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
                  >
                    Shop the System →
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              <ul className="space-y-4" aria-label="Cart items">
                {items.map((item) => {
                  const key = `${item.slug}-${item.interval}`;
                  return (
                    <li
                      key={key}
                      className="rounded-md border border-line bg-paper p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-charcoal">
                            {item.name}
                          </p>
                          <p className="mt-0.5 text-[11px] capitalize text-mineral">
                            {item.interval === "subscribe"
                              ? "Subscribe & save"
                              : "One-time purchase"}
                          </p>
                        </div>
                        <span className="font-mono text-sm text-charcoal">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <QtyButton
                          onClick={() =>
                            updateQty(item.slug, item.interval as CartInterval, item.qty - 1)
                          }
                          label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </QtyButton>
                        <span className="w-5 text-center text-sm text-charcoal">
                          {item.qty}
                        </span>
                        <QtyButton
                          onClick={() =>
                            updateQty(item.slug, item.interval as CartInterval, item.qty + 1)
                          }
                          label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </QtyButton>
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.slug, item.interval as CartInterval)
                          }
                          className="ml-auto text-[11px] text-mineral underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-line px-5 py-5">
              <div className="mb-4 flex justify-between text-sm">
                <span className="text-graphite">Subtotal</span>
                <span className="font-semibold text-charcoal">
                  ${total.toFixed(2)}
                  {subtotalSuffix}
                </span>
              </div>
              {subtotalHint && (
                <p className="mb-4 text-[10px] leading-snug text-mineral">{subtotalHint}</p>
              )}
              <Dialog.Close asChild>
                <Link
                  href="/checkout"
                  className="block w-full rounded-pill bg-charcoal py-3 text-center text-sm font-semibold text-ivory transition-colors hover:bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
                >
                  Proceed to Checkout
                </Link>
              </Dialog.Close>
              <p className="mt-3 text-center text-[10px] text-mineral">
                Production checkout routes to Shopify hosted checkout.
              </p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
