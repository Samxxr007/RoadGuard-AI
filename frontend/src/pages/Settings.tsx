export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">System Settings</h1>
          <p className="text-sm text-slate-400">Configure RoadGuard AI platform preferences</p>
        </div>
        <button className="btn-primary">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-2">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">AI Model Configuration</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Active Detection Model</label>
              <select className="form-input w-full md:w-1/2">
                <option>YOLOv11 (Custom - Default)</option>
                <option>YOLOv8</option>
                <option>EfficientDet-D4</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confidence Threshold</label>
              <div className="flex items-center gap-4">
                <input type="range" min="0" max="100" defaultValue="65" className="flex-1 accent-blue-500" />
                <span className="text-sm font-mono text-slate-400 w-12 text-right">65%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">Detections below this threshold will be discarded to minimize false positives.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Auto-Ticket Generation</label>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
                <span className="text-sm text-slate-400">Automatically generate maintenance tickets for Critical & Severe damages.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/5">
            <h2 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4">Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="form-checkbox text-blue-500 rounded border-slate-700 bg-slate-800" />
                <span className="text-sm text-slate-300">Critical Damage Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="form-checkbox text-blue-500 rounded border-slate-700 bg-slate-800" />
                <span className="text-sm text-slate-300">Camera Offline Alerts</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="form-checkbox text-blue-500 rounded border-slate-700 bg-slate-800" />
                <span className="text-sm text-slate-300">Weekly Summary Reports</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
