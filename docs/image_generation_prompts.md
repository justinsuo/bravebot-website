# BraveBot — Image Generation Prompts

The website currently ships with **original SVG/CSS concept illustrations** as
placeholders. This file holds the prompts to generate photorealistic product
renders to replace them.

> **Important — licensing & originality**
> Do **not** copy official LimX, TRON 1, BraveBot, or Vigiles imagery unless
> licensed assets have been provided. Generate **original conceptual product
> renders** from the descriptions below. Any generated visual that is not a
> real product photo must be labelled **"concept visualization"** on the site
> (the gallery captions already do this).

## Consistent robot design (use in every image)

Keep the robot identical across all renders:

> Compact industrial wheel-legged inspection robot, modified TRON 1 style, two
> articulated robotic legs ending in rugged rubber wheels, sealed rectangular
> silver-white torso, black front sensor/display panel, orange protective
> rails, top-mounted multi-sensor mast with acoustic array, thermal camera, gas
> sensor and visible camera, cinematic lighting, photorealistic product render,
> high detail, no logos, no text, realistic engineering design.

**Silhouette rule:** compact upright body + two angled articulated legs +
wheel-feet + top sensor mast. Not a humanoid with arms. Not a quadruped dog
robot. Not a simple four-wheel rover.

## Recommended output

- Hero: 2400 × 1350 px (16:9), other renders 1600 × 1200 px.
- Place files in `public/gallery/` as `hero.jpg`, `leg.jpg`, `mast.jpg`,
  `acoustic.jpg`, `thermal.jpg`, `gas.jpg`, `dashboard.jpg`, `industrial.jpg`,
  `exploded.jpg`, `patrolmap.jpg`.
- See the README for how to swap placeholders for real renders.

---

## 1. Hero render — `hero.jpg`

Photorealistic cinematic render of a compact wheel-legged autonomous inspection
robot standing in a dark AI data center aisle, two articulated legs with rugged
wheel-feet, sealed rectangular white/silver industrial torso, orange guard
rails, black front display panel, top sensor mast with acoustic array thermal
camera gas sensor and visible camera, blue glowing server racks, subtle acoustic
waves and thermal scan overlays, premium robotics product photography, high
detail, realistic, no logos, no text.

## 2. Wheel-leg close-up — `leg.jpg`

Close-up product render of a robotic articulated leg ending in a rugged rubber
wheel-foot, exposed metal linkages, compact actuator housings, orange accent
brackets, industrial design, clean studio lighting, engineering detail,
photorealistic, no logos, no text.

## 3. Sensor mast close-up — `mast.jpg`

Close-up render of an industrial robot sensor mast with acoustic imaging array,
infrared thermal camera, gas telemetry sensor, visible AI camera, sealed rugged
housings, cable channels, mounted on a compact inspection robot torso,
photorealistic, no logos, no text.

## 4. Acoustic leak visualization — `acoustic.jpg`

AI data center liquid cooling rack with tiny coolant connector micro-leak
visualized as ultrasonic acoustic heatmap overlay, compact wheel-legged
inspection robot scanning from aisle, blue server rack lighting, technical
visualization, photorealistic, no logos, no text.

## 5. Thermal map — `thermal.jpg`

Data center server rack and UPS cabinet shown with infrared thermal heatmap
overlay, compact wheel-legged inspection robot scanning, hotspot highlighted
near power connector, professional technical visualization, no logos, no text.

## 6. Gas plume — `gas.jpg`

Autonomous wheel-legged inspection robot detecting invisible gas plume near UPS
battery cabinet in data center, gas cloud visualized as translucent colored
particles, sensor beam from robot mast, cinematic realistic render, no logos,
no text.

## 7. Patrol dashboard screenshot — `dashboard.jpg`

Clean futuristic data center inspection dashboard UI, dark theme with cyan and
orange accents, panels for live robot camera, thermal map, acoustic heatmap, gas
trend graph, robot pose map, alerts and work orders, glassmorphism, high detail,
no logos, no text.

## 8. Industrial / OTC version — `industrial.jpg`

Compact wheel-legged inspection robot patrolling industrial plant corridor with
pipes, grating, valves, and gas leak detection visualization, rugged sealed
body, top sensor mast, orange accent rails, photorealistic industrial robotics
render, no logos, no text.

## 9. Exploded-view diagram — `exploded.jpg`

Technical exploded-view diagram of compact wheel-legged inspection robot, showing
sensor mast, acoustic array, thermal camera, gas sensor, visible camera, edge AI
compute module, hot-swap battery, sealed torso shell, articulated legs, rugged
wheel-feet, clean white background, product design style, no logos, no text.

## 10. Patrol map — `patrolmap.jpg`

Top-down stylized data center floor map with a wheel-legged inspection robot
patrol route through server aisles and inspection zones, glowing waypoints, dark
theme cyan and orange, technical UI visualization, no logos, no text.

---

These prompts are also stored as structured data in
`src/data/bravebot.ts` (`imageConcepts`) and surfaced inside the on-site gallery
modal, so designers can copy them directly from the live page.
