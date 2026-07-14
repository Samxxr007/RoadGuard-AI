import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Monitor, Map, Scan, Wrench, BarChart3,
  Camera, FileText, FlaskConical, Users, Settings,
  ChevronLeft, ChevronRight, Shield, Road
} from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'inspector', 'maintenance', 'viewer'] },
  { path: '/monitor', label: 'Live Monitor', icon: Monitor, roles: ['admin', 'inspector'] },
  { path: '/roads', label: 'Roads', icon: Map, roles: ['admin', 'inspector', 'maintenance', 'viewer'] },
  { path: '/detections', label: 'Detections', icon: Scan, roles: ['admin', 'inspector', 'maintenance'] },
  { path: '/maintenance', label: 'Maintenance', icon: Wrench, roles: ['admin', 'inspector', 'maintenance'] },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'inspector', 'viewer'] },
];

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const user = useAuthStore(s => s.user);
  const location = useLocation();

  const visibleItems = NAV_ITEMS.filter(
    item => user && item.roles.includes(user.role)
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full z-50 flex flex-col overflow-hidden"
      style={{
        background: 'rgba(10, 15, 30, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 min-h-[64px]">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow-blue">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="text-sm font-bold text-white whitespace-nowrap">RoadGuard AI</div>
              <div className="text-xs text-slate-400 whitespace-nowrap">Smart City Platform</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5">
        {!sidebarCollapsed && (
          <p className="px-2 pt-1 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
        )}
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={sidebarCollapsed ? item.label : undefined}
              className={cn(
                'nav-item group',
                isActive && 'active',
                sidebarCollapsed && 'justify-center px-0'
              )}
            >
              <Icon
                className={cn(
                  'w-4.5 h-4.5 flex-shrink-0 transition-colors',
                  isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                )}
                size={18}
              />
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!sidebarCollapsed && isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      {!sidebarCollapsed && user && (
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-accent-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500 capitalize truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center w-full h-10 border-t border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors flex-shrink-0"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </motion.aside>
  );
}
