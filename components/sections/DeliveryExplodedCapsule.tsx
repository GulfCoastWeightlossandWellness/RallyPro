"use client";

/**
 * DeliveryExplodedCapsule — scroll-scrubbed animated capsule section.
 *
 * Section is 240vh tall (when motion is on); inner is sticky-pinned with min-height 100dvh so the
 * capsule can scrub while the user scrolls — same on mobile and desktop.
 * Avoid overflow:hidden on the section or sticky breaks; cap motion must not be clipped
 * (no overflow-hidden on the sticky wrapper).
 * As the user scrolls, scrollYProgress 0→1 drives:
 *   • Cap rises  (~-155px translateY at progress 0.9)
 *   • Body sinks (~+38px)
 *   • Inner particulate fades in early (progress 0→0.2), then splits into 3 staggered bands
 *   • Top particles float upward, mid particles barely drift, bottom particles sink
 *   • Leader-line labels fade in after 40% progress
 *
 * Mobile: same scroll-scrub + sticky pin as desktop; single column layout with a slightly
 * smaller SVG frame. prefers-reduced-motion: static fully-exploded diagram, auto section height.
 *
 * No Seed trademarks or competitor copy. Rally Pro naming throughout.
 * All unverified numeric claims carry "· verify" microcopy (§12 compliance).
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, FdaDisclaimer } from "@/components/ui/Container";

// ─── Static data ──────────────────────────────────────────────────────────────

const STATS = [
  { value: "3-layer", label: "Formulation structure" },
  { value: "HPMC", label: "Delayed-release shell" },
  { value: "10B CFU", label: "At expiration · verify" },
  { value: "Mineral", label: "Matrix pairing · verify" },
] as const;

// Particles split into 3 bands for staggered motion during capsule opening.
// Top band floats upward with the rising cap; bottom band sinks with the body.
const PARTICLES_TOP: [number, number, number, string][] = [
  [109, 252, 5.5, "rgba(182,138,109,.72)"],
  [129, 249, 3.5, "rgba(74,93,79,.65)"],
  [149, 256, 4.0, "rgba(251,248,242,.30)"],
  [117, 273, 3.2, "rgba(182,138,109,.52)"],
  [140, 272, 6.0, "rgba(74,93,79,.55)"],
  [158, 268, 2.8, "rgba(251,248,242,.25)"],
  [102, 269, 2.5, "rgba(74,93,79,.30)"],
];

const PARTICLES_MID: [number, number, number, string][] = [
  [105, 295, 4.5, "rgba(74,93,79,.48)"],
  [124, 291, 3.0, "rgba(182,138,109,.58)"],
  [146, 298, 6.5, "rgba(74,93,79,.42)"],
  [113, 319, 2.5, "rgba(251,248,242,.20)"],
  [133, 316, 4.8, "rgba(182,138,109,.62)"],
  [153, 313, 3.5, "rgba(74,93,79,.47)"],
  [162, 296, 3.0, "rgba(182,138,109,.30)"],
];

const PARTICLES_BOT: [number, number, number, string][] = [
  [109, 340, 3.2, "rgba(74,93,79,.40)"],
  [129, 342, 2.2, "rgba(182,138,109,.38)"],
  [149, 337, 4.2, "rgba(251,248,242,.18)"],
  [120, 363, 5.5, "rgba(74,93,79,.38)"],
  [142, 360, 2.8, "rgba(182,138,109,.42)"],
];

// [lineStartX, centerY, headline, subline]
const LABELS: [number, number, string, string][] = [
  [175, 132, "HPMC CAPSULE", "Delayed-release shell"],
  [175, 220, "PROBIOTIC BLEND", "Multi-strain · verify CFU"],
  [175, 298, "SUNROOT INULIN", "Prebiotic fiber substrate"],
  [175, 375, "MINERAL MATRIX", "Zeolite component · verify"],
];

// ─── SVG capsule diagram ──────────────────────────────────────────────────────

type CapsuleSVGProps = {
  capY: MotionValue<number> | number;
  bodyY: MotionValue<number> | number;
  particleOpacity: MotionValue<number> | number;
  particleTopY: MotionValue<number> | number;
  particleMidY: MotionValue<number> | number;
  particleBotY: MotionValue<number> | number;
  labelOpacity: MotionValue<number> | number;
};

function CapsuleSVG({
  capY,
  bodyY,
  particleOpacity,
  particleTopY,
  particleMidY,
  particleBotY,
  labelOpacity,
}: CapsuleSVGProps) {
  return (
    <svg
      viewBox="0 0 400 560"
      className="h-full w-full"
      role="img"
      aria-label="Exploded capsule diagram showing layered formulation structure"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="dec-halo" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#4A5D4F" stopOpacity=".22" />
          <stop offset="100%" stopColor="#4A5D4F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dec-cap-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#192920" />
          <stop offset="42%" stopColor="#2e4639" />
          <stop offset="58%" stopColor="#33503c" />
          <stop offset="100%" stopColor="#192920" />
        </linearGradient>
        <linearGradient id="dec-body-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d2d24" />
          <stop offset="42%" stopColor="#30493c" />
          <stop offset="58%" stopColor="#354e40" />
          <stop offset="100%" stopColor="#1d2d24" />
        </linearGradient>
        <linearGradient id="dec-inner-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(182,138,109,.40)" />
          <stop offset="55%" stopColor="rgba(74,93,79,.32)" />
          <stop offset="100%" stopColor="rgba(42,39,35,.20)" />
        </linearGradient>
        <linearGradient id="dec-join-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(251,248,242,.14)" />
          <stop offset="100%" stopColor="rgba(251,248,242,.04)" />
        </linearGradient>
      </defs>

      {/* Ambient halo behind capsule */}
      <ellipse cx="130" cy="295" rx="115" ry="155" fill="url(#dec-halo)" />

      {/* ── Layer 1: Body — sinks on scroll; sleeve and separator track with it ── */}
      <motion.g style={{ y: bodyY }}>
        <path
          d="M 85,208 L 85,408 A 45,45 0 0,0 175,408 L 175,208 Z"
          fill="url(#dec-body-g)"
          stroke="rgba(251,248,242,.10)"
          strokeWidth="1"
        />
        <path
          d="M 94,219 Q 90,312 93,407"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Inner fill sleeve and separator live in the body so they sink with it */}
        <rect x="93" y="220" width="74" height="192" rx="37" fill="url(#dec-inner-g)" />
        <line
          x1="93"
          y1="312"
          x2="167"
          y2="312"
          stroke="rgba(251,248,242,.08)"
          strokeWidth="0.75"
        />
      </motion.g>

      {/* ── Layer 2: Particulate — fades in early, 3 bands spread as capsule opens ── */}
      <motion.g style={{ opacity: particleOpacity }}>
        <motion.g style={{ y: particleTopY }}>
          {PARTICLES_TOP.map(([cx, cy, r, fill], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
          ))}
        </motion.g>
        <motion.g style={{ y: particleMidY }}>
          {PARTICLES_MID.map(([cx, cy, r, fill], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
          ))}
        </motion.g>
        <motion.g style={{ y: particleBotY }}>
          {PARTICLES_BOT.map(([cx, cy, r, fill], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
          ))}
        </motion.g>
      </motion.g>

      {/* ── Layer 3: Cap — rises dramatically on scroll ── */}
      <motion.g style={{ y: capY }}>
        <rect x="85" y="223" width="90" height="13" rx="2" fill="url(#dec-join-g)" />
        <path
          d="M 85,234 L 85,120 A 45,45 0 0,1 175,120 L 175,234 Z"
          fill="url(#dec-cap-g)"
          stroke="rgba(251,248,242,.15)"
          strokeWidth="1"
        />
        <path
          d="M 94,133 Q 90,183 93,232"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>

      {/* ── Layer 4: Leader line labels — fade in after 40% progress ── */}
      <motion.g style={{ opacity: labelOpacity }}>
        {LABELS.map(([x1, y, h, s]) => (
          <g key={h}>
            <line
              x1={x1}
              y1={y}
              x2={x1 + 22}
              y2={y}
              stroke="rgba(251,248,242,.22)"
              strokeWidth="0.75"
            />
            <circle cx={x1 + 2} cy={y} r="2.2" fill="rgba(251,248,242,.42)" />
            <text
              x={x1 + 27}
              y={y - 1}
              fontSize="8"
              fill="rgba(251,248,242,.64)"
              fontFamily="var(--font-mono), ui-monospace, monospace"
              letterSpacing="0.06em"
            >
              {h}
            </text>
            <text
              x={x1 + 27}
              y={y + 12}
              fontSize="6.5"
              fill="rgba(251,248,242,.28)"
              fontFamily="var(--font-mono), ui-monospace, monospace"
            >
              {s}
            </text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[10px] border border-ivory/[0.07] bg-ivory/[0.04] px-4 py-[18px] transition-colors duration-200 hover:border-sage-deep/40 hover:bg-sage-deep/20">
      <div className="font-mono text-[26px] font-medium leading-none text-ivory">{value}</div>
      <div className="mt-1.5 text-[11px] tracking-wide text-ivory/40">{label}</div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

function Arrow() {
  return <span aria-hidden>→</span>;
}

export function DeliveryExplodedCapsule() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // High stiffness + damping so the animation tracks scroll tightly (Seed-like snappiness).
  const smooth = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  // 240vh section → 140vh of sticky scroll range on desktop.
  // All transforms play out over 90% of that range so the capsule is visibly
  // open for most of the time the section is pinned.
  const capYMV = useTransform(smooth, [0, 0.9], [-50, -155]);
  const bodyYMV = useTransform(smooth, [0, 0.9], [6, 38]);
  // Particles fade in early, then the 3 bands spread apart as the gap widens.
  const particleOpacityMV = useTransform(smooth, [0, 0.2], [0.25, 1]);
  const particleTopYMV = useTransform(smooth, [0, 0.85], [0, -22]);
  const particleMidYMV = useTransform(smooth, [0.05, 0.8], [0, -4]);
  const particleBotYMV = useTransform(smooth, [0.05, 0.8], [0, 16]);
  const labelOpacityMV = useTransform(smooth, [0.4, 0.72], [0, 1]);

  // Reduced motion: jump to fully-open static state
  const capY = reduce ? -155 : capYMV;
  const bodyY = reduce ? 38 : bodyYMV;
  const particleOpacity = reduce ? 1 : particleOpacityMV;
  const particleTopY = reduce ? -22 : particleTopYMV;
  const particleMidY = reduce ? -4 : particleMidYMV;
  const particleBotY = reduce ? 16 : particleBotYMV;
  const labelOpacity = reduce ? 1 : labelOpacityMV;

  const sectionHeight = reduce ? undefined : "240vh";

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-line bg-[#1F1D1A] text-ivory"
      style={{ height: sectionHeight }}
      aria-label="Delivery technology — how the Daily Gut System is structured"
    >
      {/* Subtle CSS grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(251,248,242,0.028) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(251,248,242,0.028) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />

      {/* ── Content inner ─────────────────────────────────────────────────── */}
      <div
        className={[
          "relative z-[1] flex items-center",
          reduce
            ? "py-20"
            : "sticky top-0 min-h-[100dvh] overflow-visible py-8 sm:py-10 lg:py-0",
        ].join(" ")}
      >
        <Container className="w-full">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

            {/* ── Left: copy + stat cards ─────────────────────────────── */}
            <div>
              <Eyebrow className="text-ivory/40">Formulation &amp; delivery</Eyebrow>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,3.125rem)] font-normal leading-[1.08] tracking-tight">
                Layered by design.
                <br />
                <em className="not-italic text-ivory/90">Not by accident.</em>
              </h2>
              <p className="mt-6 max-w-[460px] text-sm leading-relaxed text-ivory/55">
                A daily supplement works best when its components are structured to reach the right
                place. Delayed-release HPMC capsules can shield acid-sensitive cultures through the
                stomach — supporting delivery toward the lower GI where probiotic strains are
                studied. The prebiotic fiber substrate and mineral matrix component pair inside the
                same routine, not as separate products.
              </p>

              <div className="mt-9 grid grid-cols-2 gap-2.5">
                {STATS.map((s) => (
                  <StatCard key={s.value} value={s.value} label={s.label} />
                ))}
              </div>

              <p className="mt-4 text-[10px] leading-snug text-ivory/30">
                &ldquo;Verify&rdquo; indicates a placeholder figure. Replace with COA-backed values
                before marketing use.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink
                  href="/science"
                  variant="outlineLight"
                  className="!px-6 !py-2.5 text-sm"
                >
                  Read the full science <Arrow />
                </ButtonLink>
              </div>

              <FdaDisclaimer className="mt-8 max-w-lg text-ivory/40" />
            </div>

            {/* ── Capsule — scroll-scrubbed (all breakpoints) ───────────── */}
            <div
              className="flex items-center justify-center"
              style={{ perspective: "900px" }}
            >
              <div className="relative mx-auto h-[360px] w-[258px] sm:h-[420px] sm:w-[302px] lg:h-[500px] lg:w-[360px]">
                <CapsuleSVG
                  capY={capY}
                  bodyY={bodyY}
                  particleOpacity={particleOpacity}
                  particleTopY={particleTopY}
                  particleMidY={particleMidY}
                  particleBotY={particleBotY}
                  labelOpacity={labelOpacity}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <p className="sr-only">
        The Rally Pro Daily Gut System uses a three-layer formulation inside a delayed-release HPMC
        capsule: a probiotic blend (multi-strain, CFU count guaranteed at expiration — pending
        verification), sunroot inulin as the prebiotic fiber substrate, and a mineral matrix
        component (zeolite). All numeric claims are placeholders pending COA validation and must be
        verified before any marketing use.
      </p>
    </section>
  );
}
