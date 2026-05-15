"use client";

/**
 * StorySection — the four-state explainer as a calm, normal section.
 * Cards fade in once on scroll (a simple transition), no pinning, no
 * scrubbed scroll animation.
 */

import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

export function StorySection() {
  const { heading, states } = landing.story;

  return (
    <section id="story" className="relative border-t border-line px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <GsapReveal className="max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.26em] text-cyan-bright">
            How it works
          </span>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl md:text-[2.9rem]">
            {heading}
          </h2>
        </GsapReveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {states.map((state) => (
            <GsapReveal key={state.tag}>
              <article className="h-full bg-void p-7 md:p-9">
                <span className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-bright">
                  {state.tag}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {state.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-tdim sm:text-base">
                  {state.body}
                </p>
              </article>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
