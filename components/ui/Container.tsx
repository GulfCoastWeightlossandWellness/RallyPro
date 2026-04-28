import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 ${className}`}>{children}</div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mb-3 block text-[10px] font-bold uppercase tracking-[0.14em] text-mineral ${className}`}
    >
      {children}
    </span>
  );
}

export function FdaDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[10px] leading-snug text-mineral ${className}`}>
      † These statements have not been evaluated by the Food and Drug Administration. This product
      is not intended to diagnose, treat, cure, or prevent any disease.
    </p>
  );
}
