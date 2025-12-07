import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronLeft, ChevronRight, Check, X, Eye, CheckCircle, FileText 
} from 'lucide-react';

type JobStatus = 'Pending' | 'Accepted' | 'Completed' | 'Cancelled';

interface Worker {
  workerID: number;
  hourlyRate: number;
}

interface Client {
  clientID: number;
  user: {
    name: { fname: string; middlename?: string; lname: string };
  };
}

interface Job {
  id: string;
  client: Client;
  serviceCategory: string;
  scheduledDateTime: string;
  duration?: string;
  status: JobStatus;
  location: string;
  worker?: Worker;
}

const ITEMS_PER_PAGE = 10;

// Helper to format duration in hours and minutes
const formatDuration = (durationHours: string) => {
  const totalMinutes = Math.round(parseFloat(durationHours) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) return `${hours} hr ${minutes} min`;
  if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} min`;
  return 'Less than a minute';
};

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [modalType, setModalType] = useState<'accept' | 'view' | null>(null);

  // Fetch jobs
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    if (!user.userId) return;

    fetch(`http://localhost:8080/booking/getAll?userId=${user.userId}&role=WORKER`)
      .then(res => res.json())
      .then((data: any[]) => {
        if (!Array.isArray(data)) return setJobs([]);
        const mappedJobs: Job[] = data.map(job => ({
          id: job.bookingID,
          client: job.client,
          serviceCategory: job.serviceCategory,
          scheduledDateTime: job.scheduledDateTime,
          duration: job.duration ?? undefined,
          status: job.status === 'Accepted' ? 'Accepted' : job.status,
          location: job.location,
          worker: job.worker ? { workerID: job.worker.workerID, hourlyRate: job.worker.hourlyRate } : undefined,
        }));
        setJobs(mappedJobs);
      });
  }, []);

  useEffect(() => {
    if (location.state?.status) setFilterStatus(location.state.status);
  }, [location]);

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

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs">Pending</span>;
      case 'Accepted':
        return <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs">Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs">Completed</span>;
      case 'Cancelled':
        return <span className="text-rose-600 font-medium bg-rose-50 px-3 py-1 rounded-full text-xs">Cancelled</span>;
    }
  };

  const openAcceptModal = (job: Job) => {
    setSelectedJob(job);
    setModalType('accept');
  };

  const openViewModal = (job: Job) => {
    setSelectedJob(job);
    setModalType('view');
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalType(null);
  };

  // Accept Job → Pending to Accepted
  const acceptJob = async () => {
    if (!selectedJob) return;
    const updatedJob = { ...selectedJob, status: 'Accepted' };

    await fetch(`http://localhost:8080/booking/update?id=${selectedJob.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updatedJob,
        worker: selectedJob.worker,
        client: selectedJob.client,
      }),
    });

    setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, status: 'Accepted' } : j));
    closeModal();
  };

  // Complete Job → Accepted to Completed (calculate duration)
  const completeJob = async () => {
    if (!selectedJob || !selectedJob.worker) return;

    const startTime = new Date(selectedJob.scheduledDateTime).getTime();
    const endTime = Date.now();
    const durationHours = ((endTime - startTime) / (1000 * 60 * 60)).toFixed(2);

    const updatedJob: Job = {
      ...selectedJob,
      status: 'Completed',
      duration: durationHours,
    };

    await fetch(`http://localhost:8080/booking/update?id=${selectedJob.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updatedJob,
        worker: selectedJob.worker,
        client: selectedJob.client,
      }),
    });

    setJobs(prev => prev.map(j => j.id === selectedJob.id ? updatedJob : j));
    closeModal();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">

      {/* Top Stats + Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Stats */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          {['Accepted','Pending','Completed','Cancelled'].map((status, i) => (
            <div key={i} className="flex-1 px-2">
              <h4 className="text-xs font-bold text-gray-400 mb-2">{status === 'Accepted' ? 'Ongoings' : status}</h4>
              <span className="text-3xl font-semibold">{jobs.filter(j => j.status === status).length}</span>
            </div>
          ))}
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
              <option>Accepted</option>
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
                  <td className="py-6 px-4 font-medium">
                    {job.client?.user?.name
                      ? `${job.client.user.name.fname} ${job.client.user.name.middlename ?? ''} ${job.client.user.name.lname}`
                      : 'No Name'}
                  </td>
                  <td className="py-6 px-4">{job.serviceCategory}</td>
                  <td className="py-6 px-4">{new Date(job.scheduledDateTime).toLocaleString([], {dateStyle:'medium', timeStyle:'short'})}</td>
                  <td className="py-6 px-4">
                    {job.status === 'Completed' && job.duration
                      ? formatDuration(job.duration)
                      : job.status === 'Pending'
                        ? 'Job not yet started'
                        : 'Job ongoing'}
                  </td>
                  <td className="py-6 px-4 font-bold">
                    ₱{job.worker 
                        ? job.status === 'Completed' && job.duration
                          ? (job.worker.hourlyRate * Number(job.duration)).toFixed(2)
                          : job.worker.hourlyRate.toFixed(2)
                        : 0}
                  </td>
                  <td className="py-6 px-4">{getStatusBadge(job.status)}</td>
                  <td className="py-6 px-4">{job.location}</td>
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center">

                      {job.status === 'Pending' && (
                        <>
                          <button onClick={() => openAcceptModal(job)} className="w-full px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs flex items-center gap-2 justify-center">
                            <Check size={14}/> Accept
                          </button>
                          <button className="w-full px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2 justify-center">
                            <X size={14}/> Decline
                          </button>
                        </>
                      )}

                      {job.status === 'Accepted' && (
                        <>
                          <button onClick={() => openAcceptModal(job)} className="w-full px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs flex gap-2 justify-center">
                            <CheckCircle size={14}/> Mark Completed
                          </button>
                          <button onClick={() => openViewModal(job)} className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs flex gap-2 justify-center">
                            <Eye size={14}/> View Details
                          </button>
                        </>
                      )}

                      {job.status === 'Completed' && (
                        <button onClick={() => navigate("/worker/reviews", { state: { jobId: job.id } })} className="w-full px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 text-xs flex gap-2 justify-center">
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

          {filteredJobs.length === 0 && (
            <div className="p-12 text-center text-gray-400">No jobs found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="pt-6 flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} entries
          </span>
          <div className="flex items-center gap-1">
            <button onClick={() => changePage(currentPage - 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg"><ChevronLeft size={16}/></button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i+1;
              return <button key={page} onClick={() => changePage(page)} className={`w-8 h-8 rounded-lg text-sm ${currentPage===page?'bg-[#4D7EAF] text-white':'bg-gray-50'}`}>{page}</button>;
            })}
            <button onClick={() => changePage(currentPage + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-lg"><ChevronRight size={16}/></button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedJob && modalType === 'accept' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Manage Job</h3>

            {selectedJob.status === 'Pending' && (
              <button onClick={acceptJob} className="w-full py-2 bg-[#5AB3E6] text-white rounded-xl mb-2">Accept Job</button>
            )}

            {selectedJob.status === 'Accepted' && (
              <button onClick={completeJob} className="w-full py-2 bg-emerald-600 text-white rounded-xl mb-2">Complete Job</button>
            )}

            <button onClick={closeModal} className="w-full py-2 mt-2 border rounded-xl text-gray-500">Close</button>
          </div>
        </div>
      )}

      {selectedJob && modalType === 'view' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Job Details</h3>
            <p className="text-sm text-gray-600 mb-4">Client: {selectedJob.client.user.name.fname} {selectedJob.client.user.name.lname}</p>
            <p className="text-sm text-gray-600 mb-4">Service: {selectedJob.serviceCategory}</p>
            <p className="text-sm text-gray-600 mb-4">Scheduled: {new Date(selectedJob.scheduledDateTime).toLocaleString()}</p>
            <p className="text-sm text-gray-600 mb-4">Location: {selectedJob.location}</p>
            <button onClick={closeModal} className="w-full py-2 border rounded-xl text-gray-500">Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingJobManagementMainSection;
