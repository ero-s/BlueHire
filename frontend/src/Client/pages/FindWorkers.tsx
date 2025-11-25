import React, { useState, useMemo } from "react";
import type { FiltersState } from "../components/FindWorkers/types.ts";
import { mockWorkers } from "../components/FindWorkers/mockWorkers.ts";
import Filters from "../components/Filters.tsx";
import WorkerCard from "../components/WorkerCard.tsx";
import Header from "../components/DashboardHeader.tsx";
import Footer from "../components/DashboardFooter.tsx";
import logo from "../../MainAssets/images/BlueHireLogo.png";
const FindWorkers: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    trade: "all",
    location: "",
    availability: "all",
    rating: 0,
  });

  const filteredWorkers = useMemo(() => {
    return mockWorkers.filter((worker) => {
      const tradeMatch =
        filters.trade === "all" || worker.trade === filters.trade;
      const locationMatch = worker.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const availabilityMatch =
        filters.availability === "all" ||
        worker.availability === filters.availability;
      const ratingMatch = worker.rating >= filters.rating;

      return tradeMatch && locationMatch && availabilityMatch && ratingMatch;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header 
      logo={logo} 
      userName="Shervin" />

      <div className="px-12 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4 xl:col-span-3 mb-8 lg:mb-0">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              workerCount={filteredWorkers.length}
            />
          </aside>

          <div className="lg:col-span-8 xl:col-span-9">
            {filteredWorkers.length > 0 ? (
              <div className="space-y-6">
                {filteredWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Professionals Found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to find the perfect match for your
                  job.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FindWorkers;
