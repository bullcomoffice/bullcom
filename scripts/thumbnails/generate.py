"""
generate.py - BULLCOM ブログ アイキャッチ一括生成

- gpt-image-2 で記事に沿った写真を生成（テキストは入れさせない）
- Pillow で 1280x720 センタークロップ → 暗幕 → 縁取り日本語テキスト → BULLCOMロゴ
- final/{id}.jpg として保存。既存はスキップ（冪等）

実行:
  set -a && . D:/Data/Projects/Next/bullcom/.env.local && set +a && \
  PYTHONIOENCODING=utf-8 uv run --with openai --with pillow python scripts/thumbnails/generate.py
"""

import base64
import json
import sys
from io import BytesIO
from pathlib import Path

import openai
from PIL import Image, ImageDraw, ImageFont

# ───── パス ─────
HERE = Path(__file__).parent
SPEC = HERE / "spec.json"
DESIGN_DIR = Path(r"D:\Data\Projects\Next\design\bullcomjp_blog")
RAW_DIR = DESIGN_DIR / "raw2026h2"
OUT_DIR = DESIGN_DIR / "final"
LOGO_PATH = DESIGN_DIR / "logomoji-3d-cornflower.png"
FONT_PATH = r"C:\Windows\Fonts\meiryob.ttc"

W, H = 1280, 720

# ───── 配色（blog-create.md のパレット準拠） ─────
C_L1_FILL = (255, 255, 255)
C_L1_LINE = (10, 10, 60)
C_L2_FILL = (255, 210, 0)
C_L2_LINE = (160, 60, 0)
C_L3_FILL = (160, 220, 255)
C_L3_LINE = (0, 40, 100)

client = openai.OpenAI(timeout=600.0)


def build_prompt(img_concept: str) -> str:
    return (
        f"Cinematic photograph, 16:9 horizontal. {img_concept}. "
        "Dark moody low-key lighting with deep shadows, professional editorial tech photography, "
        "ultra detailed, shallow depth of field. "
        "IMPORTANT: the main subject sits in the RIGHT half of the frame; "
        "the LEFT half is darker, simpler and less busy so text can be overlaid there. "
        "Absolutely NO text, NO letters, NO numbers, NO logos, NO watermarks, NO signage anywhere in the image."
    )


def fit_font(draw, text: str, start_size: int, max_width: int, min_size: int = 28):
    """max_width に収まるまでフォントサイズを落とす"""
    size = start_size
    while size > min_size:
        font = ImageFont.truetype(FONT_PATH, size, index=0)
        if draw.textlength(text, font=font) <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(FONT_PATH, min_size, index=0)


def draw_outline(draw, xy, text, font, fill, outline, width):
    """縁取りテキスト（stroke_width で描画）"""
    draw.text(xy, text, font=font, fill=fill, stroke_width=width, stroke_fill=outline)


def compose(raw_path: Path, out_path: Path, l1: str, l2: str, l3: str):
    src = Image.open(raw_path).convert("RGB")

    # センタークロップ → 1280x720
    sr, dr = src.width / src.height, W / H
    if sr > dr:
        cw, ch = int(src.height * dr), src.height
        cx, cy = (src.width - cw) // 2, 0
    else:
        cw, ch = src.width, int(src.width / dr)
        cx, cy = 0, (src.height - ch) // 2
    img = src.crop((cx, cy, cx + cw, cy + ch)).resize((W, H), Image.LANCZOS)

    # 暗幕（左を濃く／右を薄く：文字が乗る側だけ強く落とす）
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(W):
        t = x / W
        a = int(140 - 65 * t)  # 左140 → 右75
        od.line([(x, 0), (x, H)], fill=(0, 0, 10, a))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")

    d = ImageDraw.Draw(img)
    max_w = W - 120  # 左右余白

    f1 = fit_font(d, l1, 92, max_w)
    f2 = fit_font(d, l2, 92, max_w)
    f3 = fit_font(d, l3, 44, max_w)

    y = 62
    draw_outline(d, (60, y), l1, f1, C_L1_FILL, C_L1_LINE, 7)
    y += f1.size + 26
    draw_outline(d, (60, y), l2, f2, C_L2_FILL, C_L2_LINE, 7)
    y += f2.size + 30
    draw_outline(d, (65, y), l3, f3, C_L3_FILL, C_L3_LINE, 5)

    # ロゴ（右下）
    logo = Image.open(LOGO_PATH).convert("RGBA")
    lw = 220
    lh = int(logo.height * lw / logo.width)
    logo = logo.resize((lw, lh), Image.LANCZOS)
    img.paste(logo, (W - lw - 30, H - lh - 25), logo)

    img.save(out_path, "JPEG", quality=92)


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    items = json.loads(SPEC.read_text(encoding="utf-8"))
    only = sys.argv[1:] or None
    if only:
        items = [it for it in items if it["id"] in only]

    print(f"[START] 対象 {len(items)} 件", flush=True)
    made = skipped = failed = 0

    for i, it in enumerate(items, 1):
        cid = it["id"]
        out_path = OUT_DIR / f"{cid}.jpg"
        raw_path = RAW_DIR / f"{cid}.png"

        if out_path.exists():
            print(f"[{i:02d}/{len(items)}] SKIP {cid}", flush=True)
            skipped += 1
            continue

        try:
            if not raw_path.exists():
                print(f"[{i:02d}/{len(items)}] GEN  {cid} ...", flush=True)
                res = client.images.generate(
                    model="gpt-image-2",
                    prompt=build_prompt(it["img"]),
                    size="1536x1024",
                    quality="high",
                    n=1,
                )
                raw_path.write_bytes(base64.b64decode(res.data[0].b64_json))
            else:
                print(f"[{i:02d}/{len(items)}] RAW済 {cid}", flush=True)

            compose(raw_path, out_path, it["l1"], it["l2"], it["l3"])
            print(f"[{i:02d}/{len(items)}] OK   {out_path.name}", flush=True)
            made += 1
        except Exception as e:
            print(f"[{i:02d}/{len(items)}] ERR  {cid}: {e}", flush=True)
            failed += 1

    print(f"\n[RESULT] 生成 {made} / スキップ {skipped} / 失敗 {failed}", flush=True)


if __name__ == "__main__":
    main()
