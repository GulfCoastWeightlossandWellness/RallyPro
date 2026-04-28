"use client";

import { useEffect } from "react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { useExternalCheckout } from "@/lib/external-checkout";
import { getExternalStoreCheckoutUrl } from "@/lib/commerce/rally-sunroot-store";

/**
 * Visiting /checkout opens the external-store handoff modal (same as cart CTA).
 */
export default function CheckoutPage() {
  const { openExternalCheckout } = useExternalCheckout();

  useEffect(() => {
    openExternalCheckout();
  }, [openExternalCheckout]);

  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-xl">
        <Eyebrow>Checkout</Eyebrow>
        <h1 className="font-display text-3xl text-charcoal">Continue on the official store</h1>
        <p className="mt-4 text-sm text-graphite">
          A dialog should open with a link to the secure Rally Sunroot cart. If it did not, open
          checkout manually:{" "}
          <a
            href={getExternalStoreCheckoutUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sage-deep underline-offset-2 hover:underline"
          >
            official store cart (new tab)
          </a>
          .
        </p>
      </Container>
    </div>
  );
}
