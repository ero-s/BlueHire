import { Routes, Route, Navigate } from "react-router-dom";

// WORKER PAGES
import DashboardPage from "../Worker/pages/DashboardPage";
import BookingJobManagementPage from "../Worker/pages/BookingJobManagementPage";
import EarningsReportPage from "../Worker/pages/Earnings&ReportsPage";
import JobRequestsPage from "../Worker/pages/JobRequestPage";
import ReviewsAndRatingsPage from "../Worker/pages/Reviews&RatingsPage";
import JobDetails from "../Worker/pages/JobDetailPage";
import ChatPage from "../Worker/pages/WorkerChatPage";
import JobFeedPage from "../Worker/pages/JobFeedPage";
import WorkerProfile from "../Worker/pages/WorkerProfilePage";
import TransactionPage from "../Worker/pages/TransactionPage";

// LANDING & AUTH
import Landing from "./Landing";
import SignIn from "./SignInPage";
import SignUp from "./SignupPage";

export default function WorkerSide() {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="jobfeeds" element={<JobFeedPage />} />
      <Route path="bookings" element={<BookingJobManagementPage />} />
      <Route path="reviews" element={<ReviewsAndRatingsPage />} />
      <Route path="earnings" element={<EarningsReportPage />} />
      <Route path="jobrequests" element={<JobRequestsPage />} />
      <Route path="job/:jobId" element={<JobDetails />} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="profile" element={<WorkerProfile />} />
      <Route path="transactions" element={<TransactionPage />} />

      <Route path="landing" element={<Landing />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />

      <Route
        path="*"
        element={
          <div className="p-10 text-center text-xl text-red-600">
            404 - Page Not Found (Worker Side)
          </div>
        }
      />
    </Routes>
  );
}