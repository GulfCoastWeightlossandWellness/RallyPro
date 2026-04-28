import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";
import { CapsuleDiagram } from "@/components/sections/CapsuleDiagram";

function Arrow() {
  return <span aria-hidden>→</span>;
}

const stats: [string, string][] = [
  ["94%", "Gastric survival rate · verify"],
  ["10B", "CFU at expiration · verify"],
  ["6 strains", "Multi-strain intent"],
  ["HPMC", "Delayed-release capsule"],
];

/**
 * Premium “delivery science” band — layout inspired by category leaders; copy is Rally Pro’s own.
 * Numeric claims must match validated data before marketing use.
 */
export function DeliveryTechnologySection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-dark-bg py-20 text-ivory md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(251,248,242,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(251,248,242,0.025) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
      <Container className="relative z-[1] grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <Eyebrow className="text-ivory/40">Delivery technology</Eyebrow>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,3.125rem)] font-normal leading-[1.08] tracking-tight">
            Most probiotics don&apos;t
            <br />
            survive digestion.
            <br />
            <em className="not-italic text-ivory/95">Engineered delivery helps.</em>
          </h2>
          <p className="mt-6 max-w-[460px] text-sm leading-relaxed text-ivory/55">
            Delayed-release HPMC capsules can shield acid-sensitive strains through the stomach —
            supporting delivery toward the lower GI where many cultures are studied. Published counts
            must reflect expiration on your label, not manufacture-only snapshots. Replace this
            band&apos;s figures with COA-backed values.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-2.5">
            {stats.map(([n, l]) => (
              <div
                key={l}
                className="rounded-[10px] border border-ivory/[0.07] bg-ivory/[0.04] px-4 py-[18px] transition-colors duration-200 hover:border-sage-deep/40 hover:bg-sage-deep/20"
              >
                <div className="font-mono text-[26px] font-medium text-ivory">{n}</div>
                <div className="text-[11px] tracking-wide text-ivory/40">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/science" variant="outlineLight" className="!px-6 !py-2.5 text-sm">
              Read the full science <Arrow />
            </ButtonLink>
          </div>
          <FdaDisclaimer className="mt-8 max-w-lg text-ivory/45" />
        </div>
        <div className="hidden justify-center lg:flex">
          <CapsuleDiagram />
        </div>
      </Container>
      <div className="relative z-[1] mt-10 flex justify-center lg:hidden">
        <CapsuleDiagram />
      </div>
    </section>
  );
}
