import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { POSTS } from "@/lib/blog";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Guías para equipar tu gimnasio",
  description:
    "Guías prácticas sobre maquinaria de gimnasio: cómo elegir, cuánto cuesta equipar, diferencias comercial vs doméstica y diseño de sala. Por World Fitness Club.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup
        schema={breadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Guías", url: "/blog" },
        ])}
      />
      <PageHero
        crumbs={[
          { name: "Inicio", url: "/" },
          { name: "Guías", url: "/blog" },
        ]}
        eyebrow="Aprende antes de invertir"
        title="Guías para equipar tu gimnasio"
        intro="Lo que hemos aprendido en 8 años asesorando proyectos, sin humo. Decisiones de inversión, layout, durabilidad y costes reales."
      />
      <Container className="py-14">
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 bg-bone p-7 transition hover:bg-bone-dim/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="max-w-2xl">
                <span className="label-mono text-energy-deep">{post.category}</span>
                <h2 className="mt-2 text-xl font-bold text-carbon group-hover:text-energy-deep">
                  {post.title}
                </h2>
                <p className="mt-2 text-ink-600">{post.description}</p>
                <span className="spec-mono mt-3 flex items-center gap-1.5 text-xs text-ink-400">
                  <Clock className="h-3.5 w-3.5" /> {post.readingTime} · lectura
                </span>
              </div>
              <ArrowUpRight className="hidden h-6 w-6 shrink-0 text-energy transition group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
