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
    eyebrow: "Autonomous inspection robot",
    headline: "Autonomous inspection for data centers and industrial sites.",
    subheadline:
      "BraveBot is a wheel-legged robot with a four-sensor stack and on-board AI — built to patrol facilities, detect developing faults, and produce risk-scored work orders.",
    ctaPrimary: { label: "Explore the robot", href: "/explore" },
    ctaSecondary: { label: "Request a demo", href: "#contact" },
    stats: [
      { value: "48 lb", label: "Chassis weight" },
      { value: "Wheel-legged", label: "Mobility platform" },
      { value: "4-sensor", label: "Acoustic · thermal · gas · visual" },
      { value: "Edge AI", label: "On-board · offline-capable" },
    ],
  },

  /* ---- 1b · exploded-model scroll captions ----------------------- */
  experience: {
    // Short captions that fade in as the robot comes apart on scroll.
    captions: [
      {
        title: "A modified LimX TRON 1 platform.",
        body: "Wheel-legged mobility — wheels for efficient aisle coverage, articulated legs for steps, grating and slopes.",
      },
      {
        title: "Built around a four-sensor mast and an edge-AI core.",
        body: "Acoustic, thermal, gas and visual sensing — fused and reasoned over entirely on-board.",
      },
    ],
    note: "Concept visualization — exploded view of the BraveBot platform.",
  },

  /* ---- 2 · scroll story (pinned, 4 states) ----------------------- */
  story: {
    heading: "From patrol to work order.",
    states: [
      {
        tag: "01 — Patrol",
        title: "Continuous facility patrol.",
        body: "A repeatable route across every aisle and zone, on a fixed schedule or on demand.",
      },
      {
        tag: "02 — Capture",
        title: "Four-sensor capture.",
        body: "Acoustic, thermal, gas and visual data, time-aligned on every pass.",
      },
      {
        tag: "03 — Diagnose",
        title: "On-board diagnosis.",
        body: "An edge multimodal model fuses the signals, localizes the source and scores the risk. No cloud.",
      },
      {
        tag: "04 — Report",
        title: "Actionable output.",
        body: "Findings become risk-scored work orders and BMS / DCIM / CMMS events, with evidence attached.",
      },
    ],
  },

  /* ---- 3 · feature grid ------------------------------------------ */
  features: {
    heading: "A rugged platform, a fused sensor stack, an edge-AI brain.",
    intro:
      "Six capabilities, engineered as one platform for real, harsh facilities.",
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
        title: "Operational output",
        body: "Every finding becomes a risk-scored, evidence-attached work order pushed straight into your facility systems.",
      },
    ],
  },

  /* ---- 4 · integrations / social proof --------------------------- */
  integrations: {
    heading: "Connects to the systems you run.",
    intro:
      "Standard protocols for facility, maintenance and historian systems.",
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
    headline: "Bring autonomous inspection to your facility.",
    body: "See the full platform, or talk to the team about a deployment.",
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
