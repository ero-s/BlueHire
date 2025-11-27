import Header from "../components/DashboardHeader.tsx";
import WelcomeSection from "../components/DashboardWelcomeSection.tsx";
import StatCard from "../components/DashboardStatCard.tsx";
import PostJobButton from "../components/DashboardPostJobButton.tsx";
import TotalSpentCard from "../components/DashboardTotalSpentCard.tsx";
import PendingRequests from "../components/DashboardPendingRequests.tsx";
import Footer from "../components/ClientFooter.tsx";
import logo from "../../MainAssets/images/BlueHireLogo.png";
import "../assets/css/Dashboard.css";

export default function Dashboard() {
  const chartData = [30, 50, 70, 90, 95, 85, 60, 40, 55, 75, 85, 100];

  return (
    <div className={"profileCard"}>
      <Header logo={logo} userName="Shervin" />

      <WelcomeSection userName="Juan" />

      {/* Main Content */}
      <div className={"dashboard-card-main"}>
        <div className={"dashboard-left-side"}>
          <div className={"dashboard-card-row"}>
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
