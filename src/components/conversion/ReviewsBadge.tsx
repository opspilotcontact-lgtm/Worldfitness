import { Star } from "lucide-react";
import { SITE } from "@/lib/site";
import { clsx } from "@/lib/clsx";

export function ReviewsBadge({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <a
      href={SITE.reviews.url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group inline-flex items-center gap-2.5 hairline rounded-[var(--radius-card)] px-3 py-2 transition",
        tone === "dark"
          ? "border-line-dark bg-carbon-soft text-bone hover:border-energy"
          : "bg-bone text-carbon hover:border-energy",
        className
      )}
    >
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-energy text-energy" />
        ))}
      </span>
      <span className="spec-mono text-sm">
        {SITE.reviews.rating.toFixed(1)}/5 · {SITE.reviews.count} reseñas Google
      </span>
    </a>
  );
}
