"""
train_pothole_yolo.py — Train / Fine-tune YOLOv8 on the 665 Pothole Dataset.

Steps:
  1. Converts Pascal VOC XML files from annotations/ to YOLO .txt format
  2. Splits into 80% train / 20% validation
  3. Creates dataset.yaml
  4. Trains YOLOv8n with Ultralytics PyTorch
  5. Exports the best weights to models/pothole_yolov8.pt

Usage:
  cd ai-service
  python train_pothole_yolo.py --epochs 15
"""

import os
import shutil
import random
import xml.etree.ElementTree as ET
from pathlib import Path
import argparse

IMAGES_DIR = Path("images")
ANNOTATIONS_DIR = Path("annotations")
DATASET_DIR = Path("yolo_dataset")
MODELS_DIR = Path("models")


def xml_to_yolo(xml_file: Path, img_w: int, img_h: int) -> list:
    """Convert Pascal VOC bounding boxes to YOLO normalized coordinates (class x_center y_center width height)."""
    lines = []
    tree = ET.parse(xml_file)
    root = tree.getroot()

    for obj in root.findall("object"):
        bndbox = obj.find("bndbox")
        if bndbox is None:
            continue
        xmin = float(bndbox.find("xmin").text)
        ymin = float(bndbox.find("ymin").text)
        xmax = float(bndbox.find("xmax").text)
        ymax = float(bndbox.find("ymax").text)

        # Normalize to 0..1
        x_center = ((xmin + xmax) / 2.0) / img_w
        y_center = ((ymin + ymax) / 2.0) / img_h
        width = (xmax - xmin) / img_w
        height = (ymax - ymin) / img_h

        # Clamp 0..1
        x_center = max(0.0, min(1.0, x_center))
        y_center = max(0.0, min(1.0, y_center))
        width = max(0.0, min(1.0, width))
        height = max(0.0, min(1.0, height))

        lines.append(f"0 {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}")

    return lines


def prepare_dataset(split_ratio: float = 0.85):
    print("Converting Pascal VOC XML annotations to YOLO format...")

    # Create directories
    for split in ["train", "val"]:
        (DATASET_DIR / "images" / split).mkdir(parents=True, exist_ok=True)
        (DATASET_DIR / "labels" / split).mkdir(parents=True, exist_ok=True)

    xml_files = sorted(list(ANNOTATIONS_DIR.glob("*.xml")))
    print(f"Found {len(xml_files)} annotation files.")

    # Shuffle for train/val split
    random.seed(42)
    random.shuffle(xml_files)
    split_idx = int(len(xml_files) * split_ratio)

    train_xmls = xml_files[:split_idx]
    val_xmls = xml_files[split_idx:]

    for split, files in [("train", train_xmls), ("val", val_xmls)]:
        for xml_path in files:
            stem = xml_path.stem
            img_path = IMAGES_DIR / f"{stem}.png"
            if not img_path.exists():
                continue

            # Read image dimensions
            try:
                tree = ET.parse(xml_path)
                root = tree.getroot()
                size_elem = root.find("size")
                img_w = int(size_elem.find("width").text) if size_elem is not None else 640
                img_h = int(size_elem.find("height").text) if size_elem is not None else 480
            except Exception:
                img_w, img_h = 640, 480

            # Convert labels
            yolo_lines = xml_to_yolo(xml_path, img_w, img_h)

            # Copy image
            dest_img = DATASET_DIR / "images" / split / f"{stem}.png"
            shutil.copy(img_path, dest_img)

            # Write label file
            dest_label = DATASET_DIR / "labels" / split / f"{stem}.txt"
            with open(dest_label, "w") as f:
                f.write("\n".join(yolo_lines))

    # Create dataset.yaml
    yaml_content = f"""
path: {DATASET_DIR.resolve().as_posix()}
train: images/train
val: images/val

names:
  0: pothole
"""
    yaml_path = DATASET_DIR / "dataset.yaml"
    with open(yaml_path, "w") as f:
        f.write(yaml_content.strip())

    print(f"Dataset ready at {DATASET_DIR}. Train: {len(train_xmls)}, Val: {len(val_xmls)}")
    return yaml_path


def train(epochs: int = 15, batch_size: int = 16):
    try:
        from ultralytics import YOLO
    except ImportError:
        print("Ultralytics not installed. Run: pip install ultralytics")
        return

    yaml_path = prepare_dataset()

    print(f"\nStarting YOLOv8 training for {epochs} epochs on pothole dataset...")
    model = YOLO("yolov8n.pt")  # Start from pretrained YOLOv8n weights

    results = model.train(
        data=str(yaml_path),
        epochs=epochs,
        imgsz=640,
        batch=batch_size,
        patience=5,
        save=True,
        project="runs/detect",
        name="potholes_run",
        exist_ok=True
    )

    # Copy best weights to models/pothole_yolov8.pt
    best_weights = Path("runs/detect/potholes_run/weights/best.pt")
    if best_weights.exists():
        MODELS_DIR.mkdir(parents=True, exist_ok=True)
        dest = MODELS_DIR / "pothole_yolov8.pt"
        shutil.copy(best_weights, dest)
        print(f"\nTraining Complete! Best model saved to: {dest}")
    else:
        print("Training finished.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--epochs", type=int, default=15, help="Number of training epochs")
    parser.add_argument("--batch", type=int, default=16, help="Batch size")
    args = parser.parse_args()

    train(epochs=args.epochs, batch_size=args.batch)
