-- ============================================================
-- RoadGuard AI — PostgreSQL Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE IF NOT EXISTS users (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(120) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin','inspector','maintenance','viewer')),
    department  VARCHAR(120),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    last_login  TIMESTAMPTZ
);

-- Inspections (one per upload session)
CREATE TABLE IF NOT EXISTS inspections (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES users(id) ON DELETE SET NULL,
    media_type      VARCHAR(10) NOT NULL CHECK (media_type IN ('image','video')),
    status          VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','processing','done','error')),
    location_name   TEXT,
    lat             DOUBLE PRECISION,
    lng             DOUBLE PRECISION,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ
);

-- Media files
CREATE TABLE IF NOT EXISTS media_files (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inspection_id   UUID REFERENCES inspections(id) ON DELETE CASCADE,
    original_name   VARCHAR(255),
    file_path       TEXT NOT NULL,
    annotated_path  TEXT,
    file_size       BIGINT,
    duration_s      DOUBLE PRECISION,
    frames_total    INT,
    frames_processed INT,
    processing_time DOUBLE PRECISION,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Individual detections
CREATE TABLE IF NOT EXISTS detections (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inspection_id   UUID REFERENCES inspections(id) ON DELETE CASCADE,
    media_file_id   UUID REFERENCES media_files(id) ON DELETE CASCADE,
    confidence      DOUBLE PRECISION NOT NULL,
    severity        VARCHAR(10) NOT NULL CHECK (severity IN ('Low','Medium','High','Critical')),
    bbox_x          INT, bbox_y INT, bbox_w INT, bbox_h INT,
    area_m2         DOUBLE PRECISION,
    frame_number    INT,
    timestamp_s     DOUBLE PRECISION,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Potholes (deduplicated unique physical potholes)
CREATE TABLE IF NOT EXISTS potholes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inspection_id   UUID REFERENCES inspections(id) ON DELETE CASCADE,
    severity        VARCHAR(10) NOT NULL,
    lat             DOUBLE PRECISION,
    lng             DOUBLE PRECISION,
    location_desc   TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance requests
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pothole_id      UUID REFERENCES potholes(id) ON DELETE SET NULL,
    inspection_id   UUID REFERENCES inspections(id) ON DELETE SET NULL,
    title           TEXT NOT NULL,
    description     TEXT,
    priority        VARCHAR(10) DEFAULT 'Medium' CHECK (priority IN ('Low','Medium','High','Critical')),
    status          VARCHAR(20) DEFAULT 'detected' CHECK (status IN ('detected','reported','assigned','in_progress','resolved')),
    assigned_to     VARCHAR(120),
    assigned_team   VARCHAR(120),
    estimated_cost  NUMERIC(12,2),
    actual_cost     NUMERIC(12,2),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    resolved_at     TIMESTAMPTZ
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    type        VARCHAR(30) NOT NULL,
    title       VARCHAR(255) NOT NULL,
    message     TEXT,
    is_read     BOOLEAN DEFAULT FALSE,
    linked_id   UUID,
    linked_type VARCHAR(30),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Audit log
CREATE TABLE IF NOT EXISTS audit_logs (
    id          BIGSERIAL PRIMARY KEY,
    user_id     UUID REFERENCES users(id) ON DELETE SET NULL,
    action      VARCHAR(60) NOT NULL,
    entity_type VARCHAR(40),
    entity_id   UUID,
    meta        JSONB,
    ip_address  VARCHAR(45),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inspections_user   ON inspections(user_id);
CREATE INDEX IF NOT EXISTS idx_detections_insp    ON detections(inspection_id);
CREATE INDEX IF NOT EXISTS idx_potholes_insp      ON potholes(inspection_id);
CREATE INDEX IF NOT EXISTS idx_maint_pothole      ON maintenance_requests(pothole_id);
CREATE INDEX IF NOT EXISTS idx_notif_user         ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_user         ON audit_logs(user_id);
