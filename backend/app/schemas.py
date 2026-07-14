from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import UserRole, DamageSeverity

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole
    department: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class RoadBase(BaseModel):
    name: str
    district: str
    length_km: float
    health_score: int

class Road(RoadBase):
    id: str

    class Config:
        from_attributes = True

class CameraBase(BaseModel):
    name: str
    location: str
    district: str
    lat: float
    lng: float
    status: str
    road_id: str

class Camera(CameraBase):
    id: str

    class Config:
        from_attributes = True

class DetectionBase(BaseModel):
    camera_id: str
    road_id: str
    damage_type: str
    confidence: float
    severity: DamageSeverity
    area_m2: float
    estimated_cost: float
    image_url: Optional[str] = None

class Detection(DetectionBase):
    id: str
    timestamp: datetime

    class Config:
        from_attributes = True
