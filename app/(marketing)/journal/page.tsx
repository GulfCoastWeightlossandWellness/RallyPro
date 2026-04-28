import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px]">
        <Eyebrow>Editorial</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Journal</h1>
        <p className="mt-6 text-graphite">
          Phase 2: Sanity-powered articles on microbiome literacy, label reading, and honest
          expectations. Stub for now.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-sage-deep hover:underline">
          ← Home
        </Link>
      </Container>
    </div>
  );
}
