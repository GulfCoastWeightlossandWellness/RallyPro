"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type CartInterval = "subscribe" | "one-time";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
  interval: CartInterval;
};

type CartCtx = {
  items: CartItem[];
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string, interval: CartInterval) => void;
  updateQty: (slug: string, interval: CartInterval, qty: number) => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const addItem = useCallback((newItem: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === newItem.slug && i.interval === newItem.interval,
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === newItem.slug && i.interval === newItem.interval
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }
      return [...prev, { ...newItem, qty: 1 }];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, interval: CartInterval) => {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.interval === interval)),
    );
  }, []);

  const updateQty = useCallback(
    (slug: string, interval: CartInterval, qty: number) => {
      if (qty <= 0) {
        setItems((prev) =>
          prev.filter((i) => !(i.slug === slug && i.interval === interval)),
        );
      } else {
        setItems((prev) =>
          prev.map((i) =>
            i.slug === slug && i.interval === interval ? { ...i, qty } : i,
          ),
        );
      }
    },
    [],
  );

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        drawerOpen,
        openDrawer,
        closeDrawer,
        addItem,
        removeItem,
        updateQty,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
