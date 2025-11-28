import WelcomeSection from "../components/DashboardWelcomeSection.tsx";
import StatCard from "../components/DashboardStatCard.tsx";
import PostJobButton from "../components/DashboardPostJobButton.tsx";
import TotalSpentCard from "../components/DashboardTotalSpentCard.tsx";
import PendingRequests from "../components/DashboardPendingRequests.tsx";
import Footer from "../components/ClientFooter.tsx";
import Header from "../components/ClientHeader.tsx";

import "../assets/css/Dashboard.css";

export default function Dashboard() {
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

  return (
    <div className={"profileCard"}>
      <Header userName="Sherielyn Guadiana" />
      <WelcomeSection userName="Juan" />

      {/* Main Content */}
      <div className={"dashboard-card-main"}>
        <div className={"dashboard-left-side"}>
          <div className={"dashboard-card-row"}>
            <StatCard label="Ongoing Jobs" value={0} />
            <StatCard label="Past Hires" value={0} />
            <PostJobButton />
          </div>

          <TotalSpentCard data={spendingData} />
        </div>

        <PendingRequests count={5} />
      </div>

      <Footer />
    </div>
  );
}
