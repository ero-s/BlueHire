import React from 'react';
import Header from "../components/WorkerHeader";
import JobRequestTable from "../components/JobRequestTable";

const JobRequestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName='Sherielyn Guadiana'/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24">
        <JobRequestTable />
      </main>
    </div>
  );
};

export default JobRequestPage;