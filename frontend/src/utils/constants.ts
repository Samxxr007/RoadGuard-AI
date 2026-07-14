import type { DamageType } from '../types';

export const DAMAGE_TYPES: DamageType[] = [
  'pothole',
  'longitudinal_crack',
  'transverse_crack',
  'alligator_crack',
  'edge_crack',
  'surface_wear',
  'rutting',
];

export const DISTRICTS = [
  'Central District',
  'North District',
  'South District',
  'East District',
  'West District',
  'Northeast District',
  'Northwest District',
  'Southeast District',
];

export const REPAIR_COST_PER_SQM: Record<string, number> = {
  pothole: 8500,
  longitudinal_crack: 3200,
  transverse_crack: 3200,
  alligator_crack: 12000,
  edge_crack: 4500,
  surface_wear: 6000,
  rutting: 9500,
};

export const SEVERITY_MULTIPLIER: Record<string, number> = {
  minor: 1.0,
  moderate: 1.5,
  severe: 2.2,
  critical: 3.5,
};

export const MOCK_CITY_CENTER = {
  lat: 19.0760,
  lng: 72.8777,
  name: 'Mumbai',
};

export const HEALTH_SCORE_THRESHOLDS = {
  excellent: 90,
  good: 70,
  fair: 50,
  critical: 0,
};

export const CHART_COLORS = [
  '#3b82f6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#f97316',
  '#ef4444',
  '#7c3aed',
  '#ec4899',
];

export const DAMAGE_COLORS: Record<DamageType, string> = {
  pothole: '#ef4444',
  longitudinal_crack: '#f97316',
  transverse_crack: '#f59e0b',
  alligator_crack: '#7c3aed',
  edge_crack: '#06b6d4',
  surface_wear: '#3b82f6',
  rutting: '#10b981',
};

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard', roles: ['admin', 'inspector', 'maintenance', 'viewer'] },
  { path: '/monitor', label: 'Live Monitor', icon: 'Monitor', roles: ['admin', 'inspector'] },
  { path: '/roads', label: 'Roads', icon: 'Road', roles: ['admin', 'inspector', 'maintenance', 'viewer'] },
  { path: '/detections', label: 'Detections', icon: 'Scan', roles: ['admin', 'inspector', 'maintenance'] },
  { path: '/maintenance', label: 'Maintenance', icon: 'Wrench', roles: ['admin', 'inspector', 'maintenance'] },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3', roles: ['admin', 'inspector', 'viewer'] },
  { path: '/cameras', label: 'Cameras', icon: 'Camera', roles: ['admin', 'inspector'] },
  { path: '/reports', label: 'Reports', icon: 'FileText', roles: ['admin', 'inspector'] },
  { path: '/research', label: 'Research', icon: 'FlaskConical', roles: ['admin', 'inspector', 'viewer'] },
  { path: '/citizens', label: 'Citizens', icon: 'Users', roles: ['admin', 'inspector', 'viewer'] },
  { path: '/settings', label: 'Settings', icon: 'Settings', roles: ['admin', 'inspector', 'maintenance', 'viewer'] },
];
