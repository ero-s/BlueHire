import Dashboard from "./components/Client/Dashboard/Dashboard";
import SettingsPage from "./components/Client/Settings/SettingsPage";
import JobRequestForm from "./components/Client/Dashboard/JobRequestForm";
import { Routes, Route } from "react-router-dom"; // <-- Import this
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
// import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
// import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
import BookingJobManagementUppersSection from "./components/BookingJobManagementUpperSection/BookingJobManagementUpperSection";
import BookingJobManagementMainSection from "./components/BookingJobManagementMainSection/BookingJobManagementMainSection";
// import JobDetails from "./components/JobDetailsMainSection/JobDetails";
import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
import Landing from "./Pages/Landing";

function Bookings() {
  return <div className="p-10 text-center text-xl">Bookings Page</div>;
}

function AppSettings() {
  return <div className="p-10 text-center text-xl">Settings Page</div>;
}

function Transactions() {
  return <div className="p-10 text-center text-xl">Transactions Page</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/post-job" element={<JobRequestForm />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/transactions" element={<Transactions />} />
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
    <>
      <NavBar />
      <BookingJobManagementUppersSection />
      <BookingJobManagementMainSection />
      <DashboardUpperSection />
      <DashboardMainSection />
      <Landing />
    </>
  );
}
