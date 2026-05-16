"use client";

/** Closing CTA with an email-capture contact box + footer. */

import { useState } from "react";
import { GsapReveal } from "./GsapReveal";
import { landing } from "@/config/landing";

export function FinalCTA() {
  const { finalCta, footer, brand } = landing;
  const year = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("BraveBot demo request");
    const body = encodeURIComponent(
      `Hello Vigiles Robotics team,\n\nI'd like to request a BraveBot demo.\n\nPlease reach me at: ${email}`,
    );
    window.location.href = `mailto:${finalCta.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <section id="contact" className="relative overflow-hidden px-5 py-32 sm:px-8 md:py-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 40%, rgba(61,109,251,0.18), transparent 72%)",
          }}
        />
        <div className="bg-techgrid absolute inset-0 opacity-60" aria-hidden="true" />

        <GsapReveal className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-[1.12] sm:text-5xl md:text-6xl">
            <span className="text-gradient">{finalCta.headline}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-tdim sm:text-lg">
            {finalCta.body}
          </p>

          {/* email-capture contact box */}
          <div className="mx-auto mt-9 w-full max-w-md">
            {sent ? (
              <div className="rounded-xl border border-cyan/40 bg-panel p-6">
                <p className="text-base font-semibold text-foreground">
                  Thanks — your request is on its way.
                </p>
                <p className="mt-1.5 text-sm text-tdim">
                  Your email app should open addressed to our team. We&apos;ll get
                  back to you at{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-line bg-panel p-4 text-left"
              >
                <label
                  htmlFor="demo-email"
                  className="block text-sm font-medium text-foreground"
                >
                  Your work email
                </label>
                <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                  <input
                    id="demo-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full flex-1 rounded-lg border border-line bg-void px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-tfaint focus:border-cyan/70"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-void transition-opacity hover:opacity-90"
                  >
                    Request a demo
                  </button>
                </div>
                <p className="mt-2 text-xs text-tfaint">
                  We&apos;ll only use your email to follow up about a demo.
                </p>
              </form>
            )}

            <a
              href={finalCta.ctaSecondary.href}
              className="mt-4 inline-block text-sm text-tdim transition-colors hover:text-foreground"
            >
              {finalCta.ctaSecondary.label} →
            </a>
          </div>
        </GsapReveal>
      </section>

      <footer className="border-t border-line bg-abyss px-5 py-12 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan/40 bg-cyan/10">
                <span className="block h-3 w-3 rotate-45 border-2 border-cyan-bright" />
              </span>
              <span className="text-sm font-semibold tracking-tight">
                {brand.name}
                <span className="ml-2 text-xs font-normal text-tfaint">{brand.org}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-tdim">{footer.tagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-tfaint">{footer.note}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {footer.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-tdim transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl border-t border-line pt-6 text-xs text-tfaint">
          © {year} {brand.org}. Concept site — not affiliated with any third party.
        </div>
      </footer>
    </>
  );
}
