import React from 'react';
import Header from "../components/WorkerHeader";
import Footer from '../components/WorkerFooter';
import GraphTable from "../components/Earnings&ReportGraphTable";

// --- Component Integration ---

const EarningsReportPage: React.FC = () => {
  return (
    // 1. Main container for the entire page
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* 2. Navigation Bar */}
      <Header userName='Sherielyn Guadiana'/>

      {/* 3. Main Content Area */}
      {/* MODIFIED: Removed 'max-w-screen-xl' and 'mx-auto' to allow content to fill the width. */}
      {/* Also removed padding from <main> and moved it to the inner <div> for better control. */}
      <main className="flex-grow w-full mt-24">

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