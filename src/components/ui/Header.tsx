"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown, ArrowRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE, PROJECT_TYPES } from "@/lib/site";
import { categoryIcon, sectorIcon } from "@/lib/icons";
import { trackEvent } from "@/lib/analytics";
import { clsx } from "@/lib/clsx";
import type { Categoria } from "@/types";

const DIRECT_LINKS = [
  { href: "/showroom", label: "Showroom" },
  { href: "/blog", label: "Guías" },
  { href: "/sobre-nosotros", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

type OpenMenu = "catalogo" | "sectores" | null;

export function Header({ categorias }: { categorias: Categoria[] }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<OpenMenu>(null);
  const [mobileGroup, setMobileGroup] = useState<OpenMenu>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hover-intent: cancelar cierre al entrar (trigger o panel), cerrar con retardo
  // al salir. Así el desplegable NO desaparece al cruzar del menú al panel.
  const openMega = (menu: OpenMenu) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(menu);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 160);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-line bg-bone/95 backdrop-blur"
      onMouseLeave={scheduleClose}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none tracking-tight">World Fitness Club</span>
          <span className="hidden h-2 w-2 rounded-full bg-energy sm:block" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <MegaTrigger label="Catálogo" active={mega === "catalogo"} onEnter={() => openMega("catalogo")} />
          <MegaTrigger label="Sectores" active={mega === "sectores"} onEnter={() => openMega("sectores")} />
          {DIRECT_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => openMega(null)}
              className="rounded-[var(--radius-card)] px-3 py-2 text-sm font-medium text-ink-600 transition hover:text-carbon"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phoneRaw}`}
            onClick={() => trackEvent("phone_click", { source: "header" })}
            className="spec-mono flex items-center gap-1.5 text-sm text-carbon hover:text-energy-deep"
          >
            <Phone className="h-3.5 w-3.5" /> {SITE.phoneDisplay}
          </a>
          <Button href="/presupuesto" variant="energy" size="sm">Pedir presupuesto</Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Abrir menú">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Panel mega-menú (desktop) */}
      {mega && (
        <div
          className="absolute inset-x-0 top-16 hidden border-b border-line bg-bone shadow-[0_24px_48px_-24px_rgba(10,10,10,0.4)] lg:block"
          onMouseEnter={() => openMega(mega)}
          onMouseLeave={scheduleClose}
        >
          <Container className="py-7">
            {mega === "catalogo" ? (
              <div className="grid grid-cols-[1fr_300px] gap-8">
                <div className="grid grid-cols-2 gap-2">
                  {categorias.map((c) => (
                    <MegaItem
                      key={c.slug}
                      href={`/categoria/${c.slug}`}
                      Icon={categoryIcon(c.slug)}
                      title={c.nombre}
                      meta={`${c.count} máquinas`}
                      onClick={() => setMega(null)}
                    />
                  ))}
                </div>
                <MegaPromo
                  ghost="160+"
                  title="Catálogo completo"
                  text={`${SITE.catalogCount} máquinas con precio y ficha técnica.`}
                  href="/catalogo"
                  cta="Ver todo el catálogo"
                  onClick={() => setMega(null)}
                />
              </div>
            ) : (
              <div className="grid grid-cols-[1fr_300px] gap-8">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PROJECT_TYPES.map((t) => (
                    <MegaItem
                      key={t.slug}
                      href={`/proyectos/${t.slug}`}
                      Icon={sectorIcon(t.slug)}
                      title={t.nombre}
                      meta={t.short}
                      onClick={() => setMega(null)}
                    />
                  ))}
                </div>
                <MegaPromo
                  ghost="800m²"
                  title="¿No sabes cuál es tu caso?"
                  text="Te asesoramos según tu sala, tu público y tu presupuesto."
                  href="/presupuesto"
                  cta="Pedir asesoramiento"
                  onClick={() => setMega(null)}
                />
              </div>
            )}
          </Container>
        </div>
      )}

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-line bg-bone lg:hidden">
          <Container className="flex flex-col py-3">
            <MobileGroup label="Catálogo" isOpen={mobileGroup === "catalogo"} onToggle={() => setMobileGroup((g) => (g === "catalogo" ? null : "catalogo"))}>
              {categorias.map((c) => (
                <MobileSub key={c.slug} href={`/categoria/${c.slug}`} Icon={categoryIcon(c.slug)} onClick={() => setOpen(false)}>
                  {c.nombre} <span className="text-ink-400">({c.count})</span>
                </MobileSub>
              ))}
              <MobileSub href="/catalogo" onClick={() => setOpen(false)}>Ver catálogo completo →</MobileSub>
            </MobileGroup>

            <MobileGroup label="Sectores" isOpen={mobileGroup === "sectores"} onToggle={() => setMobileGroup((g) => (g === "sectores" ? null : "sectores"))}>
              {PROJECT_TYPES.map((t) => (
                <MobileSub key={t.slug} href={`/proyectos/${t.slug}`} Icon={sectorIcon(t.slug)} onClick={() => setOpen(false)}>
                  {t.nombre}
                </MobileSub>
              ))}
            </MobileGroup>

            {DIRECT_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="border-b border-line/60 py-3 text-base font-medium text-carbon">
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <Button href="/presupuesto" variant="energy" size="md">Pedir presupuesto</Button>
              <a href={`tel:${SITE.phoneRaw}`} className="spec-mono flex items-center justify-center gap-2 py-2 text-carbon">
                <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}

function MegaTrigger({ label, active, onEnter }: { label: string; active: boolean; onEnter: () => void }) {
  return (
    <button
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={clsx(
        "flex items-center gap-1 rounded-[var(--radius-card)] px-3 py-2 text-sm font-medium transition",
        active ? "text-carbon" : "text-ink-600 hover:text-carbon"
      )}
    >
      {label}
      <ChevronDown className={clsx("h-3.5 w-3.5 transition", active && "rotate-180")} />
    </button>
  );
}

function MegaItem({ href, Icon, title, meta, onClick }: { href: string; Icon: LucideIcon; title: string; meta: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-[var(--radius-card)] border border-transparent p-3 transition hover:border-line hover:bg-bone-dim/50"
    >
      <Icon
        className="h-[22px] w-[22px] shrink-0 text-carbon transition group-hover:text-energy-deep"
        strokeWidth={1.5}
      />
      <span className="flex flex-col">
        <span className="font-semibold leading-tight text-carbon group-hover:text-energy-deep">{title}</span>
        <span className="spec-mono text-xs text-ink-400">{meta}</span>
      </span>
    </Link>
  );
}

function MegaPromo({ ghost, title, text, href, cta, onClick }: { ghost: string; title: string; text: string; href: string; cta: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-carbon p-6 text-bone"
    >
      <span className="font-display pointer-events-none absolute -right-3 -top-4 text-7xl leading-none text-bone/5">{ghost}</span>
      <div className="relative">
        <h3 className="font-display text-xl">{title}</h3>
        <p className="mt-2 text-sm text-bone/60">{text}</p>
      </div>
      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-energy transition group-hover:gap-2.5">
        {cta} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

function MobileGroup({ label, isOpen, onToggle, children }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-line/60">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-3 text-base font-medium text-carbon">
        {label}
        <ChevronDown className={clsx("h-4 w-4 transition", isOpen && "rotate-180")} />
      </button>
      {isOpen && <div className="flex flex-col gap-1 pb-3">{children}</div>}
    </div>
  );
}

function MobileSub({ href, Icon, onClick, children }: { href: string; Icon?: LucideIcon; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-2.5 py-2 pl-1 text-sm text-ink-600">
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0 text-carbon" strokeWidth={1.5} />}
      <span>{children}</span>
    </Link>
  );
}
