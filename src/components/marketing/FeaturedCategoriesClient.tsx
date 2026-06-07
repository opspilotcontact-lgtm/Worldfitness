"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { categoryIcon } from "@/lib/icons";
import { clsx } from "@/lib/clsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface CatHero {
  slug: string;
  nombre: string;
  count: number;
  imagen: string;
  desde: number;
}

/**
 * Temas de panel con colores intensos de marca. El brillo radial (`glow`)
 * mantiene visible la máquina oscura sobre fondos saturados. Los tamaños de
 * imagen varían (desiguales) pero el bloque va centrado (simetría).
 */
const THEMES = [
  { bg: "#ff5722", glow: "rgba(255,255,255,0.32)", ghost: "rgba(10,10,10,0.14)", accent: "#0a0a0a", imgW: "94%", maxW: 560 },
  { bg: "#0a0a0a", glow: "rgba(255,255,255,0.22)", ghost: "rgba(248,245,239,0.07)", accent: "#ff5722", imgW: "82%", maxW: 480 },
  { bg: "#ff5722", glow: "rgba(255,255,255,0.32)", ghost: "rgba(10,10,10,0.14)", accent: "#0a0a0a", imgW: "90%", maxW: 540 },
  { bg: "#0a0a0a", glow: "rgba(255,255,255,0.22)", ghost: "rgba(248,245,239,0.07)", accent: "#ff5722", imgW: "78%", maxW: 470 },
] as const;

export function FeaturedCategoriesClient({ cats }: { cats: CatHero[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Si el usuario pide menos movimiento, dejamos todo visible y estático.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.utils.toArray<HTMLElement>(".fc-row").forEach((row) => {
        const reverse = row.dataset.reverse === "true";
        const block = row.querySelector(".fc-block");
        const img = row.querySelector(".fc-img");
        const ghost = row.querySelector(".fc-ghost");
        const texts = row.querySelectorAll<HTMLElement>(".fc-anim");

        // Reveal de entrada (once: se reproduce una vez y no se queda a medias).
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: "top 82%", once: true } })
          .from(block, { autoAlpha: 0, scale: 0.92, duration: 0.6, ease: "power3.out" })
          .from(
            img,
            { autoAlpha: 0, x: reverse ? -70 : 70, duration: 0.75, ease: "power3.out" },
            "-=0.4"
          )
          .from(
            texts,
            { autoAlpha: 0, y: 24, duration: 0.5, stagger: 0.08, ease: "power2.out" },
            "-=0.55"
          );

        // Parallax sutil del numeral fantasma (independiente del reveal).
        gsap.to(ghost, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Recalcular posiciones cuando las imágenes terminan de cargar.
      ScrollTrigger.refresh();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="border-y border-line">
      {cats.map((c, i) => {
        const Icon = categoryIcon(c.slug);
        const reverse = i % 2 === 1;
        const theme = THEMES[i % THEMES.length];
        return (
          <div
            key={c.slug}
            data-reverse={reverse}
            className={clsx(
              "fc-row relative overflow-hidden",
              i % 2 === 1 ? "bg-bone-dim/30" : "bg-bone"
            )}
          >
            <Container className="relative grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-24">
              {/* Visual */}
              <div className={clsx("relative", reverse ? "lg:order-2" : "lg:order-1")}>
                <div
                  className="fc-block relative mx-auto flex aspect-[5/4] w-full items-center justify-center overflow-visible rounded-[var(--radius-card)]"
                  style={{ backgroundColor: theme.bg, maxWidth: theme.maxW }}
                >
                  {/* Brillo radial: mantiene legible la máquina sobre color intenso */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)]"
                    style={{
                      background: `radial-gradient(circle at 50% 55%, ${theme.glow}, transparent 62%)`,
                    }}
                    aria-hidden
                  />
                  <span
                    className="fc-ghost ghost-word pointer-events-none absolute -top-6 select-none text-[34vw] sm:text-[20vw] lg:text-[14rem]"
                    style={{ color: theme.ghost }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Acento vertical */}
                  <span
                    className={clsx("absolute top-5 z-20 h-14 w-1.5", reverse ? "right-5" : "left-5")}
                    style={{ backgroundColor: theme.accent }}
                    aria-hidden
                  />
                  <Image
                    src={c.imagen}
                    alt={c.nombre}
                    width={560}
                    height={460}
                    style={{ width: theme.imgW }}
                    className="fc-img relative z-10 h-auto -translate-y-2 object-contain drop-shadow-[0_28px_40px_rgba(10,10,10,0.28)]"
                  />
                </div>
              </div>

              {/* Texto */}
              <div className={clsx("relative", reverse ? "lg:order-1" : "lg:order-2")}>
                <span className="fc-anim label-mono flex items-center gap-2 text-energy-deep">
                  <Icon className="h-4 w-4" strokeWidth={1.5} /> {c.count} máquinas · desde{" "}
                  {c.desde.toLocaleString("es-ES")} €
                </span>
                <h3 className="fc-anim font-display mt-3 text-[clamp(2.2rem,4.6vw,3.6rem)] text-carbon">
                  {c.nombre}
                </h3>
                <p className="fc-anim mt-4 max-w-md text-ink-600">
                  Equipos de {c.nombre.toLowerCase()} de uso comercial, listos para probar
                  en el showroom de Puente Genil antes de comprar.
                </p>
                <Link
                  href={`/categoria/${c.slug}`}
                  className="fc-anim group mt-7 inline-flex items-center gap-2 rounded-[var(--radius-card)] border border-carbon px-5 py-3 text-sm font-semibold text-carbon transition hover:bg-carbon hover:text-bone"
                >
                  Ver categoría
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </Container>
          </div>
        );
      })}
    </div>
  );
}
