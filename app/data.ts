export const IG_URL =
  "https://www.instagram.com/_simonbarraza_?igsh=MXZ2MjJmY3RwZ2V2MA==";
export const IG_HANDLE = "@_simonbarraza_";

export interface Kit {
  id: string;
  name: string;
  accent: string;
  glowBg: string;
  imgBg: string;
  img: string;
  stars: string;
  flag: string;
  eyebrow: string;
  player: string;
  detail: string;
  price: string;
  sizes: string[];
  /** true cuando la imagen es una foto a página completa (en vez de un recorte de producto) */
  photo?: boolean;
}

export const kits: Kit[] = [
  {
    id: "argentina",
    name: "ARGENTINA",
    accent: "#74b9e8",
    glowBg: "#74b9e81A",
    imgBg: "linear-gradient(160deg, #001a3a 0%, #003d8a 55%, #74b9e8 100%)",
    img: "/kits/argentina.jpg",
    stars: "★★★",
    flag: "🇦🇷",
    eyebrow: "Tricampeones del Mundo · 3 Estrellas",
    player: "Messi · #10 · AFA · Adidas",
    detail: "Albiceleste · Parche FIFA WC 2022 · Escudo dorado",
    price: "$20.000",
    sizes: ["S", "M", "L", "XL"],
    photo: true,
  },
  {
    id: "portugal",
    name: "PORTUGAL",
    accent: "#e63946",
    glowBg: "#e639461A",
    imgBg: "linear-gradient(160deg, #1a0000 0%, #8b0000 55%, #c0392b 100%)",
    img: "/kits/portugal.jpg",
    stars: "★",
    flag: "🇵🇹",
    eyebrow: "La Fuerza de Europa · FPF",
    player: "Ronaldo · #7 · Puma",
    detail: "Roja textura ondas · Escudo FPF · Authentic Licensed",
    price: "$20.000",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "spain",
    name: "ESPAÑA",
    accent: "#f4c213",
    glowBg: "#f4c2131A",
    imgBg: "linear-gradient(160deg, #2a0000 0%, #c0392b 55%, #e74c3c 100%)",
    img: "/kits/spain.jpg",
    stars: "★",
    flag: "🇪🇸",
    eyebrow: "La Roja · Campeona de Europa · RFEF",
    player: "Lamine Yamal · #19 · Adidas",
    detail: "Roja rayas doradas · 1 Estrella · España bordado",
    price: "$20.000",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "brazil",
    name: "BRASIL",
    accent: "#f9e12b",
    glowBg: "#f9e12b1A",
    imgBg: "linear-gradient(160deg, #003300 0%, #00853e 55%, #009b3a 100%)",
    img: "/kits/brazil.jpg",
    stars: "★★★★★",
    flag: "🇧🇷",
    eyebrow: "La Canarinha · 5 Estrellas · CBF",
    player: "Ronaldinho · #10 · Nike",
    detail: "Amarilla clásica · Verde petróleo · Engineered",
    price: "$20.000",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "germany",
    name: "ALEMANIA",
    accent: "#cccccc",
    glowBg: "#cccccc1A",
    imgBg: "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 55%, #333 100%)",
    img: "/kits/germany.jpg",
    stars: "★★★★",
    flag: "🇩🇪",
    eyebrow: "Die Mannschaft · DFB · 4 Estrellas",
    player: "Edición Retro · Adidas · Climacool",
    detail: "Blanca · Chevron negro/rojo/dorado · Águila DFB",
    price: "$20.000",
    sizes: ["S", "M", "L", "XL"],
  },
];
