import type { Product } from "./types";

/** Static catalog. TODO: merge with Shopify Storefront when env is configured — see lib/shopify/storefront.ts */
const products: Product[] = [
  {
    slug: "daily-gut-system",
    name: "Daily Gut System",
    tagline: "Prebiotic fiber, multi-strain probiotics, digestive support — one structured routine.",
    description:
      "Our U.S. flagship positioning: a three-part daily system for adults who read the Supplement Facts panel. Inspired by the complete Trio formulation manufactured in Armenia.",
    story: [
      "We built this site around a simple idea: gut support works best as a daily system — prebiotic substrate, live cultures, and complementary digestive-support nutrients — not as a single-ingredient shortcut.",
      "Placeholders on this page describe how we will merchandise the product in the United States. Final claims, doses, and strain nomenclature require FDA/FTC review and finished-label proof.",
    ],
    bullets: [
      "Prebiotic sunroot (Jerusalem artichoke) fiber narrative aligned to Armenian patented process",
      "Multi-strain probiotic intent paired with delayed-release capsule story (verify all numbers)",
      "Third-party testing and COA-by-lot story reserved for Phase 2 wiring",
    ],
    priceMonthly: 54,
    priceOneTime: 69,
    badge: "Bestseller",
    category: "flagship",
    heroImage: "/images/products/am/trio-120.png",
    detailImage: "/images/products/am/trio-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-trio-p811343052",
  },
  {
    slug: "rally-sunroot-inulin",
    name: "Rally Sunroot Inulin",
    tagline: "Soluble prebiotic fiber from sunroot grown without chemical fertilizer — Armenian patented extraction.",
    description:
      "English adaptation of Armenian educational copy: Jerusalem artichoke (Helianthus tuberosus) inulin, produced under controlled conditions without chemical fertilizer, using the patented extraction process referenced on Rally Sunroot.",
    story: [
      "Published Armenian materials describe tuber-derived inulin that forms a gel-like matrix with water and reaches the colon as a fermentable substrate for beneficial bacteria — we describe that here using structure/function language only.",
      "We do not translate disease-treatment lists from the Armenian page into U.S. marketing. Consumers with conditions should speak with a licensed clinician.",
    ],
    bullets: [
      "Supports a favorable environment for beneficial gut bacteria†",
      "Pairs logically with multi-strain probiotics as part of a daily system",
      "Manufactured in Armenia; U.S. import and label claims TBD with counsel",
    ],
    priceMonthly: 34,
    priceOneTime: 42,
    badge: "Prebiotic",
    category: "fiber",
    heroImage: "/images/products/am/inulin-120.png",
    detailImage: "/images/products/am/inulin-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-inulin-p811306476",
  },
  {
    slug: "rally-sunroot-detox",
    name: "Rally Sunroot Detox",
    tagline: "Armenian-market blend pairing sunroot inulin with clinoptilolite zeolite — naming is legacy.",
    description:
      "The Armenian site positions this as natural detox support combining inulin and zeolite. For the U.S. storefront we surface the SKU with neutral descriptive language — not cleanse or flush promises.",
    story: [
      "Source narrative (translated summary): prebiotic inulin from sunroot plus clinoptilolite zeolite intended as a combined daily supplement in the home market.",
      "U.S. marketing must avoid disease claims and “detox” as an outcome promise; final structure/function language requires supplement counsel.",
    ],
    bullets: [
      "Dual-ingredient story: prebiotic fiber + mineral-based component (zeolite)",
      "English copy here is informational, not finalized for commerce",
      "Expand the Legal Review note before paid traffic or checkout",
    ],
    priceMonthly: 42,
    priceOneTime: 52,
    badge: "Blend",
    category: "blend",
    legalReview: true,
    heroImage: "/images/products/am/detox-120.png",
    detailImage: "/images/products/am/detox-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-detox-p811310725",
  },
  {
    slug: "rally-sunroot-zeolite",
    name: "Rally Sunroot Zeolite",
    tagline: "Clinoptilolite zeolite as listed on the shop.",
    description:
      "The Armenian page describes clinoptilolite as a natural mineral with sorption-related properties and broad health narratives. This English stub keeps claims minimal and flags legal review.",
    story: [
      "Photography is from the official Armenian Rally Sunroot Ecwid storefront (CloudFront), not certificate scans.",
      "Zeolite supplements face heightened regulatory scrutiny in the U.S.; all copy and serving strategy need legal sign-off.",
    ],
    bullets: [
      "Single-ingredient mineral supplement positioning (pending U.S. label)",
      "No outcome promises on this preview site",
      "120-count and 60-count bottle shots from listings p811313172 and p772074975",
    ],
    priceMonthly: 38,
    priceOneTime: 48,
    badge: "Mineral",
    category: "mineral",
    legalReview: true,
    heroImage: "/images/products/am/zeolite-120.png",
    detailImage: "/images/products/am/zeolite-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-zeolite-p811313172",
  },
  {
    slug: "rally-sunroot-pro",
    name: "Rally Sunroot Pro",
    tagline: "Armenian ‘Pro’ formulation page — use as secondary system SKU until U.S. naming locks.",
    description:
      "Summarizes the Pro line from Rally Sunroot shop photography; English benefits to be finalized with your regulatory attorney.",
    story: [
      "Intended for shoppers comparing finished powders or capsules alongside Trio.",
      "Connect PDP metafields to Shopify when SKUs are live.",
    ],
    bullets: ["Pro product photography from Armenian DTC", "Pricing is illustrative only"],
    priceMonthly: 48,
    priceOneTime: 58,
    category: "system",
    heroImage: "/images/products/am/pro-120.png",
    detailImage: "/images/products/am/pro-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-pro-p811313235",
  },
  {
    slug: "rally-sunroot-trio",
    name: "Rally Sunroot Trio",
    tagline: "Probiotic + prebiotic + enterosorbent system described on the Armenian site.",
    description:
      "Trio is the closest analog to the full three-role story. Strain list and CFU claims on the Armenian page must be verified against finished U.S. CoA before repeating numerically on this site.",
    story: [
      "Educational copy on the Armenian site details adsorbed probiotics, sunroot-derived prebiotic, and zeolite — translated here only at a high level.",
      "Any specific CFU counts (e.g., orders of magnitude cited in Armenian) are omitted until verified for the U.S. label.",
    ],
    bullets: [
      "Three-role architecture: aligns with brand pillars in Rally Pro.md",
      "Use as reference creative for Daily Gut System storytelling",
      "Do not ship hard CFU numbers until validated",
    ],
    priceMonthly: 52,
    priceOneTime: 64,
    badge: "System",
    category: "system",
    heroImage: "/images/products/am/trio-120.png",
    detailImage: "/images/products/am/trio-60.png",
    sourceUrl:
      "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260/rally-sunroot-trio-p811343052",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
