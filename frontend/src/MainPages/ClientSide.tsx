import Dashboard from "../Client/pages/DashboardPage.tsx";
import SettingsPage from "../Client/pages/SettingsPage.tsx";
import ClientProfilePage from "../Client/pages/ClientProfilePage.tsx";
import JobRequestForm from "../Client/pages/JobRequestForm.tsx";
import FindWorkers from "../Client/pages/FindWorkers.tsx";
import Landing from "./Landing.tsx";
import BookingJobManagement from "../Client/pages/BookingJobManagementPage.tsx";
import Chat from "../Client/pages/ClientChatPage.tsx";
import SignIn from "./SignInPage.tsx";
import SignUp from "./SignupPage.tsx";
import "../Client/assets/css/Client.css";
import { Routes, Route } from "react-router-dom";
import PastHires from "../Client/pages/PastHires.tsx";
import ClientChats from "../Client/pages/ClientChats.tsx";
import Bookings from "../Client/pages/Bookings.tsx";
import Header from "../Client/components/DashboardHeader.tsx";
import logo from "../MainAssets/images/BlueHireLogo.png";
import TransactionPage from "../Client/pages/TransactionPage";

export default function ClientSide() {
  return (
    <Routes>
      <Route path="/clientDashboard" element={<Dashboard />} />
      <Route path="/post-job" element={<JobRequestForm />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/clientProfile" element={<ClientProfilePage />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/findWorkers" element={<FindWorkers />} />
      <Route path="/bookings" element={<BookingJobManagement />} />
      <Route path="/clientChat" element={<Chat />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/transactions" element={<TransactionPage />} />

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
