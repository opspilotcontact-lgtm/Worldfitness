import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Car, Clock, MapPin, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/conversion/FaqList";
import { TestimonialsGrid } from "@/components/marketing/TestimonialsGrid";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SITE, waLink } from "@/lib/site";
import { FAQS_SHOWROOM } from "@/lib/content";
import { pageMeta, breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Showroom de maquinaria de gimnasio en Puente Genil, Córdoba",
  description:
    "800 m² de showroom para probar maquinaria de gimnasio profesional antes de comprar. En Puente Genil, Córdoba. A 1 h de Málaga y Córdoba, 1h30 de Sevilla. Visita sin compromiso.",
  path: "/showroom",
});

/**
 * Galería del showroom (plug-and-play): si el archivo existe en
 * public/showroom/<file>, se muestra la foto; si no, queda el placeholder.
 * Para rellenar: copiar las fotos del catálogo de WhatsApp con estos nombres.
 */
const GALLERY = [
  { label: "Sala de musculación", file: "sala-musculacion.jpg" },
  { label: "Peso libre y racks", file: "peso-libre.jpg" },
  { label: "Carga de discos", file: "carga-de-discos.jpg" },
  { label: "Vista del showroom", file: "vista-showroom.jpg" },
];

import { asset } from "@/lib/asset";

function galleryTiles() {
  return GALLERY.map((g) => ({
    ...g,
    src: fs.existsSync(path.join(process.cwd(), "public", "showroom", g.file))
      ? asset(`/showroom/${g.file}`)
      : null,
  }));
}

const QUE_LLEVARTE = [
  "Saber qué máquinas encajan de verdad en tu sala y cuáles te sobran",
  "Probar el recorrido y la estabilidad con tu propio peso",
  "Una orientación clara de inversión según tu público objetivo",
  "Respuestas sobre garantía, instalación, transporte y financiación",
];

const COMO_LLEGAR = [
  { desde: "Desde Córdoba capital", tiempo: "≈ 1 h", via: "A-45 dirección Málaga" },
  { desde: "Desde Málaga", tiempo: "≈ 1 h", via: "A-45 dirección Córdoba" },
  { desde: "Desde Sevilla", tiempo: "≈ 1 h 30", via: "A-92 + A-318" },
];

export default function ShowroomPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          localBusinessSchema(),
          faqSchema(FAQS_SHOWROOM),
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Showroom", url: "/showroom" },
          ]),
        ]}
      />

      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Showroom", url: "/showroom" },
        ]}
        eyebrow={`${SITE.showroomM2} m² · ${SITE.address.city}, ${SITE.address.province}`}
        title="Showroom de maquinaria de gimnasio en Puente Genil, Córdoba"
        intro="El único showroom de 800 m² en Andalucía donde puedes probar maquinaria profesional antes de equipar tu centro. Ven, súbete a las máquinas y decide con criterio —sin compromiso."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={waLink("Hola, me gustaría reservar una visita al showroom de Puente Genil.")}
            variant="energy"
            size="lg"
          >
            Reservar visita
          </Button>
          <Button href={`tel:${SITE.phoneRaw}`} variant="outline" size="lg">
            Llamar: {SITE.phoneDisplay}
          </Button>
        </div>
      </PageHero>

      {/* Galería (placeholders) */}
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryTiles().map((tile, i) => (
            <div
              key={tile.label}
              className={`relative flex aspect-square items-end overflow-hidden rounded-[var(--radius-card)] border border-line-dark p-4 ${
                tile.src ? "bg-carbon" : "blueprint bg-carbon"
              }`}
            >
              {tile.src && (
                <Image
                  src={tile.src}
                  alt={`Showroom World Fitness Club — ${tile.label}`}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover"
                />
              )}
              <span className="font-display absolute right-2 top-1 z-10 text-5xl text-bone/5">
                0{i + 1}
              </span>
              <span
                className={`label-mono relative z-10 ${
                  tile.src ? "bg-carbon/80 px-2 py-1 text-bone backdrop-blur" : "text-bone/80"
                }`}
              >
                {tile.label}
              </span>
            </div>
          ))}
        </div>
        {galleryTiles().some((t) => !t.src) && (
          <p className="mt-3 text-xs text-ink-400">
            Para rellenar estas 4 fotos, copia las imágenes del showroom en{" "}
            <code className="spec-mono">public/showroom/</code> con los nombres:
            sala-musculacion.jpg · zona-peso-libre.jpg · cardio.jpg · funcional.jpg
          </p>
        )}
      </Container>

      {/* Cómo llegar + horarios */}
      <section className="border-y border-line bg-bone-dim/40">
        <Container className="grid gap-10 py-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Cómo llegar" title="Bien comunicado en el centro de Andalucía" />
            <div className="mt-6 divide-y divide-line border-y border-line">
              {COMO_LLEGAR.map((r) => (
                <div key={r.desde} className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <Car className="h-4 w-4 text-energy" />
                    <div>
                      <p className="font-medium text-carbon">{r.desde}</p>
                      <p className="text-sm text-ink-600">{r.via}</p>
                    </div>
                  </div>
                  <span className="spec-mono text-sm font-semibold text-carbon">{r.tiempo}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-energy" />
              <div>
                <p className="label-mono text-ink-400">Horarios</p>
                <p className="mt-1 text-carbon">{SITE.hours}</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-energy" />
              <p className="text-carbon">
                {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city},{" "}
                {SITE.address.province}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-carbon">
            <iframe
              title="Ubicación del showroom en Puente Genil"
              src={`https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=13&output=embed`}
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      {/* Qué llevarte */}
      <Container className="py-14">
        <SectionHeading eyebrow="Qué te llevas de la visita" title="No es un paseo: sales con decisiones tomadas" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {QUE_LLEVARTE.map((item) => (
            <li key={item} className="flex items-start gap-3 hairline rounded-[var(--radius-card)] bg-bone p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-pro" />
              <span className="text-ink-900">{item}</span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Testimonios */}
      <section className="border-y border-line bg-bone">
        <Container className="py-14">
          <SectionHeading eyebrow="Quienes ya vinieron" title="Lo que dicen tras visitar el showroom" />
          <div className="mt-8">
            <TestimonialsGrid limit={3} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Container className="py-14">
        <SectionHeading eyebrow="Dudas sobre la visita" title="Antes de venir" className="mb-8" />
        <FaqList faqs={FAQS_SHOWROOM} />
        <div className="mt-10 hairline rounded-[var(--radius-card)] bg-carbon p-8 text-center text-bone">
          <h2 className="font-display text-3xl">¿Reservamos tu visita?</h2>
          <p className="mx-auto mt-3 max-w-lg text-bone/70">
            Dinos qué tipo de centro estás montando y preparamos las máquinas que te
            interesan para cuando vengas.
          </p>
          <Button
            href={waLink("Hola, me gustaría reservar una visita al showroom. Estoy montando un ")}
            variant="energy"
            size="lg"
            className="mt-6"
          >
            Reservar por WhatsApp
          </Button>
        </div>
      </Container>
    </>
  );
}
