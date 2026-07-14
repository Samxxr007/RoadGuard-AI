# RoadGuard AI 🛣️🤖

**Intelligent Road Surface Damage Detection & Maintenance Planning System**

RoadGuard AI is a cost-effective, Smart City solution that utilizes existing municipal CCTV infrastructure to continuously monitor road health, detect surface damages using Computer Vision, predict deterioration, and prioritize maintenance.

## Features ✨
- **Live CCTV Monitoring**: Analyze real-time video feeds for road damages.
- **YOLOv11 Object Detection**: State-of-the-art accuracy for detecting potholes, cracks, and surface wear.
- **Deterioration Prediction**: Machine Learning models to forecast road health decline over 3, 6, and 12 months.
- **Automated Ticketing**: Generates maintenance tickets with cost estimations based on severity and area.
- **Deep Analytics Dashboard**: Visualize city-wide road health, budget utilization, and district comparisons.

## Tech Stack 🛠️
### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Framer Motion (Glassmorphism UI)
- **State Management**: Zustand
- **Routing**: React Router DOM

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (SQLAlchemy ORM)
- **AI/ML**: YOLOv11 (Simulation Module), OpenCV, NumPy
- **Auth**: JWT Bearer

## Getting Started 🚀

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```

## Architecture 🏗️
The system follows a modular MVC pattern. The frontend is fully decoupled and proxies API requests to the FastAPI backend. The AI module runs asynchronously, processing frames from simulated RTSP streams and persisting detections to the database.

## Research Context 🎓
This project is suitable for a Machine Learning capstone or research paper publication, demonstrating the viability of replacing expensive drone/inspection vehicle operations with continuous CCTV analysis.

## License 📄
MIT License - Copyright (c) 2026
