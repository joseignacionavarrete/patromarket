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
    handle: "@bigomarket",
    url: "https://www.instagram.com/bigomarket",
  },
  whatsapp: {
    /** Número en formato internacional sin signos (para wa.me). */
    number: "56952633743",
    /** Versión legible para mostrar. */
    display: "+56 9 5263 3743",
  },
} as const;

/** Construye un enlace de WhatsApp con mensaje opcional pre-rellenado. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type SiteConfig = typeof siteConfig;
