import { useState } from "react"; // 1. Import useState
import { useNavigate } from "react-router-dom"; 
import WelcomeSection from "../components/DashboardWelcomeSection";
import StatCard from "../components/DashboardStatCard";
import PostJobButton from "../components/DashboardPostJobButton";
import TotalSpentCard from "../components/DashboardTotalSpentCard";
import PendingRequests from "../components/DashboardPendingRequests";
import Footer from "../components/ClientFooter";
import Header from "../components/ClientHeader";
import PostJobModal from "../components/PostJobModal"; // 2. Import the new Modal

import "../assets/css/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // 3. Add Modal State
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

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
    navigate("/client/bookings", { state: { status: "ongoing" } });
  };

  const handlePastHiresClick = () => {
    navigate("/client/bookings", { state: { status: "completed" } });
  };

  // 4. Handle Post Job Click
  const handlePostJobClick = () => {
    setIsPostJobModalOpen(true);
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
            
            {/* 5. Pass onClick to trigger Modal */}
            <PostJobButton onClick={handlePostJobClick} />
          </div>

          <TotalSpentCard 
            data={spendingData} 
          />
        </div>

        <PendingRequests 
          count={5} 
        />
      </div>

      <Footer />

      {/* 6. Render Modal conditionally */}
      <PostJobModal 
        isOpen={isPostJobModalOpen} 
        onClose={() => setIsPostJobModalOpen(false)} 
      />
    </div>
  );
}