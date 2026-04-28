import type { Metadata } from "next";
import Link from "next/link";
import { getFaqsByGroup } from "@/lib/content/faqs";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ",
};

const groupTitles: Record<string, string> = {
  product: "The product",
  taking: "Taking it",
  safety: "Safety",
  ingredients: "Ingredients & labeling",
  manufacturing: "Manufacturing",
  subscription: "Subscription",
};

export default function FaqPage() {
  const grouped = getFaqsByGroup();

  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[720px]">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal md:text-5xl">
          Plain answers
        </h1>
        <p className="mt-4 text-graphite">
          Structured like the Rally Pro.md FAQ groups. Expand a question to read the draft response.
        </p>
        <div className="mt-12 space-y-10">
          {Object.entries(grouped).map(([key, items]) => (
            <section key={key} aria-labelledby={`faq-${key}`}>
              <h2 id={`faq-${key}`} className="border-b border-line pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-mineral">
                {groupTitles[key] ?? key}
              </h2>
              <div className="divide-y divide-line">
                {items.map((item) => (
                  <details key={item.question} className="group py-4">
                    <summary className="cursor-pointer list-none text-sm font-semibold text-charcoal marker:content-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-start justify-between gap-4">
                        {item.question}
                        <span className="text-mineral transition group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
        <FdaDisclaimer className="mt-12" />
        <p className="mt-8 text-sm">
          <Link href="/science" className="font-semibold text-sage-deep underline-offset-2 hover:underline">
            Read the science →
          </Link>
        </p>
      </Container>
    </div>
  );
}
