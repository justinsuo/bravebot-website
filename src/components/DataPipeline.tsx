"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading, GlassCard } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { pipeline, integrations } from "@/data/bravebot";

const kindMeta: Record<string, { label: string; tone: string }> = {
  protocol: { label: "Protocols", tone: "border-cyan/40 bg-cyan/10 text-cyan-bright" },
  system: { label: "Facility systems", tone: "border-orange/40 bg-orange/10 text-orange-bright" },
  cmms: { label: "CMMS / EAM", tone: "border-ok/40 bg-ok/10 text-ok" },
  historian: { label: "Historians", tone: "border-warn/40 bg-warn/10 text-warn" },
};
const kindOrder = ["protocol", "system", "cmms", "historian"];

function FlowConnector({ reduce, delay }: { reduce: boolean; delay: number }) {
  return (
    <svg
      viewBox="0 0 64 12"
      className="hidden h-3 w-full shrink-0 self-center lg:block"
      preserveAspectRatio="none"
      aria-hidden
    >
      <line x1="0" y1="6" x2="64" y2="6" stroke="var(--line)" strokeWidth="2" />
      <motion.line
        x1="0"
        y1="6"
        x2="64"
        y2="6"
        stroke="var(--cyan)"
        strokeWidth="2"
        strokeDasharray="8 8"
        initial={{ strokeDashoffset: 0 }}
        animate={reduce ? undefined : { strokeDashoffset: -64 }}
        transition={reduce ? undefined : { duration: 1.1, repeat: Infinity, ease: "linear", delay }}
      />
      <path d="M58 2 L64 6 L58 10" fill="none" stroke="var(--cyan)" strokeWidth="2" />
    </svg>
  );
}

function VerticalConnector({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-6 justify-center lg:hidden" aria-hidden>
      <svg viewBox="0 0 12 24" className="h-6 w-3" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="24" stroke="var(--line)" strokeWidth="2" />
        <motion.line
          x1="6"
          y1="0"
          x2="6"
          y2="24"
          stroke="var(--cyan)"
          strokeWidth="2"
          strokeDasharray="6 6"
          initial={{ strokeDashoffset: 0 }}
          animate={reduce ? undefined : { strokeDashoffset: -48 }}
          transition={reduce ? undefined : { duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

export function DataPipeline() {
  const reduce = useReducedMotion() ?? false;

  return (
    <Section id="pipeline">
      <SectionHeading
        eyebrow="07 · Data Pipeline"
        title="Data Pipeline"
        intro="Every patrol flows through the same eight stages — from a scheduled route to a time-stamped audit record — and lands as a structured event inside the systems your facility already runs."
      />

      {/* Pipeline flow */}
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {pipeline.map((stage, i) => (
            <div key={stage.id} className="contents">
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="lg:flex-1"
              >
                <GlassCard className="h-full p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-cyan/40 bg-cyan/10 font-mono text-[0.72rem] font-bold text-cyan-bright">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-wider text-tfaint">
                      {stage.id}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm font-semibold leading-snug text-foreground">
                    {stage.label}
                  </p>
                  <p className="mt-1 text-[0.76rem] leading-relaxed text-tdim">{stage.detail}</p>
                </GlassCard>
              </motion.div>
              {i < pipeline.length - 1 && (
                <>
                  <FlowConnector reduce={reduce} delay={i * 0.12} />
                  <VerticalConnector reduce={reduce} />
                </>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Integrations */}
      <Reveal delay={0.1} className="mt-12">
        <p className="mb-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-tfaint">
          Integrates with
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {kindOrder.map((kind) => {
            const items = integrations.filter((x) => x.kind === kind);
            if (items.length === 0) return null;
            const meta = kindMeta[kind];
            return (
              <div key={kind} className="rounded-xl border border-line bg-panel-2 p-4">
                <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-wider text-tdim">
                  {meta.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item.name}
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-[0.72rem] font-medium ${meta.tone}`}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
