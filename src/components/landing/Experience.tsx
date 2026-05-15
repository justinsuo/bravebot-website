"use client";

/**
 * Experience — the hero + pinned scroll story.
 *
 * Layout: a tall section whose first child (the 3D canvas) is CSS-`sticky`,
 * so it stays fixed on screen while five full-height text panels scroll
 * over it (1 hero + 4 story states). A single GSAP ScrollTrigger reports
 * scroll progress (0..1) into the shared ref that drives the 3D morph;
 * each story panel fades itself in/out with its own scrubbed trigger.
 *
 * Reduced motion: the 3D scene holds still and panels are simply shown.
 */

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProgressRef, prefersReducedMotion } from "./scroll";
import { landing } from "@/config/landing";

const ParticleScene = dynamic(
  () => import("./ParticleScene").then((m) => m.ParticleScene),
  { ssr: false, loading: () => <SceneFallback /> },
);

/** Static visual shown before the 3D scene loads / on SSR. */
function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-72 w-72 rounded-full bg-cyan/25 blur-[90px]" />
    </div>
  );
}

/* ---- a single story panel ------------------------------------------- */

function StoryPanel({
  state,
}: {
  state: (typeof landing.story.states)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    tl.fromTo(el, { opacity: 0, y: 70 }, { opacity: 1, y: 0, ease: "power2.out" })
      .to(el, { opacity: 1, duration: 0.7 })
      .to(el, { opacity: 0, y: -70, ease: "power2.in" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center px-6">
      <div
        ref={ref}
        className="max-w-xl text-center"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-bright">
          {state.tag}
        </span>
        <h2 className="mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl">
          {state.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-tdim sm:text-lg">
          {state.body}
        </p>
      </div>
    </div>
  );
}

/* ---- the experience -------------------------------------------------- */

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const progress = useProgressRef();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    // Report scroll progress into the shared ref for the 3D scene.
    const tracker = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    // Hero copy fades out as the first story panel takes over.
    let heroTween: gsap.core.Tween | undefined;
    const hero = heroRef.current;
    if (hero && !prefersReducedMotion()) {
      heroTween = gsap.fromTo(
        hero,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "20% top",
            scrub: 0.5,
          },
        },
      );
    }

    return () => {
      tracker.kill();
      heroTween?.scrollTrigger?.kill();
      heroTween?.kill();
    };
  }, [progress]);

  return (
    <section ref={sectionRef} id="story" className="relative h-[500vh] bg-void">
      {/* sticky 3D canvas — stays pinned for the whole section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(54% 46% at 50% 42%, rgba(61,109,251,0.20), transparent 72%)",
          }}
        />
        <ParticleScene className="absolute inset-0" />
      </div>

      {/* text layer — five full-height panels scrolling over the canvas */}
      <div className="absolute inset-0">
        {/* panel 0 — hero */}
        <div className="flex h-screen flex-col items-center justify-center px-6">
          <div ref={heroRef} className="w-full max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan anim-blink" />
              {landing.hero.eyebrow}
            </span>

            <h1 className="mt-6 text-balance text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
              {landing.hero.headline}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-tdim sm:text-lg">
              {landing.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={landing.hero.ctaPrimary.href}
                className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-void transition-opacity hover:opacity-90"
              >
                {landing.hero.ctaPrimary.label}
              </a>
              <a
                href={landing.hero.ctaSecondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-line bg-panel-2/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-cyan/60"
              >
                {landing.hero.ctaSecondary.label}
              </a>
            </div>

            {/* stats */}
            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {landing.hero.stats.map((s) => (
                <div key={s.label} className="bg-void px-3 py-4">
                  <dt className="text-lg font-semibold tracking-tight text-foreground">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] leading-snug text-tfaint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-tfaint">
              Scroll to explore ↓
            </div>
          </div>
        </div>

        {/* panels 1-4 — story states */}
        {landing.story.states.map((state) => (
          <StoryPanel key={state.tag} state={state} />
        ))}
      </div>
    </section>
  );
}
