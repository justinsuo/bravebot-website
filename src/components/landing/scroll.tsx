"use client";

/**
 * Scroll system for the landing page.
 *
 * `SmoothScroll` wraps the page in Lenis inertial scrolling and keeps GSAP
 * ScrollTrigger in sync with it. Smoothing is skipped entirely when the
 * user prefers reduced motion (native scroll only).
 */

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Native scroll only — no inertial smoothing — for reduced motion.
    if (prefersReducedMotion()) return;

    // `anchors: true` lets Lenis smooth-scroll in-page #hash links itself.
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
