"use client";

/**
 * Experience — the pinned hero.
 *
 * A CSS-sticky 3D canvas holds the BraveBot model on screen while the
 * section is scrolled. A single GSAP ScrollTrigger reports progress
 * (0..1): the robot eases through one exploded-view transition, the hero
 * copy hands off to two short captions, and the whole scene fades out at
 * the end so the page transitions cleanly into the next section.
 *
 * Reduced motion: a plain, non-pinned hero with the model held assembled.
 */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./scroll";
import { landing } from "@/config/landing";

const RobotScene = dynamic(
  () => import("./RobotScene").then((m) => m.RobotScene),
  { ssr: false, loading: () => <SceneFallback /> },
);

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-72 w-72 rounded-full bg-cyan/20 blur-[90px]" />
    </div>
  );
}

/* easing helpers for the scrubbed opacity bands */
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const band = (x: number, a: number, b: number, c: number, d: number) =>
  smoothstep(a, b, x) * (1 - smoothstep(c, d, x));

function HeroCopy() {
  return (
    <>
      <h1 className="text-balance text-4xl leading-[1.06] sm:text-6xl md:text-7xl">
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
    </>
  );
}

export function Experience() {
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const capRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;

        // hero copy hands off early
        if (heroRef.current) {
          const o = 1 - smoothstep(0.02, 0.2, p);
          heroRef.current.style.opacity = String(o);
          heroRef.current.style.transform = `translateY(${(1 - o) * -36}px)`;
        }
        // two captions fade through the mid-scroll
        const bands = [band(p, 0.26, 0.36, 0.52, 0.62), band(p, 0.6, 0.7, 0.84, 0.93)];
        capRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = String(bands[i]);
          el.style.transform = `translateY(${(1 - bands[i]) * 26}px)`;
        });
        // whole scene fades out -> clean transition into the next section
        if (sceneRef.current) {
          const vis = 1 - smoothstep(0.9, 1, p);
          sceneRef.current.style.opacity = String(vis);
          sceneRef.current.style.transform = `scale(${0.96 + vis * 0.04})`;
        }
      },
    });

    return () => trigger.kill();
  }, [reduced]);

  /* ---- reduced motion: a plain assembled hero --------------------- */
  if (reduced) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
        <div className="absolute inset-0" aria-hidden="true">
          <RobotScene progressRef={progressRef} className="absolute inset-0" />
        </div>
        <div className="relative w-full max-w-3xl text-center">
          <HeroCopy />
        </div>
      </section>
    );
  }

  /* ---- pinned exploded-view experience ---------------------------- */
  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-void">
      <div
        ref={sceneRef}
        className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
      >
        {/* soft glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(52% 46% at 50% 48%, rgba(61,109,251,0.16), transparent 72%)",
          }}
        />
        {/* 3D model */}
        <RobotScene progressRef={progressRef} className="absolute inset-0" />

        {/* hero copy */}
        <div
          ref={heroRef}
          className="relative z-10 w-full max-w-3xl px-6 text-center"
        >
          <HeroCopy />
        </div>

        {/* exploded-view captions */}
        {landing.experience.captions.map((c, i) => (
          <div
            key={c.title}
            ref={(el) => {
              capRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-x-0 bottom-[14%] z-10 mx-auto max-w-md px-6 text-center"
            style={{ opacity: 0 }}
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {c.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-tdim sm:text-base">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
