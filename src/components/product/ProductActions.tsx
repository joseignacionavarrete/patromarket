"use client";

import { useState } from "react";
import Link from "next/link";
import InstagramIcon from "@/components/ui/InstagramIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { usePromo } from "@/components/promo/PromoContext";
import { buildConsultMessage } from "@/lib/message";
import { siteConfig, whatsappLink } from "@/lib/site";
import type { Product } from "@/types/product";

interface ProductActionsProps {
  product: Product;
  /** "panel" = galería (desktop); "pdp" = ficha de producto. */
  variant: "panel" | "pdp";
}

/**
 * Selector de talla + acciones de consulta. El mensaje se arma con la
 * nacionalidad, la talla elegida y —si activó la ruleta— el descuento ganado.
 */
export default function ProductActions({ product, variant }: ProductActionsProps) {
  const [size, setSize] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { prize } = usePromo();

  const message = buildConsultMessage({
    name: product.name,
    flag: product.flag,
    size,
    price: product.price,
    prize,
  });

  async function consultInstagram() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      /* sin portapapeles: igual abrimos Instagram */
    }
    window.open(siteConfig.instagram.url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={`actions actions--${variant}`}>
      <div className="size-pick">
        <span className="price-label">Elige tu talla</span>
        <div className="tallas">
          {product.sizes.map((s) => (
            <button
              type="button"
              key={s}
              className={`t${size === s ? " t--active" : ""}`}
              aria-pressed={size === s}
              onClick={() => setSize((prev) => (prev === s ? null : s))}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="actions-row">
        <a
          className="btn-wa"
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <span>WhatsApp</span>
        </a>
        <button type="button" className="btn-ig" onClick={consultInstagram}>
          <InstagramIcon />
          <span>Instagram</span>
        </button>
      </div>

      <p className={`copied-hint${copied ? " copied-hint--show" : ""}`} role="status">
        Mensaje copiado ✓ — pégalo en el chat de Instagram
      </p>

      {variant === "panel" ? (
        <Link className="see-detail" href={`/products/${product.slug}`}>
          Ver detalle →
        </Link>
      ) : null}
    </div>
  );
}
