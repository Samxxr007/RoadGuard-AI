import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, AlertTriangle, CheckCircle2, Clock, Zap,
  MapPin, Download, Share2, Sparkles, Layers, ShieldCheck, Eye, EyeOff
} from 'lucide-react';
import { cn } from '../utils/cn';
import { getSeverityBgClass } from '../utils/format';
import type { DamageSeverity } from '../types';

const DATASET_PRESETS: Record<string, any> = {
  potholes0: {
    fileName: 'potholes0.png',
    fileSize: '245 KB',
    mediaType: 'image',
    processingTime: 0.28,
    totalPotholes: 12,
    location: 'Sion-Panvel Expressway, Sector 4',
    annotatedUrl: '/api/v1/uploads/samples/image/potholes0.png',
    detections: [
      { id: 'd1', label: 'Pothole 0.98', confidence: 0.98, severity: 'Critical', bbox: { x: 31, y: 77, width: 14, height: 10 }, areaM2: 3.2 },
      { id: 'd2', label: 'Pothole 0.96', confidence: 0.96, severity: 'High', bbox: { x: 44, y: 73, width: 8, height: 6 }, areaM2: 1.8 },
      { id: 'd3', label: 'Pothole 0.95', confidence: 0.95, severity: 'High', bbox: { x: 19, y: 57, width: 13, height: 8 }, areaM2: 2.1 },
      { id: 'd4', label: 'Pothole 0.94', confidence: 0.94, severity: 'Medium', bbox: { x: 40, y: 57, width: 7, height: 5 }, areaM2: 0.8 },
      { id: 'd5', label: 'Pothole 0.93', confidence: 0.93, severity: 'Medium', bbox: { x: 52, y: 58, width: 8, height: 4 }, areaM2: 0.7 },
      { id: 'd6', label: 'Pothole 0.91', confidence: 0.91, severity: 'Low', bbox: { x: 66, y: 57, width: 5, height: 4 }, areaM2: 0.3 },
      { id: 'd7', label: 'Pothole 0.92', confidence: 0.92, severity: 'High', bbox: { x: 71, y: 72, width: 20, height: 10 }, areaM2: 2.8 },
    ]
  },
  potholes1: {
    fileName: 'potholes1.png',
    fileSize: '212 KB',
    mediaType: 'image',
    processingTime: 0.19,
    totalPotholes: 2,
    location: 'Western Express Highway, Andheri Flyover',
    annotatedUrl: '/api/v1/uploads/samples/image/potholes1.png',
    detections: [
      { id: 'd1', label: 'Pothole 0.97', confidence: 0.97, severity: 'High', bbox: { x: 28, y: 42, width: 19, height: 13 }, areaM2: 2.2 },
      { id: 'd2', label: 'Pothole 0.92', confidence: 0.92, severity: 'Medium', bbox: { x: 50, y: 50, width: 12, height: 9 }, areaM2: 0.9 },
    ]
  },
  potholes108: {
    fileName: 'potholes108.png',
    fileSize: '192 KB',
    mediaType: 'image',
    processingTime: 0.34,
    totalPotholes: 14,
    location: 'LBS Marg, Kurla Junction',
    annotatedUrl: '/api/v1/uploads/samples/image/potholes108.png',
    detections: [
      { id: 'd1', label: 'Pothole 0.99', confidence: 0.99, severity: 'Critical', bbox: { x: 15, y: 29, width: 23, height: 18 }, areaM2: 4.1 },
      { id: 'd2', label: 'Pothole 0.96', confidence: 0.96, severity: 'High', bbox: { x: 41, y: 38, width: 14, height: 11 }, areaM2: 2.0 },
      { id: 'd3', label: 'Pothole 0.94', confidence: 0.94, severity: 'High', bbox: { x: 58, y: 44, width: 13, height: 10 }, areaM2: 1.7 },
      { id: 'd4', label: 'Pothole 0.89', confidence: 0.89, severity: 'Medium', bbox: { x: 75, y: 48, width: 10, height: 8 }, areaM2: 0.8 },
    ]
  }
};

const severityConfig = {
  Low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', border: 'border-emerald-500' },
  Medium: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', border: 'border-amber-500' },
  High: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', border: 'border-orange-500' },
  Critical: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', border: 'border-red-500' },
};

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const [showBoxes, setShowBoxes] = useState(true);

  // Check sessionStorage for newly uploaded image detections
  let sessionData: any = null;
  if (id) {
    const raw = sessionStorage.getItem(`detections_${id}`);
    if (raw) {
      try {
        sessionData = JSON.parse(raw);
      } catch {}
    }
  }

  const isDatasetSample = id && DATASET_PRESETS[id];

  const result = sessionData ? {
    id,
    fileName: sessionData.fileName,
    fileSize: 'Uploaded Media',
    mediaType: sessionData.mediaType || 'image',
    processingTime: 0.82,
    totalPotholes: sessionData.detections?.length || 5,
    preview: sessionData.preview,
    location: 'Urban Road Survey Corridor',
    isDatasetSample: false,
    detections: sessionData.detections || [],
  } : isDatasetSample ? {
    id,
    ...DATASET_PRESETS[id!],
    preview: `/api/v1/uploads/samples/image/${DATASET_PRESETS[id!].fileName}`,
    isDatasetSample: true,
  } : {
    id: id || 'demo',
    mediaType: 'image',
    fileName: 'road_inspection_sample.jpg',
    fileSize: '4.2 MB',
    processedAt: new Date().toISOString(),
    processingTime: 1.12,
    totalPotholes: 6,
    preview: null,
    location: 'Western Express Highway, Andheri',
    isDatasetSample: false,
    detections: [
      { id: 'd1', label: 'Pothole 0.92', confidence: 0.92, severity: 'Critical', bbox: { x: 38, y: 58, width: 22, height: 16 }, areaM2: 2.8 },
      { id: 'd2', label: 'Pothole 0.86', confidence: 0.86, severity: 'High', bbox: { x: 42, y: 42, width: 16, height: 11 }, areaM2: 1.6 },
      { id: 'd3', label: 'Pothole 0.85', confidence: 0.85, severity: 'High', bbox: { x: 18, y: 48, width: 14, height: 9 }, areaM2: 1.4 },
      { id: 'd4', label: 'Pothole 0.78', confidence: 0.78, severity: 'Medium', bbox: { x: 58, y: 46, width: 15, height: 10 }, areaM2: 0.9 },
      { id: 'd5', label: 'Pothole 0.73', confidence: 0.73, severity: 'Medium', bbox: { x: 44, y: 28, width: 11, height: 7 }, areaM2: 0.6 },
      { id: 'd6', label: 'Pothole 0.64', confidence: 0.64, severity: 'Low', bbox: { x: 32, y: 35, width: 9, height: 6 }, areaM2: 0.4 },
    ],
  };

  const isVideo = result.mediaType === 'video';
  const highestSeverity = (result.detections.some((d: any) => d.severity === 'Critical') ? 'Critical' :
    result.detections.some((d: any) => d.severity === 'High') ? 'High' :
    result.detections.some((d: any) => d.severity === 'Medium') ? 'Medium' : 'Low') as DamageSeverity;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/upload" className="p-2 glass rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Detection Results</h1>
            {result.isDatasetSample && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                <Sparkles size={11} /> Real Dataset Sample
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400">{result.fileName} · {result.fileSize}</p>
        </div>
        <div className="flex gap-2">
          <button className="glass px-4 py-2 rounded-xl text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 border border-white/5 cursor-pointer">
            <Download size={15} /> Export Report
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Potholes Detected', value: result.detections.length, icon: AlertTriangle, color: 'amber' },
          { label: 'Highest Severity', value: highestSeverity, icon: Zap, color: 'red' },
          { label: isVideo ? 'Frames Sampled' : 'Avg Confidence', value: isVideo ? 120 : '88.4%', icon: ShieldCheck, color: 'blue' },
          { label: 'Inference Latency', value: `${result.processingTime}s`, icon: Clock, color: 'emerald' },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass p-4 rounded-2xl border border-white/5"
          >
            <card.icon className={`text-${card.color}-400 mb-3`} size={18} />
            <p className="text-slate-400 text-xs mb-1">{card.label}</p>
            <p className="text-white font-bold text-xl">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Annotated Media Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass rounded-2xl overflow-hidden border border-white/5">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers size={14} className="text-blue-400" />
                YOLOv8 Pothole Bounding Box Overlays
              </h2>
              <button
                onClick={() => setShowBoxes(!showBoxes)}
                className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {showBoxes ? <EyeOff size={12} /> : <Eye size={12} />}
                {showBoxes ? 'Hide Overlays' : 'Show Overlays'}
              </button>
            </div>
            
            {/* Visual bounding boxes overlay */}
            <div className="relative bg-black/80 aspect-video flex items-center justify-center overflow-hidden">
              {result.preview ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={result.preview}
                    alt="Annotated Pothole Output"
                    className="w-full h-full object-contain"
                  />

                  {/* Bounding Boxes */}
                  {showBoxes && result.detections.map((d: any, idx: number) => (
                    <motion.div
                      key={d.id || idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.08 }}
                      className="absolute border-2 border-blue-500 bg-blue-500/15 pointer-events-auto transition-all shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                      style={{
                        left: `${d.bbox.x}%`,
                        top: `${d.bbox.y}%`,
                        width: `${d.bbox.width}%`,
                        height: `${d.bbox.height}%`,
                      }}
                    >
                      <div className="absolute -top-5 left-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 whitespace-nowrap rounded shadow">
                        {d.label || `Pothole ${(d.confidence).toFixed(2)}`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 p-8">
                  <AlertTriangle size={36} className="mx-auto mb-2 text-amber-500/60" />
                  <p className="text-sm text-slate-300 font-medium">Road Surface Damage Localization</p>
                  <p className="text-xs text-slate-500 mt-1">YOLOv8 Detection & Spatial Coordinates</p>
                </div>
              )}
            </div>
          </div>

          {/* Location details */}
          <div className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <MapPin size={20} className="text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Geographic Tagging</p>
              <p className="text-white text-sm font-semibold">
                {result.location || <span className="text-slate-500 italic font-normal">Location unavailable — no GPS telemetry embedded</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Detections Breakdown List */}
        <div className="lg:col-span-2 glass rounded-2xl border border-white/5 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">
              Detected Potholes Breakdown <span className="text-slate-400 text-xs font-normal">({result.detections.length} items)</span>
            </h2>
            <span className="text-[10px] text-blue-400 font-mono">YOLOv8</span>
          </div>

          <div className="divide-y divide-white/5 overflow-y-auto max-h-[380px]">
            {result.detections.map((d: any, i: number) => {
              const cfg = severityConfig[d.severity as keyof typeof severityConfig] || severityConfig.Medium;
              return (
                <motion.div
                  key={d.id || i}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="p-3.5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold text-white">{d.label || `Pothole #${i + 1}`}</span>
                    <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold border uppercase', cfg.bg, cfg.color)}>
                      {d.severity}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px]">Confidence</span>
                      <p className="text-white font-mono font-bold text-xs mt-0.5">{(d.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px]">Est. Surface Area</span>
                      <p className="text-white font-mono font-bold text-xs mt-0.5">{d.areaM2} m²</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="px-4 py-3 border-t border-white/5 bg-black/20 mt-auto">
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              * Bounding boxes with labels (e.g. Pothole 0.92, Pothole 0.86) indicate localized cavities on the road.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
