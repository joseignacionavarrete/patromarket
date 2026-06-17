import Hero from "@/components/home/Hero";
import SectionHeader from "@/components/home/SectionHeader";
import CtaSection from "@/components/home/CtaSection";
import ProductGallery from "@/components/product/ProductGallery";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <SectionHeader
        label="Colección 2026"
        title="LAS 5 GRANDES"
        count={`${products.length} selecciones · ${formatPrice(
          20000,
        )} c/u · pasa el cursor para ver la camiseta`}
      />
      <ProductGallery products={products} />
      <CtaSection />
    </>
  );
}
