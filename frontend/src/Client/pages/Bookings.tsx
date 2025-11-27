import React, { useState } from "react";
import Header from "../components/DashboardHeader";
import logo from "../../MainAssets/images/BlueHireLogo.png";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import type { Booking } from "./types";
import ReviewModal from "../components/ReviewModal";

const MOCK_BOOKINGS: Booking[] = [
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
  },
];

const Bookings: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReviewClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
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

  return (
    <div>
      <Header />
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Booking Management
            </h1>
            <p className="text-gray-500">
              Track current and past service appointments.
            </p>
          </div>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2.5 rounded-full font-semibold shadow-sm transition-all text-sm">
            + New Booking
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_BOOKINGS.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
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
                  <span className="text-sm">123 Main St, Springfield</span>
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
                    <button className="p-2 text-gray-400 hover:text-[#3b82f6] hover:bg-blue-50 rounded-full transition-colors">
                      <MessageSquare size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          booking={selectedBooking}
        />
      </div>
    </div>
  );
};

export default Bookings;
