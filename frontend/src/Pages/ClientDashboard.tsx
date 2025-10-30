import Dashboard from "../components/ClientSideDashboard/Dashboard/Dashboard";
import SettingsPage from "../components/ClientSideDashboard/Settings/SettingsPage";
import ProfilePage from "../components/ClientSideDashboard/Profile/ProfilePage";
import JobRequestForm from "../components/ClientSideDashboard/Dashboard/JobRequestForm";
import JobPosts from "../components/ClientSideDashboard/JobPosts/JobPostsPage.tsx";
import Landing from "./Landing.tsx";
import { Routes, Route } from "react-router-dom";
import "../components/ClientSideDashboard/Client.css";
export default function ClientDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/post-job" element={<JobRequestForm />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/jobposts" element={<JobPosts />} />
      {/* Optional 404 */}
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
