import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

interface Payment {
  amount: number;
}

interface Job {
  id: string;
  client: {
    user: {
      name: {
        fname: string;
        middlename?: string;
        lname: string;
      }
    }
  };
  serviceType: string;
  dateTime: string;
  duration: string;
  status: JobStatus;
  location: string;
  payment: Payment;
}

// --- Constants ---
const ITEMS_PER_PAGE = 10;

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // --- Fetch bookings from backend ---
  useEffect(() => {
    fetch('/booking/getAll') // Replace with your real API endpoint
      .then(res => res.json())
      .then((data: Job[]) => {
        setJobs(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
      })
      .catch(err => console.error('Failed to fetch bookings:', err));
  }, []);

  // --- Listen for navigation state for filter ---
  useEffect(() => {
    if (location.state && location.state.status) {
      setFilterStatus(location.state.status);
    }
  }, [location]);

  // --- Filter jobs ---
  const filteredJobs = jobs.filter(job => 
    filterStatus === 'All Status' ? true : job.status === filterStatus
  );

  // --- Pagination logic ---
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    if (page < 1 || page > pages) return;
    setCurrentPage(page);
  };

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
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Ongoing').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending</h4>
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Pending').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h4>
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Completed').length}</span>
          </div>
        </div>

        {/* Filter Card */}
        <div className="w-full lg:w-[400px] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <label className="text-xs font-bold text-gray-500 mb-2 uppercase">Filter by Status</label>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
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
              {paginatedJobs.map((job) => (
                <tr key={job.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4 text-sm font-medium text-gray-800">
                    {job.client?.user?.name
                      ? `${job.client.user.name.fname} ${job.client.user.name.middlename ? job.client.user.name.middlename + ' ' : ''}${job.client.user.name.lname}`
                      : 'No Name'}
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.serviceType}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.dateTime}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{job.duration}</td>
                  <td className="py-6 px-4 text-sm font-bold text-gray-800">₱{job.payment?.amount}</td>
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
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
              <div className="bg-gray-50 p-4 rounded-full mb-3">
                <CheckCircle size={32} className="text-gray-300" />
              </div>
              <p className="text-sm">
                {filterStatus === 'All Status'
                  ? 'No jobs found.'
                  : `No ${filterStatus.toLowerCase()} jobs found.`}
              </p>
            </div>
          )}

        </div>

        {/* --- Pagination --- */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} entries
          </span>
          
          <div className="flex items-center gap-1">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100"
              onClick={() => changePage(currentPage - 1)}
            >
              <ChevronLeft size={16} />
            </button>

            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                  currentPage === i + 1 ? 'bg-[#4D7EAF] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'
                }`}
                onClick={() => changePage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button 
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100"
              onClick={() => changePage(currentPage + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingJobManagementMainSection;
