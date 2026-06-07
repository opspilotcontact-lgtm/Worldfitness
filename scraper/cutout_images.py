"""
cutout_images.py — Recorta el fondo blanco de las fotos de producto a PNG
transparente, para que la máquina "flote" sobre cualquier fondo (hueso, rojo,
negro) sin que el blanco del estudio se superponga al color.

Pipeline:
  1. Flood-fill desde los bordes: elimina el fondo blanco contiguo.
  2. Huecos blancos internos (fondo puro encerrado entre los hierros) -> transparente.
  3. Erosión del borde claro (anti-aliasing) para quitar el halo blanco.
  4. RGB de todo lo transparente puesto a negro: evita que el blanco "sangre"
     en los bordes al reescalar la imagen sobre un panel de color.

Salida: public/productos/cutout/[slug].png
"""
from __future__ import annotations

import glob
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "productos"
OUT = ROOT / "public" / "productos" / "cutout"
THRESH = 40            # tolerancia del flood-fill desde el borde
POCKET_WHITE = 240     # blanco "puro" para huecos internos
FRINGE_LIGHT = 200     # claridad mínima para erosionar el halo del borde
FRINGE_PASSES = 2


def is_lightish(px) -> bool:
    r, g, b = px[:3]
    return min(r, g, b) >= 212 and (max(r, g, b) - min(r, g, b)) <= 26


def border_is_light(im: Image.Image) -> bool:
    """Fracción de píxeles del borde que son claros. Detecta fondo de estudio."""
    w, h = im.size
    pts = []
    step = max(4, w // 40)
    for x in range(0, w, step):
        pts.append(im.getpixel((x, 1)))
        pts.append(im.getpixel((x, h - 2)))
    step = max(4, h // 40)
    for y in range(0, h, step):
        pts.append(im.getpixel((1, y)))
        pts.append(im.getpixel((w - 2, y)))
    light = sum(1 for p in pts if is_lightish(p))
    return light / max(1, len(pts)) >= 0.6


def cutout(path: Path) -> bool:
    im = Image.open(path).convert("RGBA")
    w, h = im.size

    if not border_is_light(im):
        return False  # foto a sangre: no tocar

    # --- 1) Flood-fill del fondo contiguo desde muchas semillas del borde ---
    MARK = (255, 0, 255, 255)
    seeds = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    for k in range(1, 6):
        seeds += [(w * k // 6, 0), (w * k // 6, h - 1), (0, h * k // 6), (w - 1, h * k // 6)]
    for s in seeds:
        try:
            ImageDraw.floodfill(im, s, MARK, thresh=THRESH)
        except Exception:  # noqa: BLE001
            pass

    arr = np.array(im).astype(np.int16)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    a = arr[:, :, 3]

    marked = (r == 255) & (g == 0) & (b == 255)
    a[marked] = 0

    mn = np.minimum(np.minimum(r, g), b)
    mx = np.maximum(np.maximum(r, g), b)

    # --- 2) Huecos blancos internos puros -> transparente ---
    a[(a > 0) & (mn >= POCKET_WHITE) & ((mx - mn) <= 14)] = 0

    # --- 3) Erosión del halo claro del borde ---
    for _ in range(FRINGE_PASSES):
        transp = a == 0
        nbr = np.zeros_like(transp)
        nbr[1:, :] |= transp[:-1, :]
        nbr[:-1, :] |= transp[1:, :]
        nbr[:, 1:] |= transp[:, :-1]
        nbr[:, :-1] |= transp[:, 1:]
        a[(a > 0) & nbr & (mn >= FRINGE_LIGHT)] = 0

    # --- 4) RGB de lo transparente a negro: sin sangrado blanco en los bordes ---
    arr[:, :, 3] = a
    transp = a == 0
    arr[:, :, 0][transp] = 0
    arr[:, :, 1][transp] = 0
    arr[:, :, 2][transp] = 0

    OUT.mkdir(parents=True, exist_ok=True)
    Image.fromarray(arr.astype(np.uint8), "RGBA").save(OUT / f"{path.stem}.png")
    return True


def main() -> None:
    files = sorted(glob.glob(str(SRC / "*.jpg")))
    done = skipped = bled = 0
    for f in files:
        p = Path(f)
        if (OUT / f"{p.stem}.png").exists():
            skipped += 1
            continue
        try:
            if cutout(p):
                done += 1
            else:
                bled += 1
        except Exception as exc:  # noqa: BLE001
            print(f"  ! {p.name}: {exc}")
            bled += 1
    print(f"OK -> {OUT}")
    print(f"  recortadas: {done} | sin recorte: {bled} | omitidas: {skipped}")


if __name__ == "__main__":
    main()
