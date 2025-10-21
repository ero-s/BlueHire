import Dashboard from "../components/ClientSideDashboard/Dashboard/Dashboard";
import SettingsPage from "../components/ClientSideDashboard/Settings/SettingsPage";
import JobRequestForm from "../components/ClientSideDashboard/Dashboard/JobRequestForm";
import { Routes, Route } from "react-router-dom";
import "../components/ClientSideDashboard/Client.css";
export default function ClientDashboard(){
    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/post-job" element={<JobRequestForm />} />
            <Route path="/settings" element={<SettingsPage />} />
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