import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { RobotAnatomyExplorer } from "@/components/RobotAnatomyExplorer";
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

/** Thin gradient divider between sections. */
function Divider() {
  return <div className="mx-auto h-px max-w-6xl hairline" aria-hidden="true" />;
}

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <RobotAnatomyExplorer />
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
