import Dashboard from "./components/ClientSideDashboard/Dashboard/Dashboard";
import SettingsPage from "./components/ClientSideDashboard/Settings/SettingsPage";
import JobRequestForm from "./components/ClientSideDashboard/Dashboard/JobRequestForm";
import { Routes, Route } from "react-router-dom"; // <-- Import this
// import "./components/ClientSideDashboard/Client.css";
import EarningsAndReports from "./components/EarningsandReports/Earnings&Reports";
import Landing from "./Pages/Landing";
import NavBarLanding from "./components/LandingComponents/NavBarLanding/NavBarLanding";
import SignIn from "./components/LandingComponents/SignIn/SignIn";
import SigninSignup from "./Pages/SigninSignup";
import ReviewsAndRatings from "./components/ReviewsAndRatings/Reviews&Ratings";

import NavBar from "./components/WorkerSideDashboard/NavBar/NavBar";
import DashboardUpperSection from "./components/WorkerSideDashboard/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "./components/WorkerSideDashboard/DashboardMainSection/DashboardMainSection";
import ManageAccount from "./Pages/ManageAccount";
// import NavBar from "./components/NavBar/NavBar";
// // import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
// // import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
// import BookingJobManagementUppersSection from "./components/BookingJobManagementUpperSection/BookingJobManagementUpperSection";
// import BookingJobManagementMainSection from "./components/BookingJobManagementMainSection/BookingJobManagementMainSection";
// // import JobDetails from "./components/JobDetailsMainSection/JobDetails";
// import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
// import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
// import Landing from "./Pages/Landing";

// function Bookings() {
//   return <div className="p-10 text-center text-xl">Bookings Page</div>;
// }

// function AppSettings() {
//   return <div className="p-10 text-center text-xl">Settings Page</div>;
// }

// function Transactions() {
//   return <div className="p-10 text-center text-xl">Transactions Page</div>;
// }

import WorkerDashboard from "./Pages/WorkerDashboard";

export default function App() {
  return (
    <>
      <ManageAccount />
    </>
    // <Landing />
    // <Routes>
    //   <Route path="/" element={<Dashboard />} />
    //   <Route path="/post-job" element={<JobRequestForm />} />
    //   <Route path="/bookings" element={<Bookings />} />
    //   <Route path="/settings" element={<SettingsPage />} />
    //   <Route path="/transactions" element={<Transactions />} />
    //   {/* Optional 404 */}
    //   <Route
    //     path="*"
    //     element={
    //       <div className="p-10 text-center text-xl text-red-600">
    //         404 - Page Not Found
    //       </div>
    //     }
    //   />
    // </Routes>
    // <>
    //   <NavBar />
    //   <BookingJobManagementUppersSection />
    //   <BookingJobManagementMainSection />
    //   <DashboardUpperSection />
    //   <DashboardMainSection />
    //   <Landing />
    // </> */}
  );
}
