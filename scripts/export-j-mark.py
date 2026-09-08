"""Export the J mark from `j logo new.pdf` with a transparent background."""

from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "j logo new.pdf"
LOGOS = ROOT / "public" / "logos"
APP = ROOT / "app"
PUBLIC = ROOT / "public"


def render_page(scale: float = 5) -> Image.Image:
    doc = fitz.open(PDF)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=True)
    return Image.frombytes("RGBA", (pix.width, pix.height), pix.samples)


def crop_emblem(img: Image.Image, padding_ratio: float = 0.04) -> Image.Image:
    bbox = img.getbbox()
    if bbox is None:
        raise RuntimeError("PDF page has no visible artwork.")

    sheet = img.crop(bbox)
    width, height = sheet.size
    pixels = sheet.load()

    def row_density(y: int) -> int:
        return sum(1 for x in range(0, width, 2) if pixels[x, y][3] > 20)

    empty_start = None
    gap = None
    for y in range(int(height * 0.55), height):
        empty = row_density(y) < 8
        if empty and empty_start is None:
            empty_start = y
        elif not empty and empty_start is not None and y - empty_start >= 40:
            gap = (empty_start, y)
            break

    emblem = sheet.crop((0, 0, width, gap[0])) if gap else sheet
    emblem_bbox = emblem.getbbox()
    if emblem_bbox:
        emblem = emblem.crop(emblem_bbox)

    pad = max(8, int(max(emblem.size) * padding_ratio))
    canvas = Image.new("RGBA", (emblem.size[0] + pad * 2, emblem.size[1] + pad * 2), (0, 0, 0, 0))
    canvas.paste(emblem, (pad, pad), emblem)
    return canvas


def make_square_icon(img: Image.Image, size: int = 512) -> Image.Image:
    bbox = img.getbbox()
    cropped = img.crop(bbox) if bbox else img
    side = max(cropped.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(cropped, ((side - cropped.size[0]) // 2, (side - cropped.size[1]) // 2), cropped)
    return square.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    if not PDF.exists():
        raise FileNotFoundError(PDF)

    LOGOS.mkdir(parents=True, exist_ok=True)
    emblem = crop_emblem(render_page())
    mark_path = LOGOS / "jaguar-mark.png"
    emblem.save(mark_path, optimize=True)

    icon = make_square_icon(emblem)
    icon.save(APP / "icon.png", optimize=True)
    icon.save(APP / "apple-icon.png", optimize=True)
    icon.save(
        APP / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )
    icon.save(PUBLIC / "favicon.ico", format="ICO", sizes=[(32, 32), (64, 64)])

    print(f"Wrote {mark_path} {emblem.size[0]}x{emblem.size[1]}")
    print("Wrote app/icon.png, app/apple-icon.png, app/favicon.ico")


if __name__ == "__main__":
    main()
