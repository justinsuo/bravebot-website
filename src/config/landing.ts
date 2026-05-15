/**
 * Landing page configuration.
 *
 * Edit copy, stats, links and colors here — every component on the
 * scroll-driven landing page reads from this single file.
 */

export const landing = {
  /* ---- brand + navigation ---------------------------------------- */
  brand: {
    name: "BraveBot",
    org: "Vigiles Robotics",
  },
  nav: {
    links: [
      { label: "Capabilities", href: "#features" },
      { label: "How it works", href: "#story" },
      { label: "Integrations", href: "#integrations" },
      { label: "Architecture", href: "#technical" },
    ],
    cta: { label: "Request a demo", href: "#contact" },
    explore: { label: "Explore the platform", href: "/explore" },
  },

  /* ---- 1 · hero -------------------------------------------------- */
  hero: {
    eyebrow: "Embodied AI · Autonomous inspection",
    headline: "See the threat before it strikes.",
    subheadline:
      "BraveBot is a wheel-legged autonomous robot that patrols AI data centers and industrial sites — sensing, reasoning and reporting invisible infrastructure failures before they become downtime.",
    ctaPrimary: { label: "Explore the robot", href: "/explore" },
    ctaSecondary: { label: "Request a demo", href: "#contact" },
    stats: [
      { value: "24/7", label: "Autonomous patrol" },
      { value: "4-sensor", label: "Acoustic · thermal · gas · visual" },
      { value: "Edge AI", label: "On-board, no cloud dependency" },
      { value: "< T-30 min", label: "Typical early-warning lead time" },
    ],
  },

  /* ---- 2 · scroll story (pinned, 4 states) ----------------------- */
  story: {
    heading: "One patrol. Four ways to catch a failure.",
    states: [
      {
        tag: "01 — Patrol",
        title: "It covers every aisle, every shift.",
        body: "BraveBot rolls and steps through the whole facility on a repeatable route — no fatigue, no blind spots, no shift gaps.",
      },
      {
        tag: "02 — Sense",
        title: "It hears, sees and smells what people can't.",
        body: "A fused sensor stack picks up ultrasonic leaks, thermal drift, off-gassing and visual anomalies long before they are obvious.",
      },
      {
        tag: "03 — Reason",
        title: "It diagnoses on the edge, in real time.",
        body: "An on-board multimodal model fuses every signal, localizes the source and scores the risk — with zero cloud dependency.",
      },
      {
        tag: "04 — Report",
        title: "It raises the alert before the alarm.",
        body: "Findings become human-readable work orders and BMS / DCIM / CMMS events — routed before a failure ever trips a conventional alarm.",
      },
    ],
  },

  /* ---- 3 · feature grid ------------------------------------------ */
  features: {
    heading: "Built to inspect what fixed sensors and human patrols miss.",
    intro:
      "A rugged wheel-legged platform, a four-sensor fusion stack and an edge-resident AI brain — engineered for real, harsh facilities.",
    cards: [
      {
        kicker: "Mobility",
        title: "Wheel-legged platform",
        body: "Wheels for efficient aisle coverage, articulated legs for steps, grating and slopes. Compact footprint, raised sensor vantage.",
      },
      {
        kicker: "Perception",
        title: "Four-sensor fusion",
        body: "Acoustic imaging, radiometric thermal, gas telemetry and HD vision — time-aligned into one situational picture.",
      },
      {
        kicker: "Intelligence",
        title: "Edge-resident AI brain",
        body: "Multimodal reasoning that routes findings to specialized experts and outputs diagnosis, risk and recommended action locally.",
      },
      {
        kicker: "Autonomy",
        title: "24/7 self-directed patrol",
        body: "Scheduled and on-demand routes with hot-swap batteries — continuous coverage without a human in the loop.",
      },
      {
        kicker: "Early warning",
        title: "Precursor-stage detection",
        body: "Ultrasonic micro-leaks, partial discharge and off-gassing surface as precursors — hours of lead time, not after-the-fact alarms.",
      },
      {
        kicker: "Operations",
        title: "Action, not just alerts",
        body: "Every finding becomes a risk-scored, evidence-attached work order pushed straight into your facility systems.",
      },
    ],
  },

  /* ---- 4 · integrations / social proof --------------------------- */
  integrations: {
    heading: "Drops into the systems you already run.",
    intro:
      "BraveBot speaks the protocols of modern facility and maintenance operations — no rip-and-replace.",
    items: [
      "OPC UA",
      "MQTT",
      "REST",
      "BMS",
      "DCIM",
      "Maximo",
      "SAP PM",
      "Infor EAM",
      "OSI PI",
      "CMMS / EAM",
    ],
  },

  /* ---- 5 · technical / architecture ------------------------------ */
  technical: {
    heading: "From raw signal to operational decision.",
    intro:
      "A transparent pipeline runs entirely on the robot — sensor capture, fusion, expert routing and a human-readable result.",
    pipeline: [
      { step: "Sensor scan", detail: "Acoustic · thermal · gas · visual capture" },
      { step: "Sensor fusion", detail: "Time-aligned multimodal correlation" },
      { step: "Expert routing", detail: "Mixture-of-experts diagnosis on the edge" },
      { step: "Risk + action", detail: "Score, localize, recommend, raise work order" },
    ],
    code: [
      "alert = bravebot.diagnose(scan)",
      "",
      "{",
      '  "zone":       "Rack 4B",',
      '  "finding":    "coolant micro-leak",',
      '  "first_seen": "acoustic · 92% conf.",',
      '  "predicted":  "thermal hotspot in 14 min",',
      '  "risk":       "high",',
      '  "action":     "isolate line · dispatch tech",',
      "}",
    ],
  },

  /* ---- 6 · final CTA --------------------------------------------- */
  finalCta: {
    headline: "Deploy a robot that reports before the alarm.",
    body: "Bring autonomous, multimodal inspection to your data center or industrial site.",
    ctaPrimary: { label: "Request a demo", href: "#contact" },
    ctaSecondary: { label: "Explore the platform", href: "/explore" },
  },

  /* ---- footer ---------------------------------------------------- */
  footer: {
    tagline: "Embodied AI for infrastructure inspection.",
    note: "Robot renders are concept visualizations, not product photographs. Technical claims are subject to engineering verification.",
    links: [
      { label: "Explore the platform", href: "/explore" },
      { label: "Capabilities", href: "#features" },
      { label: "Integrations", href: "#integrations" },
      { label: "Request a demo", href: "#contact" },
    ],
  },

  /* ---- theme colors (used by the 3D scene + accents) ------------- */
  colors: {
    accent: "#3d6dfb",
    accentBright: "#829dff",
    particleCore: "#7da2ff",
    particleEdge: "#1f3a8a",
    background: "#0a0a0c",
  },
} as const;

export type Landing = typeof landing;
