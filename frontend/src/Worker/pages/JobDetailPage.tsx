import Header from "../components/WorkerHeader";
import JobDetail from "../components/JobDetailsForm";
import Footer from "../components/WorkerFooter";

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
      <Header userName="Sherielyn Guadiana"/>
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
