"use client";

/**
 * ParticleScene — the central 3D visual.
 *
 * A single point cloud whose particles morph between five shapes as the
 * pinned experience is scrolled (hero sphere -> orbital rings -> diffuse
 * cloud -> dense core -> structured lattice). Scroll progress is read from
 * a ref (no React re-renders); every frame the particles ease toward the
 * interpolated target shape and the group rotates / scales.
 *
 * Performance: positions are mutated in place in one typed-array loop per
 * frame; particle count and DPR scale down on small screens; with reduced
 * motion the cloud holds the hero shape and rotates gently.
 */

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { useProgressRef, prefersReducedMotion } from "./scroll";
import { landing } from "@/config/landing";

/* ---- shape builders -------------------------------------------------- */
/* Each builder writes `count` xyz triples into `out`. Particle index i
   keeps its identity across shapes, so morphs stay coherent. */

function fibonacciSphere(out: Float32Array, count: number, radius: number) {
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
}

function orbitalRings(out: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    const ring = i % 3;
    const tilt = (ring - 1) * 0.7;
    const a = (i / count) * Math.PI * 2 * 7 + ring;
    const r = 2.5 + Math.sin(i * 0.3) * 0.12;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    out[i * 3] = x;
    out[i * 3 + 1] = z * Math.sin(tilt) + Math.cos(a * 1.3) * 0.2;
    out[i * 3 + 2] = z * Math.cos(tilt);
  }
}

function diffuseCloud(out: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    // deterministic pseudo-random direction + radius
    const u = ((i * 12.9898) % 1) * 2 - 1;
    const v = ((i * 78.233) % 1) * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const rad = 1.7 + (((i * 43.123) % 1)) * 2.1;
    out[i * 3] = Math.cos(v) * s * rad;
    out[i * 3 + 1] = u * rad;
    out[i * 3 + 2] = Math.sin(v) * s * rad;
  }
}

function denseCore(out: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    const u = ((i * 12.9898) % 1) * 2 - 1;
    const v = ((i * 78.233) % 1) * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const t = (i * 43.123) % 1;
    const rad = Math.pow(t, 2.4) * 2.4 + 0.15; // biased toward the center
    out[i * 3] = Math.cos(v) * s * rad;
    out[i * 3 + 1] = u * rad;
    out[i * 3 + 2] = Math.sin(v) * s * rad;
  }
}

function lattice(out: Float32Array, count: number) {
  const side = Math.ceil(Math.cbrt(count));
  const span = 4.2;
  for (let i = 0; i < count; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side)) % side;
    out[i * 3] = (x / (side - 1) - 0.5) * span;
    out[i * 3 + 1] = (y / (side - 1) - 0.5) * span * 0.55; // flattened slab
    out[i * 3 + 2] = (z / (side - 1) - 0.5) * span;
  }
}

/* ---- the morphing point cloud --------------------------------------- */

function ParticleField({ count, reduced }: { count: number; reduced: boolean }) {
  const progress = useProgressRef();
  const groupRef = useRef<THREE.Group>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  // Precompute the five shape targets once.
  const shapes = useMemo(() => {
    const make = (fn: (o: Float32Array, c: number) => void) => {
      const a = new Float32Array(count * 3);
      fn(a, count);
      return a;
    };
    return [
      make((o, c) => fibonacciSphere(o, c, 2.6)),
      make(orbitalRings),
      make(diffuseCloud),
      make(denseCore),
      make(lattice),
    ];
  }, [count]);

  // Live positions buffer — starts on the hero shape.
  const positions = useMemo(() => Float32Array.from(shapes[0]), [shapes]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const p = reduced ? 0 : THREE.MathUtils.clamp(progress.current, 0, 1);

    // Which two shapes are we between, and how far?
    const seg = p * (shapes.length - 1);
    const i0 = Math.min(Math.floor(seg), shapes.length - 2);
    const t = seg - i0;
    const from = shapes[i0];
    const to = shapes[i0 + 1];

    // Ease each particle toward the interpolated target.
    const ease = 1 - Math.pow(0.001, d); // frame-rate independent
    for (let k = 0; k < positions.length; k++) {
      const target = from[k] + (to[k] - from[k]) * t;
      positions[k] += (target - positions[k]) * ease;
    }
    if (geoRef.current) {
      geoRef.current.attributes.position.needsUpdate = true;
    }

    // Rotate + scale the whole cloud.
    if (groupRef.current) {
      groupRef.current.rotation.y += d * (0.12 + p * 0.35);
      groupRef.current.rotation.x = Math.sin(p * Math.PI) * 0.35;
      const s = 1 + p * 0.18;
      groupRef.current.scale.setScalar(s);
    }

    // Subtle scroll-driven camera dolly.
    state.camera.position.z += (6 - p * 1.1 - state.camera.position.z) * 0.05;
  });

  const posArgs: ThreeElements["bufferAttribute"]["args"] = [positions, 3];

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" args={posArgs} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={landing.colors.particleCore}
          transparent
          opacity={0.92}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ---- canvas wrapper -------------------------------------------------- */

export function ParticleScene({ className = "" }: { className?: string }) {
  const [env, setEnv] = useState<{ count: number; dpr: [number, number]; reduced: boolean }>({
    count: 6500,
    dpr: [1, 1.8],
    reduced: false,
  });

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setEnv({
      count: mobile ? 2600 : 6500,
      dpr: mobile ? [1, 1.3] : [1, 1.8],
      reduced: prefersReducedMotion(),
    });
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 52 }}
        dpr={env.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ParticleField count={env.count} reduced={env.reduced} />
      </Canvas>
    </div>
  );
}
