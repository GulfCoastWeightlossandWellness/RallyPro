"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ExternalCheckoutCtx = {
  externalCheckoutOpen: boolean;
  setExternalCheckoutOpen: (open: boolean) => void;
  openExternalCheckout: () => void;
};

const ExternalCheckoutContext = createContext<ExternalCheckoutCtx | null>(null);

export function ExternalCheckoutProvider({ children }: { children: ReactNode }) {
  const [externalCheckoutOpen, setExternalCheckoutOpen] = useState(false);

  const openExternalCheckout = useCallback(() => {
    setExternalCheckoutOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      externalCheckoutOpen,
      setExternalCheckoutOpen,
      openExternalCheckout,
    }),
    [externalCheckoutOpen, openExternalCheckout],
  );

  return (
    <ExternalCheckoutContext.Provider value={value}>
      {children}
    </ExternalCheckoutContext.Provider>
  );
}

export function useExternalCheckout(): ExternalCheckoutCtx {
  const ctx = useContext(ExternalCheckoutContext);
  if (!ctx) {
    throw new Error(
      "useExternalCheckout must be used within <ExternalCheckoutProvider>",
    );
  }
  return ctx;
}
