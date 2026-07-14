import { useState } from 'react';
import { Bell, Search, LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRelativeTime } from '../../utils/format';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';
import { cn } from '../../utils/cn';

export default function TopBar() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const { notifications, unreadCount, markNotificationRead, markAllRead } = useAppStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'text-purple-400',
      inspector: 'text-blue-400',
      maintenance: 'text-amber-400',
      viewer: 'text-emerald-400',
    };
    return colors[role] || 'text-slate-400';
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b flex-shrink-0 relative z-40"
      style={{
        background: 'rgba(10, 15, 30, 0.8)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(148, 163, 184, 0.1)',
      }}
    >
      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search roads, detections..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input pl-9 w-64 h-9 text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="status-dot online" />
          <span className="text-xs font-medium text-emerald-400">System Online</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowUser(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-danger-gradient text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass rounded-xl overflow-hidden shadow-glass z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="text-sm font-semibold">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-blue-400 hover:text-blue-300">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.slice(0, 6).map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        'flex gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5',
                        !n.isRead && 'bg-blue-500/5'
                      )}
                    >
                      <div className={cn(
                        'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                        n.type === 'critical_damage' ? 'bg-red-400' :
                        n.type === 'ticket_update' ? 'bg-blue-400' :
                        n.type === 'repair_complete' ? 'bg-emerald-400' : 'bg-amber-400'
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-medium', !n.isRead ? 'text-white' : 'text-slate-300')}>
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{n.message}</p>
                        <p className="text-xs text-slate-600 mt-1">{formatRelativeTime(n.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            id="user-menu-btn"
            onClick={() => { setShowUser(!showUser); setShowNotifications(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-accent-gradient flex items-center justify-center text-white text-xs font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-none">{user?.name}</p>
              <p className={cn('text-xs capitalize leading-none mt-0.5', getRoleColor(user?.role || ''))}>
                {user?.role}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          <AnimatePresence>
            {showUser && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 glass rounded-xl overflow-hidden shadow-glass z-50"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                  <p className="text-xs text-slate-500 mt-1">{user?.department}</p>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                    <User size={14} />
                    Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay to close dropdowns */}
      {(showNotifications || showUser) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => { setShowNotifications(false); setShowUser(false); }}
        />
      )}
    </header>
  );
}
