import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { clsx } from "@/lib/clsx";

/** CTA reutilizable hacia el showroom. Activo diferencial #1. */
export function ShowroomCTA({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "blueprint relative overflow-hidden rounded-[var(--radius-card)] bg-carbon px-6 py-10 text-bone sm:px-12 sm:py-14",
        className
      )}
    >
      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <span className="label-mono text-energy">
            <MapPin className="mr-1.5 inline h-3.5 w-3.5" />
            Showroom {SITE.showroomM2} m² · {SITE.address.city}, {SITE.address.province}
          </span>
          <h2 className="font-display mt-4 text-4xl text-bone sm:text-5xl">
            Una máquina de 1.500&nbsp;€ no se compra a ciegas.
          </h2>
          <p className="mt-4 max-w-xl text-bone/70">
            Súbete, prueba el recorrido, comprueba la estabilidad. Te decimos qué
            máquinas encajan según tu sala y tu público —sin presión y sin
            compromiso. Es la única forma honesta de invertir bien.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button href="/showroom" variant="energy" size="lg" className="w-full">
            Cómo visitar el showroom <ArrowRight className="h-4 w-4" />
          </Button>
          <Link
            href="/presupuesto"
            className="text-center text-sm font-medium text-bone/60 underline underline-offset-4 hover:text-bone"
          >
            O pide presupuesto cualificado primero
          </Link>
        </div>
      </div>
    </div>
  );
}
