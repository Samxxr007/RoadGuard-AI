from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/detections", tags=["detections"])

@router.get("/", response_model=List[schemas.Detection])
def get_detections(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    detections = db.query(models.Detection).offset(skip).limit(limit).all()
    return detections

@router.post("/", response_model=schemas.Detection)
def create_detection(detection: schemas.DetectionBase, db: Session = Depends(get_db)):
    import uuid
    from datetime import datetime
    
    db_detection = models.Detection(
        **detection.dict(),
        id=f"det-{uuid.uuid4().hex[:8]}",
        timestamp=datetime.utcnow()
    )
    db.add(db_detection)
    db.commit()
    db.refresh(db_detection)
    return db_detection
