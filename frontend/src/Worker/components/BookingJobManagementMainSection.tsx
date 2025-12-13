import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 

import { 
  ChevronDown, ChevronLeft, ChevronRight, X, CheckCircle,
  FileText, MessageSquare, Clock, Ban, Trash2, Loader2
} from 'lucide-react';

// --- Types ---
type JobStatus = 'Awaiting Response' | 'Ongoing' | 'Completed' | 'Declined';

interface Job {
  id: string;
  clientName: string;
  serviceType: string;
  dateTime: string;
  amount: string;
  status: JobStatus;
  location: string;
  rawBookingData: any; 
}

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);

  useEffect(() => {
    if (location.state && location.state.status) {
      setFilterStatus(location.state.status);
    }
    fetchWorkerAndJobs();
  }, [location]);

  const fetchWorkerAndJobs = async () => {
    setLoading(true);
    try {
        const storedUser = localStorage.getItem("currentUser");
        if (!storedUser) return;
        const user = JSON.parse(storedUser);

        const workerRes = await fetch("http://localhost:8080/api/worker/getAllWorkers");
        const workers = await workerRes.json();
        const myProfile = workers.find((w: any) => w.user.userId === user.userId);
        
        if (!myProfile) return;
        setCurrentWorkerId(myProfile.workerID);

        const bookingRes = await fetch(
          `http://localhost:8080/booking/worker/${myProfile.workerID}`
        );
        const myBookings = await bookingRes.json();

        const mappedJobs: Job[] = myBookings
        // --- CRITICAL FILTER CHANGE ---
        // Hide "Responded" because it belongs in Job Request Page
        // Hide "Client_Agreed" (legacy status)
        .filter((b: any) => b.status !== 'Client_Agreed' && b.status !== 'Responded')
        .map((b: any) => {
            
            let cName = "Unknown Client";
            if (b.client?.user?.name) {
                cName = `${b.client.user.name.firstName} ${b.client.user.name.lastName}`;
            }

            // --- STATUS MAPPING ---
            let uiStatus: JobStatus = 'Awaiting Response'; 
            
            if (b.status === 'Accepted') {
                uiStatus = 'Ongoing';
            } else if (b.status === 'Completed') {
                uiStatus = 'Completed';
            } 
            else if (b.status === 'Cancelled' || b.status === 'Declined') {
                uiStatus = 'Declined';
            } 
            else if (b.status === 'Pending') {
                uiStatus = 'Awaiting Response';
            }

            const date = new Date(b.scheduledDateTime);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return {
                id: b.bookingID.toString(),
                clientName: cName,
                serviceType: b.serviceCategory || "General Service",
                dateTime: dateStr,
                amount: b.payment ? `₱${b.payment.amount.toFixed(2)}` : "₱0.00",
                status: uiStatus,
                location: b.location,
                rawBookingData: b
            };
        });

        setJobs(mappedJobs);

    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setLoading(false);
    }
  };

  const updateBookingStatus = async (job: Job, newBackendStatus: string) => {
    try {
        const payload = { ...job.rawBookingData, status: newBackendStatus };
        // Clean payload to prevent 500 error if backend is strict
        // (Though for this specific file, usually just sending status is enough if backend is fixed)
        // But to be safe, you might need the sanitized payload approach here too if it crashes.
        
        const response = await fetch(`http://localhost:8080/booking/update?id=${job.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            fetchWorkerAndJobs(); 
        } else {
            alert("Failed to update status");
        }
    } catch (error) {
        console.error("Update error:", error);
    }
  };

  const handleCancelApplication = async (job: Job) => {
    if (window.confirm("Are you sure you want to cancel your application?")) {
       await updateBookingStatus(job, "Cancelled");
    }
  };

  const handleMarkCompleted = async (job: Job) => {
      if (window.confirm("Are you sure you want to mark this job as completed?")) {
         await updateBookingStatus(job, "Completed");
      }
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm("Delete this record?")) {
        try {
            await fetch(`http://localhost:8080/booking/delete/${id}`, { method: "DELETE" });
            setJobs(prev => prev.filter(job => job.id !== id));
        } catch (e) { console.error(e); }
    }
  };

  const filteredJobs = jobs.filter(job => 
    filterStatus === 'All Status' ? true : job.status === filterStatus
  );

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Awaiting Response':
        return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Awaiting Response</span>;
      case 'Ongoing':
        return <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><CheckCircle size={12}/> Completed</span>;
      case 'Declined':
        return <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Ban size={12}/> Declined</span>;
      default:
        return <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">
      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ongoing</h4>
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Ongoing').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Awaiting</h4>
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Awaiting Response').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h4>
            <span className="text-3xl font-semibold text-gray-800">{jobs.filter(j => j.status === 'Completed').length}</span>
          </div>
        </div>

        {/* Filter */}
        <div className="w-full lg:w-[300px] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
            <div className="relative">
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none">
                    <option>All Status</option>
                    <option value="Awaiting Response">Awaiting Response</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Declined</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none"/>
            </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[500px] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Booking Management</h2>
        
        <div className="overflow-x-auto flex-1">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20"><Loader2 className="animate-spin text-blue-500 mb-2"/> Loading...</div>
          ) : (
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Client</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Service</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Date</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Amount</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase text-center w-[220px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">{job.clientName}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{job.serviceType}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{job.dateTime}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-800">{job.amount}</td>
                  <td className="py-4 px-4">{getStatusBadge(job.status)}</td>
                  
                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2 w-full">
                      {job.status === 'Awaiting Response' && (
                        <button onClick={() => handleCancelApplication(job)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100">
                           <X size={14} /> Cancel Application
                        </button>
                      )}
                      {job.status === 'Ongoing' && (
                        <>
                            <button onClick={() => handleMarkCompleted(job)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8]">
                                <CheckCircle size={14} /> Mark as Completed
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-[#4D7EAF] text-xs font-medium hover:bg-gray-50">
                                <MessageSquare size={14} /> Message
                            </button>
                        </>
                      )}
                      {job.status === 'Completed' && (
                          <button onClick={() => navigate("/worker/reviews", { state: { jobId: job.id } })} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-xs font-medium hover:bg-orange-100">
                            <FileText size={14} /> View Review
                          </button>
                      )}
                      {job.status === 'Declined' && (
                          <button onClick={() => handleDeleteJob(job.id)} className="text-gray-400 hover:text-red-500 text-xs mx-auto flex items-center gap-1"><Trash2 size={12}/> Remove</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingJobManagementMainSection;