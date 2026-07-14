from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Enum
from sqlalchemy.orm import relationship
import enum
from datetime import datetime

from .database import Base

class UserRole(str, enum.Enum):
    admin = "admin"
    inspector = "inspector"
    maintenance = "maintenance"
    viewer = "viewer"

class DamageSeverity(str, enum.Enum):
    minor = "minor"
    moderate = "moderate"
    severe = "severe"
    critical = "critical"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(UserRole), default=UserRole.viewer)
    department = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    district = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    status = Column(String, default="offline")
    road_id = Column(String, ForeignKey("roads.id"))
    
    road = relationship("Road", back_populates="cameras")
    detections = relationship("Detection", back_populates="camera")

class Road(Base):
    __tablename__ = "roads"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    district = Column(String)
    length_km = Column(Float)
    health_score = Column(Integer, default=100)
    
    cameras = relationship("Camera", back_populates="road")
    detections = relationship("Detection", back_populates="road")

class Detection(Base):
    __tablename__ = "detections"

    id = Column(String, primary_key=True, index=True)
    camera_id = Column(String, ForeignKey("cameras.id"))
    road_id = Column(String, ForeignKey("roads.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)
    damage_type = Column(String)
    confidence = Column(Float)
    severity = Column(Enum(DamageSeverity))
    area_m2 = Column(Float)
    estimated_cost = Column(Float)
    image_url = Column(String, nullable=True)
    
    camera = relationship("Camera", back_populates="detections")
    road = relationship("Road", back_populates="detections")
