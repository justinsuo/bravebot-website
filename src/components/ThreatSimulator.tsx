"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { sensorIcon } from "@/components/icons";
import { useMode } from "@/components/ModeContext";
import { threats, type Threat } from "@/data/bravebot";

const sensorTone: Record<string, string> = {
  acoustic: "border-cyan/50 bg-cyan/10 text-cyan-bright",
  thermal: "border-orange/50 bg-orange/10 text-orange-bright",
  gas: "border-ok/50 bg-ok/10 text-ok",
  visual: "border-warn/50 bg-warn/10 text-warn",
};

function SensorBadge({ sensor }: { sensor: NonNullable<Threat["timeline"][number]["sensor"]> }) {
  const Icon = sensorIcon[sensor];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider ${sensorTone[sensor]}`}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {sensor}
    </span>
  );
}

export function ThreatSimulator() {
  const reduce = useReducedMotion() ?? false;
  const { mode } = useMode();
  const [selectedId, setSelectedId] = useState<string>(threats[0].id);

  const visible = useMemo(
    () => threats.filter((t) => t.mode === mode || t.mode === "both"),
    [mode],
  );

  // Keep selection valid when mode changes the visible set.
  const threat = visible.find((t) => t.id === selectedId) ?? visible[0];

  return (
    <Section id="simulator">
      <SectionHeading
        eyebrow="05 · Threat Simulator"
        title="AI Data Center Threat Simulator"
        intro="Pick a failure scenario and watch how BraveBot catches it — from the first ultrasonic whisper to a risk-scored work order, minutes or weeks before conventional systems would react."
      />

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Threat picker */}
        <Reveal>
          <div role="group" aria-label="Threat scenarios" className="flex flex-col gap-2">
            {visible.map((t) => {
              const selected = t.id === threat.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  aria-pressed={selected}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                    selected
                      ? "border-orange/50 bg-orange/10 text-foreground glow-orange"
                      : "border-line bg-panel-2 text-tdim hover:border-orange/30 hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-semibold">{t.name}</span>
                  {t.mode === "both" && <Tag tone="neutral">Both modes</Tag>}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Threat detail */}
        <Reveal delay={0.08}>
          <GlassCard className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">{threat.name}</h3>
              <SensorBadge sensor={threat.firstSensor} />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                { label: "What happens", body: threat.physical, tone: "text-foreground" },
                { label: "Why conventional systems miss it", body: threat.conventionalMiss, tone: "text-tdim" },
                { label: "What BraveBot does", body: threat.braveBotAction, tone: "text-tdim" },
              ].map((b) => (
                <div key={b.label} className="rounded-lg border border-line bg-void/50 p-3.5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-wider text-cyan">{b.label}</p>
                  <p className={`mt-1.5 text-[0.82rem] leading-relaxed ${b.tone}`}>{b.body}</p>
                </div>
              ))}
            </div>

            {/* Alert card */}
            <div className="mt-5 overflow-hidden rounded-lg border border-crit/50 bg-crit/10">
              <div className="flex items-center gap-2 border-b border-crit/30 bg-crit/15 px-4 py-2">
                <span className="anim-blink h-2 w-2 rounded-full bg-crit" aria-hidden />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-crit">
                  BraveBot Alert
                </span>
              </div>
              <div className="p-4">
                <p className="font-mono text-sm leading-relaxed text-foreground">{threat.alert}</p>
                <div className="mt-3 flex items-start gap-2 border-t border-crit/20 pt-3">
                  <span className="font-mono text-[0.62rem] uppercase tracking-wider text-orange-bright">
                    Action
                  </span>
                  <p className="font-mono text-[0.78rem] leading-relaxed text-tdim">{threat.action}</p>
                </div>
              </div>
            </div>

            {/* Animated timeline */}
            <div className="mt-6">
              <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-wider text-tfaint">
                Detection timeline
              </p>
              <ol
                key={threat.id}
                className="relative flex flex-col gap-3 md:flex-row md:gap-0"
                aria-label={`Detection timeline for ${threat.name}`}
              >
                {threat.timeline.map((step, i) => (
                  <motion.li
                    key={i}
                    className="relative flex gap-3 md:flex-1 md:flex-col md:gap-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* connector + node */}
                    <div className="flex flex-col items-center md:w-full md:flex-row">
                      <span className="z-10 h-3 w-3 shrink-0 rounded-full border-2 border-cyan-bright bg-void md:order-1" />
                      {i < threat.timeline.length - 1 && (
                        <motion.span
                          aria-hidden
                          className="absolute left-[5px] top-3 h-full w-0.5 origin-top-left bg-cyan/40 md:left-auto md:top-[5px] md:h-0.5 md:w-full"
                          initial={{ scaleY: 0, scaleX: 0 }}
                          animate={{ scaleY: 1, scaleX: 1 }}
                          transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.22 + 0.1 }}
                        />
                      )}
                    </div>
                    <div className="pb-1 md:pr-4 md:pt-3">
                      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-wider text-cyan-bright">
                        {step.t}
                      </p>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-tdim">{step.text}</p>
                      {step.sensor && (
                        <div className="mt-1.5">
                          <SensorBadge sensor={step.sensor} />
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
