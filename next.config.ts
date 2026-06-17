import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto para Turbopack (evita el warning por múltiples
  // lockfiles detectados en directorios superiores).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
