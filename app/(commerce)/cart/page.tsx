import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Container";

export default function CartPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-xl">
        <Eyebrow>Commerce stub</Eyebrow>
        <h1 className="font-display text-3xl text-charcoal">Cart</h1>
        <p className="mt-4 text-sm text-graphite">
          Wire this route to Shopify cart APIs or a headless provider. Today it is a compliant
          placeholder with no checkout persistence.
        </p>
        <div className="mt-10 rounded-md border border-dashed border-line bg-ivory p-8 text-center text-mineral">
          Your cart is empty in this preview build.
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/products/daily-gut-system">Start with flagship</ButtonLink>
          <Link href="/" className="text-sm font-semibold text-sage-deep underline-offset-2 hover:underline">
            Continue browsing
          </Link>
        </div>
      </Container>
    </div>
  );
}
