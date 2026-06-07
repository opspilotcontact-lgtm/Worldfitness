import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export const alt = "World Fitness Club — Maquinaria profesional de gimnasio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f5ef",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, background: "#ff5722" }} />
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#0a0a0a" }}>
            World Fitness Club
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.04, color: "#0a0a0a" }}>
            Maquinaria de gimnasio
          </span>
          <span style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.04, color: "#ff5722" }}>
            que ya está probada.
          </span>
          <span style={{ fontSize: 30, marginTop: 24, color: "#4a4a4a" }}>
            Showroom de {SITE.showroomM2} m² en Puente Genil, Córdoba · 160+ máquinas
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 28, color: "#ff5722" }}>★★★★★</span>
          <span style={{ fontSize: 26, color: "#0a0a0a", fontWeight: 600 }}>
            {SITE.reviews.rating}/5 · {SITE.reviews.count} reseñas en Google
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
