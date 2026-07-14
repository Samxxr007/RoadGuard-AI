from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_roads = db.query(models.Road).count()
    total_cameras = db.query(models.Camera).count()
    online_cameras = db.query(models.Camera).filter(models.Camera.status == "online").count()
    total_detections = db.query(models.Detection).count()
    active_detections = db.query(models.Detection).filter(
        models.Detection.severity.in_(["critical", "severe"])
    ).count()
    
    # Calculate average health score
    avg_health_result = db.query(func.avg(models.Road.health_score)).scalar()
    average_health_score = round(avg_health_result) if avg_health_result else 100
    
    # Calculate total repair cost
    total_cost_result = db.query(func.sum(models.Detection.estimated_cost)).scalar()
    total_repair_cost = total_cost_result if total_cost_result else 0
    
    return {
        "totalRoads": total_roads,
        "totalCameras": total_cameras,
        "onlineCameras": online_cameras,
        "totalDetections": total_detections,
        "activeDetections": active_detections,
        "criticalDetections": db.query(models.Detection).filter(models.Detection.severity == "critical").count(),
        "averageHealthScore": average_health_score,
        "pendingRepairs": 12, # Stubbed for now
        "completedRepairs": 45, # Stubbed for now
        "totalRepairCost": total_repair_cost,
        "budgetUtilization": 67.4,
        "monthlyDetections": 34,
        "detectionChangePercent": 12.5,
        "healthScoreChange": -3.2,
    }
