import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/content/products";
import { LegalReviewFlag } from "@/components/commerce/LegalReviewFlag";
import { DeliveryExplodedCapsule } from "@/components/sections/DeliveryExplodedCapsule";
import { HomeHero } from "@/components/sections/HomeHero";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { ProductPillRail } from "@/components/sections/ProductPillRail";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Container";

function Arrow() {
  return <span aria-hidden>→</span>;
}

export function HomePage() {
  const products = getAllProducts();

  return (
    <>
      <HomeHero />
      <ProductPillRail />
      <MarqueeStrip />

      <section className="border-b border-line bg-paper/50 py-3">
        <Reveal y={12} duration={0.35}>
          <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-8 gap-y-2 px-5 text-[10px] font-bold uppercase tracking-[0.12em] text-mineral md:px-8">
            {[
              "Prebiotic substrate",
              "Multi-strain probiotic intent",
              "Digestive-support layer",
              "COA program (Phase 2)",
              "Subscription-first checkout",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-b border-line bg-sage-deep py-20 text-ivory">
        <Container>
          <Reveal>
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow className="text-ivory/40">Catalog</Eyebrow>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight">
                  Whole-body routines
                  <br />
                  <em className="not-italic opacity-95">start with structure.</em>
                </h2>
              </div>
              <Link
                href="/products/daily-gut-system"
                className="text-sm font-semibold text-ivory/60 underline-offset-4 transition hover:text-ivory"
              >
                Shop flagship <Arrow />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 0.08, 0.4)}>
                <article className="flex h-full flex-col rounded-md border border-white/15 bg-white/[0.05] p-5 transition-colors duration-200 hover:border-sage-deep/80">
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-md bg-dark-bg">
                    <Image
                      src={p.heroImage}
                      alt={`${p.name} — provisional product photo`}
                      fill
                      sizes="(max-width:768px)100vw,33vw"
                      className="object-cover"
                    />
                  </div>
                  {p.badge ? (
                    <span className="mb-2 inline-block w-fit rounded-pill bg-ivory/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ivory/80">
                      {p.badge}
                    </span>
                  ) : null}
                  <h3 className="font-display text-xl font-normal">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/55">{p.description}</p>
                  {p.legalReview ? (
                    <div className="mt-3">
                      <LegalReviewFlag id={p.slug} />
                    </div>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="font-mono text-sm">from ${p.priceMonthly}/mo</span>
                    <Link href={`/products/${p.slug}`} className="text-sm font-semibold text-clay hover:underline">
                      Details
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <MarqueeStrip dark />

      <section className="border-b border-line py-20">
        <Container>
          <Reveal>
            <Eyebrow>Why a system</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-normal leading-tight text-charcoal">
              Most routines stop at one layer.
              <br />
              <em className="not-italic">Yours shouldn&apos;t.</em>
            </h2>
            <p className="mt-6 max-w-2xl text-graphite leading-relaxed">
              Fiber alone, cultures alone, or aggressive “reset” marketing each ignores parts of the daily
              architecture. Rally Pro is intentionally boring: prebiotic substrate, accountable strains, and a third
              support role — explained plainly, tested honestly.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                k: "Prebiotic",
                t: "Feeds the ecosystem you already live with — slowly, daily, without drama.",
              },
              {
                k: "Probiotic",
                t: "Live cultures documented at strain level when the label ships (no mystery blend).",
              },
              {
                k: "Digestive support",
                t: "Botanical or postbiotic layer — whichever your finalized U.S. formula locks.",
              },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.1}>
                <div className="rounded-md border border-line bg-ivory p-6 transition-colors duration-200 hover:border-sage-deep">
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-mineral">{c.k}</div>
                  <p className="mt-3 text-sm leading-relaxed text-graphite">{c.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <DeliveryExplodedCapsule />

      <section className="border-b border-line py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <Eyebrow>Routine finder</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal text-charcoal">
                Not sure where to start?
              </h2>
              <p className="mt-4 max-w-md text-graphite leading-relaxed">
                Full quiz flows come later a la category leaders. For now, we route curious visitors to education —
                calmer than a hard sell, closer to how clinicians explain trade-offs.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/faq">
                  Read the FAQ <Arrow />
                </ButtonLink>
                <ButtonLink href="/about" variant="secondary">
                  Why we exist <Arrow />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-md border border-line bg-ivory p-8">
              <h3 className="font-display text-lg text-charcoal">Microbiome isn’t noise</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">
                Trillions of cells collaborate on digestion, barrier support, and nutrient conversation with your food.
                Supplements should respect that complexity — daily, modest, testable.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Trust / Transparency — COA + testing */}
      <section className="border-b border-line bg-paper py-20">
        <Container>
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>Tested, not trusted on faith</Eyebrow>
                <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal text-charcoal">
                  Every lot. Every ingredient.
                </h2>
              </div>
              <Link
                href="/coa"
                className="shrink-0 text-sm font-semibold text-sage-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                Look up your lot&apos;s COA <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                label: "Third-party assays",
                body: "ISO-17025 accredited lab testing wired when operations go live. Placeholder structure only.",
              },
              {
                label: "Heavy metal screening",
                body: "Cadmium, lead, mercury, and arsenic panels per Prop 65 reference. Results tied to lot number.",
              },
              {
                label: "Microbial specification",
                body: "CFU counts guaranteed at expiration, not at manufacture — from a lab, not a label claim.",
              },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div className="h-full rounded-md border border-line bg-ivory p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-mineral">
                    QA pillar
                  </div>
                  <p className="mt-3 text-sm font-semibold text-charcoal">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What we test / what we don't claim */}
          <Reveal delay={0.12}>
            <div className="mt-10 rounded-md border border-line bg-ivory p-6 md:p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
                    What we test
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-graphite">
                    {[
                      "Identity of each active ingredient",
                      "Potency against the labeled dose",
                      "Heavy metals (Prop 65 reference levels)",
                      "Microbial contamination (yeast, mold, aerobic plate count)",
                      "CFU count at expiration date",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-0.5 shrink-0 text-sage-deep" aria-hidden>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
                    What we don&apos;t claim
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-graphite">
                    {[
                      "Disease treatment, mitigation, or cure",
                      "\"Detox\" or cleanse outcomes",
                      "Clinically proven efficacy (without a product-specific trial)",
                      "Physician endorsement without named, licensed practitioner",
                      "Review scores before verified reviews exist",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-0.5 shrink-0 text-mineral" aria-hidden>
                          —
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Subscription pitch — spec §10.1.F */}
      <section className="border-b border-line py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <Eyebrow>Built for daily use</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal text-charcoal">
                Designed as a subscription.
                <br />
                <em className="not-italic">Easy to leave.</em>
              </h2>
              <ul className="mt-8 space-y-4 text-sm text-graphite">
                {[
                  "Pause or cancel anytime, in one tap — no phone call required.",
                  "Skip a delivery without losing your subscriber pricing.",
                  "Free shipping on every refill order.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-sage-deep" aria-hidden>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/products/daily-gut-system">
                  Start Your First Month <Arrow />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-md border border-line bg-paper p-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-mineral">
                Transparent pricing
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-md bg-ivory px-4 py-3">
                  <span className="text-sm font-medium text-charcoal">Subscribe monthly</span>
                  <span className="font-mono text-sm font-semibold text-sage-deep">$54/mo</span>
                </div>
                <div className="flex items-center justify-between rounded-md px-4 py-3">
                  <span className="text-sm text-graphite">One-time purchase</span>
                  <span className="font-mono text-sm text-graphite">$69</span>
                </div>
              </div>
              <p className="mt-4 text-[11px] leading-snug text-mineral">
                Prices are static preview. Production checkout routes through Shopify with subscription controls verified before launch.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA — spec §10.1.I */}
      <section className="bg-sage-deep py-24 text-center text-ivory">
        <Container className="max-w-xl">
          <Reveal>
            <Eyebrow className="text-ivory/40">Start today</Eyebrow>
            <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-normal leading-tight">
              Build the daily system your label can defend.
            </h2>
            <p className="mt-4 text-sm text-ivory/60">
              Structure/function claims only. FDA disclaimer on every claim-bearing page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/products/daily-gut-system" variant="clay">
                Start Your First Month <Arrow />
              </ButtonLink>
              <ButtonLink
                href="/ingredients"
                variant="secondary"
                className="!border-ivory/35 !text-ivory hover:!bg-ivory hover:!text-charcoal"
              >
                Ingredients <Arrow />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
