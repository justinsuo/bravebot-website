"use client";

/**
 * RobotScene — the central 3D visual.
 *
 * Real LimX Dynamics TRON 1 (WF_TRON1A) link meshes (base, abad, hip, knee,
 * wheel) assembled per the published URDF chain, plus original BraveBot
 * modification parts — each modelled in detail from primitives in
 * RobotParts.tsx (no third-party assets).
 *
 * Two modes:
 *  - scroll mode (progressRef): a scrubbed exploded-view transition.
 *  - interactive mode: a fixed exploded view with orbit controls and
 *    click-to-select parts for the hotspot explorer.
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
import { partMaterial, PartGeometry, type MatKey } from "./RobotParts";

interface Part {
  id: string;
  kind: "stl" | "mod";
  file?: string; // stl only
  mat?: MatKey; // stl only
  pos: [number, number, number];
  explode: [number, number, number];
}

/* Real TRON 1 links (URDF chain) + BraveBot modification parts. */
const PARTS: Part[] = [
  { id: "base", kind: "stl", file: "base_Link", mat: "shell", pos: [0, 0, 0], explode: [0, 0, 0.16] },
  { id: "abadL", kind: "stl", file: "abad_L_Link", mat: "metal", pos: [0.05556, 0.105, -0.2602], explode: [0, 0.22, 0.02] },
  { id: "abadR", kind: "stl", file: "abad_R_Link", mat: "metal", pos: [0.05556, -0.105, -0.2602], explode: [0, -0.22, 0.02] },
  { id: "hipL", kind: "stl", file: "hip_L_Link", mat: "metal", pos: [-0.02144, 0.1255, -0.2602], explode: [-0.05, 0.4, -0.04] },
  { id: "hipR", kind: "stl", file: "hip_R_Link", mat: "metal", pos: [-0.02144, -0.1255, -0.2602], explode: [-0.05, -0.4, -0.04] },
  { id: "kneeL", kind: "stl", file: "knee_L_Link", mat: "metal", pos: [-0.17144, 0.105, -0.52001], explode: [-0.2, 0.56, -0.16] },
  { id: "kneeR", kind: "stl", file: "knee_R_Link", mat: "metal", pos: [-0.17144, -0.105, -0.52001], explode: [-0.2, -0.56, -0.16] },
  { id: "wheelL", kind: "stl", file: "wheel_L_Link", mat: "tire", pos: [-0.02144, 0.1485, -0.77982], explode: [0.05, 0.74, -0.42] },
  { id: "wheelR", kind: "stl", file: "wheel_R_Link", mat: "tire", pos: [-0.02144, -0.1485, -0.77982], explode: [0.05, -0.74, -0.42] },
  // --- BraveBot modifications (detailed primitives, see RobotParts.tsx) ---
  { id: "payload", kind: "mod", pos: [0.02, 0, 0.045], explode: [0, 0, 0.32] },
  { id: "torso", kind: "mod", pos: [0.02, 0, 0.215], explode: [-0.55, 0, 0.26] },
  { id: "battery", kind: "mod", pos: [0.02, 0, 0.12], explode: [0.72, 0, -0.12] },
  { id: "edgeai", kind: "mod", pos: [-0.03, 0, 0.22], explode: [-0.98, 0, 0.16] },
  { id: "display", kind: "mod", pos: [0.165, 0, 0.215], explode: [0.95, 0, 0.06] },
  { id: "rear", kind: "mod", pos: [-0.12, 0, 0.215], explode: [-0.92, 0, 0.34] },
  { id: "estop", kind: "mod", pos: [-0.1, 0.11, 0.31], explode: [-0.45, 0.5, 0.42] },
  { id: "mast", kind: "mod", pos: [0.02, 0, 0.43], explode: [0, 0, 0.5] },
  { id: "head", kind: "mod", pos: [0.02, 0, 0.57], explode: [0, 0, 0.96] },
  { id: "acoustic", kind: "mod", pos: [0.14, 0.075, 0.58], explode: [0.52, 0.62, 0.5] },
  { id: "thermal", kind: "mod", pos: [0.145, 0, 0.6], explode: [0.74, 0, 0.72] },
  { id: "hdcam", kind: "mod", pos: [0.145, -0.075, 0.58], explode: [0.52, -0.62, 0.5] },
  { id: "gas", kind: "mod", pos: [0.14, 0, 0.535], explode: [0.82, 0.32, 0.36] },
  { id: "nav", kind: "mod", pos: [0.145, 0, 0.48], explode: [0.96, 0, 0.16] },
  { id: "antennaL", kind: "mod", pos: [0, 0.07, 0.71], explode: [0, 0.34, 0.5] },
  { id: "antennaR", kind: "mod", pos: [0, -0.07, 0.71], explode: [0, -0.34, 0.5] },
  { id: "railL", kind: "mod", pos: [0.03, 0.176, -0.1], explode: [0, 0.6, -0.08] },
  { id: "railR", kind: "mod", pos: [0.03, -0.176, -0.1], explode: [0, -0.6, -0.08] },
];

const STL_PARTS = PARTS.filter((p) => p.kind === "stl");
// Prefix with the base path so static-export builds (GitHub Pages) resolve.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const STL_FILES = STL_PARTS.map((p) => `${BASE_PATH}/models/tron1/${p.file}.stl`);

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
  const groups = useRef<(THREE.Group | null)[]>([]);
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
      const grp = groups.current[i];
      if (!grp) continue;
      const { pos, explode } = PARTS[i];
      grp.position.set(
        pos[0] + explode[0] * e,
        pos[1] + explode[1] * e,
        pos[2] + explode[2] * e,
      );
    }
    if (spinRef.current && !interactive && !reduced) {
      spinRef.current.rotation.y += d * 0.2;
    }
  });

  return (
    <group ref={spinRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={contentRef}>
          {PARTS.map((p, i) => {
            const hot = !!highlighted?.includes(p.id);
            const handlers =
              interactive && onPick
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
              <group
                key={p.id}
                ref={(el) => {
                  groups.current[i] = el;
                }}
                position={p.pos}
                {...handlers}
              >
                {p.kind === "stl" ? (
                  <mesh geometry={geoByPart.get(p.id)}>
                    <meshStandardMaterial {...partMaterial(p.mat ?? "metal", hot)} />
                  </mesh>
                ) : (
                  <PartGeometry id={p.id} hot={hot} />
                )}
              </group>
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
            enableZoom={false}
            autoRotate={!env.reduced}
            autoRotateSpeed={0.6}
          />
        )}
      </Canvas>
    </div>
  );
}
