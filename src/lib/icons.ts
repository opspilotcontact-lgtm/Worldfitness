import {
  Dumbbell,
  Heart,
  Waypoints,
  Disc,
  Crosshair,
  Zap,
  LayoutGrid,
  Building2,
  Hotel,
  Stethoscope,
  UserRound,
  House,
  type LucideIcon,
} from "lucide-react";

/** Icono representativo por categoría de catálogo (línea, minimalista). */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "carga-de-discos": Disc,
  musculacion: Dumbbell,
  "accesorios-funcional": Waypoints,
  cardio: Heart,
  "peso-libre-racks": LayoutGrid,
  "aislamiento-gluteo": Crosshair,
  funcional: Zap,
};

/** Icono representativo por sector / tipo de centro. */
export const SECTOR_ICONS: Record<string, LucideIcon> = {
  "gimnasio-comercial": Building2,
  hotel: Hotel,
  fisioterapia: Stethoscope,
  "estudio-personal": UserRound,
  "home-gym": House,
};

export function categoryIcon(slug: string): LucideIcon {
  return CATEGORY_ICONS[slug] ?? Dumbbell;
}

export function sectorIcon(slug: string): LucideIcon {
  return SECTOR_ICONS[slug] ?? Building2;
}
