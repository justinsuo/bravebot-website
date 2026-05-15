"use client";

/**
 * RobotScene — the central 3D visual.
 *
 * A stylized concept model of BraveBot (a modified LimX TRON 1 wheel-legged
 * platform) assembled from primitives. Scroll progress (0..1, read from a
 * ref) drives a single exploded-view transition: every part eases out from
 * its assembled position along its own offset. The model slowly rotates so
 * the explosion reads from all sides.
 *
 * Not a CAD import — an original low-poly concept build. Performance: one
 * transform update per part per frame; DPR scales down on small screens.
 */

import { useMemo, useRef, useState, useEffect, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { prefersReducedMotion } from "./scroll";

type MatKey = "shell" | "metal" | "dark" | "orange" | "accent" | "tire";

interface Part {
  id: string;
  shape: "box" | "cyl";
  args: [number, number, number] | [number, number, number, number];
  mat: MatKey;
  pos: [number, number, number];
  explode: [number, number, number];
  rot?: [number, number, number];
}

/* Assembled positions + per-part explode offsets. */
function buildParts(): Part[] {
  const Z = Math.PI / 2;
  return [
    // --- torso ---
    { id: "body", shape: "box", args: [1.5, 1.7, 1.0], mat: "shell", pos: [0, 0.15, 0], explode: [0, 0, -0.7] },
    { id: "panel", shape: "box", args: [1.05, 0.85, 0.08], mat: "dark", pos: [0, 0.34, 0.52], explode: [0, 0.1, 1.5] },
    { id: "compute", shape: "box", args: [1.05, 0.26, 0.55], mat: "accent", pos: [0, -0.16, 0.04], explode: [0, 0.2, 2.1] },
    { id: "battery", shape: "box", args: [1.05, 0.22, 0.55], mat: "dark", pos: [0, -0.5, 0.04], explode: [0, -0.9, 1.6] },
    { id: "railL", shape: "box", args: [0.13, 1.35, 0.13], mat: "orange", pos: [-0.86, 0.15, 0], explode: [-1.3, 0, 0] },
    { id: "railR", shape: "box", args: [0.13, 1.35, 0.13], mat: "orange", pos: [0.86, 0.15, 0], explode: [1.3, 0, 0] },
    // --- head + mast ---
    { id: "mast", shape: "box", args: [0.3, 0.55, 0.3], mat: "metal", pos: [0, 1.18, 0], explode: [0, 0.8, -0.3] },
    { id: "head", shape: "box", args: [1.25, 0.95, 0.8], mat: "shell", pos: [0, 1.78, 0], explode: [0, 1.5, 0.2] },
    { id: "sensorPod", shape: "box", args: [0.98, 0.42, 0.2], mat: "accent", pos: [0, 1.66, 0.44], explode: [0, 0.7, 1.7] },
    // --- left leg ---
    { id: "hipL", shape: "cyl", args: [0.21, 0.21, 0.34, 20], mat: "metal", pos: [-0.5, -0.78, 0], explode: [-1.5, -0.2, 0], rot: [0, 0, Z] },
    { id: "thighL", shape: "box", args: [0.24, 0.9, 0.24], mat: "metal", pos: [-0.66, -1.2, 0], explode: [-2.0, -0.5, 0.2], rot: [0, 0, 0.34] },
    { id: "kneeL", shape: "cyl", args: [0.19, 0.19, 0.3, 20], mat: "metal", pos: [-0.82, -1.62, 0], explode: [-2.4, -0.4, 0], rot: [0, 0, Z] },
    { id: "shinL", shape: "box", args: [0.2, 0.62, 0.2], mat: "metal", pos: [-0.7, -1.95, 0], explode: [-2.1, -1.4, 0.3], rot: [0, 0, -0.3] },
    { id: "wheelL", shape: "cyl", args: [0.44, 0.44, 0.28, 26], mat: "tire", pos: [-0.58, -2.2, 0], explode: [-2.7, -1.0, 0], rot: [0, 0, Z] },
    // --- right leg ---
    { id: "hipR", shape: "cyl", args: [0.21, 0.21, 0.34, 20], mat: "metal", pos: [0.5, -0.78, 0], explode: [1.5, -0.2, 0], rot: [0, 0, Z] },
    { id: "thighR", shape: "box", args: [0.24, 0.9, 0.24], mat: "metal", pos: [0.66, -1.2, 0], explode: [2.0, -0.5, 0.2], rot: [0, 0, -0.34] },
    { id: "kneeR", shape: "cyl", args: [0.19, 0.19, 0.3, 20], mat: "metal", pos: [0.82, -1.62, 0], explode: [2.4, -0.4, 0], rot: [0, 0, Z] },
    { id: "shinR", shape: "box", args: [0.2, 0.62, 0.2], mat: "metal", pos: [0.7, -1.95, 0], explode: [2.1, -1.4, 0.3], rot: [0, 0, 0.3] },
    { id: "wheelR", shape: "cyl", args: [0.44, 0.44, 0.28, 26], mat: "tire", pos: [0.58, -2.2, 0], explode: [2.7, -1.0, 0], rot: [0, 0, Z] },
  ];
}

const MATERIALS: Record<MatKey, THREE.MeshStandardMaterialParameters> = {
  shell: { color: "#e4e8ef", metalness: 0.5, roughness: 0.42 },
  metal: { color: "#39414f", metalness: 0.66, roughness: 0.36 },
  dark: { color: "#14171f", metalness: 0.4, roughness: 0.5 },
  orange: { color: "#ec5a16", metalness: 0.3, roughness: 0.5, emissive: "#5e1f04", emissiveIntensity: 0.4 },
  accent: { color: "#1b2742", metalness: 0.45, roughness: 0.4, emissive: "#3d6dfb", emissiveIntensity: 0.55 },
  tire: { color: "#0e1016", metalness: 0.2, roughness: 0.75 },
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
  const parts = useMemo(buildParts, []);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const smooth = useRef(0);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const target = reduced ? 0 : THREE.MathUtils.clamp(progressRef.current, 0, 1);
    smooth.current += (target - smooth.current) * (1 - Math.pow(0.0015, d));
    const e = easeInOut(smooth.current);

    for (let i = 0; i < parts.length; i++) {
      const m = meshes.current[i];
      if (!m) continue;
      const { pos, explode } = parts[i];
      m.position.set(
        pos[0] + explode[0] * e,
        pos[1] + explode[1] * e,
        pos[2] + explode[2] * e,
      );
    }

    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y += d * 0.22;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.16, -0.5, 0]} scale={0.92}>
      {parts.map((p, i) => (
        <mesh
          key={p.id}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          position={p.pos}
          rotation={p.rot ?? [0, 0, 0]}
        >
          {p.shape === "box" ? (
            <boxGeometry args={p.args as [number, number, number]} />
          ) : (
            <cylinderGeometry args={p.args as [number, number, number, number]} />
          )}
          <meshStandardMaterial {...MATERIALS[p.mat]} />
        </mesh>
      ))}
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
        camera={{ position: [2.4, 1.1, 9], fov: 42 }}
        dpr={env.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 9, 7]} intensity={1.15} />
        <directionalLight position={[-7, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 1, 5]} intensity={0.7} color="#3d6dfb" />
        <RobotModel progressRef={progressRef} reduced={env.reduced} />
      </Canvas>
    </div>
  );
}
