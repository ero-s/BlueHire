import React from "react";
import NavBar from "../components/WorkerSideDashboard/NavBar/NavBar";
import ProfileBio from "../components/ManageAccComponents/ProfileBio/ProfileBio";
import BasicInfo from "../components/ManageAccComponents/BasicInformation/BasicInfo";
import PaymentPreference from "../components/ManageAccComponents/PaymentPreference/PaymentPreference";
import ClientSpecificInfo from "../components/ManageAccComponents/ClientSpecificInformation/ClientSpecificInfo";
const ManageAccount: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        paddingTop: "15vh", // space for fixed navbar
        paddingLeft: "60px",
        paddingRight: "60px",
        paddingBottom: "60px", 
        boxSizing: "border-box",
      }}
    >
      {/* Top Navigation Bar */}
      <NavBar />

      {/* Dashboard Body */}
      <div
        style={{
          gap: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
      <div>
        <ProfileBio /> 
      </div>

      <div 
        style={{
          gap: "30px",
          marginLeft: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BasicInfo />
        <ClientSpecificInfo />
        <PaymentPreference />
      </div>
    </div>
    </div>
  );
};

export default ManageAccount;

