import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AcousticIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="6" cy="12" r="2.4" />
      <path d="M11 7.5a7 7 0 0 1 0 9" />
      <path d="M14.5 5a11 11 0 0 1 0 14" />
      <path d="M18 2.5a15 15 0 0 1 0 19" />
    </svg>
  );
}

export function ThermalIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0Z" />
      <path d="M12 9v7" />
    </svg>
  );
}

export function GasIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3c2.5 2.5 5 5 5 8.5A5 5 0 0 1 7 11.5C7 8 9.5 5.5 12 3Z" />
      <path d="M9.5 19.5c1.5-1 3.5-1 5 0" />
      <path d="M8 22c2.5-1.4 5.5-1.4 8 0" />
    </svg>
  );
}

export function VisualIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function ChipIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" />
    </svg>
  );
}

export function BoltIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export const sensorIcon = {
  acoustic: AcousticIcon,
  thermal: ThermalIcon,
  gas: GasIcon,
  visual: VisualIcon,
} as const;
