# Rally Pro — Marketing Site

Next.js 16 App Router · React 19 · Tailwind v4 · TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Commerce

### Shopify Storefront API

The site uses a two-layer data strategy:

| Condition | Data source |
|---|---|
| Env vars present | Live Shopify Storefront GraphQL (5-min `revalidate`) |
| Env vars absent | Static catalog at `lib/content/products.ts` |

Set the following in `.env.local` (never commit this file):

```bash
# Required — your Shopify store domain (no https://)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Required — public Storefront access token (read-only, safe to expose to browser)
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token

# Optional — defaults to 2024-10
NEXT_PUBLIC_SHOPIFY_API_VERSION=2024-10
```

**How to get a Storefront token:**  
Shopify Admin → Apps → Develop apps → Create app → Storefront API → Generate token.  
Scope needed: `unauthenticated_read_product_listings`.

**Revalidation:** Product data is cached for 300 seconds (5 minutes). Change `next: { revalidate: 300 }` in `lib/shopify/storefront.ts` to adjust.

**Cart:** In-memory React context (`lib/cart.tsx`) for this site only — lines are **not** synced to the Armenian store.

**Checkout:** “Proceed to checkout” and `/checkout` open a **Radix Dialog** that links to the official **Rally Sunroot** storefront (Ucraft + **Ecwid**, store id `95375072` — not Shopify). Default cart URL:

`https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260#!/~/cart`

Override if the store URL changes:

```bash
# Optional — full shop home
NEXT_PUBLIC_EXTERNAL_STORE_URL=https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260

# Optional — cart / checkout entry (hash route or future platform)
NEXT_PUBLIC_EXTERNAL_STORE_CHECKOUT_URL=https://www.rallysunroot.am/ecommerce/rally-sunroot-c159891260#!/~/cart
```

The live Armenian site loads Ecwid via `https://app.shopsettings.com/script.js?95375072`. A future U.S. **Shopify** checkout can reuse the same dialog pattern by pointing these env vars at your `myshopify.com` cart or checkout URL.

---

## Bundle Analysis (Phase 8)

```bash
npm run analyze
```

This runs `next build` with `ANALYZE=true`, which opens bundle reports in your browser via `@next/bundle-analyzer`. Use it to audit client-side chunk sizes before shipping paid traffic.

---

## Accessibility (Phase 9)

ESLint is configured with `eslint-plugin-jsx-a11y` (recommended ruleset). Run:

```bash
npm run lint
```

For runtime auditing during development, install the [axe DevTools](https://www.deque.com/axe/devtools/) browser extension — it checks rendered pages against WCAG 2.2 AA without any build changes.

---

## View Transitions (Phase 10) — Skipped

Next.js 16 includes `experimental.viewTransition` support, but the API is **unstable** in this version and the React 19 `<ViewTransition>` component is still experimental. Adding it now risks rendering bugs on navigation.

**Decision:** Skipped. Re-evaluate when Next.js View Transitions reach stable API status. When ready, enable via:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  experimental: { viewTransition: true },
};
```

Then add a global CSS override for reduced-motion users:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

---

## How to test key features

### Cart drawer
1. Visit any PDP (e.g. `/products/daily-gut-system`)
2. Select "Subscribe & save" or "One-time", click "Add to cart"
3. Drawer slides in from right — Escape or the × closes it, focus returns to trigger
4. Click "Cart" in the header to reopen

### Shopify fallback
Without env vars set, pages render using `lib/content/products.ts` static data. The Shopify config block on the PDP reports the active status.

### SystemStrip (sticky)
Scroll ~50% of the viewport height on the homepage — the strip slides up from the bottom. Dismiss via × button. Respects `prefers-reduced-motion` (instant show/hide via `globals.css` transition override).

### Shop dropdown keyboard nav
Focus "Shop" in the header → press Enter or ↓ to open → Arrow keys to navigate → Escape closes and returns focus to the trigger.

### Bundle analyzer
```bash
npm run analyze
# Opens client + server bundle reports in browser
```
