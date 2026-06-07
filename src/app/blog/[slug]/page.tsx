import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ShowroomCTA } from "@/components/conversion/ShowroomCTA";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import { POSTS, getPost } from "@/lib/blog";
import { pageMeta, breadcrumbSchema, articleSchema } from "@/lib/seo";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Inicio", url: "/" },
    { name: "Guías", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ];

  const fecha = new Date(post.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SchemaMarkup
        schema={[
          articleSchema({ title: post.title, description: post.description, slug, date: post.date }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <Container className="pt-8">
        <Breadcrumbs items={crumbs} />
      </Container>

      <article>
        <Container className="py-10">
          <div className="mx-auto max-w-[68ch]">
            <span className="label-mono text-energy-deep">{post.category}</span>
            <h1 className="font-display mt-3 text-[clamp(2.2rem,5vw,3.6rem)] text-carbon">
              {post.title}
            </h1>
            <div className="spec-mono mt-4 flex items-center gap-3 text-sm text-ink-400">
              <span>{fecha}</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.readingTime}
              </span>
            </div>
          </div>

          <div
            className="prose-wfc mx-auto mt-10"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="mx-auto mt-12 max-w-[68ch]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-energy-deep hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Volver a las guías
            </Link>
          </div>
        </Container>
      </article>

      <Container className="pb-20">
        <ShowroomCTA />
      </Container>
    </>
  );
}
