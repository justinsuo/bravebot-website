import type { Metadata } from "next";
import { SmoothScroll } from "@/components/landing/scroll";
import { LandingNav } from "@/components/landing/LandingNav";
import { Experience } from "@/components/landing/Experience";
import { RobotExplorer } from "@/components/landing/RobotExplorer";
import { StorySection } from "@/components/landing/StorySection";
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
 * Landing page — calm and minimal: a single-screen hero with a centered
 * 3D particle scene, then normal stacked sections with simple fade
 * transitions on scroll. Lenis provides smooth scrolling throughout.
 */
export default function HomePage() {
  return (
    <SmoothScroll>
      <LandingNav />
      <main id="top">
        <Experience />
        <RobotExplorer />
        <StorySection />
        <FeatureGrid />
        <SocialProof />
        <TechnicalSection />
        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
