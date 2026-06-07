"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* placeholder endpoint */
    }
    trackEvent("lead_submitted", { source: "contacto" });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="hairline rounded-[var(--radius-card)] bg-pro/5 p-8 text-center">
        <Check className="mx-auto h-8 w-8 text-pro" />
        <p className="mt-3 font-semibold text-carbon">Mensaje enviado. Te respondemos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="nombre" required placeholder="Nombre *" className="field" />
        <input name="telefono" required placeholder="Teléfono *" inputMode="tel" className="field" />
      </div>
      <input name="email" type="email" required placeholder="Email *" className="field" />
      <textarea name="mensaje" required placeholder="¿En qué te ayudamos?" className="field min-h-[140px]" />
      <Button variant="energy" size="lg" className="w-full" disabled={loading}>
        {loading ? "Enviando…" : "Enviar mensaje"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
