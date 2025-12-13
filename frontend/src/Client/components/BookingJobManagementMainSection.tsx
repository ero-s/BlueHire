import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronLeft, ChevronRight, X, MessageSquare,
  Star, Clock, CheckCircle, Ban, Loader2, RotateCw, Trash2, FileText
} from 'lucide-react';

// --- Types ---
type BookingStatus = 'Pending' | 'Responded' | 'Client_Agreed' | 'Accepted' | 'Completed' | 'Declined' | 'Cancelled';
type UIBookingStatus = 'Awaiting Response' | 'Ongoing' | 'Completed' | 'Declined';

interface Booking {
  id: string;
  workerName: string;
  workerAvatar: string;
  serviceType: string;
  dateTime: string;
  duration: string;
  amount: string;
  status: UIBookingStatus;
  backendStatus: BookingStatus;
  location: string;
  rawBooking: any;
}

const ClientBookingManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentClientId, setCurrentClientId] = useState<number | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAction, setPaymentAction] = useState<'update' | 'delete' | 'create' | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [activePaymentId, setActivePaymentId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"CASH"|"GCASH"|"MAYA">("GCASH");
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);


  // --- 1. Fetch Data ---
  useEffect(() => {
    if (location.state && location.state.status) {
      setFilterStatus(location.state.status);
    }
    fetchClientAndBookings();
  }, [location]);

  const fetchClientAndBookings = async () => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      // Fetch client profile
      const clientRes = await fetch("http://localhost:8080/api/client/getAllClients");
      const clients = await clientRes.json();
      const myProfile = clients.find((c: any) => c.user.userId === user.userId);
      
      if (!myProfile) return;
      setCurrentClientId(myProfile.clientID);

      // Use the new endpoint to fetch bookings by client ID
      const bookingRes = await fetch(`http://localhost:8080/booking/client/${myProfile.clientID}`);
      const myBookings = await bookingRes.json();

      const mappedBookings: Booking[] = myBookings
        // Filter out bookings without a worker
        .filter((b: any) => b.worker !== null)
        .map((b: any) => {
          let workerName = "Unknown Worker";
          let workerAvatar = "https://i.pravatar.cc/150?u=worker";
          
          // Extract worker info
          if (b.worker && b.worker.user) {
            // Try different name field patterns
            if (b.worker.user.name?.firstName && b.worker.user.name?.lastName) {
              workerName = `${b.worker.user.name.firstName} ${b.worker.user.name.lastName}`;
            } else if (b.worker.user.fname && b.worker.user.lname) {
              workerName = `${b.worker.user.fname} ${b.worker.user.lname}`;
            } else if (b.worker.user.username) {
              workerName = b.worker.user.username;
            }
            
            if (b.worker.user.photoURL) {
              workerAvatar = b.worker.user.photoURL;
            }
          }

          // Map backend status to UI status
          let uiStatus: UIBookingStatus = 'Awaiting Response';
          
          if (b.status === 'Accepted') {
            uiStatus = 'Ongoing';
          } else if (b.status === 'Completed') {
            uiStatus = 'Completed';
          } else if (b.status === 'Cancelled' || b.status === 'Declined') {
            uiStatus = 'Declined';
          } else if (b.status === 'Pending') {
            uiStatus = 'Awaiting Response';
          }

          const date = new Date(b.scheduledDateTime);
          const dateStr = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });

          return {
            id: b.bookingID.toString(),
            workerName,
            workerAvatar,
            serviceType: b.serviceCategory || "General Service",
            dateTime: dateStr,
            duration: b.duration || "Not specified",
            amount: b.payment ? `₱${b.payment.amount.toFixed(2)}` : "₱0.00",
            status: uiStatus,
            backendStatus: b.status,
            location: b.location || "Not specified",
            rawBooking: b
          };
        });

      setBookings(mappedBookings);
    } catch (error) {
      console.error("Error loading client bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. Handle Status Updates ---
  const updateBookingStatus = async (id: string, newBackendStatus: string, rawBooking: any) => {
    try {
      const payload = { 
        ...rawBooking, 
        status: newBackendStatus 
      };
      
      const response = await fetch(`http://localhost:8080/booking/update?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        fetchClientAndBookings(); // Refresh the list
      } else {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Network error occurred");
    }
  };

  // --- 3. Handle Delete ---
  const handleDeleteBooking = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await fetch(`http://localhost:8080/booking/delete/${id}`, { 
          method: "DELETE" 
        });
        setBookings(prev => prev.filter(booking => booking.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete booking");
      }
    }
  };

  // --- 4. Filter Logic ---
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'All Status') return true;
    if (filterStatus === 'Awaiting Response') return booking.status === 'Awaiting Response';
    if (filterStatus === 'Ongoing') return booking.status === 'Ongoing';
    if (filterStatus === 'Completed') return booking.status === 'Completed';
    if (filterStatus === 'Declined') return booking.status === 'Declined';
    return false;
  });

  // --- 5. Status Badge Helper ---
  const getStatusBadge = (status: UIBookingStatus) => {
    switch (status) {
      case 'Awaiting Response':
        return (
          <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
            <Clock size={12}/> Awaiting Response
          </span>
        );
      case 'Ongoing':
        return (
          <span className="text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
            <Clock size={12}/> Ongoing
          </span>
        );
      case 'Completed':
        return (
          <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
            <CheckCircle size={12}/> Completed
          </span>
        );
      case 'Declined':
        return (
          <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
            <Ban size={12}/> Declined
          </span>
        );
      default:
        return (
          <span className="text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-xs">
            {status}
          </span>
        );
    }
  };

  // --- 6. Stats Calculation ---
  const stats = {
    ongoing: bookings.filter(b => b.status === 'Ongoing').length,
    awaiting: bookings.filter(b => b.status === 'Awaiting Response').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">
      {/* Stats Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ongoing</h4>
            <span className="text-3xl font-semibold text-gray-800">{stats.ongoing}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Awaiting</h4>
            <span className="text-3xl font-semibold text-gray-800">{stats.awaiting}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h4>
            <span className="text-3xl font-semibold text-gray-800">{stats.completed}</span>
          </div>
        </div>

        {/* Filter */}
        <div className="w-full lg:w-[300px] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <div className="relative">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none"
            >
              <option>All Status</option>
              <option value="Awaiting Response">Awaiting Response</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Declined">Declined</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none"/>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[500px] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">My Bookings</h2>
        
        <div className="overflow-x-auto flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-blue-500 mb-2" size={24}/>
              <span className="text-gray-500">Loading bookings...</span>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Clock className="text-gray-300 mb-4" size={48}/>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No bookings found</h3>
              <p className="text-gray-400 text-sm">You don't have any bookings matching the current filter.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Worker</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Service</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Date</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Amount</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase text-center w-[220px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={booking.workerAvatar} 
                          alt={booking.workerName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{booking.workerName}</p>
                          <p className="text-xs text-gray-400">{booking.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{booking.serviceType}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{booking.dateTime}</td>
                    <td className="py-4 px-4 text-sm font-bold text-gray-800">{booking.amount}</td>
                    <td className="py-4 px-4">{getStatusBadge(booking.status)}</td>
                    
                    {/* Actions Column */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-2 w-full">
                        
                        {/* Awaiting Response: Client can Accept/Decline */}
                        {booking.status === 'Awaiting Response' && (
                          <>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'Accepted', booking.rawBooking)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8]"
                            >
                              <CheckCircle size={14}/> Accept
                            </button>
                            <button 
                              onClick={() => updateBookingStatus(booking.id, 'Declined', booking.rawBooking)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100"
                            >
                              <X size={14}/> Decline
                            </button>
                          </>
                        )}

                        {/* Ongoing: Client can Message & Process Payment */}
                        {booking.status === 'Ongoing' && (
                          <>
                            <button 
                              onClick={() => navigate('/client/chat', { state: { bookingId: booking.id } })}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-[#4D7EAF] text-xs font-medium hover:bg-gray-50"
                            >
                              <MessageSquare size={14}/> Message
                            </button>

                            <button
                              onClick={() => {
                                setCurrentBooking(booking); // store current booking
                                if (!booking.rawBooking.payment) {
                                  // No existing payment → create
                                  setPaymentAction('create');
                                  setPaymentAmount(booking.amount.replace('₱','') || '');
                                } else {
                                  // Existing payment → view/update/delete
                                  setActivePaymentId(booking.rawBooking.payment.paymentID);
                                  setPaymentAmount(booking.rawBooking.payment.amount?.toString() || '');
                                  setPaymentAction(null);
                                }
                                setPaymentModalOpen(true);
                              }}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-medium hover:bg-purple-600"
                            >
                              <CheckCircle size={14} /> Process Payment
                            </button>
                          </>
                        )}

                        {/* Completed: View Review or Rehire */}
                        {booking.status === 'Completed' && (
                          <>
                            <button 
                              onClick={() => navigate("/client/reviews", { state: { bookingId: booking.id } })}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-xs font-medium hover:bg-orange-100"
                            >
                              <FileText size={14}/> View Review
                            </button>
                            <button 
                              onClick={() => navigate("/client/book-service", { state: { workerId: booking.rawBooking.worker?.workerID } })}
                              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-green-200 bg-green-50 text-green-600 text-xs font-medium hover:bg-green-100"
                            >
                              <RotateCw size={14}/> Rehire
                            </button>
                          </>
                        )}

                        {/* Declined: Remove option */}
                        {booking.status === 'Declined' && (
                          <button 
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-gray-400 hover:text-red-500 text-xs mx-auto flex items-center gap-1"
                          >
                            <Trash2 size={12}/> Remove
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

      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-[340px] shadow-lg">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Process Payment
            </h3>

            {paymentAction === 'create' && currentBooking && (
              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Enter amount"
                />

                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as "CASH" | "GCASH" | "MAYA")}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="CASH">CASH</option>
                  <option value="GCASH">GCASH</option>
                  <option value="MAYA">MAYA</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="px-3 py-1.5 text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const newPayment = {
                          booking: { bookingID: currentBooking.rawBooking.bookingID },
                          amount: parseFloat(paymentAmount),
                          paymentMethod: paymentMethod,
                          status: "PENDING"
                        };

                        const res = await fetch("http://localhost:8080/payment/create", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(newPayment)
                        });

                        if (!res.ok) throw new Error("Failed to create payment");

                        alert("Payment created successfully");
                        setPaymentModalOpen(false);
                        setCurrentBooking(null);
                        fetchClientAndBookings();
                      } catch (err: any) {
                        alert(err.message || "Payment creation failed");
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg bg-purple-500 text-white text-sm"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {/* The update/delete logic remains unchanged */}
            {!paymentAction && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setPaymentAction('update')}
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm hover:bg-purple-600"
                >
                  Update Payment
                </button>
                <button
                  onClick={() => setPaymentAction('delete')}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Delete Payment
                </button>
                <button
                  onClick={() => setPaymentModalOpen(false)}
                  className="text-sm text-gray-500 mt-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {paymentAction === 'update' && (
              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Enter new amount"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="px-3 py-1.5 text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `http://localhost:8080/payment/update?id=${activePaymentId}`,
                          {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount: parseFloat(paymentAmount) })
                          }
                        );

                        if (!res.ok) throw new Error("Failed to update payment");

                        alert("Payment updated successfully");
                        fetchClientAndBookings();
                      } catch (err: any) {
                        alert(err.message || "Payment update failed");
                      } finally {
                        setPaymentModalOpen(false);
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg bg-purple-500 text-white text-sm"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {paymentAction === 'delete' && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete this payment?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="px-3 py-1.5 text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `http://localhost:8080/payment/delete/${activePaymentId}`,
                          { method: "DELETE" }
                        );

                        if (!res.ok) throw new Error("Failed to delete payment");

                        alert("Payment deleted successfully");
                        fetchClientAndBookings();
                      } catch (err: any) {
                        alert(err.message || "Payment delete failed");
                      } finally {
                        setPaymentModalOpen(false);
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    
  );
  
};

export default ClientBookingManagementMainSection;
