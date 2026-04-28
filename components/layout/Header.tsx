"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openDrawer, count } = useCart();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openShop = useCallback(() => setShopOpen(true), []);

  const closeShop = useCallback(() => {
    setShopOpen(false);
  }, []);

  const closeShopAndReturnFocus = useCallback(() => {
    setShopOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close dropdown when focus leaves it
  const handleDropdownBlur = useCallback(
    (e: React.FocusEvent) => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        closeShop();
      }
    },
    [closeShop],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        openShop();
        // Focus first item after open
        requestAnimationFrame(() => {
          const first = dropdownRef.current?.querySelector<HTMLElement>("[role='menuitem']");
          first?.focus();
        });
      }
      if (e.key === "Escape") {
        closeShopAndReturnFocus();
      }
    },
    [openShop, closeShopAndReturnFocus],
  );

  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeShopAndReturnFocus();
        return;
      }
      const items = Array.from(
        dropdownRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? [],
      );
      const focused = document.activeElement;
      const idx = items.indexOf(focused as HTMLElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
      }
    },
    [closeShopAndReturnFocus],
  );

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

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 md:flex">
          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={openShop}
            onMouseLeave={closeShop}
          >
            <button
              ref={triggerRef}
              type="button"
              id="shop-menu-trigger"
              aria-expanded={shopOpen}
              aria-haspopup="menu"
              aria-controls="shop-dropdown"
              onKeyDown={handleTriggerKeyDown}
              onClick={() => (shopOpen ? closeShopAndReturnFocus() : openShop())}
              className="flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-1"
            >
              Shop
              <span
                aria-hidden
                className={`text-[10px] transition-transform duration-150 ${shopOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {shopOpen && (
              <div
                ref={dropdownRef}
                id="shop-dropdown"
                role="menu"
                aria-labelledby="shop-menu-trigger"
                onBlur={handleDropdownBlur}
                onKeyDown={handleDropdownKeyDown}
                className="absolute left-0 top-full z-[100] mt-2 w-72 rounded-md border border-line bg-ivory py-2 shadow-[var(--shadow-float)]"
              >
                {dropdown.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    role="menuitem"
                    tabIndex={0}
                    onClick={closeShop}
                    className="block px-3 py-2.5 text-sm transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                  >
                    <div className="font-semibold text-charcoal">{p.name}</div>
                    <div className="text-[11px] text-mineral">{p.tagline}</div>
                  </Link>
                ))}
                <div role="separator" className="my-1 border-t border-line" />
                <Link
                  href="/products/daily-gut-system"
                  role="menuitem"
                  tabIndex={0}
                  onClick={closeShop}
                  className="block px-3 py-2 text-xs font-semibold text-sage-deep transition-colors hover:bg-paper focus-visible:bg-paper focus-visible:outline-none"
                >
                  View flagship →
                </Link>
              </div>
            )}
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-1"
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
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
              >
                {p.name}
              </Link>
            ))}
            <div className="my-3 border-t border-line" />
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-charcoal hover:text-sage-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep"
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
