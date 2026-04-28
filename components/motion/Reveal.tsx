"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { MOTION, RALLY_EASE } from "@/lib/motion-tokens";

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds (e.g. stagger) */
  delay?: number;
  /** Vertical slide in px — §21.2 section reveal uses 24 */
  y?: number;
  duration?: number;
  /** 0–1, portion of element visible before triggering */
  amount?: number | "some" | "all";
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = MOTION.risePx,
  duration = MOTION.revealMs / 1000,
  amount = 0.12,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount }}
      transition={{
        duration: reduce ? 0 : Math.min(duration, 0.6),
        delay: reduce ? 0 : delay,
        ease: RALLY_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
