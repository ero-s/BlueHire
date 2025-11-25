import React from 'react';
import NavBar from '../components/WorkerNavbar'; // Assuming your Navbar is here based on previous context
import BookingJobManagementMainSection from '../components/BookingJobManagementMainSection.tsx';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react';  

const BookingJobManagementPage: React.FC = () => {
const navigate = useNavigate();
  return (
    <div className="bg-[#F6F6F6] min-h-screen w-full font-sans">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <NavBar />
      </div>

      {/* Main Content Area */}
      {/* pt-28 accounts for navbar height, pb-10 for bottom spacing */}
      <div className="pt-28 pb-10 px-4 md:px-8 lg:px-12">
        <button 
          onClick={() => navigate('/workerDashboard')} 
          className="flex items-center gap-2 mb-6 text-gray-500 hover:text-[#4D7EAF] transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <BookingJobManagementMainSection />
      </div>
    </div>
  );
};

export default BookingJobManagementPage;