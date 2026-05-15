"use client";

/**
 * RobotScene — the central 3D visual.
 *
 * Real LimX Dynamics TRON 1 (WF_TRON1A) link meshes (base, abad, hip, knee,
 * wheel) assembled per the published URDF chain, plus original BraveBot
 * modification parts (payload frame, sealed torso, sensor mast and head,
 * sensor modules, antennas, battery, edge-AI core, panels, e-stop, rails).
 *
 * Two modes:
 *  - scroll mode (progressRef): a scrubbed exploded-view transition.
 *  - interactive mode: a fixed exploded view with orbit controls and
 *    click-to-select parts, for the hotspot explorer.
 *
 * Mesh source: github.com/limxdynamics/robot-description (Apache-2.0).
 * See public/models/tron1/NOTICE.txt for attribution.
 */

import {
  useMemo,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  Suspense,
  type RefObject,
} from "react";
import { Canvas, useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import { prefersReducedMotion } from "./scroll";

type MatKey =
  | "shell" | "metal" | "casing" | "frame" | "tire"
  | "orange" | "sensor" | "lens" | "estop" | "antenna" | "core";

type Shape =
  | { kind: "stl"; file: string }
  | { kind: "box"; box: [number, number, number] }
  | { kind: "cyl"; cyl: [number, number, number] };

interface Part {
  id: string;
  shape: Shape;
  mat: MatKey;
  pos: [number, number, number];
  explode: [number, number, number];
  rot?: [number, number, number];
}

const RZ: [number, number, number] = [0, 0, Math.PI / 2]; // lens facing +x
const RX: [number, number, number] = [Math.PI / 2, 0, 0]; // upright (+z)

/* Real TRON 1 links + original BraveBot modification parts. */
const PARTS: Part[] = [
  // --- real TRON 1 links (URDF kinematic chain) ---
  { id: "base", shape: { kind: "stl", file: "base_Link" }, mat: "shell", pos: [0, 0, 0], explode: [0, 0, 0.16] },
  { id: "abadL", shape: { kind: "stl", file: "abad_L_Link" }, mat: "metal", pos: [0.05556, 0.105, -0.2602], explode: [0, 0.22, 0.02] },
  { id: "abadR", shape: { kind: "stl", file: "abad_R_Link" }, mat: "metal", pos: [0.05556, -0.105, -0.2602], explode: [0, -0.22, 0.02] },
  { id: "hipL", shape: { kind: "stl", file: "hip_L_Link" }, mat: "metal", pos: [-0.02144, 0.1255, -0.2602], explode: [-0.05, 0.4, -0.04] },
  { id: "hipR", shape: { kind: "stl", file: "hip_R_Link" }, mat: "metal", pos: [-0.02144, -0.1255, -0.2602], explode: [-0.05, -0.4, -0.04] },
  { id: "kneeL", shape: { kind: "stl", file: "knee_L_Link" }, mat: "metal", pos: [-0.17144, 0.105, -0.52001], explode: [-0.2, 0.56, -0.16] },
  { id: "kneeR", shape: { kind: "stl", file: "knee_R_Link" }, mat: "metal", pos: [-0.17144, -0.105, -0.52001], explode: [-0.2, -0.56, -0.16] },
  { id: "wheelL", shape: { kind: "stl", file: "wheel_L_Link" }, mat: "tire", pos: [-0.02144, 0.1485, -0.77982], explode: [0.05, 0.74, -0.42] },
  { id: "wheelR", shape: { kind: "stl", file: "wheel_R_Link" }, mat: "tire", pos: [-0.02144, -0.1485, -0.77982], explode: [0.05, -0.74, -0.42] },
  // --- BraveBot modifications (original primitives) ---
  { id: "payload", shape: { kind: "box", box: [0.3, 0.36, 0.05] }, mat: "frame", pos: [0.02, 0, 0.045], explode: [0, 0, 0.32] },
  { id: "torso", shape: { kind: "box", box: [0.27, 0.3, 0.27] }, mat: "casing", pos: [0.02, 0, 0.215], explode: [-0.55, 0, 0.26] },
  { id: "battery", shape: { kind: "box", box: [0.16, 0.24, 0.1] }, mat: "casing", pos: [0.02, 0, 0.12], explode: [0.72, 0, -0.12] },
  { id: "edgeai", shape: { kind: "box", box: [0.13, 0.2, 0.11] }, mat: "core", pos: [-0.03, 0, 0.22], explode: [-0.98, 0, 0.16] },
  { id: "display", shape: { kind: "box", box: [0.025, 0.2, 0.14] }, mat: "lens", pos: [0.165, 0, 0.215], explode: [0.95, 0, 0.06] },
  { id: "rear", shape: { kind: "box", box: [0.025, 0.22, 0.2] }, mat: "casing", pos: [-0.12, 0, 0.215], explode: [-0.92, 0, 0.34] },
  { id: "estop", shape: { kind: "cyl", cyl: [0.024, 0.024, 0.032] }, mat: "estop", pos: [-0.1, 0.11, 0.31], rot: RX, explode: [-0.45, 0.5, 0.42] },
  { id: "mast", shape: { kind: "box", box: [0.06, 0.06, 0.17] }, mat: "metal", pos: [0.02, 0, 0.43], explode: [0, 0, 0.5] },
  { id: "head", shape: { kind: "box", box: [0.21, 0.25, 0.14] }, mat: "shell", pos: [0.02, 0, 0.57], explode: [0, 0, 0.96] },
  { id: "acoustic", shape: { kind: "cyl", cyl: [0.05, 0.05, 0.03] }, mat: "sensor", pos: [0.14, 0.075, 0.58], rot: RZ, explode: [0.52, 0.62, 0.5] },
  { id: "thermal", shape: { kind: "cyl", cyl: [0.032, 0.032, 0.04] }, mat: "lens", pos: [0.145, 0, 0.6], rot: RZ, explode: [0.74, 0, 0.72] },
  { id: "hdcam", shape: { kind: "cyl", cyl: [0.04, 0.04, 0.038] }, mat: "lens", pos: [0.145, -0.075, 0.58], rot: RZ, explode: [0.52, -0.62, 0.5] },
  { id: "gas", shape: { kind: "box", box: [0.05, 0.07, 0.055] }, mat: "sensor", pos: [0.14, 0, 0.535], explode: [0.82, 0.32, 0.36] },
  { id: "nav", shape: { kind: "box", box: [0.06, 0.16, 0.055] }, mat: "sensor", pos: [0.145, 0, 0.48], explode: [0.96, 0, 0.16] },
  { id: "antennaL", shape: { kind: "cyl", cyl: [0.007, 0.007, 0.12] }, mat: "antenna", pos: [0, 0.07, 0.71], rot: RX, explode: [0, 0.34, 0.5] },
  { id: "antennaR", shape: { kind: "cyl", cyl: [0.007, 0.007, 0.12] }, mat: "antenna", pos: [0, -0.07, 0.71], rot: RX, explode: [0, -0.34, 0.5] },
  { id: "railL", shape: { kind: "box", box: [0.07, 0.05, 0.34] }, mat: "orange", pos: [0.03, 0.176, -0.1], explode: [0, 0.6, -0.08] },
  { id: "railR", shape: { kind: "box", box: [0.07, 0.05, 0.34] }, mat: "orange", pos: [0.03, -0.176, -0.1], explode: [0, -0.6, -0.08] },
];

const STL_PARTS = PARTS.filter((p) => p.shape.kind === "stl");
const STL_FILES = STL_PARTS.map(
  (p) => `/models/tron1/${(p.shape as { file: string }).file}.stl`,
);

const MATERIALS: Record<MatKey, THREE.MeshStandardMaterialParameters> = {
  shell: { color: "#e7eaf0", metalness: 0.55, roughness: 0.42 },
  // legs — lightened steel so they read against the dark scene
  metal: { color: "#9aa4b5", metalness: 0.72, roughness: 0.33 },
  casing: { color: "#474f60", metalness: 0.6, roughness: 0.42 },
  frame: { color: "#717b8c", metalness: 0.66, roughness: 0.4 },
  tire: { color: "#101218", metalness: 0.25, roughness: 0.72 },
  orange: { color: "#ec5a16", metalness: 0.3, roughness: 0.5, emissive: "#5e1f04", emissiveIntensity: 0.35 },
  sensor: { color: "#22324f", metalness: 0.5, roughness: 0.4, emissive: "#3d6dfb", emissiveIntensity: 0.35 },
  lens: { color: "#0a0e16", metalness: 0.1, roughness: 0.13 },
  estop: { color: "#d8392a", metalness: 0.3, roughness: 0.45, emissive: "#5e120a", emissiveIntensity: 0.5 },
  antenna: { color: "#2d333f", metalness: 0.6, roughness: 0.4 },
  core: { color: "#16223f", metalness: 0.5, roughness: 0.4, emissive: "#3d6dfb", emissiveIntensity: 0.55 },
};

const INTERACTIVE_EXPLODE = 0.5;
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

interface ModelProps {
  progressRef?: RefObject<number>;
  interactive?: boolean;
  highlighted?: string[];
  onPick?: (partId: string) => void;
  reduced: boolean;
}

function RobotModel({ progressRef, interactive, highlighted, onPick, reduced }: ModelProps) {
  const geometries = useLoader(STLLoader, STL_FILES);
  const geoByPart = useMemo(() => {
    const map = new Map<string, THREE.BufferGeometry>();
    STL_PARTS.forEach((p, i) => map.set(p.id, geometries[i]));
    return map;
  }, [geometries]);

  const spinRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const smooth = useRef(interactive ? INTERACTIVE_EXPLODE : 0);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const spin = spinRef.current;
    if (!content || !spin) return;
    const box = new THREE.Box3().setFromObject(content);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    content.position.set(-center.x, -center.y, -center.z);
    spin.scale.setScalar((interactive ? 3.6 : 4.6) / Math.max(size.z, 0.001));
  }, [geoByPart, interactive]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const target = interactive
      ? INTERACTIVE_EXPLODE
      : reduced
        ? 0
        : THREE.MathUtils.clamp(progressRef?.current ?? 0, 0, 1);
    smooth.current += (target - smooth.current) * (1 - Math.pow(0.0016, d));
    const e = easeInOut(smooth.current);

    for (let i = 0; i < PARTS.length; i++) {
      const m = meshes.current[i];
      if (!m) continue;
      const { pos, explode } = PARTS[i];
      m.position.set(
        pos[0] + explode[0] * e,
        pos[1] + explode[1] * e,
        pos[2] + explode[2] * e,
      );
    }
    // gentle auto-spin only in scroll mode
    if (spinRef.current && !interactive && !reduced) {
      spinRef.current.rotation.y += d * 0.2;
    }
  });

  return (
    <group ref={spinRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={contentRef}>
          {PARTS.map((p, i) => {
            const hot = highlighted?.includes(p.id);
            const base = MATERIALS[p.mat];
            const handlers = interactive && onPick
              ? {
                  onClick: (ev: ThreeEvent<MouseEvent>) => {
                    ev.stopPropagation();
                    onPick(p.id);
                  },
                  onPointerOver: (ev: ThreeEvent<PointerEvent>) => {
                    ev.stopPropagation();
                    document.body.style.cursor = "pointer";
                  },
                  onPointerOut: () => {
                    document.body.style.cursor = "";
                  },
                }
              : {};
            return (
              <mesh
                key={p.id}
                ref={(el) => {
                  meshes.current[i] = el;
                }}
                position={p.pos}
                rotation={p.rot ?? [0, 0, 0]}
                geometry={p.shape.kind === "stl" ? geoByPart.get(p.id) : undefined}
                {...handlers}
              >
                {p.shape.kind === "box" && <boxGeometry args={p.shape.box} />}
                {p.shape.kind === "cyl" && (
                  <cylinderGeometry args={[p.shape.cyl[0], p.shape.cyl[1], p.shape.cyl[2], 28]} />
                )}
                <meshStandardMaterial
                  {...base}
                  emissive={hot ? "#6ff0ff" : (base.emissive ?? "#000000")}
                  emissiveIntensity={hot ? 0.9 : (base.emissiveIntensity ?? 0)}
                />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}

interface RobotSceneProps {
  progressRef?: RefObject<number>;
  interactive?: boolean;
  highlighted?: string[];
  onPick?: (partId: string) => void;
  className?: string;
}

export function RobotScene({
  progressRef,
  interactive = false,
  highlighted,
  onPick,
  className = "",
}: RobotSceneProps) {
  const [env, setEnv] = useState<{ dpr: [number, number]; reduced: boolean }>({
    dpr: [1, 1.8],
    reduced: false,
  });

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setEnv({
      dpr: mobile ? [1, 1.4] : [1, 1.9],
      reduced: prefersReducedMotion(),
    });
  }, []);

  return (
    <div className={className} aria-hidden={!interactive}>
      <Canvas
        camera={{ position: interactive ? [3.4, 1.6, 8.5] : [3.2, 1.4, 9], fov: 42 }}
        dpr={env.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.62} />
        <directionalLight position={[6, 9, 7]} intensity={1.25} />
        <directionalLight position={[-7, 3, -5]} intensity={0.5} />
        <pointLight position={[0, 1, 5]} intensity={0.75} color="#3d6dfb" />
        <Suspense fallback={null}>
          <RobotModel
            progressRef={progressRef}
            interactive={interactive}
            highlighted={highlighted}
            onPick={onPick}
            reduced={env.reduced}
          />
        </Suspense>
        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={5}
            maxDistance={13}
            autoRotate={!env.reduced}
            autoRotateSpeed={0.6}
          />
        )}
      </Canvas>
    </div>
  );
}
