import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[680px]">
        <Eyebrow>Support</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal">Contact</h1>
        <p className="mt-6 text-sm text-graphite">
          Replace with routing to Gorgias or help desk email. For now this is a structural placeholder.
        </p>
        <form className="mt-10 space-y-4" action="#" method="post">
          <div>
            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-mineral">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="mt-2 w-full rounded-md border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-deep focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-mineral">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-md border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-deep focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-mineral">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-2 w-full rounded-md border border-line bg-ivory px-3 py-2 text-sm focus:border-sage-deep focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-pill bg-charcoal px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-graphite"
          >
            Send (wire server action later)
          </button>
        </form>
      </Container>
    </div>
  );
}
