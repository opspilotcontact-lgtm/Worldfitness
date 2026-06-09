"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { clsx } from "@/lib/clsx";

export function CartButton({ className }: { className?: string }) {
  const { count, open, hydrated } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Abrir carrito de presupuesto (${count} máquinas)`}
      className={clsx(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-card)] text-carbon transition hover:bg-carbon/5",
        className
      )}
    >
      <ShoppingCart className="h-5 w-5" strokeWidth={1.6} />
      {hydrated && count > 0 && (
        <span className="spec-mono absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-energy px-1 text-[11px] font-bold text-bone">
          {count}
        </span>
      )}
    </button>
  );
}
