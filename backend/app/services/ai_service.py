import random
import time
from typing import List, Dict, Any
from ..schemas import DetectionBase
from ..models import DamageSeverity

class YOLOv11Simulator:
    """
    Simulates the YOLOv11 detection process for the RoadGuard AI project.
    In a real production environment, this would interface with PyTorch/ONNX runtime.
    """
    
    DAMAGE_TYPES = [
        "pothole",
        "longitudinal_crack",
        "transverse_crack",
        "alligator_crack",
        "edge_crack",
        "surface_wear",
        "rutting"
    ]

    def __init__(self, confidence_threshold: float = 0.65):
        self.confidence_threshold = confidence_threshold
        # Simulate model loading time
        time.sleep(1)

    def process_frame(self, camera_id: str, road_id: str) -> List[DetectionBase]:
        """
        Simulates processing a single frame from a CCTV feed and returning detections.
        """
        detections = []
        
        # 30% chance to find something in a given frame
        if random.random() < 0.3:
            num_detections = random.randint(1, 3)
            for _ in range(num_detections):
                damage_type = random.choice(self.DAMAGE_TYPES)
                confidence = round(random.uniform(self.confidence_threshold, 0.99), 2)
                
                # Determine severity based on random logic and damage type
                severity_val = random.random()
                if severity_val > 0.9:
                    severity = DamageSeverity.critical
                elif severity_val > 0.6:
                    severity = DamageSeverity.severe
                elif severity_val > 0.3:
                    severity = DamageSeverity.moderate
                else:
                    severity = DamageSeverity.minor

                area = round(random.uniform(0.1, 5.0), 2)
                cost = area * random.uniform(2000, 15000)

                detection = DetectionBase(
                    camera_id=camera_id,
                    road_id=road_id,
                    damage_type=damage_type,
                    confidence=confidence,
                    severity=severity,
                    area_m2=area,
                    estimated_cost=round(cost, 2),
                    image_url=f"/static/detections/simulated_{camera_id}_{int(time.time())}.jpg"
                )
                detections.append(detection)
                
        return detections

# Singleton instance
ai_simulator = YOLOv11Simulator()
