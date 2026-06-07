/**
 * Configuración central del sitio. Fuente única de verdad para NAP, reseñas,
 * tipos de proyecto y enlaces de conversión. Cambiar aquí se propaga a toda la web.
 */

/** IDs de tracking (placeholder hasta que Miguel los sustituya). En módulo
 *  neutro —no "use client"— para que server y cliente lean el valor real. */
export const GA_ID = "G-PLACEHOLDER";
export const META_PIXEL_ID = "META-PLACEHOLDER";

export const SITE = {
  name: "World Fitness Club",
  legalName: "World Fitness Club",
  url: "https://wfc-pro.vercel.app",
  tagline: "Maquinaria profesional probada en showroom",
  phone: "+34 618 05 08 06",
  phoneDisplay: "618 05 08 06",
  phoneRaw: "34618050806",
  email: "info@worldfitnessclub.es",
  showroomM2: 800,
  catalogCount: 163,
  yearsActive: 8,
  reviews: {
    count: 138,
    rating: 5,
    url: "https://www.google.com/maps/search/world+fitness+club+puente+genil",
  },
  address: {
    street: "Calle Maestro Francisco Vila, 33",
    city: "Puente Genil",
    province: "Córdoba",
    region: "Andalucía",
    postalCode: "14500",
    country: "ES",
  },
  geo: { lat: 37.391, lng: -4.768 },
  hours: "Lun–Vie 9:00–14:00 y 17:00–20:00 · Sáb 10:00–13:30",
  // Posicionamiento geográfico: provincias y ciudades servidas (SEO local long-tail).
  servedProvinces: ["Córdoba", "Sevilla", "Málaga", "Granada", "Jaén", "Cádiz", "Huelva", "Almería"],
  servedCities: [
    "Córdoba", "Puente Genil", "Lucena", "Montilla", "Sevilla", "Écija",
    "Málaga", "Antequera", "Granada", "Jaén", "Cádiz", "Marbella",
  ],
  social: {
    instagram: "https://instagram.com/worldfitnessclub",
  },
} as const;

/** Mensaje de WhatsApp cualificado (no llamada en frío). */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.phoneRaw}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT =
  "Hola, estoy planteando equipar un centro y me gustaría que me asesoréis. ¿Podemos hablar?";

/** Tipos de proyecto = landings SEO long-tail + segmentación de catálogo. */
export const PROJECT_TYPES = [
  {
    slug: "gimnasio-comercial",
    nombre: "Gimnasio comercial",
    short: "20–50 máquinas, sala de 200–500 m²",
    inversion: "25.000 – 80.000 €",
    maquinas: "20–50 máquinas",
    sala: "200–500 m²",
    perfil:
      "Centros que abren o renuevan sala completa y necesitan cubrir musculación, peso libre, funcional y cardio con equipos de uso intensivo.",
  },
  {
    slug: "hotel",
    nombre: "Hotel / Centro deportivo",
    short: "10–20 máquinas, sala de 80–200 m²",
    inversion: "12.000 – 35.000 €",
    maquinas: "10–20 máquinas",
    sala: "80–200 m²",
    perfil:
      "Gimnasios de hotel y centros deportivos que buscan una sala compacta, fiable y de bajo mantenimiento para huéspedes y socios.",
  },
  {
    slug: "fisioterapia",
    nombre: "Fisioterapia / Rehabilitación",
    short: "5–10 máquinas específicas, sala de 50–100 m²",
    inversion: "6.000 – 18.000 €",
    maquinas: "5–10 máquinas",
    sala: "50–100 m²",
    perfil:
      "Clínicas y centros de rehabilitación que necesitan equipamiento de recorrido controlado y carga progresiva para trabajo terapéutico.",
  },
  {
    slug: "estudio-personal",
    nombre: "Estudio de entrenamiento personal",
    short: "8–15 máquinas, sala de 60–120 m²",
    inversion: "10.000 – 28.000 €",
    maquinas: "8–15 máquinas",
    sala: "60–120 m²",
    perfil:
      "Entrenadores que montan su propio estudio y quieren una selección versátil que rinda con clientes 1-a-1 y grupos reducidos.",
  },
  {
    slug: "home-gym",
    nombre: "Home gym premium",
    short: "3–8 máquinas, espacio de 30–60 m²",
    inversion: "4.000 – 14.000 €",
    maquinas: "3–8 máquinas",
    sala: "30–60 m²",
    perfil:
      "Particulares que montan un gimnasio en casa con equipos de calidad comercial, sin renunciar a durabilidad ni recorrido real.",
  },
] as const;

/**
 * Curación de máquinas para la sección principal: una representativa por
 * categoría en el showcase + dos para el hero. Elegidas para dar diversidad de
 * tipos de máquina (pierna, jaula, sentadilla, jalón, smith, cardio) en toda la
 * portada, sin repeticiones.
 */
export const HERO_MACHINES = ["prensa-de-piernas-a-45", "jaula-de-potencia"] as const;

export const FEATURED_CATEGORY_HERO: Record<string, string> = {
  "carga-de-discos": "sentadilla-en-v-v-squat",
  musculacion: "jalon-en-polea-alta",
  "accesorios-funcional": "maquina-smith",
  cardio: "cinta-comercial-tft-con-pantalla",
};

export type ProjectTypeSlug = (typeof PROJECT_TYPES)[number]["slug"];

export function getProjectType(slug: string) {
  return PROJECT_TYPES.find((p) => p.slug === slug);
}
