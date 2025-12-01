import React from "react";
import {
  X,
  MapPin,
  Star,
  Mail,
  Phone,
  Shield,
  Briefcase,
  User,
  CheckCircle,
} from "lucide-react";
import type { Worker } from "../pages/types";
import { useNavigate } from "react-router-dom";

interface WorkerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker | null;
}

const WorkerProfileModal: React.FC<WorkerProfileModalProps> = ({
  isOpen,
  onClose,
  worker,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !worker) return null;

  const handleHire = () => {
    // Navigate to job request or booking form with worker pre-selected (simulated)
    navigate("/job-request");
    onClose();
  };

  const handleMessage = () => {
    navigate("/client/chat");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Background */}
        <div className="relative h-32 bg-gradient-to-r ">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white p-2 rounded-full transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-8 pb-8 -mt-12 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={worker.avatar}
              alt={worker.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover bg-white"
            />
            <div className="pt-14 md:pt-12 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {worker.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Briefcase size={16} />
                    <span>{worker.category} Specialist</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-800">
                    {worker.rating || 5.0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Contact & Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <User size={16} className="text-blue-500" /> About
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {worker.bio ||
                    "An experienced professional dedicated to providing high-quality services. Committed to customer satisfaction and timely completion of tasks."}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{worker.address || "Location not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Mail size={18} className="text-gray-400" />
                  <span>{worker.email || "email@example.com"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone size={18} className="text-gray-400" />
                  <span>{worker.phone || "+1 (555) 000-0000"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Skills & Coverage */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Shield size={16} className="text-blue-500" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {worker.skills ? (
                    worker.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      General {worker.category}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-500" /> Coverage Area
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <CheckCircle size={16} className="text-green-500" />
                  {worker.coverageArea || "Metro Manila and nearby provinces"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleMessage}
            className="px-6 py-2.5 rounded-xl bg-white border-2 border-[#3b82f6] text-[#3b82f6] font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Mail size={18} />
            Message
          </button>
          <button
            onClick={handleHire}
            className="px-8 py-2.5 rounded-xl bg-[#3b82f6] text-white font-bold shadow-lg shadow-blue-200 hover:bg-[#2563eb] hover:shadow-xl transition-all active:scale-95"
          >
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileModal;
