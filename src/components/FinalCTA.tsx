"use client";

import { CtaButton } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { BraveBotSVG } from "@/components/BraveBotSVG";
import { finalCta, navSections } from "@/data/bravebot";

/* First CTA is the primary action; the rest are lower-emphasis. */
const ctaVariants = ["primary", "secondary", "ghost"] as const;

/** Closing call-to-action and site footer. */
export function FinalCTA() {
  const year = new Date().getFullYear();

  return (
    <section id="cta" className="relative scroll-mt-20 bg-techgrid">
      {/* ===== Closing CTA ===== */}
      <div className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-32">
        {/* glow + faint robot backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-orange/10 blur-[120px]" />
          <div className="anim-float absolute right-[6%] top-1/2 hidden h-[26rem] -translate-y-1/2 opacity-[0.14] lg:block">
            <BraveBotSVG
              className="h-full"
              title="BraveBot wheel-legged inspection robot — concept visualization"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-4xl text-center">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-orange-bright">
              Vigiles Robotics · BraveBot
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-gradient">{finalCta.headline}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-tdim sm:text-lg">
              See the multimodal sensor stack, the edge-AI reasoning layer, and
              the wheel-legged platform in a guided walkthrough.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {finalCta.buttons.map((label, i) => (
                <CtaButton
                  key={label}
                  href="#"
                  variant={ctaVariants[i] ?? "ghost"}
                  className="w-full sm:w-auto"
                >
                  {label}
                </CtaButton>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className="relative border-t border-line bg-abyss/80 px-5 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* branding */}
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-orange" aria-hidden="true" />
                <span className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-foreground">
                  Vigiles Robotics
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-tdim">
                BraveBot — embodied AI for autonomous infrastructure
                inspection in AI data centers and harsh industrial sites.
              </p>
            </div>

            {/* section nav */}
            <nav aria-label="Footer section navigation">
              <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-tfaint">
                Explore
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
                {navSections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm text-tdim transition-colors hover:text-cyan-bright"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* disclaimer */}
          <div className="mt-10 rounded-xl border border-line bg-panel/60 p-4">
            <p className="text-xs leading-relaxed text-tfaint">
              <span className="font-mono uppercase tracking-[0.16em] text-tdim">
                Disclaimer ·{" "}
              </span>
              All robot illustrations and renders on this site are concept
              visualizations, not photographs of a finished product. Technical
              specifications are preliminary and subject to engineering
              verification before publication or deployment.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-line-soft pt-6 text-xs text-tfaint sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Vigiles Robotics. All rights reserved.</p>
            <p className="font-mono uppercase tracking-[0.14em]">
              BraveBot · Concept inspection platform
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
