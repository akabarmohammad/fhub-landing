#!/usr/bin/env python3
"""Compress JPEGs and generate WebP + mobile variants."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMG_DIR = ROOT / "public" / "images"
MOBILE_DIR = IMG_DIR / "mobile"
ORIGINAL_DIR = IMG_DIR / "originals"

SIZES: dict[str, tuple[int, int, int]] = {
    "hero-bg.jpeg": (1600, 768, 78),
    "hero-warehouse.jpeg": (1280, 640, 82),
    "cta-bg.jpeg": (1400, 768, 76),
    "integration-orbit.jpeg": (900, 560, 78),
}

DEFAULT = (800, 520, 78)


def save_variants(src: Path, name: str, desktop_w: int, mobile_w: int, quality: int) -> None:
    img = Image.open(src).convert("RGB")

    def resize(max_w: int) -> Image.Image:
        copy = img.copy()
        copy.thumbnail((max_w, max_w), Image.Resampling.LANCZOS)
        return copy

    desktop = resize(desktop_w)
    mobile = resize(mobile_w)

    desktop_jpeg = IMG_DIR / name
    mobile_jpeg = MOBILE_DIR / name
    desktop_webp = IMG_DIR / name.replace(".jpeg", ".webp")
    mobile_webp = MOBILE_DIR / name.replace(".jpeg", ".webp")

    desktop.save(desktop_jpeg, "JPEG", quality=quality, optimize=True, progressive=True)
    mobile.save(mobile_jpeg, "JPEG", quality=quality - 4, optimize=True, progressive=True)
    desktop.save(desktop_webp, "WEBP", quality=quality, method=6)
    mobile.save(mobile_webp, "WEBP", quality=quality - 4, method=6)

    print(
        f"{name}: "
        f"desktop {desktop.size[0]}w -> {desktop_jpeg.stat().st_size // 1024}KB, "
        f"mobile {mobile.size[0]}w -> {mobile_jpeg.stat().st_size // 1024}KB"
    )


def main() -> None:
    MOBILE_DIR.mkdir(parents=True, exist_ok=True)
    ORIGINAL_DIR.mkdir(parents=True, exist_ok=True)

    for path in sorted(IMG_DIR.glob("*.jpeg")):
        name = path.name
        backup = ORIGINAL_DIR / name
        if not backup.exists():
            backup.write_bytes(path.read_bytes())

        desktop_w, mobile_w, quality = SIZES.get(name, DEFAULT)
        save_variants(backup if backup.exists() else path, name, desktop_w, mobile_w, quality)

    print("Done.")


if __name__ == "__main__":
    main()
