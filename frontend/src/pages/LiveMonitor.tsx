import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Maximize2, AlertTriangle, Activity, Settings2, Grid3X3, SplitSquareHorizontal, Square } from 'lucide-react';
import { MOCK_CAMERAS, generateLiveDetection } from '../data/mockData';
import { cn } from '../utils/cn';
import type { Camera, Detection } from '../types';

export default function LiveMonitor() {
  const [layout, setLayout] = useState<'grid' | 'split' | 'single'>('grid');
  const [activeCameras, setActiveCameras] = useState<Camera[]>(MOCK_CAMERAS.slice(0, 4));
  const [liveDetections, setLiveDetections] = useState<Detection[]>([]);

  // Simulate incoming live detections
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const newDetection = generateLiveDetection();
        setLiveDetections(prev => [newDetection, ...prev].slice(0, 10));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getGridClass = () => {
    if (layout === 'grid') return 'grid-cols-2 grid-rows-2';
    if (layout === 'split') return 'grid-cols-2 grid-rows-1';
    return 'grid-cols-1 grid-rows-1';
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header Controls */}
      <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-widest uppercase">Live Feed</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-sm text-slate-400 font-mono">24 FPS • 1080p</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex p-1 bg-black/50 rounded-lg border border-white/5">
            <button
              onClick={() => setLayout('single')}
              className={cn('p-1.5 rounded-md transition-colors', layout === 'single' ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-white')}
            >
              <Square size={16} />
            </button>
            <button
              onClick={() => setLayout('split')}
              className={cn('p-1.5 rounded-md transition-colors', layout === 'split' ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-white')}
            >
              <SplitSquareHorizontal size={16} />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={cn('p-1.5 rounded-md transition-colors', layout === 'grid' ? 'bg-white/20 text-white' : 'text-slate-500 hover:text-white')}
            >
              <Grid3X3 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Video Grid */}
        <div className={cn("flex-1 grid gap-4", getGridClass())}>
          {activeCameras.slice(0, layout === 'grid' ? 4 : layout === 'split' ? 2 : 1).map((camera) => (
            <div key={camera.id} className="relative rounded-xl overflow-hidden bg-black border border-white/10 group">
              {/* Simulated Video Feed Background */}
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center opacity-50">
                <Video size={48} className="text-slate-700" />
              </div>
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
              
              {/* Camera Info Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-mono text-xs text-white">
                  {camera.name}
                </div>
                <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10 font-mono text-[10px] text-emerald-400 self-start">
                  REC
                </div>
              </div>

              {/* Bounding Boxes for Live Detections matching this camera */}
              <AnimatePresence>
                {liveDetections.filter(d => d.cameraId === camera.id).map(detection => (
                  <motion.div
                    key={detection.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute border-2 border-red-500 bg-red-500/10 pointer-events-none transition-all duration-300"
                    style={{
                      left: `${(detection.boundingBox.x / 1920) * 100}%`,
                      top: `${(detection.boundingBox.y / 1080) * 100}%`,
                      width: `${(detection.boundingBox.width / 1920) * 100}%`,
                      height: `${(detection.boundingBox.height / 1080) * 100}%`,
                    }}
                  >
                    <div className="absolute -top-5 left-[-2px] bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 whitespace-nowrap uppercase">
                      {detection.damageType.replace('_', ' ')} {(detection.confidence * 100).toFixed(0)}%
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Live Feed Sidebar */}
        <div className="w-80 flex flex-col glass rounded-xl overflow-hidden border border-white/5">
          <div className="p-4 border-b border-white/5 bg-black/20">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" />
              Live Detection Stream
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <AnimatePresence initial={false}>
              {liveDetections.map((detection) => (
                <motion.div
                  key={detection.id}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className="bg-black/40 border border-white/5 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                      {detection.damageType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(detection.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono mb-2">
                    {detection.cameraName}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Conf: {(detection.confidence * 100).toFixed(1)}%</span>
                    <span>Area: {detection.areaM2.toFixed(2)}m²</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
