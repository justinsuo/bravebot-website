"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading, GlassCard } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { BraveBotSVG } from "@/components/BraveBotSVG";
import { imageConcepts, type ImageConcept } from "@/data/bravebot";

/* ------------------------------------------------------------------ */
/*  Concept art — a distinct SVG/CSS illustration per `art` value      */
/* ------------------------------------------------------------------ */

type Art = ImageConcept["art"];

const artLabels: Record<Art, string> = {
  hero: "Concept illustration: BraveBot on patrol in a dark data center aisle",
  leg: "Concept illustration: articulated wheel-leg with actuators and rubber wheel-foot",
  mast: "Concept illustration: multi-sensor mast with acoustic, thermal, gas and visual modules",
  acoustic: "Concept illustration: ultrasonic acoustic heatmap over a coolant leak",
  thermal: "Concept illustration: infrared thermal map of a rack with a flagged hotspot",
  gas: "Concept illustration: battery off-gas plume detected near a UPS cabinet",
  dashboard: "Concept illustration: multimodal AI patrol dashboard interface",
  industrial: "Concept illustration: BraveBot inspecting an industrial plant pipe rack",
  exploded: "Concept illustration: exploded-view diagram of BraveBot subsystems",
  patrolmap: "Concept illustration: top-down data center patrol route map",
};

/** Shared frame so every art piece fills its card consistently. */
function ArtFrame({
  children,
  label,
  tint = "cyan",
}: {
  children: React.ReactNode;
  label: string;
  tint?: "cyan" | "orange";
}) {
  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label={label}
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`frameBg-${tint}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a1322" />
          <stop offset="1" stopColor="#05070d" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#frameBg-${tint})`} />
      {children}
    </svg>
  );
}

/* Reusable grid backdrop for the SVG scenes. */
function GridBackdrop({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 40}
          y1={0}
          x2={i * 40}
          y2={260}
          stroke="#1d2c47"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={i * 40}
          x2={400}
          y2={i * 40}
          stroke="#1d2c47"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function HeroScene() {
  return (
    <>
      <GridBackdrop opacity={0.35} />
      {/* server racks receding into the aisle */}
      {[
        { x: 18, w: 70, h: 150 },
        { x: 96, w: 56, h: 130 },
        { x: 312, w: 70, h: 150 },
        { x: 250, w: 56, h: 130 },
      ].map((r) => (
        <g key={r.x}>
          <rect
            x={r.x}
            y={70}
            width={r.w}
            height={r.h}
            rx="4"
            fill="#0c1322"
            stroke="#1d2c47"
            strokeWidth="1.5"
          />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x={r.x + 6}
              y={80 + i * 22}
              width={r.w - 12}
              height="6"
              rx="2"
              fill="#38d6ef"
              opacity={0.18 + i * 0.06}
            />
          ))}
        </g>
      ))}
      {/* aisle floor glow */}
      <polygon points="150,260 250,260 232,150 168,150" fill="#38d6ef" opacity="0.08" />
      {/* robot centered in the aisle */}
      <g transform="translate(157,42) scale(0.32)">
        <BraveBotSVG title="BraveBot patrolling a data center aisle — concept" />
      </g>
    </>
  );
}

function IndustrialScene() {
  return (
    <>
      <GridBackdrop opacity={0.3} />
      {/* pipe rack */}
      {[60, 78, 96].map((y) => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#5b6679" strokeWidth="7" />
      ))}
      {[40, 360].map((x) => (
        <rect key={x} x={x - 5} y="40" width="10" height="120" fill="#3a4258" />
      ))}
      {/* valve wheels */}
      {[120, 280].map((x) => (
        <g key={x}>
          <circle cx={x} cy="60" r="11" fill="none" stroke="#ff9148" strokeWidth="3" />
          <line x1={x - 11} y1="60" x2={x + 11} y2="60" stroke="#ff9148" strokeWidth="3" />
          <line x1={x} y1="49" x2={x} y2="71" stroke="#ff9148" strokeWidth="3" />
        </g>
      ))}
      {/* grating floor */}
      <rect x="0" y="200" width="400" height="60" fill="#0c1322" />
      {Array.from({ length: 21 }).map((_, i) => (
        <line
          key={i}
          x1={i * 20}
          y1="200"
          x2={i * 20}
          y2="260"
          stroke="#1d2c47"
          strokeWidth="1.5"
        />
      ))}
      <line x1="0" y1="200" x2="400" y2="200" stroke="#5b6679" strokeWidth="2" />
      {/* robot on the walkway */}
      <g transform="translate(160,52) scale(0.30)">
        <BraveBotSVG
          scanFx
          title="BraveBot inspecting an industrial pipe rack — concept"
        />
      </g>
    </>
  );
}

function ExplodedScene() {
  /* BraveBotSVG core with callout lines to subsystem labels. */
  const callouts = [
    { x: 312, y: 50, t: "Sensor mast" },
    { x: 312, y: 96, t: "Edge AI compute" },
    { x: 312, y: 142, t: "Hot-swap battery" },
    { x: 312, y: 188, t: "Wheel-leg" },
  ];
  return (
    <>
      <GridBackdrop opacity={0.25} />
      <g transform="translate(40,30) scale(0.35)">
        <BraveBotSVG title="Exploded subsystem view of BraveBot — concept" />
      </g>
      {callouts.map((c) => (
        <g key={c.t}>
          <line
            x1="190"
            y1={c.y}
            x2={c.x - 6}
            y2={c.y}
            stroke="#38d6ef"
            strokeWidth="1.4"
            strokeDasharray="3 3"
          />
          <circle cx="190" cy={c.y} r="3.5" fill="#ff9148" />
          <rect
            x={c.x}
            y={c.y - 11}
            width="76"
            height="22"
            rx="4"
            fill="#11192b"
            stroke="#1d2c47"
          />
          <text
            x={c.x + 8}
            y={c.y + 4}
            fill="#9fb0c8"
            fontSize="9"
            fontFamily="monospace"
          >
            {c.t}
          </text>
        </g>
      ))}
    </>
  );
}

function LegArt() {
  return (
    <>
      <GridBackdrop opacity={0.25} />
      {/* thigh strut */}
      <line x1="150" y1="40" x2="240" y2="120" stroke="#8b97ac" strokeWidth="26" strokeLinecap="round" />
      {/* shin strut */}
      <line x1="240" y1="120" x2="170" y2="190" stroke="#8b97ac" strokeWidth="22" strokeLinecap="round" />
      {/* hip actuator */}
      <circle cx="150" cy="40" r="24" fill="#566275" stroke="#cdd6e2" strokeWidth="3" />
      <circle cx="150" cy="40" r="9" fill="#ff8a3d" />
      {/* knee actuator */}
      <circle cx="240" cy="120" r="20" fill="#566275" stroke="#cdd6e2" strokeWidth="3" />
      <circle cx="240" cy="120" r="7" fill="#ff8a3d" />
      {/* wheel-foot */}
      <circle cx="170" cy="190" r="46" fill="#0c0f16" stroke="#1c2230" strokeWidth="3" />
      {Array.from({ length: 20 }).map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={170 + Math.cos(a) * 40}
            y1={190 + Math.sin(a) * 40}
            x2={170 + Math.cos(a) * 46}
            y2={190 + Math.sin(a) * 46}
            stroke="#2b3344"
            strokeWidth="4"
          />
        );
      })}
      <circle cx="170" cy="190" r="22" fill="#9aa6ba" />
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <line
            key={i}
            x1="170"
            y1="190"
            x2={170 + Math.cos(a) * 20}
            y2={190 + Math.sin(a) * 20}
            stroke="#5b6679"
            strokeWidth="5"
          />
        );
      })}
      <circle cx="170" cy="190" r="8" fill="#ff8a3d" />
      {/* dimension annotations */}
      <line x1="290" y1="60" x2="290" y2="200" stroke="#38d6ef" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="298" y="135" fill="#6ff0ff" fontSize="9" fontFamily="monospace">
        articulated
      </text>
      <text x="298" y="148" fill="#6ff0ff" fontSize="9" fontFamily="monospace">
        strut
      </text>
    </>
  );
}

function MastArt() {
  const modules = [
    { y: 60, fill: "#0d2a3a", stroke: "#38d6ef", label: "acoustic array" },
    { y: 110, fill: "#2a1608", stroke: "#ff9148", label: "thermal camera" },
    { y: 160, fill: "#0a1f14", stroke: "#4ade80", label: "gas module" },
    { y: 210, fill: "#0a0f1a", stroke: "#6ff0ff", label: "visual camera" },
  ];
  return (
    <>
      <GridBackdrop opacity={0.25} />
      {/* mast post */}
      <rect x="116" y="40" width="22" height="190" rx="6" fill="#46506a" />
      {modules.map((m) => (
        <g key={m.label}>
          <line x1="138" y1={m.y} x2="160" y2={m.y} stroke="#3a4258" strokeWidth="4" />
          <rect
            x="160"
            y={m.y - 22}
            width="120"
            height="44"
            rx="8"
            fill={m.fill}
            stroke={m.stroke}
            strokeWidth="2"
          />
          <circle cx="184" cy={m.y} r="10" fill="none" stroke={m.stroke} strokeWidth="2.5" />
          <circle cx="184" cy={m.y} r="3.5" fill={m.stroke} />
          <text
            x="206"
            y={m.y + 3.5}
            fill="#9fb0c8"
            fontSize="9.5"
            fontFamily="monospace"
          >
            {m.label}
          </text>
        </g>
      ))}
    </>
  );
}

function AcousticArt() {
  /* concentric ultrasonic rings emanating from a leak point on a rack */
  const cx = 150;
  const cy = 150;
  return (
    <>
      <GridBackdrop opacity={0.3} />
      {/* rack */}
      <rect x="250" y="50" width="110" height="170" rx="5" fill="#0c1322" stroke="#1d2c47" strokeWidth="1.5" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x="258" y={62 + i * 22} width="94" height="7" rx="2" fill="#38d6ef" opacity="0.25" />
      ))}
      {/* coolant connector / leak source */}
      <rect x="244" y="138" width="14" height="24" rx="3" fill="#3a4258" />
      {/* acoustic heatmap rings */}
      {[1, 2, 3, 4, 5].map((r) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r * 24}
          fill="none"
          stroke={r <= 2 ? "#f0533a" : r === 3 ? "#fbbf24" : "#38d6ef"}
          strokeWidth={5 - r * 0.5}
          opacity={0.85 - r * 0.13}
        />
      ))}
      <circle cx={cx} cy={cy} r="9" fill="#f0533a" />
      {/* leak vector toward connector */}
      <line x1={cx + 16} y1={cy - 4} x2="244" y2="150" stroke="#f0533a" strokeWidth="2" strokeDasharray="4 3" />
      <text x="40" y="40" fill="#f0533a" fontSize="11" fontFamily="monospace">
        ULTRASONIC LEAK
      </text>
      <text x="40" y="54" fill="#9fb0c8" fontSize="9" fontFamily="monospace">
        92% confidence
      </text>
    </>
  );
}

function ThermalArt() {
  /* thermal gradient blobs over a rack outline */
  return (
    <>
      <defs>
        <radialGradient id="thHot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f0533a" />
          <stop offset="0.5" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="thWarm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="0.6" stopColor="#38d6ef" />
          <stop offset="1" stopColor="#38d6ef" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="260" fill="#070b14" />
      {/* rack frame */}
      <rect x="90" y="34" width="220" height="200" rx="6" fill="#0a1322" stroke="#1d2c47" strokeWidth="2" />
      {/* cool field */}
      {[
        { x: 150, y: 90, r: 70 },
        { x: 250, y: 180, r: 64 },
        { x: 130, y: 200, r: 56 },
      ].map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="url(#thWarm)" opacity="0.7" />
      ))}
      {/* hotspot */}
      <circle cx="248" cy="96" r="56" fill="url(#thHot)" />
      {/* hotspot marker */}
      <circle cx="248" cy="96" r="12" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      <line x1="248" y1="78" x2="248" y2="68" stroke="#ffffff" strokeWidth="2" />
      <line x1="248" y1="114" x2="248" y2="124" stroke="#ffffff" strokeWidth="2" />
      <line x1="230" y1="96" x2="220" y2="96" stroke="#ffffff" strokeWidth="2" />
      <line x1="266" y1="96" x2="276" y2="96" stroke="#ffffff" strokeWidth="2" />
      <text x="248" y="146" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">
        +14°C
      </text>
      <text x="100" y="222" fill="#9fb0c8" fontSize="9" fontFamily="monospace">
        radiometric IR · baseline-relative
      </text>
    </>
  );
}

function GasArt() {
  /* translucent plume particles drifting from a UPS cabinet */
  return (
    <>
      <GridBackdrop opacity={0.3} />
      {/* UPS cabinet */}
      <rect x="60" y="90" width="90" height="140" rx="5" fill="#11192b" stroke="#2b3a57" strokeWidth="2" />
      <rect x="72" y="104" width="66" height="40" rx="3" fill="#0c1322" />
      <line x1="80" y1="116" x2="124" y2="116" stroke="#fbbf24" strokeWidth="2.4" />
      <line x1="80" y1="128" x2="110" y2="128" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
      {Array.from({ length: 3 }).map((_, i) => (
        <rect key={i} x="76" y={158 + i * 20} width="58" height="12" rx="2" fill="#1a2236" />
      ))}
      {/* plume particles */}
      {[
        { x: 165, y: 110, r: 18 },
        { x: 200, y: 90, r: 26 },
        { x: 240, y: 70, r: 32 },
        { x: 285, y: 95, r: 26 },
        { x: 315, y: 130, r: 20 },
        { x: 215, y: 140, r: 22 },
        { x: 270, y: 150, r: 18 },
      ].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#4ade80" opacity={0.16} />
      ))}
      {/* sensor beam from mast */}
      <polygon points="150,160 320,80 320,180" fill="#38d6ef" opacity="0.1" />
      <line x1="150" y1="160" x2="320" y2="80" stroke="#38d6ef" strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1="150" y1="160" x2="320" y2="180" stroke="#38d6ef" strokeWidth="1.4" strokeDasharray="4 3" />
      <circle cx="150" cy="160" r="7" fill="#38d6ef" />
      <text x="60" y="68" fill="#4ade80" fontSize="11" fontFamily="monospace">
        OFF-GAS PLUME · H2 / VOC
      </text>
    </>
  );
}

function DashboardArt() {
  return (
    <>
      <rect width="400" height="260" fill="#070b14" />
      {/* top bar */}
      <rect x="14" y="14" width="372" height="26" rx="5" fill="#0c1322" stroke="#1d2c47" />
      <circle cx="28" cy="27" r="4" fill="#4ade80" />
      <text x="40" y="31" fill="#6ff0ff" fontSize="9" fontFamily="monospace">
        BRAVEBOT · AUTONOMOUS PATROL
      </text>
      <rect x="330" y="20" width="44" height="14" rx="3" fill="#11192b" stroke="#2b3a57" />
      {/* camera panel */}
      <rect x="14" y="50" width="180" height="110" rx="5" fill="#0a1322" stroke="#1d2c47" />
      <text x="22" y="64" fill="#65758f" fontSize="7.5" fontFamily="monospace">
        LIVE CAMERA
      </text>
      <circle cx="104" cy="110" r="30" fill="none" stroke="#38d6ef" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="86" y="92" width="36" height="36" rx="3" fill="none" stroke="#ff9148" strokeWidth="1.6" />
      {/* thermal mini */}
      <rect x="204" y="50" width="86" height="52" rx="5" fill="#0a1322" stroke="#1d2c47" />
      <text x="212" y="64" fill="#65758f" fontSize="7.5" fontFamily="monospace">
        THERMAL
      </text>
      <circle cx="247" cy="82" r="13" fill="#f0533a" opacity="0.7" />
      <circle cx="247" cy="82" r="22" fill="#fbbf24" opacity="0.25" />
      {/* acoustic mini */}
      <rect x="300" y="50" width="86" height="52" rx="5" fill="#0a1322" stroke="#1d2c47" />
      <text x="308" y="64" fill="#65758f" fontSize="7.5" fontFamily="monospace">
        ACOUSTIC
      </text>
      {[6, 12, 18].map((r) => (
        <circle key={r} cx="343" cy="84" r={r} fill="none" stroke="#38d6ef" strokeWidth="1.4" opacity="0.7" />
      ))}
      {/* gas trend graph */}
      <rect x="204" y="112" width="182" height="48" rx="5" fill="#0a1322" stroke="#1d2c47" />
      <text x="212" y="126" fill="#65758f" fontSize="7.5" fontFamily="monospace">
        GAS TREND
      </text>
      <polyline
        points="214,150 240,146 266,148 292,138 318,140 344,124 372,120"
        fill="none"
        stroke="#4ade80"
        strokeWidth="2"
      />
      {/* alerts strip */}
      <rect x="14" y="172" width="372" height="74" rx="5" fill="#0a1322" stroke="#1d2c47" />
      <text x="22" y="186" fill="#65758f" fontSize="7.5" fontFamily="monospace">
        ALERTS &amp; WORK ORDERS
      </text>
      {[
        { y: 196, c: "#f0533a", t: "A-118  Coolant micro-leak · Rack 4B" },
        { y: 214, c: "#fbbf24", t: "A-117  PDU 7 joint temp above baseline" },
        { y: 232, c: "#38d6ef", t: "A-116  Containment door opened · Aisle 2" },
      ].map((a) => (
        <g key={a.t}>
          <rect x="22" y={a.y - 8} width="6" height="11" rx="1.5" fill={a.c} />
          <text x="36" y={a.y} fill="#9fb0c8" fontSize="8.5" fontFamily="monospace">
            {a.t}
          </text>
        </g>
      ))}
    </>
  );
}

function PatrolMapArt() {
  /* top-down floor plan with route + waypoints */
  const route = [
    [60, 210],
    [60, 70],
    [140, 70],
    [140, 210],
    [220, 210],
    [220, 70],
    [320, 70],
    [320, 200],
  ];
  return (
    <>
      <GridBackdrop opacity={0.3} />
      {/* aisles as rack blocks */}
      {[40, 120, 200, 280].map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="36" height="160" rx="3" fill="#0c1322" stroke="#1d2c47" strokeWidth="1.5" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={x + 4} y={58 + i * 22} width="28" height="6" rx="1.5" fill="#38d6ef" opacity="0.2" />
          ))}
        </g>
      ))}
      {/* patrol route */}
      <polyline
        points={route.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke="#ff9148"
        strokeWidth="2.6"
        strokeDasharray="7 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* waypoints */}
      {route.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="7" fill="none" stroke="#6ff0ff" strokeWidth="1.6" />
          <circle cx={p[0]} cy={p[1]} r="3" fill="#6ff0ff" />
        </g>
      ))}
      {/* robot at start */}
      <circle cx={route[0][0]} cy={route[0][1]} r="11" fill="#ff6a1a" />
      <circle cx={route[0][0]} cy={route[0][1]} r="11" fill="none" stroke="#ff9148" strokeWidth="2" />
      <text x="20" y="34" fill="#ff9148" fontSize="10" fontFamily="monospace">
        PATROL ROUTE · 7 ZONES
      </text>
    </>
  );
}

/** Internal art switch — one distinct illustration per concept. */
function ConceptArt({ art }: { art: ImageConcept["art"] }) {
  const label = artLabels[art];
  switch (art) {
    case "hero":
      return (
        <ArtFrame label={label}>
          <HeroScene />
        </ArtFrame>
      );
    case "industrial":
      return (
        <ArtFrame label={label} tint="orange">
          <IndustrialScene />
        </ArtFrame>
      );
    case "exploded":
      return (
        <ArtFrame label={label}>
          <ExplodedScene />
        </ArtFrame>
      );
    case "leg":
      return (
        <ArtFrame label={label}>
          <LegArt />
        </ArtFrame>
      );
    case "mast":
      return (
        <ArtFrame label={label}>
          <MastArt />
        </ArtFrame>
      );
    case "acoustic":
      return (
        <ArtFrame label={label}>
          <AcousticArt />
        </ArtFrame>
      );
    case "thermal":
      return (
        <ArtFrame label={label}>
          <ThermalArt />
        </ArtFrame>
      );
    case "gas":
      return (
        <ArtFrame label={label}>
          <GasArt />
        </ArtFrame>
      );
    case "dashboard":
      return (
        <ArtFrame label={label}>
          <DashboardArt />
        </ArtFrame>
      );
    case "patrolmap":
      return (
        <ArtFrame label={label}>
          <PatrolMapArt />
        </ArtFrame>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Accessible modal dialog                                            */
/* ------------------------------------------------------------------ */

function ConceptModal({
  concept,
  onClose,
}: {
  concept: ImageConcept;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();

    // Lock body scroll while the dialog is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      // Simple focus trap within the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const titleId = `concept-modal-title-${concept.id}`;
  const descId = `concept-modal-desc-${concept.id}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-void/85 backdrop-blur-sm"
        aria-hidden="true"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-orange-bright">
              Concept visualization
            </p>
            <h3
              id={titleId}
              className="mt-1 text-lg font-semibold text-foreground"
            >
              {concept.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close concept dialog"
            className="shrink-0 rounded-lg border border-line bg-panel-2 px-3 py-2 text-tdim transition-colors hover:border-cyan/40 hover:text-foreground"
          >
            <span aria-hidden="true" className="font-mono text-base leading-none">
              ✕
            </span>
          </button>
        </div>

        {/* scrollable body */}
        <div className="overflow-y-auto p-5">
          <div className="overflow-hidden rounded-xl border border-line">
            <div className="aspect-[400/260]">
              <ConceptArt art={concept.art} />
            </div>
          </div>
          <p id={descId} className="mt-4 text-sm leading-relaxed text-tdim">
            {concept.caption}
          </p>

          <div className="mt-5">
            <h4 className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cyan-bright">
              Image generation prompt
            </h4>
            <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-abyss p-4 font-mono text-xs leading-relaxed text-tdim">
              {concept.prompt}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

/** "13 · Visual Gallery" — concept placeholder illustrations with an accessible detail modal. */
export function VisualGallery() {
  const [active, setActive] = useState<ImageConcept | null>(null);

  return (
    <Section id="gallery" grid>
      <SectionHeading
        eyebrow="13 · Visual Gallery"
        title="Visual Gallery"
        intro="BraveBot is a concept platform — these are stylized placeholder illustrations, not photographs. Each card carries the prompt used to generate a photorealistic render when one is needed."
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {imageConcepts.map((concept, i) => (
          <Reveal as="li" key={concept.id} delay={(i % 3) * 0.06}>
            <GlassCard
              as="article"
              className="h-full overflow-hidden transition-transform duration-200 hover:-translate-y-1"
            >
              <button
                type="button"
                onClick={() => setActive(concept)}
                aria-haspopup="dialog"
                aria-label={`Open concept details for ${concept.title}`}
                className="flex h-full w-full flex-col text-left"
              >
                <div className="aspect-[400/260] w-full overflow-hidden border-b border-line">
                  <ConceptArt art={concept.art} />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    {concept.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-tdim">
                    {concept.caption}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cyan-bright">
                    View prompt
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            </GlassCard>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <p className="mt-8 rounded-xl border border-line bg-panel/60 p-4 text-xs leading-relaxed text-tfaint">
          <span className="font-mono uppercase tracking-[0.16em] text-tdim">
            Note ·{" "}
          </span>
          All images above are concept placeholders. Real photorealistic renders
          can be generated from the prompts collected in{" "}
          <code className="font-mono text-cyan-bright">
            docs/image_generation_prompts.md
          </code>
          .
        </p>
      </Reveal>

      {active && (
        <ConceptModal concept={active} onClose={() => setActive(null)} />
      )}
    </Section>
  );
}
