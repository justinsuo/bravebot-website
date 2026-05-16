# BraveBot — Vigiles Robotics

A scroll-driven product website for **BraveBot**, an embodied-AI inspection
robot for AI data centers and industrial sites. BraveBot is a wheel-legged
autonomous robot — built on a modified LimX Dynamics TRON 1 platform — that
patrols facilities, fuses acoustic / thermal / gas / visual sensing with an
on-edge AI brain, and reports developing faults as risk-scored work orders.

**Repository:** https://github.com/justinsuo/bravebot-website

> Robot renders are concept visualizations, not product photographs.
> Technical claims are subject to engineering verification.

## What the site is

A single-page, scroll-driven experience:

1. **Pinned hero** — a real LimX TRON 1 (WF_TRON1A) 3D model that comes apart
   into an exploded view as you scroll.
2. **Interactive explorer** — orbit the model and click any of 20 components
   to see what it does.
3. **Story, capabilities, integrations, architecture** — the product, in
   minimal scroll-revealed sections.
4. **In-depth platform** — mobility, four-sensor fusion, the threat simulator,
   the edge-AI brain, the data pipeline, use cases, industrial / OTC mode and
   the technical specs.

The 3D robot uses the real, openly-licensed TRON 1 link meshes
(`github.com/limxdynamics/robot-description`, Apache-2.0 — see
`public/models/tron1/NOTICE.txt`); the BraveBot modification parts are
original geometry.

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber + Three.js** — the 3D robot scene
- **GSAP + ScrollTrigger** — scroll-driven animation
- **Lenis** — smooth scrolling
- **Framer Motion** — small UI animations

## Run it locally

Requires **Node.js 20+** (developed on Node 24).

```bash
# 1. clone the repo
git clone https://github.com/justinsuo/bravebot-website.git
cd bravebot-website

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Then open **http://localhost:3000**.

### Other commands

```bash
npm run build   # production build
npm run start   # serve the production build (run `npm run build` first)
```

## Project structure

```
src/
  app/
    page.tsx              # the single-page site — assembles every section
    layout.tsx            # root layout, fonts, SEO metadata
    globals.css           # design tokens (theme) + Tailwind setup
    explore/page.tsx      # legacy route — redirects into the homepage
  config/
    landing.ts            # all landing copy, stats, links, colors, hotspots
  components/
    landing/
      scroll.tsx           # Lenis smooth scroll + GSAP setup
      Experience.tsx       # pinned hero with the exploding 3D model
      RobotScene.tsx       # the React Three Fiber scene
      RobotParts.tsx       # detailed geometry + materials for mod parts
      RobotExplorer.tsx    # interactive 20-hotspot explorer
      LandingNav.tsx, FeatureGrid.tsx, SocialProof.tsx,
      TechnicalSection.tsx, StorySection.tsx, FinalCTA.tsx, ...
    (in-depth platform sections — SensorFusionConsole, ThreatSimulator,
     EdgeAIBrain, DataPipeline, UseCaseCards, IndustrialMode, SpecsTable, ...)
  data/
    bravebot.ts            # structured product data for the platform sections
public/
  models/tron1/            # TRON 1 STL meshes + Apache-2.0 NOTICE
docs/
  image_generation_prompts.md
```

## Editing content

- **Landing copy, stats, links, the 20 robot hotspots** — `src/config/landing.ts`
- **Platform section data** (sensors, threats, specs, use cases) — `src/data/bravebot.ts`
- **Theme / colors** — the CSS variables at the top of `src/app/globals.css`
  (currently a clean light theme)
- **The 3D robot** — geometry and the grey material palette live in
  `src/components/landing/RobotParts.tsx`

## Notes

- All animation respects `prefers-reduced-motion`.
- The robot's modification parts are positioned by estimate and can be tuned
  in `src/components/landing/RobotScene.tsx`.
- The TRON 1 STL meshes are CAD-quality (~19 MB total) and load lazily; they
  could be optimized to a compressed GLB as a follow-up.
