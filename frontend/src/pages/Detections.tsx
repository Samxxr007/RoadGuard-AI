import { useState } from 'react';
import { MOCK_DETECTIONS } from '../data/mockData';
import { getDamageTypeLabel, getSeverityBgClass, formatDateTime, formatCurrency } from '../utils/format';

export default function Detections() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDetections = MOCK_DETECTIONS.filter(d => 
    d.roadName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.damageType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Detections Log</h1>
          <p className="text-sm text-slate-400">Comprehensive AI damage detection history</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search detections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input w-64"
          />
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400 border-b border-white/10 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Damage Type</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Confidence</th>
                <th className="px-6 py-4 font-medium">Est. Cost</th>
                <th className="px-6 py-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredDetections.map((detection) => (
                <tr key={detection.id} className="hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{getDamageTypeLabel(detection.damageType)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getSeverityBgClass(detection.severity)}`}>
                      {detection.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>{detection.roadName}</div>
                    <div className="text-xs text-slate-500">{detection.cameraName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${detection.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs">{(detection.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono">{formatCurrency(detection.estimatedCost)}</td>
                  <td className="px-6 py-4 text-xs text-slate-500">{formatDateTime(detection.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
