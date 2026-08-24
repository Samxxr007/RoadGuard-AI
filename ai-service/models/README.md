# RoadGuard AI — AI Service Model

Place your YOLOv8 pothole detection weights here:
    models/pothole_yolov8.pt

## Option 1 — Auto-download (recommended)

Run the provided download script from the `ai-service/` directory:

```bash
cd ai-service
python download_model.py
```

This will try:
1. A publicly available pothole-trained YOLOv8 model
2. Falls back to standard YOLOv8n (COCO) from Ultralytics

## Option 2 — Manual download

Download any of these free pothole detection models:

| Source | Link |
|--------|------|
| Roboflow Universe (pothole-detection) | https://universe.roboflow.com/pothole-detection-9obf2 |
| GitHub road-damage | https://github.com/niconielsen32/YOLOv8-road-damage-detection |
| Ultralytics YOLOv8n (COCO fallback) | `pip install ultralytics` then `from ultralytics import YOLO; YOLO('yolov8n.pt')` |

Rename your weights file to `pothole_yolov8.pt` and place it in this folder.

## Option 3 — Use YOLOv8n auto-download

If no model is placed here, the AI service will automatically download
`yolov8n.pt` from Ultralytics on first startup. It works with general
object detection — for the demo this is sufficient to show the pipeline.
