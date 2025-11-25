import React from "react";
import type { Worker } from "./types";

interface WorkerCardProps {
  worker: Worker;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 text-gray-400 mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          className="h-48 w-full object-cover md:h-full"
          src={worker.imageUrl}
          alt={`Profile of ${worker.name}`}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between md:w-2/3">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                {worker.trade}
              </div>
              <p className="text-xl text-gray-900 font-bold mt-1">
                {worker.name}
              </p>
            </div>
            <div className="flex items-center">
              <StarIcon filled={true} />
              <span className="text-gray-600 font-bold ml-1">
                {worker.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                ({worker.reviews} reviews)
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <LocationIcon />
            <span>{worker.location}</span>
          </div>
          <p className="mt-3 text-gray-500 text-sm">{worker.bio}</p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full mb-3 sm:mb-0">
            {worker.availability}
          </span>
          <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
