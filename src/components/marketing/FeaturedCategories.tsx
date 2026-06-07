import { getCategoriaHeroes } from "@/lib/productos";
import { FeaturedCategoriesClient } from "@/components/marketing/FeaturedCategoriesClient";

/**
 * Showcase editorial por categoría: la máquina recortada (PNG transparente)
 * flota sobre un bloque tonal con numeral fantasma y acento naranja. Las
 * animaciones de scroll (GSAP ScrollTrigger) viven en el componente cliente.
 */
export function FeaturedCategories({ limit = 4 }: { limit?: number }) {
  const cats = getCategoriaHeroes().slice(0, limit);
  return <FeaturedCategoriesClient cats={cats} />;
}
