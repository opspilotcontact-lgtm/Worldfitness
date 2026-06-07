import rawData from "../../data/productos.json";
import type { Categoria, CentroTipo, Producto } from "@/types";
import { FEATURED_CATEGORY_HERO } from "@/lib/site";

const PRODUCTOS = rawData as Producto[];

export function getAllProductos(): Producto[] {
  return PRODUCTOS;
}

export function getProducto(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug);
}

export function getCategorias(): Categoria[] {
  const map = new Map<string, Categoria>();
  for (const p of PRODUCTOS) {
    const existing = map.get(p.categoria_slug);
    if (existing) existing.count += 1;
    else
      map.set(p.categoria_slug, {
        slug: p.categoria_slug,
        nombre: p.categoria,
        count: 1,
      });
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function getCategoria(slug: string): Categoria | undefined {
  return getCategorias().find((c) => c.slug === slug);
}

export function getProductosByCategoria(slug: string): Producto[] {
  return PRODUCTOS.filter((p) => p.categoria_slug === slug);
}

export function getProductosByTipo(tipo: CentroTipo): Producto[] {
  return PRODUCTOS.filter((p) => p.encaja_para.includes(tipo));
}

/** Destacados: representativos por categoría, priorizando los de la home original. */
export function getDestacados(limit = 12): Producto[] {
  const byCat = new Map<string, Producto>();
  const sorted = [...PRODUCTOS].sort(
    (a, b) => Number(b.destacado_origen) - Number(a.destacado_origen)
  );
  for (const p of sorted) {
    if (!byCat.has(p.categoria_slug)) byCat.set(p.categoria_slug, p);
  }
  const result = [...byCat.values()];
  for (const p of sorted) {
    if (result.length >= limit) break;
    if (!result.includes(p) && p.imagen_local) result.push(p);
  }
  return result.slice(0, limit);
}

export function getSimilares(producto: Producto, limit = 4): Producto[] {
  return PRODUCTOS.filter(
    (p) => p.categoria_slug === producto.categoria_slug && p.slug !== producto.slug
  ).slice(0, limit);
}

/** Para cada categoría, un producto representativo con imagen (para showcases). */
export function getCategoriaHeroes(): {
  slug: string;
  nombre: string;
  count: number;
  imagen: string;
  desde: number;
}[] {
  return getCategorias()
    .map((c) => {
      const items = getProductosByCategoria(c.slug).filter((p) => p.imagen_cutout);
      const curatedSlug = FEATURED_CATEGORY_HERO[c.slug];
      const hero =
        (curatedSlug && items.find((p) => p.slug === curatedSlug)) ??
        items.find((p) => p.destacado_origen) ??
        items[0];
      const precios = getProductosByCategoria(c.slug)
        .map((p) => p.precio)
        .filter((p) => p > 0);
      return hero
        ? {
            slug: c.slug,
            nombre: c.nombre,
            count: c.count,
            imagen: hero.imagen_cutout as string,
            desde: precios.length ? Math.min(...precios) : 0,
          }
        : null;
    })
    .filter(Boolean) as {
    slug: string;
    nombre: string;
    count: number;
    imagen: string;
    desde: number;
  }[];
}

export function getPriceRange(): { min: number; max: number } {
  const prices = PRODUCTOS.map((p) => p.precio).filter((p) => p > 0);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

/** Selección curada para una landing de tipo de proyecto. */
export function getRecomendadosParaTipo(tipo: CentroTipo, limit = 12): Producto[] {
  return getProductosByTipo(tipo)
    .filter((p) => p.imagen_local)
    .slice(0, limit);
}
