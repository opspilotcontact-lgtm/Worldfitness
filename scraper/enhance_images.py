"""
enhance_images.py — Mejora la definición de las fotos de producto.

El origen solo ofrece imágenes ~324 px (no hay versión de más resolución). Como
son renders 3D limpios, un reescalado Lanczos a ~1000 px + enfoque (UnsharpMask)
mejora notablemente la nitidez con la que se muestran (sin el escalado pobre del
navegador). Sobrescribe los JPG base en public/productos/.

Tras esto, ejecutar cutout_images.py para regenerar los PNG transparentes desde
las versiones ya mejoradas.
"""
from __future__ import annotations

import glob
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "productos"
TARGET_LONG = 1000  # lado largo objetivo
MAX_SCALE = 3.5     # no ampliar más de esto (evita "mush")


def enhance(path: Path) -> tuple[int, int] | None:
    im = Image.open(path).convert("RGB")
    w, h = im.size
    long_side = max(w, h)
    scale = min(MAX_SCALE, TARGET_LONG / long_side)
    if scale > 1.01:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    # Enfoque moderado para recuperar definición percibida.
    im = im.filter(ImageFilter.UnsharpMask(radius=2.2, percent=120, threshold=3))
    im.save(path, "JPEG", quality=90, optimize=True)
    return im.size


def main() -> None:
    files = sorted(glob.glob(str(SRC / "*.jpg")))
    done = 0
    for f in files:
        size = enhance(Path(f))
        if size:
            done += 1
    print(f"OK -> {SRC}")
    print(f"  imágenes mejoradas: {done}")


if __name__ == "__main__":
    main()
