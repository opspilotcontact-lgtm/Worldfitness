import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, MapPin, Phone, Star, Truck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { PresupuestoFormShort } from "@/components/conversion/PresupuestoFormShort";
import { AddToCart } from "@/components/cart/AddToCart";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { getAllProductos, getProducto, getSimilares } from "@/lib/productos";
import { SITE, waLink } from "@/lib/site";
import { pageMeta, productSchema, breadcrumbSchema } from "@/lib/seo";
import { CENTER_LABELS } from "@/lib/labels";

export const revalidate = 86400; // ISR: 24 h

export function generateStaticParams() {
  return getAllProductos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProducto(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.nombre} — ${p.precio_formato}`,
    description: `${p.descripcion_corta} Pruébala en el showroom de Puente Genil antes de comprar. Envío a toda España.`,
    path: `/producto/${slug}`,
  });
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProducto(slug);
  if (!p) notFound();
  const similares = getSimilares(p, 4);
  const parrafos = p.descripcion_larga.split("\n\n");

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Catálogo", url: "/catalogo" },
    { name: p.categoria, url: `/categoria/${p.categoria_slug}` },
    { name: p.nombre, url: `/producto/${slug}` },
  ];

  const waMsg = `Hola, me interesa la ${p.nombre} (${p.precio_formato}). Me gustaría probarla en el showroom y que me asesoréis si encaja en mi proyecto.`;

  return (
    <>
      <SchemaMarkup schema={[productSchema(p), breadcrumbSchema(crumbs)]} />

      <Container className="pt-8">
        <Breadcrumbs items={crumbs} />
      </Container>

      <Container className="grid gap-10 py-8 lg:grid-cols-[1fr_1fr] lg:py-12">
        {/* Galería */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-carbon bg-bone p-8">
            {(p.imagen_cutout ?? p.imagen_local) && (
              <Image
                src={(p.imagen_cutout ?? p.imagen_local) as string}
                alt={p.nombre}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            )}
            <span className="label-mono absolute left-0 top-0 bg-carbon px-3 py-2 text-bone">
              {p.categoria}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex flex-wrap gap-2">
            {p.encaja_para.slice(0, 3).map((t) => (
              <span
                key={t}
                className="hairline rounded-[var(--radius-card)] px-2.5 py-1 text-xs font-medium text-ink-600"
              >
                Para {CENTER_LABELS[t]}
              </span>
            ))}
          </div>

          <h1 className="font-display mt-4 text-4xl text-carbon sm:text-5xl">
            {p.nombre}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-energy text-energy" />
              ))}
            </span>
            <span className="text-sm text-ink-600">
              {SITE.reviews.count} reseñas a {SITE.reviews.rating}★ en Google
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3 border-y border-line py-5">
            <span className="spec-mono text-4xl font-semibold text-carbon">
              {p.precio_formato}
            </span>
            <span className="text-sm text-ink-600">IVA incluido</span>
          </div>

          <p className="mt-5 text-lg text-ink-900">{p.descripcion_corta}</p>

          {/* Añadir al carrito con cantidad */}
          <div className="mt-6">
            <AddToCart
              producto={{
                slug: p.slug,
                nombre: p.nombre,
                precio: p.precio,
                precio_formato: p.precio_formato,
                imagen: p.imagen_cutout ?? p.imagen_local,
              }}
              variant="full"
            />
            <p className="mt-2 text-xs text-ink-400">
              Añádela a tu solicitud y pídenos presupuesto por WhatsApp o email —sin
              pasarela de pago, sin compromiso.
            </p>
          </div>

          {/* Bloque conversión */}
          <div className="mt-6 hairline rounded-[var(--radius-card)] bg-bone-dim/50 p-5">
            <h2 className="font-bold text-carbon">¿Te encaja esta máquina?</h2>
            <p className="mt-1 text-sm text-ink-600">
              Pide presupuesto y te decimos en menos de 4 h si es la adecuada para tu
              proyecto —o cuál te conviene más.
            </p>
            <div className="mt-4">
              <PresupuestoFormShort productoNombre={p.nombre} productoSlug={p.slug} />
            </div>
            <div className="mt-4 grid gap-2 border-t border-line pt-4 sm:grid-cols-2">
              <Button href={waLink(waMsg)} variant="outline" size="sm">
                <MapPin className="h-4 w-4" /> Probar en el showroom
              </Button>
              <Button href={`tel:${SITE.phoneRaw}`} variant="ghost" size="sm">
                <Phone className="h-4 w-4" /> Hablar con un asesor
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Descripción + Specs */}
      <Container className="grid gap-10 py-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="prose-wfc">
          <h2 className="font-display text-3xl text-carbon">Sobre esta máquina</h2>
          {parrafos.map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </div>

        <div>
          <h2 className="label-mono text-ink-400">Ficha técnica</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            <SpecRow label="Categoría" value={p.categoria} />
            <SpecRow label="Peso estructural" value={p.peso_kg ? `${p.peso_kg} kg` : "Consultar"} />
            <SpecRow label="Dimensiones" value={p.dimensiones ?? "Consultar"} />
            <SpecRow label="Sistema de carga" value={p.carga.replace(/\.$/, "")} />
            <SpecRow label="Uso" value="Comercial intensivo" />
            <SpecRow label="Precio" value={`${p.precio_formato} · IVA incl.`} />
          </dl>
          <p className="mt-4 text-xs text-ink-400">
            Specs extraídas de la ficha original. Confirmamos medidas exactas antes de
            planificar tu sala.
          </p>
        </div>
      </Container>

      {/* Por qué comprarla aquí */}
      <section className="border-y border-line bg-bone-dim/40">
        <Container className="py-14">
          <h2 className="font-display text-3xl text-carbon">
            Por qué comprarla en World Fitness Club
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <WhyTile icon={<MapPin className="h-5 w-5" />} title="Pruébala antes" text="Showroom de 800 m² en Puente Genil. Súbete y comprueba el recorrido antes de invertir." />
            <WhyTile icon={<Star className="h-5 w-5" />} title="138 reseñas 5★" text="Ocho años de trato presencial reconocido en la zona. La prueba social está." />
            <WhyTile icon={<Check className="h-5 w-5" />} title="Asesoramiento real" text="Te decimos qué encaja según tu sala y tu público. Sin venderte de más." />
            <WhyTile icon={<Truck className="h-5 w-5" />} title="Instalación incluida" text="En Andalucía con técnico propio. Coordinamos transporte y montaje." />
          </div>
        </Container>
      </section>

      {/* Similares */}
      {similares.length > 0 && (
        <Container className="py-14">
          <h2 className="font-display text-3xl text-carbon">Máquinas similares</h2>
          <div className="mt-8">
            <ProductGrid productos={similares} />
          </div>
        </Container>
      )}

      <Container className="pb-20">
        <ShowroomCTA />
      </Container>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <dt className="text-sm text-ink-600">{label}</dt>
      <dd className="spec-mono text-right text-sm font-medium text-carbon">{value}</dd>
    </div>
  );
}

function WhyTile({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-bone p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-card)] bg-carbon text-energy">
        {icon}
      </span>
      <h3 className="mt-3 font-bold text-carbon">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-600">{text}</p>
    </div>
  );
}
