import { clsx } from "@/lib/clsx";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-3xl", className)}>
      {eyebrow && (
        <span className="label-mono text-energy-deep">{eyebrow}</span>
      )}
      <h2
        className={clsx(
          "font-display mt-3 text-4xl sm:text-5xl",
          tone === "dark" ? "text-bone" : "text-carbon"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={clsx(
            "mt-4 text-lg",
            tone === "dark" ? "text-bone/70" : "text-ink-600"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
