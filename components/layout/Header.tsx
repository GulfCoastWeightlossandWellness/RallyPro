"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { BrandMark } from "@/components/layout/BrandMark";
import { useCart } from "@/lib/cart";
import { getAllProducts } from "@/lib/content/products";

const NAV_LINKS = [
  { href: "/science", label: "Science" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="transition-transform duration-200"
    >
      {open ? (
        <>
          <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Desktop Shop menu item — shared styles for Radix DropdownMenu.Item + Next Link */
const shopItemLinkClass =
  "block cursor-pointer rounded-sm px-3 py-2.5 text-sm text-charcoal outline-none select-none data-[highlighted]:bg-paper";

const shopItemSublines = "text-[11px] text-mineral";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDrawer, count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const dropdown = getAllProducts().slice(0, 6);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bone/95 backdrop-blur-md" : "border-transparent bg-bone"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-8"
        aria-label="Primary navigation"
      >
        <BrandMark variant="header" />

        {/* Desktop nav — Shop uses Radix DropdownMenu (click-to-toggle, no hover-chase) */}
        <div className="hidden items-center gap-9 md:flex">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              type="button"
              id="shop-menu-trigger"
              className="group flex items-center gap-1 rounded-sm text-sm font-medium text-charcoal transition-colors hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-1 data-[state=open]:text-sage-deep"
            >
              Shop
              <span
                aria-hidden
                className="text-[10px] transition-transform duration-150 group-data-[state=open]:rotate-180"
              >
                ▾
              </span>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                id="shop-dropdown"
                sideOffset={8}
                align="start"
                collisionPadding={16}
                className="z-[200] w-72 rounded-md border border-line bg-ivory py-2 shadow-[var(--shadow-float)] outline-none"
                aria-labelledby="shop-menu-trigger"
              >
                {dropdown.map((p) => (
                  <DropdownMenu.Item key={p.slug} asChild>
                    <Link href={`/products/${p.slug}`} className={shopItemLinkClass}>
                      <div className="font-semibold text-charcoal">{p.name}</div>
                      <div className={shopItemSublines}>{p.tagline}</div>
                    </Link>
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Separator className="my-1 h-px bg-line" />
                <DropdownMenu.Item asChild>
                  <Link
                    href="/products/daily-gut-system"
                    className={`${shopItemLinkClass} py-2 text-xs font-semibold text-sage-deep data-[highlighted]:text-sage-deep`}
                  >
                    View flagship →
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-sm text-sm font-medium text-charcoal transition-colors hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-1"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Open cart${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
            className="rounded-pill px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
          >
            Cart{count > 0 && <span className="ml-1 font-mono text-xs text-sage-deep">({count})</span>}
          </button>
          <ButtonLink
            href="/products/daily-gut-system"
            variant="primary"
            className="hidden !px-5 !py-2 text-xs md:inline-flex"
          >
            Start Now
          </ButtonLink>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-charcoal transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep md:hidden"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bone md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col px-5 pb-5 pt-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-mineral">Shop</p>
            {dropdown.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={closeMobile}
                className="block rounded-sm py-2.5 text-sm font-medium text-charcoal hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                {p.name}
              </Link>
            ))}
            <div className="my-3 border-t border-line" />
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMobile}
                className="block rounded-sm py-2.5 text-sm font-medium text-charcoal hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4">
              <ButtonLink
                href="/products/daily-gut-system"
                variant="primary"
                className="!w-full !py-2.5 text-sm"
              >
                Start Now
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
