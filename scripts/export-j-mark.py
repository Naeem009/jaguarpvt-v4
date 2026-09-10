"""Convert `public/j1.png` (white J on black) into a transparent ink mark."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "j1.png"
LOGOS = ROOT / "public" / "logos"
APP = ROOT / "app"
PUBLIC = ROOT / "public"


def knockout_black_to_ink(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    pixels = list(rgba.getdata())
    cleaned = []
    for r, g, b, _a in pixels:
        luminance = int(round(0.299 * r + 0.587 * g + 0.114 * b))
        cleaned.append((0, 0, 0, luminance))
    rgba.putdata(cleaned)
    return rgba


def crop_with_padding(img: Image.Image, padding_ratio: float = 0.06) -> Image.Image:
    bbox = img.getbbox()
    if bbox is None:
        raise RuntimeError("No logo pixels found after knockout.")
    cropped = img.crop(bbox)
    pad = max(8, int(max(cropped.size) * padding_ratio))
    canvas = Image.new("RGBA", (cropped.size[0] + pad * 2, cropped.size[1] + pad * 2), (0, 0, 0, 0))
    canvas.paste(cropped, (pad, pad), cropped)
    return canvas


def make_square_icon(img: Image.Image, size: int = 512) -> Image.Image:
    bbox = img.getbbox()
    cropped = img.crop(bbox) if bbox else img
    side = max(cropped.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(cropped, ((side - cropped.size[0]) // 2, (side - cropped.size[1]) // 2), cropped)
    return square.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)

    LOGOS.mkdir(parents=True, exist_ok=True)
    emblem = crop_with_padding(knockout_black_to_ink(Image.open(SOURCE)))
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
