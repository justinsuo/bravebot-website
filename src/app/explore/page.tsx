import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { RobotExplorer } from "@/components/landing/RobotExplorer";
import { WheelLeggedExplainer } from "@/components/WheelLeggedExplainer";
import { SensorFusionConsole } from "@/components/SensorFusionConsole";
import { ThreatSimulator } from "@/components/ThreatSimulator";
import { EdgeAIBrain } from "@/components/EdgeAIBrain";
import { DataPipeline } from "@/components/DataPipeline";
import { UseCaseCards } from "@/components/UseCaseCards";
import { IndustrialMode } from "@/components/IndustrialMode";
import { PUECalculator } from "@/components/PUECalculator";
import { PatrolDashboardMock } from "@/components/PatrolDashboardMock";
import { SpecsTable } from "@/components/SpecsTable";
import { VisualGallery } from "@/components/VisualGallery";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Explore the Platform",
  description:
    "The full BraveBot platform: interactive robot anatomy, four-sensor fusion, threat simulator, edge-AI reasoning, dashboards, specs and use cases.",
};

/** Thin gradient divider between sections. */
function Divider() {
  return <div className="mx-auto h-px max-w-6xl hairline" aria-hidden="true" />;
}

/** The full, in-depth product experience (linked from the landing page). */
export default function ExplorePage() {
  return (
    <>
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <RobotExplorer />
        <Divider />
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
        <PUECalculator />
        <Divider />
        <PatrolDashboardMock />
        <Divider />
        <SpecsTable />
        <Divider />
        <VisualGallery />
        <Divider />
        <ComparisonTable />
      </main>
      <FinalCTA />
    </>
  );
}
