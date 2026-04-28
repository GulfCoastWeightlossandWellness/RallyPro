import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="border-b border-line py-24">
      <Container className="max-w-lg text-center">
        <h1 className="font-display text-4xl text-charcoal">Page not found</h1>
        <p className="mt-4 text-graphite">This URL doesn&apos;t exist — the formula still does.</p>
        <div className="mt-8 flex justify-center gap-4">
          <ButtonLink href="/">Back home</ButtonLink>
          <Link href="/faq" className="self-center text-sm font-semibold text-sage-deep hover:underline">
            FAQ
          </Link>
        </div>
      </Container>
    </div>
  );
}
