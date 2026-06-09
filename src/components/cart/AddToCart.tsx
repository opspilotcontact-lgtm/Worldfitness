"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCart, type CartInput } from "@/lib/cart";
import { trackEvent } from "@/lib/analytics";
import { clsx } from "@/lib/clsx";

export function AddToCart({
  producto,
  variant = "card",
}: {
  producto: CartInput;
  variant?: "card" | "full";
}) {
  const { add, open } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd(openDrawer: boolean) {
    add(producto, variant === "full" ? qty : 1);
    trackEvent("cart_add", { slug: producto.slug, qty: variant === "full" ? qty : 1 });
    if (openDrawer) {
      open();
    } else {
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    }
  }

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleAdd(false);
        }}
        aria-label={`Añadir ${producto.nombre} al carrito`}
        className={clsx(
          "relative z-10 inline-flex items-center gap-1.5 rounded-[var(--radius-card)] px-3 py-2 text-sm font-semibold transition",
          added ? "bg-pro text-bone" : "btn-energy"
        )}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" /> Añadido
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" /> Añadir
          </>
        )}
      </button>
    );
  }

  // variant "full" — ficha de producto
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="inline-flex items-center rounded-[var(--radius-card)] border border-carbon">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Quitar una unidad"
          className="flex h-12 w-12 items-center justify-center text-carbon transition hover:bg-carbon/5"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="spec-mono w-10 text-center text-lg font-semibold text-carbon" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          aria-label="Añadir una unidad"
          className="flex h-12 w-12 items-center justify-center text-carbon transition hover:bg-carbon/5"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => handleAdd(true)}
        className="btn-energy inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--radius-card)] px-6 py-3.5 text-base font-semibold"
      >
        <ShoppingCart className="h-5 w-5" /> Añadir al carrito
      </button>
    </div>
  );
}
