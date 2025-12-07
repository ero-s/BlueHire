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
type JobStatus = 'Pending' | 'Ongoing' | 'Completed' | 'Accepted' | 'Cancelled';

interface Worker {
  hourlyRate: number;
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
  serviceCategory: string;
  scheduledDateTime: string;
  duration?: string;
  amount?: number;
  status: JobStatus;
  location: string;
  worker?: Worker;
}

const ITEMS_PER_PAGE = 10;

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // --- Fetch bookings from backend ---
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    if (!user.userId) return;

    fetch(`http://localhost:8080/booking/getAll?userId=${user.userId}&role=WORKER`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          setJobs([]);
          return;
        }

        const mappedJobs: Job[] = data.map(job => ({
          id: job.bookingID,
          client: job.client,
          serviceCategory: job.serviceCategory,
          scheduledDateTime: job.scheduledDateTime,
          duration: job.duration ?? null,
          status: job.status === 'Accepted' ? 'Ongoing' : job.status,
          location: job.location,
          worker: job.worker ? { hourlyRate: job.worker.hourlyRate } : undefined,
          amount: job.amount ?? null 
        }));


        setJobs(mappedJobs);
      })
      .catch(err => console.error("Failed to fetch bookings:", err));
  }, []);


  // --- Filter from navigation ---
  useEffect(() => {
    if (location.state?.status) {
      setFilterStatus(location.state.status);
    }
  }, [location]);


  // --- Filter and paginate ---
  const filteredJobs = jobs.filter(job =>
    filterStatus === 'All Status' ? true : job.status === filterStatus
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Badge UI
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs">Pending</span>;
      case 'Ongoing':
        return <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs">Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs">Completed</span>;
      case 'Cancelled':
        return <span className="text-rose-600 font-medium bg-rose-50 px-3 py-1 rounded-full text-xs">Cancelled</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">

      {/* Top Stats + Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Stats */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 mb-2">Ongoings</h4>
            <span className="text-3xl font-semibold">{jobs.filter(j => j.status === 'Ongoing').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 mb-2">Pending</h4>
            <span className="text-3xl font-semibold">{jobs.filter(j => j.status === 'Pending').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 mb-2">Completed</h4>
            <span className="text-3xl font-semibold">{jobs.filter(j => j.status === 'Completed').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 mb-2">Cancelled</h4>
            <span className="text-3xl font-semibold">{jobs.filter(j => j.status === 'Cancelled').length}</span>
          </div>
        </div>

        {/* Filter */}
        <div className="w-full lg:w-[400px] bg-white rounded-3xl p-6 shadow-sm">
          <label className="text-xs font-bold text-gray-500 mb-2 uppercase">Filter by Status</label>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-gray-300 py-3 px-4 pr-8 rounded-xl focus:ring-2 focus:ring-[#5AB3E6] text-sm"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={16}/>
            </div>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[600px]">
        <h2 className="text-2xl font-semibold mb-8">Booking/Job Management</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Client Name</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Service Type</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Job Date & Time</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Duration</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Amount / Rate</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Status</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400">Location</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 text-center w-[180px]">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedJobs.map((job, index) => (
                <tr key={`${job.id}-${index}`} className="hover:bg-gray-50">
                  
                  {/* Client Name */}
                  <td className="py-6 px-4 font-medium">
                    {job.client?.user?.name
                      ? `${job.client.user.name.fname} ${job.client.user.name.middlename ?? ''} ${job.client.user.name.lname}`
                      : 'No Name'}
                  </td>

                  {/* Service */}
                  <td className="py-6 px-4">{job.serviceCategory}</td>

                  {/* Date */}
                  <td className="py-6 px-4">
                    {new Date(job.scheduledDateTime).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>

                  {/* Duration */}
                  <td className="py-6 px-4">{job.duration || 'N/A'}</td>

                  {/* Rate */}
                  <td className="py-6 px-4 font-bold">₱{job.worker?.hourlyRate ?? 0}</td>

                  {/* Status */}
                  <td className="py-6 px-4">{getStatusBadge(job.status)}</td>

                  {/* Location */}
                  <td className="py-6 px-4">{job.location}</td>

                  {/* Actions */}
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center">
                      {job.status === 'Pending' && (
                        <>
                          <button className="w-full px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium flex items-center gap-2 justify-center">
                            <Check size={14}/> Accept
                          </button>
                          <button className="w-full px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center gap-2 justify-center">
                            <X size={14}/> Decline
                          </button>
                        </>
                      )}

                      {job.status === 'Ongoing' && (
                        <>
                          <button className="w-full px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs flex gap-2 justify-center">
                            <CheckCircle size={14}/> Mark Completed
                          </button>
                          <button className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs flex gap-2 justify-center">
                            <Eye size={14}/> View Details
                          </button>
                        </>
                      )}

                      {job.status === 'Completed' && (
                        <button
                          onClick={() => navigate("/worker/reviews", { state: { jobId: job.id } })}
                          className="w-full px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs flex gap-2 justify-center"
                        >
                          <FileText size={14}/> View Review
                        </button>
                      )}

                      {job.status === 'Cancelled' && (
                        <button className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-xs flex gap-2 justify-center">
                          <Eye size={14}/> View Details
                        </button>
                      )}
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* No results */}
          {filteredJobs.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              No jobs found.
            </div>
          )}

        </div>

        {/* Pagination */}
        <div className="pt-6 flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} entries
          </span>

          <div className="flex items-center gap-1">
            <button onClick={() => changePage(currentPage - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
              <ChevronLeft size={16}/>
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`w-8 h-8 rounded-lg text-sm ${
                    currentPage === page ? 'bg-[#4D7EAF] text-white' : 'bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button onClick={() => changePage(currentPage + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg">
              <ChevronRight size={16}/>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingJobManagementMainSection;
