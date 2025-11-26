import React from 'react';
import Header from "../components/WorkerHeader";
import Footer from '../components/WorkerFooter';
import GraphTable from "../components/Earnings&ReportGraphTable";


const EarningsReportPage: React.FC = () => {
  return (
    // 1. Main container for the entire page
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* 2. Navigation Bar */}
      <Header userName='Sherielyn Guadiana'/>

      {/* 3. Main Content Area */}
      <main className="pt-24 sm:pt-28 lg:pt-28 pl-8 pr-8 mt-4">
        <div className="py-6 sm:py-8 lg:py-10 px-6 sm:px-8 lg:px-10">
          <GraphTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EarningsReportPage;