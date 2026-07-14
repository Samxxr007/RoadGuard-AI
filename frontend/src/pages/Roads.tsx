import { useState } from 'react';
import { Map, MapPin, Activity, AlertTriangle, ShieldAlert } from 'lucide-react';
import { MOCK_ROADS } from '../data/mockData';
import { getHealthCategoryColor, getHealthCategory } from '../utils/format';
import { cn } from '../utils/cn';

export default function Roads() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRoads = MOCK_ROADS.filter(road => 
    road.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    road.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Road Inventory</h1>
          <p className="text-sm text-slate-400">Manage and monitor road infrastructure health</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search roads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoads.map(road => (
          <div key={road.id} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{road.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin size={12} />
                  {road.district}
                </div>
              </div>
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ 
                  backgroundColor: `${getHealthCategoryColor(road.healthCategory)}20`,
                  color: getHealthCategoryColor(road.healthCategory),
                  border: `2px solid ${getHealthCategoryColor(road.healthCategory)}40`
                }}
              >
                {road.healthScore}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Length</span>
                <span className="text-white font-medium">{road.lengthKm} km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Surface</span>
                <span className="text-white font-medium capitalize">{road.surface}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Traffic</span>
                <span className="text-white font-medium capitalize">{road.trafficDensity.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                <AlertTriangle size={14} className="text-amber-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Active</div>
                <div className="font-bold text-white">{road.activeDamages}</div>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg p-2 text-center">
                <ShieldAlert size={14} className="text-red-400 mx-auto mb-1" />
                <div className="text-xs text-slate-400">Pending</div>
                <div className="font-bold text-white">{road.pendingRepairs}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
