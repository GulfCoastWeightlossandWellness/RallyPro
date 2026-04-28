import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px] text-sm leading-relaxed text-graphite">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Privacy Policy</h1>
        <p className="mt-6">
          Placeholder privacy policy. Replace with counsel-reviewed language covering Shopify orders,
          Klaviyo email, PostHog/GA4, cookies, CCPA, and any international data before launch.
        </p>
      </Container>
    </div>
  );
}
