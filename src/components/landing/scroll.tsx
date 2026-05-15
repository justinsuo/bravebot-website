"use client";

/**
 * Scroll system for the landing page.
 *
 *  - `SmoothScroll`   wraps the page in Lenis inertial scrolling and keeps
 *                     GSAP ScrollTrigger in sync with it.
 *  - `ProgressProvider` / `useProgressRef` share a mutable scroll-progress
 *                     value (0..1 for the pinned experience) with the 3D
 *                     scene WITHOUT triggering React re-renders.
 *
 * All smoothing/animation is skipped when the user prefers reduced motion.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type MutableRefObject,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- smooth scrolling ------------------------------------------------ */

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

/* ---- shared scroll progress (ref, not state) ------------------------- */

type ProgressRef = MutableRefObject<number>;

const ProgressContext = createContext<ProgressRef | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const ref = useRef(0);
  return (
    <ProgressContext.Provider value={ref}>{children}</ProgressContext.Provider>
  );
}

export function useProgressRef(): ProgressRef {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgressRef must be used within ProgressProvider");
  return ctx;
}
