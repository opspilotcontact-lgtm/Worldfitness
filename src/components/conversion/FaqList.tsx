import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

/** FAQ con <details> nativo: accesible y sin JS de cliente. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f, i) => (
        <details key={i} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
            <span className="text-lg font-semibold text-carbon">{f.q}</span>
            <Plus className="h-5 w-5 shrink-0 text-energy transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="pb-5 pr-10 text-ink-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
