# BraveBot — Vigiles Robotics

Interactive product website for **BraveBot**, an embodied-AI inspection robot for
AI data centers and industrial / OTC environments.

BraveBot is a concept robot built on a **modified LimX Dynamics TRON 1-style
wheel-legged architecture**: a compact upright torso, two articulated legs that
end in rugged wheels, and a top-mounted multi-sensor mast. It fuses **acoustic,
thermal, gas and visual** sensing with an **on-edge AI brain** to detect
invisible infrastructure failures — coolant micro-leaks, battery off-gas,
partial discharge, thermal cascades — before they become downtime.

> All robot renders on the site are **concept visualizations**, not photographs
> of a finished product. Technical claims are labelled `confirmed`, `estimated`,
> `optional`, or `config-dependent` and several need engineering sign-off — see
> [Unresolved items](#unresolved-items-needing-engineering-confirmation).

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for scroll/interaction animation
- Visuals are **original SVG / CSS** illustrations — no external image assets,
  no copyrighted product photos.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
src/
  app/
    layout.tsx                 # root layout, SEO metadata, ModeProvider
    page.tsx                   # assembles all 15 sections
    globals.css                # design tokens + Tailwind theme + animations
  components/
    SiteNav.tsx                # sticky nav + scrollspy + mobile menu
    ModeContext.tsx            # Data Center / Industrial mode context
    ModeToggle.tsx             # the mode switch control
    BraveBotSVG.tsx            # original robot concept illustration
    ui.tsx                     # Section, headings, cards, badges, buttons
    Reveal.tsx                 # scroll-reveal wrapper (reduced-motion aware)
    icons.tsx                  # sensor icons
    Hero.tsx                   # 1  — hero
    RobotAnatomyExplorer.tsx   # 2  — interactive anatomy hotspots
    WheelLeggedExplainer.tsx   # 3  — why wheel-legged
    SensorFusionConsole.tsx    # 4  — four-sensor fusion console
    ThreatSimulator.tsx        # 5  — threat simulator + timelines
    EdgeAIBrain.tsx            # 6  — edge AI / MoE reasoning diagram
    DataPipeline.tsx           # 7  — data pipeline + integrations
    UseCaseCards.tsx           # 8  — data center use cases
    IndustrialMode.tsx         # 9  — industrial / OTC mode
    PUECalculator.tsx          # 10 — ROI / PUE calculator
    PatrolDashboardMock.tsx    # 11 — interactive patrol dashboard mock
    SpecsTable.tsx             # 12 — technical specs
    VisualGallery.tsx          # 13 — concept gallery + modal viewer
    ComparisonTable.tsx        # 14 — manual vs fixed vs BraveBot
    FinalCTA.tsx               # 15 — final CTA + footer
  data/
    bravebot.ts                # ALL product copy, specs & data model
docs/
  image_generation_prompts.md  # prompts for photorealistic renders
```

## Interactivity

Clickable anatomy hotspots · sensor fusion tabs · Data Center / Industrial mode
toggle · threat simulator with animated timelines · ROI calculator sliders ·
animated data pipeline · live-feeling dashboard mock · gallery modal viewer ·
sticky scrollspy navigation · mobile accordions. Everything respects
`prefers-reduced-motion`.

## Updating content

`src/data/bravebot.ts` is the **single source of truth**. Edit it to change
copy — components read from it and never hardcode product text.

- `specs` — the specs table. Each entry has a `confidence` of `confirmed` /
  `estimated` / `optional` / `config-dependent`, rendered as a badge. Keep this
  honest when you edit values.
- `sensors`, `threats`, `useCases`, `hotspots`, `integrations` — section content.
- `modes` — per-mode (Data Center vs Industrial/OTC) copy.
- `calculator` — ROI/PUE assumptions and disclaimer.
- `imageConcepts` — gallery items and their generation prompts.

## Replacing placeholder visuals with real product photos

The robot and gallery art are SVG/CSS placeholders. To use real renders:

1. Generate images from `docs/image_generation_prompts.md` (keep the consistent
   robot design; produce **original** renders — do not copy licensed imagery).
2. Drop the files into `public/gallery/` (e.g. `hero.jpg`, `acoustic.jpg`, …).
3. In `src/components/VisualGallery.tsx`, replace the `ConceptArt` SVG for a
   given `art` id with a Next.js `<Image>` (or `<img>`) pointing at the file.
   Keep meaningful `alt` text and the "concept visualization" caption unless the
   image is a real product photo.
4. For the hero, swap `<BraveBotSVG />` in `src/components/Hero.tsx` for an
   `<Image>` if a hero render is available.

## Updating specs

Edit the `specs` array in `src/data/bravebot.ts`. If engineering changes a
figure, also update its `confidence` level and remove the matching line from
`verifyBeforePublishing` once it is confirmed.

## Accessibility & SEO

Semantic HTML, ARIA on all interactive controls, keyboard-operable tabs /
hotspots / modal, skip link, visible focus styles, reduced-motion support, alt
text / aria-labels on visuals, and SEO + Open Graph metadata in `layout.tsx`.

## Unresolved items needing engineering confirmation

These appear in the on-site "Verify before publishing" callout and must be
checked before this site is published as marketing material:

- Exact **gas detection ranges** and target species per configuration.
- Exact **acoustic frequency range** of the shipping array (site says "up to
  100 kHz, config-dependent").
- **ATEX / hazardous-area certification** status for OTC builds.
- Final **sensor payload weight** (currently 33 lb, config-dependent).
- **Step / stair height** (currently a conservative ~10 in estimate).
- **Runtime** under full sensor payload and continuous scanning.

The ROI/PUE calculator output and the "+1 °C ≈ 3% cooling energy" heuristic are
explicitly labelled estimates and should be validated per facility.

## Changed / created files

Generated by `create-next-app`, then customized:

- **Created:** everything under `src/components/`, `src/data/bravebot.ts`,
  `docs/image_generation_prompts.md`.
- **Replaced:** `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`,
  `README.md`.
