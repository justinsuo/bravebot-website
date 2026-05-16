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
    explore: { label: "Explore the platform", href: "#anatomy" },
  },

  /* ---- 1 · hero -------------------------------------------------- */
  hero: {
    eyebrow: "Autonomous inspection robot",
    headline: "Autonomous inspection for data centers and industrial sites.",
    subheadline:
      "BraveBot is a wheel-legged robot with a four-sensor stack and on-board AI — built to patrol facilities, detect developing faults, and produce risk-scored work orders.",
    ctaPrimary: { label: "Explore the robot", href: "#anatomy" },
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

  /* ---- 1c · interactive 3D hotspots ------------------------------ */
  // Each hotspot maps to one or more part ids in RobotScene.
  robotHotspots: [
    { id: "wheel", n: 1, parts: ["wheelL", "wheelR"], title: "Wheel-foot module", body: "Efficient rolling mobility — the wheeled TRON 1 mode for covering long inspection aisles with low energy cost." },
    { id: "legs", n: 2, parts: ["hipL", "hipR"], title: "Articulated leg links", body: "Adaptive stance and balance — the links adjust footprint and height for slopes, steps and uneven floors." },
    { id: "abad", n: 3, parts: ["abadL", "abadR"], title: "Hip actuator housing", body: "Drives leg control and the wheel-legged movement that switches between rolling and stepping." },
    { id: "knee", n: 4, parts: ["kneeL", "kneeR"], title: "Knee actuator housing", body: "The mechanical articulation joint — bends the leg to clear obstacles and absorb terrain." },
    { id: "base", n: 5, parts: ["base"], title: "Lower pelvis / locomotion base", body: "The LimX TRON 1 base platform — the proven wheel-legged locomotion core BraveBot is built on." },
    { id: "payload", n: 6, parts: ["payload"], title: "Payload adapter frame", body: "The custom BraveBot mounting layer — a structural interface built on top of the TRON 1 base." },
    { id: "torso", n: 7, parts: ["torso"], title: "Rugged inspection torso", body: "A sealed IP66 industrial enclosure housing the inspection electronics and edge compute." },
    { id: "rails", n: 8, parts: ["railL", "railR"], title: "Orange protective rail cage", body: "Impact protection for the torso and a handling point for field deployment and transport." },
    { id: "display", n: 9, parts: ["display"], title: "Front AI display panel", body: "Local status and operator feedback — patrol mode, diagnostics and at-a-glance robot state." },
    { id: "mast", n: 10, parts: ["mast"], title: "Sensor mast", body: "Raises the sensor head for an elevated vantage point over racks, aisles and equipment." },
    { id: "acoustic", n: 11, parts: ["acoustic"], title: "Acoustic imaging array", body: "Detects ultrasonic leaks, partial discharge, electrical arcing and bearing wear." },
    { id: "thermal", n: 12, parts: ["thermal"], title: "Thermal camera", body: "Maps hotspots across UPS, PDU, cable joints, GPUs and racks." },
    { id: "gas", n: 13, parts: ["gas"], title: "Gas sensor module", body: "VOC / CO / H₂ for data centers, with optional OGI / TDLAS for industrial gas detection." },
    { id: "hdcam", n: 14, parts: ["hdcam"], title: "HD visual AI camera", body: "Reads gauges, assets, doors, seals and indicator lights with on-board vision models." },
    { id: "nav", n: 15, parts: ["nav"], title: "Navigation sensor cluster", body: "Handles mapping, obstacle avoidance and route following across the facility." },
    { id: "edgeai", n: 16, parts: ["edgeai"], title: "Edge AI core", body: "Local multimodal reasoning — diagnosis and alert generation with no cloud dependency." },
    { id: "battery", n: 17, parts: ["battery"], title: "Hot-swappable battery", body: "2–4 hour runtime with a ~10-second swap for continuous 24/7 operation." },
    { id: "antenna", n: 18, parts: ["antennaL", "antennaR"], title: "Communication antennas", body: "Network sync, local operation and command / communication links." },
    { id: "estop", n: 19, parts: ["estop"], title: "Emergency stop", body: "A hardware safety cut-off for safe operation around people and equipment." },
    { id: "rear", n: 20, parts: ["rear"], title: "Rear service panel", body: "Tool-free maintenance access and a modular layout for serviceable components." },
  ],

  /* ---- 1d · interactive explorer section copy -------------------- */
  explorer: {
    heading: "Explore every part of the robot.",
    intro:
      "Drag to orbit the exploded model. Click any component — or pick one from the list — to see what it does.",
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
    body: "Leave your email and the team will reach out about a BraveBot demo.",
    // Where demo requests are sent. Change this to your real inbox.
    contactEmail: "contact@vigilesrobotics.com",
    ctaSecondary: { label: "Explore the platform", href: "#anatomy" },
  },

  /* ---- footer ---------------------------------------------------- */
  footer: {
    tagline: "Embodied AI for infrastructure inspection.",
    note: "Robot renders are concept visualizations, not product photographs. Technical claims are subject to engineering verification.",
    links: [
      { label: "Explore the platform", href: "#anatomy" },
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
