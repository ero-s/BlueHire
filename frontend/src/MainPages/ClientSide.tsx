import Dashboard from "../Client/pages/DashboardPage.tsx";
import SettingsPage from "../Client/pages/SettingsPage.tsx";
import ProfilePage from "../Client/pages/ProfilePage.tsx";
import JobRequestForm from "../Client/pages/JobRequestForm.tsx";
import JobPosts from "../Client/pages/JobPostsPage.tsx"; 
import FindWorkers from "../Client/pages/FindWorkers.tsx";
import Landing from "./Landing.tsx";
import "../Client/assets/css/Client.css";

import { Routes, Route } from "react-router-dom";

export default function ClientSide() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/post-job" element={<JobRequestForm />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/jobposts" element={<JobPosts />} />
      <Route path="/findworkers" element={<FindWorkers />} />
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
