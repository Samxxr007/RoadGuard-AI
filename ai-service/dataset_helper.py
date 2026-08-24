"""
dataset_helper.py — Utilities for parsing real Pascal VOC XML annotations
and serving real pothole dataset samples in RoadGuard AI.
"""

import os
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import List, Dict, Any, Optional
from PIL import Image, ImageDraw

IMAGES_DIR = Path(__file__).parent / "images"
ANNOTATIONS_DIR = Path(__file__).parent / "annotations"

SEVERITY_COLORS = {
    "Low": (16, 185, 129),    # emerald
    "Medium": (245, 158, 11),  # amber
    "High": (249, 115, 22),    # orange
    "Critical": (239, 68, 68), # red
}


def parse_xml_annotation(xml_path: Path) -> List[Dict[str, Any]]:
    """Parse Pascal VOC XML annotation file and return list of pothole bounding boxes."""
    if not xml_path.exists():
        return []

    try:
        tree = ET.parse(xml_path)
        root = tree.getroot()

        size_elem = root.find("size")
        img_w = int(size_elem.find("width").text) if size_elem is not None and size_elem.find("width") is not None else 640
        img_h = int(size_elem.find("height").text) if size_elem is not None and size_elem.find("height") is not None else 480

        objects = []
        for obj in root.findall("object"):
            name = obj.find("name")
            label = name.text if name is not None else "pothole"
            bndbox = obj.find("bndbox")
            if bndbox is None:
                continue

            xmin = float(bndbox.find("xmin").text)
            ymin = float(bndbox.find("ymin").text)
            xmax = float(bndbox.find("xmax").text)
            ymax = float(bndbox.find("ymax").text)

            w = xmax - xmin
            h = ymax - ymin
            area_pixels = w * h

            # Estimated physical area in square meters (heuristic approximation)
            area_m2 = round((area_pixels / (img_w * img_h)) * 14.0, 3)

            # Assign severity based on physical area
            if area_m2 < 0.25:
                severity = "Low"
            elif area_m2 < 1.0:
                severity = "Medium"
            elif area_m2 < 2.5:
                severity = "High"
            else:
                severity = "Critical"

            objects.append({
                "label": label,
                "confidence": 0.96, # Ground-truth confidence
                "severity": severity,
                "bounding_box": {
                    "x": round(xmin),
                    "y": round(ymin),
                    "width": round(w),
                    "height": round(h)
                },
                "area_m2": max(0.1, area_m2),
                "is_ground_truth": True
            })

        return objects
    except Exception as e:
        print(f"Error parsing {xml_path}: {e}")
        return []


def get_dataset_stats() -> Dict[str, Any]:
    """Calculate and return statistics across the real dataset."""
    total_images = len(list(IMAGES_DIR.glob("*.png")))
    total_annotations = len(list(ANNOTATIONS_DIR.glob("*.xml")))
    
    total_potholes = 0
    severity_counts = {"Low": 0, "Medium": 0, "High": 0, "Critical": 0}

    # Sample the first 50 for quick stats calculation
    sample_xmls = list(ANNOTATIONS_DIR.glob("*.xml"))[:100]
    for xml_file in sample_xmls:
        objs = parse_xml_annotation(xml_file)
        total_potholes += len(objs)
        for obj in objs:
            sev = obj.get("severity", "Medium")
            if sev in severity_counts:
                severity_counts[sev] += 1

    avg_potholes = round(total_potholes / max(1, len(sample_xmls)), 2)

    return {
        "total_images": total_images,
        "total_annotations": total_annotations,
        "sample_analyzed": len(sample_xmls),
        "estimated_total_potholes": int(avg_potholes * total_images),
        "avg_potholes_per_image": avg_potholes,
        "severity_distribution": severity_counts,
        "dataset_type": "Pascal VOC XML + High-Res Road Images"
    }


def get_featured_samples(limit: int = 12) -> List[Dict[str, Any]]:
    """Return a curated list of featured real pothole samples for the frontend demo."""
    featured_names = [
        "potholes0", "potholes1", "potholes12", "potholes25",
        "potholes108", "potholes144", "potholes214", "potholes277",
        "potholes294", "potholes368", "potholes457", "potholes621"
    ]

    samples = []
    for name in featured_names[:limit]:
        img_path = IMAGES_DIR / f"{name}.png"
        xml_path = ANNOTATIONS_DIR / f"{name}.xml"

        if img_path.exists():
            annotations = parse_xml_annotation(xml_path) if xml_path.exists() else []
            severities = [a["severity"] for a in annotations]
            highest_sev = "Critical" if "Critical" in severities else "High" if "High" in severities else "Medium" if "Medium" in severities else "Low" if severities else "Unknown"

            samples.append({
                "id": name,
                "filename": f"{name}.png",
                "image_url": f"/api/v1/uploads/samples/image/{name}.png",
                "potholes_count": len(annotations),
                "highest_severity": highest_sev,
                "detections": annotations
            })

    return samples


def render_annotated_sample(image_path: Path, annotations: List[Dict[str, Any]], output_path: Path) -> None:
    """Render bounding boxes on sample image and save output."""
    img = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(img)

    for det in annotations:
        bb = det["bounding_box"]
        x, y, w, h = bb["x"], bb["y"], bb["width"], bb["height"]
        sev = det["severity"]
        color = SEVERITY_COLORS.get(sev, (239, 68, 68))

        draw.rectangle([x, y, x + w, y + h], outline=color, width=3)
        label = f"POTHOLE | {sev}"
        draw.rectangle([x, max(0, y - 18), x + len(label) * 7 + 4, max(18, y)], fill=color)
        draw.text((x + 2, max(2, y - 16)), label, fill=(255, 255, 255))

    img.save(output_path, quality=92)
