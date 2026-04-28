import Image from "next/image";
import Link from "next/link";

const LOGO = "/images/brand/rally-sunroot-logo.webp";

type Props = {
  /** Header: light bar. Footer: ivory on dark with subtle chip. */
  variant: "header" | "footer";
};

/**
 * Rally Sunroot logotype only (no separate “Rally Pro” wordmark).
 * `aria-label` names the site for screen readers.
 */
export function BrandMark({ variant }: Props) {
  const isHeader = variant === "header";
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 ${isHeader ? "items-center" : "items-start"}`}
      aria-label="Rally Pro home"
    >
      <span
        className={
          isHeader
            ? "inline-flex"
            : "inline-flex rounded-md bg-white/12 p-2 ring-1 ring-white/10"
        }
      >
        <Image
          src={LOGO}
          alt=""
          width={938}
          height={414}
          priority={isHeader}
          className={`w-auto ${isHeader ? "h-9 md:h-11" : "h-8 md:h-10"}`}
        />
      </span>
    </Link>
  );
}
