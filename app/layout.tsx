import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mundial Kits · Camisetas Oficiales 2026",
  description:
    "Colección oficial Mundial 2026. 5 selecciones, réplicas premium. Envío a todo Chile. Consulta por Instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:ital,wght@0,300;0,600;0,700;1,600&family=Barlow:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
