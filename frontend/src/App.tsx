import { Routes, Route } from "react-router-dom"; // <-- Import this

// MAIN PAGES IMPORTS

import LandingPage from "./MainPages/Landing";
import SignUp from "./MainPages/SignupPage";
import SignIn from "./MainPages/SignInPage";

// =============================================================

// CLIENT PAGES IMPORTS

import BookingJobManagement from "./Client/pages/BookingJobManagementPage";
import ClientDashboard from "./Client/pages/DashboardPage";
import FindWorkers from "./Client/pages/FindWorkers";
import JobRequestFormPage from "./Client/pages/JobRequestForm";
import ProfilePage from "./Client/pages/ClientProfilePage";
import Settings from "./Client/pages/SettingsPage";
import ClientTransactionPage from "./Client/pages/TransactionPage";

// CLIENT SIDE ROUTER
import ClientSide from "./MainPages/ClientSide";

// =============================================================

// WORKER PAGES IMPORTS

import BookingJobManagementPage from "./Worker/pages/BookingJobManagementPage";
import ChatPage from "./Worker/pages/WorkerChatPage";
import WorkerDashboard from "./Worker/pages/DashboardPage";
import ReviewsAndRatings from "./Worker/pages/Reviews&RatingsPage";
import JobDetailsPage from "./Worker/pages/JobDetailPage";
import WorkerProfilePage from "./Worker/pages/WorkerProfilePage";
import JobRequestPage from "./Worker/pages/JobRequestPage";
import EarningsReports from "./Worker/pages/Earnings&ReportsPage";
import JobFeedPage from "./Worker/pages/JobFeedPage";
import WorkerTransactionPage from "./Worker/pages/TransactionPage";

// WORKER SIDE ROUTER
import WorkerSide from "./MainPages/WorkerSide";



// =============================================================
export default function App() {
  return (
    <WorkerSide/>
  );
}
