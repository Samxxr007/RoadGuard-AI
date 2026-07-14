import { MOCK_CITIZEN_REPORTS } from '../data/mockData';
import { getDamageTypeLabel, getSeverityBgClass, formatDateTime } from '../utils/format';

export default function Citizens() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Citizen Portal</h1>
          <p className="text-sm text-slate-400">Manage crowdsourced road damage reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_CITIZEN_REPORTS.map(report => (
          <div key={report.id} className="glass p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 hover:border-white/10 transition-colors">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-white">{report.description}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityBgClass(report.severity || 'minor')}`}>
                  {report.severity?.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-4">{report.address}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <div>Reported by: <span className="text-slate-300 font-medium">{report.reporterName}</span></div>
                <div>Damage: <span className="text-slate-300 font-medium">{getDamageTypeLabel(report.damageType || 'pothole')}</span></div>
                <div>Reported on: <span className="text-slate-300 font-medium">{formatDateTime(report.submittedAt)}</span></div>
              </div>
            </div>
            
            <div className="md:w-64 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{report.upvotes}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Community Upvotes</div>
              </div>
              {report.aiVerified && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center py-1.5 rounded-lg font-medium">
                  AI Verified (Matched with CCTV)
                </div>
              )}
              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                  Review
                </button>
                <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-semibold py-2 rounded-lg transition-colors border border-blue-500/30">
                  Merge to Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
