import ProductPanel from "@/components/product/ProductPanel";
import type { Product } from "@/types/product";

interface ProductGalleryProps {
  products: Product[];
}

export default function ProductGallery({ products }: ProductGalleryProps) {
  return (
    <main className="gallery">
      {products.map((product) => (
        <ProductPanel key={product.id} product={product} />
      ))}
    </main>
  );
}
