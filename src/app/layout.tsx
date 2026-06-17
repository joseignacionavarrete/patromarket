import type { Metadata } from "next";
import Ticker from "@/components/layout/Ticker";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IntroAnimation from "@/components/intro/IntroAnimation";
import { PromoProvider } from "@/components/promo/PromoContext";
import DiscountWheel from "@/components/promo/DiscountWheel";
import WhatsAppWidget from "@/components/promo/WhatsAppWidget";
import { siteConfig } from "@/lib/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_CL",
    type: "website",
  },
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
      <body>
        <PromoProvider>
          <IntroAnimation />
          <Ticker />
          <Header />
          {children}
          <Footer />
          <WhatsAppWidget />
          <DiscountWheel />
        </PromoProvider>
      </body>
    </html>
  );
}
