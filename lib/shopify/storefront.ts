/**
 * Shopify Storefront API — real GraphQL fetch with static fallback.
 *
 * Required env vars (see README.md § Commerce):
 *   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN   e.g. my-store.myshopify.com
 *   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 *   NEXT_PUBLIC_SHOPIFY_API_VERSION    default: 2024-10
 *
 * When env vars are absent the functions return null and callers fall back
 * to lib/content/products.ts (static catalog).
 */

export const SHOPIFY_PLACEHOLDER_NOTE =
  "Shopify Storefront integration is wired — set env vars to activate. See README.md § Commerce.";

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
  );
}

// ─── Types ──────────────────────────────────────────────────────────────────

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyVariant = {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyProduct = {
  handle: string;
  id: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
};

// ─── GraphQL query ───────────────────────────────────────────────────────────

const PRODUCT_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 6) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

// ─── Client ──────────────────────────────────────────────────────────────────

async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T | null> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  const version =
    process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION ?? "2024-10";

  try {
    const res = await fetch(
      `https://${domain}/api/${version}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token!,
        },
        body: JSON.stringify({ query, variables }),
        // Cache product data for 5 minutes (revalidate on next request)
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;
    const json: { data?: T; errors?: unknown[] } = await res.json();
    if (json.errors?.length) return null;
    return json.data ?? null;
  } catch {
    return null;
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

type ProductResponse = {
  productByHandle: ShopifyProduct & {
    images: { edges: { node: ShopifyImage }[] };
    variants: { edges: { node: ShopifyVariant }[] };
  };
};

/** Returns a Shopify product or null (env not configured / product not found / error). */
export async function getShopifyProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  if (!isShopifyConfigured()) return null;

  const data = await storefrontFetch<ProductResponse>(PRODUCT_QUERY, {
    handle,
  });
  if (!data?.productByHandle) return null;

  const raw = data.productByHandle;
  return {
    handle: raw.handle,
    id: raw.id,
    title: raw.title,
    description: raw.description,
    priceRange: raw.priceRange,
    images: raw.images.edges.map((e) => e.node),
    variants: raw.variants.edges.map((e) => e.node),
  };
}

/** Stub kept for non-async call sites during the static preview phase. */
export function getShopifyProductByHandleSync(
  handle: string,
): ShopifyProduct | null {
  void handle;
  return null;
}
