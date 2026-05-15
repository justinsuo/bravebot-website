"use client";

import { useMode } from "./ModeContext";
import { modes } from "@/data/bravebot";

/** Data Center / Industrial mode switch. */
export function ModeToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useMode();
  return (
    <div
      role="radiogroup"
      aria-label="Operating mode"
      className="inline-flex items-center rounded-full border border-line bg-panel p-1"
    >
      {(["datacenter", "industrial"] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            role="radio"
            aria-checked={active}
            onClick={() => setMode(m)}
            className={`rounded-full px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider transition-colors ${
              active
                ? m === "datacenter"
                  ? "bg-cyan/20 text-cyan-bright glow-cyan"
                  : "bg-orange/20 text-orange-bright glow-orange"
                : "text-tfaint hover:text-tdim"
            }`}
          >
            {compact ? modes[m].shortLabel : modes[m].label}
          </button>
        );
      })}
    </div>
  );
}
