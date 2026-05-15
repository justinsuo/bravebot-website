"use client";

import { useState } from "react";
import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { calculator } from "@/data/bravebot";

/* Compact currency formatter — $1.2M / $250k / $980. */
function fmtCurrency(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `$${v >= 10 ? Math.round(v) : v.toFixed(1)}M`;
  }
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

interface SliderDef {
  key: "coolingCost" | "setpointIncrease" | "racks" | "outageCostPerHour" | "avoidedIncidents";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

const sliders: SliderDef[] = [
  {
    key: "coolingCost",
    label: "Facility cooling energy cost (annual)",
    min: 100_000,
    max: 5_000_000,
    step: 50_000,
    format: fmtCurrency,
  },
  {
    key: "setpointIncrease",
    label: "Ambient setpoint increase",
    min: 0,
    max: 5,
    step: 0.5,
    format: (v) => `${v.toFixed(1)} °C`,
  },
  {
    key: "racks",
    label: "Number of racks monitored",
    min: 20,
    max: 2_000,
    step: 20,
    format: (v) => `${v.toLocaleString()} racks`,
  },
  {
    key: "outageCostPerHour",
    label: "Estimated outage cost per hour",
    min: 10_000,
    max: 1_000_000,
    step: 10_000,
    format: fmtCurrency,
  },
  {
    key: "avoidedIncidents",
    label: "Avoided incidents per year",
    min: 0,
    max: 10,
    step: 1,
    format: (v) => `${v} / year`,
  },
];

/** "10 · ROI Estimate" — interactive PUE / ROI calculator. */
export function PUECalculator() {
  const [values, setValues] = useState({
    coolingCost: calculator.defaults.coolingCost,
    setpointIncrease: calculator.defaults.setpointIncrease,
    racks: calculator.defaults.racks,
    outageCostPerHour: calculator.defaults.outageCostPerHour,
    avoidedIncidents: calculator.defaults.avoidedIncidents,
  });

  const set = (key: SliderDef["key"], v: number) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  /* Derived outputs. */
  const coolingReduction =
    values.coolingCost * calculator.coolingPerDegreeC * values.setpointIncrease;
  const coolingReductionPct =
    calculator.coolingPerDegreeC * values.setpointIncrease * 100;
  const downtimeAvoided =
    values.outageCostPerHour *
    calculator.defaults.avoidedHoursPerIncident *
    values.avoidedIncidents;
  const totalValue = coolingReduction + downtimeAvoided;

  const outputs: { label: string; value: string; tone: "cyan" | "orange" | "ok" }[] = [
    {
      label: `Cooling energy reduction — est. ${coolingReductionPct.toFixed(0)}%`,
      value: fmtCurrency(coolingReduction),
      tone: "cyan",
    },
    {
      label: `Downtime avoided — ${calculator.defaults.avoidedHoursPerIncident} h / incident`,
      value: fmtCurrency(downtimeAvoided),
      tone: "orange",
    },
  ];

  return (
    <Section id="roi" grid>
      <SectionHeading
        eyebrow="10 · ROI Estimate"
        title="ROI / PUE Calculator"
        intro="Model the annual value of continuous thermal mapping and early-precursor detection. Adjust the inputs to your facility — every figure below is a planning estimate, not a guarantee."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Inputs */}
        <Reveal>
          <GlassCard className="h-full p-5 sm:p-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-bright">
              Facility inputs
            </h3>
            <div className="mt-5 space-y-6">
              {sliders.map((s) => {
                const val = values[s.key];
                return (
                  <div key={s.key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <label
                        htmlFor={`roi-${s.key}`}
                        className="text-sm font-medium text-foreground"
                      >
                        {s.label}
                      </label>
                      <span
                        aria-live="polite"
                        className="font-mono text-sm font-bold text-cyan-bright"
                      >
                        {s.format(val)}
                      </span>
                    </div>
                    <input
                      id={`roi-${s.key}`}
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={val}
                      onChange={(e) => set(s.key, Number(e.target.value))}
                      className="mt-2.5 w-full accent-orange"
                      aria-valuetext={s.format(val)}
                    />
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </Reveal>

        {/* Outputs */}
        <Reveal delay={0.08}>
          <GlassCard className="flex h-full flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-orange-bright">
                Estimated annual value
              </h3>
              <Tag tone="warn">Estimate</Tag>
            </div>

            {/* Headline total */}
            <div className="mt-4 rounded-xl border border-orange/35 bg-orange/[0.07] p-5">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-tfaint">
                Total estimated annual value
              </div>
              <div className="mt-1 font-mono text-4xl font-bold text-gradient sm:text-5xl">
                {fmtCurrency(totalValue)}
              </div>
              <div className="mt-1 text-xs text-tfaint">
                Across {values.racks.toLocaleString()} monitored racks · estimate only
              </div>
            </div>

            {/* Output breakdown */}
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {outputs.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-line bg-panel/70 p-4"
                >
                  <dt className="text-xs leading-snug text-tdim">{o.label}</dt>
                  <dd
                    className={`mt-1.5 font-mono text-2xl font-bold ${
                      o.tone === "cyan"
                        ? "text-cyan-bright"
                        : "text-orange-bright"
                    }`}
                  >
                    {o.value}
                  </dd>
                  <dd className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-tfaint">
                    Estimate
                  </dd>
                </div>
              ))}
            </dl>

            {/* Payback narrative */}
            <p className="mt-4 rounded-xl border border-cyan/25 bg-cyan/[0.05] p-4 text-sm leading-relaxed text-tdim">
              Raising the ambient setpoint by{" "}
              <span className="font-semibold text-cyan-bright">
                {values.setpointIncrease.toFixed(1)} °C
              </span>{" "}
              with verified thermal headroom trims roughly{" "}
              <span className="font-semibold text-cyan-bright">
                {coolingReductionPct.toFixed(0)}%
              </span>{" "}
              of cooling spend (~{fmtCurrency(coolingReduction)}), while avoiding{" "}
              <span className="font-semibold text-orange-bright">
                {values.avoidedIncidents}
              </span>{" "}
              incident{values.avoidedIncidents === 1 ? "" : "s"} a year protects an
              estimated{" "}
              <span className="font-semibold text-orange-bright">
                {fmtCurrency(downtimeAvoided)}
              </span>{" "}
              in downtime — a combined{" "}
              <span className="font-semibold text-foreground">
                {fmtCurrency(totalValue)}
              </span>{" "}
              of estimated annual value.
            </p>

            {/* Disclaimer */}
            <p className="mt-auto pt-4 text-xs leading-relaxed text-tfaint">
              <span className="font-mono uppercase tracking-wider text-warn">
                Estimate disclaimer ·{" "}
              </span>
              {calculator.disclaimer}
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
