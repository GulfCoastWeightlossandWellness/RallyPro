import Image from "next/image";
import Link from "next/link";

const LOGO = "/images/brand/rally-sunroot-logo.webp";

type Props = {
  /** Header: dark text beside logo. Footer: ivory on dark. */
  variant: "header" | "footer";
  /** Show “Rally Pro” beside the Rally Sunroot logotype */
  showWordmark?: boolean;
};

export function BrandMark({ variant, showWordmark = true }: Props) {
  const isHeader = variant === "header";
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${isHeader ? "" : "items-start"}`}
      aria-label="Rally Pro home"
    >
      <span
        className={
          isHeader
            ? "inline-flex shrink-0"
            : "inline-flex shrink-0 rounded-md bg-white/12 p-2 ring-1 ring-white/10"
        }
      >
        <Image
          src={LOGO}
          alt=""
          width={938}
          height={414}
          priority={isHeader}
          className={`w-auto ${isHeader ? "h-7 md:h-8" : "h-6 md:h-7"}`}
        />
      </span>
      {showWordmark ? (
        <span
          className={`font-display text-lg tracking-wide ${isHeader ? "text-charcoal" : "text-ivory"} leading-tight`}
        >
          Rally Pro
        </span>
      ) : null}
    </Link>
  );
}
