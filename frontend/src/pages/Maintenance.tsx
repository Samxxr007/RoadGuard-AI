import { useState } from 'react';
import { MOCK_TICKETS } from '../data/mockData';
import { getStatusClass, getPriorityClass, formatCurrency } from '../utils/format';
import { cn } from '../utils/cn';
import type { TicketStatus } from '../types';

const COLUMNS: { id: TicketStatus; label: string }[] = [
  { id: 'open', label: 'Open' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'closed', label: 'Verified & Closed' }
];

export default function Maintenance() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex justify-between items-end flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Maintenance Board</h1>
          <p className="text-sm text-slate-400">Kanban view for repair tickets</p>
        </div>
        <button className="btn-primary">
          Create Ticket
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {COLUMNS.map(column => (
            <div key={column.id} className="w-80 flex flex-col glass rounded-xl border border-white/5 bg-black/20">
              <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h3 className="font-semibold text-white text-sm">{column.label}</h3>
                <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                  {MOCK_TICKETS.filter(t => t.status === column.id).length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {MOCK_TICKETS.filter(t => t.status === column.id).map(ticket => (
                  <div key={ticket.id} className="bg-slate-800/50 border border-white/10 p-4 rounded-xl cursor-grab hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-slate-400">{ticket.id.toUpperCase()}</span>
                      <span className={cn('px-2 py-0.5 text-[10px] uppercase font-bold rounded border', getPriorityClass(ticket.priority))}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1 leading-snug">{ticket.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{ticket.roadName}</p>
                    
                    <div className="flex justify-between items-end pt-3 border-t border-white/5">
                      <div className="text-xs font-mono text-emerald-400">
                        {formatCurrency(ticket.estimatedCost)}
                      </div>
                      {ticket.assignedTeam && (
                        <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-300">
                          {ticket.assignedTeam}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
