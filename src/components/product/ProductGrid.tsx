import type { Producto } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductGrid({
  productos,
  priorityCount = 0,
}: {
  productos: Producto[];
  priorityCount?: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {productos.map((p, i) => (
        <ProductCard key={p.slug} producto={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
