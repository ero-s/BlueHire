import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "../components/DashboardWelcomeSection";
import StatCard from "../components/DashboardStatCard";
import PostJobButton from "../components/DashboardPostJobButton";
import TotalSpentCard from "../components/DashboardTotalSpentCard";
import PendingRequests from "../components/DashboardPendingRequests";
import Footer from "../components/ClientFooter";
import Header from "../components/ClientHeader";
import PostJobModal from "../components/PostJobModal"; 

import "../assets/css/Dashboard.css";

// Updated Interface: Matches your new Java 'Name' class and Database columns
interface UserData {
  name?: {
    firstName?: string;
    lastName?: string;
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  
  // Default states for the user name
  const [fullName, setFullName] = useState("Client User");
  const [firstName, setFirstName] = useState("Client");

  useEffect(() => {
    // 1. Retrieve the user string from LocalStorage
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        
        // Debugging: You should see { name: { firstName: "...", lastName: "..." } } in the console
        console.log("Logged in user data:", parsedUser); 

        // 2. Safely extract names using the standard naming convention
        const fName = parsedUser.name?.firstName || ""; 
        const lName = parsedUser.name?.lastName || "";
        
        // 3. Update state only if we found valid names
        if (fName || lName) {
            setFullName(`${fName} ${lName}`.trim());
            setFirstName(fName);
        }

      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

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

  const handlePostJobClick = () => {
    setIsPostJobModalOpen(true);
  };

  return (
    <div className={"profileCard"}>
      {/* Dynamic Header with Full Name */}
      <Header userName={fullName} />
      
      {/* Dynamic Welcome Section with First Name */}
      <WelcomeSection userName={firstName} />

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

      <PostJobModal 
        isOpen={isPostJobModalOpen} 
        onClose={() => setIsPostJobModalOpen(false)} 
      />
    </div>
  );
}