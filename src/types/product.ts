/**
 * Tipos del dominio del catálogo.
 *
 * Mantener el modelo de datos aislado de la UI permite cambiar la fuente
 * (hoy un arreglo en memoria, mañana una base de datos o API) sin tocar
 * los componentes.
 */

/** Paleta visual asociada a cada selección. */
export interface ProductTheme {
  /** Color de acento (bordes, detalles al expandir). */
  accent: string;
  /** Fondo de resplandor (rgba) que aparece al destacar el producto. */
  glow: string;
  /** Degradado de fondo detrás de la imagen. */
  gradient: string;
}

/** Una camiseta del catálogo. */
export interface Product {
  /** Identificador estable. */
  id: string;
  /** Slug para URLs (`/products/<slug>`). */
  slug: string;
  /** Nombre de la selección. */
  name: string;
  /** Jugador / referencia destacada. */
  player: string;
  /** Texto corto sobre la línea del título. */
  eyebrow: string;
  /** Detalle descriptivo de la prenda. */
  detail: string;
  /** Precio en la unidad mínima de la moneda (CLP, sin decimales). */
  price: number;
  /** Código de moneda ISO. */
  currency: "CLP";
  /** Tallas disponibles. */
  sizes: string[];
  /** Cantidad de estrellas mundialistas (1–5). */
  rating: number;
  /** Emoji de la bandera. */
  flag: string;
  /** Ruta de la imagen principal (dentro de /public). */
  image: string;
  /**
   * Fotos adicionales para el carrusel de la ficha de producto.
   * La imagen principal (`image`) siempre va primero; estas se muestran
   * a continuación. Opcional: si no hay, el carrusel muestra solo `image`.
   */
  images?: string[];
  /** Paleta visual del producto. */
  theme: ProductTheme;
}
