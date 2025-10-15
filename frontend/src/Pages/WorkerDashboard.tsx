import React from "react";
import NavBar from "../components/WorkerSideDashboard/NavBar/NavBar";
import DashboardUpperSection from "../components/WorkerSideDashboard/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "../components/WorkerSideDashboard/DashboardMainSection/DashboardMainSection";

const WorkerDashboard: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        paddingTop: "8vh", // space for fixed navbar
      }}
    >
      {/* Top Navigation Bar */}
      <NavBar />

      {/* Dashboard Body */}
      <div
        style={{
          padding: "40px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <DashboardUpperSection />
        <DashboardMainSection />
      </div>
    </div>
  );
};

export default WorkerDashboard;
