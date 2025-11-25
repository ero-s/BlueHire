import React from 'react';
import WorkerNavbar from "../components/WorkerNavbar";
import JobRequestTable from "../components/JobRequestTable";
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react'; 

const JobRequestPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <WorkerNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/workerDashboard')} 
          className="flex items-center gap-2 mb-6 text-gray-500 hover:text-[#4D7EAF] transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <JobRequestTable />
      </main>
    </div>
  );
};

export default JobRequestPage;