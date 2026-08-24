import { FlaskConical, Target, BrainCircuit, Cpu, Database, CheckCircle2, Layers } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockData';

export default function Research() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Research & Model Benchmarks</h1>
          <p className="text-sm text-slate-400">YOLOv8 deep learning evaluation and real dataset telemetry</p>
        </div>
      </div>

      {/* Real Dataset Statistics Banner */}
      <div className="glass p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Active Research Dataset: 665 Pothole Images</h2>
              <p className="text-xs text-slate-300">
                Ground-truth Pascal VOC XML annotations verified for spatial bounding boxes and physical area metrics.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400">Total Images</p>
              <p className="text-xl font-bold text-white font-mono">665</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">XML Annotations</p>
              <p className="text-xl font-bold text-emerald-400 font-mono">665</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Damage Classes</p>
              <p className="text-xl font-bold text-amber-400 font-mono">1 (Pothole)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="glass p-5 rounded-2xl border border-white/5 bg-blue-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-blue-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Active Architecture</h3>
          </div>
          <p className="text-2xl font-bold text-white">YOLOv8n</p>
          <p className="text-xs text-slate-400 mt-1">Ultralytics PyTorch Engine</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-emerald-500/5">
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="text-emerald-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Mean Average Precision (mAP50)</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-400">{MODEL_METRICS[0].mAP}%</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-amber-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-amber-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Inference Latency</h3>
          </div>
          <p className="text-2xl font-bold text-amber-400">{MODEL_METRICS[0].inferenceMs} ms</p>
          <p className="text-xs text-slate-400 mt-1">per 640x640 frame</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-purple-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-purple-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Classification F1</h3>
          </div>
          <p className="text-2xl font-bold text-purple-400">{MODEL_METRICS[0].f1Score}%</p>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Model Comparison Matrix</h2>
          <span className="text-xs text-slate-400">Tested on Pothole Benchmark Suite</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Model Architecture</th>
                <th className="px-6 py-4 font-medium">mAP @ 0.5</th>
                <th className="px-6 py-4 font-medium">Accuracy</th>
                <th className="px-6 py-4 font-medium">F1 Score</th>
                <th className="px-6 py-4 font-medium">Inference Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {MODEL_METRICS.map((metric, i) => (
                <tr key={metric.model} className={i === 0 ? "bg-blue-500/10" : "hover:bg-white/5 transition-colors"}>
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    {metric.model}
                    {i === 0 && (
                      <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold border border-blue-500/30">
                        Current
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono">{metric.mAP}%</td>
                  <td className="px-6 py-4 font-mono">{metric.accuracy}%</td>
                  <td className="px-6 py-4 font-mono">{metric.f1Score}%</td>
                  <td className="px-6 py-4 font-mono">{metric.inferenceMs} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
