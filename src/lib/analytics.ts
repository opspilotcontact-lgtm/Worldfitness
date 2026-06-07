"use client";

/**
 * Eventos custom centralizados para medir conversión real (leads), no solo clics.
 * Los IDs viven en lib/site.ts (módulo neutro) para que el componente server
 * Analytics pueda leerlos como valores reales.
 */

type EventName =
  | "lead_submitted"
  | "lead_short_submitted"
  | "whatsapp_click"
  | "phone_click"
  | "showroom_visit_request"
  | "category_filter_used"
  | "search_performed";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);

  const fbMap: Partial<Record<EventName, string>> = {
    lead_submitted: "Lead",
    lead_short_submitted: "Lead",
    showroom_visit_request: "Contact",
    whatsapp_click: "Contact",
    phone_click: "Contact",
  };
  const fbEvent = fbMap[name];
  if (fbEvent) window.fbq?.("track", fbEvent, params);
}
