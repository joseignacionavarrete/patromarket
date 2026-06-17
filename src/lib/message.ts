/** Construcción del mensaje de consulta personalizado (WhatsApp / Instagram). */
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";

/** Premio obtenido en la ruleta de descuento (easter egg). */
export interface PromoPrize {
  /** Descuento en pesos. */
  off: number;
  /** Precio final ya con el descuento aplicado. */
  finalPrice: number;
  /** Etiqueta del gajo ganado. */
  label: string;
}

export interface ConsultMessageInput {
  /** Nombre de la selección (ej. "ARGENTINA"). */
  name: string;
  /** Emoji de la bandera. */
  flag: string;
  /** Talla elegida, o null si todavía no eligió. */
  size: string | null;
  /** Precio base de la camiseta. */
  price: number;
  /** Premio de la ruleta, solo si la activó y ganó descuento. */
  prize: PromoPrize | null;
}

/**
 * Arma un mensaje listo para enviar con la nacionalidad y la talla. Si el
 * cliente activó la ruleta y ganó descuento, incluye además esa variable.
 */
export function buildConsultMessage({
  name,
  flag,
  size,
  price,
  prize,
}: ConsultMessageInput): string {
  const sizePart = size ? `, talla ${size}` : "";
  const lines = [
    `¡Hola ${siteConfig.name}! 👋`,
    `Me interesa la camiseta ${flag} ${name}${sizePart}.`,
  ];

  if (prize && prize.off > 0) {
    lines.push(
      `🎉 Activé la ruleta y gané ${formatPrice(
        prize.off,
      )} de descuento → queda en ${formatPrice(prize.finalPrice)}.`,
    );
  } else {
    lines.push(`Precio ${formatPrice(price)}.`);
  }

  lines.push("¿Sigue disponible?");
  return lines.join("\n");
}
