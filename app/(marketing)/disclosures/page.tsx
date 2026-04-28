import type { Metadata } from "next";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Disclosures",
};

export default function DisclosuresPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px] text-sm leading-relaxed text-graphite">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Disclosures</h1>
        <p className="mt-6">
          Add advisory board conflicts, affiliate relationships, and any paid partnerships here per
          FTC guidance.
        </p>
        <FdaDisclaimer className="mt-8" />
      </Container>
    </div>
  );
}
