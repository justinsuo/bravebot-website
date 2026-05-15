/**
 * BraveBot / Vigiles Robotics — structured product data.
 *
 * This is the single source of truth for site copy. Keep claims honest:
 *  - "confirmed"          base spec, treated as fixed
 *  - "estimated"          a modelled / projected figure
 *  - "optional"           available only in a specific configuration
 *  - "config-dependent"   varies by hardware / payload build
 *
 * BraveBot is a concept inspection robot built on a modified LimX Dynamics
 * TRON 1-style wheel-legged architecture. Renders on this site are concept
 * visualizations, not photographs of a finished product.
 */

export type Mode = "datacenter" | "industrial";
export type Confidence = "confirmed" | "estimated" | "optional" | "config-dependent";

/* ------------------------------------------------------------------ */
/*  Mode-specific copy                                                 */
/* ------------------------------------------------------------------ */

export interface ModeCopy {
  id: Mode;
  label: string;
  shortLabel: string;
  tagline: string;
  environment: string;
  gasFocus: string;
  integrations: string;
}

export const modes: Record<Mode, ModeCopy> = {
  datacenter: {
    id: "datacenter",
    label: "AI Data Center Mode",
    shortLabel: "Data Center",
    tagline: "Embodied AI for the dark AI data center.",
    environment:
      "High-density GPU halls, liquid-cooling loops, UPS rooms, PDU corridors and hot/cold aisle containment.",
    gasFocus:
      "VOC, CO, H2 and battery off-gas detection tuned for lithium and VRLA failure precursors.",
    integrations: "BMS · DCIM · CMMS over OPC UA, MQTT and REST.",
  },
  industrial: {
    id: "industrial",
    label: "Industrial & OTC Mode",
    shortLabel: "Industrial / OTC",
    tagline: "Embodied AI for harsh industrial and OTC inspection.",
    environment:
      "Pipe racks, grating walkways, confined compartments, rotating machinery skids and outdoor process areas.",
    gasFocus:
      "Optional OGI / TDLAS-style methane, flammable and toxic gas detection with plume localization.",
    integrations: "CMMS / EAM (Maximo, SAP PM, Infor EAM) and historians (OSI PI) over OPC UA, MQTT and REST.",
  },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  headline: "BraveBot: Embodied AI for the Dark AI Data Center",
  subheadline:
    "A wheel-legged autonomous inspection robot that sees, hears, smells, reasons, and reports invisible infrastructure failures before they become downtime.",
  primaryCta: "Explore the Robot",
  secondaryCta: "View Sensor Stack",
  stats: [
    { value: "48 lb", label: "Chassis weight", note: "robot body" },
    { value: "33 lb", label: "Sensor payload", note: "config-dependent" },
    { value: "Wheel-legged", label: "Mobility platform", note: "TRON 1-style" },
    { value: "IP66", label: "Rugged sealed design", note: "target rating" },
    { value: "4-sensor", label: "Acoustic · Thermal · Gas · Visual", note: "fusion stack" },
    { value: "Edge AI", label: "On-board reasoning", note: "no cloud dependency" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Section 2 — Robot anatomy hotspots                                 */
/* ------------------------------------------------------------------ */

export interface Hotspot {
  id: string;
  index: number;
  name: string;
  /** percentage coordinates over the robot illustration viewBox */
  x: number;
  y: number;
  summary: string;
  whyItMatters: string;
  failureTypes: string[];
  datacenter: string;
  industrial: string;
}

export const hotspots: Hotspot[] = [
  {
    id: "wheel-feet",
    index: 1,
    name: "Wheel-feet",
    x: 37,
    y: 94,
    summary:
      "BraveBot uses wheels as feet, giving it efficient rolling motion while preserving the stability and terrain adaptability of a legged platform.",
    whyItMatters:
      "Tight aisles, grating, slopes and mixed industrial floors are handled better than a normal rover, without the energy cost of a full walking gait.",
    failureTypes: ["Missed coverage", "Aisle access gaps"],
    datacenter:
      "Rolls full hot/cold aisle runs efficiently, then uses leg articulation to step over cable trays and door sills.",
    industrial:
      "Crosses grating, thresholds and shallow steps between process zones without a dedicated ramp.",
  },
  {
    id: "legs",
    index: 2,
    name: "Articulated legs",
    x: 31,
    y: 85,
    summary:
      "Each leg is an articulated mechanical strut assembly — a robotic hip/knee linkage — that adjusts stance height and footprint on demand.",
    whyItMatters:
      "Variable geometry lets the robot lower its center of mass for stability or raise the sensor mast for a better vantage point.",
    failureTypes: ["Unreachable inspection points"],
    datacenter: "Lowers stance under containment ducting; raises to read top-of-rack gauges and indicators.",
    industrial: "Adapts stance on uneven plant flooring and around skid-mounted equipment.",
  },
  {
    id: "balancing",
    index: 3,
    name: "Active balancing system",
    x: 50,
    y: 80,
    summary:
      "A real-time balance controller fuses IMU and joint feedback to keep the platform stable while moving and while standing to scan.",
    whyItMatters:
      "A steady platform means cleaner thermal frames, sharper acoustic beamforming and reliable gauge OCR.",
    failureTypes: ["Motion blur", "Sensor noise"],
    datacenter: "Holds a stable scan pose on raised access floor panels and near vibrating CRAH units.",
    industrial: "Compensates for vibration near rotating machinery and on flexible grating spans.",
  },
  {
    id: "mast",
    index: 4,
    name: "Sensor mast",
    x: 50,
    y: 9,
    summary:
      "The elevated mast gives the robot a better vantage point for rack inspection, gauge reading, acoustic source localization, thermal scanning and gas detection.",
    whyItMatters:
      "Height extends line-of-sight over racks and equipment and improves triangulation of an anomaly's source.",
    failureTypes: ["Blind spots", "Poor source localization"],
    datacenter: "Sees over 48U racks into hot aisles and top-of-rack power chains.",
    industrial: "Surveys pipe racks and elevated valve manifolds from walkway level.",
  },
  {
    id: "acoustic",
    index: 5,
    name: "Acoustic imaging array",
    x: 39,
    y: 17,
    summary:
      "A phased array of microphones that detects ultrasonic signatures from coolant micro-leaks, partial discharge, arcing precursors, pump wear and abnormal mechanical sounds.",
    whyItMatters:
      "Ultrasound reveals faults long before they are audible, visible or hot — the earliest possible warning.",
    failureTypes: ["Coolant micro-leak", "Partial discharge", "Bearing wear"],
    datacenter: "Localizes ultrasonic jet noise from liquid-cooling connectors and arcing in switchgear.",
    industrial: "Pinpoints pressurized gas leaks and bearing defects across rotating machinery.",
  },
  {
    id: "thermal",
    index: 6,
    name: "Thermal camera",
    x: 59,
    y: 17,
    summary:
      "A radiometric infrared camera that maps hotspots across racks, UPS rooms, PDU connections, battery banks, cable joints and hot/cold aisles.",
    whyItMatters:
      "Heat is the signature of electrical resistance, friction and thermal runaway — and it trends before failure.",
    failureTypes: ["GPU hotspot", "Loose connection", "Thermal runaway"],
    datacenter: "Tracks GPU exhaust, UPS battery heating and PDU joint temperature against a learned baseline.",
    industrial: "Surveys motor housings, steam traps, insulation loss and electrical terminations.",
  },
  {
    id: "gas",
    index: 7,
    name: "Gas / laser telemetry sensor",
    x: 50,
    y: 35,
    summary:
      "In data centers, focus is on VOC, CO, H2 and battery off-gas detection. In industrial / OTC mode, an optional OGI / TDLAS-style module adds methane and flammable gas detection.",
    whyItMatters:
      "Off-gassing is the chemical fingerprint of a battery or process fault — often the only early signal there is.",
    failureTypes: ["Battery off-gas", "Refrigerant leak", "Flammable gas"],
    datacenter: "Watches for lithium and VRLA off-gas, refrigerant loss and elevated CO/H2 near UPS plant.",
    industrial: "Optional laser-based methane and toxic gas detection with plume direction estimation.",
  },
  {
    id: "visual",
    index: 8,
    name: "HD visual AI camera",
    x: 50,
    y: 27,
    summary:
      "A high-definition camera with on-board vision models that read gauges, indicator lights and asset tags, and flag containment, seal and compliance issues.",
    whyItMatters:
      "Most facilities still rely on analog gauges and visual checks — this turns every patrol into a structured inspection record.",
    failureTypes: ["Open containment", "Missing seal", "Asset drift"],
    datacenter: "Reads PDU displays, checks containment doors and blanking panels, logs asset positions.",
    industrial: "Reads field gauges, checks PPE compliance and verifies valve line-up against procedure.",
  },
  {
    id: "compute",
    index: 9,
    name: "Edge AI compute module",
    x: 50,
    y: 67,
    summary:
      "Fuses sensor data locally, routes findings to specialized experts, and outputs human-readable diagnosis, risk scores and maintenance actions without relying on cloud connectivity.",
    whyItMatters:
      "On-edge reasoning means lower latency, no data egress and continued operation when the network is down.",
    failureTypes: ["All — fusion layer"],
    datacenter: "Runs the full multimodal fusion stack inside the secure facility network boundary.",
    industrial: "Operates fully offline in remote sites and confined spaces with no connectivity.",
  },
  {
    id: "battery",
    index: 10,
    name: "Hot-swap battery",
    x: 50,
    y: 75,
    summary:
      "A hot-swappable battery pack designed for a roughly 10-second swap, keeping the robot in service around the clock.",
    whyItMatters:
      "Continuous patrol coverage without docking downtime — a fresh pack goes in faster than a shift handover.",
    failureTypes: ["Coverage gaps"],
    datacenter: "Swapped at an aisle-end station so 24/7 patrol routes never pause.",
    industrial: "Field-swappable packs support long routes across large plant footprints.",
  },
  {
    id: "shell",
    index: 11,
    name: "Rugged sealed shell",
    x: 69,
    y: 50,
    summary:
      "A sealed rectangular industrial torso with bumpers, protective rails, cable channels and serviceable panels — targeting an IP66 rating.",
    whyItMatters:
      "Dust, moisture, washdown and incidental impact are facts of life in real facilities; the chassis is built for them.",
    failureTypes: ["Ingress damage", "Impact damage"],
    datacenter: "Resists dust and condensation around liquid-cooling infrastructure.",
    industrial: "Targets harsh-environment duty; ATEX-zone certification status is configuration-dependent.",
  },
];

/* ------------------------------------------------------------------ */
/*  Section 3 — Wheel-legged mobility                                  */
/* ------------------------------------------------------------------ */

export const mobility = {
  platforms: [
    {
      id: "rover",
      name: "Wheeled rover",
      strengths: ["Efficient on flat floors", "Simple, low-cost drivetrain"],
      limits: ["Stops at steps and grating", "Fixed low sensor height", "Large turning base"],
      score: { speed: 4, terrain: 1, vantage: 1, footprint: 2 },
    },
    {
      id: "legged",
      name: "Humanoid / legged robot",
      strengths: ["Handles complex terrain", "Human-height vantage"],
      limits: ["High energy cost", "Slow over long aisles", "Mechanically complex, lower uptime"],
      score: { speed: 2, terrain: 4, vantage: 4, footprint: 3 },
    },
    {
      id: "bravebot",
      name: "BraveBot wheel-legged",
      strengths: [
        "Wheels roll long aisles efficiently",
        "Legs adjust stance, balance and step height",
        "Compact footprint, raises mast for vantage",
      ],
      limits: ["Not built to climb ladders or human stairs at full height"],
      score: { speed: 4, terrain: 4, vantage: 4, footprint: 4 },
    },
  ],
  points: [
    "Wheels give efficient movement down long inspection aisles.",
    "Legs allow stance adjustment, balance, obstacle handling and stair/grating capability.",
    "Wheel-feet allow compact movement without needing a large wheeled base.",
    "Active balancing helps on slick, vibrating or uneven surfaces.",
    "BraveBot is not trying to be a humanoid — it is optimized as a mobile inspection platform.",
  ],
  controlStack: [
    { layer: "Hermes / AI decision layer", detail: "Chooses where to inspect and why" },
    { layer: "Navigation command", detail: "Goal pose + route across the facility map" },
    { layer: "Locomotion control", detail: "Balance, stance and gait planning" },
    { layer: "Wheel-leg actuation", detail: "Joint-level torque to legs and wheels" },
    { layer: "Robot movement", detail: "Stable motion to the next inspection point" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Section 4 / 6 — Sensors                                            */
/* ------------------------------------------------------------------ */

export interface Sensor {
  id: string;
  name: string;
  icon: "acoustic" | "thermal" | "gas" | "visual";
  tagline: string;
  detects: string[];
  humansMiss: string;
  fixedMiss: string;
  scenario: string;
  spec: string;
  expert: string;
}

export const sensors: Sensor[] = [
  {
    id: "acoustic",
    name: "Acoustic",
    icon: "acoustic",
    tagline: "Hears failures before they are visible or hot.",
    detects: [
      "Ultrasonic coolant micro-leaks",
      "Electrical partial discharge",
      "Arcing precursors",
      "Pump bearing wear",
      "Abnormal mechanical sounds",
    ],
    humansMiss:
      "Ultrasonic signatures are far above human hearing — a leak or partial discharge is silent to a patrolling technician.",
    fixedMiss:
      "Fixed acoustic sensors cover one point; they rarely localize a moving or intermittent source.",
    scenario:
      "An acoustic heatmap overlaid on the visual feed lights up a coolant connector — an ultrasonic jet signature appears 30 minutes before any temperature change.",
    spec: "Phased acoustic imaging array, ultrasonic sensing up to 100 kHz (config-dependent).",
    expert: "Acoustic expert",
  },
  {
    id: "thermal",
    name: "Thermal",
    icon: "thermal",
    tagline: "Maps the heat signature of every fault.",
    detects: [
      "GPU and server hotspots",
      "UPS battery heating",
      "PDU / cable joint heating",
      "Thermal runaway risk",
      "Hot/cold aisle imbalance",
    ],
    humansMiss:
      "A loose lug or early battery heating looks normal to the eye until it is already a hazard.",
    fixedMiss:
      "Fixed thermal probes sample fixed points; a hotspot two racks away goes unseen.",
    scenario:
      "A rack-exhaust thermal heatmap flags a PDU connection trending 14°C above its learned baseline — hours before a breaker would trip.",
    spec: "Radiometric infrared camera with per-zone baseline learning.",
    expert: "Thermal expert",
  },
  {
    id: "gas",
    name: "Gas",
    icon: "gas",
    tagline: "Smells chemical faults the room cannot.",
    detects: [
      "Battery off-gas (Li / VRLA)",
      "VOC, CO and H2 build-up",
      "Refrigerant leaks",
      "Flammable gas (config-dependent)",
      "Methane / toxic gas (OTC option)",
    ],
    humansMiss:
      "By the time off-gassing is noticeable to people, a battery event may already be underway.",
    fixedMiss:
      "Fixed gas detectors trigger on room-level concentration — too late and with no source location.",
    scenario:
      "The gas module detects early VRLA off-gas near a UPS cabinet and the robot drives a containment pattern to localize which string is venting.",
    spec:
      "Data-center build: VOC / CO / H2 / off-gas. OTC build: optional OGI / TDLAS methane and gas leak localization. The OTC technical sheet is related but not identical to the data-center configuration.",
    expert: "Gas / safety expert",
  },
  {
    id: "visual",
    name: "Visual",
    icon: "visual",
    tagline: "Turns every patrol into a structured inspection record.",
    detects: [
      "Open containment doors",
      "Missing seals / blanking panels",
      "Untracked or moved assets",
      "Gauge and indicator-light readings",
      "Human activity and PPE / compliance issues",
    ],
    humansMiss:
      "Manual visual checks are inconsistent between shifts and rarely produce an auditable record.",
    fixedMiss:
      "Fixed cameras frame fixed scenes — they cannot walk up to a gauge and read it.",
    scenario:
      "The visual model reads an analog differential-pressure gauge, OCRs the value, and flags a containment door left open in the cold aisle.",
    spec: "HD camera with on-board gauge OCR, object detection and scene classification.",
    expert: "Visual inspection expert",
  },
];

/* ------------------------------------------------------------------ */
/*  Section 5 — Threat simulator                                       */
/* ------------------------------------------------------------------ */

export interface TimelineStep {
  t: string;
  text: string;
  sensor?: Sensor["icon"];
}

export interface Threat {
  id: string;
  name: string;
  mode: Mode | "both";
  firstSensor: Sensor["icon"];
  physical: string;
  conventionalMiss: string;
  braveBotAction: string;
  alert: string;
  action: string;
  timeline: TimelineStep[];
}

export const threats: Threat[] = [
  {
    id: "coolant-leak",
    name: "Liquid cooling micro-leak",
    mode: "datacenter",
    firstSensor: "acoustic",
    physical:
      "A connector seal weeps coolant as a fine pressurized jet, producing ultrasonic noise long before any visible drip or temperature change.",
    conventionalMiss:
      "Leak-detection rope only triggers once liquid has pooled and spread — well after GPUs are at risk.",
    braveBotAction:
      "The acoustic array localizes the jet to a specific connector, the thermal model projects when a hotspot will form, and the robot raises an alert with a map pin.",
    alert: "Rack 4B — coolant micro-leak near liquid connector. Acoustic confidence 92%.",
    action: "Isolate cooling line, inspect connector seal, dispatch technician before GPU damage.",
    timeline: [
      { t: "T-30 min", text: "Acoustic array hears an ultrasonic jet signature", sensor: "acoustic" },
      { t: "T-20 min", text: "AI localizes the leak to a specific connector", sensor: "acoustic" },
      { t: "T-15 min", text: "Thermal model predicts a hotspot forming", sensor: "thermal" },
      { t: "T-10 min", text: "Alert pushed to BMS / DCIM with a map pin" },
      { t: "T-0", text: "Technician replaces the seal before GPU damage" },
    ],
  },
  {
    id: "ups-offgas",
    name: "UPS battery off-gas",
    mode: "datacenter",
    firstSensor: "gas",
    physical:
      "A failing cell vents hydrogen and VOCs as it heats — a chemical precursor to thermal runaway.",
    conventionalMiss:
      "Room-level gas detectors only trip at a building alarm threshold and cannot say which string is venting.",
    braveBotAction:
      "The gas module detects early off-gas, the robot drives a containment pattern to find the source string, and thermal confirms localized heating.",
    alert: "UPS Room 2 — VRLA off-gas detected, String C. Gas + thermal correlated.",
    action: "Isolate the affected string, increase ventilation, dispatch battery technician.",
    timeline: [
      { t: "T-45 min", text: "Gas module detects rising H2 / VOC near the cabinet", sensor: "gas" },
      { t: "T-30 min", text: "Robot localizes the venting string by gradient", sensor: "gas" },
      { t: "T-20 min", text: "Thermal confirms localized cell heating", sensor: "thermal" },
      { t: "T-10 min", text: "Alert with risk score sent to BMS / DCIM" },
      { t: "T-0", text: "String isolated before thermal runaway" },
    ],
  },
  {
    id: "partial-discharge",
    name: "Electrical partial discharge",
    mode: "datacenter",
    firstSensor: "acoustic",
    physical:
      "Insulation degradation causes micro-arcing that emits ultrasound and, eventually, heat — a precursor to electrical fire.",
    conventionalMiss:
      "Partial discharge is silent and invisible; it is usually found only during scheduled outages, if at all.",
    braveBotAction:
      "The acoustic array detects the discharge signature near switchgear and the AI flags it as an electrical-fire precursor.",
    alert: "PDU Gallery — partial discharge signature at switchgear panel 7.",
    action: "Schedule infrared + PD survey, plan controlled de-energization for repair.",
    timeline: [
      { t: "Day 0", text: "Acoustic array detects intermittent ultrasonic discharge", sensor: "acoustic" },
      { t: "Day 0", text: "AI classifies the pattern as partial discharge" },
      { t: "Day 1", text: "Repeat patrols confirm the signature is persistent", sensor: "acoustic" },
      { t: "Day 1", text: "Work order raised for a PD survey" },
      { t: "Planned", text: "Panel repaired during a controlled outage" },
    ],
  },
  {
    id: "gpu-thermal",
    name: "GPU thermal cascade",
    mode: "datacenter",
    firstSensor: "thermal",
    physical:
      "A blocked filter or failing fan lets one rack run hot; neighboring racks recirculate the heat and the hot zone spreads.",
    conventionalMiss:
      "Rack inlet sensors see the symptom late and cannot tell which rack started it.",
    braveBotAction:
      "Thermal mapping catches the originating rack, the AI models the spread, and the robot recommends an airflow fix before throttling cascades.",
    alert: "Aisle 3 — thermal cascade origin at Rack 3F, 11°C above baseline.",
    action: "Clear airflow obstruction, verify containment, rebalance CRAH setpoints.",
    timeline: [
      { t: "T-25 min", text: "Thermal flags Rack 3F exhaust above baseline", sensor: "thermal" },
      { t: "T-18 min", text: "AI models heat recirculation to neighbors" },
      { t: "T-12 min", text: "Visual check finds a blocked containment panel", sensor: "visual" },
      { t: "T-6 min", text: "Alert + airflow recommendation sent to DCIM" },
      { t: "T-0", text: "Obstruction cleared before GPU throttling spreads" },
    ],
  },
  {
    id: "containment-door",
    name: "Open containment door",
    mode: "datacenter",
    firstSensor: "visual",
    physical:
      "A containment door left open mixes hot and cold air, raising cooling energy use and creating local hotspots.",
    conventionalMiss:
      "No fixed sensor watches every door; the loss shows up only as a slow PUE drift.",
    braveBotAction:
      "The visual model detects the open door on patrol and correlates it with a measured local temperature rise.",
    alert: "Cold Aisle 2 — containment door open, +1.8°C local rise.",
    action: "Close and latch the door; log the recurring offender for facilities review.",
    timeline: [
      { t: "T-0 patrol", text: "Visual model detects an open containment door", sensor: "visual" },
      { t: "+10 s", text: "Thermal confirms a local hot/cold air mix", sensor: "thermal" },
      { t: "+30 s", text: "Low-severity alert + photo logged to the dashboard" },
      { t: "Same shift", text: "Door closed; event added to the audit log" },
    ],
  },
  {
    id: "pump-bearing",
    name: "Pump bearing wear",
    mode: "both",
    firstSensor: "acoustic",
    physical:
      "A coolant or process pump bearing wears, shifting its vibration and ultrasonic signature weeks before seizure.",
    conventionalMiss:
      "Run-to-failure or fixed-interval maintenance misses the early degradation window.",
    braveBotAction:
      "The acoustic array trends the bearing signature patrol over patrol and the AI projects remaining useful life.",
    alert: "CDU Pump 2 — bearing signature degradation, est. 3-week RUL.",
    action: "Schedule bearing replacement at the next planned maintenance window.",
    timeline: [
      { t: "Week 0", text: "Acoustic baseline captured for the pump", sensor: "acoustic" },
      { t: "Week 2", text: "Signature shift detected vs. baseline", sensor: "acoustic" },
      { t: "Week 3", text: "AI projects remaining useful life" },
      { t: "Week 3", text: "Planned work order raised in the CMMS" },
      { t: "Planned", text: "Bearing replaced before any unplanned stop" },
    ],
  },
  {
    id: "gas-leak",
    name: "Refrigerant / gas leak",
    mode: "both",
    firstSensor: "gas",
    physical:
      "A refrigerant or process-gas fitting leaks a slow plume that disperses with airflow.",
    conventionalMiss:
      "Fixed point detectors miss leaks between them and never indicate direction to the source.",
    braveBotAction:
      "The robot follows the concentration gradient with its mast sensor to localize the leak; in OTC mode an optional OGI / TDLAS module images the plume.",
    alert: "Mechanical Room — refrigerant concentration gradient, source localized to fitting J-12.",
    action: "Tighten or replace the fitting, recheck concentration, log the repair.",
    timeline: [
      { t: "T-0", text: "Gas module detects an elevated concentration", sensor: "gas" },
      { t: "+2 min", text: "Robot drives a gradient search pattern", sensor: "gas" },
      { t: "+5 min", text: "Source fitting localized and photographed", sensor: "visual" },
      { t: "+6 min", text: "Alert + work order issued" },
      { t: "Same shift", text: "Fitting repaired and concentration reverified" },
    ],
  },
  {
    id: "blind-spot",
    name: "Human patrol blind spot",
    mode: "both",
    firstSensor: "acoustic",
    physical:
      "Between scheduled rounds, and in areas humans rarely enter, faults develop entirely unobserved.",
    conventionalMiss:
      "Shift gaps, fatigue and limited access mean conventional patrols simply are not there when a fault begins.",
    braveBotAction:
      "BraveBot patrols every aisle and zone 24/7, holding a consistent multi-sensor baseline that surfaces anomalies the moment they appear.",
    alert: "Zone 6 — anomaly detected during an unstaffed night patrol.",
    action: "Escalate per severity; route a technician at shift start with full context.",
    timeline: [
      { t: "02:14", text: "Autonomous night patrol enters an unstaffed zone" },
      { t: "02:15", text: "Multi-sensor scan compared against the learned baseline" },
      { t: "02:16", text: "Anomaly detected and risk-scored by the edge AI" },
      { t: "02:16", text: "Alert queued with full sensor context" },
      { t: "06:00", text: "Technician briefed with evidence at shift start" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Section 6 — Edge AI brain                                          */
/* ------------------------------------------------------------------ */

export const edgeAI = {
  inputs: ["Acoustic input", "Thermal input", "Gas input", "Visual input"],
  experts: [
    "Acoustic expert",
    "Thermal expert",
    "Gas / safety expert",
    "Visual inspection expert",
    "Maintenance / work-order expert",
  ],
  outputs: [
    "Risk score",
    "Diagnosis",
    "Location",
    "Confidence",
    "Recommended action",
    "Work order",
    "BMS / DCIM / CMMS API event",
  ],
  principles: [
    "On-board processing",
    "Offline capable",
    "Lower latency",
    "No cloud dependency",
    "Local secure deployment",
    "Human-readable alerts",
  ],
  sampleAlert: {
    title: "ALERT · Rack 4B",
    body: "Coolant micro-leak near liquid connector.",
    lines: [
      "Acoustic confidence: 92%.",
      "Thermal hotspot predicted in 14 minutes.",
      "Recommended action: isolate line, inspect connector seal, dispatch technician.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Section 7 — Data pipeline                                          */
/* ------------------------------------------------------------------ */

export const pipeline = [
  { id: "route", label: "Patrol route", detail: "Scheduled or on-demand inspection mission" },
  { id: "scan", label: "Sensor scan", detail: "Acoustic · thermal · gas · visual capture" },
  { id: "fusion", label: "Sensor fusion", detail: "Time-aligned multimodal correlation" },
  { id: "diagnosis", label: "AI diagnosis", detail: "Expert routing and root-cause reasoning" },
  { id: "risk", label: "Risk rating", detail: "Severity, confidence and time-to-impact" },
  { id: "workorder", label: "Work order / alert", detail: "Human-readable, evidence-attached" },
  { id: "action", label: "BMS / DCIM / CMMS action", detail: "API event into facility systems" },
  { id: "audit", label: "Dashboard & audit log", detail: "Trend history and compliance record" },
];

export const integrations = [
  { name: "OPC UA", kind: "protocol" },
  { name: "MQTT", kind: "protocol" },
  { name: "REST", kind: "protocol" },
  { name: "BMS", kind: "system" },
  { name: "DCIM", kind: "system" },
  { name: "Maximo", kind: "cmms" },
  { name: "SAP PM", kind: "cmms" },
  { name: "Infor EAM", kind: "cmms" },
  { name: "OSI PI", kind: "historian" },
];

/* ------------------------------------------------------------------ */
/*  Section 8 — Use cases                                              */
/* ------------------------------------------------------------------ */

export interface UseCase {
  id: string;
  title: string;
  problem: string;
  sensing: string;
  earlyWarning: string;
  outcome: string;
}

export const useCases: UseCase[] = [
  {
    id: "liquid-cooling",
    title: "Liquid cooling protection",
    problem: "Direct-to-chip and immersion loops can weep at connectors with no early visible sign.",
    sensing: "Acoustic localization of ultrasonic leak jets, confirmed by thermal trend modelling.",
    earlyWarning: "Minutes-to-hours of lead time before a hotspot or pooled-liquid event.",
    outcome: "Seal repaired on a planned basis; GPUs protected from coolant exposure.",
  },
  {
    id: "ups-battery",
    title: "UPS battery safety",
    problem: "Lithium and VRLA cells off-gas and heat before thermal runaway.",
    sensing: "Gas detection of H2 / VOC off-gas correlated with localized thermal heating.",
    earlyWarning: "Source string identified well before a room-level gas alarm.",
    outcome: "Affected string isolated; runaway and downstream load loss avoided.",
  },
  {
    id: "electrical-fire",
    title: "Electrical fire prevention",
    problem: "Partial discharge and loose connections precede most electrical fires.",
    sensing: "Acoustic partial-discharge detection plus thermal joint scanning.",
    earlyWarning: "Precursor signatures caught patrols or days ahead of failure.",
    outcome: "Repairs scheduled into planned outages instead of emergency response.",
  },
  {
    id: "gpu-hotspot",
    title: "GPU hotspot detection",
    problem: "Airflow faults let individual racks overheat and throttle compute.",
    sensing: "Per-rack thermal mapping against a learned aisle baseline.",
    earlyWarning: "Origin rack flagged before heat recirculates to neighbors.",
    outcome: "Airflow corrected; sustained GPU performance and fewer throttling events.",
  },
  {
    id: "pue",
    title: "PUE optimization",
    problem: "Conservative cooling setpoints waste energy when real margins are unknown.",
    sensing: "Continuous thermal mapping reveals true hot/cold aisle headroom.",
    earlyWarning: "Data-driven confidence to safely raise ambient setpoints.",
    outcome: "Lower cooling energy at a verified, monitored thermal margin (estimate — validate per facility).",
  },
  {
    id: "asset-inspection",
    title: "Asset & gauge inspection",
    problem: "Analog gauges and asset audits depend on inconsistent manual rounds.",
    sensing: "Visual gauge OCR, indicator-light reading and asset-tag tracking.",
    earlyWarning: "Out-of-range readings flagged the moment they appear on patrol.",
    outcome: "Auditable inspection record with no added staff workload.",
  },
  {
    id: "hv-inspection",
    title: "Non-contact high-voltage inspection",
    problem: "Energized switchgear is hazardous and slow for humans to inspect closely.",
    sensing: "Stand-off acoustic and thermal scanning from a safe distance.",
    earlyWarning: "Discharge and heating signatures detected without entering the arc-flash boundary.",
    outcome: "Safer inspections and reduced exposure for technicians.",
  },
  {
    id: "patrol",
    title: "Autonomous 24/7 patrol",
    problem: "Shift gaps and fatigue leave long windows with no inspection coverage.",
    sensing: "Continuous multi-sensor patrol on scheduled and on-demand routes.",
    earlyWarning: "Anomalies surfaced the moment they appear, day or night.",
    outcome: "Consistent coverage and a complete, time-stamped inspection history.",
  },
];

/* ------------------------------------------------------------------ */
/*  Section 9 — Industrial / OTC mode features                         */
/* ------------------------------------------------------------------ */

export const industrialFeatures = [
  { title: "Methane leak detection", detail: "Optional laser-based methane sensing along pipe racks and wellheads." },
  { title: "Flammable / toxic gas", detail: "Configurable detection for LEL gases and toxic exposure limits." },
  { title: "OGI / TDLAS configuration", detail: "Optical gas imaging and tunable-diode laser options for plume work." },
  { title: "Pipe racks & grating", detail: "Wheel-legged mobility crosses grating and walkways between zones." },
  { title: "Confined compartments", detail: "Offline edge AI operates where there is no connectivity at all." },
  { title: "Rotating machinery", detail: "Acoustic and thermal trending on pumps, motors and compressors." },
  { title: "Bearing wear & seals", detail: "Early signature shifts projected into remaining useful life." },
  { title: "Partial discharge", detail: "Stand-off acoustic detection on outdoor and indoor switchgear." },
  { title: "Harsh weather duty", detail: "Sealed rugged chassis targeting demanding outdoor conditions." },
  { title: "ATEX Zone 2 messaging", detail: "Hazardous-area certification matrix is configuration-dependent — verify before deployment." },
  { title: "CMMS work orders", detail: "Findings flow into Maximo, SAP PM and Infor EAM as structured orders." },
];

export const otcNote =
  "Industrial & OTC Mode shows a related but separate configuration. Gas ranges, OGI / TDLAS options and ATEX-zone certification differ from the data-center build and must be confirmed against the OTC technical sheet before deployment.";

/* ------------------------------------------------------------------ */
/*  Section 10 — ROI / PUE calculator                                  */
/* ------------------------------------------------------------------ */

export const calculator = {
  /** Every +1°C ambient setpoint may reduce cooling energy by ~3%. */
  coolingPerDegreeC: 0.03,
  defaults: {
    coolingCost: 1_200_000, // annual cooling energy spend, USD
    setpointIncrease: 2, // °C
    racks: 400,
    outageCostPerHour: 250_000, // USD
    avoidedIncidents: 3, // per year
    avoidedHoursPerIncident: 4,
  },
  disclaimer:
    "Estimate only. The +1°C ≈ 3% cooling-energy figure is a planning heuristic — validate against facility-specific cooling architecture and operating conditions.",
};

/* ------------------------------------------------------------------ */
/*  Section 11 — Patrol dashboard mock                                 */
/* ------------------------------------------------------------------ */

export const dashboard = {
  status: {
    battery: 78,
    network: "local / offline-capable",
    mode: "autonomous patrol",
    zone: "UPS corridor",
    risk: "moderate",
  },
  sensorHealth: [
    { name: "Acoustic array", status: "ok" },
    { name: "Thermal camera", status: "ok" },
    { name: "Gas module", status: "ok" },
    { name: "Visual camera", status: "ok" },
    { name: "IMU / balance", status: "ok" },
    { name: "Edge compute", status: "ok" },
  ],
  alerts: [
    { id: "A-118", sev: "crit", text: "Rack 4B — coolant micro-leak signature", zone: "Aisle 4" },
    { id: "A-117", sev: "warn", text: "PDU 7 — joint temperature above baseline", zone: "PDU gallery" },
    { id: "A-116", sev: "info", text: "Cold Aisle 2 — containment door opened", zone: "Aisle 2" },
  ],
  workOrders: [
    { id: "WO-4471", text: "Inspect & reseal liquid connector, Rack 4B", state: "Dispatched" },
    { id: "WO-4470", text: "Thermal survey PDU 7 terminations", state: "Queued" },
    { id: "WO-4468", text: "CDU Pump 2 bearing replacement", state: "Planned" },
  ],
  route: ["Dock", "Aisle 1", "Aisle 2", "UPS corridor", "PDU gallery", "Aisle 4", "Dock"],
};

/* ------------------------------------------------------------------ */
/*  Section 12 — Specs                                                 */
/* ------------------------------------------------------------------ */

export interface Spec {
  label: string;
  value: string;
  confidence: Confidence;
}

export const specs: Spec[] = [
  { label: "Robot type", value: "Wheel-legged autonomous inspection robot", confidence: "confirmed" },
  { label: "Base platform", value: "Modified LimX Dynamics TRON 1-style architecture", confidence: "confirmed" },
  { label: "Chassis footprint", value: "Compact ~9 in × 11 in", confidence: "confirmed" },
  { label: "Chassis weight", value: "48 lb (robot body)", confidence: "confirmed" },
  { label: "Sensor payload", value: "33 lb sensor stack", confidence: "config-dependent" },
  { label: "Mobility", value: "Wheel-legged, stair / slope capable", confidence: "confirmed" },
  { label: "Slope capability", value: "Up to 30°", confidence: "confirmed" },
  { label: "Step / stair capability", value: "Up to ~10 in steps", confidence: "estimated" },
  { label: "Ruggedness", value: "IP66 (target rating)", confidence: "config-dependent" },
  { label: "Runtime", value: "2–4 hours per charge", confidence: "estimated" },
  { label: "Battery", value: "Hot-swappable, ~10-second swap", confidence: "confirmed" },
  { label: "Charging", value: "~40 minutes to full", confidence: "estimated" },
  { label: "Sensor stack", value: "Acoustic · thermal · gas · visual", confidence: "confirmed" },
  { label: "Acoustic sensing", value: "Phased acoustic imaging, ultrasonic up to 100 kHz", confidence: "config-dependent" },
  { label: "Gas sensing", value: "VOC / CO / H2 / off-gas; OGI / TDLAS optional (OTC)", confidence: "optional" },
  { label: "AI", value: "Edge-resident multimodal AI / local reasoning", confidence: "confirmed" },
  { label: "Integrations", value: "OPC UA · MQTT · REST · BMS · DCIM · CMMS", confidence: "confirmed" },
];

export const verifyBeforePublishing = [
  "Exact gas detection ranges and target species per configuration.",
  "Exact acoustic frequency range under the shipping array.",
  "ATEX / hazardous-area certification status for OTC builds.",
  "Final sensor payload weight if engineering revises the stack.",
  "Step / stair height — currently a conservative estimate.",
  "Runtime under full sensor payload and continuous scanning.",
];

/* ------------------------------------------------------------------ */
/*  Section 13 — Visual gallery / image prompts                        */
/* ------------------------------------------------------------------ */

export interface ImageConcept {
  id: string;
  title: string;
  caption: string;
  /** which placeholder illustration to render */
  art: "hero" | "leg" | "mast" | "acoustic" | "thermal" | "gas" | "dashboard" | "industrial" | "exploded" | "patrolmap";
  prompt: string;
}

const promptStyle =
  "Compact industrial wheel-legged inspection robot, modified TRON 1 style, two articulated robotic legs ending in rugged rubber wheels, sealed rectangular silver-white torso, black front sensor/display panel, orange protective rails, top-mounted multi-sensor mast with acoustic array thermal camera gas sensor and visible camera, cinematic lighting, photorealistic product render, high detail, no logos, no text, realistic engineering design.";

export const imageConcepts: ImageConcept[] = [
  {
    id: "hero",
    title: "Hero render — data center aisle",
    caption: "BraveBot on patrol in a dark AI data center aisle. Concept visualization.",
    art: "hero",
    prompt:
      "Photorealistic cinematic render of a compact wheel-legged autonomous inspection robot standing in a dark AI data center aisle, two articulated legs with rugged wheel-feet, sealed rectangular white/silver industrial torso, orange guard rails, black front display panel, top sensor mast with acoustic array thermal camera gas sensor and visible camera, blue glowing server racks, subtle acoustic waves and thermal scan overlays, premium robotics product photography, high detail, realistic, no logos, no text.",
  },
  {
    id: "leg",
    title: "Wheel-leg close-up",
    caption: "Articulated leg ending in a rugged rubber wheel-foot. Concept visualization.",
    art: "leg",
    prompt:
      "Close-up product render of a robotic articulated leg ending in a rugged rubber wheel-foot, exposed metal linkages, compact actuator housings, orange accent brackets, industrial design, clean studio lighting, engineering detail, photorealistic, no logos, no text.",
  },
  {
    id: "mast",
    title: "Sensor mast close-up",
    caption: "Multi-sensor mast: acoustic array, thermal camera, gas module, visible camera. Concept visualization.",
    art: "mast",
    prompt:
      "Close-up render of an industrial robot sensor mast with acoustic imaging array, infrared thermal camera, gas telemetry sensor, visible AI camera, sealed rugged housings, cable channels, mounted on a compact inspection robot torso, photorealistic, no logos, no text.",
  },
  {
    id: "acoustic",
    title: "Acoustic leak visualization",
    caption: "Coolant micro-leak rendered as an ultrasonic acoustic heatmap. Concept visualization.",
    art: "acoustic",
    prompt:
      "AI data center liquid cooling rack with tiny coolant connector micro-leak visualized as ultrasonic acoustic heatmap overlay, compact wheel-legged inspection robot scanning from aisle, blue server rack lighting, technical visualization, photorealistic, no logos, no text.",
  },
  {
    id: "thermal",
    title: "Thermal inspection map",
    caption: "Rack and UPS infrared heatmap with a flagged hotspot. Concept visualization.",
    art: "thermal",
    prompt:
      "Data center server rack and UPS cabinet shown with infrared thermal heatmap overlay, compact wheel-legged inspection robot scanning, hotspot highlighted near power connector, professional technical visualization, no logos, no text.",
  },
  {
    id: "gas",
    title: "Gas plume detection",
    caption: "Battery off-gas plume visualized near a UPS cabinet. Concept visualization.",
    art: "gas",
    prompt:
      "Autonomous wheel-legged inspection robot detecting invisible gas plume near UPS battery cabinet in data center, gas cloud visualized as translucent colored particles, sensor beam from robot mast, cinematic realistic render, no logos, no text.",
  },
  {
    id: "dashboard",
    title: "Patrol dashboard screenshot",
    caption: "Live multimodal AI diagnosis console. Concept visualization.",
    art: "dashboard",
    prompt:
      "Clean futuristic data center inspection dashboard UI, dark theme with cyan and orange accents, panels for live robot camera, thermal map, acoustic heatmap, gas trend graph, robot pose map, alerts and work orders, glassmorphism, high detail, no logos, no text.",
  },
  {
    id: "industrial",
    title: "Industrial / OTC version",
    caption: "BraveBot inspecting a plant pipe rack. Concept visualization.",
    art: "industrial",
    prompt:
      "Compact wheel-legged inspection robot patrolling industrial plant corridor with pipes, grating, valves, and gas leak detection visualization, rugged sealed body, top sensor mast, orange accent rails, photorealistic industrial robotics render, no logos, no text.",
  },
  {
    id: "exploded",
    title: "Exploded-view diagram",
    caption: "Shell, compute, battery, sensors, legs and wheels. Concept visualization.",
    art: "exploded",
    prompt:
      "Technical exploded-view diagram of compact wheel-legged inspection robot, showing sensor mast, acoustic array, thermal camera, gas sensor, visible camera, edge AI compute module, hot-swap battery, sealed torso shell, articulated legs, rugged wheel-feet, clean white background, product design style, no logos, no text.",
  },
  {
    id: "patrolmap",
    title: "Patrol map",
    caption: "BraveBot route through aisles and inspection zones. Concept visualization.",
    art: "patrolmap",
    prompt:
      "Top-down stylized data center floor map with a wheel-legged inspection robot patrol route through server aisles and inspection zones, glowing waypoints, dark theme cyan and orange, technical UI visualization, no logos, no text.",
  },
];

export const baseImagePromptStyle = promptStyle;

/* ------------------------------------------------------------------ */
/*  Section 14 — Comparison                                            */
/* ------------------------------------------------------------------ */

export const comparison = {
  columns: ["Manual Patrol", "Fixed Sensors", "BraveBot"],
  rows: [
    {
      capability: "Coverage",
      manual: "Shift-bound rounds with fatigue and gaps",
      fixed: "Only the points where sensors are installed",
      bravebot: "Every aisle and zone, patrolled on schedule",
    },
    {
      capability: "Timing",
      manual: "Slow, periodic reporting",
      fixed: "Often detects late-stage conditions only",
      bravebot: "Continuous 24/7 monitoring, early-precursor focus",
    },
    {
      capability: "Ultrasonic faults",
      manual: "Cannot hear ultrasonic leaks or discharge",
      fixed: "Single-point, rarely localizes the source",
      bravebot: "Mobile acoustic imaging that localizes the source",
    },
    {
      capability: "Early off-gas",
      manual: "Cannot smell early off-gas safely",
      fixed: "Triggers at room-level alarm thresholds",
      bravebot: "Detects and localizes off-gas before a room alarm",
    },
    {
      capability: "Localization",
      manual: "Approximate, depends on the technician",
      fixed: "Limited — fixed position only",
      bravebot: "Drives to and pinpoints the anomaly source",
    },
    {
      capability: "Action",
      manual: "Manual notes and handovers",
      fixed: "Raw alarm with little context",
      bravebot: "Generates risk-scored work orders with evidence",
    },
    {
      capability: "Deployment",
      manual: "Limited access to hazardous areas",
      fixed: "Difficult and costly to retrofit everywhere",
      bravebot: "Edge AI, offline-capable, no fixed retrofit per point",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

export const finalCta = {
  headline: "Deploy a robot that patrols, detects, reasons, and reports before the alarm.",
  buttons: ["Request Demo", "View Technical Sheet", "Explore Data Center Use Cases"],
};

/* ------------------------------------------------------------------ */
/*  Section navigation                                                 */
/* ------------------------------------------------------------------ */

export const navSections = [
  { id: "hero", label: "Overview" },
  { id: "anatomy", label: "Anatomy" },
  { id: "mobility", label: "Mobility" },
  { id: "sensors", label: "Sensors" },
  { id: "simulator", label: "Threats" },
  { id: "brain", label: "Edge AI" },
  { id: "pipeline", label: "Pipeline" },
  { id: "usecases", label: "Use Cases" },
  { id: "industrial", label: "Industrial" },
  { id: "roi", label: "ROI" },
  { id: "dashboard", label: "Dashboard" },
  { id: "specs", label: "Specs" },
  { id: "gallery", label: "Gallery" },
  { id: "compare", label: "Compare" },
];
