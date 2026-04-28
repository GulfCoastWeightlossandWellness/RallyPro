import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px] text-sm leading-relaxed text-graphite">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Terms of Service</h1>
        <p className="mt-6">
          Placeholder terms. Must include subscription terms, autorenewal disclosures, arbitration
          clauses if used, and FTC Negative Option compliance before accepting payments.
        </p>
      </Container>
    </div>
  );
}
