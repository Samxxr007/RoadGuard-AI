from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..database import get_db

router = APIRouter(prefix="/roads", tags=["roads"])

@router.get("/", response_model=List[schemas.Camera])
def get_roads(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Returns raw roads. We'll reuse Camera schema temporarily or create Road schema.
    # Wait, Road schema wasn't fully defined in schemas.py. I'll just return raw dicts for now or add Road schema.
    roads = db.query(models.Road).offset(skip).limit(limit).all()
    return roads

@router.get("/{road_id}")
def get_road(road_id: str, db: Session = Depends(get_db)):
    road = db.query(models.Road).filter(models.Road.id == road_id).first()
    if not road:
        raise HTTPException(status_code=404, detail="Road not found")
    return road
