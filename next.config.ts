import type { NextConfig } from "next";
import path from "node:path";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? repoName : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? repoName : "",
  },
  // Las imágenes de producto son locales (public/productos) y ya vienen
  // dimensionadas para web. Se sirven sin el proxy de optimización: en este
  // entorno el optimizador cae a WASM (45 s/imagen). En Vercel, donde el
  // optimizador es nativo y rápido, puede reactivarse quitando esta línea.
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
