import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 

import { 
  ChevronDown, ChevronLeft, ChevronRight, X, CheckCircle,
  FileText, MessageSquare, Clock, Ban, Trash2, Loader2
} from 'lucide-react';

// Import the new modal
import ViewReviewModal from './ViewReviewModal';

// --- Types ---
type JobStatus = 'Awaiting Response' | 'Ongoing' | 'Completed' | 'Declined' | 'Cancelled';

interface ReviewData {
    reviewId: number;
    rating: number;
    feedback: string;
    reviewDate: string;
}

interface Job {
  id: string;
  clientName: string;
  serviceType: string;
  dateTime: string;
  amount: string;
  status: JobStatus;
  location: string;
  rawBookingData: any;
  paymentStatus: 'SUCCESS' | 'PENDING' | 'FAILED' | 'N/A';
  // Add optional review data to the Job interface
  review?: ReviewData;
}

const BookingJobManagementMainSection: React.FC = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);

  // --- Modal State ---
  const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<{
      clientName: string;
      rating: number;
      feedback: string;
      date: string;
  } | null>(null);

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

        // 1. Fetch Worker Profile
        const workerRes = await fetch("http://localhost:8080/api/worker/getAllWorkers");
        const workers = await workerRes.json();
        const myProfile = workers.find((w: any) => w.user.userId === user.userId);
        
        if (!myProfile) return;
        setCurrentWorkerId(myProfile.workerID);

        // 2. Fetch Bookings
        const bookingRes = await fetch("http://localhost:8080/booking/getAll");
        const allBookings = await bookingRes.json();

        // 3. Fetch Reviews (To check if a rating exists)
        let allReviews: any[] = [];
        try {
            const reviewRes = await fetch("http://localhost:8080/reviews");
            if(reviewRes.ok) allReviews = await reviewRes.json();
        } catch(e) { console.error("Could not fetch reviews"); }

        // 4. Filter and Map
        const myBookings = allBookings.filter((b: any) => 
            b.worker && b.worker.workerID === myProfile.workerID
        );

        const mappedJobs: Job[] = myBookings
        .filter((b: any) => b.status !== 'Client_Agreed' && b.status !== 'Responded')
        .map((b: any) => {
            
            let cName = "Unknown Client";
            if (b.client?.user?.name) {
                cName = `${b.client.user.name.firstName} ${b.client.user.name.lastName}`;
            }

            let uiStatus: JobStatus = 'Awaiting Response'; 
            if (b.status === 'Accepted') uiStatus = 'Ongoing';
            else if (b.status === 'Completed') uiStatus = 'Completed';
            else if (b.status === 'Cancelled') uiStatus = 'Cancelled';
            else if (b.status === 'Declined') uiStatus = 'Declined';
            else if (b.status === 'Pending') uiStatus = 'Awaiting Response';

            const date = new Date(b.scheduledDateTime);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const pStatus = b.payment ? b.payment.status : 'N/A';

            // Find matching review for this booking
            const matchedReview = allReviews.find((r: any) => r.booking?.bookingID === b.bookingID);

            return {
                id: b.bookingID.toString(),
                clientName: cName,
                serviceType: b.serviceCategory || "General Service",
                dateTime: dateStr,
                amount: b.payment ? `₱${b.payment.amount.toFixed(2)}` : "₱0.00",
                status: uiStatus,
                location: b.location,
                rawBookingData: b,
                paymentStatus: pStatus,
                // Attach review data if it exists
                review: matchedReview ? {
                    reviewId: matchedReview.reviewid,
                    rating: matchedReview.rating,
                    feedback: matchedReview.feedback,
                    reviewDate: matchedReview.reviewDate
                } : undefined
            };
        });

        mappedJobs.sort((a, b) => Number(b.id) - Number(a.id));
        setJobs(mappedJobs);

    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        setLoading(false);
    }
  };

  // --- Handlers ---

  const handleViewReviewClick = (job: Job) => {
      if (job.review) {
          setSelectedReview({
              clientName: job.clientName,
              rating: job.review.rating,
              feedback: job.review.feedback,
              date: job.review.reviewDate || job.dateTime
          });
          setIsViewReviewOpen(true);
      } else {
          alert("No review has been submitted for this job yet.");
      }
  };

  const updateBookingStatus = async (job: Job, newBackendStatus: string) => {
    try {
        const payload = { ...job.rawBookingData, status: newBackendStatus };
        const response = await fetch(`http://localhost:8080/booking/update?id=${job.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (response.ok) fetchWorkerAndJobs(); 
        else alert("Failed to update status");
    } catch (error) { console.error("Update error:", error); }
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
    if (window.confirm("Are you sure you want to remove this record history?")) {
        try {
            await fetch(`http://localhost:8080/booking/delete/${id}`, { method: "DELETE" });
            setJobs(prev => prev.filter(job => job.id !== id));
        } catch (e) { console.error(e); }
    }
  };

  const handleMessageClick = (job: Job) => {
    const clientUser = job.rawBookingData?.client?.user;
    if (clientUser) {
        navigate('/worker/chat', { 
            state: { 
                targetUserId: clientUser.userId,
                targetUserName: `${clientUser.name.firstName} ${clientUser.name.lastName}`
            } 
        });
    } else {
        navigate('/worker/chat');
    }
  };

  const filteredJobs = jobs.filter(job => 
    filterStatus === 'All Status' ? true : job.status === filterStatus
  );

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Awaiting Response': return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Awaiting Response</span>;
      case 'Ongoing': return <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Ongoing</span>;
      case 'Completed': return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><CheckCircle size={12}/> Completed</span>;
      case 'Declined': return <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><X size={12}/> Declined</span>;
      case 'Cancelled': return <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Ban size={12}/> Cancelled</span>;
      default: return <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs">{status}</span>;
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
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none cursor-pointer">
                    <option>All Status</option>
                    <option value="Awaiting Response">Awaiting Response</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Declined</option>
                    <option>Cancelled</option>
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
                  
                  {/* Amount & Payment Badge */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-800">{job.amount}</span>
                        {job.status === 'Completed' && (
                            job.paymentStatus === 'SUCCESS' ? (
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full w-fit flex items-center gap-1 mt-1">
                                    <CheckCircle size={10} /> PAID
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full w-fit mt-1">
                                    UNPAID
                                </span>
                            )
                        )}
                    </div>
                  </td>

                  <td className="py-4 px-4">{getStatusBadge(job.status)}</td>
                  
                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-2 w-full">
                      
                      {job.status === 'Awaiting Response' && (
                        <button onClick={() => handleCancelApplication(job)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors">
                           <X size={14} /> Cancel Application
                        </button>
                      )}

                      {job.status === 'Ongoing' && (
                        <>
                            <button onClick={() => handleMarkCompleted(job)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8] transition-colors">
                                <CheckCircle size={14} /> Mark as Completed
                            </button>
                            <button onClick={() => handleMessageClick(job)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-[#4D7EAF] text-xs font-medium hover:bg-gray-50 transition-colors">
                                <MessageSquare size={14} /> Message
                            </button>
                        </>
                      )}

                      {/* View Review Button - Only shows if review exists */}
                      {job.status === 'Completed' && job.review && (
                          <button 
                            onClick={() => handleViewReviewClick(job)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-xs font-medium hover:bg-orange-100 transition-colors"
                          >
                            <FileText size={14} /> View Review
                          </button>
                      )}

                      {(job.status === 'Declined' || job.status === 'Cancelled') && (
                          <button onClick={() => handleDeleteJob(job.id)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-gray-50 text-xs font-medium transition-colors">
                            <Trash2 size={14}/> Remove
                          </button>
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

      {/* View Review Modal */}
      <ViewReviewModal 
        isOpen={isViewReviewOpen}
        onClose={() => setIsViewReviewOpen(false)}
        review={selectedReview}
      />

    </div>
  );
};

export default BookingJobManagementMainSection;