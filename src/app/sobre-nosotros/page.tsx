import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Mail, Phone, Award } from "lucide-react";
import { asset } from "@/lib/asset";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { ReviewsBadge } from "@/components/conversion/ReviewsBadge";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SITE } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Sobre World Fitness Club · 8 años equipando gimnasios en Andalucía",
  description:
    "Quiénes somos: 8 años distribuyendo maquinaria profesional de gimnasio desde Puente Genil, Córdoba, con showroom de 800 m² y 138 reseñas a 5★ en Google.",
  path: "/sobre-nosotros",
});

const VALORES = [
  {
    titulo: "Vender menos, asesorar más",
    texto:
      "Preferimos recomendarte tres máquinas que vas a usar antes que venderte diez que se van a llenar de polvo. El negocio a largo plazo se construye así.",
  },
  {
    titulo: "Lo que se ve, se prueba",
    texto:
      "No creemos en comprar maquinaria pesada por catálogo. Por eso mantenemos un showroom físico de 800 m²: para que toques antes de decidir.",
  },
  {
    titulo: "Damos la cara",
    texto:
      "Instalamos nosotros, respondemos nosotros y si algo falla, estamos. En este sector eso no es lo normal, y es justo lo que nos diferencia.",
  },
];

const STATS = [
  { n: `${SITE.yearsActive}`, label: "años de trayectoria" },
  { n: `${SITE.showroomM2} m²`, label: "de showroom físico" },
  { n: `${SITE.catalogCount}+`, label: "máquinas en catálogo" },
  { n: `${SITE.reviews.count}`, label: "reseñas a 5★ en Google" },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Empresa", url: "/sobre-nosotros" },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Empresa", url: "/sobre-nosotros" },
        ]}
        eyebrow={`El proveedor nº1 · ${SITE.address.city}, ${SITE.address.province}`}
        title="8 años equipando gimnasios de Andalucía"
        intro="World Fitness Club nació de una idea simple: que comprar maquinaria de gimnasio no debería ser un salto al vacío."
      />

      {/* Imagen de ambiente real */}
      <Container className="pt-10">
        <figure className="relative overflow-hidden rounded-[var(--radius-card)] border border-carbon">
          <Image
            src={asset("/empresa/showroom-1.jpg")}
            alt="Maquinaria profesional de gimnasio de World Fitness Club"
            width={1199}
            height={799}
            priority
            className="h-[clamp(220px,42vw,480px)] w-full object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 flex items-center gap-2 bg-carbon/85 px-4 py-2 text-sm text-bone backdrop-blur">
            <MapPin className="h-4 w-4 text-energy" /> Maquinaria de uso comercial ·{" "}
            {SITE.address.city}, {SITE.address.province}
          </figcaption>
        </figure>
      </Container>

      {/* Stats */}
      <Container className="py-12">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-bone p-7 text-center">
              <p className="font-display text-5xl text-energy">{s.n}</p>
              <p className="mt-2 text-sm text-ink-600">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Historia + aside con marca, foto y datos */}
      <Container className="py-10">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="prose-wfc max-w-none">
            <h2 className="font-display text-3xl text-carbon">Cómo empezó</h2>
            <p>
              Miguel Franco lleva más de ocho años en un sector donde casi todo se vende
              por foto. Vio que los dueños de gimnasio invertían miles de euros en
              máquinas que nunca habían tocado, guiándose solo por un PDF y un precio. Y
              que demasiadas veces se llevaban un disgusto: una máquina que no encajaba
              en la sala, un recorrido incómodo, una estructura que no aguantaba el ritmo.
            </p>
            <p>
              La respuesta fue montar en Puente Genil un espacio físico de exposición
              —algo poco habitual en toda Andalucía— en la Calle Maestro Francisco Vila.
              Un sitio donde el comprador profesional puede subirse a las máquinas,
              comparar y decidir con criterio antes de gastar.
            </p>
            <h2 className="font-display text-3xl text-carbon">Cómo trabajamos hoy</h2>
            <p>
              Hoy World Fitness Club es el proveedor de referencia de maquinaria de
              gimnasio profesional en la zona: carga de discos, selectorizada, peso libre
              y funcional para gimnasios comerciales, hoteles, fisioterapias, estudios de
              entrenamiento personal y particulares de toda España, con instalación
              propia en Andalucía.
            </p>
            <p>
              El trato presencial y honesto es lo que nos ha dado 138 reseñas a 5
              estrellas en Google a lo largo de estos años. No somos los más baratos y no
              pretendemos serlo: somos los que te dicen qué necesitas de verdad, los que
              te dejan probarlo y los que dan la cara cuando la máquina ya está en tu
              sala.
            </p>
          </div>

          <aside className="space-y-6 lg:pt-2">
            {/* Marca */}
            <div className="flex items-center gap-4 hairline rounded-[var(--radius-card)] bg-bone-dim/50 p-5">
              <Image
                src={asset("/empresa/logo-wfc.png")}
                alt="Logo de World Fitness Club"
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 object-contain"
              />
              <p className="flex items-center gap-2 text-sm font-medium text-carbon">
                <Award className="h-4 w-4 shrink-0 text-energy" />
                El proveedor nº1 de máquinas de gimnasio profesionales.
              </p>
            </div>

            {/* Foto de ambiente */}
            <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line">
              <Image
                src={asset("/empresa/showroom-2.jpg")}
                alt="Zona de entrenamiento equipada por World Fitness Club"
                width={1700}
                height={700}
                className="h-48 w-full object-cover"
              />
            </figure>

            {/* Datos de empresa reales */}
            <div className="hairline rounded-[var(--radius-card)] bg-bone p-5">
              <h3 className="label-mono text-ink-400">Datos de la empresa</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li className="flex items-start gap-2 text-carbon">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-energy" />
                  {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city},{" "}
                  {SITE.address.province}
                </li>
                <li>
                  <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-2 text-carbon hover:text-energy-deep">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-energy" /> {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-start gap-2 text-carbon hover:text-energy-deep">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-energy" /> {SITE.email}
                  </a>
                </li>
              </ul>
            </div>

            <ReviewsBadge className="w-full justify-center" />
          </aside>
        </div>
      </Container>

      {/* Valores */}
      <section className="border-y border-line bg-bone-dim/40">
        <Container className="py-14">
          <SectionHeading eyebrow="En qué creemos" title="Tres cosas que no negociamos" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
            {VALORES.map((v, i) => (
              <div key={v.titulo} className="bg-bone p-7">
                <span className="font-display text-4xl text-energy">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-carbon">{v.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{v.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <ShowroomCTA />
      </Container>
    </>
  );
}
