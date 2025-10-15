import BookingJobManagementMainSection from "../components/WorkerSide/BookingJobManagementMainSection/BookingJobManagementMainSection";
import NavBar from "../components/WorkerSide/NavBar/NavBar";
import BookingJobManagementUpperSection from "../components/WorkerSide/BookingJobManagementUpperSection/BookingJobManagementUpperSection";
import Footer from "../components/WorkerSide/Footer/Footer";

const BookingJobManagement = () => {
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
        <BookingJobManagementUpperSection />
        <BookingJobManagementMainSection />
        <Footer />
      </div>
    </div>
  );
};

export default BookingJobManagement;
