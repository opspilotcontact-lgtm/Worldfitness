"""
scrape_wfc.py — Refresh del catálogo de World Fitness Club.

Extrae los 163 productos desde world-fitness-club.vercel.app/catalogo.
La página de catálogo renderiza TODOS los productos en HTML server-side
(<article class="pcard">), así que una sola request basta para los metadatos
y la descripción con datos técnicos embebidos. Las fichas individuales no aportan
información adicional relevante (el copy se reescribe en rewrite_copy.py), por lo
que NO se golpean 163 URLs extra: más rápido y más respetuoso con el origen.

Las imágenes sí se descargan localmente a public/productos/ para no depender del
WordPress externo. Si una imagen falla, el producto queda marcado con
imagen_local=null y el front renderiza un placeholder SVG.

Salida: data/productos.json
"""
from __future__ import annotations

import json
import re
import time
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
IMG_DIR = ROOT / "public" / "productos"
CATALOG_URL = "https://world-fitness-club.vercel.app/catalogo"
UA = "Mozilla/5.0 (compatible; WFCProRebrandingBot/1.0)"
HEADERS = {"User-Agent": UA}
REQUEST_DELAY = 1.0  # segundos entre descargas de imagen


def clean_text(value: str) -> str:
    """Normaliza espacios y recupera el grado (°) que la fuente rompe a U+FFFD."""
    if not value:
        return ""
    text = value.replace("\xa0", " ")
    # En la fuente, "45°" llega como "45�". Recuperamos ese caso frecuente.
    text = re.sub(r"(\d)�", r"\1°", text)
    text = text.replace("�", "")
    return re.sub(r"\s+", " ", text).strip()


def fix_image_url(url: str) -> str:
    """Re-codifica el path de la imagen (los nombres traen ° y espacios crudos)."""
    parsed = urlparse(url)
    path = quote(unquote(parsed.path), safe="/")
    return f"{parsed.scheme}://{parsed.netloc}{path}"


def parse_price(card) -> tuple[int, str]:
    price_node = card.select_one(".pcard-price")
    if not price_node:
        return 0, "Consultar"
    raw = price_node.get_text(" ", strip=True)
    digits = re.sub(r"[^\d]", "", raw.split(",")[0].split(".")[0])
    value = int(digits) if digits else 0
    return value, (f"{value:,} €".replace(",", ".") if value else "Consultar")


def download_image(session: requests.Session, url: str, slug: str) -> str | None:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    ext = Path(urlparse(url).path).suffix.lower() or ".jpg"
    if ext not in {".jpg", ".jpeg", ".png", ".webp"}:
        ext = ".jpg"
    dest = IMG_DIR / f"{slug}{ext}"
    rel = f"/productos/{slug}{ext}"
    if dest.exists() and dest.stat().st_size > 1024:
        return rel
    try:
        resp = session.get(fix_image_url(url), headers=HEADERS, timeout=30)
        resp.raise_for_status()
        if len(resp.content) < 512:
            return None
        dest.write_bytes(resp.content)
        return rel
    except Exception as exc:  # noqa: BLE001
        print(f"  ! imagen falló ({slug}): {exc}")
        return None


def scrape() -> list[dict]:
    session = requests.Session()
    print(f"GET {CATALOG_URL}")
    resp = session.get(CATALOG_URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    resp.encoding = "utf-8"
    soup = BeautifulSoup(resp.text, "html.parser")

    cards = soup.select("article.pcard")
    print(f"  {len(cards)} tarjetas encontradas")

    productos: list[dict] = []
    seen: set[str] = set()
    for idx, card in enumerate(cards):
        link = card.select_one("a.pcard-img[href]") or card.select_one("a[href^='/producto/']")
        if not link:
            continue
        slug = link["href"].rsplit("/producto/", 1)[-1].strip("/")
        if not slug or slug in seen:
            continue
        seen.add(slug)

        name = clean_text(card.select_one(".pcard-name").get_text() if card.select_one(".pcard-name") else slug)
        categoria = clean_text(card.select_one(".pcard-cat").get_text() if card.select_one(".pcard-cat") else "Sin categoría")
        desc = clean_text(card.select_one(".pcard-desc").get_text() if card.select_one(".pcard-desc") else "")
        precio, precio_formato = parse_price(card)

        img_el = card.select_one("img[src]")
        img_url = img_el["src"] if img_el else ""

        print(f"[{idx + 1:3}/{len(cards)}] {name[:48]}")
        imagen_local = download_image(session, img_url, slug) if img_url else None
        if img_url:
            time.sleep(REQUEST_DELAY)

        productos.append(
            {
                "slug": slug,
                "nombre": name,
                "categoria_original": categoria,
                "precio": precio,
                "precio_formato": precio_formato,
                "imagen_url_original": img_url,
                "imagen_local": imagen_local,
                "descripcion_original": desc,
                "destacado_origen": idx < 12,
            }
        )

    return productos


def main() -> None:
    productos = scrape()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out = DATA_DIR / "productos.json"
    out.write_text(json.dumps(productos, ensure_ascii=False, indent=2), encoding="utf-8")
    con_img = sum(1 for p in productos if p["imagen_local"])
    print(f"\nOK -> {out}")
    print(f"  productos: {len(productos)}")
    print(f"  con imagen local: {con_img}")
    print(f"  sin imagen (placeholder SVG): {len(productos) - con_img}")


if __name__ == "__main__":
    main()
