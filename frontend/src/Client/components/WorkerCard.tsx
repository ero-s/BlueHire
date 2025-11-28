import React from "react";
import type { Worker } from "../pages/types";
import { Star, MapPin, Clock } from "lucide-react";

interface WorkerCardProps {
  worker: Worker;
  onViewProfile: (worker: Worker) => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onViewProfile }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-shrink-0">
        <img
          src={worker.avatar}
          alt={worker.name}
          className="w-20 h-20 rounded-2xl object-cover border border-gray-100 shadow-sm"
        />
      </div>

      <div className="flex-1 min-w-0 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{worker.name}</h3>
            <p className="text-sm font-medium text-[#3b82f6]">
              {worker.category}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-gray-800">
              {worker.rating}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-gray-400" />
            {worker.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-400" />
            {worker.availability}
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-500 line-clamp-2">
          {worker.bio ||
            "Experienced professional ready to help with your needs."}
        </p>
      </div>

      <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
        <button
          onClick={() => onViewProfile(worker)}
          className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap text-sm"
        >
          View Profile
        </button>
        <button className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#3b82f6] text-white font-semibold shadow-sm hover:bg-[#2563eb] transition-colors whitespace-nowrap text-sm">
          Hire
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
