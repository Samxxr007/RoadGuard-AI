// ============================================================
// RoadGuard AI — Core Type Definitions
// ============================================================

export type UserRole = 'admin' | 'inspector' | 'maintenance' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  lastLogin?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================================
// Camera Types
// ============================================================

export type CameraStatus = 'online' | 'offline' | 'maintenance';

export interface Camera {
  id: string;
  name: string;
  location: string;
  district: string;
  lat: number;
  lng: number;
  status: CameraStatus;
  roadName: string;
  roadId: string;
  resolution: string;
  fps: number;
  installDate: string;
  lastActive: string;
  totalDetections: number;
  coverageAreaM2: number;
  ipAddress: string;
}

// ============================================================
// Road Types
// ============================================================

export type RoadHealthCategory = 'excellent' | 'good' | 'fair' | 'critical';

export interface Road {
  id: string;
  name: string;
  district: string;
  lengthKm: number;
  widthM: number;
  healthScore: number;
  healthCategory: RoadHealthCategory;
  lastInspection: string;
  nextInspection: string;
  totalDamages: number;
  activeDamages: number;
  completedRepairs: number;
  pendingRepairs: number;
  estimatedRepairCost: number;
  trafficDensity: 'low' | 'medium' | 'high' | 'very_high';
  roadType: 'arterial' | 'collector' | 'local' | 'highway';
  surface: 'asphalt' | 'concrete' | 'gravel';
  cameras: string[];
  lat: number;
  lng: number;
  coordinates: [number, number][];
}

// ============================================================
// Detection Types
// ============================================================

export type DamageType =
  | 'pothole'
  | 'longitudinal_crack'
  | 'transverse_crack'
  | 'alligator_crack'
  | 'edge_crack'
  | 'surface_wear'
  | 'rutting';

export type DamageSeverity = 'minor' | 'moderate' | 'severe' | 'critical';

export type RepairStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'verified';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Detection {
  id: string;
  cameraId: string;
  cameraName: string;
  roadId: string;
  roadName: string;
  district: string;
  timestamp: string;
  lat: number;
  lng: number;
  damageType: DamageType;
  confidence: number;
  severity: DamageSeverity;
  boundingBox: BoundingBox;
  repairStatus: RepairStatus;
  imageUrl?: string;
  areaM2: number;
  estimatedCost: number;
  priorityScore: number;
  observationCount: number;
  ticketId?: string;
  notes?: string;
}

// ============================================================
// Maintenance Types
// ============================================================

export type TicketStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface MaintenanceTicket {
  id: string;
  detectionId: string;
  roadId: string;
  roadName: string;
  district: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  damageType: DamageType;
  severity: DamageSeverity;
  estimatedCost: number;
  actualCost?: number;
  estimatedDuration: number; // hours
  assignedTo?: string;
  assignedTeam?: string;
  createdAt: string;
  updatedAt: string;
  scheduledDate?: string;
  completedAt?: string;
  lat: number;
  lng: number;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  isVerified?: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
}

// ============================================================
// Analytics Types
// ============================================================

export interface MonthlyDamageTrend {
  month: string;
  potholes: number;
  cracks: number;
  surfaceWear: number;
  rutting: number;
  total: number;
}

export interface DamageTypeDistribution {
  type: DamageType;
  label: string;
  count: number;
  percentage: number;
  avgSeverity: number;
}

export interface DistrictComparison {
  district: string;
  healthScore: number;
  totalDamages: number;
  repairCost: number;
  completedRepairs: number;
}

export interface ModelMetrics {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  mAP: number;
  iou: number;
  fps: number;
  inferenceMs: number;
}

// ============================================================
// Dashboard Types
// ============================================================

export interface DashboardStats {
  totalRoads: number;
  totalCameras: number;
  onlineCameras: number;
  totalDetections: number;
  activeDetections: number;
  criticalDetections: number;
  averageHealthScore: number;
  pendingRepairs: number;
  completedRepairs: number;
  totalRepairCost: number;
  budgetUtilization: number;
  monthlyDetections: number;
  detectionChangePercent: number;
  healthScoreChange: number;
}

// ============================================================
// Citizen Report Types
// ============================================================

export type CitizenReportStatus = 'submitted' | 'reviewed' | 'merged' | 'rejected';

export interface CitizenReport {
  id: string;
  reporterName: string;
  reporterContact: string;
  description: string;
  lat: number;
  lng: number;
  address: string;
  imageUrl?: string;
  damageType?: DamageType;
  severity?: DamageSeverity;
  status: CitizenReportStatus;
  submittedAt: string;
  mergedDetectionId?: string;
  aiVerified: boolean;
  upvotes: number;
}

// ============================================================
// Notification Types
// ============================================================

export type NotificationType = 'critical_damage' | 'ticket_update' | 'repair_complete' | 'system' | 'alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  severity?: DamageSeverity;
  linkedId?: string;
  linkedType?: 'detection' | 'ticket' | 'road';
}

// ============================================================
// Map Types
// ============================================================

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'camera' | 'detection' | 'road';
  label: string;
  status?: string;
  severity?: DamageSeverity;
  data: Camera | Detection | Road;
}

// ============================================================
// Chart / Filter Types
// ============================================================

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FilterState {
  dateRange?: DateRange;
  severity?: DamageSeverity[];
  damageType?: DamageType[];
  district?: string[];
  status?: string[];
  search?: string;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
