"""
VideoProcessor — Frame extraction + YOLOv8 detection + annotated video output.

Pipeline:
  1. Open video with OpenCV
  2. Sample every FRAME_INTERVAL-th frame
  3. Run YOLOv8 on each sampled frame
  4. Deduplicate detections across adjacent frames (IoU > 0.5)
  5. Write annotated output video
  6. Return aggregated results
"""

import logging
from pathlib import Path
from typing import List, Dict, Any

import cv2
import numpy as np

from severity import severity_priority

logger = logging.getLogger("video_processor")


def _iou(a: Dict, b: Dict) -> float:
    """Intersection-over-Union of two bounding boxes."""
    ax1 = a["x"]; ay1 = a["y"]; ax2 = ax1 + a["width"];  ay2 = ay1 + a["height"]
    bx1 = b["x"]; by1 = b["y"]; bx2 = bx1 + b["width"];  by2 = by1 + b["height"]

    ix1 = max(ax1, bx1); iy1 = max(ay1, by1)
    ix2 = min(ax2, bx2); iy2 = min(ay2, by2)

    inter_w = max(0, ix2 - ix1)
    inter_h = max(0, iy2 - iy1)
    inter = inter_w * inter_h

    area_a = (ax2 - ax1) * (ay2 - ay1)
    area_b = (bx2 - bx1) * (by2 - by1)
    union = area_a + area_b - inter

    return inter / union if union > 0 else 0.0


class VideoProcessor:
    """Process a video file for pothole detection."""

    IOU_THRESHOLD = 0.50   # detections with IoU > this are considered duplicates

    def __init__(self, detector, frame_interval: int = 5):
        self.detector = detector
        self.frame_interval = frame_interval

    def process(self, input_path: str, output_path: str) -> Dict[str, Any]:
        cap = cv2.VideoCapture(input_path)
        if not cap.isOpened():
            raise ValueError(f"Cannot open video: {input_path}")

        fps        = cap.get(cv2.CAP_PROP_FPS) or 30.0
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        width      = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height     = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        logger.info(
            f"Video: {total_frames} frames @ {fps:.1f} fps, "
            f"{width}x{height}, sampling every {self.frame_interval}"
        )

        # Video writer for annotated output
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

        all_detections: List[Dict] = []
        frames_processed = 0
        frame_idx = 0

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            timestamp = frame_idx / fps

            if frame_idx % self.frame_interval == 0:
                dets = self.detector.predict_frame(frame, frame_idx, timestamp)
                all_detections.extend(dets)
                frames_processed += 1

                if dets:
                    frame = self.detector.annotate_frame(frame, dets)

            out.write(frame)
            frame_idx += 1

        cap.release()
        out.release()

        # Deduplicate
        unique = self._deduplicate(all_detections)

        logger.info(
            f"Video processing done. "
            f"total_frames={total_frames}, sampled={frames_processed}, "
            f"detections={len(all_detections)}, unique={len(unique)}"
        )

        return {
            "frames_total": total_frames,
            "frames_processed": frames_processed,
            "potholes_detected": len(all_detections),
            "unique_potholes_estimated": len(unique),
            "detections": all_detections,
        }

    def _deduplicate(self, detections: List[Dict]) -> List[Dict]:
        """
        Remove duplicate detections from adjacent frames using IoU.
        Keeps the detection with the highest confidence per unique pothole.
        """
        if not detections:
            return []

        # Sort by confidence descending so we keep the best detection
        sorted_dets = sorted(detections, key=lambda d: d["confidence"], reverse=True)
        unique: List[Dict] = []

        for det in sorted_dets:
            is_dup = False
            for u in unique:
                if _iou(det["bounding_box"], u["bounding_box"]) > self.IOU_THRESHOLD:
                    is_dup = True
                    break
            if not is_dup:
                unique.append(det)

        return unique
