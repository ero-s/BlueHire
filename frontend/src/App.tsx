import { Routes, Route, useNavigate } from "react-router-dom";

// MAIN PAGES IMPORTS
import LandingPage from "./MainPages/Landing";
import SignUp from "./MainPages/SignupPage";
import SignIn from "./MainPages/SignInPage";

// =============================================================

// CLIENT PAGES IMPORTS
// ... (Your existing Client imports are commented out in source, keeping them as is or uncomment if needed)

// CLIENT SIDE ROUTER
import ClientSide from "./MainPages/ClientSide";

// =============================================================

// ADMIN PAGES IMPORTS
import AdminLanding from "./Admin/pages/AdminDashboardPage";
import AdminReport from "./Admin/pages/AdminViewReportPage";
import AdminSystemLog from "./Admin/pages/AdminViewSystemLogPage";


// WORKER PAGES IMPORTS
// ... (Your existing Worker imports are commented out in source, keeping them as is or uncomment if needed)

// WORKER SIDE ROUTER
import WorkerSide from "./MainPages/WorkerSide";

import TestingGateway from "./MainPages/UsabilityTestingGateway";
import Landing from "./MainPages/Landing";


// =============================================================
export default function App() {
  const navigate = useNavigate();

  const handleRoleSelection = (role: "worker" | "client") => {
    if (role === "worker") {
      navigate("/worker/dashboard");
    } else {
      navigate("/client/dashboard");
    }
  };

  return (
    <Routes>
      {/* Default / Gateway Route */}
      <Route path="/" element={<LandingPage/>}/>

      <Route
        path="/signup"
        element={<SignUp onSelectRole={handleRoleSelection} />}
      />

      {/* Auth & Public Routes */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/Admin/Reports" element={<AdminReport />} />
      <Route path="/Admin/SystemLogs" element={<AdminSystemLog />} />
      <Route path="/Admin" element={<AdminLanding />} />
      <Route path="/worker/*" element={<WorkerSide />} />
      <Route path="/client/*" element={<ClientSide />} />
    </Routes>
  );
}
