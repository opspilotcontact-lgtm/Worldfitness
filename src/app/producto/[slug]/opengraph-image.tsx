import { ImageResponse } from "next/og";
import { getProducto, getAllProductos } from "@/lib/productos";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllProductos().map((p) => ({ slug: p.slug }));
}

export const alt = "Ficha de producto — World Fitness Club";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProductOg({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProducto(slug);
  const nombre = p?.nombre ?? "Maquinaria profesional";
  const precio = p?.precio_formato ?? "";
  const categoria = p?.categoria ?? "World Fitness Club";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, background: "#ff5722" }} />
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#f8f5ef" }}>
            World Fitness Club
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, color: "#ff5722", textTransform: "uppercase", letterSpacing: 3 }}>
            {categoria}
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05, color: "#f8f5ef", marginTop: 12 }}>
            {nombre}
          </span>
          {precio && (
            <span style={{ fontSize: 44, fontWeight: 700, color: "#f8f5ef", marginTop: 20 }}>
              {precio} <span style={{ fontSize: 24, color: "#8a8a8a" }}>IVA incl.</span>
            </span>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 24, color: "#ff5722" }}>★★★★★</span>
          <span style={{ fontSize: 24, color: "#f8f5ef" }}>
            Pruébala en el showroom de {SITE.address.city} · {SITE.reviews.count} reseñas 5★
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
