"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Container, FdaDisclaimer } from "@/components/ui/Container";
import { MOTION, RALLY_EASE } from "@/lib/motion-tokens";

function Arrow() {
  return <span aria-hidden>→</span>;
}

const item = {
  hidden: { opacity: 0, y: MOTION.heroRisePx },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.heroItemMs / 1000,
      delay: i * 0.06,
      ease: RALLY_EASE,
    },
  }),
};

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")`,
        }}
      />
      <Container className="relative grid min-h-[88vh] items-center gap-10 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          {reduce ? (
            <>
              <span className="mb-7 inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-graphite">
                <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" aria-hidden />
                Daily Gut Support System
              </span>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.03] tracking-tight text-charcoal">
                Gut health is a system.
                <br />
                <em className="not-italic">Treat it like one.</em>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">
                Prebiotic sunroot fiber, multi-strain probiotics, and digestive support — structured for daily
                consistency and full-label transparency. Built for adults who read the Supplement Facts before the
                headline.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink href="/products/daily-gut-system">
                  Start Your First Month <Arrow />
                </ButtonLink>
                <Link
                  href="/ingredients"
                  className="border-b-[1.5px] border-line text-sm font-semibold text-charcoal transition hover:border-charcoal"
                >
                  See the formula <Arrow />
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-wider text-graphite">
                {["Third-Party Tested", "Vegan capsules • TBD", "No proprietary blends", "Patented AM sunroot process"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-2">
                      <span className="text-sage-deep" aria-hidden>
                        ✓
                      </span>
                      {t}
                    </span>
                  ),
                )}
              </div>
            </>
          ) : (
            <motion.div initial="hidden" animate="show" className="space-y-0">
              <motion.span
                custom={0}
                variants={item}
                className="mb-7 inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-graphite"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" aria-hidden />
                Daily Gut Support System
              </motion.span>
              <motion.h1
                custom={1}
                variants={item}
                className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.03] tracking-tight text-charcoal"
              >
                Gut health is a system.
                <br />
                <em className="not-italic">Treat it like one.</em>
              </motion.h1>
              <motion.p
                custom={2}
                variants={item}
                className="mt-6 max-w-md text-base leading-relaxed text-graphite"
              >
                Prebiotic sunroot fiber, multi-strain probiotics, and digestive support — structured for daily
                consistency and full-label transparency. Built for adults who read the Supplement Facts before the
                headline.
              </motion.p>
              <motion.div custom={3} variants={item} className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink href="/products/daily-gut-system">
                  Start Your First Month <Arrow />
                </ButtonLink>
                <Link
                  href="/ingredients"
                  className="border-b-[1.5px] border-line text-sm font-semibold text-charcoal transition hover:border-charcoal"
                >
                  See the formula <Arrow />
                </Link>
              </motion.div>
              <motion.div
                custom={4}
                variants={item}
                className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-wider text-graphite"
              >
                {["Third-Party Tested", "Vegan capsules • TBD", "No proprietary blends", "Patented AM sunroot process"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-2">
                      <span className="text-sage-deep" aria-hidden>
                        ✓
                      </span>
                      {t}
                    </span>
                  ),
                )}
              </motion.div>
            </motion.div>
          )}
          <FdaDisclaimer className="mt-8 max-w-lg" />
        </div>
        <motion.div
          className="relative flex justify-center lg:col-span-5"
          initial={reduce ? undefined : { opacity: 0, scale: 1.02 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: MOTION.heroImageMs / 1000, ease: RALLY_EASE, delay: reduce ? 0 : 0.08 }}
        >
          <div className="relative aspect-square w-full max-w-[420px]">
            <Image
              src="/images/products/am/trio-120.png"
              alt="Rally Sunroot Trio — shop product photo (120-count listing, Armenian market)"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="rounded-md object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
