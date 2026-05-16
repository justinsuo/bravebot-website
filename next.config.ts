import type { NextConfig } from "next";

/*
 * When PAGES=true (the GitHub Actions deploy build) the app is exported as a
 * fully static site under the /bravebot-website project path for GitHub Pages.
 * Local `npm run dev` / `npm run build` are unaffected.
 */
const isPages = process.env.PAGES === "true";
const basePath = isPages ? "/bravebot-website" : "";

const nextConfig: NextConfig = {
  ...(isPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
