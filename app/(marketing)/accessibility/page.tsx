import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Accessibility",
};

export default function AccessibilityPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px] text-sm leading-relaxed text-graphite">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Accessibility Statement</h1>
        <p className="mt-6">
          Rally Pro targets WCAG 2.1 AA. This preview implements skip links, visible focus, semantic
          landmarks, and native disclosure patterns where possible. Audit with axe + VoiceOver before
          launch and publish a contact path for accommodations.
        </p>
      </Container>
    </div>
  );
}
