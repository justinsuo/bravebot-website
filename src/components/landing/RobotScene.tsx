"use client";

/**
 * RobotScene — the central 3D visual.
 *
 * Loads the real LimX Dynamics TRON 1 (WF_TRON1A) link meshes — base,
 * abad, hip, knee and wheel — and assembles them per the published URDF
 * kinematic chain (pure translations, default pose). Original BraveBot
 * modifications (sensor mast, head, protective rails) are added as
 * primitives on top. Scroll progress drives a single exploded-view
 * transition: each part eases out from its assembled position.
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
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";
import { prefersReducedMotion } from "./scroll";

type MatKey = "shell" | "metal" | "tire" | "orange" | "head";

interface Part {
  id: string;
  /** STL filename (real TRON 1 link) or null for a primitive BraveBot mod. */
  file: string | null;
  /** primitive box size (URDF metres) when file is null */
  box?: [number, number, number];
  mat: MatKey;
  /** assembled position in URDF coordinates (x fwd, y left, z up) */
  pos: [number, number, number];
  /** exploded-view offset, URDF coordinates */
  explode: [number, number, number];
}

/* Real TRON 1 links (URDF chain) + original BraveBot modifications. */
const PARTS: Part[] = [
  { id: "base", file: "base_Link", mat: "shell", pos: [0, 0, 0], explode: [0, 0, 0.16] },
  { id: "abadL", file: "abad_L_Link", mat: "metal", pos: [0.05556, 0.105, -0.2602], explode: [0, 0.2, 0.02] },
  { id: "abadR", file: "abad_R_Link", mat: "metal", pos: [0.05556, -0.105, -0.2602], explode: [0, -0.2, 0.02] },
  { id: "hipL", file: "hip_L_Link", mat: "metal", pos: [-0.02144, 0.1255, -0.2602], explode: [-0.05, 0.36, -0.04] },
  { id: "hipR", file: "hip_R_Link", mat: "metal", pos: [-0.02144, -0.1255, -0.2602], explode: [-0.05, -0.36, -0.04] },
  { id: "kneeL", file: "knee_L_Link", mat: "metal", pos: [-0.17144, 0.105, -0.52001], explode: [-0.18, 0.52, -0.16] },
  { id: "kneeR", file: "knee_R_Link", mat: "metal", pos: [-0.17144, -0.105, -0.52001], explode: [-0.18, -0.52, -0.16] },
  { id: "wheelL", file: "wheel_L_Link", mat: "tire", pos: [-0.02144, 0.1485, -0.77982], explode: [0.04, 0.7, -0.42] },
  { id: "wheelR", file: "wheel_R_Link", mat: "tire", pos: [-0.02144, -0.1485, -0.77982], explode: [0.04, -0.7, -0.42] },
  // --- BraveBot modifications (original primitives) ---
  { id: "mast", file: null, box: [0.07, 0.07, 0.17], mat: "metal", pos: [0.02, 0, 0.1], explode: [0, 0, 0.5] },
  { id: "head", file: null, box: [0.24, 0.2, 0.16], mat: "head", pos: [0.02, 0, 0.27], explode: [0, 0, 0.92] },
  { id: "railL", file: null, box: [0.06, 0.045, 0.3], mat: "orange", pos: [0.03, 0.172, -0.13], explode: [0, 0.46, 0] },
  { id: "railR", file: null, box: [0.06, 0.045, 0.3], mat: "orange", pos: [0.03, -0.172, -0.13], explode: [0, -0.46, 0] },
];

const STL_FILES = PARTS.filter((p) => p.file).map((p) => `/models/tron1/${p.file}.stl`);

const MATERIALS: Record<MatKey, THREE.MeshStandardMaterialParameters> = {
  shell: { color: "#e6e9ef", metalness: 0.55, roughness: 0.42 },
  metal: { color: "#3b4250", metalness: 0.7, roughness: 0.34 },
  tire: { color: "#101218", metalness: 0.25, roughness: 0.72 },
  orange: { color: "#ec5a16", metalness: 0.3, roughness: 0.5, emissive: "#5e1f04", emissiveIntensity: 0.35 },
  head: { color: "#1b2742", metalness: 0.5, roughness: 0.38, emissive: "#3d6dfb", emissiveIntensity: 0.4 },
};

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function RobotModel({
  progressRef,
  reduced,
}: {
  progressRef: RefObject<number>;
  reduced: boolean;
}) {
  const geometries = useLoader(STLLoader, STL_FILES);
  // Map STL geometries back onto their parts (mods have no STL).
  const geoByPart = useMemo(() => {
    const map = new Map<string, THREE.BufferGeometry>();
    let gi = 0;
    for (const p of PARTS) if (p.file) map.set(p.id, geometries[gi++]);
    return map;
  }, [geometries]);

  const spinRef = useRef<THREE.Group>(null);
  const contentRef = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const smooth = useRef(0);

  // Recenter + autoscale once the meshes exist.
  useLayoutEffect(() => {
    const content = contentRef.current;
    const spin = spinRef.current;
    if (!content || !spin) return;
    const box = new THREE.Box3().setFromObject(content);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    content.position.set(-center.x, -center.y, -center.z);
    spin.scale.setScalar(4.6 / Math.max(size.z, 0.001));
  }, [geoByPart]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const target = reduced ? 0 : THREE.MathUtils.clamp(progressRef.current, 0, 1);
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
    if (spinRef.current && !reduced) spinRef.current.rotation.y += d * 0.2;
  });

  return (
    // spin → z-up-to-y-up rotation → recentred content
    <group ref={spinRef}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group ref={contentRef}>
          {PARTS.map((p, i) => (
            <mesh
              key={p.id}
              ref={(el) => {
                meshes.current[i] = el;
              }}
              position={p.pos}
              geometry={p.file ? geoByPart.get(p.id) : undefined}
            >
              {!p.file && <boxGeometry args={p.box} />}
              <meshStandardMaterial {...MATERIALS[p.mat]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

export function RobotScene({
  progressRef,
  className = "",
}: {
  progressRef: RefObject<number>;
  className?: string;
}) {
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
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [3.2, 1.4, 9], fov: 40 }}
        dpr={env.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 9, 7]} intensity={1.25} />
        <directionalLight position={[-7, 3, -5]} intensity={0.45} />
        <pointLight position={[0, 1, 5]} intensity={0.7} color="#3d6dfb" />
        <Suspense fallback={null}>
          <RobotModel progressRef={progressRef} reduced={env.reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
