import { format, formatDistanceToNow, parseISO } from 'date-fns';
import type { DamageType, DamageSeverity, RoadHealthCategory, TicketPriority, TicketStatus } from '../types';

export const formatDate = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy');
  } catch {
    return dateStr;
  }
};

export const formatDateTime = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), 'MMM dd, yyyy HH:mm');
  } catch {
    return dateStr;
  }
};

export const formatRelativeTime = (dateStr: string): string => {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatPercent = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatConfidence = (confidence: number): string => {
  return `${(confidence * 100).toFixed(1)}%`;
};

export const getDamageTypeLabel = (type: DamageType): string => {
  const labels: Record<DamageType, string> = {
    pothole: 'Pothole',
    longitudinal_crack: 'Longitudinal Crack',
    transverse_crack: 'Transverse Crack',
    alligator_crack: 'Alligator Crack',
    edge_crack: 'Edge Crack',
    surface_wear: 'Surface Wear',
    rutting: 'Rutting',
  };
  return labels[type] || type;
};

export const getSeverityLabel = (severity: DamageSeverity): string => {
  const labels: Record<DamageSeverity, string> = {
    minor: 'Minor',
    moderate: 'Moderate',
    severe: 'Severe',
    critical: 'Critical',
  };
  return labels[severity];
};

export const getSeverityColor = (severity: DamageSeverity): string => {
  const colors: Record<DamageSeverity, string> = {
    minor: '#10b981',
    moderate: '#f59e0b',
    severe: '#f97316',
    critical: '#ef4444',
  };
  return colors[severity];
};

export const getSeverityBgClass = (severity: DamageSeverity): string => {
  const classes: Record<DamageSeverity, string> = {
    minor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    severe: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return classes[severity];
};

export const getHealthCategoryColor = (category: RoadHealthCategory): string => {
  const colors: Record<RoadHealthCategory, string> = {
    excellent: '#10b981',
    good: '#3b82f6',
    fair: '#f59e0b',
    critical: '#ef4444',
  };
  return colors[category];
};

export const getHealthCategory = (score: number): RoadHealthCategory => {
  if (score >= 90) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'fair';
  return 'critical';
};

export const getPriorityClass = (priority: TicketPriority): string => {
  const classes: Record<TicketPriority, string> = {
    low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return classes[priority];
};

export const getStatusClass = (status: TicketStatus): string => {
  const classes: Record<TicketStatus, string> = {
    open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    assigned: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    in_progress: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };
  return classes[status];
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
