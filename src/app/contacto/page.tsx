import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/conversion/ContactForm";
import { ReviewsBadge } from "@/components/conversion/ReviewsBadge";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { SITE, waLink, WA_DEFAULT } from "@/lib/site";
import { pageMeta, breadcrumbSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contacto · maquinaria de gimnasio en Puente Genil, Córdoba",
  description:
    "Habla con World Fitness Club: teléfono, WhatsApp, email y showroom en Puente Genil, Córdoba. Atendemos a toda Andalucía y España.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <SchemaMarkup
        schema={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Contacto", url: "/contacto" },
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Contacto", url: "/contacto" },
        ]}
        eyebrow="Hablemos de tu proyecto"
        title="Contacto"
        intro="Estamos en Puente Genil, en el centro de Andalucía. Escríbenos, llámanos o ven a vernos al showroom."
      />

      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href={`tel:${SITE.phoneRaw}`} variant="dark" size="lg" className="w-full">
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </Button>
            <Button href={waLink(WA_DEFAULT)} variant="energy" size="lg" className="w-full">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
          </div>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            <Row icon={<MapPin className="h-4 w-4 text-energy" />} label="Dirección">
              {SITE.address.street}, {SITE.address.postalCode} {SITE.address.city}, {SITE.address.province}
            </Row>
            <Row icon={<Mail className="h-4 w-4 text-energy" />} label="Email">
              <a href={`mailto:${SITE.email}`} className="hover:text-energy-deep">{SITE.email}</a>
            </Row>
            <Row icon={<Clock className="h-4 w-4 text-energy" />} label="Horarios">
              {SITE.hours}
            </Row>
          </dl>

          <ReviewsBadge className="mt-8" />

          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-carbon">
            <iframe
              title="Ubicación World Fitness Club"
              src={`https://www.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&z=13&output=embed`}
              className="h-[300px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl text-carbon">Escríbenos</h2>
          <p className="mt-2 text-ink-600">
            Si es un proyecto de equipamiento,{" "}
            <a href="/presupuesto" className="text-energy-deep underline underline-offset-4">
              pide presupuesto
            </a>{" "}
            y te respondemos con una propuesta concreta.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-4">
      <span className="mt-0.5">{icon}</span>
      <div>
        <dt className="label-mono text-ink-400">{label}</dt>
        <dd className="mt-1 text-carbon">{children}</dd>
      </div>
    </div>
  );
}
