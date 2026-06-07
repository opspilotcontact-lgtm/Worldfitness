import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { Button } from "@/components/ui/Button";
import {
  getCategoria,
  getCategorias,
  getProductosByCategoria,
} from "@/lib/productos";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return getCategorias().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoria(slug);
  if (!cat) return {};
  return pageMeta({
    title: `Maquinaria de ${cat.nombre.toLowerCase()} profesional en Andalucía`,
    description: `${cat.count} máquinas de ${cat.nombre.toLowerCase()} para gimnasios, hoteles y centros deportivos. Showroom en Puente Genil, Córdoba. Pruébalas antes de comprar.`,
    path: `/categoria/${slug}`,
  });
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoria(slug);
  if (!cat) notFound();
  const productos = getProductosByCategoria(slug);

  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
          { name: cat.nombre, url: `/categoria/${slug}` },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
          { name: cat.nombre, url: `/categoria/${slug}` },
        ]}
        eyebrow={`${cat.count} máquinas · ${cat.nombre}`}
        title={`Maquinaria de ${cat.nombre.toLowerCase()}`}
        intro={`Equipos de ${cat.nombre.toLowerCase()} de uso comercial para gimnasios, hoteles, fisioterapias y centros deportivos en Córdoba, Andalucía y toda España.`}
      />
      <Container className="py-12 sm:py-16">
        <ProductGrid productos={productos} priorityCount={4} />
      </Container>

      <Container className="pb-16">
        <div className="hairline rounded-[var(--radius-card)] bg-bone-dim/50 p-8">
          <h2 className="font-display text-2xl text-carbon">
            ¿Para qué tipo de centro encaja esta maquinaria?
          </h2>
          <p className="mt-3 max-w-2xl text-ink-600">
            La elección depende de tu sala, tu público y tu presupuesto. Te decimos
            qué necesitas de verdad y qué te sobra —sin venderte de más.
          </p>
          <Button href="/presupuesto" variant="energy" size="md" className="mt-5">
            Pedir asesoramiento
          </Button>
        </div>
      </Container>

      <Container className="pb-20">
        <ShowroomCTA />
      </Container>
    </>
  );
}
