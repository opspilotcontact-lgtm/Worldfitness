import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PROJECT_TYPES } from "@/lib/site";
import { getAllProductos, getCategorias } from "@/lib/productos";
import { POSTS } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const estaticas = [
    "",
    "/catalogo",
    "/showroom",
    "/proyectos",
    "/presupuesto",
    "/contacto",
    "/sobre-nosotros",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productos = getAllProductos().map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categorias = getCategorias().map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const proyectos = PROJECT_TYPES.map((t) => ({
    url: `${base}/proyectos/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blog = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...estaticas, ...categorias, ...proyectos, ...blog, ...productos];
}
