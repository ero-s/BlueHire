import React from "react";
import { LuFilter, LuArrowDownUp, LuX } from "react-icons/lu";

interface JobFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  locationValue: string;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}

const DashboardJobFilters: React.FC<JobFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  locationValue,
  onLocationChange,
  onClearFilters,
}) => {
  return (
    <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
      <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
          <LuFilter className="text-blue-500" />
          Filter & Sort
        </h3>

        <div className="mb-6">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={locationValue}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g. San Francisco"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-600 mb-3">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2"
          >
            <LuArrowDownUp size={16} />
            Sort by
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white appearance-none"
          >
            <option value="newest">Newest First</option>
            <option value="pay_high">Pay: High to Low</option>
            <option value="pay_low">Pay: Low to High</option>
          </select>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <LuX size={16} />
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};

export default DashboardJobFilters;
