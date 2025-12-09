import React, { useState, useEffect } from "react";
import Header from "../components/WorkerHeader"; 
import DashboardUpperSection from "../components/DashboardUpperSection";
import DashboardMainSection from "../components/DashboardMainSection";
import Footer from "../components/WorkerFooter";

// Interface to match your backend data structure
interface UserData {
  name?: {
    firstName?: string;
    lastName?: string;
  };
}

const DashboardPage: React.FC = () => {
  // State to hold the dynamic user name
  const [fullName, setFullName] = useState("Worker User");

  useEffect(() => {
    // 1. Retrieve the user string from LocalStorage
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        
        // Debugging: Check console to ensure Worker data is loaded correctly
        console.log("Worker Dashboard - Logged in user:", parsedUser); 

        // 2. Safely extract names using the standard naming convention (firstName/lastName)
        const fName = parsedUser.name?.firstName || ""; 
        const lName = parsedUser.name?.lastName || "";
        
        // 3. Update state only if we found valid names
        if (fName || lName) {
            setFullName(`${fName} ${lName}`.trim());
        }

      } catch (error) {
        console.error("Failed to parse worker data:", error);
      }
    }
  }, []);

  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        {/* Pass the dynamic fullName state here */}
        <Header userName={fullName}/>
      </div>

      {/* Dashboard Body */}
      <div className="pt-28 pb-12 px-6 lg:px-12 max-w-[1600px] mx-auto flex flex-col gap-8 mt-4">
        <DashboardUpperSection />
        <DashboardMainSection />
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;