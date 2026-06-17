import { products } from "@/data/products";
import type { Product } from "@/types/product";

/**
 * Capa de acceso a datos del catálogo.
 *
 * Hoy lee de un arreglo en memoria. Las funciones son `async` a propósito:
 * cuando los datos vengan de una base de datos o API, solo cambia esta capa
 * y los componentes (que ya hacen `await`) siguen igual.
 */

/** Devuelve todos los productos del catálogo. */
export async function getAllProducts(): Promise<Product[]> {
  return products;
}

/** Devuelve un producto por su slug, o `undefined` si no existe. */
export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((product) => product.slug === slug);
}

/** Devuelve todos los slugs (para generación estática de rutas). */
export async function getAllProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}
