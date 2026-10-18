#!/usr/bin/env python3
"""Generate a multi-resolution Windows .ico for Mo RPG Hero.

The design mirrors the Android vector app icon in
android/app/src/main/res/drawable/ic_app_icon.xml: a dark rounded tile with a
gold ring and a star/blade emblem. Output: build/icon.ico (referenced by the
electron-builder "build.win.icon" field).
"""

from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw

# Colors taken from the Android vector drawable.
BG = (7, 16, 28, 255)          # #07101C
RING = (183, 122, 33, 255)     # #B77A21
STAR = (246, 214, 123, 255)    # #F6D67B
BLADE = (255, 255, 255, 255)   # #FFFFFF
HILT = (138, 77, 16, 255)      # #8A4D10
BAR = (246, 214, 123, 255)     # #F6D67B

# Sizes packed into the .ico. 256 is the modern master; the rest give crisp
# small renders in Explorer / the taskbar.
SIZES = [256, 128, 64, 48, 32, 16]
MASTER = 256
SUPERSAMPLE = 4  # render large, then downscale for smooth edges

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "build")
OUT_FILE = os.path.join(OUT_DIR, "icon.ico")


def _star_points(cx: float, cy: float, outer: float, inner: float, points: int = 5):
    """Return vertices for a `points`-pointed star, first tip pointing up."""
    import math

    verts = []
    step = math.pi / points
    angle = -math.pi / 2  # start at the top
    for i in range(points * 2):
        r = outer if i % 2 == 0 else inner
        verts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
        angle += step
    return verts


def render_master() -> Image.Image:
    """Render the icon at MASTER * SUPERSAMPLE resolution with 4x AA."""
    s = MASTER * SUPERSAMPLE
    scale = s / 108.0  # Android vector viewport is 108x108

    def sx(v: float) -> float:
        return v * scale

    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Dark rounded-square background (108x108 tile, ~22dp corner radius).
    d.rounded_rectangle(
        [sx(4), sx(4), sx(104), sx(104)],
        radius=sx(22),
        fill=BG,
    )

    # Gold ring: outer circle minus inner circle.
    ring = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse([sx(6), sx(6), sx(102), sx(102)], fill=RING)
    rd.ellipse([sx(14), sx(14), sx(94), sx(94)], fill=(0, 0, 0, 0))
    img.alpha_composite(ring)

    # Star emblem.
    d.polygon(_star_points(sx(54), sx(50), outer=sx(34), inner=sx(13)), fill=STAR)

    # Vertical blade.
    d.rectangle([sx(51), sx(24), sx(57), sx(78)], fill=BLADE)

    # Hilt block.
    d.rectangle([sx(31), sx(62), sx(77), sx(74)], fill=HILT)

    # Cross bar.
    d.rectangle([sx(29), sx(48), sx(79), sx(54)], fill=BAR)

    return img


def main() -> int:
    master = render_master()
    frames = [
        master.resize((n, n), Image.LANCZOS)
        for n in SIZES
    ]

    os.makedirs(OUT_DIR, exist_ok=True)
    # PIL writes a proper multi-image .ico when given a list of sizes.
    frames[0].save(
        OUT_FILE,
        format="ICO",
        sizes=[(n, n) for n in SIZES],
        append_images=frames[1:],
    )
    print(f"Wrote {OUT_FILE} ({os.path.getsize(OUT_FILE)} bytes) sizes={SIZES}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
