import { useNavigate } from "react-router-dom";
import { MOCK_BOOKINGS } from "../pages/Bookings";
import { ChevronRight, Clock } from "lucide-react";

interface PendingRequestsProps {
  count?: number;
}

export default function PendingRequests({ count }: PendingRequestsProps) {
  const navigate = useNavigate();

  // Filter for pending bookings
  const pendingBookings = MOCK_BOOKINGS.filter(
    (b) => b.status === "Pending",
  ).slice(0, count || 5);

  const handleItemClick = (bookingId: string) => {
    // Redirect to bookings page and pass the ID to highlight
    navigate("/bookings", { state: { highlightId: bookingId } });
  };

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex-1 flex flex-col h-full min-w-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Pending Requests</h2>
        <button
          onClick={() => navigate("/client/bookings")}
          className="text-sm text-[#4F7FAF] font-semibold hover:underline"
        >
          View All
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1">
        {pendingBookings.length > 0 ? (
          pendingBookings.map((booking) => (
            <div
              key={booking.id}
              onClick={() => handleItemClick(booking.id)}
              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-blue-50 cursor-pointer transition-colors border border-transparent hover:border-blue-100 group"
            >
              <img
                src={booking.worker.avatar}
                alt={booking.worker.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-100"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">
                  {booking.worker.name}
                </h4>
                <p className="text-xs text-gray-500 mb-1">
                  {booking.worker.category}
                </p>
                <div className="flex items-center gap-1 text-xs text-[#4F7FAF]">
                  <Clock size={12} />
                  <span>{booking.serviceDate.split("•")[0]}</span>
                </div>
              </div>

              <div className="text-gray-300 group-hover:text-[#4F7FAF] transition-colors">
                <ChevronRight size={20} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <Clock size={32} className="mb-2 opacity-20" />
            <p className="text-sm">No pending requests</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          Showing {pendingBookings.length} pending items
        </p>
      </div>
    </div>
  );
}
