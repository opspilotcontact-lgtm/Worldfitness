"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Categoria, Producto } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { clsx } from "@/lib/clsx";

type Sort = "destacados" | "precio-asc" | "precio-desc" | "nombre";
const PER_PAGE = 16;

const PRICE_BANDS = [
  { label: "Todo", min: 0, max: Infinity },
  { label: "Hasta 800 €", min: 0, max: 800 },
  { label: "800 – 1.200 €", min: 800, max: 1200 },
  { label: "1.200 – 2.000 €", min: 1200, max: 2000 },
  { label: "Más de 2.000 €", min: 2000, max: Infinity },
];

export function CatalogClient({
  productos,
  categorias,
  initialCategoria = "",
}: {
  productos: Producto[];
  categorias: Categoria[];
  initialCategoria?: string;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategoria);
  const [band, setBand] = useState(0);
  const [sort, setSort] = useState<Sort>("destacados");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const b = PRICE_BANDS[band];
    const list = productos.filter((p) => {
      if (cat && p.categoria_slug !== cat) return false;
      if (p.precio < b.min || p.precio > b.max) return false;
      if (term && !p.nombre.toLowerCase().includes(term) && !p.categoria.toLowerCase().includes(term))
        return false;
      return true;
    });
    switch (sort) {
      case "precio-asc":
        return [...list].sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return [...list].sort((a, b) => b.precio - a.precio);
      case "nombre":
        return [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
      default:
        return [...list].sort(
          (a, b) => Number(b.destacado_origen) - Number(a.destacado_origen)
        );
    }
  }, [productos, q, cat, band, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function resetPage() {
    setPage(1);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filtros */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex items-center gap-2 text-carbon">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="label-mono">Filtros</span>
        </div>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              resetPage();
              if (e.target.value.length === 3) trackEvent("search_performed", { q: e.target.value });
            }}
            placeholder="Buscar máquina…"
            className="field pl-9"
          />
        </div>

        <FilterGroup title="Categoría">
          <FilterChip active={cat === ""} onClick={() => { setCat(""); resetPage(); }}>
            Todas ({productos.length})
          </FilterChip>
          {categorias.map((c) => (
            <FilterChip
              key={c.slug}
              active={cat === c.slug}
              onClick={() => {
                setCat(c.slug);
                resetPage();
                trackEvent("category_filter_used", { categoria: c.slug });
              }}
            >
              {c.nombre} ({c.count})
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup title="Precio">
          {PRICE_BANDS.map((b, i) => (
            <FilterChip key={b.label} active={band === i} onClick={() => { setBand(i); resetPage(); }}>
              {b.label}
            </FilterChip>
          ))}
        </FilterGroup>
      </aside>

      {/* Resultados */}
      <div>
        <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec-mono text-sm text-ink-600">
            {filtered.length} máquina{filtered.length === 1 ? "" : "s"}
          </p>
          <label className="flex items-center gap-2 text-sm text-ink-600">
            Ordenar
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as Sort); resetPage(); }}
              className="field max-w-[200px] py-2"
            >
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A–Z</option>
            </select>
          </label>
        </div>

        {shown.length === 0 ? (
          <p className="py-20 text-center text-ink-600">
            No hay máquinas con esos filtros. Prueba ampliando el rango de precio.
          </p>
        ) : (
          <div className="mt-6">
            <ProductGrid productos={shown} priorityCount={4} />
          </div>
        )}

        {pages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={clsx(
                  "spec-mono h-10 w-10 rounded-[var(--radius-card)] text-sm transition",
                  current === i + 1
                    ? "bg-carbon text-bone"
                    : "hairline bg-bone text-carbon hover:border-carbon"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="label-mono text-ink-400">{title}</h3>
      <div className="mt-3 flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[var(--radius-card)] px-3 py-2 text-left text-sm transition",
        active ? "bg-energy text-bone font-semibold" : "text-ink-600 hover:bg-carbon/5"
      )}
    >
      {children}
    </button>
  );
}
