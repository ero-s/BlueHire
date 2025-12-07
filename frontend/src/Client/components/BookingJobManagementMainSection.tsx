import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MessageSquare,
  Star,
  Clock,
  RotateCw 
} from 'lucide-react';

// --- Types ---
type BookingStatus = 'Pending' | 'Ongoing' | 'Completed' | 'Cancelled';

interface Booking {
  id: string;
  worker: {
    user: {
      name: {
        fname: string;
        middlename?: string | null;
        lname: string;
      };
      photoURL: string | null;
    };
  };
  serviceCategory: string;
  scheduledDateTime: string;
  duration?: string;
  amount?: number;
  status: BookingStatus;
  location: string;
}

// --- Constants ---
const ITEMS_PER_PAGE = 5;

const ClientBookingManagementMainSection: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>('All Status');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Review State
  const [reviews, setReviews] = useState<Record<string, { rating: number; comment: string }>>({});

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // --- Fetch bookings from backend ---
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);

    fetch(`http://localhost:8080/booking/getAll?userId=${user.userId}&role=${user.role}`)
      .then(res => res.json())
      .then((data: any[]) => {

        const mapped = data.map(b => ({
          id: b.bookingID,
          worker: {
            user: {
              name: b.worker?.user?.name || { fname: "Unknown", lname: "" },
              photoURL: b.worker?.user?.photoURL || null,
            }
          },
          serviceCategory: b.serviceCategory,
          scheduledDateTime: b.scheduledDateTime,
          duration: b.duration ?? "N/A",
          amount: b.amount ?? 0,
          status: b.status === "Accepted" ? "Ongoing" : b.status,
          location: b.location
        }));

        setBookings(mapped);
      })
      .catch(err => console.error("Failed to fetch client bookings:", err));
  }, []);

  // --- Listen for incoming filter from dashboard ---
  useEffect(() => {
    if (location.state && location.state.status) {
      setFilterStatus(location.state.status);
    }
  }, [location]);

  // --- Filter bookings ---
  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'All Status' ? true : booking.status === filterStatus
  );

  // --- Pagination ---
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // --- Status Badge ---
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'Pending':
        return <span className="text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full text-xs flex items-center gap-1">Pending</span>;
      case 'Ongoing':
        return <span className="text-[#4D7EAF] font-medium bg-blue-50 px-3 py-1 rounded-full text-xs flex items-center gap-1"><Clock size={12}/> Ongoing</span>;
      case 'Completed':
        return <span className="text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full text-xs flex items-center gap-1"><Star size={12}/> Completed</span>;
      case 'Cancelled':
        return <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center gap-1"><X size={12}/> Cancelled</span>;
    }
  };

  // --- Modal Handlers ---
  const openRateModal = (bookingId: string) => {
    setCurrentBookingId(bookingId);
    if (reviews[bookingId]) {
      const existingReview = reviews[bookingId];
      setRating(existingReview.rating);
      setComment(existingReview.comment);
      setIsViewMode(true);
    } else {
      setRating(0);
      setComment('');
      setIsViewMode(false);
    }
    setIsModalOpen(true);
  };

  const closeRateModal = () => {
    setIsModalOpen(false);
    setCurrentBookingId(null);
  };

  const submitReview = () => {
    if (currentBookingId && rating > 0) {
      setReviews(prev => ({
        ...prev,
        [currentBookingId]: { rating, comment }
      }));
      closeRateModal();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto relative">

      {/* --- Top Section --- */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Stats */}
        <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm flex justify-between items-center text-center divide-x divide-gray-100">
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Active</h4>
            <span className="text-3xl font-semibold text-gray-800">{bookings.filter(b => b.status === 'Ongoing').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Completed</h4>
            <span className="text-3xl font-semibold text-gray-800">{bookings.filter(b => b.status === 'Completed').length}</span>
          </div>
          <div className="flex-1 px-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Spent</h4>
            <span className="text-3xl font-semibold text-[#4D7EAF]">
              ₱{bookings.reduce((sum, b) => sum + (b.amount || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Filter */}
        <div className="w-full lg:w-[400px] bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-center">
          <label className="text-xs font-bold text-gray-500 mb-2 uppercase">Filter by Status</label>
          <div className="relative">
            <select 
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent text-sm cursor-pointer"
            >
              <option>All Status</option>
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

      {/* --- Bookings Table --- */}
      <div className="bg-white rounded-3xl shadow-sm p-8 min-h-[600px] flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">My Bookings</h2>
        <div className="overflow-x-auto flex-1">
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
              {paginatedBookings.map(booking => (
                <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          booking.worker?.user?.photoURL && booking.worker.user.photoURL.trim() !== ""
                            ? booking.worker.user.photoURL
                            : `https://i.pravatar.cc/150?u=${booking.id}`
                        }
                        alt={
                          booking.worker?.user?.name
                            ? `${booking.worker.user.name.fname} ${booking.worker.user.name.middlename ?? ""} ${booking.worker.user.name.lname}`.trim()
                            : "Worker Avatar"
                        }
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {booking.worker?.user?.name
                            ? `${booking.worker.user.name.fname} ${booking.worker.user.name.lname}`
                            : "No Name"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-600">{booking.serviceCategory}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{new Date(booking.scheduledDateTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td className="py-6 px-4 text-sm text-gray-600">{booking.duration || 'N/A'}</td>
                  <td className="py-6 px-4 text-sm font-bold text-[#4D7EAF]">₱{booking.amount?.toLocaleString() || '0'}</td>
                  <td className="py-6 px-4">{getStatusBadge(booking.status)}</td>
                  <td className="py-6 px-4">
                    <div className="flex flex-col gap-2 items-center w-full">
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => console.log(`Cancel booking ${booking.id}`)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-200 text-yellow-800 text-xs font-medium hover:bg-yellow-300 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}

                      {booking.status === 'Ongoing' && (
                        <button 
                          onClick={() => navigate('/client/chat')}
                          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#5AB3E6] text-white text-xs font-medium hover:bg-[#4a9bc8] shadow-sm transition-colors"
                        >
                          <MessageSquare size={14} /> Chat Worker
                        </button>
                      )}

                      {booking.status === 'Completed' && (
                        <>
                          <button 
                            onClick={() => console.log(`Rehire ${booking.worker.user?.name.fname}`)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#4D7EAF] text-white text-xs font-medium hover:bg-[#3d6691] shadow-sm transition-colors"
                          >
                            <RotateCw size={14} /> Rehire
                          </button>

                          {reviews[booking.id] ? (
                            <button onClick={() => openRateModal(booking.id)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-orange-200 bg-orange-50 text-orange-600 text-xs font-medium hover:bg-orange-100 transition-colors">
                              <Star size={14} fill="currentColor" /> View Rate & Review
                            </button>
                          ) : (
                            <button onClick={() => openRateModal(booking.id)} className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-[#4D7EAF] text-[#4D7EAF] bg-blue-50 text-xs font-medium hover:bg-[#4D7EAF] hover:text-white transition-all">
                              <Star size={14} /> Rate & Review
                            </button>
                          )}
                        </>
                      )}

                      {booking.status === 'Cancelled' && (
                        <span className="text-gray-400 text-xs">No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="p-12 text-center flex flex-col items-center justify-center text-gray-400">
              <div className="bg-gray-50 p-4 rounded-full mb-3">
                <Clock size={32} className="text-gray-300"/>
              </div>
              <p className="text-sm">No bookings found with this status.</p>
            </div>
          )}
        </div>

        {/* --- Pagination --- */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredBookings.length)} of {filteredBookings.length} bookings
          </span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100" onClick={() => changePage(currentPage - 1)}>
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${currentPage === page ? 'bg-[#4D7EAF] text-white shadow-sm' : 'hover:bg-gray-50 text-gray-500'}`}
                  onClick={() => changePage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100" onClick={() => changePage(currentPage + 1)}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* --- Rating Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {isViewMode ? 'Review Details' : 'Rate & Review'}
              </h3>
              <button onClick={closeRateModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="mb-6 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => !isViewMode && setRating(star)}
                  className={`focus:outline-none transition-transform ${!isViewMode ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
                  disabled={isViewMode}
                >
                  <Star size={32} className={`${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isViewMode ? 'Your Review' : 'Write a review'}
              </label>
              <textarea 
                rows={4}
                className={`w-full border rounded-xl p-3 outline-none text-sm ${isViewMode ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
                placeholder="Share your experience working with this worker..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                readOnly={isViewMode}
              ></textarea>
            </div>
            <div className="flex gap-3">
              {isViewMode ? (
                <button onClick={closeRateModal} className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-colors">
                  Close
                </button>
              ) : (
                <>
                  <button onClick={closeRateModal} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={submitReview} disabled={rating === 0} className={`flex-1 py-2.5 rounded-xl text-white font-medium transition-colors ${rating === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#4D7EAF] hover:bg-blue-600'}`}>Submit Review</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClientBookingManagementMainSection;
