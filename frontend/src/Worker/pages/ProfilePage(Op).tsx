import React from "react";
import NavBar from "../components/WorkerNavbar";
import ProfileBio from "../components/ProfileBio";
import BasicInfo from "../components/ProfileBasicInfo";
import PaymentPreference from "../components/ProfilePaymentPreference";
import ClientSpecificInfo from "../components/ProfileClientSpecificInfo";
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

