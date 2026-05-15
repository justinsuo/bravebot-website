"use client";

import { useState } from "react";
import { Section, SectionHeading, GlassCard } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { useCases, type UseCase } from "@/data/bravebot";

/* Labeled rows shared between desktop + mobile layouts. */
const rows: { key: keyof UseCase; label: string; dot: string; text: string }[] = [
  { key: "problem", label: "Problem", dot: "bg-crit", text: "text-crit" },
  { key: "sensing", label: "Sensing method", dot: "bg-cyan", text: "text-cyan-bright" },
  { key: "earlyWarning", label: "Early-warning advantage", dot: "bg-orange", text: "text-orange-bright" },
  { key: "outcome", label: "Operational outcome", dot: "bg-ok", text: "text-ok" },
];

function CardBody({ uc }: { uc: UseCase }) {
  return (
    <dl className="space-y-3.5">
      {rows.map((r) => (
        <div key={r.key} className="flex gap-3">
          <span
            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${r.dot}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <dt
              className={`font-mono text-[0.6rem] uppercase tracking-[0.16em] ${r.text}`}
            >
              {r.label}
            </dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-tdim">
              {uc[r.key]}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}

/** "08 · Use Cases" — eight data-center use cases; accordion on mobile, grid on desktop. */
export function UseCaseCards() {
  const [open, setOpen] = useState<string | null>(useCases[0]?.id ?? null);

  return (
    <Section id="usecases" grid>
      <SectionHeading
        eyebrow="08 · Use Cases"
        title="Data Center Use Cases"
        intro="Where BraveBot's multi-sensor patrol turns invisible infrastructure failures into planned, evidence-backed maintenance — across the highest-risk systems in an AI data center."
      />

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => {
          const isOpen = open === uc.id;
          return (
            <Reveal as="li" key={uc.id} delay={i * 0.05}>
              <GlassCard as="article" className="h-full p-5 sm:p-6">
                {/* Mobile: collapsible accordion header */}
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`uc-body-${uc.id}`}
                  onClick={() => setOpen(isOpen ? null : uc.id)}
                  className="flex w-full items-center justify-between gap-3 text-left sm:cursor-default sm:pointer-events-none"
                >
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {uc.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-mono text-cyan transition-transform duration-200 sm:hidden ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Desktop: always expanded. Mobile: collapses. */}
                <div
                  id={`uc-body-${uc.id}`}
                  className={`${isOpen ? "mt-5 block" : "hidden"} sm:mt-5 sm:block`}
                >
                  <CardBody uc={uc} />
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
