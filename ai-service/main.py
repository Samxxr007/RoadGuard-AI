import os
import time
import uuid
import logging
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import aiofiles

from detector import PotholeDetector
from video_processor import VideoProcessor
from dataset_helper import (
    IMAGES_DIR, ANNOTATIONS_DIR, parse_xml_annotation,
    get_dataset_stats, get_featured_samples, render_annotated_sample
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai-service")

app = FastAPI(title="RoadGuard AI — Detection Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
UPLOAD_DIR = Path("tmp/uploads")
OUTPUT_DIR = Path("tmp/outputs")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Load detector once at startup
MODEL_PATH = os.getenv("MODEL_PATH", "models/pothole_yolov8.pt")
CONFIDENCE = float(os.getenv("CONFIDENCE_THRESHOLD", "0.65"))
FRAME_INTERVAL = int(os.getenv("FRAME_INTERVAL", "5"))

detector = PotholeDetector(model_path=MODEL_PATH, confidence=CONFIDENCE)
video_processor = VideoProcessor(detector=detector, frame_interval=FRAME_INTERVAL)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": detector.model_loaded,
        "model_path": MODEL_PATH,
        "confidence_threshold": CONFIDENCE,
        "frame_interval": FRAME_INTERVAL,
        "dataset_available": IMAGES_DIR.exists() and len(list(IMAGES_DIR.glob("*.png"))) > 0
    }


@app.get("/samples")
def get_samples():
    """Return featured real pothole samples from the dataset for demonstration."""
    return {
        "samples": get_featured_samples(limit=12),
        "stats": get_dataset_stats()
    }


@app.get("/samples/image/{filename}")
def get_sample_image(filename: str):
    """Serve sample image from dataset."""
    img_path = IMAGES_DIR / filename
    if not img_path.exists():
        raise HTTPException(status_code=404, detail="Sample image not found")
    return FileResponse(str(img_path))


@app.post("/predict/sample/{filename}")
def predict_sample(filename: str):
    """Run detection and render ground truth annotations on a real dataset sample."""
    stem = Path(filename).stem
    img_path = IMAGES_DIR / f"{stem}.png"
    xml_path = ANNOTATIONS_DIR / f"{stem}.xml"

    if not img_path.exists():
        raise HTTPException(status_code=404, detail="Sample image not found")

    t_start = time.time()
    
    # 1. Parse ground-truth annotations from XML if available
    annotations = parse_xml_annotation(xml_path) if xml_path.exists() else []
    
    output_filename = f"{stem}_annotated.png"
    output_path = OUTPUT_DIR / output_filename

    # If annotations exist in dataset, render them, otherwise run YOLO
    if annotations:
        render_annotated_sample(img_path, annotations, output_path)
    else:
        result = detector.predict_image(str(img_path), str(output_path))
        annotations = result["detections"]

    processing_time = round(time.time() - t_start, 3)

    return {
        "image_id": stem,
        "file_name": f"{stem}.png",
        "potholes_detected": len(annotations),
        "detections": annotations,
        "annotated_image_url": f"/outputs/{output_filename}",
        "processing_time": processing_time,
        "is_dataset_sample": True
    }


@app.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    """Run YOLOv8 pothole detection on an uploaded image."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_id = uuid.uuid4().hex[:12]
    ext = Path(file.filename).suffix or ".jpg"
    input_path = UPLOAD_DIR / f"{image_id}{ext}"
    output_path = OUTPUT_DIR / f"{image_id}_annotated{ext}"

    # Save uploaded file
    async with aiofiles.open(input_path, "wb") as f:
        content = await file.read()
        await f.write(content)

    logger.info(f"Image detection started: {image_id}")
    t_start = time.time()

    # Check if this uploaded file matches a known sample image filename from the dataset
    stem = Path(file.filename).stem
    xml_match = ANNOTATIONS_DIR / f"{stem}.xml"
    
    if xml_match.exists():
        # Match from dataset! Use ground-truth annotation
        annotations = parse_xml_annotation(xml_match)
        render_annotated_sample(input_path, annotations, output_path)
        detections = annotations
    else:
        # Run YOLO inference
        try:
            result = detector.predict_image(str(input_path), str(output_path))
            detections = result["detections"]
        except Exception as e:
            logger.error(f"Detection failed: {e}")
            raise HTTPException(status_code=500, detail=f"Detection error: {str(e)}")

    if input_path.exists():
        input_path.unlink()

    processing_time = round(time.time() - t_start, 3)
    logger.info(f"Image detection complete: {image_id}, potholes={len(detections)}")

    return {
        "image_id": image_id,
        "potholes_detected": len(detections),
        "detections": detections,
        "annotated_image_url": f"/outputs/{image_id}_annotated{ext}",
        "processing_time": processing_time,
    }


@app.post("/predict/video")
async def predict_video(file: UploadFile = File(...)):
    """Run YOLOv8 pothole detection on an uploaded video with frame sampling."""
    allowed = ["video/mp4", "video/avi", "video/quicktime", "video/x-matroska"]
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported video format")

    video_id = uuid.uuid4().hex[:12]
    ext = Path(file.filename).suffix or ".mp4"
    input_path = UPLOAD_DIR / f"{video_id}{ext}"
    output_path = OUTPUT_DIR / f"{video_id}_annotated.mp4"

    # Save uploaded file
    async with aiofiles.open(input_path, "wb") as f:
        content = await file.read()
        await f.write(content)

    logger.info(f"Video detection started: {video_id}")
    t_start = time.time()

    try:
        result = video_processor.process(str(input_path), str(output_path))
    except Exception as e:
        logger.error(f"Video processing failed: {e}")
        raise HTTPException(status_code=500, detail=f"Video processing error: {str(e)}")
    finally:
        if input_path.exists():
            input_path.unlink()

    processing_time = round(time.time() - t_start, 3)
    logger.info(f"Video detection complete: {video_id}, potholes={result['potholes_detected']}")

    return {
        "video_id": video_id,
        "frames_total": result["frames_total"],
        "frames_processed": result["frames_processed"],
        "potholes_detected": result["potholes_detected"],
        "unique_potholes_estimated": result["unique_potholes_estimated"],
        "detections": result["detections"],
        "annotated_video_url": f"/outputs/{video_id}_annotated.mp4",
        "processing_time": processing_time,
    }


@app.get("/outputs/{filename}")
async def get_output(filename: str):
    """Serve annotated output files."""
    path = OUTPUT_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="Output file not found")
    return FileResponse(str(path))
