"use client";

/**
 * GSAP ScrollTrigger fade/lift reveal.
 * Animates transform + opacity only (compositor-friendly).
 * With reduced motion the element is simply shown, no animation.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./scroll";

export function GsapReveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  start = "top 88%",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
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
    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start, once: true },
      },
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, y, start]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
