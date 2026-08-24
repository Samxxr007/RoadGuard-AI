FROM python:3.11-slim

WORKDIR /app

# Install system deps for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Create temp directories
RUN mkdir -p tmp/uploads tmp/outputs models

# Download YOLOv8n model at build time so the container starts fast
# The pothole_yolov8.pt can be mounted/injected via volume
RUN python -c "from ultralytics import YOLO; YOLO('yolov8n.pt')" || true

EXPOSE 8001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8001/health')"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "2"]
