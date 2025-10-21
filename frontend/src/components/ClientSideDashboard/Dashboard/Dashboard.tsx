import Header from "./Header.tsx";
import WelcomeSection from "./WelcomeSection.tsx";
import StatCard from "./StatCard.tsx";
import PostJobButton from "./PostJobButton.tsx";
import TotalSpentCard from "./TotalSpentCard.tsx";
import PendingRequests from "./PendingRequests.tsx";
import Footer from "./Footer.tsx";
import logo from "../../../assets/logo.jpg";
import "./Dashboard.css"

export default function Dashboard() {
  const chartData = [30, 50, 70, 90, 95, 85, 60, 40, 55, 75, 85, 100];

  return (
    <div className={"profileCard"}
    >
      <Header logo={logo} userName="Juan Dela Cruz"/>

      <WelcomeSection userName="Juan" />

      {/* Main Content */}
      <div className={"dashboard-card-main"}
      >
        <div className={"dashboard-left-side"}
        >
          <div className={"dashboard-card-row"}
          >
            <StatCard label="Ongoing Jobs" value={0} />
            <StatCard label="Past Hires" value={0} />
            <PostJobButton />
          </div>

          <TotalSpentCard total={0} chartData={chartData} />
        </div>

        <PendingRequests count={5} />
      </div>

      <Footer />
    </div>
  );
}
