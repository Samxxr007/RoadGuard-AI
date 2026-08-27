import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Route, Activity,
  Wallet, Layers, Plus, Minus, Locate,
  Radio, ExternalLink, Upload, CheckCircle2, ArrowRight
} from 'lucide-react';
import { MOCK_DASHBOARD_STATS } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = MOCK_DASHBOARD_STATS;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-44 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-lg border border-white/10"
      >
        <img
          alt="Modern City Road Patrol"
          className="w-full h-full object-cover object-center absolute inset-0 z-0 brightness-75"
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/95 via-bg-primary/75 to-transparent z-10 p-8 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs w-max mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>MUNICIPAL DISTRICT: 08221</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Morning Patrol Report</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            All AI surveillance systems operational. YOLOv8 real-time inference scanning active across northern suburban sectors.
          </p>
        </div>
      </motion.section>

      {/* KPI Summary Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Roads Monitored */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass border border-white/10 rounded-2xl p-5 flex flex-col relative overflow-hidden"
        >
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">Roads Monitored</span>
          <div className="flex items-end justify-between">
            <span className="font-mono text-2xl md:text-3xl font-bold text-white">
              1,240 <span className="text-xs text-slate-400 font-normal ml-1">km</span>
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Route size={20} />
            </div>
          </div>
        </motion.div>

        {/* Stat 2: Avg Health */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass border border-white/10 rounded-2xl p-5 flex flex-col relative overflow-hidden"
        >
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">Avg Health Score</span>
          <div className="flex items-end justify-between">
            <span className="font-mono text-2xl md:text-3xl font-bold text-white">
              78<span className="text-xs text-slate-400 font-normal">/100</span>
            </span>
            <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div className="w-[78%] h-full bg-blue-500 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Stat 3: Active Critical */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass border border-red-500/30 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.15)]"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-slate-300 uppercase tracking-wider pl-2">Active Critical</span>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-ring" />
          </div>
          <div className="flex items-end justify-between pl-2">
            <span className="font-mono text-2xl md:text-3xl font-bold text-red-400">24</span>
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Activity size={20} />
            </div>
          </div>
        </motion.div>

        {/* Stat 4: Budget Utilized */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="glass border border-white/10 rounded-2xl p-5 flex flex-col relative overflow-hidden"
        >
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">Budget Utilized</span>
          <div className="flex items-end justify-between">
            <span className="font-mono text-2xl md:text-3xl font-bold text-white">64%</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet size={20} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Dashboard Area: GIS Tactical Map & Live Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[440px]">
        {/* Interactive Tactical GIS Map */}
        <div className="lg:col-span-8 glass border border-white/10 rounded-2xl overflow-hidden relative flex flex-col min-h-[380px]">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-bg-card/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">map</span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Sector GIS Tactical Map</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">ZONE 7G — GPS ACTIVE</span>
          </div>

          <div className="flex-grow bg-bg-secondary tactical-grid relative p-6 overflow-hidden min-h-[320px]">
            {/* Simulated Road Vectors */}
            <div className="absolute top-1/4 left-1/4 w-72 h-1 bg-blue-500/30 rotate-12 origin-left blur-[1px]" />
            <div className="absolute top-1/4 left-1/4 w-72 h-[2px] bg-blue-400 rotate-12 origin-left z-10" />

            <div className="absolute top-1/2 left-1/2 w-56 h-1 bg-red-500/30 -rotate-45 origin-left blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 w-56 h-[2px] bg-red-400 -rotate-45 origin-left z-10" />

            <div className="absolute top-2/3 left-1/4 w-80 h-1 bg-amber-500/30 rotate-6 origin-left blur-[1px]" />
            <div className="absolute top-2/3 left-1/4 w-80 h-[2px] bg-amber-400 rotate-6 origin-left z-10" />

            {/* Critical Pothole Clusters */}
            <div className="absolute top-[46%] left-[58%] flex flex-col items-center gap-1 z-20 cursor-pointer group">
              <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse-ring border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="bg-bg-primary/90 border border-red-500/50 text-red-400 font-mono text-[10px] px-1.5 py-0.5 rounded shadow-sm group-hover:scale-110 transition-transform">
                C-992 (Critical)
              </span>
            </div>

            <div className="absolute top-[32%] left-[42%] flex flex-col items-center gap-1 z-20">
              <div className="w-3.5 h-3.5 bg-amber-500 rounded-full border border-white flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <span className="bg-bg-primary/90 border border-amber-500/50 text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded">
                W-441
              </span>
            </div>

            {/* Map Overlay Controls */}
            <div className="absolute right-4 top-4 flex flex-col gap-2 z-30">
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors">
                <Plus size={14} />
              </button>
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 transition-colors">
                <Minus size={14} />
              </button>
              <button className="w-8 h-8 glass rounded-lg flex items-center justify-center text-blue-400 mt-1 hover:scale-105 transition-transform">
                <Locate size={14} />
              </button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass px-3 py-2 rounded-xl z-30 flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                <span className="text-slate-300">Good</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                <span className="text-slate-300">Fair</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                <span className="text-slate-300">Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Detection Feed */}
        <div className="lg:col-span-4 glass border border-white/10 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-bg-card/40">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">sensors</span>
              Live Detection Feed
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-3 max-h-[380px] kanban-scroll">
            {/* Ticket: Critical */}
            <div
              onClick={() => navigate('/results/potholes0')}
              className="glass p-3.5 rounded-xl border border-white/10 border-l-4 border-l-red-500 hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-mono text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded font-bold">
                  Critical Pothole
                </span>
                <span className="font-mono text-xs text-slate-500">ID: 88A-2</span>
              </div>
              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                Detected at Elm St. & 4th Ave.
              </p>
              <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-400">
                <span>14:22:05 UTC · 2.4 m²</span>
                <span className="text-blue-400 flex items-center gap-0.5">Inspect <ArrowRight size={12} /></span>
              </div>
            </div>

            {/* Ticket: Surface Crack */}
            <div className="glass p-3.5 rounded-xl border border-white/10 border-l-4 border-l-amber-500 hover:border-white/20 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-bold">
                  Surface Crack
                </span>
                <span className="font-mono text-xs text-slate-500">ID: 88A-1</span>
              </div>
              <p className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
                Main St. Segment 4
              </p>
              <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-400">
                <span>14:18:30 UTC · 1.1 m²</span>
                <span className="text-blue-400 flex items-center gap-0.5">Inspect <ArrowRight size={12} /></span>
              </div>
            </div>

            {/* Ticket: Routine */}
            <div className="glass p-3.5 rounded-xl border border-white/10 border-l-4 border-l-blue-500 hover:border-white/20 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-bold">
                  Surface Wear
                </span>
                <span className="font-mono text-xs text-slate-500">ID: 87B-9</span>
              </div>
              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                Highway 9 Exit 2
              </p>
              <div className="flex items-center justify-between mt-2 text-xs font-mono text-slate-400">
                <span>14:05:12 UTC · 0.8 m²</span>
                <span className="text-blue-400 flex items-center gap-0.5">Inspect <ArrowRight size={12} /></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
