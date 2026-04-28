"use client";

import { useState, type ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SystemStrip } from "./SystemStrip";
import { CartProvider } from "@/lib/cart";

export function SiteShell({ children }: { children: ReactNode }) {
  const [showBar, setShowBar] = useState(true);

  return (
    <CartProvider>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-block focus:rounded-md focus:bg-sage-deep focus:px-4 focus:py-2 focus:text-ivory focus:shadow-[var(--shadow-float)]"
      >
        Skip to content
      </a>
      <AnnouncementBar show={showBar} onDismiss={() => setShowBar(false)} />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <SystemStrip />
      <CartDrawer />
    </CartProvider>
  );
}
