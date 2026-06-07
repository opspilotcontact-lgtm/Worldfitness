import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectTypeCards } from "@/components/marketing/ProjectTypeCards";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Equipamiento por tipo de centro: gimnasio, hotel, fisioterapia",
  description:
    "Propuestas de equipamiento según tu proyecto: gimnasio comercial, gimnasio de hotel, fisioterapia, estudio personal o home gym. Inversión orientativa y máquinas recomendadas.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
        ]}
        eyebrow="Equipa tu tipo de centro"
        title="Cada proyecto necesita otra sala"
        intro="Un gimnasio comercial no se equipa igual que el gym de un hotel o una fisioterapia. Elige tu caso y te mostramos qué máquinas recomendamos y qué inversión orientativa supone."
      />
      <Container className="py-14">
        <ProjectTypeCards />
      </Container>
      <Container className="pb-20">
        <ShowroomCTA />
      </Container>
    </>
  );
}
