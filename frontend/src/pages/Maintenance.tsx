import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, User, Download, Plus, AlertTriangle,
  Clock, CheckCircle, Archive, ArrowRight
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

interface KanbanCard {
  id: string;
  code: string;
  title: string;
  location: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedCost: number;
  assignedPerson?: string;
  assignedTeam?: string;
  imageUrl?: string;
  status: 'unassigned' | 'assigned' | 'in_progress' | 'completed' | 'verified';
}

const INITIAL_CARDS: KanbanCard[] = [
  {
    id: 'k1',
    code: '#PT-4421',
    title: 'Deep Crater - NH45',
    location: 'KM 42.5 Northbound',
    priority: 'CRITICAL',
    estimatedCost: 14500,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=400&q=80',
    status: 'unassigned',
  },
  {
    id: 'k2',
    code: '#PT-4425',
    title: 'Surface Degradation',
    location: 'City Center Blvd',
    priority: 'HIGH',
    estimatedCost: 8200,
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
    status: 'unassigned',
  },
  {
    id: 'k3',
    code: '#PT-4390',
    title: 'Drainage Subsidence',
    location: 'J. Singh (Alpha)',
    priority: 'MEDIUM',
    estimatedCost: 4500,
    assignedPerson: 'J. Singh (Alpha)',
    assignedTeam: 'Alpha Team',
    imageUrl: 'https://images.unsplash.com/photo-1584463699039-38374d9e5256?auto=format&fit=crop&w=400&q=80',
    status: 'assigned',
  },
];

const COLUMNS = [
  { id: 'unassigned', title: 'Unassigned (AI Detected)', color: 'border-red-500' },
  { id: 'assigned', title: 'Assigned (Alpha Team)', color: 'border-blue-500' },
  { id: 'in_progress', title: 'In Progress', color: 'border-amber-500' },
  { id: 'completed', title: 'Completed', color: 'border-emerald-500' },
  { id: 'verified', title: 'Verified', color: 'border-slate-500' },
];

export default function Maintenance() {
  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS);
  const [district, setDistrict] = useState('All Districts');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');

  const filteredCards = cards.filter(c => {
    if (priorityFilter !== 'All Priorities' && c.priority !== priorityFilter.toUpperCase()) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-4 max-w-[1700px] mx-auto pb-4">
      {/* Header & Filter Bar */}
      <div className="glass p-3 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-slate-400 uppercase tracking-wider pl-2 font-bold">Filters</span>
          
          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="bg-bg-card border border-white/10 text-xs font-mono rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option>All Districts</option>
            <option>North Zone</option>
            <option>South Zone</option>
            <option>Central</option>
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="bg-bg-card border border-white/10 text-xs font-mono rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option>All Priorities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            className="bg-bg-card border border-white/10 text-xs font-mono rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option>All Crews</option>
            <option>Alpha Team</option>
            <option>Beta Team</option>
            <option>Unassigned</option>
          </select>
        </div>

        <button className="btn-primary text-xs flex items-center gap-2 py-2 px-4 shadow-glow-blue">
          <Download size={14} />
          Export Report
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-5 overflow-x-auto kanban-scroll pb-2">
        {COLUMNS.map(col => {
          const colCards = filteredCards.filter(c => c.status === col.id);

          return (
            <div
              key={col.id}
              className="w-[330px] flex-shrink-0 flex flex-col glass rounded-2xl border border-white/10 bg-bg-card/50 overflow-hidden shadow-lg"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-bg-primary/60">
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h2>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold">
                  {colCards.length}
                </span>
              </div>

              {/* Cards Content Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 kanban-scroll">
                {colCards.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-white/10 rounded-xl">
                    <Clock className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs font-mono text-slate-500">No active tickets</p>
                  </div>
                ) : (
                  colCards.map((card, idx) => {
                    const isCrit = card.priority === 'CRITICAL';
                    const isHigh = card.priority === 'HIGH';

                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`glass p-4 rounded-xl border border-white/10 relative pl-4 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm ${
                          isCrit ? 'border-l-4 border-l-red-500 bg-red-500/5' : isHigh ? 'border-l-4 border-l-amber-500 bg-amber-500/5' : 'border-l-4 border-l-blue-500'
                        }`}
                      >
                        {/* Top Badges */}
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                              isCrit
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : isHigh
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            }`}
                          >
                            {card.priority}
                          </span>
                          <span className="font-mono text-xs text-slate-400">{card.code}</span>
                        </div>

                        {/* Middle Preview Thumbnail + Title */}
                        <div className="flex gap-3 mb-3">
                          {card.imageUrl && (
                            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 relative">
                              <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                              {isCrit && <div className="absolute inset-0 border border-red-500 pointer-events-none rounded-lg" />}
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <h3 className="text-sm font-semibold text-white truncate mb-1">{card.title}</h3>
                            <p className="font-mono text-xs text-slate-400 flex items-center gap-1 truncate">
                              <MapPin size={12} className="text-blue-400 shrink-0" />
                              {card.location}
                            </p>
                          </div>
                        </div>

                        {/* Bottom Cost + Action */}
                        <div className="flex justify-between items-end pt-2.5 border-t border-white/5">
                          <div>
                            <p className="font-mono text-[9px] text-slate-400 uppercase">EST. COST</p>
                            <p className="font-mono text-sm font-bold text-emerald-400">
                              {formatCurrency(card.estimatedCost)}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors flex items-center gap-0.5">
                            View Details <ArrowRight size={12} />
                          </span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
