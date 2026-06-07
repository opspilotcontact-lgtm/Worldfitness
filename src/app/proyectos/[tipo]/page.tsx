import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { PROJECT_TYPES, getProjectType } from "@/lib/site";
import { getRecomendadosParaTipo } from "@/lib/productos";
import { CASOS_EXITO } from "@/lib/content";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import type { CentroTipo } from "@/types";

export function generateStaticParams() {
  return PROJECT_TYPES.map((t) => ({ tipo: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tipo: string }>;
}): Promise<Metadata> {
  const { tipo } = await params;
  const t = getProjectType(tipo);
  if (!t) return {};
  return pageMeta({
    title: `Equipamiento para ${t.nombre.toLowerCase()}`,
    description: `Maquinaria profesional para ${t.nombre.toLowerCase()}: ${t.maquinas}, sala de ${t.sala}. Inversión orientativa ${t.inversion}. Pruébalas en showroom en Córdoba.`,
    path: `/proyectos/${tipo}`,
  });
}

export default async function ProyectoTipoPage({
  params,
}: {
  params: Promise<{ tipo: string }>;
}) {
  const { tipo } = await params;
  const t = getProjectType(tipo);
  if (!t) notFound();
  const recomendados = getRecomendadosParaTipo(tipo as CentroTipo, 12);
  const casos = CASOS_EXITO[tipo] ?? [];

  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
          { name: t.nombre, url: `/proyectos/${tipo}` },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Proyectos", url: "/proyectos" },
          { name: t.nombre, url: `/proyectos/${tipo}` },
        ]}
        eyebrow="Equipamiento por proyecto"
        title={`Equipamiento para ${t.nombre.toLowerCase()}`}
        intro={t.perfil}
      >
        <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          <Stat label="Máquinas" value={t.maquinas} />
          <Stat label="Tamaño de sala" value={t.sala} />
          <Stat label="Inversión orientativa" value={t.inversion} highlight />
        </div>
      </PageHero>

      <Container className="py-14">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selección recomendada"
            title={`Máquinas que encajan en ${t.nombre.toLowerCase()}`}
            intro="Una preselección pensada para este tipo de centro. La afinamos contigo según tu sala y tu público."
          />
          <Button href="/presupuesto" variant="energy" size="md">
            Pide propuesta personalizada <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-10">
          <ProductGrid productos={recomendados} priorityCount={4} />
        </div>
      </Container>

      {casos.length > 0 && (
        <section className="border-y border-line bg-bone-dim/40">
          <Container className="py-14">
            <SectionHeading eyebrow="Casos de éxito" title={`${t.nombre} que ya equipamos`} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {casos.map((c) => (
                <div key={c.centro} className="hairline rounded-[var(--radius-card)] bg-bone p-6">
                  <Building2 className="h-5 w-5 text-energy" />
                  <h3 className="mt-3 font-bold text-carbon">{c.centro}</h3>
                  <p className="spec-mono text-xs text-ink-600">{c.ciudad}</p>
                  <p className="mt-3 text-ink-900">{c.resumen}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <Container className="py-16">
        <ShowroomCTA />
      </Container>
    </>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-bone p-5">
      <p className="label-mono text-ink-400">{label}</p>
      <p className={`spec-mono mt-1.5 text-lg font-semibold ${highlight ? "text-energy-deep" : "text-carbon"}`}>
        {value}
      </p>
    </div>
  );
}
