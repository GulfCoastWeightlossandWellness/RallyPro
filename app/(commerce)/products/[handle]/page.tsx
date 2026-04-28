import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalReviewFlag } from "@/components/commerce/LegalReviewFlag";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { JsonLd, breadcrumbJsonLd, productJsonLd } from "@/components/seo/JsonLd";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { getAllProducts, getProductBySlug } from "@/lib/content/products";
import {
  SHOPIFY_PLACEHOLDER_NOTE,
  getShopifyProductByHandle,
  isShopifyConfigured,
} from "@/lib/shopify/storefront";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ handle: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductBySlug(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} | Rally Pro`,
      description: product.tagline,
      images: [{ url: product.heroImage }],
    },
  };
}

const EXCLUSIONS = [
  "No artificial colors or sweeteners",
  "No magnesium stearate",
  "No titanium dioxide",
  "No proprietary blends — every dose disclosed",
  "No ingredients added below efficacious doses",
  "No gluten, soy, or dairy ingredients",
];

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductBySlug(handle);
  if (!product) notFound();

  // Attempt live Shopify fetch; fall back to static pricing silently
  const shopify = await getShopifyProductByHandle(handle);
  const livePrice = shopify
    ? parseFloat(shopify.priceRange.minVariantPrice.amount)
    : null;

  const displayMonthly = livePrice ?? product.priceMonthly;
  const displayOneTime = product.priceOneTime;

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: product.name,
          description: product.description,
          priceMonthly: displayMonthly,
          slug: product.slug,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: "https://rallypro.com" },
          { name: "Products", url: "https://rallypro.com/products/daily-gut-system" },
          { name: product.name, url: `https://rallypro.com/products/${product.slug}` },
        ])}
      />

      <div className="border-b border-line py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Gallery — left, sticky */}
            <div className="lg:sticky lg:top-24">
              <ProductGallery
                name={product.name}
                heroSrc={product.heroImage}
                detailSrc={product.detailImage}
              />
            </div>

            {/* Buy column — right */}
            <div>
              <Eyebrow>Rally Pro catalog</Eyebrow>
              <h1 className="font-display text-4xl font-normal leading-tight text-charcoal md:text-[2.75rem]">
                {product.name}
              </h1>
              <p className="mt-3 text-sm text-graphite">{product.tagline}</p>

              {product.legalReview && (
                <div className="mt-6">
                  <LegalReviewFlag id={product.slug} />
                </div>
              )}

              <p className="mt-6 text-sm leading-relaxed text-graphite">
                {product.description}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-graphite">
                {product.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-sage-deep" aria-hidden>
                      •
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Subscription / one-time selector + buy */}
              <AddToCartButton
                slug={product.slug}
                name={product.name}
                priceMonthly={displayMonthly}
                priceOneTime={displayOneTime}
              />

              {/* Trust row */}
              <div className="mt-6 space-y-2">
                {[
                  "Free shipping on every subscription order",
                  "Pause or cancel anytime — no phone call required",
                  "Third-party tested (COA program — Phase 2 wiring)",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-xs text-graphite">
                    <span className="mt-0.5 shrink-0 text-sage-deep" aria-hidden>
                      ✓
                    </span>
                    {t}
                  </div>
                ))}
              </div>

              {/* Shopify config status — dev/staging only */}
              <details className="mt-6 rounded-md border border-dashed border-mineral/40 bg-ivory p-4 text-xs text-graphite">
                <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-widest text-mineral">
                  Shopify config
                </summary>
                <p className="mt-2">{SHOPIFY_PLACEHOLDER_NOTE}</p>
                <p className="mt-1">
                  Status:{" "}
                  {isShopifyConfigured()
                    ? "env vars present — live fetch active"
                    : "env vars absent — using static catalog"}
                </p>
              </details>

              {/* Story paragraphs */}
              <div className="mt-8 space-y-3 text-sm leading-relaxed text-graphite">
                {product.story.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <FdaDisclaimer className="mt-10" />
            </div>
          </div>
        </Container>
      </div>

      {/* What's not in it — spec §10.2.C */}
      <section className="border-b border-line py-16">
        <Container className="max-w-[820px]">
          <Eyebrow>Formulation discipline</Eyebrow>
          <h2 className="font-display text-2xl font-normal text-charcoal">
            What&apos;s not in this bottle.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {EXCLUSIONS.map((ex) => (
              <div
                key={ex}
                className="flex items-start gap-2 rounded-md border border-line bg-ivory px-4 py-3 text-sm text-graphite"
              >
                <span className="mt-0.5 shrink-0 text-mineral" aria-hidden>
                  —
                </span>
                {ex}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testing & quality — spec §10.2.D */}
      <section className="border-b border-line bg-paper py-16">
        <Container className="max-w-[820px]">
          <Eyebrow>Testing & quality</Eyebrow>
          <h2 className="font-display text-2xl font-normal text-charcoal">
            Every lot. Every ingredient.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-graphite">
            ISO-17025 third-party lab verification, heavy metal panels (Prop 65 reference levels),
            and microbial specification checks — results tied to the lot number on your bottle.
            COA lookup wired in Phase 2.
          </p>
          <div className="mt-2">
            <a
              href="/coa"
              className="text-sm font-semibold text-sage-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
            >
              Look up your COA →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
