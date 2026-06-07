import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ReviewsBadge } from "@/components/conversion/ReviewsBadge";
import { SITE } from "@/lib/site";
import { PROJECT_TYPES } from "@/lib/site";
import { getCategorias } from "@/lib/productos";

export function Footer() {
  const cats = getCategorias().slice(0, 6);
  return (
    <footer className="border-t border-line-dark bg-carbon text-bone">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl">World Fitness Club</span>
          <p className="mt-3 max-w-xs text-sm text-bone/60">
            Maquinaria profesional de gimnasio con showroom físico de{" "}
            {SITE.showroomM2} m² en {SITE.address.city}. {SITE.yearsActive} años
            equipando gimnasios, hoteles y centros deportivos en Andalucía.
          </p>
          <ReviewsBadge tone="dark" className="mt-5" />
        </div>

        <FooterCol title="Catálogo">
          {cats.map((c) => (
            <FooterLink key={c.slug} href={`/categoria/${c.slug}`}>
              {c.nombre}
            </FooterLink>
          ))}
          <FooterLink href="/catalogo">Ver catálogo completo →</FooterLink>
        </FooterCol>

        <FooterCol title="Por tipo de centro">
          {PROJECT_TYPES.map((t) => (
            <FooterLink key={t.slug} href={`/proyectos/${t.slug}`}>
              {t.nombre}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Contacto">
          <ContactLine icon={<MapPin className="h-4 w-4 text-energy" />}>
            {SITE.address.street}, {SITE.address.province}
          </ContactLine>
          <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-2 text-sm text-bone/70 hover:text-bone">
            <Phone className="h-4 w-4 text-energy" /> {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} className="flex items-start gap-2 text-sm text-bone/70 hover:text-bone">
            <Mail className="h-4 w-4 text-energy" /> {SITE.email}
          </a>
          <ContactLine icon={<Clock className="h-4 w-4 text-energy" />}>
            {SITE.hours}
          </ContactLine>
        </FooterCol>
      </Container>

      <div className="border-t border-line-dark">
        <Container className="py-6">
          <p className="label-mono text-bone/40">Equipamos gimnasios en</p>
          <p className="mt-2 text-sm text-bone/60">
            {SITE.servedCities.join(" · ")} y toda Andalucía. Envío a toda España.
          </p>
        </Container>
      </div>

      <div className="border-t border-line-dark">
        <Container className="flex flex-col gap-3 py-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Aviso legal · Política de
            privacidad · Cookies.
          </p>
          <p className="spec-mono">
            Web demostrativa diseñada por OpsPilot — propuesta de mejora para World
            Fitness Club
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label-mono text-bone/40">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-bone/70 transition hover:text-energy">
        {children}
      </Link>
    </li>
  );
}

function ContactLine({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-bone/70">
      {icon}
      <span>{children}</span>
    </li>
  );
}
