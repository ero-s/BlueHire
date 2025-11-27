import React from "react";
import Header from "../components/WorkerHeader"; 
import DashboardUpperSection from "../components/DashboardUpperSection";
import DashboardMainSection from "../components/DashboardMainSection";
import Footer from "../components/WorkerFooter";

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <Header userName="Sherielyn Guadiana"/>
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