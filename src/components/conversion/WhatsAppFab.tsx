"use client";

import { MessageCircle } from "lucide-react";
import { SITE, waLink, WA_DEFAULT } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFab({ message = WA_DEFAULT }: { message?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "fab" })}
      aria-label={`Escribir por WhatsApp a ${SITE.name}`}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-[var(--radius-card)] bg-pro px-4 py-3.5 text-bone shadow-[4px_4px_0_var(--color-carbon)] transition hover:bg-pro-light"
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-sm font-semibold transition-all duration-300 group-hover:max-w-[180px] group-hover:pl-2.5">
        Hablar por WhatsApp
      </span>
    </a>
  );
}
