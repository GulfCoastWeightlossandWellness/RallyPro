import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shipping & Returns",
};

export default function ShippingReturnsPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px] text-sm leading-relaxed text-graphite">
        <Eyebrow>Support</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Shipping &amp; Returns</h1>
        <p className="mt-6">
          Draft policy: subscriptions ship free; one-time orders may incur flat-rate shipping.
          Thirty-day satisfaction messaging belongs here once finalized with operations and counsel.
        </p>
      </Container>
    </div>
  );
}
