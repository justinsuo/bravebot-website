"use client";

import { Section, SectionHeading, GlassCard, ConfidenceBadge } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { specs, verifyBeforePublishing, type Confidence } from "@/data/bravebot";

/* The four honesty levels, in legend order, with a short engineering definition. */
const confidenceLegend: { confidence: Confidence; description: string }[] = [
  {
    confidence: "confirmed",
    description: "Base specification, treated as a fixed design parameter.",
  },
  {
    confidence: "estimated",
    description: "A modelled or projected figure, not yet bench-verified.",
  },
  {
    confidence: "optional",
    description: "Available only in a specific sensor or payload configuration.",
  },
  {
    confidence: "config-dependent",
    description: "Varies with the hardware or payload build that ships.",
  },
];

/** "12 · Technical Specs" — specs table, confidence legend, and a pre-publish verification callout. */
export function SpecsTable() {
  return (
    <Section id="specs" grid>
      <SectionHeading
        eyebrow="12 · Technical Specs"
        title="Technical Specifications"
        intro="BraveBot is a concept inspection platform. Every figure below is tagged with a confidence level so claims stay honest — fixed design parameters, projected estimates, and configuration-dependent values are clearly separated."
      />

      {/* ===== Desktop table ===== */}
      <Reveal>
        <GlassCard className="hidden overflow-hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              BraveBot technical specifications with confidence levels
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cyan-bright"
                >
                  Specification
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cyan-bright"
                >
                  Value
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right font-mono text-[0.66rem] uppercase tracking-[0.18em] text-cyan-bright"
                >
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr
                  key={spec.label}
                  className="border-b border-line-soft last:border-0 transition-colors hover:bg-cyan/5"
                >
                  <th
                    scope="row"
                    className="px-6 py-3.5 text-sm font-medium text-foreground"
                  >
                    {spec.label}
                  </th>
                  <td className="px-6 py-3.5 font-mono text-sm text-tdim">
                    {spec.value}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <ConfidenceBadge confidence={spec.confidence} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </Reveal>

      {/* ===== Mobile stacked cards ===== */}
      <ul className="space-y-3 md:hidden">
        {specs.map((spec, i) => (
          <Reveal as="li" key={spec.label} delay={i * 0.03}>
            <GlassCard className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {spec.label}
                </h3>
                <ConfidenceBadge confidence={spec.confidence} />
              </div>
              <p className="mt-1.5 font-mono text-sm text-tdim">{spec.value}</p>
            </GlassCard>
          </Reveal>
        ))}
      </ul>

      {/* ===== Confidence legend ===== */}
      <Reveal>
        <div className="mt-8 rounded-2xl border border-line bg-panel/70 p-5 sm:p-6">
          <h3 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-tdim">
            Confidence levels
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {confidenceLegend.map((item) => (
              <div key={item.confidence} className="flex items-start gap-3">
                <dt className="shrink-0">
                  <ConfidenceBadge confidence={item.confidence} />
                </dt>
                <dd className="text-sm leading-relaxed text-tdim">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* ===== Verify-before-publishing callout ===== */}
      <Reveal>
        <div className="mt-6 rounded-2xl border border-orange/40 bg-orange/[0.07] p-5 glow-orange sm:p-6">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-orange/50 bg-orange/15 font-mono text-sm font-bold text-orange-bright"
              aria-hidden="true"
            >
              !
            </span>
            <h3 className="text-base font-semibold text-orange-bright sm:text-lg">
              Verify before publishing
            </h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-tdim">
            Open engineering items that must be confirmed against the shipping
            hardware before any of these specifications are published as
            marketing claims.
          </p>
          <ul className="mt-4 space-y-2.5">
            {verifyBeforePublishing.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
