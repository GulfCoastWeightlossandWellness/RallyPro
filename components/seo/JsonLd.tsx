type JsonLdData = Record<string, unknown>;

export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationJsonLd: JsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rally Pro",
  url: "https://rallypro.com",
  description:
    "A daily gut-health system pairing prebiotic sunroot fiber, multi-strain probiotics, and digestive support — third-party tested, subscription-first.",
  sameAs: [],
};

export function productJsonLd({
  name,
  description,
  priceMonthly,
  slug,
}: {
  name: string;
  description: string;
  priceMonthly: number;
  slug: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: "Rally Pro" },
    url: `https://rallypro.com/products/${slug}`,
    offers: {
      "@type": "Offer",
      price: priceMonthly.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2027-01-01",
    },
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; url: string }[],
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
