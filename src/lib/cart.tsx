"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SITE, waLink } from "@/lib/site";

export interface CartItem {
  slug: string;
  nombre: string;
  precio: number;
  precio_formato: string;
  imagen: string | null;
  qty: number;
}

export type CartInput = Omit<CartItem, "qty">;

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (p: CartInput, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "wfc-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar desde localStorage tras el montaje (evita desajuste de hidratación).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* almacenamiento no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((p: CartInput, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((x) => x.slug === p.slug);
      if (found) {
        return prev.map((x) => (x.slug === p.slug ? { ...x, qty: x.qty + qty } : x));
      }
      return [...prev, { ...p, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => x.slug !== slug)
        : prev.map((x) => (x.slug === slug ? { ...x, qty } : x))
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setItems((prev) => prev.filter((x) => x.slug !== slug)),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, x) => s + x.qty, 0);
    const total = items.reduce((s, x) => s + x.precio * x.qty, 0);
    return {
      items,
      count,
      total,
      hydrated,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, hydrated, isOpen, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

/** Mensaje de solicitud de presupuesto con las máquinas y cantidades. */
export function buildRequest(items: CartItem[], total: number): string {
  const lines = items
    .map((i) => `• ${i.qty}× ${i.nombre} — ${i.precio_formato}`)
    .join("\n");
  const totalFmt = `${total.toLocaleString("es-ES")} €`;
  return (
    "Hola, me gustaría recibir información y presupuesto para estas máquinas:\n\n" +
    lines +
    `\n\nTotal orientativo: ${totalFmt} (IVA incl., sin compromiso).\n` +
    "¿Me podéis asesorar sobre disponibilidad, plazos, instalación y financiación?"
  );
}

export function whatsappRequest(items: CartItem[], total: number): string {
  return waLink(buildRequest(items, total));
}

export function emailRequest(items: CartItem[], total: number): string {
  const subject = `Solicitud de presupuesto — ${items.reduce((s, x) => s + x.qty, 0)} máquinas`;
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    buildRequest(items, total)
  )}`;
}
