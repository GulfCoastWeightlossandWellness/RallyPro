import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Science — Formulation Philosophy",
  description:
    "How Rally Pro approaches gut-health formulation: what we test, what we publish, what we will never claim — and why a structured daily system outperforms single-ingredient supplements.",
  openGraph: {
    title: "Science & Formulation | Rally Pro",
    description:
      "Formulation philosophy, ingredient rationale, and testing standards — plainly explained.",
  },
};

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-12 border-l-2 border-sage-deep pl-6 text-xl font-light leading-relaxed text-charcoal">
      {children}
    </blockquote>
  );
}

function CitationPlaceholder({ id, text }: { id: string; text: string }) {
  return (
    <p className="mt-2 text-xs text-mineral" id={id}>
      [{id}] {text} <span className="font-mono">[citation pending final formula]</span>
    </p>
  );
}

export default function SciencePage() {
  return (
    <div className="border-b border-line py-16 md:py-24">
      <Container className="max-w-[720px]">
        <Eyebrow>Science</Eyebrow>
        <h1 className="font-display text-4xl font-normal text-charcoal md:text-5xl">
          The formulation philosophy
        </h1>
        <p className="mt-6 text-base leading-relaxed text-graphite">
          Rally Pro exists because premium shoppers deserve a{" "}
          <em className="not-italic font-medium">system</em>, not a single-ingredient headline. The
          Armenian Rally Sunroot process pioneered patented sunroot inulin extraction; this U.S.
          narrative layers accountable probiotics and digestive-support nutrients only as the final
          formula and counsel approve.
        </p>

        {/* Reviewed-by placeholder — YMYL §18.6 */}
        <div className="mt-8 rounded-md border border-line bg-ivory px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
            Reviewed by
          </p>
          <p className="mt-2 text-sm text-graphite">
            [Placeholder — formulation review credit will list the licensed practitioner name,
            credential (MD / RD / PharmD), and relevant specialty once the U.S. formula is
            finalized. No endorsement is claimed until that review is complete and documented.]
          </p>
        </div>

        <PullQuote>
          &ldquo;A prebiotic without a probiotic is substrate without culture. A probiotic without a
          prebiotic is culture without food. The structure matters more than either ingredient
          alone.&rdquo;
        </PullQuote>

        {/* Three-role rationale */}
        <h2 className="mt-8 font-display text-2xl text-charcoal">Three roles, one daily routine</h2>
        <div className="mt-6 space-y-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
              Prebiotic — the substrate
            </p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Partially fermentable dietary fibers — such as inulin derived from sunroot (Helianthus
              tuberosus), partially hydrolyzed guar gum (PHGG), or acacia fiber — selectively
              stimulate the growth and activity of beneficial gut bacteria. The dose used matters;
              sub-clinical doses provide no meaningful benefit, and the final label will disclose the
              specific dose per serving.
              <sup aria-describedby="cite-1">1</sup>
            </p>
            <CitationPlaceholder
              id="cite-1"
              text="[Author TBD]. Prebiotic fiber dose-response in the human gut microbiome."
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
              Probiotic — the culture
            </p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              Live microbial cultures exert benefits only at the strain level — not the genus. Every
              strain in the Rally Pro blend will be identified to strain designation (e.g.,{" "}
              <em>Lactobacillus plantarum</em> DSM XXXXX) and CFU counts guaranteed at expiration,
              not at manufacture, using a delayed-release delivery system to survive gastric pH.
              <sup aria-describedby="cite-2">2</sup>
            </p>
            <CitationPlaceholder
              id="cite-2"
              text="[Author TBD]. Strain-specificity of probiotic effects: a systematic review."
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
              Digestive support — the third role
            </p>
            <p className="mt-3 text-sm leading-relaxed text-graphite">
              The third component — botanical polyphenol blend or postbiotic — is{" "}
              <em>pending final U.S. formula sign-off</em>. Polyphenols (pomegranate extract, grape
              seed extract) support a favorable intestinal environment and are well-tolerated at
              studied doses. Final ingredient identity and dose will be published when the formula and
              label are complete.
              <sup aria-describedby="cite-3">3</sup>
            </p>
            <CitationPlaceholder
              id="cite-3"
              text="[Author TBD]. Dietary polyphenols and the gut microbiome."
            />
          </div>
        </div>

        {/* What we publish vs. omit */}
        <h2 className="mt-14 font-display text-2xl text-charcoal">
          What we publish vs. what we omit
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-graphite">
          We publish strain-level identities, doses, and testing status that match the physical label.
          Until each number is COA-backed, you will see explicit placeholder markers in the code and
          on product pages — not polished fiction. When the formula ships, those markers become real
          data.
        </p>

        {/* What we will never claim */}
        <h2 className="mt-12 font-display text-2xl text-charcoal">What we will never claim</h2>
        <ul className="mt-4 list-none space-y-2 text-sm text-graphite">
          {[
            "Disease treatment, mitigation, cure, or prevention",
            '"Detox" or cleanse outcomes for U.S. shoppers',
            "Unverified clinical proof (ingredient studies ≠ product-specific clinical trial)",
            '"Doctor-recommended" framing without a named, licensed, credentialed physician',
            "Fake, fabricated, or incentivized reviews",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-mineral" aria-hidden>
                —
              </span>
              {item}
            </li>
          ))}
        </ul>

        <PullQuote>
          &ldquo;The product should be boring in the best possible way: consistent, tested, and
          honest about what it does — and what it doesn&apos;t.&rdquo;
        </PullQuote>

        {/* CTA */}
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/ingredients">
            Every ingredient disclosed <span aria-hidden>→</span>
          </ButtonLink>
          <ButtonLink href="/faq" variant="secondary">
            FAQ <span aria-hidden>→</span>
          </ButtonLink>
        </div>

        <FdaDisclaimer className="mt-12" />

        <p className="mt-6 text-sm">
          <Link
            href="/"
            className="font-semibold text-sage-deep underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            ← Back home
          </Link>
        </p>
      </Container>
    </div>
  );
}
