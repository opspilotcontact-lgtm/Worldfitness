export type CentroTipo =
  | "gimnasio-comercial"
  | "hotel"
  | "fisioterapia"
  | "estudio-personal"
  | "home-gym"
  | "centro-alto-rendimiento";

export interface Producto {
  slug: string;
  nombre: string;
  categoria_original: string;
  categoria: string;
  categoria_slug: string;
  precio: number;
  precio_formato: string;
  imagen_url_original: string;
  imagen_local: string | null;
  imagen_cutout: string | null;
  descripcion_original: string;
  descripcion_corta: string;
  descripcion_larga: string;
  encaja_para: CentroTipo[];
  peso_kg: number | null;
  dimensiones: string | null;
  carga: string;
  destacado_origen: boolean;
  _revisar?: boolean;
}

export interface Categoria {
  slug: string;
  nombre: string;
  count: number;
}
