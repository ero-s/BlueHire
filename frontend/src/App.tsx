import "./App.css";
import NavBar from "./components/NavBar/NavBar";
// import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
// import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
import BookingJobManagementUppersSection from "./components/BookingJobManagementUpperSection/BookingJobManagementUpperSection";
import BookingJobManagementMainSection from "./components/BookingJobManagementMainSection/BookingJobManagementMainSection";
// import JobDetails from "./components/JobDetailsMainSection/JobDetails";
import DashboardUpperSection from "./components/DashboardUpperSection/DashboardUpperSection";
import DashboardMainSection from "./components/DashboardMainSection/DashboardMainSection";
import Landing from "./Pages/Landing";

function App() {
  return (
    <>
      <NavBar />
      <BookingJobManagementUppersSection />
      <BookingJobManagementMainSection />
      <DashboardUpperSection />
      <DashboardMainSection />
      <Landing />
    </>
  );
}

export default App;
