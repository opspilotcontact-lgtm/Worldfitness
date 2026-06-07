import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECT_TYPES } from "@/lib/site";

export function ProjectTypeCards() {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {PROJECT_TYPES.map((t, i) => (
        <Link
          key={t.slug}
          href={`/proyectos/${t.slug}`}
          className="group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-carbon p-6 text-bone transition hover:bg-carbon-soft"
        >
          <span className="font-display absolute -right-2 -top-3 text-7xl text-bone/5">
            0{i + 1}
          </span>
          <div className="relative">
            <h3 className="font-display text-2xl text-bone">{t.nombre}</h3>
            <p className="mt-2 text-sm text-bone/60">{t.short}</p>
          </div>
          <div className="relative mt-8 border-t border-line-dark pt-4">
            <p className="label-mono text-bone/40">Inversión orientativa</p>
            <p className="spec-mono mt-1 text-lg font-semibold text-energy">
              {t.inversion}
            </p>
            <span className="mt-3 flex items-center gap-1 text-sm font-medium text-bone">
              Ver propuesta para {t.nombre.toLowerCase()}
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
