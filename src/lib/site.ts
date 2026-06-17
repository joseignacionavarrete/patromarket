/**
 * Configuración global del sitio.
 *
 * Centraliza marca, enlaces y textos repetidos para no esparcir constantes
 * por los componentes.
 */
export const siteConfig = {
  name: "BigoteMarket",
  title: "Mundial Kits · Camisetas Oficiales 2026",
  description:
    "Colección oficial Mundial 2026. 5 selecciones, réplicas premium. Envío a todo Chile. Consulta por Instagram.",
  url: "https://bigotemarket.vercel.app",
  instagram: {
    handle: "@_simonbarraza_",
    url: "https://www.instagram.com/_simonbarraza_?igsh=MXZ2MjJmY3RwZ2V2MA==",
  },
} as const;

export type SiteConfig = typeof siteConfig;
