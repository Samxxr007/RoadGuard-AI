import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import AppShell from './components/layout/AppShell';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import LiveMonitorPage from './pages/LiveMonitor';
import RoadsPage from './pages/Roads';
import DetectionsPage from './pages/Detections';
import MaintenancePage from './pages/Maintenance';
import AnalyticsPage from './pages/Analytics';
import CamerasPage from './pages/Cameras';
import ReportsPage from './pages/Reports';
import ResearchPage from './pages/Research';
import CitizensPage from './pages/Citizens';
import SettingsPage from './pages/Settings';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="monitor" element={<LiveMonitorPage />} />
        <Route path="roads" element={<RoadsPage />} />
        <Route path="detections" element={<DetectionsPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="cameras" element={<CamerasPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="citizens" element={<CitizensPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
