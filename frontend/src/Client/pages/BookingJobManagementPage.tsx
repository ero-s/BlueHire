import BookingJobManagementMainSection from "../components/BookingJobManagementMainSection";
import BookingJobManagementUpperSection from "../components/BookingJobManagementUpperSection";
import NavBar from "../../Worker/components/WorkerNavbar";
import Footer from "../../Worker/components/WorkerFooter";

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
