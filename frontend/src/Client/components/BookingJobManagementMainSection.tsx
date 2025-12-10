import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, ChevronLeft, ChevronRight, X, MessageSquare,
  Star, Clock, CheckCircle, Ban, Loader2, RotateCw
} from 'lucide-react';

// --- Types ---
// Added 'Responded' to the type definition
type BookingStatus = 'Pending' | 'Responded' | 'Client_Agreed' | 'Accepted' | 'Completed' | 'Declined' | 'Cancelled';

interface Booking {
  id: string;
  workerName: string;
  serviceType: string;
  dateTime: string;
  duration: string;
  amount: string;
  status: BookingStatus;
  location: string;
  avatar: string;
  rawBooking: any;
}

const ClientBookingManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("currentUser");
            if (!storedUser) return;
            const user = JSON.parse(storedUser);

            const response = await fetch("http://localhost:8080/booking/getAll");
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const allBookings = await response.json();

            // Filter: Bookings where the logged-in user is the CLIENT
            // AND ensure a worker is assigned
            const myBookings = allBookings.filter((b: any) => 
                b.client && 
                b.client.user && 
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

                return {
                    id: b.bookingID.toString(),
                    workerName: workerName,
                    serviceType: b.serviceCategory || "General Service",
                    dateTime: new Date(b.scheduledDateTime).toLocaleDateString(),
                    duration: "TBD",
                    amount: b.payment ? `₱${b.payment.amount.toFixed(2)}` : "₱0.00",
                    status: b.status,
                    location: b.location,
                    avatar: avatar,
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
    fetchData();
  }, []);

  // --- 2. Handle Status Updates ---
  const updateStatus = async (id: string, newStatus: string, rawBooking: any) => {
      try {
          console.log(`Updating Booking ${id} to ${newStatus}`);

          const payload = {
            bookingID: rawBooking.bookingID,
            jobTitle: rawBooking.jobTitle || "", 
            description: rawBooking.description || "",
            location: rawBooking.location || "",
            scheduledDateTime: rawBooking.scheduledDateTime,
            serviceCategory: rawBooking.serviceCategory || "",
            
            status: newStatus,

            client: null, 
            worker: null,
            payment: null 
          };
          
          console.log("Sending Payload:", JSON.stringify(payload)); 

          const response = await fetch(`http://localhost:8080/booking/update?id=${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
          });

          if (response.ok) {
              setBookings(prev => prev.map(b => 
                  b.id === id ? { ...b, status: newStatus as BookingStatus } : b
              ));
          } else {
              const errText = await response.text();
              console.error("Backend Error Details:", errText);
              alert(`Failed to update status. Server said: ${errText}`);
          }
      } catch (error) {
          console.error("Update error:", error);
          alert("Network error occurred.");
      }
  };

  // --- 3. Filter Logic ---
  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'All Status') return true;
    // Map Responded to "Ongoing" tab or create a new filter for it if you prefer
    if (filterStatus === 'Ongoing') return booking.status === 'Accepted' || booking.status === 'Responded'; 
    if (filterStatus === 'Pending') return booking.status === 'Pending';
    if (filterStatus === 'Completed') return booking.status === 'Completed';
    if (filterStatus === 'Cancelled') return booking.status === 'Cancelled' || booking.status === 'Declined';
    return true;
  });

  // --- Helper: Status Badge ---
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Needs Approval</span>;
      case 'Responded': // New Badge
        return <span className="text-blue-400 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Awaiting Worker</span>;
      case 'Client_Agreed':
        return <span className="text-blue-400 font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Waiting for Worker</span>;
      case 'Accepted': 
        return <span className="text-[#4D7EAF] font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Clock size={12}/> Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><Star size={12}/> Completed</span>;
      case 'Declined':
      case 'Cancelled':
        return <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit"><X size={12}/> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto relative">
      
      {/* Top Section */}
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
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Worker</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Service</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Date & Time</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Duration</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Price</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="py-4 px-4 text-xs font-semibold text-gray-400 uppercase text-center w-[180px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
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
                  <td className="py-6 px-4 text-sm text-gray-600">{booking.duration}</td>
                  <td className="py-6 px-4 text-sm font-bold text-[#4D7EAF]">{booking.amount}</td>
                  <td className="py-6 px-4">{getStatusBadge(booking.status)}</td>
                  
                  {/* Actions Column */}
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center w-full">
                      
                      {/* PENDING: Show Accept / Decline */}
                      {booking.status === 'Pending' && (
                        <>
                            {/* CHANGED: Passing 'Responded' here */}
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

                      {/* Other buttons remain same... */}
                      {booking.status === 'Accepted' && (
                        <button 
                            onClick={() => navigate('/client/chat')}
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-[#4D7EAF] text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                            <MessageSquare size={14} /> Chat Worker
                        </button>
                      )}

                      {/* Responded State (Waiting for Worker) */}
                      {booking.status === 'Responded' && (
                          <span className="text-xs text-gray-400 italic">Waiting for worker confirmation...</span>
                      )}

                      {booking.status === 'Completed' && (
                        <button 
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#4D7EAF] text-white text-xs font-medium hover:bg-[#3d6691] shadow-sm transition-colors"
                        >
                            <RotateCw size={14} /> Rehire
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
    </div>
  );
};

export default ClientBookingManagementMainSection;