"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BraveBotSVG } from "@/components/BraveBotSVG";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { useMode } from "@/components/ModeContext";
import { hotspots } from "@/data/bravebot";

/** Interactive Robot Anatomy Explorer — 11 hotspots over the BraveBot illustration. */
export function RobotAnatomyExplorer() {
  const { mode } = useMode();
  const reduce = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(hotspots[0].id);

  const active = hotspots.find((h) => h.id === selectedId) ?? hotspots[0];

  const relevanceLabel =
    mode === "datacenter" ? "Data Center relevance" : "Industrial / OTC relevance";
  const relevanceText = mode === "datacenter" ? active.datacenter : active.industrial;

  return (
    <Section id="anatomy">
      <SectionHeading
        eyebrow="02 · Anatomy"
        title="Interactive Robot Anatomy Explorer"
        intro="Eleven engineered subsystems work together as one inspection platform. Select a hotspot to see what it does, why it matters, and how it changes by deployment mode."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        {/* ===== LEFT — robot with hotspots ===== */}
        <Reveal>
          <div>
            <div className="relative mx-auto aspect-[360/560] w-full max-w-[420px] rounded-2xl border border-line bg-techgrid bg-panel/40 p-3">
              <BraveBotSVG className="h-full w-full" />

              {hotspots.map((h) => {
                const isActive = h.id === active.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedId(h.id)}
                    aria-label={`${h.index}. ${h.name}`}
                    aria-pressed={isActive}
                    className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      {/* pulse ring on the active hotspot */}
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-full border-2 border-orange"
                          aria-hidden="true"
                          style={{
                            transformOrigin: "center",
                            animation: reduce
                              ? undefined
                              : "pulse-ring 1.8s ease-out infinite",
                          }}
                        />
                      )}
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? "border-orange bg-orange text-black ring-2 ring-orange/40 scale-110"
                            : "border-cyan/60 bg-panel/90 text-cyan-bright hover:border-cyan hover:bg-cyan/20 hover:scale-110"
                        }`}
                      >
                        {h.index}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* wrapped name list — easy mobile selection */}
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Robot subsystems">
              {hotspots.map((h) => {
                const isActive = h.id === active.id;
                return (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => setSelectedId(h.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "border-orange/60 bg-orange/15 text-orange-bright"
                        : "border-line bg-panel-2 text-tdim hover:border-cyan/40 hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[0.65rem] opacity-70">
                      {String(h.index).padStart(2, "0")}
                    </span>
                    {h.name}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ===== RIGHT — detail panel ===== */}
        <Reveal delay={0.08}>
          <GlassCard className="h-full p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-orange/50 bg-orange/10 font-mono text-base font-bold text-orange-bright">
                    {String(active.index).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                    {active.name}
                  </h3>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-tdim sm:text-base">
                  {active.summary}
                </p>

                <div className="mt-6 rounded-xl border border-line bg-panel/60 p-4">
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-bright">
                    Why it matters
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {active.whyItMatters}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-tfaint">
                    Failure types addressed
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {active.failureTypes.map((f) => (
                      <Tag key={f} tone="orange">
                        {f}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-cyan/30 bg-cyan/[0.06] p-4">
                  <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-bright">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                    {relevanceLabel}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {relevanceText}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
