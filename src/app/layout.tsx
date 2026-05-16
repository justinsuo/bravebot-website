import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/components/ModeContext";

// Site-wide typeface: Inter — a neutral, professional grotesk that matches
// the clean medical-corporate look; Geist Mono for the few technical labels.
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "BraveBot is a wheel-legged autonomous inspection robot for AI data centers and industrial environments. It fuses acoustic, thermal, gas and visual sensing with on-edge AI to detect invisible infrastructure failures before they cause downtime.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bravebot.vigilesrobotics.com"),
  title: {
    default: "BraveBot — Embodied AI Inspection Robot | Vigiles Robotics",
    template: "%s | BraveBot",
  },
  description,
  keywords: [
    "BraveBot",
    "Vigiles Robotics",
    "data center inspection robot",
    "wheel-legged robot",
    "embodied AI",
    "acoustic imaging",
    "thermal inspection",
    "gas detection",
    "edge AI",
    "TRON 1",
    "predictive maintenance",
  ],
  authors: [{ name: "Vigiles Robotics" }],
  openGraph: {
    title: "BraveBot — Embodied AI for the Dark AI Data Center",
    description,
    type: "website",
    siteName: "Vigiles Robotics",
  },
  twitter: {
    card: "summary_large_image",
    title: "BraveBot — Embodied AI Inspection Robot",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <a
          href="#anatomy"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
