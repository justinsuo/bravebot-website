"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Mode } from "@/data/bravebot";

interface ModeContextValue {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggle: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("datacenter");
  const toggle = () => setMode((m) => (m === "datacenter" ? "industrial" : "datacenter"));
  return (
    <ModeContext.Provider value={{ mode, setMode, toggle }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
