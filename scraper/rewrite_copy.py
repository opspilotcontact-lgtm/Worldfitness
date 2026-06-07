"""
rewrite_copy.py — Reescribe las 163 descripciones quitando el olor a IA.

El copy original tiene exclamaciones, "su gimnasio", "inversión premium" y frases
huecas que un comprador profesional no usa. Este script genera, de forma
determinista (sin llamar a ninguna API de IA), tres bloques por producto:

  - descripcion_corta : 1 frase = qué trabaja + para quién.
  - descripcion_larga : 3 párrafos = uso · datos técnicos · encaje + showroom.
  - encaja_para       : tipos de centro donde la máquina rinde mejor.

Además normaliza la categoría a un slug y extrae specs (peso, dimensiones, carga)
del texto original cuando existen. Si un texto queda dudoso, se marca con _revisar.

Entrada/Salida: data/productos.json (lo enriquece in-place).
"""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "data" / "productos.json"

# ---- Normalización de categorías (8 originales -> slugs estables) ----
CATEGORY_MAP = {
    "Maquinaria Carga de Discos": ("Carga de discos", "carga-de-discos"),
    "Equipo de Gimnasio Carga de Discos": ("Carga de discos", "carga-de-discos"),
    "Equipamiento": ("Carga de discos", "carga-de-discos"),
    "Musculación": ("Musculación selectorizada", "musculacion"),
    "Accesorios y Entrenamiento Funcional": ("Accesorios y funcional", "accesorios-funcional"),
    "Cardio": ("Cardio", "cardio"),
    "Equipamiento de Peso Libre y Racks": ("Peso libre y racks", "peso-libre-racks"),
    "Maquinaria de Aislamiento y Glúteo": ("Aislamiento y glúteo", "aislamiento-gluteo"),
    "Funcional": ("Funcional", "funcional"),
}

# ---- Movimiento / grupo muscular según palabras clave del nombre ----
MOVEMENTS = [
    (("press de pecho inclinad", "pecho inclinad", "inclinad"), "el press de pecho inclinado, con foco en pectoral superior"),
    (("press de pecho", "press pecho", "pectoral", "press de banca"), "el press de pecho horizontal y el desarrollo de pectoral"),
    (("prensa de piernas", "prensa 45", "leg press"), "la prensa de pierna completa: cuádriceps, glúteo e isquiotibiales"),
    (("hack", "v-squat", "v squat", "sentadilla en v", "sentadilla hack"), "la sentadilla guiada con foco en cuádriceps y glúteo"),
    (("sentadilla", "squat"), "la sentadilla y el trabajo de tren inferior"),
    (("jalón", "jalon", "polea alta", "pulldown", "dorsal"), "el jalón vertical para dorsal y espalda alta"),
    (("remo", "row"), "el remo horizontal para espalda media y romboides"),
    (("press de hombro", "hombro", "shoulder", "militar"), "el press de hombro y el desarrollo de deltoides"),
    (("aductor", "aductores"), "los aductores de cadera (cara interna del muslo)"),
    (("abductor", "abductores"), "los abductores de cadera y el glúteo medio"),
    (("glúteo", "gluteo", "patada", "hip thrust", "puente de cadera"), "el glúteo mediante extensión de cadera"),
    (("femoral", "isquio", "curl de pierna", "curl femoral"), "los isquiotibiales mediante curl femoral"),
    (("extensión de cuád", "extension de cuad", "cuádriceps", "cuadriceps", "extensión de pierna", "leg extension"), "el cuádriceps mediante extensión de rodilla"),
    (("bíceps", "biceps", "curl de bíceps", "predicador", "scott"), "el bíceps en curl guiado"),
    (("tríceps", "triceps"), "el tríceps en empuje guiado"),
    (("gemelo", "pantorrilla", "calf", "soleo"), "el gemelo mediante flexión plantar"),
    (("abdomin", "abs", "crunch", "lumbar", "core"), "el trabajo de abdomen y core"),
    (("smith", "multipower"), "movimientos multiarticulares guiados en barra (Smith)"),
    (("rack", "jaula", "power cage", "squat rack", "cage"), "el peso libre con barra: sentadilla, press y dominadas"),
    (("dominadas", "pull up", "fondos", "dip"), "dominadas y fondos con peso corporal"),
    (("banco", "bench"), "el trabajo con barra y mancuerna sobre banco regulable"),
    (("cinta", "treadmill", "runner", "correr"), "la carrera y el cardio de impacto controlado"),
    (("bici", "bike", "ciclo", "spinning", "spin"), "el ciclismo indoor y el cardio de bajo impacto"),
    (("elíptica", "eliptica", "crosstrainer"), "el cardio global de bajo impacto en elíptica"),
    (("escalad", "stair", "stepper"), "el cardio de subida continua tipo escalera"),
    (("remo de aire", "remo cardio", "air rower", "rower"), "el remo cardiovascular de cuerpo completo"),
    (("polea", "cruce", "crossover", "pulley", "estación de polea"), "trabajo en polea ajustable para múltiples grupos musculares"),
    (("mancuerna", "disco", "barra olímp", "barra olimp", "kettlebell", "soporte"), "la carga libre con discos, barras y mancuernas"),
]

USE_BY_CAT = {
    "carga-de-discos": "uso comercial intensivo en sala de musculación",
    "musculacion": "uso continuo en sala con rotación alta de usuarios",
    "accesorios-funcional": "zonas de entrenamiento funcional y trabajo de grupo",
    "cardio": "salas de cardio con uso prolongado a diario",
    "peso-libre-racks": "zonas de peso libre y entrenamiento de fuerza",
    "aislamiento-gluteo": "trabajo de aislamiento y tren inferior en sala comercial",
    "funcional": "salas funcionales y de fuerza con uso exigente",
}

LOAD_HINTS = [
    (("disco", "carga de disco", "olímp", "olimp", "plate"), "Carga por discos olímpicos (no incluidos)."),
    (("selector", "placas", "torre de peso", "stack", "selectoriz"), "Carga selectorizada por placas (incluida)."),
    (("peso corporal", "dominadas", "fondos"), "Trabajo con peso corporal, sin carga adicional necesaria."),
]


def strip_accents(text: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", text) if unicodedata.category(c) != "Mn")


def detect_movement(name: str, desc: str) -> str:
    hay = strip_accents(f"{name} {desc}".lower())
    for keys, phrase in MOVEMENTS:
        if any(strip_accents(k.lower()) in hay for k in keys):
            return phrase
    return "el trabajo de fuerza en sala comercial"


def extract_weight(desc: str) -> int | None:
    m = re.search(r"(\d{2,4})\s*kg", desc)
    return int(m.group(1)) if m else None


def extract_dims(desc: str) -> str | None:
    m = re.search(r"(\d{3,4})\s*[xX×]\s*(\d{3,4})\s*[xX×]\s*(\d{3,4})", desc)
    if m:
        return f"{m.group(1)}×{m.group(2)}×{m.group(3)} mm"
    return None


def detect_load(name: str, desc: str, cat_slug: str) -> str:
    hay = strip_accents(f"{name} {desc}".lower())
    for keys, phrase in LOAD_HINTS:
        if any(strip_accents(k.lower()) in hay for k in keys):
            return phrase
    if cat_slug == "carga-de-discos":
        return "Carga por discos olímpicos (no incluidos)."
    if cat_slug == "musculacion":
        return "Carga selectorizada por placas (incluida)."
    if cat_slug == "cardio":
        return "Consola con niveles de resistencia ajustables."
    return "Sistema de carga dimensionado para uso comercial continuado."


def encaja_para(cat_slug: str, precio: int) -> list[str]:
    base: list[str] = []
    if cat_slug in ("carga-de-discos", "peso-libre-racks"):
        base = ["gimnasio-comercial", "centro-alto-rendimiento", "estudio-personal"]
    elif cat_slug == "musculacion":
        base = ["gimnasio-comercial", "hotel", "estudio-personal"]
    elif cat_slug == "cardio":
        base = ["gimnasio-comercial", "hotel", "fisioterapia"]
    elif cat_slug == "aislamiento-gluteo":
        base = ["gimnasio-comercial", "estudio-personal", "fisioterapia"]
    elif cat_slug == "accesorios-funcional":
        base = ["gimnasio-comercial", "estudio-personal", "home-gym"]
    elif cat_slug == "funcional":
        base = ["gimnasio-comercial", "centro-alto-rendimiento", "estudio-personal"]
    else:
        base = ["gimnasio-comercial", "estudio-personal"]

    if precio and precio <= 800 and "home-gym" not in base:
        base.append("home-gym")
    if precio and precio >= 2200:
        base = [t for t in base if t != "home-gym"]
        if "centro-alto-rendimiento" not in base:
            base.append("centro-alto-rendimiento")
    return base


CENTER_LABEL = {
    "gimnasio-comercial": "gimnasios comerciales",
    "hotel": "gimnasios de hotel y centros deportivos",
    "fisioterapia": "fisioterapias y centros de rehabilitación",
    "estudio-personal": "estudios de entrenamiento personal",
    "home-gym": "home gyms exigentes",
    "centro-alto-rendimiento": "centros de alto volumen",
}


def build_copy(p: dict) -> dict:
    name = p["nombre"]
    desc = p.get("descripcion_original", "")
    cat_name, cat_slug = CATEGORY_MAP.get(
        p["categoria_original"], ("Maquinaria de gimnasio", "maquinaria")
    )
    movement = detect_movement(name, desc)
    use = USE_BY_CAT.get(cat_slug, "uso comercial continuado")
    peso = extract_weight(desc)
    dims = extract_dims(desc)
    load = detect_load(name, desc, cat_slug)
    encaja = encaja_para(cat_slug, p.get("precio", 0))

    # P1 — qué trabaja + para quién (sin adjetivos vacíos)
    corta = f"Máquina para {movement}, pensada para {use}."

    # P2 — datos técnicos concretos
    specs_bits = []
    if peso:
        specs_bits.append(f"{peso} kg de peso estructural")
    if dims:
        specs_bits.append(f"dimensiones {dims}")
    if specs_bits:
        p2 = (
            f"{specs_bits[0].capitalize()}"
            + (f". {specs_bits[1].capitalize()}." if len(specs_bits) > 1 else ".")
            + f" {load} Estructura de acero soldado y tapicería de alta densidad, "
            "dimensionada para soportar el ritmo de una sala comercial."
        )
    else:
        p2 = (
            f"{load} Estructura de acero soldado y tapicería de alta densidad, "
            "dimensionada para soportar el ritmo de una sala comercial. Consulta "
            "peso y dimensiones exactas antes de planificar el espacio."
        )

    # P3 — para qué centro encaja + showroom
    labels = [CENTER_LABEL[t] for t in encaja[:2]]
    encaje_txt = labels[0] if len(labels) == 1 else f"{labels[0]} y {labels[1]}"
    p3 = (
        f"Encaja sobre todo en {encaje_txt}. Antes de pedir presupuesto, ven a "
        "probarla al showroom de Puente Genil: subirte, comprobar el recorrido y la "
        "estabilidad es la única forma de saber si te encaja en tu espacio."
    )

    p1 = (
        f"{corta} Recorrido guiado y carga progresiva para sostener una técnica "
        "estable incluso cuando el usuario llega fatigado al final de la serie."
    )
    larga = f"{p1}\n\n{p2}\n\n{p3}"

    revisar = not (peso or dims)  # sin specs reales -> marcar para repaso manual
    return {
        "categoria": cat_name,
        "categoria_slug": cat_slug,
        "descripcion_corta": corta,
        "descripcion_larga": larga,
        "encaja_para": encaja,
        "peso_kg": peso,
        "dimensiones": dims,
        "carga": load,
        "_revisar": revisar,
    }


def desc_intro(movement: str) -> str:
    return (
        f"Trabaja {movement} con recorrido guiado y carga progresiva, manteniendo "
        "una técnica estable también cuando el usuario se fatiga."
    )


def main() -> None:
    productos = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    revisar = 0
    for p in productos:
        p.update(build_copy(p))
        if p["_revisar"]:
            revisar += 1
    JSON_PATH.write_text(
        json.dumps(productos, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    cats = sorted({p["categoria_slug"] for p in productos})
    bad = [p["slug"] for p in productos if "¡" in p["descripcion_larga"] or "!" in p["descripcion_larga"]]
    print(f"OK -> {JSON_PATH}")
    print(f"  productos reescritos: {len(productos)}")
    print(f"  categorias normalizadas: {len(cats)} -> {cats}")
    print(f"  marcados _revisar (sin specs): {revisar}")
    print(f"  con exclamaciones (debe ser 0): {len(bad)}")


if __name__ == "__main__":
    main()
