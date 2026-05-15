"use client";

/** Integrations grid — smooth staggered reveal of protocol/system chips. */

import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

export function SocialProof() {
  const { heading, intro, items } = landing.integrations;

  return (
    <section
      id="integrations"
      className="relative border-y border-line bg-abyss px-5 py-28 sm:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <GsapReveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.6rem]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tdim sm:text-lg">
            {intro}
          </p>
        </GsapReveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {items.map((name, i) => (
            <GsapReveal key={name} delay={(i % 5) * 0.06} y={28}>
              <div className="group flex h-20 items-center justify-center rounded-xl border border-line bg-void transition-colors duration-300 hover:border-cyan/45 hover:bg-panel">
                <span className="text-sm font-medium text-tdim transition-colors group-hover:text-foreground">
                  {name}
                </span>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
