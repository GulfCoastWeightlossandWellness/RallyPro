import { Container, Eyebrow } from "@/components/ui/Container";

export default function CheckoutPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-xl">
        <Eyebrow>Commerce stub</Eyebrow>
        <h1 className="font-display text-3xl text-charcoal">Checkout hosts on Shopify</h1>
        <p className="mt-4 text-sm text-graphite">
          Production checkout should redirect to Shopify&apos;s hosted checkout (or Hydrogen custom
          flow). This route documents intent only.
        </p>
      </Container>
    </div>
  );
}
