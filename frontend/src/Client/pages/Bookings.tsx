import React, { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, MoreHorizontal, MessageSquare } from "lucide-react";
import type { Booking } from "./types";
import ReviewModal from "../components/ReviewModal";
import BookingManagerModal from "../components/BookingManagementModal";
import { useLocation, useNavigate } from "react-router-dom";

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    worker: {
      id: "w1",
      name: "Juan Dela Cruz",
      category: "Carpentry",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    serviceDate: "Oct 24, 2023 • 2:00 PM",
    status: "Completed",
    price: 150.0,
    description:
      "Fixing the broken cabinet hinges in the kitchen and reinforcing the shelf structure.",
    location: "123 Main St, Springfield, IL",
    createdAt: "Oct 20, 2023",
  },
  {
    id: "BK-002",
    worker: {
      id: "w2",
      name: "Shervin Maupo",
      category: "Plumbing",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    serviceDate: "Oct 26, 2023 • 9:00 AM",
    status: "Confirmed",
    price: 85.0,
    description:
      "Repairing a leak under the master bathroom sink and checking pipe pressure.",
    location: "456 Elm St, Shelbyville, IL",
    createdAt: "Oct 22, 2023",
  },
  {
    id: "BK-003",
    worker: {
      id: "w3",
      name: "Cherry Pie",
      category: "Cleaning",
      avatar: "https://i.pravatar.cc/150?u=7",
    },
    serviceDate: "Oct 30, 2023 • 10:00 AM",
    status: "Pending",
    price: 60.0,
    description:
      "General house cleaning for a 2-bedroom apartment, including window washing.",
    location: "789 Oak Ave, Capital City, IL",
    createdAt: "Oct 28, 2023",
  },
  {
    id: "BK-004",
    worker: {
      id: "w4",
      name: "Jose P. Rizal",
      category: "Tutoring",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    serviceDate: "Oct 10, 2023 • 4:00 PM",
    status: "Cancelled",
    price: 45.0,
    description: "Math tutoring session for Grade 10 Algebra.",
    location: "Online Session",
    createdAt: "Oct 05, 2023",
  },
  {
    id: "BK-005",
    worker: {
      id: "w5",
      name: "Maria Clara",
      category: "Gardening",
      avatar: "https://i.pravatar.cc/150?u=8",
    },
    serviceDate: "Nov 02, 2023 • 8:00 AM",
    status: "Pending",
    price: 120.0,
    description:
      "Lawn mowing, hedge trimming, and clearing out autumn leaves from the backyard.",
    location: "123 Main St, Springfield, IL",
    createdAt: "Oct 29, 2023",
  },
];

const Bookings: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Check if we need to highlight a specific booking
    if (location.state?.highlightId) {
      const id = location.state.highlightId;
      const element = refs.current[id];
      if (element) {
        // Scroll into view
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [location]);

  const handleReviewClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  const handleManagerClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsManagerModalOpen(true);
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Cancelled":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const highlightId = location.state?.highlightId;

  return (
    <div className="p-6 md:p-10 mx-auto w-full">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Booking Management
          </h1>
          <p className="text-gray-500">
            Track current and past service appointments.
          </p>
        </div>
        <button
          onClick={() => navigate("/post-job")}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2.5 rounded-full font-semibold shadow-sm transition-all text-sm flex items-center gap-2"
        >
          <span>+</span> New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_BOOKINGS.map((booking) => {
          const isHighlighted = highlightId === booking.id;
          return (
            <div
              key={booking.id}
              ref={(el) => {
                if (el) refs.current[booking.id] = el;
              }}
              className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-500
                ${
                  isHighlighted
                    ? "border-[#3b82f6] shadow-[0_0_0_2px_rgba(59,130,246,0.3)] bg-blue-50/30"
                    : "border-gray-100 hover:shadow-md"
                }`}
            >
              {/* Left: Worker Info */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <img
                  src={booking.worker.avatar}
                  alt={booking.worker.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-gray-900">
                    {booking.worker.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {booking.worker.category}
                  </p>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {booking.id}
                  </span>
                </div>
              </div>

              {/* Middle: Details */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-[#3b82f6]" />
                  <span className="text-sm font-medium">
                    {booking.serviceDate}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} className="text-[#3b82f6]" />
                  <span className="text-sm truncate">{booking.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm font-bold text-gray-900">
                    ${booking.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Right: Status & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(booking.status)}`}
                >
                  {booking.status}
                </span>

                {booking.status === "Completed" ? (
                  <button
                    onClick={() => handleReviewClick(booking)}
                    className="bg-white border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap"
                  >
                    Review & Rate
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/messages")}
                      className="p-2 text-gray-400 hover:text-[#3b82f6] hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <MessageSquare size={20} />
                    </button>
                    <button
                      onClick={() => handleManagerClick(booking)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        booking={selectedBooking}
      />

      <BookingManagerModal
        isOpen={isManagerModalOpen}
        onClose={() => setIsManagerModalOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default Bookings;
