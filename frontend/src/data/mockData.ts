import type {
  Camera, Road, Detection, MaintenanceTicket, CitizenReport,
  DashboardStats, MonthlyDamageTrend, DamageTypeDistribution,
  DistrictComparison, ModelMetrics, Notification, User,
  DamageSeverity, TicketStatus, TicketPriority, CitizenReportStatus
} from '../types';
import { DAMAGE_TYPES, DISTRICTS, REPAIR_COST_PER_SQM, SEVERITY_MULTIPLIER, MOCK_CITY_CENTER } from '../utils/constants';
import { getHealthCategory } from '../utils/format';

// Seeded random for deterministic mock data
let seed = 42;
const seededRandom = () => {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
};

const randomBetween = (min: number, max: number) =>
  Math.floor(seededRandom() * (max - min + 1)) + min;

const randomFrom = <T>(arr: readonly T[] | T[]): T => arr[Math.floor(seededRandom() * arr.length)];

const randomOffset = (base: number, range: number) =>
  base + (seededRandom() - 0.5) * range;

// ============================================================
// Users
// ============================================================

export const MOCK_USERS: User[] = [
  {
    id: 'u001',
    name: 'Admin Kumar',
    email: 'admin@roadguard.ai',
    role: 'admin',
    department: 'Municipality Administration',
    lastLogin: '2026-07-13T08:00:00Z',
    isActive: true,
  },
  {
    id: 'u002',
    name: 'Inspector Sharma',
    email: 'inspector@roadguard.ai',
    role: 'inspector',
    department: 'Road Inspection Division',
    lastLogin: '2026-07-13T07:30:00Z',
    isActive: true,
  },
  {
    id: 'u003',
    name: 'Maintenance Patel',
    email: 'maintenance@roadguard.ai',
    role: 'maintenance',
    department: 'Road Maintenance Team',
    lastLogin: '2026-07-12T16:45:00Z',
    isActive: true,
  },
  {
    id: 'u004',
    name: 'Public Viewer',
    email: 'viewer@roadguard.ai',
    role: 'viewer',
    department: 'Public Portal',
    lastLogin: '2026-07-11T10:00:00Z',
    isActive: true,
  },
];

export const DEMO_CREDENTIALS = [
  { email: 'admin@roadguard.ai', password: 'admin123', role: 'admin' },
  { email: 'inspector@roadguard.ai', password: 'inspect123', role: 'inspector' },
  { email: 'maintenance@roadguard.ai', password: 'maintain123', role: 'maintenance' },
  { email: 'viewer@roadguard.ai', password: 'view123', role: 'viewer' },
];

// ============================================================
// Cameras
// ============================================================

const CAMERA_LOCATIONS = [
  { name: 'Andheri Junction', district: 'West District', road: 'Western Express Highway' },
  { name: 'Bandra Reclamation', district: 'West District', road: 'Linking Road' },
  { name: 'Dadar TT', district: 'Central District', road: 'Dr. Babasaheb Ambedkar Road' },
  { name: 'Kurla Station', district: 'Central District', road: 'LBS Marg' },
  { name: 'Ghatkopar East', district: 'East District', road: 'Eastern Express Highway' },
  { name: 'Mulund Check Naka', district: 'Northeast District', road: 'LBS Road' },
  { name: 'Borivali National Park', district: 'North District', road: 'Western Express Highway' },
  { name: 'Chembur Colony', district: 'Southeast District', road: 'Sion-Panvel Highway' },
  { name: 'Worli Sea Face', district: 'South District', road: 'Worli Sea Link Approach' },
  { name: 'Colaba Causeway', district: 'South District', road: 'Shahid Bhagat Singh Road' },
  { name: 'Thane Creek', district: 'East District', road: 'Thane-Belapur Road' },
  { name: 'Mankhurd MIDC', district: 'Southeast District', road: 'MIDC Industrial Area' },
];

export const MOCK_CAMERAS: Camera[] = CAMERA_LOCATIONS.map((loc, i) => ({
  id: `cam${String(i + 1).padStart(3, '0')}`,
  name: `CCTV-${String(i + 1).padStart(3, '0')} ${loc.name}`,
  location: loc.name,
  district: loc.district,
  lat: randomOffset(MOCK_CITY_CENTER.lat, 0.15),
  lng: randomOffset(MOCK_CITY_CENTER.lng, 0.15),
  status: i < 9 ? 'online' : i === 9 ? 'maintenance' : 'offline',
  roadName: loc.road,
  roadId: `road${String(i + 1).padStart(3, '0')}`,
  resolution: '1920x1080',
  fps: 30,
  installDate: `2023-0${(i % 9) + 1}-15`,
  lastActive: '2026-07-13T08:10:00Z',
  totalDetections: randomBetween(50, 450),
  coverageAreaM2: randomBetween(200, 800),
  ipAddress: `192.168.1.${100 + i}`,
}));

// ============================================================
// Roads
// ============================================================

const ROAD_NAMES = [
  'Western Express Highway', 'Eastern Express Highway', 'Linking Road',
  'Dr. Babasaheb Ambedkar Road', 'LBS Marg', 'Sion-Panvel Highway',
  'Worli Sea Link Approach', 'Shahid Bhagat Singh Road', 'Thane-Belapur Road',
  'MIDC Industrial Area', 'Juhu Tara Road', 'Carter Road',
  'Jogeshwari-Vikhroli Link Road', 'Santacruz-Chembur Link Road', 'Bandra-Kurla Complex Road',
];

export const MOCK_ROADS: Road[] = ROAD_NAMES.map((name, i) => {
  const healthScore = randomBetween(25, 98);
  const totalDamages = randomBetween(5, 120);
  const completedRepairs = randomBetween(0, Math.floor(totalDamages * 0.7));
  const activeDamages = totalDamages - completedRepairs;
  const pendingRepairs = Math.floor(activeDamages * 0.6);
  const lengthKm = randomBetween(2, 25);
  const widthM = randomBetween(6, 30);

  return {
    id: `road${String(i + 1).padStart(3, '0')}`,
    name,
    district: randomFrom(DISTRICTS),
    lengthKm,
    widthM,
    healthScore,
    healthCategory: getHealthCategory(healthScore),
    lastInspection: `2026-0${randomBetween(1, 7)}-${randomBetween(1, 28)}`,
    nextInspection: `2026-0${randomBetween(8, 12)}-${randomBetween(1, 28)}`,
    totalDamages,
    activeDamages,
    completedRepairs,
    pendingRepairs,
    estimatedRepairCost: activeDamages * randomBetween(15000, 80000),
    trafficDensity: randomFrom(['low', 'medium', 'high', 'very_high'] as const),
    roadType: randomFrom(['arterial', 'collector', 'local', 'highway'] as const),
    surface: randomFrom(['asphalt', 'concrete', 'gravel'] as const),
    cameras: [`cam${String(i + 1).padStart(3, '0')}`],
    lat: randomOffset(MOCK_CITY_CENTER.lat, 0.15),
    lng: randomOffset(MOCK_CITY_CENTER.lng, 0.15),
    coordinates: Array.from({ length: 5 }, () => [
      randomOffset(MOCK_CITY_CENTER.lat, 0.05),
      randomOffset(MOCK_CITY_CENTER.lng, 0.05),
    ]),
  };
});

// ============================================================
// Detections
// ============================================================

const SEVERITIES: DamageSeverity[] = ['minor', 'moderate', 'severe', 'critical'];

export const MOCK_DETECTIONS: Detection[] = Array.from({ length: 120 }, (_, i) => {
  const damageType = randomFrom(DAMAGE_TYPES);
  const severity = randomFrom(SEVERITIES);
  const areaM2 = seededRandom() * 4 + 0.1;
  const baseCost = REPAIR_COST_PER_SQM[damageType] || 5000;
  const cost = Math.round(baseCost * areaM2 * (SEVERITY_MULTIPLIER[severity] || 1));
  const camera = randomFrom(MOCK_CAMERAS);
  const road = randomFrom(MOCK_ROADS);
  const confidence = 0.7 + seededRandom() * 0.29;
  const observationCount = randomBetween(1, 15);
  const month = randomBetween(1, 7);
  const day = randomBetween(1, 28);
  const hour = randomBetween(0, 23);

  return {
    id: `det${String(i + 1).padStart(4, '0')}`,
    cameraId: camera.id,
    cameraName: camera.name,
    roadId: road.id,
    roadName: road.name,
    district: road.district,
    timestamp: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(randomBetween(0, 59)).padStart(2, '0')}:00Z`,
    lat: randomOffset(MOCK_CITY_CENTER.lat, 0.1),
    lng: randomOffset(MOCK_CITY_CENTER.lng, 0.1),
    damageType,
    confidence,
    severity,
    boundingBox: {
      x: randomBetween(50, 800),
      y: randomBetween(50, 400),
      width: randomBetween(50, 300),
      height: randomBetween(30, 200),
    },
    repairStatus: randomFrom(['pending', 'scheduled', 'in_progress', 'completed', 'verified'] as const),
    areaM2,
    estimatedCost: cost,
    priorityScore: randomBetween(20, 100),
    observationCount,
    ticketId: observationCount >= 3 ? `tkt${String(i + 1).padStart(4, '0')}` : undefined,
    notes: i % 5 === 0 ? 'Requires urgent attention — high traffic area.' : undefined,
  };
});

// ============================================================
// Maintenance Tickets
// ============================================================

const TEAM_NAMES = ['Alpha Team', 'Bravo Team', 'Charlie Team', 'Delta Team', 'Echo Team'];
const WORKER_NAMES = ['Raj Mehta', 'Priya Sharma', 'Amit Patel', 'Sunita Rao', 'Kiran Nair', 'Deepak Gupta'];
const TICKET_STATUSES: TicketStatus[] = ['open', 'assigned', 'in_progress', 'completed', 'closed'];
const TICKET_PRIORITIES: TicketPriority[] = ['low', 'medium', 'high', 'critical'];

export const MOCK_TICKETS: MaintenanceTicket[] = Array.from({ length: 40 }, (_, i) => {
  const detection = MOCK_DETECTIONS[i];
  const status = randomFrom(TICKET_STATUSES);
  const priority = detection.severity === 'critical' ? 'critical' :
    detection.severity === 'severe' ? 'high' :
    detection.severity === 'moderate' ? 'medium' : 'low';

  return {
    id: `tkt${String(i + 1).padStart(4, '0')}`,
    detectionId: detection.id,
    roadId: detection.roadId,
    roadName: detection.roadName,
    district: detection.district,
    title: `${detection.severity.charAt(0).toUpperCase() + detection.severity.slice(1)} ${detection.damageType.replace(/_/g, ' ')} repair`,
    description: `Detected ${detection.damageType.replace(/_/g, ' ')} with ${(detection.confidence * 100).toFixed(1)}% confidence. Estimated area: ${detection.areaM2.toFixed(2)} m². Priority repair required.`,
    priority: priority as TicketPriority,
    status,
    damageType: detection.damageType,
    severity: detection.severity,
    estimatedCost: detection.estimatedCost,
    actualCost: status === 'completed' || status === 'closed' ? Math.round(detection.estimatedCost * (0.85 + seededRandom() * 0.3)) : undefined,
    estimatedDuration: randomBetween(2, 48),
    assignedTo: status !== 'open' ? randomFrom(WORKER_NAMES) : undefined,
    assignedTeam: status !== 'open' ? randomFrom(TEAM_NAMES) : undefined,
    createdAt: detection.timestamp,
    updatedAt: `2026-07-${randomBetween(1, 13)}T${randomBetween(6, 18)}:00:00Z`,
    scheduledDate: status !== 'open' ? `2026-07-${randomBetween(14, 31)}` : undefined,
    completedAt: (status === 'completed' || status === 'closed') ? `2026-07-${randomBetween(5, 12)}T14:00:00Z` : undefined,
    lat: detection.lat,
    lng: detection.lng,
    isVerified: status === 'closed',
    verifiedAt: status === 'closed' ? `2026-07-${randomBetween(10, 13)}T10:00:00Z` : undefined,
    verifiedBy: status === 'closed' ? randomFrom(WORKER_NAMES) : undefined,
  };
});

// ============================================================
// Dashboard Stats
// ============================================================

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalRoads: MOCK_ROADS.length,
  totalCameras: MOCK_CAMERAS.length,
  onlineCameras: MOCK_CAMERAS.filter(c => c.status === 'online').length,
  totalDetections: MOCK_DETECTIONS.length,
  activeDetections: MOCK_DETECTIONS.filter(d => d.repairStatus === 'pending' || d.repairStatus === 'scheduled').length,
  criticalDetections: MOCK_DETECTIONS.filter(d => d.severity === 'critical').length,
  averageHealthScore: Math.round(MOCK_ROADS.reduce((a, r) => a + r.healthScore, 0) / MOCK_ROADS.length),
  pendingRepairs: MOCK_TICKETS.filter(t => t.status === 'open' || t.status === 'assigned').length,
  completedRepairs: MOCK_TICKETS.filter(t => t.status === 'completed' || t.status === 'closed').length,
  totalRepairCost: MOCK_DETECTIONS.reduce((a, d) => a + d.estimatedCost, 0),
  budgetUtilization: 67.4,
  monthlyDetections: 34,
  detectionChangePercent: 12.5,
  healthScoreChange: -3.2,
};

// ============================================================
// Analytics Data
// ============================================================

export const MONTHLY_DAMAGE_TRENDS: MonthlyDamageTrend[] = [
  { month: 'Jan', potholes: 12, cracks: 18, surfaceWear: 8, rutting: 5, total: 43 },
  { month: 'Feb', potholes: 15, cracks: 21, surfaceWear: 10, rutting: 6, total: 52 },
  { month: 'Mar', potholes: 22, cracks: 25, surfaceWear: 14, rutting: 9, total: 70 },
  { month: 'Apr', potholes: 18, cracks: 19, surfaceWear: 12, rutting: 7, total: 56 },
  { month: 'May', potholes: 28, cracks: 32, surfaceWear: 18, rutting: 11, total: 89 },
  { month: 'Jun', potholes: 35, cracks: 28, surfaceWear: 22, rutting: 14, total: 99 },
  { month: 'Jul', potholes: 20, cracks: 15, surfaceWear: 11, rutting: 8, total: 54 },
];

export const DAMAGE_TYPE_DISTRIBUTION: DamageTypeDistribution[] = [
  { type: 'pothole', label: 'Pothole', count: 42, percentage: 35.0, avgSeverity: 2.8 },
  { type: 'alligator_crack', label: 'Alligator Crack', count: 25, percentage: 20.8, avgSeverity: 2.5 },
  { type: 'longitudinal_crack', label: 'Longitudinal Crack', count: 18, percentage: 15.0, avgSeverity: 1.8 },
  { type: 'transverse_crack', label: 'Transverse Crack', count: 15, percentage: 12.5, avgSeverity: 1.9 },
  { type: 'surface_wear', label: 'Surface Wear', count: 10, percentage: 8.3, avgSeverity: 1.5 },
  { type: 'rutting', label: 'Rutting', count: 6, percentage: 5.0, avgSeverity: 2.2 },
  { type: 'edge_crack', label: 'Edge Crack', count: 4, percentage: 3.3, avgSeverity: 1.4 },
];

export const DISTRICT_COMPARISON: DistrictComparison[] = DISTRICTS.map((district, i) => ({
  district: district.replace(' District', ''),
  healthScore: randomBetween(42, 95),
  totalDamages: randomBetween(10, 80),
  repairCost: randomBetween(500000, 5000000),
  completedRepairs: randomBetween(5, 50),
}));

export const MODEL_METRICS: ModelMetrics[] = [
  {
    model: 'YOLOv11 (Ours)',
    accuracy: 94.2,
    precision: 93.8,
    recall: 91.5,
    f1Score: 92.6,
    mAP: 91.3,
    iou: 0.847,
    fps: 28.4,
    inferenceMs: 35.2,
  },
  {
    model: 'YOLOv8',
    accuracy: 91.7,
    precision: 90.2,
    recall: 88.9,
    f1Score: 89.5,
    mAP: 88.1,
    iou: 0.823,
    fps: 31.2,
    inferenceMs: 32.1,
  },
  {
    model: 'EfficientDet-D4',
    accuracy: 89.3,
    precision: 88.1,
    recall: 86.4,
    f1Score: 87.2,
    mAP: 85.9,
    iou: 0.798,
    fps: 18.7,
    inferenceMs: 53.5,
  },
  {
    model: 'EfficientNet-B7',
    accuracy: 86.5,
    precision: 85.4,
    recall: 83.2,
    f1Score: 84.3,
    mAP: 82.7,
    iou: 0.769,
    fps: 14.2,
    inferenceMs: 70.4,
  },
];

// ============================================================
// Citizen Reports
// ============================================================

export const MOCK_CITIZEN_REPORTS: CitizenReport[] = Array.from({ length: 20 }, (_, i) => ({
  id: `rpt${String(i + 1).padStart(3, '0')}`,
  reporterName: randomFrom(['Rahul Joshi', 'Meera Iyer', 'Suresh Nambiar', 'Anjali Singh', 'Vikram Malhotra']),
  reporterContact: `98${randomBetween(10000000, 99999999)}`,
  description: randomFrom([
    'Large pothole causing vehicle damage near traffic signal',
    'Road has multiple cracks spreading across the lane',
    'Surface completely worn out, becomes dangerous in rain',
    'Deep ruts on road causing vehicle skidding',
    'Edge of road breaking away near drain',
  ]),
  lat: randomOffset(MOCK_CITY_CENTER.lat, 0.12),
  lng: randomOffset(MOCK_CITY_CENTER.lng, 0.12),
  address: randomFrom(CAMERA_LOCATIONS).name,
  damageType: randomFrom(DAMAGE_TYPES),
  severity: randomFrom(SEVERITIES),
  status: randomFrom(['submitted', 'reviewed', 'merged', 'rejected'] as CitizenReportStatus[]),
  submittedAt: `2026-0${randomBetween(5, 7)}-${randomBetween(1, 30)}T${randomBetween(8, 20)}:00:00Z`,
  mergedDetectionId: i % 3 === 0 ? `det${String(i + 1).padStart(4, '0')}` : undefined,
  aiVerified: i % 4 !== 0,
  upvotes: randomBetween(0, 45),
}));

// ============================================================
// Notifications
// ============================================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n001', type: 'critical_damage', title: 'Critical Pothole Detected', message: 'CCTV-003 detected a critical pothole on Western Express Highway. Immediate action required.', timestamp: '2026-07-13T08:05:00Z', isRead: false, severity: 'critical', linkedId: 'det0045', linkedType: 'detection' },
  { id: 'n002', type: 'ticket_update', title: 'Ticket Assigned', message: 'Ticket TKT-0012 has been assigned to Alpha Team for repair.', timestamp: '2026-07-13T07:45:00Z', isRead: false, linkedId: 'tkt0012', linkedType: 'ticket' },
  { id: 'n003', type: 'repair_complete', title: 'Repair Verified', message: 'Repair on Linking Road (TKT-0008) has been verified complete by Inspector Sharma.', timestamp: '2026-07-13T06:30:00Z', isRead: true, linkedId: 'tkt0008', linkedType: 'ticket' },
  { id: 'n004', type: 'critical_damage', title: 'Alligator Crack Alert', message: 'Multiple alligator cracks detected on LBS Marg. Health score dropped to 38.', timestamp: '2026-07-12T22:15:00Z', isRead: true, severity: 'critical' },
  { id: 'n005', type: 'system', title: 'Camera CCTV-011 Offline', message: 'Camera at Mankhurd MIDC went offline at 22:00. Please check connectivity.', timestamp: '2026-07-12T22:02:00Z', isRead: true },
  { id: 'n006', type: 'alert', title: 'Monthly Report Ready', message: 'June 2026 road damage report is ready. 99 total detections recorded.', timestamp: '2026-07-01T09:00:00Z', isRead: true },
];

// ============================================================
// Live Detection Stream Simulation
// ============================================================

export const generateLiveDetection = (): Detection => {
  const camera = randomFrom(MOCK_CAMERAS);
  const damageType = randomFrom(DAMAGE_TYPES);
  const severity = randomFrom(SEVERITIES);
  const now = new Date().toISOString();
  const areaM2 = Math.random() * 3 + 0.1;

  return {
    id: `live-${Date.now()}`,
    cameraId: camera.id,
    cameraName: camera.name,
    roadId: camera.roadId,
    roadName: camera.roadName,
    district: camera.district,
    timestamp: now,
    lat: camera.lat + (Math.random() - 0.5) * 0.01,
    lng: camera.lng + (Math.random() - 0.5) * 0.01,
    damageType,
    confidence: 0.72 + Math.random() * 0.27,
    severity,
    boundingBox: { x: 100 + Math.random() * 600, y: 80 + Math.random() * 300, width: 60 + Math.random() * 200, height: 40 + Math.random() * 150 },
    repairStatus: 'pending' as const,
    areaM2,
    estimatedCost: Math.round((REPAIR_COST_PER_SQM[damageType] || 5000) * areaM2),
    priorityScore: Math.floor(Math.random() * 100),
    observationCount: 1,
  };
};

// Road Health prediction data
export const HEALTH_PREDICTION_DATA = MOCK_ROADS.slice(0, 6).map(road => ({
  roadId: road.id,
  roadName: road.name,
  currentScore: road.healthScore,
  predicted3Months: Math.max(10, road.healthScore - randomBetween(5, 20)),
  predicted6Months: Math.max(5, road.healthScore - randomBetween(15, 35)),
  predicted12Months: Math.max(0, road.healthScore - randomBetween(25, 50)),
  riskLevel: road.healthScore < 50 ? 'high' : road.healthScore < 70 ? 'medium' : 'low',
}));

export const BUDGET_DATA = [
  { month: 'Jan', planned: 2500000, actual: 2100000 },
  { month: 'Feb', planned: 3000000, actual: 2850000 },
  { month: 'Mar', planned: 4500000, actual: 5100000 },
  { month: 'Apr', planned: 3800000, actual: 3600000 },
  { month: 'May', planned: 5000000, actual: 4800000 },
  { month: 'Jun', planned: 4200000, actual: 4900000 },
  { month: 'Jul', planned: 3500000, actual: 2100000 },
];
