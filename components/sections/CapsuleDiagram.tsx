/** Original SVG illustration — Rally Pro prototype (not affiliated with any competitor trademark). */

export function CapsuleDiagram() {
  return (
    <div className="relative flex h-[420px] w-[300px] items-center justify-center">
      <svg width="260" height="400" viewBox="0 0 260 400" fill="none" aria-hidden className="max-w-full">
        <title>Capsule delivery diagram (illustration)</title>
        <defs>
          <radialGradient id="cap-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4A5D4F" stopOpacity=".35" />
            <stop offset="100%" stopColor="#4A5D4F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cap-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#233629" />
            <stop offset="50%" stopColor="#4A5D4F" />
            <stop offset="100%" stopColor="#233629" />
          </linearGradient>
          <linearGradient id="cap-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a2e22" />
            <stop offset="50%" stopColor="#2d4438" />
            <stop offset="100%" stopColor="#1a2e22" />
          </linearGradient>
          <linearGradient id="inner-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(182,138,109,.3)" />
            <stop offset="100%" stopColor="rgba(74,93,79,.2)" />
          </linearGradient>
        </defs>
        <ellipse cx="130" cy="200" rx="95" ry="115" fill="url(#cap-glow)" />
        <rect x="97" y="60" width="66" height="95" rx="33" fill="url(#cap-top)" stroke="rgba(251,248,242,.15)" strokeWidth="1" />
        <rect x="97" y="140" width="66" height="175" rx="33" fill="url(#cap-body)" stroke="rgba(251,248,242,.15)" strokeWidth="1" />
        <rect x="107" y="168" width="46" height="135" rx="23" fill="url(#inner-fill)" />
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx={116 + (i % 3) * 11}
            cy={182 + Math.floor(i / 3) * 28}
            r={i % 2 === 0 ? 4 : 2.5}
            fill={i % 3 === 0 ? "rgba(182,138,109,.55)" : "rgba(74,93,79,.4)"}
            opacity={0.5 + i * 0.04}
          />
        ))}
        <line x1="97" y1="154" x2="163" y2="154" stroke="rgba(251,248,242,.12)" strokeWidth="1" />
        <path
          d="M103 72 Q97 130 100 225"
          stroke="rgba(255,255,255,.06)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {(
          [
            [163, 82, 195, 65, "DELAYED-RELEASE", "HPMC Capsule"],
            [163, 160, 195, 160, "PROBIOTIC STRAINS", "Multi-strain blend"],
            [163, 240, 195, 252, "SUNROOT INULIN", "Prebiotic fiber"],
            [163, 290, 195, 310, "DIGESTIVE SUPPORT", "Botanical layer · TBD"],
          ] as const
        ).map(([x1, y1, x2, y2, h, s], i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2 - 4} y2={y2} stroke="rgba(251,248,242,.18)" strokeWidth="0.75" />
            <text
              x={x2}
              y={y2 - 1}
              fontSize="8.5"
              fill="rgba(251,248,242,.55)"
              fontFamily="var(--font-mono), ui-monospace, monospace"
              letterSpacing="0.05em"
            >
              {h}
            </text>
            <text
              x={x2}
              y={y2 + 10}
              fontSize="7"
              fill="rgba(251,248,242,.28)"
              fontFamily="var(--font-mono), ui-monospace, monospace"
            >
              {s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
