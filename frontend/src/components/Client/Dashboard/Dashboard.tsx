import Header from "./Header";
import WelcomeSection from "./WelcomeSection";
import StatCard from "./StatCard";
import PostJobButton from "./PostJobButton";
import TotalSpentCard from "./TotalSpentCard";
import PendingRequests from "./PendingRequests";
import Footer from "./Footer";
import logo from "../../../assets/logo.jpg";

export default function Dashboard() {
  const chartData = [30, 50, 70, 90, 95, 85, 60, 40, 55, 75, 85, 100];

  return (
    <div
      style={{
        margin: "0",
        padding: "0",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Header logo={logo} userName="Juan Dela Cruz" />

      <WelcomeSection userName="Juan" />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "2rem 3rem",
          display: "flex",
          gap: "2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Left Section - Stats and Chart */}
        <div
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Stats Cards Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <StatCard label="Ongoing Jobs" value={0} />
            <StatCard label="Past Hires" value={0} />
            <PostJobButton />
          </div>

          <TotalSpentCard total={0} chartData={chartData} />
        </div>

        {/* Right Section - Pending Requests */}
        <PendingRequests count={5} />
      </div>

      <Footer />
    </div>
  );
}
