import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/product/ProductActions";
import ProductCarousel from "@/components/product/ProductCarousel";
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
        <ProductCarousel
          image={product.image}
          extras={product.images ?? []}
          alt={`Camiseta ${product.name}`}
          accent={product.theme.accent}
          gradient={product.theme.gradient}
          flag={product.flag}
        />

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

          <ProductActions product={product} variant="pdp" />

          <p className="pdp-note">
            Coordinamos talla, pago y despacho por WhatsApp o Instagram.
          </p>
        </div>
      </div>
    </main>
  );
}
