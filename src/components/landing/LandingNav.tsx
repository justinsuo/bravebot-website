"use client";

/** Fixed minimal navigation — transparent at the top, frosted once scrolled. */

import { useEffect, useState } from "react";
import { landing } from "@/config/landing";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-void/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${landing.brand.name} home`}>
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/40 bg-cyan/10">
            <span className="block h-3 w-3 rotate-45 border-2 border-cyan-bright" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold tracking-tight">
              {landing.brand.name}
            </span>
            <span className="block text-[0.7rem] text-tfaint">
              {landing.brand.org}
            </span>
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-7 md:flex">
          {landing.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-tdim transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2.5 md:ml-0">
          {/* the two right-side actions, combined into one segmented control */}
          <div className="hidden items-center rounded-lg border border-line p-1 sm:flex">
            <a
              href={landing.nav.explore.href}
              className="rounded-md px-3 py-1.5 text-sm text-tdim transition-colors hover:text-foreground"
            >
              {landing.nav.explore.label}
            </a>
            <a
              href={landing.nav.cta.href}
              className="rounded-md bg-foreground px-3.5 py-1.5 text-sm font-medium text-void transition-opacity hover:opacity-90"
            >
              {landing.nav.cta.label}
            </a>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-md border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-void/95 px-5 py-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {landing.nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-tdim transition-colors hover:bg-panel-2 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={landing.nav.explore.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-tdim transition-colors hover:bg-panel-2 hover:text-foreground"
            >
              {landing.nav.explore.label}
            </a>
            <a
              href={landing.nav.cta.href}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-md bg-foreground px-3 py-2 text-center text-sm font-medium text-void"
            >
              {landing.nav.cta.label}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
