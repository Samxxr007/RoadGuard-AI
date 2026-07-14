# RoadGuard AI API Documentation

Base URL: `http://localhost:8000/api/v1`

## Authentication

### `POST /auth/token`
Generates a JWT Bearer token for API access.
- **Request Body** (Form Data): `username`, `password`
- **Response**: `{ "access_token": "string", "token_type": "bearer" }`

## Dashboard

### `GET /dashboard/stats`
Retrieves aggregated statistics for the main dashboard.
- **Response**:
```json
{
  "totalRoads": 15,
  "totalCameras": 12,
  "onlineCameras": 9,
  "totalDetections": 120,
  "activeDetections": 45,
  "criticalDetections": 8,
  "averageHealthScore": 72,
  "pendingRepairs": 12,
  "completedRepairs": 45,
  "totalRepairCost": 850000,
  "budgetUtilization": 67.4,
  "monthlyDetections": 34,
  "detectionChangePercent": 12.5,
  "healthScoreChange": -3.2
}
```

## Roads

### `GET /roads`
Retrieves a paginated list of all monitored roads.
- **Parameters**: `skip` (int, default=0), `limit` (int, default=100)
- **Response**: `List[Road]`

### `GET /roads/{road_id}`
Retrieves details for a specific road.

## Cameras

### `GET /cameras`
Retrieves all CCTV cameras integrated into the system.
- **Parameters**: `skip`, `limit`
- **Response**: `List[Camera]`

## Detections

### `GET /detections`
Retrieves the history of AI-detected road damages.
- **Parameters**: `skip`, `limit`
- **Response**: `List[Detection]`

### `POST /detections`
Registers a new detection (Internal use by AI Module).
- **Request Body**: `DetectionBase`
- **Response**: `Detection`
