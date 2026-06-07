import type { Metadata } from "next";
import { Clock, ShieldCheck, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PresupuestoWizard } from "@/components/conversion/PresupuestoWizard";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Pedir presupuesto de maquinaria de gimnasio",
  description:
    "Cuéntanos tu proyecto en 2 minutos y te preparamos un presupuesto a medida en menos de 4 h. Sin llamadas en frío: primero entendemos qué necesitas de verdad.",
  path: "/presupuesto",
});

export default function PresupuestoPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Presupuesto", url: "/presupuesto" },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Presupuesto", url: "/presupuesto" },
        ]}
        eyebrow="2 minutos · sin compromiso"
        title="Cuéntanos tu proyecto y te asesoramos"
        intro="No es un formulario de captación: es la forma de que te respondamos con una propuesta que de verdad encaje. Cuanto mejor entendamos tu sala, mejor te orientamos."
      />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_340px]">
        <PresupuestoWizard />

        <aside className="space-y-5 lg:pt-2">
          <Promesa icon={<Clock className="h-5 w-5" />} title="Respuesta en menos de 4 h" text="En horario comercial. No te dejamos esperando días." />
          <Promesa icon={<MessageSquare className="h-5 w-5" />} title="Cero llamadas en frío" text="Primero entendemos tu proyecto. Después hablamos, si quieres." />
          <Promesa icon={<ShieldCheck className="h-5 w-5" />} title="Te decimos qué te sobra" text="Si no necesitas tantas máquinas, te lo decimos. Preferimos que vuelvas." />
        </aside>
      </Container>
    </>
  );
}

function Promesa({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="hairline rounded-[var(--radius-card)] bg-bone p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-card)] bg-carbon text-energy">
        {icon}
      </span>
      <h3 className="mt-3 font-bold text-carbon">{title}</h3>
      <p className="mt-1 text-sm text-ink-600">{text}</p>
    </div>
  );
}
