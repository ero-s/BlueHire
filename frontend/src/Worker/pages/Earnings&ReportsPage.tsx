import React from 'react';
import Header from "../components/WorkerHeader";
import Footer from '../components/WorkerFooter';
import GraphTable from "../components/Earnings&ReportGraphTable";
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react'; 
// --- Component Integration ---

const EarningsReportPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    // 1. Main container for the entire page
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* 2. Navigation Bar */}
      <Header userName='Sherielyn Guadiana'/>

      {/* 3. Main Content Area */}
      {/* MODIFIED: Removed 'max-w-screen-xl' and 'mx-auto' to allow content to fill the width. */}
      {/* Also removed padding from <main> and moved it to the inner <div> for better control. */}
      <main className="pt-24 sm:pt-28 lg:pt-28 pl-8 pr-8 mt-4">
        <button 
            onClick={() => navigate('/workerDashboard')} 
            className="flex items-center gap-2 mb-6 text-gray-500 hover:text-[#4D7EAF] transition-colors font-medium pl-6"
           >
           <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
        </button>
        {/* A. Combined Content is placed here, with padding applied to this div */}
        {/* The padding controls the spacing from the screen edges. */}
        <div className="py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-10">
          <GraphTable />
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

export default EarningsReportPage;