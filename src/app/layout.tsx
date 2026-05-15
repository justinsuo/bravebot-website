import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { ModeProvider } from "@/components/ModeContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const michroma = Michroma({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
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
  themeColor: "#eef0f4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} h-full antialiased`}
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
