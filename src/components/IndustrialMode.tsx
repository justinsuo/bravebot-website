"use client";

import { Section, SectionHeading, GlassCard, Tag } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { ModeToggle } from "@/components/ModeToggle";
import { useMode } from "@/components/ModeContext";
import { industrialFeatures, otcNote, modes } from "@/data/bravebot";

/** "09 · Industrial & OTC" — industrial / OTC mode features, toggle, and OTC disclaimer. */
export function IndustrialMode() {
  const { mode, setMode } = useMode();
  const isActive = mode === "industrial";
  const copy = modes.industrial;
  const alt = modes.datacenter;

  return (
    <Section id="industrial" grid>
      <SectionHeading
        eyebrow="09 · Industrial & OTC"
        title="Industrial / OTC Mode"
        intro="BraveBot ships in two configurations. The mode toggle switches every section of this page between AI Data Center Mode and Industrial & OTC Mode — same wheel-legged platform and edge-AI fusion stack, retuned sensing and integrations for harsh industrial inspection."
      />

      {/* Mode toggle + active state */}
      <Reveal>
        <div
          className={`flex flex-col gap-5 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:p-6 ${
            isActive
              ? "border-orange/45 bg-orange/[0.07] glow-orange"
              : "border-line bg-panel/70"
          }`}
        >
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-tfaint">
                Operating mode
              </span>
              {isActive ? (
                <Tag tone="orange">Active</Tag>
              ) : (
                <Tag tone="neutral">Alternate configuration</Tag>
              )}
            </div>
            <p className="text-sm leading-relaxed text-tdim">
              {isActive ? copy.tagline : alt.tagline}{" "}
              {isActive ? (
                <span className="text-orange-bright">{copy.environment}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("industrial")}
                  className="font-semibold text-orange-bright underline decoration-orange/50 underline-offset-2 hover:decoration-orange"
                >
                  Switch to Industrial &amp; OTC Mode
                </button>
              )}
            </p>
          </div>
          <div className="shrink-0">
            <ModeToggle />
          </div>
        </div>
      </Reveal>

      {/* Industrial / OTC focus strip */}
      <Reveal delay={0.05}>
        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-panel/70 p-4">
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-orange-bright">
              Gas focus
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-tdim">{copy.gasFocus}</dd>
          </div>
          <div className="rounded-xl border border-line bg-panel/70 p-4">
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-orange-bright">
              Integrations
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-tdim">{copy.integrations}</dd>
          </div>
        </dl>
      </Reveal>

      {/* Feature grid */}
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industrialFeatures.map((f, i) => (
          <Reveal as="li" key={f.title} delay={i * 0.04}>
            <GlassCard
              as="article"
              className={`h-full p-5 transition-colors ${
                isActive ? "border-orange/25" : ""
              }`}
            >
              <h3 className="flex items-start gap-2 text-sm font-semibold text-foreground">
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? "bg-orange" : "bg-cyan"
                  }`}
                  aria-hidden="true"
                />
                {f.title}
              </h3>
              <p className="mt-2 pl-3.5 text-sm leading-relaxed text-tdim">
                {f.detail}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </ul>

      {/* OTC disclaimer callout */}
      <Reveal delay={0.06}>
        <aside
          role="note"
          aria-label="OTC configuration disclaimer"
          className="mt-6 flex gap-3.5 rounded-2xl border border-orange/45 bg-orange/[0.07] p-5 sm:p-6"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-orange/50 font-mono text-sm font-bold text-orange-bright"
          >
            !
          </span>
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-orange-bright">
              OTC technical sheet — related, not identical
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-tdim">{otcNote}</p>
          </div>
        </aside>
      </Reveal>
    </Section>
  );
}
