"use client";

/**
 * RobotParts — detailed geometry for the BraveBot modification components.
 *
 * Every non-LimX part is modelled here from primitives as a multi-mesh
 * assembly with realistic detailing: rounded enclosures, lens barrels and
 * focus rings, vent grilles, heat-sink fins, hex bolt heads, gaskets,
 * cable glands, status LEDs and panel seams. All original geometry — no
 * third-party assets.
 *
 * Coordinates are URDF-local (x fwd, y left, z up); each builder draws
 * around its own origin. `hot` adds a cyan highlight for the explorer.
 */

import { Fragment } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type MatKey =
  | "shell" | "metal" | "casing" | "frame" | "tire" | "rubber"
  | "orange" | "warn" | "sensor" | "lens" | "glass" | "estop"
  | "antenna" | "core" | "screen";

// Fully monochrome grey palette — every part is a distinct shade of grey.
export const MATERIALS: Record<MatKey, THREE.MeshStandardMaterialParameters> = {
  shell: { color: "#e7eaf0", metalness: 0.55, roughness: 0.4 },
  metal: { color: "#bdc4ce", metalness: 0.78, roughness: 0.3 },
  casing: { color: "#c4cad4", metalness: 0.5, roughness: 0.46 },
  frame: { color: "#b1b9c5", metalness: 0.58, roughness: 0.42 },
  tire: { color: "#3f444d", metalness: 0.2, roughness: 0.75 },
  rubber: { color: "#565b64", metalness: 0.1, roughness: 0.9 },
  orange: { color: "#6a6f79", metalness: 0.4, roughness: 0.45 },
  warn: { color: "#9aa0aa", metalness: 0.3, roughness: 0.5 },
  sensor: { color: "#6e7480", metalness: 0.5, roughness: 0.4 },
  lens: { color: "#232830", metalness: 0.15, roughness: 0.1 },
  glass: { color: "#aeb5c0", metalness: 0.12, roughness: 0.1 },
  estop: { color: "#868c96", metalness: 0.28, roughness: 0.44 },
  antenna: { color: "#565c66", metalness: 0.62, roughness: 0.38 },
  core: { color: "#565c68", metalness: 0.5, roughness: 0.4 },
  screen: { color: "#3c414b", metalness: 0.2, roughness: 0.3 },
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
const RZ: Vec = [0, 0, Math.PI / 2]; // cylinder axis -> +x
const RX: Vec = [Math.PI / 2, 0, 0]; // cylinder axis -> +z

/** One primitive inside a component. `rbox` = rounded enclosure. */
function P({
  g,
  a,
  m,
  hot,
  p = [0, 0, 0],
  r = [0, 0, 0],
}: {
  g: "box" | "rbox" | "cyl" | "sph" | "tor";
  a: number[];
  m: MatKey;
  hot: boolean;
  p?: Vec;
  r?: Vec;
}) {
  const mat = <meshStandardMaterial {...partMaterial(m, hot)} />;
  if (g === "rbox") {
    const rad = Math.min(...a) * 0.16;
    return (
      <RoundedBox args={a as Vec} radius={rad} smoothness={3} position={p} rotation={r}>
        {mat}
      </RoundedBox>
    );
  }
  return (
    <mesh position={p} rotation={r}>
      {g === "box" && <boxGeometry args={a as Vec} />}
      {g === "cyl" && <cylinderGeometry args={a as [number, number, number, number]} />}
      {g === "sph" && <sphereGeometry args={a as [number, number, number]} />}
      {g === "tor" && <torusGeometry args={a as [number, number, number, number]} />}
      {mat}
    </mesh>
  );
}

/** Hex bolt head (6-segment cylinder). */
function Bolt({ p, r = RZ, s = 0.009, hot }: { p: Vec; r?: Vec; s?: number; hot: boolean }) {
  return <P g="cyl" a={[s, s, s * 1.3, 6]} m="metal" p={p} r={r} hot={hot} />;
}

/** Camera assembly (body + stepped barrel + focus ring + lens), facing +x. */
function Camera({ hot, lens }: { hot: boolean; lens: number }) {
  return (
    <Fragment>
      <P g="rbox" a={[0.056, 0.066, 0.064]} m="casing" p={[-0.014, 0, 0]} hot={hot} />
      <P g="cyl" a={[lens + 0.012, lens + 0.014, 0.018, 28]} m="metal" p={[0.014, 0, 0]} r={RZ} hot={hot} />
      <P g="cyl" a={[lens + 0.013, lens + 0.013, 0.01, 28]} m="rubber" p={[0.026, 0, 0]} r={RZ} hot={hot} />
      <P g="cyl" a={[lens + 0.007, lens + 0.009, 0.024, 28]} m="metal" p={[0.04, 0, 0]} r={RZ} hot={hot} />
      <P g="cyl" a={[lens, lens, 0.012, 28]} m="lens" p={[0.052, 0, 0]} r={RZ} hot={hot} />
      <P g="cyl" a={[lens * 0.5, lens * 0.5, 0.006, 20]} m="glass" p={[0.057, 0, 0]} r={RZ} hot={hot} />
      <P g="tor" a={[lens + 0.006, 0.004, 8, 28]} m="metal" p={[0.05, 0, 0]} r={[0, Math.PI / 2, 0]} hot={hot} />
    </Fragment>
  );
}

export function PartGeometry({ id, hot }: { id: string; hot: boolean }) {
  switch (id) {
    case "payload":
      return (
        <Fragment>
          <P g="rbox" a={[0.3, 0.36, 0.034]} m="frame" hot={hot} />
          <P g="box" a={[0.3, 0.032, 0.05]} m="metal" p={[0, 0.168, 0.02]} hot={hot} />
          <P g="box" a={[0.3, 0.032, 0.05]} m="metal" p={[0, -0.168, 0.02]} hot={hot} />
          <P g="box" a={[0.05, 0.34, 0.026]} m="metal" p={[0.09, 0, 0.014]} hot={hot} />
          <P g="box" a={[0.05, 0.34, 0.026]} m="metal" p={[-0.09, 0, 0.014]} hot={hot} />
          {([[0.13, 0.16], [-0.13, 0.16], [0.13, -0.16], [-0.13, -0.16]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[v[0], v[1], 0.026]} r={RX} s={0.012} hot={hot} />
          ))}
        </Fragment>
      );
    case "torso":
      return (
        <Fragment>
          <P g="rbox" a={[0.27, 0.3, 0.24]} m="casing" hot={hot} />
          <P g="rbox" a={[0.23, 0.26, 0.045]} m="casing" p={[0, 0, 0.135]} hot={hot} />
          <P g="box" a={[0.29, 0.32, 0.03]} m="metal" p={[0, 0, -0.12]} hot={hot} />
          {/* vent grille on +y face */}
          {[0, 1, 2, 3, 4].map((i) => (
            <P key={i} g="box" a={[0.17, 0.006, 0.011]} m="metal" p={[0, 0.152, 0.058 - i * 0.026]} hot={hot} />
          ))}
          {/* recessed seam + side hatch */}
          <P g="box" a={[0.272, 0.006, 0.006]} m="metal" p={[0, 0, 0.03]} hot={hot} />
          <P g="rbox" a={[0.012, 0.13, 0.13]} m="metal" p={[-0.138, 0.04, -0.02]} hot={hot} />
          <P g="cyl" a={[0.014, 0.014, 0.02, 16]} m="metal" p={[0.138, -0.08, 0.06]} r={RZ} hot={hot} />
          {([[0.11, 0.085], [-0.11, 0.085]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[0.137, v[0], v[1]]} r={RZ} hot={hot} />
          ))}
        </Fragment>
      );
    case "battery":
      return (
        <Fragment>
          <P g="rbox" a={[0.16, 0.24, 0.1]} m="casing" hot={hot} />
          <P g="box" a={[0.166, 0.034, 0.066]} m="orange" p={[0, 0, -0.014]} hot={hot} />
          {/* side cooling ridges */}
          {[0, 1, 2].map((i) => (
            <P key={i} g="box" a={[0.006, 0.2, 0.07]} m="metal" p={[0.083, 0, -0.022 + i * 0.024]} hot={hot} />
          ))}
          {/* carry handle */}
          <P g="box" a={[0.022, 0.022, 0.042]} m="metal" p={[0.052, 0, 0.07]} hot={hot} />
          <P g="box" a={[0.022, 0.022, 0.042]} m="metal" p={[-0.052, 0, 0.07]} hot={hot} />
          <P g="cyl" a={[0.012, 0.012, 0.13, 16]} m="rubber" p={[0, 0, 0.092]} r={RZ} hot={hot} />
          {/* terminals + status LEDs */}
          <P g="cyl" a={[0.013, 0.013, 0.02, 18]} m="metal" p={[0.05, 0.072, 0.05]} r={RX} hot={hot} />
          <P g="cyl" a={[0.013, 0.013, 0.02, 18]} m="metal" p={[-0.05, 0.072, 0.05]} r={RX} hot={hot} />
          {[0, 1, 2].map((i) => (
            <P key={i} g="cyl" a={[0.005, 0.005, 0.012, 12]} m="core" p={[0.082, -0.04 + i * 0.03, 0.03]} r={RZ} hot={hot} />
          ))}
        </Fragment>
      );
    case "edgeai":
      return (
        <Fragment>
          <P g="rbox" a={[0.13, 0.2, 0.08]} m="core" hot={hot} />
          {Array.from({ length: 9 }).map((_, i) => (
            <P key={i} g="box" a={[0.108, 0.008, 0.052]} m="metal" p={[0, -0.076 + i * 0.019, 0.064]} hot={hot} />
          ))}
          <P g="box" a={[0.03, 0.07, 0.03]} m="metal" p={[0.082, 0, -0.018]} hot={hot} />
          <P g="box" a={[0.018, 0.03, 0.018]} m="casing" p={[0.082, 0.05, 0.02]} hot={hot} />
          <P g="cyl" a={[0.005, 0.005, 0.012, 12]} m="glass" p={[0.068, 0.07, 0.024]} r={RZ} hot={hot} />
        </Fragment>
      );
    case "display":
      return (
        <Fragment>
          <P g="rbox" a={[0.03, 0.21, 0.15]} m="casing" hot={hot} />
          <P g="box" a={[0.012, 0.17, 0.108]} m="screen" p={[0.014, 0, 0.012]} hot={hot} />
          <P g="box" a={[0.006, 0.165, 0.103]} m="glass" p={[0.02, 0, 0.012]} hot={hot} />
          <P g="cyl" a={[0.01, 0.01, 0.016, 18]} m="metal" p={[0.018, 0.07, -0.056]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.01, 0.01, 0.016, 18]} m="metal" p={[0.018, -0.07, -0.056]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.005, 0.005, 0.012, 12]} m="core" p={[0.018, 0, -0.058]} r={RZ} hot={hot} />
          {([[0.095, 0.06], [-0.095, 0.06], [0.095, -0.06], [-0.095, -0.06]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[0.015, v[0], v[1]]} s={0.007} hot={hot} />
          ))}
        </Fragment>
      );
    case "rear":
      return (
        <Fragment>
          <P g="rbox" a={[0.024, 0.22, 0.2]} m="casing" hot={hot} />
          <P g="box" a={[0.014, 0.09, 0.03]} m="metal" p={[0.02, 0, 0.04]} hot={hot} />
          <P g="cyl" a={[0.011, 0.011, 0.07, 16]} m="rubber" p={[0.03, 0, 0.04]} r={RZ} hot={hot} />
          {[0, 1, 2].map((i) => (
            <P key={i} g="box" a={[0.012, 0.13, 0.006]} m="metal" p={[0.014, 0, -0.05 + i * 0.022]} hot={hot} />
          ))}
          <P g="box" a={[0.016, 0.026, 0.022]} m="orange" p={[0.016, 0.092, 0.07]} hot={hot} />
          <P g="box" a={[0.016, 0.026, 0.022]} m="orange" p={[0.016, -0.092, 0.07]} hot={hot} />
          {([[0.09, 0.085], [-0.09, 0.085], [0.09, -0.085], [-0.09, -0.085]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[0.015, v[0], v[1]]} s={0.008} hot={hot} />
          ))}
        </Fragment>
      );
    case "estop":
      return (
        <Fragment>
          <P g="cyl" a={[0.032, 0.036, 0.016, 28]} m="metal" p={[0, 0, -0.014]} r={RX} hot={hot} />
          <P g="cyl" a={[0.03, 0.03, 0.008, 28]} m="warn" p={[0, 0, -0.002]} r={RX} hot={hot} />
          <P g="cyl" a={[0.022, 0.026, 0.014, 24]} m="casing" p={[0, 0, 0.008]} r={RX} hot={hot} />
          <P g="cyl" a={[0.03, 0.024, 0.012, 24]} m="estop" p={[0, 0, 0.02]} r={RX} hot={hot} />
          <P g="cyl" a={[0.03, 0.03, 0.006, 24]} m="estop" p={[0, 0, 0.028]} r={RX} hot={hot} />
        </Fragment>
      );
    case "mast":
      return (
        <Fragment>
          <P g="rbox" a={[0.05, 0.05, 0.17]} m="metal" hot={hot} />
          <P g="cyl" a={[0.054, 0.054, 0.022, 24]} m="casing" p={[0, 0, -0.086]} r={RX} hot={hot} />
          {([0.044, -0.03] as number[]).map((z, i) => (
            <P key={i} g="cyl" a={[0.037, 0.037, 0.013, 24]} m="casing" p={[0, 0, z]} r={RX} hot={hot} />
          ))}
          <P g="box" a={[0.012, 0.014, 0.15]} m="rubber" p={[0.03, 0, 0.01]} hot={hot} />
          {([[0.018, 0.018], [-0.018, 0.018], [0.018, -0.018], [-0.018, -0.018]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[v[0], v[1], -0.092]} r={RX} s={0.006} hot={hot} />
          ))}
        </Fragment>
      );
    case "head":
      return (
        <Fragment>
          <P g="rbox" a={[0.21, 0.25, 0.13]} m="shell" hot={hot} />
          <P g="rbox" a={[0.03, 0.215, 0.105]} m="casing" p={[0.1, 0, 0]} hot={hot} />
          <P g="box" a={[0.17, 0.215, 0.026]} m="shell" p={[0, 0, 0.082]} hot={hot} />
          <P g="box" a={[0.06, 0.006, 0.04]} m="metal" p={[0, 0.128, 0.02]} hot={hot} />
          {([[0.092, 0.04], [-0.092, 0.04], [0.092, -0.04], [-0.092, -0.04]] as [number, number][]).map((v, i) => (
            <Bolt key={i} p={[0.114, v[0], v[1]]} s={0.007} hot={hot} />
          ))}
        </Fragment>
      );
    case "acoustic":
      return (
        <Fragment>
          <P g="cyl" a={[0.054, 0.054, 0.024, 32]} m="casing" r={RZ} hot={hot} />
          <P g="tor" a={[0.05, 0.006, 10, 32]} m="metal" p={[0.012, 0, 0]} r={[0, Math.PI / 2, 0]} hot={hot} />
          <P g="cyl" a={[0.008, 0.008, 0.012, 14]} m="lens" p={[0.015, 0, 0]} r={RZ} hot={hot} />
          {[0.022, 0.04].map((rad, ri) =>
            Array.from({ length: ri === 0 ? 6 : 12 }).map((_, k) => {
              const cnt = ri === 0 ? 6 : 12;
              const a = (k / cnt) * Math.PI * 2;
              return (
                <P
                  key={`${ri}-${k}`}
                  g="cyl"
                  a={[0.005, 0.005, 0.012, 10]}
                  m="lens"
                  p={[0.015, Math.cos(a) * rad, Math.sin(a) * rad]}
                  r={RZ}
                  hot={hot}
                />
              );
            }),
          )}
        </Fragment>
      );
    case "thermal":
      return <Camera hot={hot} lens={0.022} />;
    case "hdcam":
      return <Camera hot={hot} lens={0.031} />;
    case "gas":
      return (
        <Fragment>
          <P g="rbox" a={[0.05, 0.07, 0.05]} m="casing" hot={hot} />
          <P g="cyl" a={[0.026, 0.028, 0.016, 24]} m="metal" p={[0.03, 0, 0]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.024, 0.024, 0.012, 24]} m="rubber" p={[0.04, 0, 0]} r={RZ} hot={hot} />
          {[-2, -1, 0, 1, 2].map((i) => (
            <P key={`h${i}`} g="box" a={[0.008, 0.04, 0.004]} m="sensor" p={[0.047, 0, i * 0.009]} hot={hot} />
          ))}
          {[-1, 0, 1].map((i) => (
            <P key={`v${i}`} g="box" a={[0.008, 0.004, 0.04]} m="sensor" p={[0.047, i * 0.012, 0]} hot={hot} />
          ))}
          <P g="cyl" a={[0.005, 0.005, 0.01, 10]} m="core" p={[0.026, 0.03, 0.02]} r={RZ} hot={hot} />
          <P g="cyl" a={[0.007, 0.007, 0.016, 14]} m="metal" p={[0.01, -0.038, -0.0]} r={RX} hot={hot} />
        </Fragment>
      );
    case "nav":
      return (
        <Fragment>
          <P g="rbox" a={[0.06, 0.16, 0.04]} m="casing" hot={hot} />
          <P g="cyl" a={[0.032, 0.034, 0.012, 28]} m="metal" p={[0, 0, 0.024]} r={RX} hot={hot} />
          <P g="cyl" a={[0.03, 0.03, 0.03, 28]} m="lens" p={[0, 0, 0.046]} r={RX} hot={hot} />
          <P g="cyl" a={[0.034, 0.026, 0.012, 28]} m="metal" p={[0, 0, 0.064]} r={RX} hot={hot} />
          <P g="cyl" a={[0.008, 0.008, 0.014, 12]} m="core" p={[0, 0, 0.074]} r={RX} hot={hot} />
          {[0.05, -0.05].map((y, i) => (
            <Fragment key={i}>
              <P g="cyl" a={[0.015, 0.016, 0.012, 18]} m="metal" p={[0.03, y, -0.004]} r={RZ} hot={hot} />
              <P g="cyl" a={[0.011, 0.011, 0.012, 18]} m="lens" p={[0.038, y, -0.004]} r={RZ} hot={hot} />
            </Fragment>
          ))}
        </Fragment>
      );
    case "antennaL":
    case "antennaR":
      return (
        <Fragment>
          <P g="cyl" a={[0.015, 0.018, 0.014, 18]} m="metal" p={[0, 0, -0.052]} r={RX} hot={hot} />
          <P g="cyl" a={[0.011, 0.011, 0.02, 18]} m="rubber" p={[0, 0, -0.036]} r={RX} hot={hot} />
          <P g="cyl" a={[0.0055, 0.0055, 0.12, 14]} m="antenna" p={[0, 0, 0.012]} r={RX} hot={hot} />
          <P g="sph" a={[0.011, 16, 14]} m="antenna" p={[0, 0, 0.074]} hot={hot} />
        </Fragment>
      );
    case "railL":
    case "railR":
      return (
        <Fragment>
          <P g="cyl" a={[0.019, 0.019, 0.34, 20]} m="orange" r={RX} hot={hot} />
          <P g="sph" a={[0.021, 16, 14]} m="orange" p={[0, 0, 0.17]} hot={hot} />
          <P g="sph" a={[0.021, 16, 14]} m="orange" p={[0, 0, -0.17]} hot={hot} />
          {[0.1, -0.1].map((z, i) => (
            <Fragment key={i}>
              <P g="rbox" a={[0.06, 0.04, 0.034]} m="metal" p={[-0.03, 0, z]} hot={hot} />
              <Bolt p={[-0.058, 0, z]} r={RZ} s={0.007} hot={hot} />
            </Fragment>
          ))}
        </Fragment>
      );
    default:
      return <P g="rbox" a={[0.06, 0.06, 0.06]} m="casing" hot={hot} />;
  }
}
