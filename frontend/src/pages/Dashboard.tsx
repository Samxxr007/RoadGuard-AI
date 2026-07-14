import { motion } from 'framer-motion';
import { Camera, Map, AlertTriangle, ShieldCheck, Activity, TrendingUp, TrendingDown, Wrench } from 'lucide-react';
import { MOCK_DASHBOARD_STATS, MOCK_NOTIFICATIONS, HEALTH_PREDICTION_DATA, BUDGET_DATA } from '../data/mockData';
import { formatCurrency, formatNumber, formatPercent } from '../utils/format';
import { cn } from '../utils/cn';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass p-5 rounded-2xl relative overflow-hidden group"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl group-hover:bg-${color}-500/20 transition-colors`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      {trend && (
        <div className={cn(
          'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
          trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'
        )}>
          {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const stats = MOCK_DASHBOARD_STATS;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">City Overview</h1>
          <p className="text-sm text-slate-400">Live analytics and road health metrics</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 glass rounded-xl text-sm font-medium text-slate-300">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Health Score"
          value={stats.averageHealthScore}
          icon={Activity}
          trend={stats.healthScoreChange > 0 ? 'up' : 'down'}
          trendValue={formatPercent(Math.abs(stats.healthScoreChange))}
          color={stats.averageHealthScore > 70 ? 'emerald' : 'amber'}
          delay={0.1}
        />
        <StatCard
          title="Active Detections"
          value={formatNumber(stats.activeDetections)}
          icon={AlertTriangle}
          trend="up"
          trendValue="+12%"
          color="amber"
          delay={0.2}
        />
        <StatCard
          title="Critical Issues"
          value={formatNumber(stats.criticalDetections)}
          icon={ShieldCheck}
          trend="down"
          trendValue="-5%"
          color="red"
          delay={0.3}
        />
        <StatCard
          title="Online Cameras"
          value={`${stats.onlineCameras}/${stats.totalCameras}`}
          icon={Camera}
          color="blue"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder for Main Chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-6 min-h-[400px]">
          <h2 className="text-lg font-bold text-white mb-4">Damage Detection Trends</h2>
          <div className="h-full flex items-center justify-center text-slate-500 border-2 border-dashed border-white/10 rounded-xl">
            Chart Component (Recharts)
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {MOCK_NOTIFICATIONS.slice(0, 4).map((alert, i) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={cn(
                  'p-4 rounded-xl border',
                  alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/20' :
                  alert.type === 'ticket_update' ? 'bg-blue-500/10 border-blue-500/20' :
                  'bg-white/5 border-white/10'
                )}
              >
                <p className="text-sm font-semibold text-white mb-1">{alert.title}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{alert.message}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
