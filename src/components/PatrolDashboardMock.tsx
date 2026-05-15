"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { BraveBotSVG } from "@/components/BraveBotSVG";
import { dashboard } from "@/data/bravebot";

/* ---------- helpers ---------------------------------------------------- */

type Sev = "crit" | "warn" | "info";

const sevTone: Record<Sev, { dot: string; text: string; border: string; bg: string }> = {
  crit: { dot: "bg-crit", text: "text-crit", border: "border-crit/45", bg: "bg-crit/10" },
  warn: { dot: "bg-warn", text: "text-warn", border: "border-warn/45", bg: "bg-warn/10" },
  info: { dot: "bg-cyan", text: "text-cyan-bright", border: "border-cyan/45", bg: "bg-cyan/10" },
};

const woState: Record<string, string> = {
  Dispatched: "border-crit/45 bg-crit/10 text-crit",
  Queued: "border-warn/45 bg-warn/10 text-warn",
  Planned: "border-cyan/45 bg-cyan/10 text-cyan-bright",
};

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce;
}

/** Small reusable glass panel with a mono header. */
function Panel({
  title,
  badge,
  children,
  className = "",
}: {
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass flex flex-col rounded-2xl p-4 ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-tfaint">
          {title}
        </h3>
        {badge}
      </div>
      {children}
    </div>
  );
}

/* ---------- camera view ----------------------------------------------- */

function CameraPanel({ reduce }: { reduce: boolean }) {
  const [clock, setClock] = useState("00:00:00");
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-GB", { hour12: false }),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Panel
      title="Live robot camera"
      badge={
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-crit">
          <span className={`h-2 w-2 rounded-full bg-crit ${reduce ? "" : "anim-blink"}`} />
          Rec
        </span>
      }
      className="lg:col-span-2"
    >
      <div
        className="relative aspect-video overflow-hidden rounded-lg border border-line bg-abyss"
        role="img"
        aria-label="Simulated live camera feed from BraveBot with HUD overlay"
      >
        <div className="absolute inset-0 bg-techgrid opacity-60" aria-hidden="true" />
        {/* robot in frame */}
        <BraveBotSVG className="absolute bottom-0 left-1/2 h-[88%] -translate-x-1/2" />
        {/* crosshair */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-cyan/60" />
          <div className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-cyan/60" />
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50" />
          {/* corner brackets */}
          {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-2 border-l border-b", "right-2 bottom-2 border-r border-b"].map(
            (c) => (
              <span key={c} className={`absolute h-4 w-4 border-cyan/70 ${c}`} />
            ),
          )}
        </div>
        {/* HUD text */}
        <div className="absolute left-2 top-2 font-mono text-[0.58rem] uppercase tracking-wider text-cyan-bright">
          CAM-01 · {dashboard.status.zone}
        </div>
        <div className="absolute right-2 bottom-2 font-mono text-[0.58rem] text-cyan-bright">
          {clock}
        </div>
        <div className="absolute left-2 bottom-2 font-mono text-[0.58rem] uppercase tracking-wider text-orange-bright">
          {dashboard.status.mode}
        </div>
      </div>
    </Panel>
  );
}

/* ---------- thermal map ----------------------------------------------- */

function ThermalPanel() {
  /* deterministic pseudo-random heat field with a hot blob near a focal cell */
  const cells = useMemo(() => {
    const cols = 12;
    const rows = 7;
    const hx = 8;
    const hy = 2;
    const out: number[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const d = Math.hypot(x - hx, y - hy);
        const heat = Math.max(0, 1 - d / 5);
        const base = 0.12 + ((x * 7 + y * 13) % 11) / 90;
        out.push(Math.min(1, base + heat * 0.95));
      }
    }
    return { cols, rows, out };
  }, []);

  const heatColor = (v: number) => {
    /* cool blue -> cyan -> orange -> crit red */
    if (v < 0.34) return `rgba(56,214,239,${0.1 + v})`;
    if (v < 0.62) return `rgba(255,145,72,${0.25 + v * 0.5})`;
    return `rgba(240,83,58,${0.4 + v * 0.55})`;
  };

  return (
    <Panel title="Thermal map" badge={<span className="font-mono text-[0.58rem] text-orange-bright">+14 °C peak</span>}>
      <div
        className="grid gap-[3px] rounded-lg border border-line bg-abyss p-1.5"
        style={{ gridTemplateColumns: `repeat(${cells.cols}, 1fr)` }}
        role="img"
        aria-label="Simulated thermal heatmap showing a localized hotspot near a rack"
      >
        {cells.out.map((v, i) => (
          <span
            key={i}
            className="aspect-square rounded-[2px]"
            style={{ background: heatColor(v) }}
          />
        ))}
      </div>
    </Panel>
  );
}

/* ---------- acoustic heatmap ------------------------------------------ */

function AcousticPanel() {
  return (
    <Panel title="Acoustic heatmap" badge={<span className="font-mono text-[0.58rem] text-cyan-bright">42 kHz</span>}>
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-line bg-abyss"
        role="img"
        aria-label="Simulated acoustic heatmap with an ultrasonic source blob"
      >
        <div className="absolute inset-0 bg-techgrid opacity-50" aria-hidden="true" />
        {/* concentric source rings */}
        <div className="relative" style={{ left: "14%", top: "-8%" }}>
          {[64, 46, 30, 16].map((s, i) => (
            <span
              key={s}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: s,
                height: s,
                background:
                  i === 3
                    ? "rgba(240,83,58,0.9)"
                    : `rgba(255,145,72,${0.32 - i * 0.06})`,
                boxShadow: i === 3 ? "0 0 14px rgba(240,83,58,0.7)" : undefined,
              }}
            />
          ))}
        </div>
        <span className="absolute bottom-1.5 left-2 font-mono text-[0.56rem] uppercase tracking-wider text-orange-bright">
          Source localized
        </span>
      </div>
    </Panel>
  );
}

/* ---------- gas trend graph ------------------------------------------- */

function GasPanel({ reduce }: { reduce: boolean }) {
  /* rising-then-noisy trend line */
  const pts = useMemo(() => {
    const n = 24;
    return Array.from({ length: n }, (_, i) => {
      const x = (i / (n - 1)) * 100;
      const trend = 14 + i * 1.5;
      const noise = ((i * 17) % 9) - 4;
      const y = Math.min(70, Math.max(8, trend + noise));
      return { x, y: 70 - y };
    });
  }, []);

  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `0,70 ${line} 100,70`;

  return (
    <Panel title="Gas trend — H₂ / VOC ppm" badge={<span className="font-mono text-[0.58rem] text-warn">Rising</span>}>
      <div className="rounded-lg border border-line bg-abyss p-2">
        <svg
          viewBox="0 0 100 70"
          className="h-24 w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Simulated gas concentration trend graph rising over time"
        >
          <defs>
            <linearGradient id="gasFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbbf24" stopOpacity="0.4" />
              <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[14, 28, 42, 56].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1d2c47" strokeWidth="0.5" />
          ))}
          <polygon points={area} fill="url(#gasFill)" />
          <polyline
            points={line}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={
              reduce
                ? undefined
                : {
                    strokeDasharray: 260,
                    strokeDashoffset: 260,
                    animation: "dash-flow 4s ease-out forwards",
                  }
            }
          />
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill="#fbbf24">
            {!reduce && (
              <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
            )}
          </circle>
        </svg>
      </div>
    </Panel>
  );
}

/* ---------- route / floor map ----------------------------------------- */

function RoutePanel({ reduce }: { reduce: boolean }) {
  const route = dashboard.route;
  /* lay waypoints around a rectangular floor loop */
  const coords = useMemo(() => {
    const n = route.length;
    const pad = 14;
    const w = 100 - pad * 2;
    const h = 100 - pad * 2;
    /* perimeter-ish placement */
    return route.map((label, i) => {
      const frac = i / (n - 1);
      let x: number;
      let y: number;
      if (frac < 0.5) {
        x = pad + (frac / 0.5) * w;
        y = pad;
      } else {
        x = pad + w - ((frac - 0.5) / 0.5) * w;
        y = pad + h;
      }
      /* nudge so it is not a flat line */
      y += i % 2 === 0 ? 0 : (i % 4 === 1 ? -h * 0.32 : h * 0.32);
      return { x, y: Math.min(100 - pad, Math.max(pad, y)), label };
    });
  }, [route]);

  const [seg, setSeg] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setSeg((s) => (s + 1) % coords.length),
      1600,
    );
    return () => window.clearInterval(id);
  }, [reduce, coords.length]);

  const dot = coords[seg];
  const path = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <Panel
      title="Patrol route & robot pose"
      badge={
        <span className="font-mono text-[0.58rem] uppercase tracking-wider text-cyan-bright">
          {dot.label}
        </span>
      }
      className="lg:col-span-2"
    >
      <div className="rounded-lg border border-line bg-abyss p-2">
        <svg
          viewBox="0 0 100 100"
          className="h-44 w-full"
          role="img"
          aria-label="Mini floor map showing BraveBot patrol route and current position"
        >
          {/* floor grid */}
          {[20, 40, 60, 80].map((g) => (
            <g key={g}>
              <line x1={g} y1="6" x2={g} y2="94" stroke="#16223a" strokeWidth="0.5" />
              <line x1="6" y1={g} x2="94" y2={g} stroke="#16223a" strokeWidth="0.5" />
            </g>
          ))}
          {/* route path */}
          <polyline
            points={path}
            fill="none"
            stroke="#38d6ef"
            strokeWidth="1.2"
            strokeOpacity="0.55"
            strokeDasharray="3 2"
            strokeLinecap="round"
          />
          {/* waypoints */}
          {coords.map((c, i) => (
            <g key={c.label}>
              <circle
                cx={c.x}
                cy={c.y}
                r="2"
                fill={i === seg ? "#ff9148" : "#0c1322"}
                stroke={i === seg ? "#ff9148" : "#38d6ef"}
                strokeWidth="1"
              />
              <text
                x={c.x}
                y={c.y - 4}
                textAnchor="middle"
                fontSize="3.4"
                fill="#9fb0c8"
                fontFamily="var(--font-mono)"
              >
                {c.label}
              </text>
            </g>
          ))}
          {/* moving robot dot */}
          <circle cx={dot.x} cy={dot.y} r="3.2" fill="#ff6a1a">
            {!reduce && (
              <animate attributeName="r" values="3.2;5;3.2" dur="1.6s" repeatCount="indefinite" />
            )}
          </circle>
          <circle cx={dot.x} cy={dot.y} r="1.4" fill="#fff" />
        </svg>
      </div>
    </Panel>
  );
}

/* ---------- alerts ----------------------------------------------------- */

function AlertsPanel({ highlight }: { highlight: number }) {
  return (
    <Panel title="Active alerts" badge={<span className="font-mono text-[0.58rem] text-crit">{dashboard.alerts.length}</span>}>
      <ul className="space-y-2">
        {dashboard.alerts.map((a, i) => {
          const t = sevTone[a.sev as Sev];
          const on = i === highlight;
          return (
            <li
              key={a.id}
              className={`rounded-lg border p-2.5 transition-colors ${t.border} ${
                on ? t.bg : "bg-panel/60"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 shrink-0 rounded-full ${t.dot}`} aria-hidden="true" />
                <span className={`font-mono text-[0.6rem] uppercase tracking-wider ${t.text}`}>
                  {a.sev}
                </span>
                <span className="ml-auto font-mono text-[0.58rem] text-tfaint">{a.id}</span>
              </div>
              <p className="mt-1 text-xs leading-snug text-tdim">{a.text}</p>
              <p className="mt-0.5 font-mono text-[0.56rem] uppercase tracking-wider text-tfaint">
                {a.zone}
              </p>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ---------- work orders ----------------------------------------------- */

function WorkOrdersPanel() {
  return (
    <Panel title="Work orders">
      <ul className="space-y-2">
        {dashboard.workOrders.map((w) => (
          <li key={w.id} className="rounded-lg border border-line bg-panel/60 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[0.58rem] text-cyan-bright">{w.id}</span>
              <span
                className={`rounded-full border px-2 py-0.5 font-mono text-[0.54rem] uppercase tracking-wider ${
                  woState[w.state] ?? "border-line text-tdim"
                }`}
              >
                {w.state}
              </span>
            </div>
            <p className="mt-1 text-xs leading-snug text-tdim">{w.text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---------- sensor health --------------------------------------------- */

function SensorHealthPanel() {
  return (
    <Panel title="Sensor health">
      <ul className="grid grid-cols-2 gap-2">
        {dashboard.sensorHealth.map((s) => {
          const ok = s.status === "ok";
          return (
            <li
              key={s.name}
              className="flex items-center gap-2 rounded-lg border border-line bg-panel/60 px-2.5 py-2"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${ok ? "bg-ok" : "bg-crit"}`}
                aria-hidden="true"
              />
              <span className="truncate text-xs text-tdim">{s.name}</span>
              <span
                className={`ml-auto font-mono text-[0.54rem] uppercase ${
                  ok ? "text-ok" : "text-crit"
                }`}
              >
                {s.status}
              </span>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ---------- battery / network status ---------------------------------- */

function StatusPanel() {
  const s = dashboard.status;
  return (
    <Panel title="Battery & network">
      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-wider">
            <span className="text-tfaint">Battery</span>
            <span className="text-ok">{s.battery}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full border border-line bg-abyss">
            <div
              className="h-full rounded-full bg-ok"
              style={{ width: `${s.battery}%` }}
            />
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-xs">
          {[
            { k: "Network", v: s.network },
            { k: "Mode", v: s.mode },
            { k: "Zone", v: s.zone },
            { k: "Risk level", v: s.risk },
          ].map((row) => (
            <div key={row.k} className="rounded-lg border border-line bg-panel/60 px-2.5 py-2">
              <dt className="font-mono text-[0.54rem] uppercase tracking-wider text-tfaint">
                {row.k}
              </dt>
              <dd
                className={`mt-0.5 truncate ${
                  row.k === "Risk level" ? "text-warn" : "text-tdim"
                }`}
              >
                {row.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}

/* ---------- section --------------------------------------------------- */

/** "11 · Live Dashboard" — simulated control-room patrol dashboard. */
export function PatrolDashboardMock() {
  const reduce = usePrefersReducedMotion();
  const [highlight, setHighlight] = useState(0);
  const alertCount = useRef(dashboard.alerts.length);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setHighlight((h) => (h + 1) % alertCount.current),
      2400,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <Section id="dashboard" grid>
      <SectionHeading
        eyebrow="11 · Live Dashboard"
        title="Interactive Patrol Dashboard Mock"
        intro="A simulated control-room view of a BraveBot patrol — live camera with HUD, thermal and acoustic maps, gas trending, route tracking, alerts and auto-generated work orders. Concept visualization, not live data."
      />

      <Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CameraPanel reduce={reduce} />
          <ThermalPanel />
          <AcousticPanel />
          <GasPanel reduce={reduce} />
          <RoutePanel reduce={reduce} />
          <AlertsPanel highlight={highlight} />
          <WorkOrdersPanel />
          <SensorHealthPanel />
          <StatusPanel />
        </div>
      </Reveal>
    </Section>
  );
}
