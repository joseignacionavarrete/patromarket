/** Utilidades de formato para la capa de presentación. */

/** Formatea un monto a moneda local (ej. 20000 → "$20.000"). */
export function formatPrice(amount: number, currency: string = "CLP"): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Devuelve la representación en estrellas de un rating (ej. 3 → "★★★"). */
export function renderStars(rating: number): string {
  return "★".repeat(Math.max(0, Math.min(5, Math.round(rating))));
}
