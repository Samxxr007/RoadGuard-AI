import { motion } from 'framer-motion';
import {
  TrendingUp, AlertTriangle, Download, CheckCircle,
  Gauge as SpeedIcon, Activity, Zap
} from 'lucide-react';

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs mb-2">
          <Activity size={14} />
          <span>STATISTICAL FORECASTING & BENCHMARKS</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Predictive Insights</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Advanced telemetry and historical defect pattern recognition across municipal infrastructure.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Monthly Trend Chart (Line Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-12 xl:col-span-8 glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Defect Frequency Trend</h3>
              <p className="font-mono text-xs text-slate-400">Potholes detected over 12 months</p>
            </div>
            <div className="bg-bg-card px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="font-mono text-xs text-blue-400 font-bold">Live Data</span>
            </div>
          </div>

          <div className="flex-grow w-full relative min-h-[260px] tactical-grid rounded-xl border border-white/5 flex items-end pt-8 px-4 pb-8 bg-bg-secondary/40">
            {/* Y-Axis labels */}
            <div className="absolute left-3 top-4 bottom-8 flex flex-col justify-between font-mono text-[10px] text-slate-500">
              <span>500</span>
              <span>250</span>
              <span>0</span>
            </div>

            {/* Simulated Line Chart via SVG */}
            <svg className="absolute inset-0 w-full h-full pt-8 px-10 pb-8 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path d="M0,80 Q10,60 20,65 T40,40 T60,50 T80,20 T100,10 L100,100 L0,100 Z" fill="url(#chartGradient)" />
              {/* Line */}
              <path d="M0,80 Q10,60 20,65 T40,40 T60,50 T80,20 T100,10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              {/* Data Points */}
              <circle cx="20" cy="65" fill="#3b82f6" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="40" cy="40" fill="#3b82f6" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="60" cy="50" fill="#3b82f6" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="80" cy="20" fill="#3b82f6" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="100" cy="10" fill="#3b82f6" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>

            {/* X-Axis labels */}
            <div className="absolute bottom-1.5 left-10 right-4 flex justify-between font-mono text-[10px] text-slate-400">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
          </div>
        </motion.div>

        {/* Damage Distribution (Donut Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="col-span-12 xl:col-span-4 glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-between shadow-lg"
        >
          <div>
            <h3 className="text-lg font-bold text-white">Damage Distribution</h3>
            <p className="font-mono text-xs text-slate-400">Categorized anomaly breakdown</p>
          </div>

          <div className="relative flex justify-center items-center my-6">
            <svg className="transform -rotate-90" height="190" viewBox="0 0 42 42" width="190">
              {/* Background ring */}
              <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#1e293b" strokeWidth="5.5" />
              {/* Potholes 60% */}
              <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#3b82f6" strokeDasharray="60 40" strokeDashoffset="0" strokeWidth="5.5" />
              {/* Cracks 30% */}
              <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#06b6d4" strokeDasharray="30 70" strokeDashoffset="-60" strokeWidth="5.5" />
              {/* Surface Wear 10% */}
              <circle cx="21" cy="21" fill="transparent" r="15.915" stroke="#64748b" strokeDasharray="10 90" strokeDashoffset="-90" strokeWidth="5.5" />
            </svg>

            {/* Center Metric */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-4xl font-bold text-white leading-tight">60<span className="text-xl text-slate-400">%</span></span>
              <span className="font-mono text-[10px] font-bold text-blue-400 uppercase tracking-wider">POTHOLES</span>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-500" />
                <span className="text-slate-300">Potholes</span>
              </div>
              <span className="text-white font-bold">60%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-cyan-500" />
                <span className="text-slate-300">Cracks</span>
              </div>
              <span className="text-white font-bold">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-slate-500" />
                <span className="text-slate-300">Surface Wear</span>
              </div>
              <span className="text-white font-bold">10%</span>
            </div>
          </div>
        </motion.div>

        {/* Zonal Health Index (Horizontal Bar Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="col-span-12 xl:col-span-6 glass p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Zonal Health Index</h3>
            <p className="font-mono text-xs text-slate-400">Comparing structural integrity across districts</p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Zone Alpha (Downtown)</span>
                <span className="text-emerald-400 font-bold">92%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Zone Beta (Industrial)</span>
                <span className="text-blue-400 font-bold">78%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Zone Gamma (Residential)</span>
                <span className="text-red-400 font-bold">64%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Zone Delta (Suburbs)</span>
                <span className="text-emerald-400 font-bold">88%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Zone Epsilon (Highway)</span>
                <span className="text-blue-400 font-bold">82%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Context Cards */}
        <div className="col-span-12 xl:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="glass p-6 rounded-2xl flex flex-col justify-center border border-white/10 border-l-4 border-l-blue-500 shadow-md bg-blue-500/5"
          >
            <p className="font-mono text-xs uppercase text-slate-400 mb-1">TOTAL SCANNED (30D)</p>
            <h4 className="font-mono text-3xl md:text-4xl font-bold text-white">
              12,450 <span className="text-sm text-slate-400 font-normal">km</span>
            </h4>
            <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-xs font-mono">
              <TrendingUp size={14} />
              +14% vs last month
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass p-6 rounded-2xl flex flex-col justify-center border border-white/10 border-l-4 border-l-red-500 shadow-md bg-red-500/5"
          >
            <p className="font-mono text-xs uppercase text-slate-400 mb-1">CRITICAL ALERTS</p>
            <h4 className="font-mono text-3xl md:text-4xl font-bold text-red-400">47</h4>
            <div className="mt-4 flex items-center gap-1.5 text-red-400 text-xs font-mono">
              <AlertTriangle size={14} />
              Immediate Action Required
            </div>
          </motion.div>
        </div>

        {/* Model Benchmark Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="col-span-12 glass p-6 md:p-8 rounded-2xl border border-white/10 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 pb-4 border-b border-white/10 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Model Performance Matrix</h3>
              <p className="font-mono text-xs text-slate-400">YOLOv8-v2.1 Evaluation vs Legacy YOLOv5 Baseline</p>
            </div>
            <button className="btn-secondary text-xs flex items-center gap-2 py-2 px-4 w-max">
              <Download size={14} />
              EXPORT CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="py-3 px-4 pl-0">METRIC</th>
                  <th className="py-3 px-4">YOLOv8 (CURRENT)</th>
                  <th className="py-3 px-4">YOLOv5 (LEGACY)</th>
                  <th className="py-3 px-4">DELTA</th>
                  <th className="py-3 px-4 pr-0">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-200">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 pl-0 text-slate-400">mAP@0.5</td>
                  <td className="py-3.5 px-4 font-bold text-blue-400">0.924</td>
                  <td className="py-3.5 px-4 text-slate-400">0.871</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">+0.053</td>
                  <td className="py-3.5 px-4 pr-0"><CheckCircle size={16} className="text-emerald-400" /></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 pl-0 text-slate-400">Precision</td>
                  <td className="py-3.5 px-4 font-bold text-blue-400">0.941</td>
                  <td className="py-3.5 px-4 text-slate-400">0.890</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">+0.051</td>
                  <td className="py-3.5 px-4 pr-0"><CheckCircle size={16} className="text-emerald-400" /></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 pl-0 text-slate-400">Recall</td>
                  <td className="py-3.5 px-4 font-bold text-white">0.885</td>
                  <td className="py-3.5 px-4 text-slate-400">0.892</td>
                  <td className="py-3.5 px-4 text-red-400 font-semibold">-0.007</td>
                  <td className="py-3.5 px-4 pr-0"><span className="text-slate-500 font-bold">—</span></td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 pl-0 text-slate-400">Inference Speed (FPS)</td>
                  <td className="py-3.5 px-4 font-bold text-blue-400">45.2</td>
                  <td className="py-3.5 px-4 text-slate-400">32.8</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">+12.4</td>
                  <td className="py-3.5 px-4 pr-0"><Zap size={16} className="text-blue-400" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
