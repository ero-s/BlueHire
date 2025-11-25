import DashboardPage from "../Worker/pages/DashboardPage.tsx";
import BookingJobManagementPage from "../Worker/pages/BookingJobManagementPage.tsx";
// import "../Worker/assets/css/Worker.css";

import { Routes, Route, Navigate} from "react-router-dom";

export default function WorkerSide() {
  return (
    <Routes>
      {/* Default Route: Redirect to Dashboard */}
      <Route path="/" element={<Navigate to="workerDashboard" replace />} />
      
      {/* Worker Dashboard */}
      <Route path="workerDashboard" element={<DashboardPage />} />

      {/* Browse available jobs */}
      <Route path="bookingJobsManagement" element={<BookingJobManagementPage />} />
      
      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="p-10 text-center text-xl text-red-600">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
}