"use client";

/**
 * RobotExplorer — interactive 3D anatomy section.
 *
 * Renders the BraveBot model in interactive mode (orbit + click). Picking a
 * part in 3D, or a row from the list, selects the matching hotspot: its
 * parts highlight in the scene and its explanation shows in the panel.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

const RobotScene = dynamic(
  () => import("./RobotScene").then((m) => m.RobotScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-56 w-56 rounded-full bg-cyan/15 blur-[80px]" />
      </div>
    ),
  },
);

export function RobotExplorer() {
  const hotspots = landing.robotHotspots;
  const [selectedId, setSelectedId] = useState<string>(hotspots[0].id);
  const current = hotspots.find((h) => h.id === selectedId) ?? hotspots[0];

  const handlePick = (partId: string) => {
    const hit = hotspots.find((h) => (h.parts as readonly string[]).includes(partId));
    if (hit) setSelectedId(hit.id);
  };

  return (
    <section id="anatomy" className="relative border-t border-line px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto w-full max-w-6xl">
        <GsapReveal className="max-w-2xl">
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-[2.9rem]">
            {landing.explorer.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-tdim sm:text-lg">
            {landing.explorer.intro}
          </p>
        </GsapReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.45fr_1fr]">
          {/* interactive 3D viewport */}
          <div className="relative h-[58vh] min-h-[420px] overflow-hidden rounded-2xl border border-line bg-abyss">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 48%, rgba(61,109,251,0.14), transparent 72%)",
              }}
            />
            <RobotScene
              interactive
              highlighted={current.parts as unknown as string[]}
              onPick={handlePick}
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-tfaint">
              Drag to orbit · scroll to zoom · click a part
            </div>
          </div>

          {/* selected detail + hotspot list */}
          <div className="flex flex-col gap-4">
            {/* detail card */}
            <article className="rounded-xl border border-line bg-panel p-5">
              <span className="text-xs uppercase tracking-[0.14em] text-tfaint">
                Selected component
              </span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                {current.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-tdim">{current.body}</p>
            </article>

            {/* hotspot list — one seamless divided panel */}
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {hotspots.map((h) => {
                const active = h.id === selectedId;
                return (
                  <li key={h.id} className="flex">
                    <button
                      type="button"
                      onClick={() => setSelectedId(h.id)}
                      aria-pressed={active}
                      className={`flex w-full items-center px-4 py-3 text-left text-sm transition-colors ${
                        active
                          ? "bg-cyan/10 font-medium text-cyan-bright"
                          : "bg-void text-tdim hover:bg-panel-2 hover:text-foreground"
                      }`}
                    >
                      {h.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
