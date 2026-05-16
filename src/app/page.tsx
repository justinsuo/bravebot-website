import type { Metadata } from "next";
import { SmoothScroll } from "@/components/landing/scroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { LandingNav } from "@/components/landing/LandingNav";
import { Experience } from "@/components/landing/Experience";
import { RobotExplorer } from "@/components/landing/RobotExplorer";
import { StorySection } from "@/components/landing/StorySection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { SocialProof } from "@/components/landing/SocialProof";
import { TechnicalSection } from "@/components/landing/TechnicalSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

// In-depth platform sections (formerly the separate /explore page).
import { WheelLeggedExplainer } from "@/components/WheelLeggedExplainer";
import { SensorFusionConsole } from "@/components/SensorFusionConsole";
import { ThreatSimulator } from "@/components/ThreatSimulator";
import { EdgeAIBrain } from "@/components/EdgeAIBrain";
import { DataPipeline } from "@/components/DataPipeline";
import { UseCaseCards } from "@/components/UseCaseCards";
import { IndustrialMode } from "@/components/IndustrialMode";
import { SpecsTable } from "@/components/SpecsTable";
import { VisualGallery } from "@/components/VisualGallery";
import { ComparisonTable } from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "BraveBot — Embodied AI Inspection Robot | Vigiles Robotics",
  description:
    "BraveBot is a wheel-legged autonomous robot that patrols AI data centers and industrial sites — sensing, reasoning and reporting invisible infrastructure failures before they become downtime.",
};

/** Thin gradient divider between the deep-dive sections. */
function Divider() {
  return <div className="mx-auto h-px max-w-6xl hairline" aria-hidden="true" />;
}

/**
 * Single-page site: the scroll-driven landing experience followed by the
 * full in-depth platform content (anatomy, sensors, simulator, edge AI,
 * pipeline, use cases, ROI, dashboard, specs, gallery, comparison).
 */
export default function HomePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <LandingNav />
      <main id="top">
        {/* --- scroll-driven landing --- */}
        <Experience />
        <RobotExplorer />
        <StorySection />
        <FeatureGrid />
        <SocialProof />
        <TechnicalSection />

        {/* --- in-depth platform --- */}
        <WheelLeggedExplainer />
        <Divider />
        <SensorFusionConsole />
        <Divider />
        <ThreatSimulator />
        <Divider />
        <EdgeAIBrain />
        <Divider />
        <DataPipeline />
        <Divider />
        <UseCaseCards />
        <Divider />
        <IndustrialMode />
        <Divider />
        <SpecsTable />
        <Divider />
        <VisualGallery />
        <Divider />
        <ComparisonTable />

        <FinalCTA />
      </main>
    </SmoothScroll>
  );
}
