import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { name: string; url: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-bone-dim/40">
      <Container className="py-10 sm:py-14">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {eyebrow && <span className="label-mono text-energy-deep">{eyebrow}</span>}
        <h1 className="font-display mt-3 max-w-4xl text-[clamp(2.4rem,5.5vw,4.2rem)] text-carbon">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-ink-600">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}
