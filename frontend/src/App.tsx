
import { Routes, Route } from "react-router-dom"; // <-- Import this

// MAIN PAGES IMPORTS

import LandingPage from "./MainPages/Landing";
import SigninSignup from "./MainPages/SigninSignup";

// =============================================================

// CLIENT PAGES IMPORTS

import BookingJobManagement from "./Client/pages/BookingJobManagementPage";
import ClientDashboard from "./Client/pages/DashboardPage"; 
import FindWorkers from "./Client/pages/FindWorkers";
import JobPostsPage from "./Client/pages/JobPostsPage";
import JobRequestFormPage from "./Client/pages/JobRequestForm";
import ProfilePage from "./Client/pages/ProfilePage";
import Settings from "./Client/pages/SettingsPage";

// CLIENT SIDE ROUTER
import ClientSide from "./MainPages/ClientSide";

// =============================================================

// WORKER PAGES IMPORTS

import BookingJobManagementPage from "./Worker/pages/BookingJobManagementPage";
import ChatPage from "./Worker/pages/ChatPage";
import WorkerDashboard from "./Worker/pages/DashboardPage";
import EarningsAndReports from "./Worker/pages/Earnings&Reports";
import ReviewsAndRatings from "./Worker/pages/Reviews&RatingsPage";
import JobDetailsPage from "./Worker/pages/JobDetailPage";
import WorkerProfilePage from "./Worker/pages/ProfilePage(Op)";

// WORKER SIDE ROUTER
import WorkerSide from "./MainPages/WorkerSide";

// =============================================================
export default function App() {
  return (
    <WorkerSide/>
  );
}
