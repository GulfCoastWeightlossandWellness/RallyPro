import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px]">
        <Eyebrow>About</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal md:text-5xl">Why this brand exists</h1>
        <p className="mt-6 text-base leading-relaxed text-graphite">
          The supplement aisle confuses intensity with credibility — louder detox promises, anonymous
          blends, influencer theatre. Rally Pro instead borrows discipline from Armenian Rally
          Sunroot manufacturing (patented sunroot extraction, controlled agriculture) and pairs it
          with the transparency expectations of U.S. shoppers who treat supplements like
          long-term infrastructure.
        </p>
        <h2 className="mt-10 font-display text-2xl text-charcoal">Standards</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-graphite">
          <li>Daily systems, not one-off stunts</li>
          <li>Structure/function copy reviewed by counsel before scale</li>
          <li>Testing and COA programs that survive an skeptical customer</li>
          <li>Subscriptions that are easy to leave — by design and by law</li>
        </ol>
        <FdaDisclaimer className="mt-12" />
        <p className="mt-6 text-sm">
          <Link href="/contact" className="font-semibold text-sage-deep underline-offset-2 hover:underline">
            Contact →
          </Link>
        </p>
      </Container>
    </div>
  );
}
