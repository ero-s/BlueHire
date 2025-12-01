import React from "react";
import { X, Calendar, MapPin, Clock, FileText, Hash } from "lucide-react";
import type { Booking } from "../pages/types";

interface BookingManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const BookingManagerModal: React.FC<BookingManagerModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
            <p className="text-sm text-gray-500">Manage your appointment</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Status & ID */}
          <div className="flex items-center justify-between">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase border ${getStatusColor(booking.status)}`}
            >
              {booking.status}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-sm font-mono bg-gray-50 px-3 py-1 rounded-lg">
              <Hash size={14} />
              {booking.id}
            </div>
          </div>

          {/* Service Category & Worker */}
          <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <img
              src={booking.worker.avatar}
              alt={booking.worker.name}
              className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
            />
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">
                {booking.worker.category} Service
              </p>
              <h3 className="text-lg font-bold text-gray-900">
                {booking.worker.name}
              </h3>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4">
            {/* Scheduled Date Time */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Scheduled For
                </p>
                <p className="text-gray-800 font-medium">
                  {booking.serviceDate}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Location
                </p>
                <p className="text-gray-800 font-medium">{booking.location}</p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Created On
                </p>
                <p className="text-gray-800 font-medium">{booking.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-[#3b82f6]" />
              <span className="text-sm font-bold text-gray-800">
                Description
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm leading-relaxed border border-gray-100">
              {booking.description}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3">
          {booking.status === "Pending" && (
            <button className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 border border-red-100 transition-colors">
              Cancel Booking Request
            </button>
          )}
          {booking.status === "Confirmed" && (
            <div className="flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                Reschedule
              </button>
              <button className="flex-1 py-3 rounded-xl bg-[#3b82f6] text-white font-semibold hover:bg-[#2563eb] shadow-lg shadow-blue-200 transition-colors">
                Mark as Complete
              </button>
            </div>
          )}
          {booking.status === "Completed" && (
            <button className="w-full py-3 rounded-xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed">
              Booking Archived
            </button>
          )}
          {booking.status === "Cancelled" && (
            <button className="w-full py-3 rounded-xl bg-[#3b82f6] text-white font-semibold hover:bg-[#2563eb] shadow-md transition-colors">
              Book Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagerModal;
