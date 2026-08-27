import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Radar, AlertTriangle, CheckCircle,
  Clock, Share2, Download, Wrench, Layers,
  Plus, Minus, Maximize2, SquareDashedBottom
} from 'lucide-react';
import { cn } from '../utils/cn';

const SAMPLE_PRESETS: Record<string, any> = {
  potholes0: {
    scanId: 'RG-8892-A',
    camera: 'CAM-N-44',
    location: 'Sector 7G — Western Corridor',
    totalFound: 7,
    highestSeverity: 'Critical',
    avgConfidence: '94.2%',
    latency: '0.21s',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    detections: [
      { id: 'ID-992', severity: 'Critical', areaM2: 2.4, conf: '98.1%', x: 45, y: 30, w: 22, h: 18 },
      { id: 'ID-993', severity: 'High', areaM2: 1.1, conf: '88.4%', x: 20, y: 60, w: 18, h: 16 },
      { id: 'ID-994', severity: 'Medium', areaM2: 0.8, conf: '92.0%', x: 65, y: 75, w: 24, h: 14 },
      { id: 'ID-995', severity: 'Low', areaM2: 0.2, conf: '76.5%', x: 40, y: 50, w: 12, h: 10 },
      { id: 'ID-996', severity: 'Low', areaM2: 0.15, conf: '62.1%', x: 75, y: 40, w: 10, h: 8 },
    ]
  }
};

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const [showOverlay, setShowOverlay] = useState(true);

  // Retrieve data from preset or session
  let data = SAMPLE_PRESETS[id || ''] || SAMPLE_PRESETS['potholes0'];

  if (id) {
    const raw = sessionStorage.getItem(`detections_${id}`);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        data = {
          scanId: `RG-${id.slice(-6).toUpperCase()}`,
          camera: 'INSPECTION-STREAM-01',
          location: parsed.fileName || 'Uploaded Road Inspection',
          totalFound: parsed.detections?.length || 1,
          highestSeverity: parsed.detections?.[0]?.severity || 'High',
          avgConfidence: '93.8%',
          latency: '0.24s',
          imageUrl: parsed.preview || data.imageUrl,
          detections: (parsed.detections || []).map((d: any, idx: number) => ({
            id: `ID-${100 + idx}`,
            severity: d.severity || 'High',
            areaM2: d.areaM2 || 1.2,
            conf: `${((d.confidence || 0.9) * 100).toFixed(1)}%`,
            x: d.bbox?.x || 30 + idx * 15,
            y: d.bbox?.y || 40 + idx * 10,
            w: d.bbox?.width || 18,
            h: d.bbox?.height || 14,
          }))
        };
      } catch {}
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Action Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/upload"
            className="w-9 h-9 glass rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Interactive Results & Damage Breakdown</h1>
              <span className="font-mono text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">
                Scan ID: {data.scanId}
              </span>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-0.5">Telemetry from {data.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3">
            <Share2 size={14} />
            Share Telemetry
          </button>
          <button className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3">
            <Download size={14} />
            Export PDF
          </button>
          <Link to="/maintenance" className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4 shadow-glow-blue">
            <Wrench size={14} />
            Create Maintenance Ticket
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="glass p-4 rounded-2xl border border-white/10 relative overflow-hidden">
          <div className="text-slate-400 font-mono text-xs mb-1 flex items-center gap-1.5">
            <Radar size={14} className="text-blue-400" />
            Total Found
          </div>
          <div className="font-mono text-3xl font-bold text-white">
            {String(data.totalFound).padStart(2, '0')}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
        </div>

        {/* KPI 2 */}
        <div className="glass p-4 rounded-2xl border border-red-500/30 bg-red-500/5 relative overflow-hidden">
          <div className="text-slate-400 font-mono text-xs mb-1 flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-red-400" />
            Highest Severity
          </div>
          <div className="font-mono text-3xl font-bold text-red-400 flex items-center gap-2">
            {data.highestSeverity}
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-ring" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass p-4 rounded-2xl border border-white/10">
          <div className="text-slate-400 font-mono text-xs mb-1 flex items-center gap-1.5">
            <CheckCircle size={14} className="text-emerald-400" />
            Avg. Confidence
          </div>
          <div className="font-mono text-3xl font-bold text-white">
            {data.avgConfidence}
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass p-4 rounded-2xl border border-white/10">
          <div className="text-slate-400 font-mono text-xs mb-1 flex items-center gap-1.5">
            <Clock size={14} className="text-blue-400" />
            Processing Latency
          </div>
          <div className="font-mono text-3xl font-bold text-blue-400">
            {data.latency}
          </div>
        </div>
      </section>

      {/* Main Workspace Split Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px]">
        {/* Left: High-Res Annotated Media Canvas */}
        <div className="lg:col-span-8 glass rounded-2xl border border-white/10 flex flex-col overflow-hidden relative hud-glow shadow-xl min-h-[420px]">
          {/* Viewport Header */}
          <div className="h-10 border-b border-white/10 bg-bg-card/70 flex justify-between items-center px-4 shrink-0">
            <span className="font-mono text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Camera Feed: {data.camera}
            </span>
            <span className="font-mono text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
              YOLOv8 ACTIVE
            </span>
          </div>

          {/* Canvas Area */}
          <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[360px]">
            <img
              src={data.imageUrl}
              alt="Annotated Road Inspection"
              className="max-h-[460px] max-w-full w-auto h-auto object-contain block opacity-90"
            />

            {/* Tactical Grid Pattern */}
            <div className="absolute inset-0 tactical-grid pointer-events-none opacity-20" />

            {/* Bounding Box Overlays */}
            {showOverlay &&
              data.detections.map((det: any) => {
                const isCrit = det.severity === 'Critical';
                const isHigh = det.severity === 'High';

                return (
                  <motion.div
                    key={det.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute border-2 pointer-events-auto cursor-pointer transition-all ${
                      isCrit
                        ? 'border-red-500 bg-red-500/15 shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                        : isHigh
                        ? 'border-amber-500 bg-amber-500/15 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                        : 'border-blue-500 bg-blue-500/15 shadow-[0_0_12px_rgba(59,130,246,0.5)]'
                    }`}
                    style={{
                      left: `${det.x}%`,
                      top: `${det.y}%`,
                      width: `${det.w}%`,
                      height: `${det.h}%`,
                    }}
                  >
                    {/* Bounding Box Corner Crosshairs */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />

                    <div
                      className={`absolute -top-5 left-0 font-mono text-[9px] font-bold px-1.5 py-0.5 whitespace-nowrap rounded ${
                        isCrit ? 'bg-red-600 text-white' : isHigh ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {det.id} | {det.conf} | {det.severity.toUpperCase()}
                    </div>
                  </motion.div>
                );
              })}

            {/* Floating Zoom & Layer Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={() => setShowOverlay(!showOverlay)}
                className={`w-9 h-9 glass rounded-xl flex items-center justify-center transition-colors shadow-lg ${
                  showOverlay ? 'text-blue-400 border-blue-500/50' : 'text-slate-400'
                }`}
                title="Toggle Overlay Layers"
              >
                <Layers size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Detection Roster Breakdown */}
        <div className="lg:col-span-4 glass rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-lg min-h-[420px]">
          <div className="p-4 border-b border-white/10 bg-bg-card/70 flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Detection Roster</h2>
            <span className="font-mono text-xs text-slate-400">{data.detections.length} objects</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 kanban-scroll bg-bg-secondary/40 max-h-[440px]">
            {data.detections.map((det: any) => {
              const isCrit = det.severity === 'Critical';
              const isHigh = det.severity === 'High';

              return (
                <div
                  key={det.id}
                  className={`glass p-3 rounded-xl border border-white/10 relative pl-4 hover:border-blue-500/50 transition-all ${
                    isCrit ? 'border-l-4 border-l-red-500' : isHigh ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-mono text-xs font-bold text-white">{det.id}</span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        isCrit
                          ? 'bg-red-500/20 text-red-400'
                          : isHigh
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {det.severity}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <SquareDashedBottom size={12} className="text-blue-400" />
                      {det.areaM2} m²
                    </span>
                    <span className="text-white font-semibold">{det.conf} Conf.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
