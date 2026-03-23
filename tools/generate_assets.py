"""使用 OpenAI Images API 生成《失序法则》原型资源。

要求：
1) 输出 PNG
2) 透明背景（若模型支持）
3) 保持统一风格
"""

from __future__ import annotations

import base64
import os
from pathlib import Path

from openai import OpenAI

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "web" / "assets" / "generated"

ASSET_PROMPTS = {
    "xiaoyu.png": "anime heroine XiaoYu, futuristic combat suit, dynamic pose, full body, clean line art, transparent background",
    "glitch_guard.png": "hostile robot guard with purple glitch effects, game enemy sprite style, transparent background",
    "void_parser.png": "floating abstract void creature, neon cyan and magenta accents, game enemy sprite, transparent background",
    "stage_bg.png": "cyber city ruins at night, side scrolling battle background, minimal clutter, transparent background",
}


def ensure_output_dir() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def generate_one(client: OpenAI, file_name: str, prompt: str) -> None:
    # 说明：不同模型参数可能调整，这里默认使用 gpt-image-1。
    result = client.images.generate(
        model="gpt-image-1",
        prompt=prompt,
        size="1024x1024",
        background="transparent",
    )

    image_b64 = result.data[0].b64_json
    image_bytes = base64.b64decode(image_b64)
    (OUTPUT_DIR / file_name).write_bytes(image_bytes)
    print(f"generated: {file_name}")


def main() -> None:
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY 未设置")

    ensure_output_dir()
    client = OpenAI()

    for file_name, prompt in ASSET_PROMPTS.items():
        generate_one(client, file_name, prompt)


if __name__ == "__main__":
    main()
