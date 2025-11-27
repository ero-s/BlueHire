import React from "react";
import type { FiltersState } from "./FindWorkers/types";
import { TRADES, AVAILABILITY_OPTIONS } from "./FindWorkers/constants";
import { Filter, Star } from "lucide-react"; // 1. Use Lucide Icons

interface FiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  workerCount: number;
}

const DashboardFilters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  workerCount,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFilterChange({
      trade: "all",
      location: "",
      availability: "all",
      rating: 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-[#4D7EAF]" />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-[#4D7EAF] hover:text-[#3d6691] hover:underline transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Input */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="e.g., Cebu City"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent transition-all text-sm"
          />
        </div>

        {/* Trade Select */}
        <div>
          <label
            htmlFor="trade"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Trade / Service
          </label>
          <select
            name="trade"
            id="trade"
            value={filters.trade}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="all">All Trades</option>
            {TRADES.map((trade) => (
              <option key={trade} value={trade}>
                {trade}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Select */}
        <div>
          <label
            htmlFor="availability"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Availability
          </label>
          <select
            name="availability"
            id="availability"
            value={filters.availability}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
          >
            <option value="all">Any</option>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="flex items-center justify-between space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`flex items-center justify-center w-full py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  filters.rating >= star
                    ? "bg-yellow-400 text-white shadow-sm ring-1 ring-yellow-400"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {star}
                <Star 
                  size={14} 
                  className={`ml-1 ${filters.rating >= star ? 'fill-current text-white' : 'text-gray-400'}`} 
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Count */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-center text-sm text-gray-500">
          Found <span className="font-bold text-[#4D7EAF] text-base">{workerCount}</span>{" "}
          professionals.
        </p>
      </div>
    </div>
  );
};

export default DashboardFilters;