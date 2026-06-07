"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { PROJECT_TYPES } from "@/lib/site";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";

export function PresupuestoFormShort({
  productoNombre,
  productoSlug,
}: {
  productoNombre: string;
  productoSlug: string;
}) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify({ ...data, producto: productoNombre, slug: productoSlug }),
      });
    } catch {
      /* placeholder endpoint — el lead se confirma en UI igualmente */
    }
    trackEvent("lead_short_submitted", { producto: productoSlug });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="hairline rounded-[var(--radius-card)] bg-pro/5 p-6 text-center">
        <Check className="mx-auto h-8 w-8 text-pro" />
        <p className="mt-3 font-semibold text-carbon">Recibido. Te respondemos en menos de 4&nbsp;h.</p>
        <p className="mt-1 text-sm text-ink-600">
          Revisamos qué encaja para tu proyecto y te escribimos con una propuesta concreta.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="nombre" required placeholder="Nombre" className="field" />
        <input name="telefono" required placeholder="Teléfono" inputMode="tel" className="field" />
      </div>
      <input name="email" type="email" required placeholder="Email" className="field" />
      <select name="tipo_proyecto" required defaultValue="" className="field">
        <option value="" disabled>
          ¿Para qué tipo de centro?
        </option>
        {PROJECT_TYPES.map((t) => (
          <option key={t.slug} value={t.slug}>
            {t.nombre}
          </option>
        ))}
      </select>
      <Button variant="energy" size="lg" className="w-full" disabled={loading}>
        {loading ? "Enviando…" : "Pedir presupuesto"} <Send className="h-4 w-4" />
      </Button>
      <p className="text-center text-xs text-ink-400">
        Sin compromiso. No te llamamos en frío: primero entendemos tu proyecto.
      </p>
    </form>
  );
}
