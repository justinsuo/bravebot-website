"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CtaButton, StatBlock } from "@/components/ui";
import { hero } from "@/data/bravebot";

// 3D BraveBot model (assembled, slowly rotating) — replaces the old 2D SVG.
const RobotScene = dynamic(
  () => import("@/components/landing/RobotScene").then((m) => m.RobotScene),
  { ssr: false },
);

/** Full-screen landing hero — robot in a data center aisle with scroll parallax. */
export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  /* Scroll-linked parallax across the hero. */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const robotY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const robotScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  /* Split the headline so the "Dark AI Data Center" portion can be gradient-styled. */
  const accent = "Dark AI Data Center";
  const [before, after] = hero.headline.split(accent);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-void"
    >
      {/* ambient tech grid — parallax */}
      <motion.div
        className="absolute inset-0 bg-techgrid"
        aria-hidden="true"
        style={reduce ? undefined : { y: gridY }}
      />

      {/* soft accent light */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(56% 46% at 50% 30%, rgba(61,109,251,0.16), transparent 72%), radial-gradient(50% 44% at 82% 86%, rgba(61,109,251,0.08), transparent 74%)",
        }}
      />

      {/* server-rack aisle silhouettes — left + right edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[14vw] opacity-70 md:block"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 26px, rgba(61,109,251,0.16) 27px, rgba(61,109,251,0.16) 30px, transparent 31px, transparent 58px)",
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[14vw] opacity-70 md:block"
        aria-hidden="true"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 26px, rgba(61,109,251,0.16) 27px, rgba(61,109,251,0.16) 30px, transparent 31px, transparent 58px)",
          maskImage: "linear-gradient(to left, black, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black, transparent)",
        }}
      />

      {/* ===== content ===== */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-5 pb-24 pt-28 sm:px-8 md:pt-32">
        <div className="grid w-full flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* --- text column --- */}
          <motion.div
            className="order-2 text-center lg:order-1 lg:text-left"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan anim-blink" />
              Vigiles Robotics · BraveBot
            </span>

            <h1 className="mt-6 text-balance text-3xl leading-[1.1] sm:text-5xl md:text-[3.4rem]">
              {before}
              <span className="text-gradient">{accent}</span>
              {after}
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-tdim sm:text-lg lg:mx-0">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <CtaButton href="#anatomy" variant="primary">
                {hero.primaryCta}
              </CtaButton>
              <CtaButton href="#sensors" variant="secondary">
                {hero.secondaryCta}
              </CtaButton>
            </div>
          </motion.div>

          {/* --- robot column --- */}
          <motion.div
            className="relative order-1 flex justify-center lg:order-2"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative w-full max-w-[380px]"
              style={reduce ? undefined : { y: robotY, scale: robotScale }}
            >
              {/* acoustic arc rings around the robot head */}
              <div
                className="pointer-events-none absolute inset-0 flex items-start justify-center"
                aria-hidden="true"
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute rounded-full border border-cyan/50"
                    style={{
                      top: "8%",
                      width: "62%",
                      height: "62%",
                      animation: reduce
                        ? undefined
                        : `pulse-ring 3.6s ${i * 1.2}s ease-out infinite`,
                      opacity: reduce ? 0.3 : 0,
                    }}
                  />
                ))}
              </div>

              {/* thermal gradient hint */}
              <div
                className="pointer-events-none absolute inset-x-[18%] bottom-[6%] top-[14%] -z-0 rounded-full blur-2xl"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(circle at 50% 32%, rgba(61,109,251,0.28), rgba(61,109,251,0.10) 55%, transparent 76%)",
                }}
              />

              {/* faint gas particles */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {[
                  { l: "22%", t: "30%", d: 0 },
                  { l: "70%", t: "24%", d: 1.3 },
                  { l: "58%", t: "46%", d: 2.1 },
                  { l: "34%", t: "52%", d: 0.7 },
                  { l: "80%", t: "40%", d: 1.8 },
                ].map((p, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-ok/50"
                    style={{ left: p.l, top: p.t }}
                    animate={
                      reduce
                        ? undefined
                        : { y: [0, -22, 0], opacity: [0, 0.7, 0] }
                    }
                    transition={{
                      duration: 5,
                      delay: p.d,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <RobotScene className="anim-float relative z-10 h-[420px] w-full" />

              {/* concept caption chip */}
              <span className="absolute -bottom-2 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-panel/90 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-tfaint backdrop-blur">
                Concept visualization
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* --- stats row --- */}
        <motion.dl
          className="mt-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 lg:grid-cols-6"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.stats.map((s) => (
            <StatBlock key={s.label} value={s.value} label={s.label} note={s.note} />
          ))}
        </motion.dl>
      </div>

      {/* --- scroll-down indicator --- */}
      <motion.a
        href="#anatomy"
        aria-label="Scroll to robot anatomy"
        className="group absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1.5 text-tfaint transition-colors hover:text-cyan-bright"
        style={reduce ? undefined : { opacity: indicatorOpacity }}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em]">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cyan-bright"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
