import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewsBadge } from "@/components/conversion/ReviewsBadge";
import { FeaturedCategories } from "@/components/marketing/FeaturedCategories";
import { ProjectTypeCards } from "@/components/marketing/ProjectTypeCards";
import { TestimonialsGrid } from "@/components/marketing/TestimonialsGrid";
import { FaqList } from "@/components/conversion/FaqList";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { getProducto } from "@/lib/productos";
import { SITE, waLink, HERO_MACHINES } from "@/lib/site";
import { COMO_TRABAJAMOS, FAQS_HOME } from "@/lib/content";
import { faqSchema } from "@/lib/seo";

export default function Home() {
  // Máquinas curadas para el hero (diversas, sin repetir las del showcase).
  const heroImgs = HERO_MACHINES.map((slug) => getProducto(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p?.imagen_cutout)
  );

  return (
    <>
      <SchemaMarkup schema={faqSchema(FAQS_HOME)} />

      {/* ===== HERO ===== */}
      <section className="border-b border-line bg-bone">
        <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="rise">
            <span className="label-mono text-energy-deep">
              Maquinaria profesional · Showroom {SITE.showroomM2} m² · {SITE.address.city}, {SITE.address.province}
            </span>
            <h1 className="font-display mt-5 text-[clamp(2.8rem,7vw,5.5rem)] text-carbon">
              Equipa tu gimnasio con maquinaria{" "}
              <span className="text-energy">que ya está probada.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-600">
              Más de 160 máquinas profesionales que puedes ver, tocar y probar en
              nuestro showroom de Andalucía antes de comprar. Atendemos a gimnasios,
              hoteles, fisioterapias y centros deportivos en toda España.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/showroom" variant="energy" size="lg">
                Visitar showroom <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/presupuesto" variant="outline" size="lg">
                Pedir presupuesto
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="spec-mono flex items-center gap-2 text-sm font-medium text-carbon hover:text-energy-deep"
              >
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
              <a
                href={waLink("Hola, estoy planteando equipar un centro y me gustaría que me asesoréis.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-pro underline underline-offset-4 hover:text-pro-light"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Composición de producto: máquinas flotando (sin caja), palabra fantasma */}
          <div className="relative hidden h-[32rem] lg:block">
            <span className="ghost-word absolute right-0 top-2 text-[11rem] text-carbon/[0.06]" aria-hidden>
              PRO
            </span>
            {heroImgs[1] && (
              <Image
                src={heroImgs[1].imagen_cutout ?? ""}
                alt={heroImgs[1].nombre}
                width={360}
                height={360}
                priority
                className="absolute right-2 top-6 z-10 w-[58%] object-contain"
              />
            )}
            {heroImgs[0] && (
              <Image
                src={heroImgs[0].imagen_cutout ?? ""}
                alt={heroImgs[0].nombre}
                width={420}
                height={420}
                priority
                className="absolute -left-4 bottom-4 z-20 w-[62%] object-contain drop-shadow-[0_24px_30px_rgba(10,10,10,0.12)]"
              />
            )}
            <div className="absolute bottom-0 right-2 z-30">
              <ReviewsBadge />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== RESEÑAS ===== */}
      <section className="border-y border-line bg-bone">
        <Container className="py-16 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={`${SITE.reviews.count} reseñas · ${SITE.reviews.rating.toFixed(1)} de 5 en Google`}
              title="138 dueños de gimnasios ya nos han elegido."
              intro="Trato presencial reconocido en la zona durante 8 años. Esto no lo dice un eslogan: lo dicen quienes ya equiparon su centro con nosotros."
            />
            <Button href={SITE.reviews.url} variant="dark" size="md">
              Ver las {SITE.reviews.count} reseñas en Google
            </Button>
          </div>
          <div className="mt-12">
            <TestimonialsGrid limit={3} />
          </div>
        </Container>
      </section>

      {/* ===== TIPOS DE CENTRO ===== */}
      <section className="bg-carbon">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            tone="dark"
            eyebrow="Equipa tu tipo de centro"
            title="Cada proyecto necesita otra sala."
            intro="No es lo mismo equipar un gimnasio comercial que un gimnasio de hotel o una fisioterapia. Elige tu caso y te mostramos la propuesta pensada para él."
          />
          <div className="mt-12">
            <ProjectTypeCards />
          </div>
        </Container>
      </section>

      {/* ===== EXPLORA POR CATEGORÍA (showcase editorial) ===== */}
      <section className="bg-bone">
        <Container className="pt-16 sm:pt-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catálogo"
              title="Explora por categoría"
              intro="Más de 160 máquinas de uso comercial. Cada una se puede ver, tocar y probar en el showroom antes de comprar."
            />
            <Button href="/catalogo" variant="outline" size="md">
              Ver catálogo completo <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
        <div className="mt-10">
          <FeaturedCategories limit={4} />
        </div>
      </section>

      {/* ===== CÓMO TRABAJAMOS ===== */}
      <section className="border-y border-line bg-bone-dim/40">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="El activo que nadie más tiene en Andalucía · Showroom 800 m²"
            title="Del primer mensaje a la sala montada"
            intro="Nuestro showroom de 800 m² en Puente Genil es lo que nos diferencia: pruebas las máquinas antes de invertir, sin catálogos a ciegas. Así trabajamos, de principio a fin."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {COMO_TRABAJAMOS.map((step) => (
              <div key={step.n} className="bg-bone p-7">
                <span className="spec-mono text-sm text-energy-deep">{step.n}</span>
                <h3 className="mt-3 text-lg font-bold text-carbon">{step.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-bone">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Dudas frecuentes" title="Lo que preguntan antes de comprar" />
            <ul className="mt-6 space-y-2.5">
              {["Envío a toda España", "Financiación a medida", "Garantía por escrito", "Montaje con técnico propio"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-ink-900">
                    <Check className="h-4 w-4 text-pro" /> {item}
                  </li>
                )
              )}
            </ul>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-energy-deep underline underline-offset-4"
            >
              ¿Tu duda no está? Escríbenos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FaqList faqs={FAQS_HOME} />
        </Container>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="bg-bone pb-20">
        <Container>
          <ShowroomCTA />
        </Container>
      </section>
    </>
  );
}
