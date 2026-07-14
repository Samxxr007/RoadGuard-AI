import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { cn } from '../utils/cn';
import { DEMO_CREDENTIALS } from '../data/mockData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const fillCredentials = (index: number) => {
    const cred = DEMO_CREDENTIALS[index];
    setEmail(cred.email);
    setPassword(cred.password);
    setSelectedRole(index);
  };

  const roleConfig = [
    { label: 'Admin', color: 'purple', icon: '👑', desc: 'Full access' },
    { label: 'Inspector', color: 'blue', icon: '🔍', desc: 'Detection & Reports' },
    { label: 'Maintenance', color: 'amber', icon: '🔧', desc: 'Repair queue' },
    { label: 'Viewer', color: 'emerald', icon: '👁️', desc: 'Read-only' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary flex overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Left Panel — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-[55%] relative p-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-glow-blue">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RoadGuard AI</h1>
              <p className="text-sm text-slate-400">Smart City Platform</p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-5xl font-black text-white leading-tight mb-4">
              Intelligent Road
              <span className="text-gradient-blue block">Damage Detection</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Powered by YOLOv11 and existing CCTV infrastructure.
              Detect, classify, and prioritize road maintenance at city scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: '🎯', label: 'YOLOv11 Detection', value: '94.2% Accuracy' },
              { icon: '📹', label: 'CCTV Cameras', value: '12 Active Feeds' },
              { icon: '🛣️', label: 'Roads Monitored', value: '15 Road Segments' },
              { icon: '⚡', label: 'Real-time FPS', value: '28.4 FPS' },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
                <div className="text-sm font-bold text-white mt-0.5">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex items-center gap-6"
          >
            {['YOLOv11', 'OpenCV', 'PyTorch', 'FastAPI', 'React 19'].map(tech => (
              <span key={tech} className="text-xs text-slate-500 font-mono">{tech}</span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-xs text-slate-600"
        >
          © 2026 RoadGuard AI · Final Year ML Capstone Project · Smart City Initiative
        </motion.div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">RoadGuard AI</h1>
          </div>

          <div className="glass-card p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Sign In</h3>
              <p className="text-sm text-slate-400 mt-1">Access the municipality dashboard</p>
            </div>

            {/* Quick role login */}
            <div className="mb-6">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">Quick Demo Login</p>
              <div className="grid grid-cols-2 gap-2">
                {roleConfig.map((role, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => fillCredentials(i)}
                    className={cn(
                      'flex items-center gap-2 p-2.5 rounded-lg border transition-all text-left',
                      selectedRole === i
                        ? 'border-blue-500/50 bg-blue-500/10'
                        : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                    )}
                  >
                    <span className="text-lg">{role.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{role.label}</p>
                      <p className="text-[10px] text-slate-500">{role.desc}</p>
                    </div>
                    {selectedRole === i && (
                      <CheckCircle2 size={12} className="ml-auto text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500">or sign in manually</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@roadguard.ai"
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="form-input pr-10"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                id="login-btn"
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full h-11 mt-2 text-sm font-semibold"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap size={16} />
                    Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-amber-400">Demo Environment</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    This is a research prototype. All data is simulated for demonstration.
                    Select a role above to auto-fill credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">
            RoadGuard AI v1.0.0 · YOLOv11 + OpenCV + PyTorch
          </p>
        </motion.div>
      </div>
    </div>
  );
}
