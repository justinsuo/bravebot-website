"use client";

import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { comparison } from "@/data/bravebot";

/* The data export keys for the three approach columns, in display order. */
const cellKeys = ["manual", "fixed", "bravebot"] as const;
type CellKey = (typeof cellKeys)[number];

/** "14 · Comparison" — BraveBot vs. manual patrol and fixed sensors. */
export function ComparisonTable() {
  return (
    <Section id="compare" grid>
      <SectionHeading
        eyebrow="14 · Comparison"
        title="How BraveBot Compares"
        intro="Manual patrols and fixed sensors each leave gaps — in coverage, timing, and the ability to localize a fault. A mobile multi-sensor robot closes them."
      />

      {/* ===== Desktop table ===== */}
      <Reveal>
        <div className="relative hidden md:block">
          <table className="w-full border-separate border-spacing-0">
            <caption className="sr-only">
              Capability comparison between manual patrol, fixed sensors and
              BraveBot
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="rounded-tl-2xl border border-line bg-panel px-5 py-4 text-left font-mono text-[0.66rem] uppercase tracking-[0.16em] text-cyan-bright"
                >
                  Capability
                </th>
                {comparison.columns.map((col, i) => {
                  const isBot = cellKeys[i] === "bravebot";
                  return (
                    <th
                      key={col}
                      scope="col"
                      className={`border-y border-r px-5 py-4 text-left ${
                        isBot
                          ? "border-cyan/50 bg-cyan/10 text-cyan-bright glow-cyan"
                          : "border-line bg-panel text-tdim"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-tight">
                        {col}
                      </span>
                      {isBot && (
                        <span className="ml-2 align-middle">
                          <Tag tone="orange">Recommended</Tag>
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, ri) => {
                const lastRow = ri === comparison.rows.length - 1;
                return (
                  <tr key={row.capability}>
                    <th
                      scope="row"
                      className={`border-x border-b border-line bg-panel/80 px-5 py-4 text-left text-sm font-semibold text-foreground ${
                        lastRow ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      {row.capability}
                    </th>
                    {cellKeys.map((key: CellKey) => {
                      const isBot = key === "bravebot";
                      return (
                        <td
                          key={key}
                          className={`border-b border-r px-5 py-4 align-top text-sm leading-relaxed ${
                            isBot
                              ? "border-cyan/40 bg-cyan/[0.07] font-medium text-foreground"
                              : "border-line text-tdim"
                          }`}
                        >
                          <span className="flex gap-2">
                            <span
                              aria-hidden="true"
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                                isBot ? "bg-cyan-bright" : "bg-tfaint"
                              }`}
                            />
                            <span>{row[key]}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* elevated accent edge on the BraveBot column */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/3 rounded-2xl border border-cyan/30"
          />
        </div>
      </Reveal>

      {/* ===== Mobile stacked cards, grouped by capability ===== */}
      <ul className="space-y-4 md:hidden">
        {comparison.rows.map((row, i) => (
          <Reveal as="li" key={row.capability} delay={i * 0.04}>
            <GlassCard as="article" className="overflow-hidden">
              <h3 className="border-b border-line bg-panel-2 px-4 py-3 text-sm font-semibold text-foreground">
                {row.capability}
              </h3>
              <dl className="divide-y divide-line-soft">
                {cellKeys.map((key: CellKey, ci) => {
                  const isBot = key === "bravebot";
                  return (
                    <div
                      key={key}
                      className={`flex flex-col gap-1 px-4 py-3 ${
                        isBot ? "bg-cyan/[0.07]" : ""
                      }`}
                    >
                      <dt className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[0.6rem] uppercase tracking-[0.16em] ${
                            isBot ? "text-cyan-bright" : "text-tfaint"
                          }`}
                        >
                          {comparison.columns[ci]}
                        </span>
                        {isBot && <Tag tone="orange">Recommended</Tag>}
                      </dt>
                      <dd
                        className={`text-sm leading-relaxed ${
                          isBot ? "font-medium text-foreground" : "text-tdim"
                        }`}
                      >
                        {row[key]}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </GlassCard>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
