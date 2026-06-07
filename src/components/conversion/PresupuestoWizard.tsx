"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { PROJECT_TYPES } from "@/lib/site";
import { clsx } from "@/lib/clsx";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";

interface Data {
  tipo: string;
  sala: string;
  usuarios: string;
  presupuesto: string;
  plazo: string;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  ciudad: string;
  mensaje: string;
}

const EMPTY: Data = {
  tipo: "", sala: "", usuarios: "", presupuesto: "", plazo: "",
  nombre: "", empresa: "", email: "", telefono: "", ciudad: "", mensaje: "",
};

const SALAS = ["Menos de 50 m²", "50–100 m²", "100–200 m²", "200–500 m²", "Más de 500 m²"];
const USUARIOS = ["Menos de 30/día", "30–80/día", "80–150/día", "Más de 150/día"];
const PRESUPUESTOS = ["Hasta 10.000 €", "10.000–25.000 €", "25.000–50.000 €", "Más de 50.000 €"];
const PLAZOS = ["Urgente", "1–3 meses", "3–6 meses", "Sin prisa"];

const STEPS = ["Proyecto", "Sala", "Uso", "Presupuesto", "Plazo", "Contacto", "Detalle"];

export function PresupuestoWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof Data, v: string) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canAdvance = [
    data.tipo, data.sala, data.usuarios, data.presupuesto, data.plazo,
    data.nombre && data.email && data.telefono, true,
  ][step];

  async function submit() {
    setLoading(true);
    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* placeholder endpoint */
    }
    trackEvent("lead_submitted", { tipo: data.tipo, presupuesto: data.presupuesto });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="hairline rounded-[var(--radius-card)] bg-pro/5 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pro text-bone">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="font-display mt-5 text-3xl text-carbon">Presupuesto en camino</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-600">
          Recibimos tu proyecto, {data.nombre.split(" ")[0]}. Lo revisamos y te
          escribimos con una propuesta concreta en menos de 4 h en horario comercial.
        </p>
        <p className="mt-6 text-sm text-ink-400">
          ¿Prefieres adelantarlo? Llámanos o escríbenos por WhatsApp y lo vemos ahora.
        </p>
      </div>
    );
  }

  return (
    <div className="hairline rounded-[var(--radius-card)] bg-bone p-6 sm:p-10">
      {/* Progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="label-mono text-energy-deep">
            Paso {step + 1} / {STEPS.length}
          </span>
          <span className="spec-mono text-sm text-ink-400">{STEPS[step]}</span>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-energy transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="min-h-[260px]">
        {step === 0 && (
          <Step title="¿Qué tipo de centro estás equipando?">
            <div className="grid gap-3 sm:grid-cols-2">
              {PROJECT_TYPES.map((t) => (
                <Choice key={t.slug} active={data.tipo === t.slug} onClick={() => { set("tipo", t.slug); next(); }}>
                  <span className="font-semibold">{t.nombre}</span>
                  <span className="block text-sm text-ink-600">{t.short}</span>
                </Choice>
              ))}
            </div>
          </Step>
        )}
        {step === 1 && (
          <Step title="¿De cuánto espacio hablamos?">
            <ChoiceList options={SALAS} value={data.sala} onPick={(v) => { set("sala", v); next(); }} />
          </Step>
        )}
        {step === 2 && (
          <Step title="¿Cuánta gente lo usaría al día?">
            <ChoiceList options={USUARIOS} value={data.usuarios} onPick={(v) => { set("usuarios", v); next(); }} />
          </Step>
        )}
        {step === 3 && (
          <Step title="¿Qué inversión orientativa manejas?">
            <ChoiceList options={PRESUPUESTOS} value={data.presupuesto} onPick={(v) => { set("presupuesto", v); next(); }} />
          </Step>
        )}
        {step === 4 && (
          <Step title="¿Para cuándo lo necesitas?">
            <ChoiceList options={PLAZOS} value={data.plazo} onPick={(v) => { set("plazo", v); next(); }} />
          </Step>
        )}
        {step === 5 && (
          <Step title="¿Cómo te contactamos?">
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="field" placeholder="Nombre y apellidos *" value={data.nombre} onChange={(e) => set("nombre", e.target.value)} />
              <input className="field" placeholder="Empresa / centro" value={data.empresa} onChange={(e) => set("empresa", e.target.value)} />
              <input className="field" type="email" placeholder="Email *" value={data.email} onChange={(e) => set("email", e.target.value)} />
              <input className="field" placeholder="Teléfono *" inputMode="tel" value={data.telefono} onChange={(e) => set("telefono", e.target.value)} />
              <input className="field sm:col-span-2" placeholder="Ciudad" value={data.ciudad} onChange={(e) => set("ciudad", e.target.value)} />
            </div>
          </Step>
        )}
        {step === 6 && (
          <Step title="¿Algo que debamos saber? (opcional)">
            <textarea
              className="field min-h-[140px]"
              placeholder="Cuéntanos lo que tengas claro: máquinas concretas, fecha de apertura, dudas…"
              value={data.mensaje}
              onChange={(e) => set("mensaje", e.target.value)}
            />
            <div className="mt-4 rounded-[var(--radius-card)] bg-bone-dim/60 p-4 text-sm text-ink-600">
              <p className="font-medium text-carbon">Resumen</p>
              <p className="mt-1">
                {PROJECT_TYPES.find((t) => t.slug === data.tipo)?.nombre} · {data.sala} ·{" "}
                {data.usuarios} · {data.presupuesto} · {data.plazo}
              </p>
            </div>
          </Step>
        )}
      </div>

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <button
          onClick={back}
          disabled={step === 0}
          className={clsx(
            "inline-flex items-center gap-1.5 text-sm font-medium transition",
            step === 0 ? "invisible" : "text-ink-600 hover:text-carbon"
          )}
        >
          <ArrowLeft className="h-4 w-4" /> Atrás
        </button>

        {step < STEPS.length - 1 ? (
          <Button onClick={next} disabled={!canAdvance} variant="energy" size="md">
            Continuar <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={loading} variant="energy" size="md">
            {loading ? "Enviando…" : "Enviar presupuesto"} <Send className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rise">
      <h2 className="font-display text-2xl text-carbon sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceList({ options, value, onPick }: { options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((o) => (
        <Choice key={o} active={value === o} onClick={() => onPick(o)}>
          <span className="font-medium">{o}</span>
        </Choice>
      ))}
    </div>
  );
}

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[var(--radius-card)] border p-4 text-left transition",
        active
          ? "border-energy bg-energy/5 shadow-[3px_3px_0_var(--color-energy)]"
          : "border-line bg-bone hover:border-carbon"
      )}
    >
      {children}
    </button>
  );
}
