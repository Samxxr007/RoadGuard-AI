import { FileText, Download, FileSpreadsheet } from 'lucide-react';
import { MOCK_DASHBOARD_STATS } from '../data/mockData';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Generated Reports</h1>
          <p className="text-sm text-slate-400">Download and manage municipal health reports</p>
        </div>
        <button className="btn-primary">
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Monthly City Health Report</h3>
                <p className="text-sm text-slate-400">June 2026</p>
              </div>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
              <span className="text-slate-500">Total Detections</span>
              <span className="text-white font-medium">{MOCK_DASHBOARD_STATS.monthlyDetections}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
              <span className="text-slate-500">Critical Issues</span>
              <span className="text-red-400 font-medium">{MOCK_DASHBOARD_STATS.criticalDetections}</span>
            </div>
            <div className="flex justify-between text-sm pb-2">
              <span className="text-slate-500">Format</span>
              <span className="text-white font-medium">PDF (12.4 MB)</span>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Maintenance Cost Export</h3>
                <p className="text-sm text-slate-400">Q2 2026</p>
              </div>
            </div>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white">
              <Download size={18} />
            </button>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
              <span className="text-slate-500">Total Budget Spent</span>
              <span className="text-white font-medium">₹12,450,000</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/5 pb-2">
              <span className="text-slate-500">Repairs Completed</span>
              <span className="text-emerald-400 font-medium">{MOCK_DASHBOARD_STATS.completedRepairs}</span>
            </div>
            <div className="flex justify-between text-sm pb-2">
              <span className="text-slate-500">Format</span>
              <span className="text-white font-medium">CSV (2.1 MB)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
