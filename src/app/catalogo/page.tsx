import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CatalogClient } from "@/components/product/CatalogClient";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { getAllProductos, getCategorias } from "@/lib/productos";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Catálogo de maquinaria de gimnasio profesional",
  description:
    "Más de 160 máquinas profesionales: carga de discos, musculación, cardio, peso libre y funcional. Filtra por categoría y precio. Envío a toda España desde Córdoba.",
  path: "/catalogo",
});

export default function CatalogoPage() {
  const productos = getAllProductos();
  const categorias = getCategorias();

  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Catálogo", url: "/catalogo" },
        ]}
        eyebrow={`${productos.length} máquinas · envío a toda España`}
        title="Catálogo de maquinaria profesional"
        intro="Todo lo que tenemos, con precio y ficha técnica. Antes de decidir, recuerda que puedes probar cualquiera de estas máquinas en el showroom de Puente Genil."
      />
      <Container className="py-12 sm:py-16">
        <CatalogClient productos={productos} categorias={categorias} />
      </Container>
      <Container className="pb-20">
        <ShowroomCTA />
      </Container>
    </>
  );
}
