/**
 * Official Rally Sunroot commerce URLs (Armenia).
 *
 * The public shop at rallysunroot.am uses **Ucraft + Ecwid** (embed script
 * `https://app.shopsettings.com/script.js?95375072`) — not Shopify.
 * Cart is opened via Ecwid hash routing on the same storefront path.
 *
 * Override with env when the store migrates platforms:
 *   NEXT_PUBLIC_EXTERNAL_STORE_URL         — shop home
 *   NEXT_PUBLIC_EXTERNAL_STORE_CHECKOUT_URL  — cart / checkout entry
 */

export const RALLY_SUNROOT_ECWID_STORE_ID = "95375072";

export const RALLY_SUNROOT_SHOP_HOME =
  "https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260";

/** Ecwid cart route (hash) on the shop page. */
export const RALLY_SUNROOT_CHECKOUT_URL =
  `${RALLY_SUNROOT_SHOP_HOME}#!/~/cart`;

export function getExternalStoreShopUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_EXTERNAL_STORE_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : RALLY_SUNROOT_SHOP_HOME;
}

export function getExternalStoreCheckoutUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_EXTERNAL_STORE_CHECKOUT_URL?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : RALLY_SUNROOT_CHECKOUT_URL;
}
