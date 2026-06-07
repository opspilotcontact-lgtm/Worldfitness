import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { name: string; url: string }[] }) {
  return (
    <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-600">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.url} className="flex items-center gap-1.5">
            {last ? (
              <span className="text-carbon">{item.name}</span>
            ) : (
              <Link href={item.url} className="hover:text-energy-deep">
                {item.name}
              </Link>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5 text-ink-400" />}
          </span>
        );
      })}
    </nav>
  );
}
