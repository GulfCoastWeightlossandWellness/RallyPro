"use client";

import { Children, type ReactNode } from "react";
import { MOTION } from "@/lib/motion-tokens";
import { Reveal } from "./Reveal";

type Props = {
  children: ReactNode;
  className?: string;
  staggerSec?: number;
};

export function Stagger({ children, className, staggerSec = MOTION.stagger }: Props) {
  const items = Children.toArray(children);
  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={i} delay={i * staggerSec}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
