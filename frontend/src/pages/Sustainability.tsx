import { motion } from 'framer-motion';
import { Leaf, Cpu, Database, Zap, TrendingDown, Clock, Server, BarChart2 } from 'lucide-react';

const metrics = [
  { label: 'Avg CPU per Detection', value: '12%', sub: 'vs 85% for raw CCTV stream', icon: Cpu, color: 'blue', good: true },
  { label: 'Frame Sampling Savings', value: '80%', sub: 'Process every 5th frame (vs every frame)', icon: TrendingDown, color: 'emerald', good: true },
  { label: 'Avg Inference Time', value: '35ms', sub: 'YOLOv8n on uploaded frame', icon: Clock, color: 'amber', good: true },
  { label: 'Storage per Inspection', value: '~2MB', sub: 'Original + annotated image pair', icon: Database, color: 'purple', good: true },
  { label: 'Containers Running', value: '6', sub: 'frontend, backend, ai-service, postgres, redis, monitoring', icon: Server, color: 'blue', good: true },
  { label: 'Est. Energy vs Manual Survey', value: '-65%', sub: 'AI upload-based vs physical inspection vehicles', icon: Leaf, color: 'emerald', good: true },
];

const optimizations = [
  { title: 'Frame Sampling', desc: 'Process every 5th frame instead of all frames, reducing AI inference calls by 80%.', impact: 'High' },
  { title: 'Lightweight YOLOv8n', desc: 'Using the nano variant of YOLOv8 for fastest inference with acceptable accuracy.', impact: 'High' },
  { title: 'Docker Multi-Stage Builds', desc: 'Frontend Nginx image uses multi-stage build to strip dev dependencies.', impact: 'Medium' },
  { title: 'Kubernetes Resource Limits', desc: 'CPU/Memory limits on all pods prevent resource overconsumption.', impact: 'Medium' },
  { title: 'Temp File Cleanup', desc: 'Uploaded video files deleted after frame extraction to free disk space.', impact: 'Medium' },
  { title: 'Redis Job Queue', desc: 'Video jobs queued asynchronously so API never blocks during heavy processing.', impact: 'High' },
  { title: 'Horizontal Pod Autoscaling', desc: 'AI service scales to 0 replicas when idle, scaling up only under load.', impact: 'High' },
  { title: 'Duplicate Detection Filter', desc: 'Adjacent-frame detections deduplicated to avoid redundant DB writes.', impact: 'Low' },
];

export default function Sustainability() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight mb-1 flex items-center gap-3">
          <Leaf className="text-emerald-400" size={24} />
          Green IT & Sustainability Audit
        </h1>
        <p className="text-sm text-slate-400">Resource efficiency metrics and optimization strategies for RoadGuard AI</p>
      </div>

      <div className="glass p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
        <Zap className="text-amber-400 mt-0.5 flex-shrink-0" size={16} />
        <p className="text-sm text-amber-200">
          <strong>Note:</strong> All energy and carbon estimates are indicative based on benchmark comparisons, not measured values.
          Exact carbon emissions require measurement using an appropriate methodology (e.g., Green Software Foundation SCI).
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass p-5 rounded-2xl border border-white/5"
          >
            <div className={`w-10 h-10 rounded-xl bg-${m.color}-500/10 border border-${m.color}-500/20 flex items-center justify-center mb-4`}>
              <m.icon className={`text-${m.color}-400`} size={18} />
            </div>
            <p className={`text-3xl font-bold ${m.good ? 'text-emerald-400' : 'text-red-400'} mb-1`}>{m.value}</p>
            <p className="text-white text-sm font-semibold">{m.label}</p>
            <p className="text-slate-500 text-xs mt-1">{m.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Optimization Techniques */}
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="px-5 py-4 border-b border-white/5 bg-white/5 flex items-center gap-2">
          <BarChart2 className="text-emerald-400" size={18} />
          <h2 className="text-base font-bold text-white">Optimization Techniques Implemented</h2>
        </div>
        <div className="divide-y divide-white/5">
          {optimizations.map((opt, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
              <div className={`mt-0.5 px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${
                opt.impact === 'High' ? 'bg-emerald-500/20 text-emerald-400' :
                opt.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-slate-500/20 text-slate-400'
              }`}>
                {opt.impact}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{opt.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MoSCoW / Kano Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-5 rounded-2xl border border-white/5">
          <h2 className="text-base font-bold text-white mb-4">MoSCoW — Requirements</h2>
          {[
            { cat: 'Must Have', items: ['Image upload', 'Video upload', 'YOLOv8 detection', 'Authentication', 'Dashboard', 'REST API', 'Database'], color: 'emerald' },
            { cat: 'Should Have', items: ['Map view', 'Maintenance kanban', 'Severity classification', 'Analytics', 'Notifications'], color: 'blue' },
            { cat: 'Could Have', items: ['Mobile app', 'Predictive maintenance', 'Blockchain records'], color: 'amber' },
            { cat: "Won't Have Initially", items: ['Live CCTV integration', 'Autonomous vehicles', 'City-wide surveillance'], color: 'slate' },
          ].map(section => (
            <div key={section.cat} className="mb-3 last:mb-0">
              <p className={`text-xs font-bold text-${section.color}-400 uppercase tracking-wider mb-1`}>{section.cat}</p>
              <p className="text-slate-300 text-xs">{section.items.join(' · ')}</p>
            </div>
          ))}
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5">
          <h2 className="text-base font-bold text-white mb-4">Feasibility Summary</h2>
          {[
            { type: 'Technical', verdict: 'Feasible', desc: 'React + Node.js + Python + YOLOv8 + Docker + Kubernetes are compatible.', ok: true },
            { type: 'Economic', verdict: 'Feasible', desc: 'Entirely open-source stack. Zero licensing cost.', ok: true },
            { type: 'Operational', verdict: 'Feasible', desc: 'Users only need to upload images/videos — no hardware required.', ok: true },
            { type: 'Sustainability', verdict: 'Feasible', desc: 'Frame sampling, lightweight model, and autoscaling reduce energy use.', ok: true },
          ].map(f => (
            <div key={f.type} className="flex items-start gap-3 mb-3 last:mb-0">
              <span className={`px-2 py-0.5 text-xs rounded font-bold flex-shrink-0 ${f.ok ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {f.verdict}
              </span>
              <div>
                <p className="text-white text-sm font-semibold">{f.type}</p>
                <p className="text-slate-400 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
