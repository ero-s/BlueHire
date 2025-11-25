import React from "react";
import type { FiltersState } from "./types";
import { TRADES, AVAILABILITY_OPTIONS } from "./constants";

interface FiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
  workerCount: number;
}

const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
      clipRule="evenodd"
    />
  </svg>
);

const Filters: React.FC<FiltersProps> = ({
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
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FilterIcon />
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="e.g., New York, NY"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="trade"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Trade / Service
          </label>
          <select
            name="trade"
            id="trade"
            value={filters.trade}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Trades</option>
            {TRADES.map((trade) => (
              <option key={trade} value={trade}>
                {trade}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Availability
          </label>
          <select
            name="availability"
            id="availability"
            value={filters.availability}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">Any</option>
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <div className="flex items-center justify-between space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`flex items-center justify-center w-full py-2 rounded-md transition-all duration-200 text-sm ${
                  filters.rating >= star
                    ? "bg-yellow-400 text-white shadow-sm"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {star}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600">
          Found <span className="font-bold text-indigo-600">{workerCount}</span>{" "}
          professionals.
        </p>
      </div>
    </div>
  );
};

export default Filters;
