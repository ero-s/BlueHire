import NavBar from "../components/WorkerSide/NavBar/NavBar";
import JobDetail from "../components/WorkerSide/JobDetailsMainSection/JobDetails";
import Footer from "../components/WorkerSide/Footer/Footer";

const JobDetails = () => {
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
      <div
        style={{
          padding: "40px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <JobDetail />
        <Footer />
      </div>
    </div>
  );
};

export default JobDetails;
