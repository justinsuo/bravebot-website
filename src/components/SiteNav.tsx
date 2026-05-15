"use client";

import { useEffect, useState } from "react";
import { navSections } from "@/data/bravebot";
import { ModeToggle } from "./ModeToggle";

export function SiteNav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-void/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
        {/* brand */}
        <a href="#hero" className="flex items-center gap-2.5" aria-label="BraveBot home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan/40 bg-cyan/10">
            <span className="block h-3.5 w-3.5 rotate-45 border-2 border-cyan-bright" />
          </span>
          <span className="leading-none">
            <span className="block font-mono text-[0.62rem] uppercase tracking-[0.28em] text-orange-bright">
              Vigiles Robotics
            </span>
            <span className="block text-base font-bold tracking-tight">BraveBot</span>
          </span>
        </a>

        {/* desktop section nav */}
        <nav
          aria-label="Sections"
          className="ml-auto hidden items-center gap-0.5 xl:flex"
        >
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`rounded-md px-2.5 py-1.5 text-[0.78rem] font-medium transition-colors ${
                active === s.id
                  ? "bg-panel-2 text-cyan-bright"
                  : "text-tfaint hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-3">
          <ModeToggle compact />
          <a
            href="#cta"
            className="hidden rounded-lg bg-orange px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-orange-bright sm:inline-block"
          >
            Request Demo
          </a>
          <button
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel xl:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* mobile section nav */}
      {menuOpen && (
        <nav
          aria-label="Sections"
          className="border-t border-line bg-void/95 px-5 py-3 backdrop-blur-xl xl:hidden"
        >
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {navSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === s.id
                    ? "bg-panel-2 text-cyan-bright"
                    : "text-tdim hover:text-foreground"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
