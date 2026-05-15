"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, GlassCard } from "@/components/ui";
import { mobility } from "@/data/bravebot";

type ScoreKey = "speed" | "terrain" | "vantage" | "footprint";

const SCORE_META: { key: ScoreKey; label: string }[] = [
  { key: "speed", label: "Speed" },
  { key: "terrain", label: "Terrain" },
  { key: "vantage", label: "Vantage" },
  { key: "footprint", label: "Footprint" },
];

/** A 0–4 mini bar chart for one platform metric. */
function ScoreBar({
  label,
  score,
  highlight,
}: {
  label: string;
  score: number;
  highlight: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-16 shrink-0 font-mono text-[0.62rem] uppercase tracking-wider text-tfaint">
        {label}
      </span>
      <div className="flex flex-1 gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-sm ${
              i < score
                ? highlight
                  ? "bg-orange"
                  : "bg-cyan"
                : "bg-panel-2"
            }`}
          />
        ))}
      </div>
      <span className="w-7 shrink-0 text-right font-mono text-[0.7rem] font-bold text-tdim">
        {score}/4
      </span>
    </div>
  );
}

/** Movement Explainer — why a wheel-legged platform, and how decisions become motion. */
export function WheelLeggedExplainer() {
  const reduce = useReducedMotion();

  return (
    <Section id="mobility">
      <SectionHeading
        eyebrow="03 · Mobility"
        title="Movement Explainer — Why Wheel-Legged?"
        intro="BraveBot is not a rover and not a humanoid. It pairs rolling efficiency with leg articulation so it can patrol long aisles fast and still handle grating, steps and slopes."
      />

      {/* ===== platform comparison cards ===== */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {mobility.platforms.map((p, i) => {
          const isBrave = p.id === "bravebot";
          return (
            <Reveal key={p.id} delay={i * 0.08}>
              <GlassCard
                as="article"
                className={`flex h-full flex-col p-6 ${
                  isBrave ? "border-orange/45 glow-orange" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
                  {isBrave && (
                    <span className="shrink-0 rounded-full border border-orange/50 bg-orange/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-orange-bright">
                      BraveBot
                    </span>
                  )}
                </div>

                {/* strengths */}
                <ul className="mt-4 space-y-2">
                  {p.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-foreground">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0 text-ok"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                {/* limits */}
                <ul className="mt-3 space-y-2">
                  {p.limits.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-tfaint">
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14" />
                      </svg>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>

                {/* score bar chart */}
                <div className="mt-auto space-y-2 border-t border-line pt-4">
                  {SCORE_META.map((m) => (
                    <ScoreBar
                      key={m.key}
                      label={m.label}
                      score={p.score[m.key]}
                      highlight={isBrave}
                    />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      {/* ===== key points ===== */}
      <Reveal delay={0.1}>
        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mobility.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-xl border border-line bg-panel/50 p-4"
            >
              <svg
                viewBox="0 0 24 24"
                className="mt-0.5 h-4 w-4 shrink-0 text-cyan-bright"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2 22 12 12 22 2 12Z" />
              </svg>
              <span className="text-sm leading-relaxed text-tdim">{point}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ===== control stack diagram ===== */}
      <div className="mt-14">
        <Reveal>
          <div className="mb-6 flex items-center gap-2">
            <span className="h-px w-7 bg-cyan" />
            <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-cyan-bright">
              From decision to motion
            </h3>
          </div>
        </Reveal>

        <div className="mx-auto flex max-w-xl flex-col items-stretch">
          {mobility.controlStack.map((layer, i) => {
            const isLast = i === mobility.controlStack.length - 1;
            return (
              <div key={layer.layer}>
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex items-center gap-4 rounded-xl border bg-panel/70 p-4 ${
                    isLast
                      ? "border-orange/45 glow-orange"
                      : "border-line"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold ${
                      isLast
                        ? "border-orange/50 bg-orange/15 text-orange-bright"
                        : "border-cyan/40 bg-cyan/10 text-cyan-bright"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">
                      {layer.layer}
                    </div>
                    <div className="mt-0.5 text-xs leading-relaxed text-tdim">
                      {layer.detail}
                    </div>
                  </div>
                </motion.div>

                {/* connector */}
                {!isLast && (
                  <div
                    className="flex h-9 items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="relative flex h-full w-px items-center justify-center bg-line">
                      <motion.span
                        className="absolute h-2 w-2 rounded-full bg-cyan"
                        animate={
                          reduce
                            ? undefined
                            : { y: [-12, 12], opacity: [0, 1, 0] }
                        }
                        transition={{
                          duration: 1.4,
                          delay: i * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="absolute -bottom-1 h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-line" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
