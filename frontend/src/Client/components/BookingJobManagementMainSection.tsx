import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronLeft, ChevronRight, X, MessageSquare,
  Star, Clock, CheckCircle, Ban, Loader2, RotateCw, Trash2, CreditCard
} from 'lucide-react';

// Import MODALS
import PostJobModal from './PostJobModal'; 
import PaymentModal from './PaymentModal'; 
import ReviewModal from './ReviewModal'; 

// --- Types ---
type BookingStatus = 'Pending' | 'Responded' | 'Client_Agreed' | 'Accepted' | 'Completed' | 'Declined' | 'Cancelled';

interface Booking {
  id: string;
  bookingID: number; // <--- ADDED: Numeric Booking ID for display/sorting
  workerName: string;
  serviceType: string;
  dateTime: string;
  amount: string;
  status: BookingStatus;
  location: string;
  avatar: string;
  rawBooking: any;
  paymentStatus: 'PENDING' | 'SUCCESS' | 'FAILED' | 'N/A';
  paymentId: number | null;
  hasReview: boolean; 
}

const ClientBookingManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Modal States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); 
  
  const [rehireTarget, setRehireTarget] = useState<any>(null);
  const [paymentTarget, setPaymentTarget] = useState<Booking | null>(null);
  const [reviewTarget, setReviewTarget] = useState<Booking | null>(null);

  // --- 1. Fetch Data Function ---
  const fetchData = async () => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (!storedUser) return;
            const user = JSON.parse(storedUser);

            const response = await fetch("http://localhost:8080/booking/getAll");
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const allBookings = await response.json();

            // Fetch Reviews
            let reviews = [];
            try {
                // FIXED URL: Matches @RequestMapping("/reviews")
                const reviewRes = await fetch("http://localhost:8080/reviews"); 
                if (reviewRes.ok) reviews = await reviewRes.json();
            } catch (e) { console.log("Reviews fetch optional or failed"); }

            const myBookings = allBookings.filter((b: any) => 
                b.client && b.client.user && 
                b.client.user.userId === user.userId &&
                b.worker !== null 
            );

            const mappedBookings: Booking[] = myBookings.map((b: any) => {
                let workerName = "Pending Worker";
                let avatar = "https://i.pravatar.cc/150?u=default";
                
                if (b.worker && b.worker.user) {
                    workerName = `${b.worker.user.name.firstName} ${b.worker.user.name.lastName}`;
                    if (b.worker.user.photoURL) avatar = b.worker.user.photoURL;
                }

                const pStatus = b.payment ? b.payment.status : 'N/A';
                const pId = b.payment ? b.payment.paymentID : null;
                
                // Check if this booking ID exists in the fetched reviews
                // We check against rawBooking.bookingID
                const alreadyReviewed = reviews.some((r: any) => r.booking && r.booking.bookingID === b.bookingID);

                return {
                    id: b.bookingID.toString(),
                    bookingID: b.bookingID, // <--- MAPPING THE BOOKING ID
                    workerName: workerName,
                    serviceType: b.serviceCategory || "General Service",
                    dateTime: new Date(b.scheduledDateTime).toLocaleDateString(),
                    amount: b.payment ? `₱${b.payment.amount.toFixed(2)}` : "₱0.00",
                    status: b.status,
                    location: b.location,
                    avatar: avatar,
                    rawBooking: b,
                    paymentStatus: pStatus,
                    paymentId: pId,
                    hasReview: alreadyReviewed
                };
            });

            mappedBookings.sort((a, b) => new Date(b.rawBooking.scheduledDateTime).getTime() - new Date(a.rawBooking.scheduledDateTime).getTime());

            setBookings(mappedBookings);
        } catch (error) {
            console.error("Error loading client bookings:", error);
        } finally {
            setLoading(false);
        }
    };

  useEffect(() => {
    fetchData();
  }, []);

  // --- 2. Action Handlers (UNCHANGED) ---
  const handleRehireClick = (booking: Booking) => {
      if (booking.rawBooking && booking.rawBooking.worker) {
          setRehireTarget({
              workerId: booking.rawBooking.worker.workerID,
              workerName: booking.workerName,
              serviceCategory: booking.serviceType,
              location: booking.location
          });
          setIsModalOpen(true);
      } else {
          alert("Cannot rehire: Worker profile not found.");
      }
  };

  const handlePaymentClick = (booking: Booking) => {
      if(!booking.paymentId) {
          alert("No payment record found for this booking.");
          return;
      }
      setPaymentTarget(booking);
      setIsPaymentModalOpen(true);
  };

  const handleReviewClick = (booking: Booking) => {
      setReviewTarget(booking);
      setIsReviewModalOpen(true);
  };

  // --- SUBMIT REVIEW (UNCHANGED) ---
  const submitReview = async (rating: number, feedback: string) => {
      if (!reviewTarget) return;
      const bookingID = reviewTarget.rawBooking.bookingID;
      console.log("Submitting Review for Booking ID:", bookingID);
      // Simple YYYY-MM-DD string generation to ensure Java parsing compatibility
      const today = new Date();
      const dateString = today.getFullYear() + '-' + 
                         String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                         String(today.getDate()).padStart(2, '0');

      try {
          const payload = {
              rating: rating,
              feedback: feedback,
              reviewDate: dateString, 
              booking: { 
                  bookingID: bookingID,
                  bookingId: bookingID 
              }
          };

          const response = await fetch("http://localhost:8080/reviews", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (response.ok) {
              alert("Review submitted successfully!");
              fetchData(); 
          } else {
              // ERROR HANDLING: Alerts the specific backend error
              const errText = await response.text();
              console.error("Backend Review Error:", errText);
              alert("Server Error: " + errText);
          }
      } catch (error) {
          console.error("Review Network Error:", error);
          alert("Network connection error. Is the server running?");
      }
  };

  // --- PROCESS PAYMENT (UNCHANGED) ---
  const processPayment = async (paymentId: number, method: string) => {
      if (!paymentTarget) return;
      try {
          const payload = { 
              paymentID: paymentId,
              paymentMethod: method, 
              status: "SUCCESS", 
              amount: paymentTarget.rawBooking.payment.amount, 
              receiptNo: paymentTarget.rawBooking.payment.receiptNo, 
              booking: { bookingID: paymentTarget.rawBooking.bookingID } 
          };

          const response = await fetch(`http://localhost:8080/payment/update?id=${paymentId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (response.ok) {
              alert("Payment Successful!");
              fetchData(); 
          } else {
              const err = await response.text();
              console.error("Payment Backend Error:", err);
              alert("Payment failed: " + err); 
          }
      } catch (error) {
          console.error("Payment network error", error);
          alert("Network error processing payment.");
      }
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setRehireTarget(null);
  };

  // --- 3. Status Updates & Delete (UNCHANGED) ---
  const updateStatus = async (id: string, newStatus: string, rawBooking: any) => {
      try {
          const payload = {
            bookingID: rawBooking.bookingID,
            jobTitle: rawBooking.jobTitle || "", 
            description: rawBooking.description || "",
            location: rawBooking.location || "",
            scheduledDateTime: rawBooking.scheduledDateTime,
            serviceCategory: rawBooking.serviceCategory || "",
            status: newStatus,
            client: null, worker: null, payment: null 
          };
          
          const response = await fetch(`http://localhost:8080/booking/update?id=${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (response.ok) {
              setBookings(prev => prev.map(b => 
                  b.id === id ? { ...b, status: newStatus as BookingStatus } : b
              ));
          } else { alert(`Failed to update status.`); }
      } catch (error) { console.error("Update error:", error); }
  };

  const deleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently remove this booking history?")) return;
    try {
        const response = await fetch(`http://localhost:8080/booking/delete/${id}`, { method: 'DELETE' });
        if (response.ok) { setBookings(prev => prev.filter(b => b.id !== id)); }
        else { alert("Failed to delete booking."); }
    } catch (error) { console.error("Delete error:", error); }
  };

  // --- 4. Filter Logic & Helper: Status Badge (UNCHANGED) ---
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'All Status') return true;
    if (filterStatus === 'Ongoing') return booking.status === 'Accepted' || booking.status === 'Responded'; 
    if (filterStatus === 'Pending') return booking.status === 'Pending';
    if (filterStatus === 'Completed') return booking.status === 'Completed';
    if (filterStatus === 'Declined') return booking.status === 'Declined';
    if (filterStatus === 'Cancelled') return booking.status === 'Cancelled';
    return true;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending': return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Needs Approval</span>;
      case 'Responded': return <span className="text-blue-400 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Awaiting Worker</span>;
      case 'Accepted': return <span className="text-[#4D7EAF] font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Ongoing</span>;
      case 'Completed': return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Star size={12}/> Completed</span>;
      case 'Declined': return <span className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><X size={12}/> Declined</span>;
      case 'Cancelled': return <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Ban size={12}/> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto relative">
      
      {/* Top Section (UNCHANGED) */}
      <div className="flex flex-col lg:flex-row gap-6 justify-end">
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
              <option>Declined</option>
              <option>Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[600px] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">My Bookings</h2>

        <div className="overflow-x-auto flex-1">
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" /></div>
          ) : (
          <table className="w-full text-left border-collapse min-w-[1000px]"> {/* Increased min-width for new column */}
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">ID</th> {/* <-- NEW COLUMN HEADER */}
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Worker</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Service</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Date & Time</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Price & Payment</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase text-center w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
                  {/* Booking ID Cell */}
                  <td className="py-6 px-4 text-sm font-bold text-gray-700">{booking.bookingID}</td> 
                  
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <img src={booking.avatar} alt={booking.workerName} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{booking.workerName}</p>
                        <p className="text-xs text-gray-400">{booking.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-600">{booking.serviceType}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{booking.dateTime}</td>
                  
                  {/* Price & Payment Status */}
                  <td className="py-6 px-4">
                    <p className="text-sm font-bold text-[#4D7EAF]">{booking.amount}</p>
                    {booking.status === 'Completed' && (
                        <div className="mt-1">
                            {booking.paymentStatus === 'SUCCESS' ? (
                                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                                    <CheckCircle size={10}/> PAID
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">PENDING</span>
                            )}
                        </div>
                    )}
                  </td>

                  <td className="py-6 px-4">{getStatusBadge(booking.status)}</td>
                  
                  {/* Actions Column */}
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center w-full">
                      
                      {booking.status === 'Pending' && (
                        <>
                            <button 
                                onClick={() => updateStatus(booking.id, 'Responded', booking.rawBooking)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8] shadow-sm transition-colors"
                            >
                                <CheckCircle size={14} /> Accept
                            </button>
                            <button 
                                onClick={() => updateStatus(booking.id, 'Declined', booking.rawBooking)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                <X size={14} /> Decline
                            </button>
                        </>
                      )}

                      {booking.status === 'Accepted' && (
                        <button 
                            onClick={() => navigate('/client/chat')}
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-[#4D7EAF] text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                            <MessageSquare size={14} /> Chat Worker
                        </button>
                      )}

                      {booking.status === 'Responded' && (
                          <span className="text-xs text-gray-400 italic">Waiting for worker...</span>
                      )}

                      {/* COMPLETED ACTIONS */}
                      {booking.status === 'Completed' && (
                        <>
                            {/* IF UNPAID -> Pay Now */}
                            {booking.paymentStatus !== 'SUCCESS' ? (
                                <button 
                                    onClick={() => handlePaymentClick(booking)}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 shadow-sm transition-colors"
                                >
                                    <CreditCard size={14} /> Pay Now
                                </button>
                            ) : (
                                /* IF PAID -> Rehire + Review */
                                <>
                                    <button 
                                        onClick={() => handleRehireClick(booking)}
                                        className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#4D7EAF] text-white text-xs font-medium hover:bg-[#3d6691] shadow-sm transition-colors"
                                    >
                                        <RotateCw size={14} /> Rehire
                                    </button>
                                    
                                    {/* SHOW RATE & REVIEW BUTTON (Only if not already reviewed) */}
                                    {!booking.hasReview && (
                                        <button 
                                            onClick={() => handleReviewClick(booking)}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-500 text-xs font-medium hover:bg-orange-100 shadow-sm transition-colors"
                                        >
                                            <Star size={14} /> Rate & Review
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                      )}

                      {(booking.status === 'Cancelled' || booking.status === 'Declined') && (
                        <button 
                            onClick={() => deleteBooking(booking.id)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                            <Trash2 size={14} /> Remove
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

      {/* Modals (UNCHANGED) */}
      <PostJobModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        rehireDetails={rehireTarget}
        onSuccess={() => fetchData()} 
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => { setIsPaymentModalOpen(false); setPaymentTarget(null); }}
        booking={paymentTarget}
        onConfirmPayment={processPayment}
      />

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => { setIsReviewModalOpen(false); setReviewTarget(null); }}
        booking={reviewTarget}
        onSubmit={submitReview}
      />

    </div>
  );
};

export default ClientBookingManagementMainSection;