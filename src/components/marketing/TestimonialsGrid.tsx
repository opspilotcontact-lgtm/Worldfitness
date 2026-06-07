import { Star, Quote } from "lucide-react";
import { TESTIMONIOS } from "@/lib/content";

export function TestimonialsGrid({ limit = 6 }: { limit?: number }) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIOS.slice(0, limit).map((t) => (
        <figure
          key={t.nombre}
          className="flex flex-col hairline rounded-[var(--radius-card)] bg-bone p-6"
        >
          <Quote className="h-6 w-6 text-energy" />
          <blockquote className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-900">
            {t.texto}
          </blockquote>
          <figcaption className="mt-5 border-t border-line pt-4">
            <div className="mb-1 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-energy text-energy" />
              ))}
            </div>
            <p className="font-semibold text-carbon">{t.nombre}</p>
            <p className="spec-mono text-xs text-ink-600">
              {t.centro} · {t.ciudad}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
