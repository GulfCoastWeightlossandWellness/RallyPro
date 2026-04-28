import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "COA Lookup",
};

export default function CoaPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[640px]">
        <Eyebrow>Quality</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Certificate of Analysis lookup</h1>
        <p className="mt-6 text-graphite">
          Coming soon: enter the lot number from your bottle label to download the matching COA PDF.
          Requires secured storage and virus scanning before production.
        </p>
        <label htmlFor="lot" className="mt-8 block text-[10px] font-bold uppercase tracking-wider text-mineral">
          Lot number (disabled)
        </label>
        <input
          id="lot"
          disabled
          className="mt-2 w-full cursor-not-allowed rounded-md border border-line bg-paper px-3 py-2 text-sm opacity-60"
          placeholder=" e.g. RP-2026-001"
        />
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-sage-deep hover:underline">
          ← Home
        </Link>
      </Container>
    </div>
  );
}
