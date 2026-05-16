"use client";

/**
 * Technical / transparency section.
 * Left: the on-edge pipeline, revealed step by step on scroll.
 * Right: a code-style output block.
 */

import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

export function TechnicalSection() {
  const { heading, intro, pipeline, code } = landing.technical;

  return (
    <section id="technical" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <GsapReveal className="max-w-2xl">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.9rem]">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tdim sm:text-lg">
            {intro}
          </p>
        </GsapReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* pipeline */}
          <ol className="space-y-2.5">
            {pipeline.map((p, i) => (
              <GsapReveal key={p.step} delay={i * 0.07} y={22}>
                <li className="flex items-center gap-4 rounded-xl border border-line bg-panel/70 p-4 transition-colors hover:border-cyan/40">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan/12 text-sm font-semibold text-cyan-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-semibold text-foreground">{p.step}</div>
                    <div className="mt-0.5 text-sm text-tdim">{p.detail}</div>
                  </div>
                </li>
              </GsapReveal>
            ))}
          </ol>

          {/* code block */}
          <GsapReveal y={36}>
            <div className="overflow-hidden rounded-xl border border-line bg-abyss">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-crit/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-ok/70" />
                <span className="ml-2 font-mono text-[0.7rem] text-tfaint">
                  bravebot · edge inference
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed">
                <code>
                  {code.map((line, i) => (
                    <span key={i} className="block">
                      <span className="mr-4 select-none text-tfaint/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={
                          line.includes('"')
                            ? "text-cyan-bright"
                            : line.startsWith("alert")
                              ? "text-foreground"
                              : "text-tdim"
                        }
                      >
                        {line || " "}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
}
