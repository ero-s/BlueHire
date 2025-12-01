import React, { useState, useEffect } from 'react'; // Added useEffect
import { useLocation, useNavigate } from 'react-router-dom'; // Added useLocation

import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X, 
  Eye, 
  CheckCircle,
  FileText
} from 'lucide-react';

// --- Types ---
type JobStatus = 'Pending' | 'Ongoing' | 'Completed';

interface Job {
  id: string;
  clientName: string;
  serviceType: string;
  dateTime: string;
  duration: string;
  amount: string;
  status: JobStatus;
  location: string;
}

// --- Mock Data ---
const MOCK_JOBS: Job[] = [
  { id: '1', clientName: 'Floyd Miles', serviceType: 'House Cleaning', dateTime: 'Jan 15, 2025 - 9:00 AM', duration: '3 hours', amount: '₱400.00', status: 'Pending', location: 'Cebu City' },
  { id: '2', clientName: 'Ronald Richards', serviceType: 'Laundry & Ironing', dateTime: 'Sept 15, 2025 - 9:00 AM', duration: '4 hours', amount: '₱260.00', status: 'Ongoing', location: 'Liloan' },
  { id: '3', clientName: 'Marvin McKinney', serviceType: 'Cooking / Meal Prep', dateTime: 'May 15, 2025 - 9:00 AM', duration: '2 hours', amount: '₱300.00', status: 'Completed', location: 'Talisay' },
  { id: '4', clientName: 'Tesla Gonzaga', serviceType: 'Gardening / Yard Work', dateTime: 'May 15, 2025 - 9:00 AM', duration: '5 hours', amount: '₱520.00', status: 'Completed', location: 'Cordova' },
  { id: '5', clientName: 'Jerome Bell', serviceType: 'Plumbing', dateTime: 'Sept 15, 2025 - 9:00 AM', duration: '1 hour', amount: '₱450.00', status: 'Pending', location: 'Cebu City' },
  { id: '6', clientName: 'Kathryn Murphy', serviceType: 'Electrical Repair', dateTime: 'Sept 15, 2025 - 9:00 AM', duration: '2 hours', amount: '₱500.00', status: 'Pending', location: 'Consolacion' },
  { id: '7', clientName: 'Jacob Jones', serviceType: 'Appliance Repair', dateTime: 'April 15, 2025 - 9:00 AM', duration: '2 hours', amount: '₱470.00', status: 'Pending', location: 'Cebu City' },
  { id: '8', clientName: 'Kristin Watson', serviceType: 'Car Wash & Detailing', dateTime: 'Feb 15, 2025 - 9:00 AM', duration: '2 hours', amount: '₱340.00', status: 'Pending', location: '₱340.00' }, 
];

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation(); // Hook to access state passed via navigate
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  // const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // --- EFFECT: Listen for incoming navigation state ---
  useEffect(() => {
    // If state exists and has a 'status' property, set the filter
    if (location.state && location.state.status) {
      setFilterStatus(location.state.status);
    }
  }, [location]);

  // Filter Logic
  const filteredJobs = MOCK_JOBS.filter(job => 
    filterStatus === 'All Status' ? true : job.status === filterStatus
  );

  // --- Helper: Status Badge ---
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs">Pending</span>;
      case 'Ongoing':
        return <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs">Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs">Completed</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">
      
      {/* --- Top Section: Stats & Filter --- */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Stats Card */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ongoings</h4>
            <span className="text-3xl font-semibold text-gray-800">2</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending</h4>
            <span className="text-3xl font-semibold text-gray-800">10</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h4>
            <span className="text-3xl font-semibold text-gray-800">37</span>
          </div>
        </div>

        {/* Filter Card */}
        <div className="w-full lg:w-[400px] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <label className="text-xs font-bold text-gray-500 mb-2 uppercase">Filter by Status</label>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent text-sm cursor-pointer"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content: Table --- */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[600px] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Booking/Job Management</h2>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Client Name</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Service Type</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Job Date & Time</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Duration</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Amount / Rate</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Location</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase text-center w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4 text-sm font-medium text-gray-800">{job.clientName}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.serviceType}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.dateTime}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.duration}</td>
                  <td className="py-6 px-4 text-sm font-bold text-gray-800">{job.amount}</td>
                  <td className="py-6 px-4">{getStatusBadge(job.status)}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.location}</td>
                  
                  {/* Actions Column */}
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center w-full">
                      
                      {job.status === 'Pending' && (
                        <>
                          <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-medium hover:bg-emerald-100 transition-colors">
                            <Check size={14} /> Accept
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 text-xs font-medium hover:bg-rose-100 transition-colors">
                            <X size={14} /> Decline
                          </button>
                        </>
                      )}

                      {job.status === 'Ongoing' && (
                        <>
                          <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8] shadow-sm transition-colors">
                             <CheckCircle size={14} /> Mark Completed
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs font-medium hover:bg-gray-50 transition-colors">
                             <Eye size={14} /> View Details
                          </button>
                        </>
                      )}

                      {job.status === 'Completed' && (
                         <button 
                          // 3. UPDATED: Navigate with State
                          onClick={() => navigate("/worker/reviews", { state: { jobId: job.id } })}
                          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-xs font-medium hover:bg-orange-100 transition-colors"
                        >
                          <FileText size={14} /> View Review
                        </button>
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredJobs.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">No jobs found.</div>
          )}
        </div>

        {/* --- Pagination --- */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">
            Showing data 1 to {filteredJobs.length} of 256K entries
          </span>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#4D7EAF] text-white text-sm font-medium shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 text-sm">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 text-sm">4</button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500 text-sm">40</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingJobManagementMainSection;