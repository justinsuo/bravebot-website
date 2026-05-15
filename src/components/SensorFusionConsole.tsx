"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { sensorIcon } from "@/components/icons";
import { sensors, type Sensor } from "@/data/bravebot";

/* ------------------------------------------------------------------ */
/*  Per-sensor animated visualization panels                          */
/* ------------------------------------------------------------------ */

function AcousticViz({ reduce }: { reduce: boolean }) {
  return (
    <div
      role="img"
      aria-label="Acoustic heatmap with concentric arc rings pulsing outward from a detected source"
      className="relative flex h-full min-h-44 items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 200 160" className="h-full w-full">
        <defs>
          <radialGradient id="ac-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cyan-bright)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="80"
            r="14"
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={
              reduce
                ? { scale: 1.6, opacity: 0.35 }
                : { scale: [0.5, 3.4], opacity: [0.85, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 2.6, repeat: Infinity, delay: i * 0.65, ease: "easeOut" }
            }
            style={{ transformOrigin: "100px 80px" }}
          />
        ))}
        <circle cx="100" cy="80" r="16" fill="url(#ac-core)" />
        <circle cx="100" cy="80" r="4" fill="var(--cyan-bright)" />
      </svg>
    </div>
  );
}

function ThermalViz({ reduce }: { reduce: boolean }) {
  const cols = 9;
  const rows = 6;
  return (
    <div
      role="img"
      aria-label="Thermal grid with a hot gradient blob indicating a rising hotspot"
      className="relative flex h-full min-h-44 items-center justify-center overflow-hidden p-3"
    >
      <div
        className="grid h-full w-full gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => {
          const x = i % cols;
          const y = Math.floor(i / cols);
          const dist = Math.hypot(x - 5.5, y - 2.6);
          const heat = Math.max(0, 1 - dist / 4.4);
          const color =
            heat > 0.66
              ? "var(--crit)"
              : heat > 0.36
                ? "var(--orange)"
                : heat > 0.14
                  ? "var(--blue)"
                  : "var(--blue-deep)";
          return (
            <motion.div
              key={i}
              className="rounded-[2px]"
              style={{ background: color }}
              initial={{ opacity: 0.25 }}
              animate={
                reduce
                  ? { opacity: 0.35 + heat * 0.5 }
                  : { opacity: [0.25 + heat * 0.25, 0.45 + heat * 0.55, 0.25 + heat * 0.25] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 2.4, repeat: Infinity, delay: heat * 0.9, ease: "easeInOut" }
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function GasViz({ reduce }: { reduce: boolean }) {
  const particles = [
    { x: 38, d: 0 },
    { x: 52, d: 0.7 },
    { x: 66, d: 1.3 },
    { x: 90, d: 0.4 },
    { x: 110, d: 1.6 },
    { x: 128, d: 0.95 },
    { x: 150, d: 0.2 },
    { x: 162, d: 1.1 },
  ];
  return (
    <div
      role="img"
      aria-label="Translucent gas particles rising and dispersing from a leak source"
      className="relative flex h-full min-h-44 items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 200 160" className="h-full w-full">
        <line x1="20" y1="142" x2="180" y2="142" stroke="var(--line)" strokeWidth="2" />
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            r={6 + (i % 3) * 2}
            fill="var(--cyan)"
            initial={{ cy: 138, opacity: 0 }}
            animate={
              reduce
                ? { cy: 70, opacity: 0.35 }
                : { cy: [138, 26], opacity: [0, 0.55, 0] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 3.4, repeat: Infinity, delay: p.d, ease: "easeOut" }
            }
          />
        ))}
        <circle cx="100" cy="142" r="6" fill="var(--orange-bright)" />
      </svg>
    </div>
  );
}

function VisualViz({ reduce }: { reduce: boolean }) {
  const boxes = [
    { x: 28, y: 30, w: 52, h: 40, label: "GAUGE", d: 0 },
    { x: 108, y: 56, w: 60, h: 48, label: "DOOR", d: 0.9 },
    { x: 64, y: 96, w: 40, h: 30, label: "TAG", d: 1.7 },
  ];
  return (
    <div
      role="img"
      aria-label="Camera frame with animated bounding boxes locking onto inspection targets"
      className="relative flex h-full min-h-44 items-center justify-center overflow-hidden"
    >
      <svg viewBox="0 0 200 160" className="h-full w-full">
        <rect x="8" y="8" width="184" height="144" fill="none" stroke="var(--line)" strokeWidth="2" rx="4" />
        <path d="M14 8 L14 14 L8 14 M186 8 L186 14 L192 14 M14 152 L14 146 L8 146 M186 152 L186 146 L192 146"
          stroke="var(--cyan)" strokeWidth="2" fill="none" />
        {boxes.map((b, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 1.25 }}
            animate={
              reduce
                ? { opacity: 1, scale: 1 }
                : { opacity: [0, 1, 1, 0], scale: [1.25, 1, 1, 1] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 3.6, repeat: Infinity, delay: b.d, times: [0, 0.18, 0.82, 1] }
            }
            style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
          >
            <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="var(--cyan)" fillOpacity="0.08"
              stroke="var(--orange-bright)" strokeWidth="1.6" />
            <rect x={b.x} y={b.y - 12} width={b.label.length * 7 + 8} height="11" fill="var(--orange)" />
            <text x={b.x + 4} y={b.y - 3.5} fontSize="8" fontFamily="monospace" fill="#000" fontWeight="700">
              {b.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

function SensorViz({ icon, reduce }: { icon: Sensor["icon"]; reduce: boolean }) {
  switch (icon) {
    case "acoustic":
      return <AcousticViz reduce={reduce} />;
    case "thermal":
      return <ThermalViz reduce={reduce} />;
    case "gas":
      return <GasViz reduce={reduce} />;
    case "visual":
      return <VisualViz reduce={reduce} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function SensorFusionConsole() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sensor = sensors[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % sensors.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + sensors.length) % sensors.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = sensors.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="sensors" grid>
      <SectionHeading
        eyebrow="04 · Sensor Fusion"
        title="Four-Sensor Fusion"
        intro="Acoustic, thermal, gas and visual sensing run together on every patrol — each one catches a class of failure the others, and conventional monitoring, cannot."
      />

      <Reveal>
        <div
          role="tablist"
          aria-label="Sensor stack"
          aria-orientation="horizontal"
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {sensors.map((s, i) => {
            const Icon = sensorIcon[s.icon];
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`sensor-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`sensor-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKeyDown}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                  selected
                    ? "border-cyan/50 bg-cyan/10 text-cyan-bright glow-cyan"
                    : "border-line bg-panel-2 text-tdim hover:border-cyan/30 hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span className="text-sm font-semibold">{s.name}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-6">
        <div
          role="tabpanel"
          id={`sensor-panel-${sensor.id}`}
          aria-labelledby={`sensor-tab-${sensor.id}`}
          tabIndex={0}
        >
          <GlassCard className="overflow-hidden">
            <div className="grid gap-px md:grid-cols-[1.15fr_1fr]">
              {/* Detail column */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-2">
                  <Tag tone="cyan">{sensor.expert}</Tag>
                </div>
                <h3 className="mt-3 text-xl font-bold leading-snug text-foreground sm:text-2xl">
                  {sensor.tagline}
                </h3>

                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-tfaint">
                  Detects
                </p>
                <ul className="mt-2 space-y-1.5">
                  {sensor.detects.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-tdim">
                      <span
                        aria-hidden
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-cyan/50 bg-cyan/10 text-[10px] text-cyan-bright"
                      >
                        ✓
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-line bg-void/50 p-3.5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider text-orange-bright">
                      What humans miss
                    </p>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-tdim">
                      {sensor.humansMiss}
                    </p>
                  </div>
                  <div className="rounded-lg border border-line bg-void/50 p-3.5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider text-orange-bright">
                      What fixed sensors miss
                    </p>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-tdim">
                      {sensor.fixedMiss}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visualization + scenario column */}
              <div className="flex flex-col gap-px bg-line/40">
                <div className="bg-void/60 p-2">
                  <SensorViz icon={sensor.icon} reduce={reduce} />
                </div>
                <div className="flex-1 bg-panel/80 p-6">
                  <p className="font-mono text-[0.62rem] uppercase tracking-wider text-cyan">
                    Example detection
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {sensor.scenario}
                  </p>
                  <p className="mt-4 border-t border-line pt-3 font-mono text-[0.72rem] leading-relaxed text-tfaint">
                    {sensor.spec}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Reveal>
    </Section>
  );
}
