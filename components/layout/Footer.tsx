import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";
import { FdaDisclaimer } from "@/components/ui/Container";

const cols = [
  {
    title: "Shop",
    links: [
      ["Daily Gut System", "/products/daily-gut-system"],
      ["Sunroot Inulin", "/products/rally-sunroot-inulin"],
      ["Rally Sunroot Detox", "/products/rally-sunroot-detox"],
      ["Rally Sunroot Zeolite", "/products/rally-sunroot-zeolite"],
      ["Rally Sunroot Pro", "/products/rally-sunroot-pro"],
      ["Rally Sunroot Trio", "/products/rally-sunroot-trio"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Science", "/science"],
      ["Ingredients", "/ingredients"],
      ["About", "/about"],
      ["Journal", "/journal"],
      ["FAQ", "/faq"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact", "/contact"],
      ["Shipping & Returns", "/shipping-returns"],
      ["COA Lookup", "/coa"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["Accessibility", "/accessibility"],
      ["Disclosures", "/disclosures"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto bg-dark-bg-alt py-16 text-ivory">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div>
            <div className="mb-4">
              <BrandMark variant="footer" />
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-mineral">
              Building the daily gut-health system for adults who read the label.
            </p>
            <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.1em] text-mineral">
              Stay in touch
            </div>
            <form className="mt-2 flex gap-2" action="/contact" method="get">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory placeholder:text-ivory/35 focus:border-sage-deep focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-sage-deep px-3 py-2 text-ivory transition hover:opacity-90"
              >
                →
              </button>
            </form>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.14em] text-mineral">
                {col.title}
              </div>
              <ul className="space-2">
                {col.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-xs text-ivory/40 transition hover:text-ivory"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:justify-between">
          <div>
            <p className="text-[10px] text-mineral">© {new Date().getFullYear()} Rally Pro, Inc. All rights reserved.</p>
            <p className="mt-1 text-[10px] text-mineral/70">Based on Armenian Rally Sunroot heritage — U.S. entity TBD.</p>
          </div>
          <FdaDisclaimer className="max-w-xl text-right text-[10px] text-mineral/70" />
        </div>
      </div>
    </footer>
  );
}
