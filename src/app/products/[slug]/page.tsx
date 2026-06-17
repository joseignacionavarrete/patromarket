import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";
import { formatPrice, renderStars } from "@/lib/format";
import { siteConfig } from "@/lib/site";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-genera una página estática por cada producto. */
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** Metadata específica del producto (SEO / compartir). */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const title = `Camiseta ${product.name} · ${siteConfig.name}`;
  const description = `${product.eyebrow} — ${product.detail}. ${formatPrice(
    product.price,
  )} ${product.currency}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="pdp">
      <Link href="/" className="pdp-back">
        ← Volver al catálogo
      </Link>

      <div className="pdp-layout">
        <div
          className="pdp-media"
          style={{ ["--ac" as string]: product.theme.accent }}
        >
          <div className="pdp-media-bg" style={{ background: product.theme.gradient }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pdp-img" src={product.image} alt={`Camiseta ${product.name}`} />
          <span className="pdp-flag">{product.flag}</span>
        </div>

        <div className="pdp-info">
          <p className="card-eyebrow">{product.eyebrow}</p>
          <h1 className="pdp-title">{product.name}</h1>
          <p className="pdp-stars">{renderStars(product.rating)}</p>
          <p className="card-player">{product.player}</p>
          <p className="pdp-detail">{product.detail}</p>

          <div className="pdp-price">
            <span className="price">{formatPrice(product.price)}</span>
            <span className="price-cur">{product.currency}</span>
          </div>

          <div className="pdp-sizes">
            <span className="price-label">Tallas disponibles</span>
            <div className="tallas">
              {product.sizes.map((size) => (
                <span className="t" key={size}>
                  {size}
                </span>
              ))}
            </div>
          </div>

          <a
            className="cta-btn pdp-cta"
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            Consultar por Instagram
          </a>

          <p className="pdp-note">
            Coordinamos talla, pago y despacho directamente por Instagram.
          </p>
        </div>
      </div>
    </main>
  );
}
