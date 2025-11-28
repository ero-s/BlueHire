import React from 'react';
import Header from '../components/WorkerHeader'; // Assuming your Navbar is here based on previous context
import BookingJobManagementMainSection from '../components/BookingJobManagementMainSection.tsx';
import Footer from '../components/WorkerFooter.tsx';
  
const BookingJobManagementPage: React.FC = () => {
  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <Header userName='Sherielyn Guadiana' />
      </div>

      {/* Main Content Area */}
      {/* pt-28 accounts for navbar height, pb-10 for bottom spacing */}
      <div className="pt-28 pb-10 px-4 md:px-8 lg:px-12">
        <BookingJobManagementMainSection />
      </div>
      <Footer />
    </div>
  );
};

export default BookingJobManagementPage;