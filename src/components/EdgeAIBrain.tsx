"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { AcousticIcon, ThermalIcon, GasIcon, VisualIcon, ChipIcon, BoltIcon } from "@/components/icons";
import { edgeAI } from "@/data/bravebot";

const inputIcons = [AcousticIcon, ThermalIcon, GasIcon, VisualIcon];

function Connector({ reduce, delay }: { reduce: boolean; delay: number }) {
  return (
    <div className="flex items-center justify-center py-3" aria-hidden>
      <svg viewBox="0 0 200 32" className="h-8 w-40" preserveAspectRatio="none">
        <line x1="100" y1="0" x2="100" y2="32" stroke="var(--line)" strokeWidth="2" />
        <motion.line
          x1="100"
          y1="0"
          x2="100"
          y2="32"
          stroke="var(--cyan)"
          strokeWidth="2"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6, delay }}
        />
        {!reduce && (
          <motion.circle
            r="3"
            fill="var(--cyan-bright)"
            initial={{ cx: 100, cy: 0 }}
            animate={{ cy: [0, 32] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay }}
          />
        )}
        <path d="M94 24 L100 32 L106 24" fill="none" stroke="var(--cyan)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function EdgeAIBrain() {
  const reduce = useReducedMotion() ?? false;

  return (
    <Section id="brain" grid>
      <SectionHeading
        eyebrow="06 · Edge AI"
        title="Edge AI Brain · MoE Reasoning"
        intro="A multimodal model fuses every sensor stream on-board, routes findings to specialized experts, and emits human-readable diagnoses — no cloud, no data egress, no waiting."
      />

      <Reveal>
        <GlassCard className="p-6 sm:p-8">
          {/* Layer 1 — inputs */}
          <p className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-tfaint">
            Sensor inputs
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {edgeAI.inputs.map((input, i) => {
              const Icon = inputIcons[i];
              return (
                <motion.div
                  key={input}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.08 }}
                  className="flex items-center gap-2.5 rounded-xl border border-cyan/30 bg-cyan/5 px-3 py-3"
                >
                  <Icon className="h-5 w-5 shrink-0 text-cyan-bright" aria-hidden />
                  <span className="text-sm font-medium text-foreground">{input}</span>
                </motion.div>
              );
            })}
          </div>

          <Connector reduce={reduce} delay={0.15} />

          {/* Layer 2 — center node */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-cyan/50 bg-cyan/10 px-6 py-5 text-center glow-cyan"
          >
            <ChipIcon className="h-8 w-8 text-cyan-bright anim-float" aria-hidden />
            <p className="mt-2 text-lg font-bold text-cyan-bright">Edge Multimodal AI</p>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-tdim">
              Time-aligned fusion of all four sensor streams into one situational model.
            </p>
          </motion.div>

          <Connector reduce={reduce} delay={0.3} />

          {/* Layer 3 — experts */}
          <p className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-tfaint">
            Expert routing
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {edgeAI.experts.map((expert, i) => (
              <motion.div
                key={expert}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.07 }}
                className="flex items-center gap-2 rounded-xl border border-orange/30 bg-orange/5 px-3 py-3"
              >
                <BoltIcon className="h-4 w-4 shrink-0 text-orange-bright" aria-hidden />
                <span className="text-[0.8rem] font-medium leading-tight text-foreground">{expert}</span>
              </motion.div>
            ))}
          </div>

          <Connector reduce={reduce} delay={0.4} />

          {/* Layer 4 — outputs */}
          <p className="mb-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.2em] text-tfaint">
            Outputs
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {edgeAI.outputs.map((output, i) => (
              <motion.span
                key={output}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.06 }}
                className="rounded-lg border border-line bg-panel-2 px-3 py-2 text-[0.78rem] font-medium text-foreground"
              >
                {output}
              </motion.span>
            ))}
          </div>
        </GlassCard>
      </Reveal>

      {/* Principles */}
      <Reveal delay={0.1} className="mt-6">
        <div className="flex flex-wrap gap-2">
          {edgeAI.principles.map((p) => (
            <Tag key={p} tone="cyan">
              {p}
            </Tag>
          ))}
        </div>
      </Reveal>

      {/* Sample alert */}
      <Reveal delay={0.15} className="mt-6">
        <GlassCard className="overflow-hidden" as="article">
          <div className="flex items-center gap-2 border-b border-orange/40 bg-orange/15 px-5 py-3">
            <span className="anim-blink h-2.5 w-2.5 rounded-full bg-orange-bright" aria-hidden />
            <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-orange-bright">
              {edgeAI.sampleAlert.title}
            </h3>
            <span className="ml-auto font-mono text-[0.6rem] uppercase tracking-wider text-tfaint">
              Edge AI · on-board
            </span>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-base font-semibold text-foreground">{edgeAI.sampleAlert.body}</p>
            <ul className="mt-4 space-y-2">
              {edgeAI.sampleAlert.lines.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 rounded-lg border border-line bg-void/50 px-3 py-2.5"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
                  <span className="font-mono text-[0.8rem] leading-relaxed text-tdim">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
