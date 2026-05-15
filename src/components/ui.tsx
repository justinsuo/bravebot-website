import type { ReactNode } from "react";
import type { Confidence } from "@/data/bravebot";

/* Plain presentational primitives — safe in server or client components. */

export function Section({
  id,
  children,
  className = "",
  grid = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  grid?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 ${
        grid ? "bg-techgrid" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="h-px w-7 bg-orange" />
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-orange-bright">
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="mb-12 max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[1.9rem] leading-[1.12] sm:text-4xl md:text-[2.9rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-tdim sm:text-lg">{intro}</p>}
    </header>
  );
}

export function GlassCard({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  return (
    <As className={`glass rounded-2xl ${className}`}>{children}</As>
  );
}

export function Tag({
  children,
  tone = "cyan",
}: {
  children: ReactNode;
  tone?: "cyan" | "orange" | "neutral" | "ok" | "warn" | "crit";
}) {
  const tones: Record<string, string> = {
    cyan: "border-cyan/40 bg-cyan/10 text-cyan-bright",
    orange: "border-orange/40 bg-orange/10 text-orange-bright",
    neutral: "border-line bg-panel-2 text-tdim",
    ok: "border-ok/40 bg-ok/10 text-ok",
    warn: "border-warn/40 bg-warn/10 text-warn",
    crit: "border-crit/40 bg-crit/10 text-crit",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

const confidenceMeta: Record<Confidence, { label: string; tone: "ok" | "warn" | "cyan" | "orange" }> = {
  confirmed: { label: "Confirmed", tone: "ok" },
  estimated: { label: "Estimated", tone: "warn" },
  optional: { label: "Optional", tone: "cyan" },
  "config-dependent": { label: "Config-dependent", tone: "orange" },
};

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const m = confidenceMeta[confidence];
  return <Tag tone={m.tone}>{m.label}</Tag>;
}

export function CtaButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200";
  const variants: Record<string, string> = {
    primary: "bg-foreground text-void hover:opacity-90",
    secondary: "border border-line bg-panel-2 text-foreground hover:border-cyan/60 hover:bg-panel",
    ghost: "border border-line text-tdim hover:text-foreground hover:border-cyan/40",
  };
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function StatBlock({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <div className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{value}</div>
      <div className="mt-1 text-sm font-medium text-tdim">{label}</div>
      {note && <div className="mt-0.5 text-xs text-tfaint">{note}</div>}
    </div>
  );
}
