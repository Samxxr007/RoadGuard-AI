import { useState } from 'react';
import { Camera, Signal, SignalZero, Wrench } from 'lucide-react';
import { MOCK_CAMERAS } from '../data/mockData';
import { cn } from '../utils/cn';

export default function Cameras() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCameras = MOCK_CAMERAS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    if (status === 'online') return <Signal className="text-emerald-400" size={16} />;
    if (status === 'offline') return <SignalZero className="text-red-400" size={16} />;
    return <Wrench className="text-amber-400" size={16} />;
  };

  const getStatusClass = (status: string) => {
    if (status === 'online') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (status === 'offline') return 'bg-red-500/10 text-red-400 border-red-500/20';
    return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">CCTV Network</h1>
          <p className="text-sm text-slate-400">Manage and monitor integrated traffic cameras</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search cameras..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCameras.map((camera) => (
          <div key={camera.id} className="glass p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-blue-400" />
              </div>
              <div className={cn("px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1.5 capitalize", getStatusClass(camera.status))}>
                {getStatusIcon(camera.status)}
                {camera.status}
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{camera.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{camera.location}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">IP Address</span>
                <span className="text-white font-mono text-xs">{camera.ipAddress}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">Resolution</span>
                <span className="text-white">{camera.resolution}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">FPS</span>
                <span className="text-white">{camera.fps}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Detections</span>
                <span className="text-white font-semibold">{camera.totalDetections}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
