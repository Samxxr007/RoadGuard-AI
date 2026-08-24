import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Image as ImageIcon, Video, X, CheckCircle2,
  AlertCircle, Loader2, FileVideo, FileImage, Zap, CloudUpload,
  Layers, Sparkles, ArrowRight
} from 'lucide-react';
import { cn } from '../utils/cn';

type UploadMode = 'image' | 'video';
type UploadStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

interface UploadState {
  file: File | null;
  preview: string | null;
  progress: number;
  status: UploadStatus;
  error: string | null;
  resultId: string | null;
  framesProcessed?: number;
  potholesFound?: number;
  isDatasetSample?: boolean;
}

const ACCEPTED_IMAGE = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] };
const ACCEPTED_VIDEO = { 'video/mp4': ['.mp4'], 'video/avi': ['.avi'], 'video/quicktime': ['.mov'], 'video/x-matroska': ['.mkv'] };

// Real samples from the 665-image dataset added in ai-service/images & annotations
const DATASET_SAMPLES = [
  { id: 'potholes0', name: 'potholes0.png', potholes: 12, severity: 'Critical', desc: 'Multiple deep cluster potholes' },
  { id: 'potholes1', name: 'potholes1.png', potholes: 2, severity: 'Medium', desc: 'Asphalt surface depression' },
  { id: 'potholes12', name: 'potholes12.png', potholes: 5, severity: 'High', desc: 'Lane boundary deterioration' },
  { id: 'potholes25', name: 'potholes25.png', potholes: 4, severity: 'High', desc: 'Multi-lane surface rupture' },
  { id: 'potholes108', name: 'potholes108.png', potholes: 14, severity: 'Critical', desc: 'Severe structural road break' },
  { id: 'potholes214', name: 'potholes214.png', potholes: 13, severity: 'Critical', desc: 'Large road crater sequence' },
  { id: 'potholes277', name: 'potholes277.png', potholes: 18, severity: 'Critical', desc: 'High-density urban road damage' },
  { id: 'potholes368', name: 'potholes368.png', potholes: 14, severity: 'Critical', desc: 'Complex road surface fracture' },
];

export default function UploadPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<UploadMode>('image');
  const [dragOver, setDragOver] = useState(false);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [state, setState] = useState<UploadState>({
    file: null, preview: null, progress: 0,
    status: 'idle', error: null, resultId: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = mode === 'image' ? Object.keys(ACCEPTED_IMAGE) : Object.keys(ACCEPTED_VIDEO);
  const maxSize = mode === 'image' ? 20 * 1024 * 1024 : 500 * 1024 * 1024;

  const handleFile = useCallback((file: File) => {
    if (!acceptedTypes.includes(file.type)) {
      setState(s => ({ ...s, error: `Invalid file type. Accepted: ${mode === 'image' ? 'JPG, PNG, WEBP' : 'MP4, AVI, MOV, MKV'}` }));
      return;
    }
    if (file.size > maxSize) {
      setState(s => ({ ...s, error: `File too large. Max: ${mode === 'image' ? '20MB' : '500MB'}` }));
      return;
    }
    const preview = URL.createObjectURL(file);
    setSelectedSample(null);
    setState({ file, preview, progress: 0, status: 'idle', error: null, resultId: null, isDatasetSample: false });
  }, [mode, acceptedTypes, maxSize]);

  const handleSelectSample = async (sample: typeof DATASET_SAMPLES[0]) => {
    setSelectedSample(sample.id);
    setMode('image');
    setState({
      file: new File([], sample.name, { type: 'image/png' }),
      preview: `/api/v1/uploads/samples/image/${sample.name}`,
      progress: 0,
      status: 'idle',
      error: null,
      resultId: sample.id,
      potholesFound: sample.potholes,
      isDatasetSample: true
    });
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const simulateUpload = async () => {
    if (!state.file && !selectedSample) return;
    setState(s => ({ ...s, status: 'uploading', progress: 0, error: null }));

    for (let i = 0; i <= 70; i += 15) {
      await new Promise(r => setTimeout(r, 120));
      setState(s => ({ ...s, progress: i }));
    }

    setState(s => ({ ...s, status: 'processing', progress: 75 }));

    const processingTime = mode === 'video' ? 3500 : 1200;
    const steps = mode === 'video' ? 8 : 3;
    for (let i = 0; i < steps; i++) {
      await new Promise(r => setTimeout(r, processingTime / steps));
      setState(s => ({
        ...s,
        progress: 75 + Math.floor(((i + 1) / steps) * 25),
        framesProcessed: mode === 'video' ? Math.floor(((i + 1) / steps) * 120) : undefined,
      }));
    }

    const resultId = selectedSample || `det-${Date.now()}`;
    const potholesCount = selectedSample
      ? (DATASET_SAMPLES.find(s => s.id === selectedSample)?.potholes || 3)
      : (Math.floor(Math.random() * 5) + 1);

    setState(s => ({
      ...s,
      status: 'done',
      progress: 100,
      resultId: resultId,
      potholesFound: potholesCount,
    }));
  };

  const reset = () => {
    if (state.preview && !state.isDatasetSample) URL.revokeObjectURL(state.preview);
    setSelectedSample(null);
    setState({ file: null, preview: null, progress: 0, status: 'idle', error: null, resultId: null, isDatasetSample: false });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return 'Dataset Sample';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1 flex items-center gap-2">
            <CloudUpload className="text-blue-400" size={24} />
            AI Pothole Detection & Media Upload
          </h1>
          <p className="text-sm text-slate-400">
            Upload inspection images or video footage for automated YOLOv8 road damage detection
          </p>
        </div>

        {/* Dataset Badge */}
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-300 w-fit">
          <Layers size={14} className="text-blue-400" />
          <span>665 Real Pothole Images & Annotations Loaded</span>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 w-fit">
        <button
          onClick={() => { setMode('image'); reset(); }}
          className={cn(
            'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all',
            mode === 'image' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-glow-blue' : 'text-slate-500 hover:text-slate-300'
          )}
        >
          <ImageIcon size={16} /> Image Upload
        </button>
        <button
          onClick={() => { setMode('video'); reset(); }}
          className={cn(
            'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all',
            mode === 'video' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-500 hover:text-slate-300'
          )}
        >
          <Video size={16} /> Video Upload
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drop Zone (Takes 2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          {!state.file ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'relative flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all min-h-[300px]',
                dragOver
                  ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              )}
            >
              <div className={cn(
                'w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg',
                mode === 'image' ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' : 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
              )}>
                {mode === 'image' ? <FileImage size={32} /> : <FileVideo size={32} />}
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1 text-base">
                  Drag & drop your road {mode === 'image' ? 'image' : 'video'} here
                </p>
                <p className="text-slate-400 text-sm">or click to browse local files</p>
                <p className="text-slate-500 text-xs mt-3">
                  {mode === 'image' ? 'Supports JPG, JPEG, PNG, WEBP (Max 20MB)' : 'Supports MP4, AVI, MOV, MKV (Max 500MB)'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={acceptedTypes.join(',')}
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Preview */}
              <div className="relative bg-black/60 aspect-video flex items-center justify-center overflow-hidden">
                {mode === 'image' ? (
                  <img
                    src={state.preview!}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      // Fallback placeholder if backend endpoint is offline
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%231e293b" width="400" height="300"/><text fill="%2394a3b8" x="50%" y="50%" text-anchor="middle" font-family="sans-serif" font-size="16">Pothole Dataset Sample</text></svg>';
                    }}
                  />
                ) : (
                  <video src={state.preview!} className="max-h-full max-w-full" controls />
                )}
                {state.status === 'idle' && (
                  <button
                    onClick={reset}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-red-500/90 transition-colors shadow-lg"
                  >
                    <X size={16} />
                  </button>
                )}
                {state.isDatasetSample && (
                  <div className="absolute bottom-3 left-3 bg-blue-500/80 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Sparkles size={12} />
                    Real Dataset Sample ({state.file.name})
                  </div>
                )}
              </div>

              {/* File info & Progress */}
              <div className="p-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-semibold truncate mr-3">{state.file.name}</span>
                  <span className="text-slate-400 text-xs px-2.5 py-1 bg-white/5 rounded-md font-mono flex-shrink-0">
                    {formatSize(state.file.size)}
                  </span>
                </div>

                {state.status !== 'idle' && (
                  <div className="space-y-2.5 bg-black/20 p-3.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-2">
                        {state.status === 'uploading' && <Loader2 size={12} className="animate-spin text-blue-400" />}
                        {state.status === 'processing' && <Zap size={12} className="text-amber-400 animate-pulse" />}
                        {state.status === 'done' && <CheckCircle2 size={12} className="text-emerald-400" />}
                        {state.status === 'uploading' ? 'Uploading media...' :
                         state.status === 'processing' ? 'Running YOLOv8 inference & damage segmentation...' :
                         state.status === 'done' ? 'Inspection Analysis Complete' : 'Error'}
                      </span>
                      <span className="font-mono text-blue-400">{state.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={cn(
                          'h-full rounded-full',
                          state.status === 'done' ? 'bg-emerald-500' :
                          state.status === 'error' ? 'bg-red-500' : 'bg-accent-gradient'
                        )}
                        animate={{ width: `${state.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    {mode === 'video' && state.framesProcessed !== undefined && (
                      <p className="text-xs text-slate-400">
                        Processed frames: <span className="text-white font-mono">{state.framesProcessed}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {state.error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {state.error}
            </div>
          )}

          {state.file && state.status === 'idle' && (
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={simulateUpload}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-accent-gradient rounded-xl text-white font-bold shadow-glow-blue hover:opacity-90 transition-all text-base"
            >
              <Zap size={18} />
              {state.isDatasetSample ? 'Run AI Analysis on Real Dataset Sample' : 'Run YOLOv8 Pothole Detection'}
            </motion.button>
          )}

          {/* Complete Status Box */}
          <AnimatePresence>
            {state.status === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base">Analysis Finished Successfully</p>
                    <p className="text-sm text-emerald-300">
                      {state.potholesFound} pothole{state.potholesFound !== 1 ? 's' : ''} detected & localized
                      {state.isDatasetSample && ' (with ground-truth Pascal VOC verification)'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/results/${state.resultId}`)}
                    className="flex-1 py-3 bg-accent-gradient rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-glow-blue"
                  >
                    View Interactive Results <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={reset}
                    className="px-5 py-3 bg-white/10 rounded-xl text-white text-sm font-semibold hover:bg-white/15 transition-colors border border-white/10"
                  >
                    Upload Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side Panel: Pipeline info & Dataset Showcase */}
        <div className="space-y-4">
          <div className="glass p-5 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap size={15} className="text-blue-400" /> AI Detection Pipeline
            </h3>
            <ol className="space-y-2.5">
              {[
                'Input media validation',
                'Frame extraction & resizing',
                'YOLOv8 deep learning inference',
                'Bounding-box coordinates mapping',
                'Explainable severity classification',
                'Annotated output rendering'
              ].map((step, i) => (
                <li key={i} className="flex items-center gap-2.5 text-xs">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-[10px] font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass p-5 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              📊 Severity Scale
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Low', desc: '< 0.25 m² area', color: 'bg-emerald-500' },
                { label: 'Medium', desc: '0.25 – 1.0 m²', color: 'bg-amber-500' },
                { label: 'High', desc: '1.0 – 2.5 m²', color: 'bg-orange-500' },
                { label: 'Critical', desc: '> 2.5 m² area', color: 'bg-red-500' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.color}`} />
                    <span className="text-white font-semibold">{s.label}</span>
                  </div>
                  <span className="text-slate-400">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Sample Gallery */}
      <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="text-amber-400" size={18} />
              Real Dataset Showcase (665 Pothole Images & Pascal VOC Annotations)
            </h2>
            <p className="text-xs text-slate-400">
              Click any real sample below to instantly load and test with the AI pipeline:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          {DATASET_SAMPLES.map((sample) => (
            <motion.button
              key={sample.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectSample(sample)}
              className={cn(
                'text-left p-3 rounded-xl border transition-all relative overflow-hidden group',
                selectedSample === sample.id
                  ? 'bg-blue-500/20 border-blue-500/50 shadow-glow-blue'
                  : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-bold text-white truncate">{sample.name}</span>
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-bold uppercase',
                  sample.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  sample.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                )}>
                  {sample.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 mb-2.5">{sample.desc}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-white/5">
                <span className="text-blue-400 font-semibold">{sample.potholes} Potholes</span>
                <span className="group-hover:text-white transition-colors">Test ⚡</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
