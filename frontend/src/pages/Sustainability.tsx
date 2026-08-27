import { motion } from 'framer-motion';
import { Leaf, Zap, Cloud, CheckCircle, Clock, XCircle, FileSpreadsheet } from 'lucide-react';

export default function Sustainability() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-2">
          <Leaf size={14} />
          <span>GREEN IT & AI EFFICIENCY AUDIT</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Sustainable AI Infrastructure</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Quantified carbon reduction, edge inference scaling, and computational efficiency benchmarks for RoadGuard AI.
        </p>
      </div>

      {/* Hero Metric Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Audit Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="col-span-1 lg:col-span-2 glass rounded-2xl p-8 flex flex-col justify-center relative border border-blue-500/20 shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent pointer-events-none" />
          
          <h2 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
            <Leaf size={14} className="text-emerald-400" />
            COMPUTE SAVINGS AUDIT
          </h2>

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-5xl md:text-6xl font-bold text-blue-400 tracking-tight">80%</span>
            <span className="text-xl md:text-2xl font-bold text-white">CO₂ & Compute Reduction</span>
          </div>

          <p className="text-slate-300 mt-3 font-mono text-xs md:text-sm max-w-lg leading-relaxed">
            Achieved via dynamic 5-frame interval video sampling, reducing per-kilometer GPU load compared to continuous 30 FPS streams.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-bg-card/80 px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-300 font-medium">Frame-Sampling Active</span>
            </div>
            <div className="flex items-center gap-2 bg-bg-card/80 px-3 py-1.5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-mono text-xs text-slate-300 font-medium">YOLOv8 Edge Optimization</span>
            </div>
          </div>
        </motion.div>

        {/* Energy & Cloud Stat Cards */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Energy Conserved */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass rounded-2xl p-6 flex-1 flex flex-col justify-between border border-white/10 shadow-md"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-mono text-xs uppercase text-slate-400 tracking-wider">ENERGY CONSERVED</h3>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap size={18} />
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-white mt-4">12.4k kWh</div>
              <div className="w-full bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[75%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
              <div className="font-mono text-xs text-slate-400 mt-2">75% of monthly target reached</div>
            </div>
          </motion.div>

          {/* Cloud Optimization */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass rounded-2xl p-6 flex-1 flex flex-col justify-between border border-white/10 shadow-md"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-mono text-xs uppercase text-slate-400 tracking-wider">CLOUD OPTIMIZATION</h3>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cloud size={18} />
              </div>
            </div>
            <div>
              <div className="font-mono text-3xl font-bold text-white mt-4">42.1%</div>
              <div className="font-mono text-xs text-slate-400 mt-2">Reduction in idle server time via autoscaling</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sustainable AI Compliance Section */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg"
      >
        <header className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 pb-4 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Sustainable AI Compliance Framework</h2>
            <p className="font-mono text-xs text-slate-400 mt-1">MoSCoW Green Computing Status</p>
          </div>
          <button className="btn-secondary text-xs flex items-center gap-2 py-2 px-4 w-max">
            <FileSpreadsheet size={14} />
            Generate Compliance Audit
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Must Have */}
          <div className="glass bg-bg-card/70 border-l-4 border-emerald-500 p-5 rounded-r-xl flex items-start gap-4">
            <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-mono text-sm font-bold text-white">Must Have</h4>
              <p className="text-xs text-slate-300 mt-1">
                Dynamic inference scaling and lightweight YOLOv8 models for low-power edge nodes.
              </p>
              <span className="inline-block mt-3 font-mono text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                COMPLIANT
              </span>
            </div>
          </div>

          {/* Should Have */}
          <div className="glass bg-bg-card/70 border-l-4 border-blue-500 p-5 rounded-r-xl flex items-start gap-4">
            <CheckCircle className="text-blue-400 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-mono text-sm font-bold text-white">Should Have</h4>
              <p className="text-xs text-slate-300 mt-1">
                Solar-powered battery telemetry integration for field CCTV cameras.
              </p>
              <span className="inline-block mt-3 font-mono text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-bold">
                70% DEPLOYED
              </span>
            </div>
          </div>

          {/* Could Have */}
          <div className="glass bg-bg-card/70 border-l-4 border-amber-500 p-5 rounded-r-xl flex items-start gap-4">
            <Clock className="text-amber-400 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-mono text-sm font-bold text-white">Could Have</h4>
              <p className="text-xs text-slate-300 mt-1">
                Carbon offset automated tracking per kilometer of road surveyed.
              </p>
              <span className="inline-block mt-3 font-mono text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                EVALUATING
              </span>
            </div>
          </div>

          {/* Won't Have */}
          <div className="glass bg-bg-card/70 border-l-4 border-slate-500 p-5 rounded-r-xl flex items-start gap-4 opacity-75">
            <XCircle className="text-slate-400 shrink-0 mt-1" size={20} />
            <div>
              <h4 className="font-mono text-sm font-bold text-white">Won't Have (Current)</h4>
              <p className="text-xs text-slate-400 mt-1">
                100% On-premise only processing (Cloud fallback required for burst workloads).
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
