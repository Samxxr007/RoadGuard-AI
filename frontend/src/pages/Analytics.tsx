import { MOCK_DASHBOARD_STATS, MONTHLY_DAMAGE_TRENDS, DAMAGE_TYPE_DISTRIBUTION } from '../data/mockData';
import { formatCurrency } from '../utils/format';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Deep Analytics</h1>
          <p className="text-sm text-slate-400">Data-driven insights for smart city planning</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h3 className="text-sm text-slate-400 font-medium mb-1">Total Estimated Repair Cost</h3>
          <p className="text-3xl font-bold text-white mb-4">{formatCurrency(MOCK_DASHBOARD_STATS.totalRepairCost)}</p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[67%]" />
          </div>
          <p className="text-xs text-slate-500 mt-2">67.4% of annual maintenance budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl min-h-[400px]">
          <h2 className="text-lg font-bold text-white mb-4">Damage Distribution</h2>
          <div className="space-y-4">
            {DAMAGE_TYPE_DISTRIBUTION.map((dist, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">{dist.label}</span>
                  <span className="text-white font-medium">{dist.percentage}%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${dist.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-2xl min-h-[400px]">
          <h2 className="text-lg font-bold text-white mb-4">Monthly Trends</h2>
          <div className="h-[300px] flex items-end gap-2 pb-6 border-b border-l border-white/10 px-4">
            {MONTHLY_DAMAGE_TRENDS.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end group">
                <div 
                  className="w-full bg-accent-gradient rounded-t-sm group-hover:opacity-80 transition-opacity relative"
                  style={{ height: `${(month.total / 100) * 100}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {month.total}
                  </div>
                </div>
                <span className="text-xs text-slate-500 mt-2">{month.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
