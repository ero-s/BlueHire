import DashboardPage from "../Worker/pages/DashboardPage.tsx";
import BookingJobManagementPage from "../Worker/pages/BookingJobManagementPage.tsx";
import EarningsReportPage from "../Worker/pages/Earnings&ReportsPage.tsx";
import JobRequestsPage from "../Worker/pages/JobRequestPage.tsx";
import ReviewsAndRatingsPage from "../Worker/pages/Reviews&RatingsPage.tsx";
import JobDetails from "../Worker/pages/JobDetailPage.tsx";
import ChatPage from "../Worker/pages/WorkerChatPage.tsx";
import JobFeedPage from "../Worker/pages/JobFeedPage.tsx";
import WorkerProfile from "../Worker/pages/WorkerProfilePage.tsx";
import Landing from "./Landing.tsx";
import SignIn from "./SignInPage.tsx";
import SignUp from "./SignupPage.tsx";
import TransactionPage from "../Worker/pages/TransactionPage";

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
      <Route path="reviewsAndRatings" element={<ReviewsAndRatingsPage />} />
      <Route path="earningsAndReports" element={<EarningsReportPage />} />
      <Route path="jobRequests" element={<JobRequestsPage />} />
      <Route path="jobDetails/:jobId" element={<JobDetails />} />
      <Route path="chat" element={<ChatPage />} />
      <Route path="jobFeeds" element={<JobFeedPage />} />
      <Route path="workerProfile" element={<WorkerProfile />} />
      <Route path="landing" element={<Landing />} />
      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="/transactions" element={<TransactionPage />} />
      
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