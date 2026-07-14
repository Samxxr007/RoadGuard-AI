# RoadGuard AI 🛣️🤖

**Intelligent Road Surface Damage Detection & Maintenance Planning System**

RoadGuard AI is a cost-effective, Smart City solution that utilizes existing municipal CCTV infrastructure to continuously monitor road health, detect surface damages using Computer Vision, predict deterioration, and prioritize maintenance.

## Features ✨
- **Live CCTV Monitoring**: Analyze real-time video feeds for road damages.
- **YOLOv11 Object Detection**: State-of-the-art accuracy for detecting potholes, cracks, and surface wear.
- **Deterioration Prediction**: Machine Learning models to forecast road health decline over 3, 6, and 12 months.
- **Automated Ticketing**: Generates maintenance tickets with cost estimations based on severity and area.
- **Deep Analytics Dashboard**: Visualize city-wide road health, budget utilization, and district comparisons.
- **Role-Based Access Control**: Different views for Admin, Engineer, and Public users.
- **Citizen Reporting**: Public can submit road damage complaints with image uploads.
- **Interactive Maps**: Leaflet-based map with camera markers and damage overlays.
- **Kanban Maintenance Board**: Track repair tickets from Pending to Completed.

## Tech Stack 🛠️
### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Framer Motion (Glassmorphism UI)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts
- **Maps**: Leaflet + OpenStreetMap
- **Date Handling**: date-fns

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (SQLAlchemy ORM)
- **AI/ML**: YOLOv11 (Simulation Module), OpenCV, NumPy, Scikit-learn
- **Auth**: JWT Bearer
- **API Documentation**: OpenAPI/Swagger

## Project Structure 📁

```
RoadGuard AI/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/      # AppShell, Sidebar, TopBar
│   │   ├── pages/           # Dashboard, LiveMonitor, Roads, etc.
│   │   ├── store/           # Zustand state management
│   │   ├── utils/           # Helper functions
│   │   └── types/           # TypeScript interfaces
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # FastAPI Python backend
│   ├── app/
│   │   ├── routers/         # API endpoints
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── database.py      # Database configuration
│   │   └── services/        # AI service
│   ├── main.py
│   └── requirements.txt
├── docs/                     # Documentation
│   ├── api_documentation.md
│   └── research_paper.md
└── README.md
```

## Frontend Pages �

### Layout Components
- **AppShell.tsx**: Sidebar + top navigation shell
- **Sidebar.tsx**: Collapsible navigation with role-based menu items
- **TopBar.tsx**: Search, notifications, user profile, dark mode toggle
- **ProtectedRoute.tsx**: Authentication guard component

### Page: Dashboard (/dashboard)
- Live KPI cards (Total Roads, Active Detections, Critical Alerts, Health Score)
- Real-time detection feed (simulated WebSocket)
- Road Health Distribution donut chart
- Monthly Damage Trend line chart
- Damage Type Distribution bar chart
- Maintenance Queue priority list
- Recent Alerts ticker
- Interactive Leaflet map with camera markers and damage overlays

### Page: Live Monitor (/monitor)
- Simulated CCTV grid (4/9/16 camera view)
- Per-camera detection overlay with bounding boxes
- Live damage event log
- WebSocket simulation for real-time detection updates

### Page: Roads (/roads)
- Searchable, filterable road inventory table
- Road detail drawer with damage history timeline, health score trend, repair history
- Road Health Score color-coded badges

### Page: Detections (/detections)
- Full detection log table with filters (type, severity, date, camera, road)
- Detection detail modal with image, bounding box, metadata
- Export to CSV/PDF

### Page: Maintenance (/maintenance)
- Kanban board: Pending → In Progress → Completed
- Ticket detail view with assignment, priority, cost estimate
- Repair verification (before/after image comparison)
- Auto-ticket generation logic display

### Page: Analytics (/analytics)
- Monthly Damage Trends (line chart)
- Damage Type Distribution (pie/bar chart)
- District Comparison (grouped bar chart)
- Maintenance Cost breakdown (stacked bar chart)
- Repair Time histogram
- Road Health Distribution (area chart)
- Prediction Accuracy metrics (model performance comparison)

### Page: Cameras (/cameras)
- Camera registry with status (Online/Offline/Maintenance)
- Camera detail: location, coverage area, detection stats
- Add/Edit camera form

### Page: Reports (/reports)
- Generate monthly/quarterly reports
- District-wise analytics reports
- Export as PDF (using browser print)

### Page: Research (/research)
- Model Comparison table (YOLOv11 vs YOLOv8 vs EfficientNet)
- Metrics: Accuracy, Precision, Recall, F1, mAP, IoU, FPS, Inference Time
- Training curves (loss/accuracy charts)
- Confusion matrix visualization

### Page: Citizens (/citizens)
- Public complaint submission form (image upload, location, description)
- Complaint list with AI-merge status

### Page: Settings (/settings)
- Profile management
- Role & user management (Admin only)
- Notification preferences
- System configuration

## Backend API 🔌

### Database Models (SQLAlchemy)
- **User**: id, email, role, hashed_password
- **Camera**: id, name, location, lat, lng, status
- **Road**: id, name, district, length, health_score, last_inspection
- **Detection**: id, camera_id, road_id, timestamp, damage_type, confidence, severity, bbox, lat, lng, repair_status
- **MaintenanceTicket**: id, detection_id, priority, status, estimated_cost, assigned_to
- **CitizenReport**: id, description, lat, lng, image_path, status, merged_detection_id

### API Endpoints
All endpoints return structured JSON matching frontend TypeScript types:
- Authentication: `/auth/login`, `/auth/register`
- Cameras: `/cameras/`, `/cameras/{id}`
- Roads: `/roads/`, `/roads/{id}`, `/roads/{id}/history`
- Detections: `/detections/`, `/detections/{id}`
- Maintenance: `/maintenance/`, `/maintenance/{id}`
- Dashboard: `/dashboard/stats`, `/dashboard/feed`
- Citizens: `/citizens/reports`, `/citizens/reports/{id}`

### AI Module (backend/app/services/ai_service.py)
- **detector.py**: YOLOv11 model loading + inference
- **processor.py**: OpenCV frame extraction, preprocessing
- **classifier.py**: Severity classification logic
- **predictor.py**: Scikit-learn deterioration predictor
- Mock inference mode when no model file present

## Design System 🎨

### Theme: Dark Mode Smart City
Deep navy/slate backgrounds with electric blue/cyan accents and amber/red for alerts.

### Colors
- **Background**: `#0a0f1e` (deep space navy)
- **Surface**: `#0f172a` (slate-900)
- **Card**: `#1e293b` (slate-800) with glassmorphism
- **Primary**: `#3b82f6` → `#06b6d4` (blue-to-cyan gradient)
- **Success**: `#10b981` (emerald)
- **Warning**: `#f59e0b` (amber)
- **Danger**: `#ef4444` (red)
- **Critical**: `#7c3aed` (violet)

### Severity Color Coding
- **Minor**: `#10b981` (green)
- **Moderate**: `#f59e0b` (amber)
- **Severe**: `#f97316` (orange)
- **Critical**: `#ef4444` (red)

### Typography
- **Primary**: Inter
- **Data/Code**: JetBrains Mono

## Getting Started 🚀

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On Unix/MacOS
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`
API documentation: `http://localhost:8000/docs`

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost/roadguard
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## AI Features Simulation 🤖

Since real YOLOv11 inference requires a trained model and GPU, the frontend uses realistic mock data with deterministic simulation engines:

- **Detection Simulator**: Generates realistic detection events with proper damage types, confidence scores, bounding boxes, GPS coordinates
- **Health Score Calculator**: Computes Road Health Index from weighted damage metrics
- **Priority Scorer**: Calculates maintenance priority from damage type + area + traffic + age
- **Deterioration Predictor**: Simulates ML prediction curves for road segment failure
- **Cost Estimator**: Estimates repair costs based on damage type × area × severity

The backend Python module includes the real AI inference code (YOLOv11 wrapper, OpenCV frame extractor, prediction pipeline) that would be activated with a trained model file.

## Architecture 🏗️

The system follows a modular MVC pattern:
- **Frontend**: Fully decoupled React application that proxies API requests to the FastAPI backend
- **Backend**: FastAPI with SQLAlchemy ORM for database operations
- **AI Module**: Runs asynchronously, processing frames from simulated RTSP streams and persisting detections to the database
- **WebSocket**: Real-time detection feed simulation for live monitoring

## Verification Plan ✅

### Automated Tests
- **Frontend**: `npm run build` (TypeScript compilation check)
- **Backend**: `uvicorn app.main:app --reload` (server startup)

### Manual Verification
- All 10+ pages navigate correctly
- Charts render with realistic data
- Map shows camera markers and damage overlays
- Maintenance kanban board is interactive
- Research page shows model comparison metrics
- Role-based access control works (different sidebar menus)
- Dark mode glassmorphism UI renders correctly
- Responsive layout on different screen sizes

## Documentation 📚

- **README.md**: Full project documentation (this file)
- **docs/api_documentation.md**: Complete API reference
- **docs/research_paper.md**: Academic paper-style writeup

## Research Context 🎓

This project is suitable for a Machine Learning capstone or research paper publication, demonstrating the viability of replacing expensive drone/inspection vehicle operations with continuous CCTV analysis.

## Open Questions ❓

- **AI Model**: Real YOLOv11 inference requires a trained `.pt` model file and Python environment. The backend code is fully written (production-ready) but operates in simulation mode by default, generating realistic mock detections.
- **Map Provider**: Currently using Leaflet + OpenStreetMap (free, no API key needed). Can be switched to Google Maps if preferred.
- **Authentication**: JWT-based auth with role selection on login (no real email verification). Demo credentials for each role are provided.

## License 📄
MIT License - Copyright (c) 2026
