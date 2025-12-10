import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/WorkerHeader";
import DashboardUpperSection from "../components/DashboardUpperSection";
import DashboardMainSection from "../components/DashboardMainSection";
import Footer from "../components/WorkerFooter";

// Interface matching the Nested JSON from Backend
interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface User {
  id: number;
  name: Name;
  email: string;
  username: string;
}

interface Worker {
  workerID: number;
  user: User; // The User is nested inside
}

const DashboardPage: React.FC = () => {
  // 1. Add separate state for First Name
  const [fullName, setFullName] = useState("Loading...");
  const [firstName, setFirstName] = useState("Worker"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const storedId = localStorage.getItem("currentUserId");
        const userRole = localStorage.getItem("userRole");

        // Safety Check
        if (!storedId || userRole !== "WORKER") {
          console.warn("No valid worker session found");
          // navigate("/signin"); 
          return;
        }

        console.log("Fetching Worker Data for ID:", storedId);

        // Fetch from Worker Controller
        const response = await fetch(
          `http://localhost:8080/api/worker/getWorker/${storedId}`,
        );

        if (response.ok) {
          const data: Worker = await response.json();
          console.log("Worker Data Received:", data);

          // 2. Robust Extraction Logic
          const rawFirstName = data.user?.name?.firstName || "Worker";
          const lastName = data.user?.name?.lastName || "";

          // Clean the first name (e.g., "Shello Jane" -> "Shello")
          const cleanFirstName = rawFirstName.trim().split(" ")[0];

          // Set states independently
          setFirstName(cleanFirstName);
          
          // Construct full name for the Header (check if rawFirstName already includes lastName)
          const fullDisplay = rawFirstName.toLowerCase().includes(lastName.toLowerCase()) 
            ? rawFirstName 
            : `${rawFirstName} ${lastName}`;
            
          setFullName(fullDisplay.trim());

        } else {
          console.error("Worker not found or server error");
          setFullName("Worker");
          setFirstName("Worker");
        }
      } catch (error) {
        console.error("Failed to connect to backend:", error);
      }
    };

    fetchWorkerData();
  }, [navigate]);

  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        {/* Header receives the Full Name */}
        <Header userName={fullName} />
      </div>

      <div className="pt-28 pb-12 px-6 lg:px-12 max-w-[1600px] mx-auto flex flex-col gap-8 mt-4">
        {/* 3. Welcome Section now receives ONLY the First Name */}
        <DashboardUpperSection userName={firstName} />
        
        <DashboardMainSection />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;