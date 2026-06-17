import type { Product } from "@/types/product";

/**
 * Catálogo de productos.
 *
 * Esta es la única fuente de datos del catálogo. El acceso se hace siempre
 * a través de `@/lib/products` para poder sustituir este arreglo por una
 * base de datos o API en el futuro sin cambiar los componentes.
 */
export const products: Product[] = [
  {
    id: "argentina",
    slug: "argentina",
    name: "ARGENTINA",
    player: "Messi · #10 · AFA · Adidas",
    eyebrow: "Tricampeones del Mundo · 3 Estrellas",
    detail: "Albiceleste · Parche FIFA WC 2022 · Escudo dorado",
    price: 20000,
    currency: "CLP",
    sizes: ["S", "M", "L", "XL"],
    rating: 3,
    flag: "🇦🇷",
    image: "/kits/argentina.jpg",
    theme: {
      accent: "#74b9e8",
      glow: "#74b9e81A",
      gradient: "linear-gradient(160deg, #001a3a 0%, #003d8a 55%, #74b9e8 100%)",
    },
  },
  {
    id: "spain",
    slug: "espana",
    name: "ESPAÑA",
    player: "Lamine Yamal · #19 · Adidas",
    eyebrow: "La Roja · Campeona de Europa · RFEF",
    detail: "Roja rayas doradas · 1 Estrella · España bordado",
    price: 20000,
    currency: "CLP",
    sizes: ["S", "M", "L", "XL"],
    rating: 1,
    flag: "🇪🇸",
    image: "/kits/spain.jpg",
    theme: {
      accent: "#f4c213",
      glow: "#f4c2131A",
      gradient: "linear-gradient(160deg, #2a0000 0%, #c0392b 55%, #e74c3c 100%)",
    },
  },
  {
    id: "portugal",
    slug: "portugal",
    name: "PORTUGAL",
    player: "Ronaldo · #7 · Puma",
    eyebrow: "La Fuerza de Europa · FPF",
    detail: "Roja textura ondas · Escudo FPF · Authentic Licensed",
    price: 20000,
    currency: "CLP",
    sizes: ["S", "M", "L", "XL"],
    rating: 1,
    flag: "🇵🇹",
    image: "/kits/portugal.jpg",
    theme: {
      accent: "#e63946",
      glow: "#e639461A",
      gradient: "linear-gradient(160deg, #1a0000 0%, #8b0000 55%, #c0392b 100%)",
    },
  },
  {
    id: "brazil",
    slug: "brasil",
    name: "BRASIL",
    player: "Ronaldinho · #10 · Nike",
    eyebrow: "La Canarinha · 5 Estrellas · CBF",
    detail: "Amarilla clásica · Verde petróleo · Engineered",
    price: 20000,
    currency: "CLP",
    sizes: ["S", "M", "L", "XL"],
    rating: 5,
    flag: "🇧🇷",
    image: "/kits/brazil.jpg",
    theme: {
      accent: "#f9e12b",
      glow: "#f9e12b1A",
      gradient: "linear-gradient(160deg, #003300 0%, #00853e 55%, #009b3a 100%)",
    },
  },
  {
    id: "germany",
    slug: "alemania",
    name: "ALEMANIA",
    player: "Edición Retro · Adidas · Climacool",
    eyebrow: "Die Mannschaft · DFB · 4 Estrellas",
    detail: "Blanca · Chevron negro/rojo/dorado · Águila DFB",
    price: 20000,
    currency: "CLP",
    sizes: ["S", "M", "L", "XL"],
    rating: 4,
    flag: "🇩🇪",
    image: "/kits/germany.jpg",
    theme: {
      accent: "#cccccc",
      glow: "#cccccc1A",
      gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 55%, #333 100%)",
    },
  },
];
