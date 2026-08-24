import pytest
from fastapi.testclient import TestClient
import sys
import os

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "RoadGuard AI Backend"}

def test_dashboard_stats():
    response = client.get("/api/v1/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "totalRoads" in data
    assert "totalDetections" in data
    assert "averageHealthScore" in data

def test_roads_list():
    response = client.get("/api/v1/roads/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_auth_demo_token():
    response = client.post("/api/v1/auth/token", data={"username": "admin@roadguard.ai", "password": "any"})
    assert response.status_code == 200
    assert "access_token" in response.json()
