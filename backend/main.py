from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="RoadGuard AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "RoadGuard AI Backend"}

from app.routers import auth, dashboard, roads, cameras, detections, uploads
app.include_router(auth.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(roads.router, prefix="/api/v1")
app.include_router(cameras.router, prefix="/api/v1")
app.include_router(detections.router, prefix="/api/v1")
app.include_router(uploads.router, prefix="/api/v1")
