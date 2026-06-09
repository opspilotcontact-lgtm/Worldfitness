"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, MessageCircle, Mail, ShoppingCart } from "lucide-react";
import { useCart, whatsappRequest, emailRequest } from "@/lib/cart";
import { asset } from "@/lib/asset";
import { trackEvent } from "@/lib/analytics";

export function CartDrawer() {
  const { items, total, count, isOpen, close, setQty, remove, clear } = useCart();

  // Cerrar con Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Carrito de presupuesto">
      {/* Backdrop */}
      <button
        aria-label="Cerrar carrito"
        onClick={close}
        className="absolute inset-0 bg-carbon/50 backdrop-blur-sm"
      />

      {/* Panel */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl">
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-energy" />
            <h2 className="font-display text-xl text-carbon">Tu solicitud</h2>
            {count > 0 && (
              <span className="spec-mono text-sm text-ink-400">
                {count} {count === 1 ? "máquina" : "máquinas"}
              </span>
            )}
          </div>
          <button onClick={close} aria-label="Cerrar" className="text-ink-600 hover:text-carbon">
            <X className="h-6 w-6" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingCart className="h-12 w-12 text-line" />
            <p className="text-ink-600">
              Tu solicitud está vacía. Añade las máquinas que te interesan y pídenos
              presupuesto por WhatsApp o email, sin compromiso.
            </p>
            <Link
              href="/catalogo"
              onClick={close}
              className="btn-outline rounded-[var(--radius-card)] px-5 py-2.5 text-sm font-semibold"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            {/* Lista */}
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-3 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-bone-dim/40">
                    {item.imagen && (
                      <Image
                        src={asset(item.imagen)}
                        alt={item.nombre}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={close}
                      className="text-sm font-semibold leading-snug text-carbon hover:text-energy-deep"
                    >
                      {item.nombre}
                    </Link>
                    <span className="spec-mono mt-0.5 text-sm text-ink-600">{item.precio_formato}</span>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-[var(--radius-card)] border border-line">
                        <button
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          aria-label="Quitar una unidad"
                          className="flex h-8 w-8 items-center justify-center text-carbon hover:bg-carbon/5"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="spec-mono w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          aria-label="Añadir una unidad"
                          className="flex h-8 w-8 items-center justify-center text-carbon hover:bg-carbon/5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.slug)}
                        aria-label={`Quitar ${item.nombre}`}
                        className="text-ink-400 transition hover:text-energy-deep"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <footer className="border-t border-line px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-600">Total orientativo</span>
                <span className="spec-mono text-2xl font-semibold text-carbon">
                  {total.toLocaleString("es-ES")} €
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-400">
                IVA incluido · sin compromiso. Te asesoramos sobre disponibilidad, plazos
                e instalación.
              </p>

              <div className="mt-4 grid gap-2">
                <a
                  href={whatsappRequest(items, total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("cart_request_whatsapp", { count, total })}
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] bg-pro px-5 py-3.5 font-semibold text-bone transition hover:bg-pro-light"
                >
                  <MessageCircle className="h-5 w-5" /> Pedir presupuesto por WhatsApp
                </a>
                <a
                  href={emailRequest(items, total)}
                  onClick={() => trackEvent("cart_request_email", { count, total })}
                  className="btn-outline inline-flex items-center justify-center gap-2 rounded-[var(--radius-card)] px-5 py-3 font-semibold"
                >
                  <Mail className="h-5 w-5" /> Pedir presupuesto por email
                </a>
              </div>

              <button
                onClick={clear}
                className="mx-auto mt-3 block text-xs text-ink-400 underline underline-offset-2 hover:text-energy-deep"
              >
                Vaciar solicitud
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
