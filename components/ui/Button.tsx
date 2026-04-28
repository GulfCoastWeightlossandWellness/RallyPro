import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-charcoal text-ivory hover:bg-graphite border border-transparent",
  secondary:
    "bg-transparent text-sage-deep border-[1.5px] border-sage-deep hover:bg-sage-deep hover:text-ivory",
  outlineLight:
    "bg-transparent text-ivory border-[1.5px] border-ivory/35 hover:border-ivory/55 hover:bg-ivory/10",
  clay: "bg-clay text-ivory hover:bg-clay-deep border border-transparent",
  ghost: "bg-transparent text-graphite hover:text-charcoal underline-offset-4 hover:underline border-0",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none";
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  children,
  variant = "primary",
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-pill px-7 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
