import Link from "next/link";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/lib/site";
import { formatPrice, renderStars } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductPanelProps {
  product: Product;
}

export default function ProductPanel({ product }: ProductPanelProps) {
  return (
    <article
      className="panel"
      data-id={product.id}
      style={{ ["--ac" as string]: product.theme.accent }}
    >
      <div className="panel-bg" style={{ background: product.theme.gradient }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.image}
        alt={`Camiseta ${product.name}`}
        className="panel-img"
        loading="lazy"
      />
      <div className="panel-glow" style={{ background: product.theme.glow }} />

      {/* Etiqueta vertical visible cuando el panel está colapsado */}
      <div className="panel-tab">
        <span className="panel-flag">{product.flag}</span>
        <span className="panel-tab-name">{product.name}</span>
        <span className="panel-stars">{renderStars(product.rating)}</span>
      </div>

      {/* Info que aparece al expandir el panel */}
      <div className="panel-info">
        <div className="card-eyebrow">{product.eyebrow}</div>
        <h2 className="card-title">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className="card-player">{product.player}</p>
        <p className="card-detail">{product.detail}</p>
        <div className="card-footer-row">
          <div className="price-wrap">
            <span className="price-label">Precio</span>
            <span className="price">{formatPrice(product.price)}</span>
            <span className="price-cur">{product.currency}</span>
          </div>
          <div className="tallas">
            {product.sizes.map((size) => (
              <span className="t" key={size}>
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="panel-actions">
          <Link className="btn-detail" href={`/products/${product.slug}`}>
            Ver detalle
          </Link>
          <a
            className="btn-ig"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </article>
  );
}
