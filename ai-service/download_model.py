#!/usr/bin/env python3
"""
download_model.py — Download a pothole-specific YOLOv8 model.

Sources tried in order:
  1. Ultralytics YOLOv8n (COCO)  — always available, auto-downloaded
  2. Roboflow Universe public pothole model via direct URL

Usage:
    python download_model.py

The model is saved to: ai-service/models/pothole_yolov8.pt
"""

import os
import sys
import shutil
import urllib.request
from pathlib import Path

MODELS_DIR = Path("models")
TARGET_PATH = MODELS_DIR / "pothole_yolov8.pt"

# Public pothole detection model (Roboflow Universe — pothole-detection-9obf2)
# This is a publicly exported YOLOv8 model trained on road pothole images.
# Direct download from Roboflow Universe public export:
ROBOFLOW_MODEL_URL = (
    "https://github.com/niconielsen32/YOLOv8-road-damage-detection/"
    "raw/main/runs/detect/train/weights/best.pt"
)

# Alternative: standard YOLOv8n (COCO) from Ultralytics GitHub releases
YOLOV8N_URL = (
    "https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.pt"
)


def download_file(url: str, dest: Path, label: str) -> bool:
    print(f"\n  Downloading {label}...")
    print(f"  URL: {url}")
    try:
        def progress(block_num, block_size, total_size):
            downloaded = block_num * block_size
            if total_size > 0:
                pct = min(100, downloaded * 100 // total_size)
                print(f"\r  Progress: {pct}%  ", end="", flush=True)

        urllib.request.urlretrieve(url, str(dest), reporthook=progress)
        print(f"\n  ✅ Saved to {dest}")
        return True
    except Exception as e:
        print(f"\n  ❌ Failed: {e}")
        return False


def main():
    print("=" * 60)
    print("  RoadGuard AI — Model Downloader")
    print("=" * 60)

    MODELS_DIR.mkdir(parents=True, exist_ok=True)

    if TARGET_PATH.exists():
        print(f"\n  ✅ Model already exists: {TARGET_PATH}")
        print("  Delete it and re-run to force re-download.")
        return

    # Try pothole-specific model first
    print("\n[1/2] Trying pothole-specific model (Roboflow/GitHub)...")
    success = download_file(ROBOFLOW_MODEL_URL, TARGET_PATH, "Pothole YOLOv8")

    if not success:
        print("\n[2/2] Falling back to YOLOv8n (COCO)...")
        success = download_file(YOLOV8N_URL, TARGET_PATH, "YOLOv8n (COCO)")

    if success:
        size_mb = TARGET_PATH.stat().st_size / (1024 * 1024)
        print(f"\n  Model size: {size_mb:.1f} MB")
        print("\n  ✅ Model ready. Start the AI service:")
        print("     uvicorn main:app --host 0.0.0.0 --port 8001 --reload")
    else:
        print("\n  ❌ Could not download any model.")
        print("  The AI service will auto-download yolov8n.pt from Ultralytics")
        print("  on first startup — no action needed.")

    print("=" * 60)


if __name__ == "__main__":
    main()
