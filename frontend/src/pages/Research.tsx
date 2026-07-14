import { FlaskConical, Target, BrainCircuit, Cpu } from 'lucide-react';
import { MODEL_METRICS } from '../data/mockData';

export default function Research() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Research & Models</h1>
          <p className="text-sm text-slate-400">YOLOv11 model performance and AI evaluation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-2xl border border-white/5 bg-blue-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-blue-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Current Model</h3>
          </div>
          <p className="text-2xl font-bold text-white">YOLOv11</p>
          <p className="text-xs text-slate-400 mt-1">Fine-tuned for Indian roads</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-emerald-500/5">
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="text-emerald-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Mean Average Precision (mAP)</h3>
          </div>
          <p className="text-2xl font-bold text-white">{MODEL_METRICS[0].mAP}%</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-amber-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="text-amber-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Inference Speed</h3>
          </div>
          <p className="text-2xl font-bold text-white">{MODEL_METRICS[0].inferenceMs} ms</p>
          <p className="text-xs text-slate-400 mt-1">per frame</p>
        </div>
        <div className="glass p-5 rounded-2xl border border-white/5 bg-purple-500/5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="text-purple-400" size={20} />
            <h3 className="text-sm font-semibold text-white">Accuracy</h3>
          </div>
          <p className="text-2xl font-bold text-white">{MODEL_METRICS[0].accuracy}%</p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="p-4 border-b border-white/5 bg-white/5">
          <h2 className="text-lg font-bold text-white">Model Benchmarks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">mAP</th>
                <th className="px-6 py-4 font-medium">Accuracy</th>
                <th className="px-6 py-4 font-medium">F1 Score</th>
                <th className="px-6 py-4 font-medium">Inference (ms)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {MODEL_METRICS.map((metric, i) => (
                <tr key={metric.model} className={i === 0 ? "bg-blue-500/10" : ""}>
                  <td className="px-6 py-4 font-medium text-white">
                    {metric.model} {i === 0 && <span className="ml-2 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Active</span>}
                  </td>
                  <td className="px-6 py-4">{metric.mAP}%</td>
                  <td className="px-6 py-4">{metric.accuracy}%</td>
                  <td className="px-6 py-4">{metric.f1Score}%</td>
                  <td className="px-6 py-4">{metric.inferenceMs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
