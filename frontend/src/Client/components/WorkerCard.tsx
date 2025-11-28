import React from "react";
import type { Worker } from "./FindWorkers/types";
import { Star, MapPin } from "lucide-react";

interface WorkerCardProps {
  worker: Worker;
}

const DashboardWorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-transparent hover:border-[#5AB3E6] overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row">
      
      {/* Image Section */}
      <div className="md:w-1/3">
        <img
          className="h-48 w-full object-cover md:h-full"
          src={worker.imageUrl}
          alt={`Profile of ${worker.name}`}
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col justify-between md:w-2/3">
        <div>
          <div className="flex justify-between items-start">
            <div>
              {/* Updated: Trade Color */}
              <div className="uppercase tracking-wide text-xs font-bold text-[#4D7EAF]">
                {worker.trade}
              </div>
              <p className="text-xl text-gray-800 font-bold mt-1">
                {worker.name}
              </p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="text-gray-700 font-bold ml-1 text-sm">
                {worker.rating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-xs ml-1">
                ({worker.reviews})
              </span>
            </div>
          </div>

          {/* Updated: Location Icon Color */}
          <div className="flex items-center text-gray-500 mt-2 text-sm">
            <MapPin size={16} className="text-[#5AB3E6] mr-1" />
            <span>{worker.location}</span>
          </div>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-2">
            {worker.bio}
          </p>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100 gap-3">
          {/* Updated: Availability Badge (Blue tint instead of Green) */}
          <span className="text-xs font-bold bg-blue-50 text-[#4D7EAF] px-3 py-1.5 rounded-full w-full sm:w-auto text-center">
            {worker.availability}
          </span>

          {/* Updated: Button Color */}
          <button className="w-full sm:w-auto bg-[#4D7EAF] hover:bg-[#3d6691] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md text-sm">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWorkerCard;