import type { Metadata } from "next";
import { SmoothScroll, ProgressProvider } from "@/components/landing/scroll";
import { LandingNav } from "@/components/landing/LandingNav";
import { Experience } from "@/components/landing/Experience";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { SocialProof } from "@/components/landing/SocialProof";
import { TechnicalSection } from "@/components/landing/TechnicalSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const metadata: Metadata = {
  title: "BraveBot — Embodied AI Inspection Robot | Vigiles Robotics",
  description:
    "BraveBot is a wheel-legged autonomous robot that patrols AI data centers and industrial sites — sensing, reasoning and reporting invisible infrastructure failures before they become downtime.",
};

/**
 * Premium scroll-driven landing page.
 *  - Lenis smooth scrolling + GSAP ScrollTrigger
 *  - a pinned hero with a morphing React Three Fiber particle scene
 *  - staggered scroll reveals throughout
 */
export default function HomePage() {
  return (
    <SmoothScroll>
      <LandingNav />
      <main id="top">
        {/* hero + pinned 3D scroll story share one scroll-progress context */}
        <ProgressProvider>
          <Experience />
        </ProgressProvider>
        <FeatureGrid />
        <SocialProof />
        <TechnicalSection />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
