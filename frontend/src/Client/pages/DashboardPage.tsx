import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "../../Worker/components/DashboardUpperSection";
import StatCard from "../components/DashboardStatCard";
import PostJobButton from "../components/DashboardPostJobButton";
import TotalSpentCard from "../components/DashboardTotalSpentCard";
import PendingRequests from "../components/DashboardPendingRequests";
import Footer from "../components/ClientFooter";
import Header from "../components/ClientHeader";
import PostJobModal from "../components/PostJobModal";
import "../assets/css/Dashboard.css";

// Flexible Interface to catch mismatching data
interface Name {
  firstName?: string;
  fname?: string; // Fallback for older backend code
  middleName?: string;
  middlename?: string;
  lastName?: string;
  lname?: string;
}

interface User {
  id?: number;
  name: Name;
  email: string;
  username: string;
}

interface Client {
  clientID: number;
  company_name?: string;
  user: User;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const storedId = localStorage.getItem("currentUserId");

        if (!storedId) {
          console.warn("No ID found. Redirecting to login...");
          navigate("/signin");
          return;
        }

        console.log("Attempting to fetch Client ID:", storedId);
        const response = await fetch(
          `http://localhost:8080/api/client/getClient/${storedId}`,
        );

        if (response.ok) {
          const data = await response.json();
          console.log("✅ SUCCESS: Backend Data Received:", data);
          console.log("User Name Object:", data.user?.name); // Inspect this in console!
          setClient(data);
        } else {
          console.error(
            "❌ ERROR: Server responded with status:",
            response.status,
          );

          // CRITICAL FIX: If ID is invalid (500 or 404), clear it and force re-login
          if (response.status === 500 || response.status === 404) {
            console.warn("Invalid ID detected. Clearing session.");
            localStorage.removeItem("currentUserId");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userRole");
            alert("Session expired or invalid. Please sign in again.");
            navigate("/signin");
          }
        }
      } catch (error) {
        console.error("Network Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [navigate]);

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

  const handleOngoingClick = () =>
    navigate("/client/bookings", { state: { status: "ongoing" } });
  const handlePastHiresClick = () =>
    navigate("/client/bookings", { state: { status: "completed" } });

  // Robust Name Extraction
  const nameObj = client?.user?.name;

  // Try firstName, if missing try fname, if missing default to "Guest"
  const firstName = nameObj?.firstName || nameObj?.fname || "Guest";
  const lastName = nameObj?.lastName || nameObj?.lname || "";

  const fullName = client ? `${firstName} ${lastName}`.trim() : "Guest";

  return (
    <div className={"profileCard"}>
      <Header userName={fullName} />
      <div className="mt-20 ml-12">
        <WelcomeSection userName={firstName}/>
      </div>
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
            <PostJobButton onClick={() => setIsPostJobModalOpen(true)} />
          </div>
          <TotalSpentCard data={spendingData} />
        </div>
        <PendingRequests count={5} />
      </div>

      <Footer />
      <PostJobModal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
      />
    </div>
  );
}
