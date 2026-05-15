"use client";

/** Capability cards — staggered GSAP reveal, hover lift. */

import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

export function FeatureGrid() {
  const { heading, intro, cards } = landing.features;

  return (
    <section id="features" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <GsapReveal className="max-w-2xl">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.9rem]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tdim sm:text-lg">
            {intro}
          </p>
        </GsapReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <GsapReveal key={card.title} delay={(i % 3) * 0.08}>
              <article className="group h-full bg-void p-7 transition-colors duration-300 hover:bg-panel">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan transition-transform duration-300 group-hover:scale-150" />
                  <span className="text-xs font-medium text-tdim">{card.kicker}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-tdim">
                  {card.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-block text-cyan-bright opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                >
                  →
                </span>
              </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
