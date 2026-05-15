"use client";

/**
 * RobotParts — detailed geometry for the BraveBot modification components.
 *
 * Every non-LimX part is modelled here from primitives as a small
 * multi-mesh assembly (lens barrels, bezels, vents, fins, bolts, handles)
 * so it reads as a real component rather than a plain box. All original
 * geometry — no third-party assets.
 *
 * Coordinates are URDF-local (x fwd, y left, z up); each builder draws
 * around its own origin. `hot` adds a cyan highlight for the explorer.
 */

import { Fragment } from "react";
import * as THREE from "three";

export type MatKey =
  | "shell" | "metal" | "casing" | "frame" | "tire"
  | "orange" | "sensor" | "lens" | "estop" | "antenna" | "core" | "screen";

export const MATERIALS: Record<MatKey, THREE.MeshStandardMaterialParameters> = {
  shell: { color: "#e7eaf0", metalness: 0.55, roughness: 0.42 },
  metal: { color: "#9aa4b5", metalness: 0.72, roughness: 0.33 },
  casing: { color: "#474f60", metalness: 0.6, roughness: 0.42 },
  frame: { color: "#717b8c", metalness: 0.66, roughness: 0.4 },
  tire: { color: "#101218", metalness: 0.25, roughness: 0.72 },
  orange: { color: "#ec5a16", metalness: 0.3, roughness: 0.5, emissive: "#5e1f04", emissiveIntensity: 0.35 },
  sensor: { color: "#22324f", metalness: 0.5, roughness: 0.4, emissive: "#3d6dfb", emissiveIntensity: 0.3 },
  lens: { color: "#0a0e16", metalness: 0.1, roughness: 0.13 },
  estop: { color: "#d8392a", metalness: 0.3, roughness: 0.45, emissive: "#5e120a", emissiveIntensity: 0.5 },
  antenna: { color: "#2d333f", metalness: 0.6, roughness: 0.4 },
  core: { color: "#16223f", metalness: 0.5, roughness: 0.4, emissive: "#3d6dfb", emissiveIntensity: 0.55 },
  screen: { color: "#0a1426", metalness: 0.2, roughness: 0.3, emissive: "#3d6dfb", emissiveIntensity: 0.85 },
};

export function partMaterial(mat: MatKey, hot: boolean): THREE.MeshStandardMaterialParameters {
  const base = MATERIALS[mat];
  return {
    ...base,
    emissive: hot ? "#6ff0ff" : (base.emissive ?? "#000000"),
    emissiveIntensity: hot ? 0.85 : (base.emissiveIntensity ?? 0),
  };
}

type Vec = [number, number, number];

/** Single primitive mesh inside a component. */
function P({
  g,
  a,
  m,
  hot,
  p = [0, 0, 0],
  r = [0, 0, 0],
}: {
  g: "box" | "cyl" | "sph" | "tor";
  a: number[];
  m: MatKey;
  hot: boolean;
  p?: Vec;
  r?: Vec;
}) {
  return (
    <mesh position={p} rotation={r}>
      {g === "box" && <boxGeometry args={a as Vec} />}
      {g === "cyl" && <cylinderGeometry args={a as [number, number, number, number]} />}
      {g === "sph" && <sphereGeometry args={a as [number, number, number]} />}
      {g === "tor" && <torusGeometry args={a as [number, number, number, number]} />}
      <meshStandardMaterial {...partMaterial(m, hot)} />
    </mesh>
  );
}

const RZ: Vec = [0, 0, Math.PI / 2]; // cylinder axis -> +x
const RX: Vec = [Math.PI / 2, 0, 0]; // cylinder axis -> +z

/** A camera assembly (body + barrel + lens + bezel), facing +x. */
function Camera({ hot, lens }: { hot: boolean; lens: number }) {
  return (
    <Fragment>
      <P g="box" a={[0.052, 0.064, 0.062]} m="casing" p={[-0.012, 0, 0]} hot={hot} />
      <P g="cyl" a={[lens + 0.006, lens + 0.008, 0.042, 24]} m="metal" p={[0.022, 0, 0]} r={RZ} hot={hot} />
      <P g="cyl" a={[lens, lens, 0.014, 24]} m="lens" p={[0.044, 0, 0]} r={RZ} hot={hot} />
      <P g="tor" a={[lens + 0.004, 0.005, 8, 24]} m="metal" p={[0.04, 0, 0]} r={[0, Math.PI / 2, 0]} hot={hot} />
    </Fragment>
  );
}

/** Geometry for one modification part, switched by id. */
export function PartGeometry({ id, hot }: { id: string; hot: boolean }) {
  switch (id) {
    case "payload":
      return (
        <Fragment>
          <P g="box" a={[0.3, 0.36, 0.035]} m="frame" hot={hot} />
          <P g="box" a={[0.3, 0.03, 0.05]} m="metal" p={[0, 0.17, 0.02]} hot={hot} />
          <P g="box" a={[0.3, 0.03, 0.05]} m="metal" p={[0, -0.17, 0.02]} hot={hot} />
          {([[0.13, 0.16], [-0.13, 0.16], [0.13, -0.16], [-0.13, -0.16]] as const).map(([x, y], i) => (
            <P key={i} g="cyl" a={[0.013, 0.013, 0.05, 12]} m="metal" p={[x, y, 0.012]} r={RX} hot={hot} />
          ))}
        </Fragment>
      );
    case "torso":
      return (
        <Fragment>
          <P g="box" a={[0.27, 0.3, 0.24]} m="casing" hot={hot} />
          <P g="box" a={[0.23, 0.26, 0.04]} m="casing" p={[0, 0, 0.135]} hot={hot} />
          <P g="box" a={[0.29, 0.32, 0.03]} m="metal" p={[0, 0, -0.12]} hot={hot} />
          {[0, 1, 2, 3].map((i) => (
            <P key={i} g="box" a={[0.17, 0.006, 0.013]} m="metal" p={[0, 0.151, 0.05 - i * 0.032]} hot={hot} />
          ))}
        </Fragment>
      );
    case "battery":
      return (
        <Fragment>
          <P g="box" a={[0.16, 0.24, 0.1]} m="casing" hot={hot} />
          <P g="box" a={[0.166, 0.03, 0.07]} m="orange" p={[0, 0, -0.012]} hot={hot} />
          <P g="box" a={[0.02, 0.02, 0.04]} m="metal" p={[0.05, 0, 0.07]} hot={hot} />
          <P g="box" a={[0.02, 0.02, 0.04]} m="metal" p={[-0.05, 0, 0.07]} hot={hot} />
          <P g="box" a={[0.14, 0.022, 0.022]} m="metal" p={[0, 0, 0.092]} hot={hot} />
          <P g="cyl" a={[0.012, 0.012, 0.022, 14]} m="metal" p={[0.05, 0.07, 0.052]} r={RX} hot={hot} />
          <P g="cyl" a={[0.012, 0.012, 0.022, 14]} m="metal" p={[-0.05, 0.07, 0.052]} r={RX} hot={hot} />
        </Fragment>
      );
    case "edgeai":
      return (
        <Fragment>
          <P g="box" a={[0.13, 0.2, 0.08]} m="core" hot={hot} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <P key={i} g="box" a={[0.11, 0.013, 0.05]} m="metal" p={[0, -0.07 + i * 0.028, 0.062]} hot={hot} />
          ))}
          <P g="box" a={[0.03, 0.06, 0.024]} m="metal" p={[0.08, 0, -0.02]} hot={hot} />
        </Fragment>
      );
    case "display":
      return (
        <Fragment>
          <P g="box" a={[0.03, 0.2, 0.14]} m="casing" hot={hot} />
          <P g="box" a={[0.014, 0.16, 0.1]} m="screen" p={[0.012, 0, 0.012]} hot={hot} />
          <P g="cyl" a={[0.009, 0.009, 0.014, 14]} m="metal" p={[0.016, 0.06, -0.052]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.009, 0.009, 0.014, 14]} m="metal" p={[0.016, -0.06, -0.052]} r={RZ} hot={hot} />
        </Fragment>
      );
    case "rear":
      return (
        <Fragment>
          <P g="box" a={[0.024, 0.22, 0.2]} m="casing" hot={hot} />
          <P g="box" a={[0.022, 0.085, 0.022]} m="metal" p={[0.02, 0, 0]} hot={hot} />
          <P g="box" a={[0.018, 0.026, 0.022]} m="orange" p={[0.016, 0.1, 0]} hot={hot} />
          <P g="box" a={[0.018, 0.026, 0.022]} m="orange" p={[0.016, -0.1, 0]} hot={hot} />
          {([[0.085, 0.08], [-0.085, 0.08], [0.085, -0.08], [-0.085, -0.08]] as const).map(([y, z], i) => (
            <P key={i} g="cyl" a={[0.009, 0.009, 0.014, 12]} m="metal" p={[0.014, y, z]} r={RZ} hot={hot} />
          ))}
        </Fragment>
      );
    case "estop":
      return (
        <Fragment>
          <P g="cyl" a={[0.03, 0.034, 0.018, 24]} m="metal" p={[0, 0, -0.012]} r={RX} hot={hot} />
          <P g="cyl" a={[0.026, 0.026, 0.012, 24]} m="casing" p={[0, 0, 0.004]} r={RX} hot={hot} />
          <P g="cyl" a={[0.03, 0.022, 0.02, 24]} m="estop" p={[0, 0, 0.022]} r={RX} hot={hot} />
        </Fragment>
      );
    case "mast":
      return (
        <Fragment>
          <P g="box" a={[0.05, 0.05, 0.17]} m="metal" hot={hot} />
          <P g="cyl" a={[0.052, 0.052, 0.022, 20]} m="casing" p={[0, 0, -0.086]} r={RX} hot={hot} />
          <P g="cyl" a={[0.037, 0.037, 0.013, 20]} m="casing" p={[0, 0, 0.045]} r={RX} hot={hot} />
          <P g="cyl" a={[0.037, 0.037, 0.013, 20]} m="casing" p={[0, 0, -0.03]} r={RX} hot={hot} />
        </Fragment>
      );
    case "head":
      return (
        <Fragment>
          <P g="box" a={[0.21, 0.25, 0.13]} m="shell" hot={hot} />
          <P g="box" a={[0.022, 0.21, 0.1]} m="casing" p={[0.103, 0, 0]} hot={hot} />
          <P g="box" a={[0.17, 0.21, 0.03]} m="shell" p={[0, 0, 0.08]} hot={hot} />
          {([[0.09, 0.04], [-0.09, 0.04], [0.09, -0.04], [-0.09, -0.04]] as const).map(([y, z], i) => (
            <P key={i} g="cyl" a={[0.008, 0.008, 0.016, 12]} m="metal" p={[0.112, y, z]} r={RZ} hot={hot} />
          ))}
        </Fragment>
      );
    case "acoustic":
      return (
        <Fragment>
          <P g="cyl" a={[0.052, 0.052, 0.022, 28]} m="casing" hot={hot} r={RZ} />
          <P g="cyl" a={[0.007, 0.007, 0.012, 12]} m="lens" p={[0.014, 0, 0]} r={RZ} hot={hot} />
          {Array.from({ length: 10 }).map((_, k) => {
            const a = (k / 10) * Math.PI * 2;
            return (
              <P
                key={k}
                g="cyl"
                a={[0.006, 0.006, 0.012, 10]}
                m="lens"
                p={[0.014, Math.cos(a) * 0.034, Math.sin(a) * 0.034]}
                r={RZ}
                hot={hot}
              />
            );
          })}
        </Fragment>
      );
    case "thermal":
      return <Camera hot={hot} lens={0.022} />;
    case "hdcam":
      return <Camera hot={hot} lens={0.03} />;
    case "gas":
      return (
        <Fragment>
          <P g="box" a={[0.05, 0.07, 0.05]} m="casing" hot={hot} />
          <P g="cyl" a={[0.026, 0.026, 0.022, 20]} m="metal" p={[0.032, 0, 0]} r={RZ} hot={hot} />
          {[-1, 0, 1].map((i) => (
            <P key={i} g="box" a={[0.012, 0.044, 0.006]} m="sensor" p={[0.046, 0, i * 0.012]} hot={hot} />
          ))}
          <P g="cyl" a={[0.005, 0.005, 0.01, 10]} m="core" p={[0.026, 0.03, 0.02]} r={RZ} hot={hot} />
        </Fragment>
      );
    case "nav":
      return (
        <Fragment>
          <P g="box" a={[0.06, 0.16, 0.04]} m="casing" hot={hot} />
          <P g="cyl" a={[0.03, 0.032, 0.034, 24]} m="metal" p={[0, 0, 0.036]} r={RX} hot={hot} />
          <P g="cyl" a={[0.032, 0.024, 0.012, 24]} m="core" p={[0, 0, 0.058]} r={RX} hot={hot} />
          <P g="cyl" a={[0.013, 0.013, 0.014, 16]} m="lens" p={[0.03, 0.05, -0.004]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.013, 0.013, 0.014, 16]} m="lens" p={[0.03, -0.05, -0.004]} r={RZ} hot={hot} />
        </Fragment>
      );
    case "antennaL":
    case "antennaR":
      return (
        <Fragment>
          <P g="cyl" a={[0.013, 0.016, 0.022, 16]} m="metal" p={[0, 0, -0.05]} r={RX} hot={hot} />
          <P g="cyl" a={[0.006, 0.006, 0.12, 12]} m="antenna" p={[0, 0, 0.012]} r={RX} hot={hot} />
          <P g="sph" a={[0.011, 14, 12]} m="antenna" p={[0, 0, 0.074]} hot={hot} />
        </Fragment>
      );
    case "railL":
    case "railR":
      return (
        <Fragment>
          <P g="cyl" a={[0.019, 0.019, 0.34, 16]} m="orange" r={RX} hot={hot} />
          <P g="box" a={[0.055, 0.035, 0.032]} m="metal" p={[-0.03, 0, 0.1]} hot={hot} />
          <P g="box" a={[0.055, 0.035, 0.032]} m="metal" p={[-0.03, 0, -0.1]} hot={hot} />
        </Fragment>
      );
    default:
      return <P g="box" a={[0.06, 0.06, 0.06]} m="casing" hot={hot} />;
  }
}
