import { useNavigate } from "react-router-dom"; // Import useNavigate
import WelcomeSection from "../components/DashboardWelcomeSection.tsx";
import StatCard from "../components/DashboardStatCard.tsx";
import PostJobButton from "../components/DashboardPostJobButton.tsx";
import TotalSpentCard from "../components/DashboardTotalSpentCard.tsx";
import PendingRequests from "../components/DashboardPendingRequests.tsx";
import Footer from "../components/ClientFooter.tsx";
import Header from "../components/ClientHeader.tsx";

import "../assets/css/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate(); // Initialize hook

  const spendingData = [
    { month: "Jan", amount: 150 },
    { month: "Feb", amount: 230 },
    { month: "Mar", amount: 180 },
    { month: "Apr", amount: 320 },
    { month: "May", amount: 290 },
    { month: "Jun", amount: 450 },
    { month: "Jul", amount: 380 },
    { month: "Aug", amount: 200 },
    { month: "Sep", amount: 250 },
    { month: "Oct", amount: 310 },
    { month: "Nov", amount: 400 },
    { month: "Dec", amount: 520 },
  ];

  // ===============================================
  // NAVIGATION HANDLERS
  // ===============================================

  const handleOngoingClick = () => {
    // UPDATED PATH: /client/bookings
    navigate("/client/bookings", { state: { status: "ongoing" } });
  };

  const handlePastHiresClick = () => {
    // UPDATED PATH: /client/bookings
    navigate("/client/bookings", { state: { status: "completed" } });
  };

  const handlePostJobClick = () => {
    // UPDATED PATH: /client/post-job
    navigate("/client/post-job");
  };

  const handleTotalSpentClick = () => {
    // UPDATED PATH: /client/transactions
    navigate("/client/transactions");
  };

  const handlePendingClick = () => {
    // UPDATED PATH: /client/bookings (Filtered by pending)
    navigate("/client/bookings", { state: { status: "pending" } });
  };

  return (
    <div className={"profileCard"}>
      <Header userName="Sherielyn Guadiana" />
      <WelcomeSection userName="Juan" />

      {/* Main Content */}
      <div className={"dashboard-card-main"}>
        <div className={"dashboard-left-side"}>
          <div className={"dashboard-card-row"}>
            <StatCard 
              label="Ongoing Jobs" 
              value={0} 
              onClick={handleOngoingClick} 
            />
            <StatCard 
              label="Past Hires" 
              value={0} 
              onClick={handlePastHiresClick} 
            />
            
            {/* Added onClick to PostJobButton */}
            <PostJobButton onClick={handlePostJobClick} />
          </div>

          {/* Added onClick to TotalSpentCard */}
          <TotalSpentCard 
            data={spendingData} 
            onClick={handleTotalSpentClick} 
          />
        </div>

        {/* Added onClick to PendingRequests */}
        <PendingRequests 
          count={5} 
          onClick={handlePendingClick} 
        />
      </div>

      <Footer />
    </div>
  );
}