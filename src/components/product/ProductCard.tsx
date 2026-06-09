import Link from "next/link";
import Image from "next/image";
import type { Producto } from "@/types";
import { AddToCart } from "@/components/cart/AddToCart";

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='#efe9dd'/><text x='50%' y='50%' font-family='monospace' font-size='16' fill='#8a8a8a' text-anchor='middle'>WFC · sin imagen</text></svg>`
  );

export function ProductCard({ producto, priority = false }: { producto: Producto; priority?: boolean }) {
  return (
    <div className="group relative flex flex-col hairline rounded-[var(--radius-card)] bg-bone transition hover:border-carbon hover:shadow-[4px_4px_0_var(--color-carbon)]">
      <div className="relative aspect-square overflow-hidden border-b border-line bg-bone p-4">
        <Image
          src={producto.imagen_cutout ?? producto.imagen_local ?? PLACEHOLDER}
          alt={producto.nombre}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain transition duration-500 group-hover:scale-[1.05]"
          priority={priority}
        />
        <span className="label-mono absolute left-0 top-0 bg-carbon px-2.5 py-1.5 text-bone">
          {producto.categoria}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[0.98rem] font-semibold leading-snug text-carbon">
          {/* Enlace estirado: hace toda la tarjeta clicable sin envolver el botón */}
          <Link
            href={`/producto/${producto.slug}`}
            className="transition after:absolute after:inset-0 after:content-[''] group-hover:text-energy-deep"
          >
            {producto.nombre}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-600">
          {producto.descripcion_corta}
        </p>
        <div className="mt-4 flex items-end justify-between gap-2 pt-3">
          <span className="spec-mono text-lg font-semibold text-carbon">
            {producto.precio_formato}
          </span>
          <AddToCart
            producto={{
              slug: producto.slug,
              nombre: producto.nombre,
              precio: producto.precio,
              precio_formato: producto.precio_formato,
              imagen: producto.imagen_cutout ?? producto.imagen_local,
            }}
            variant="card"
          />
        </div>
      </div>
    </div>
  );
}
