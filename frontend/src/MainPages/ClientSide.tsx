import { Routes, Route, Navigate } from "react-router-dom";

// PAGES
import Dashboard from "../Client/pages/DashboardPage";
import SettingsPage from "../Client/pages/SettingsPage";
import ClientProfilePage from "../Client/pages/ClientProfilePage";
import JobRequestForm from "../Client/pages/JobRequestForm";
import FindWorkers from "../Client/pages/FindWorkers";
import BookingJobManagement from "../Client/pages/BookingJobManagementPage";
import Chat from "../Client/pages/ClientChatPage";
import TransactionPage from "../Client/pages/TransactionPage";

// AUTH & LANDING
import Landing from "./Landing";
import SignIn from "./SignInPage";
import SignUp from "./SignupPage";

// CSS
import "../Client/assets/css/Client.css";

export default function ClientSide() {
  return (
    <Routes>
      {/* Redirect /client -> /client/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />
      
      {/* RELATIVE PATHS (No leading slash) */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="post-job" element={<JobRequestForm />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="profile" element={<ClientProfilePage />} />
      <Route path="find-workers" element={<FindWorkers />} />
      <Route path="bookings" element={<BookingJobManagement />} />
      <Route path="chat" element={<Chat />} />
      <Route path="transactions" element={<TransactionPage />} />

      {/* Auth / Landing Internal Routes */}
      <Route path="landing" element={<Landing />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="p-10 text-center text-xl text-red-600">
            404 - Page Not Found (Client Side)
          </div>
        }
      />
    </Routes>
  );
}