import React, { useState, useMemo } from "react";
import type { FiltersState } from "../components/FindWorkers/types.ts";
import Filters from "../components/Filters.tsx";
import WorkerCard from "../components/WorkerCard.tsx";
import Footer from "../components/ClientFooter.tsx";
import Header from "../components/ClientHeader.tsx";
import type { Worker } from "./types";
import WorkerProfileModal from "../components/WorkerProfileModal.tsx";

export const mockWorkers: Worker[] = [
  {
    id: "w1",
    name: "Juan Dela Cruz",
    category: "Carpentry",
    location: "Quezon City",
    availability: "Available",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?u=1",
    bio: "Expert carpenter with 15 years of experience in furniture making and home repairs. I specialize in custom cabinets and structural woodwork.",
    email: "juan.dc@example.com",
    phone: "+63 917 123 4567",
    address: "123 Katipunan Ave, Quezon City",
    skills: ["Cabinetry", "Furniture Repair", "Wood Carving", "Framing"],
    coverageArea: "Metro Manila",
    hourlyRate: 500,
  },
  {
    id: "w2",
    name: "Shervin Maupo",
    category: "Plumbing",
    location: "Manila",
    availability: "Weekends Only",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?u=2",
    bio: "Licensed plumber specializing in leak detection, pipe installation, and drainage systems.",
    email: "shervin.m@example.com",
    phone: "+63 918 987 6543",
    address: "456 Sampaloc St, Manila",
    skills: ["Leak Repair", "Pipe Installation", "Drain Cleaning"],
    coverageArea: "Manila & Makati",
    hourlyRate: 600,
  },
  {
    id: "w3",
    name: "Cherry Pie",
    category: "Cleaning",
    location: "Makati",
    availability: "Available",
    rating: 4.9,
    avatar: "https://i.pravatar.cc/150?u=7",
    bio: "Detail-oriented cleaner offering residential and commercial cleaning services. Eco-friendly products used upon request.",
    email: "cherry.p@example.com",
    phone: "+63 920 111 2222",
    address: "789 Ayala Ave, Makati",
    skills: ["Deep Cleaning", "Post-Construction", "Sanitization"],
    coverageArea: "Makati & BGC",
    hourlyRate: 350,
  },
  {
    id: "w4",
    name: "Jose P. Rizal",
    category: "Tutoring",
    location: "Laguna",
    availability: "Available",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?u=4",
    bio: "Professional tutor for Mathematics and Sciences. Passionate about helping students achieve academic excellence.",
    email: "jose.r@example.com",
    phone: "+63 999 888 7777",
    address: "Calamba, Laguna",
    skills: ["Algebra", "Physics", "Chemistry", "History"],
    coverageArea: "Laguna Area",
    hourlyRate: 800,
  },
  {
    id: "w5",
    name: "Maria Clara",
    category: "Gardening",
    location: "Bulacan",
    availability: "Available",
    rating: 4.7,
    avatar: "https://i.pravatar.cc/150?u=8",
    bio: "Landscape artist and gardener. I turn dull backyards into beautiful green spaces.",
    email: "maria.c@example.com",
    phone: "+63 915 555 6666",
    address: "Malolos, Bulacan",
    skills: ["Landscaping", "Pruning", "Plant Care"],
    coverageArea: "Bulacan & North Metro Manila",
    hourlyRate: 450,
  },
];

const FindWorkers: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    trade: "all",
    location: "",
    availability: "all",
    rating: 0,
  });

  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredWorkers = useMemo(() => {
    return mockWorkers.filter((worker) => {
      const tradeMatch =
        filters.trade === "all" || worker.category === filters.trade;

      const locationMatch =
        !filters.location ||
        (worker.location &&
          worker.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()));

      const availabilityMatch =
        filters.availability === "all" ||
        worker.availability === filters.availability;

      const ratingMatch = (worker.rating || 0) >= filters.rating;

      return tradeMatch && locationMatch && availabilityMatch && ratingMatch;
    });
  }, [filters]);

  const handleViewProfile = (worker: Worker) => {
    setSelectedWorker(worker);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-gray-800 flex flex-col font-sans">
      <Header userName="Sherielyn Guadiana" />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-6 py-8 md:px-12 md:py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Find Professionals
            </h1>
            <p className="text-gray-500 mt-2">
              Connect with skilled workers in your area for your next project.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-3 mb-8 lg:mb-0">
              <Filters
                filters={filters}
                onFilterChange={setFilters}
                workerCount={filteredWorkers.length}
              />
            </aside>

            {/* Workers Grid */}
            <div className="lg:col-span-9">
              {filteredWorkers.length > 0 ? (
                <div className="space-y-4">
                  {filteredWorkers.map((worker) => (
                    <WorkerCard
                      key={worker.id}
                      worker={worker}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-white p-12 rounded-[24px] shadow-sm border border-gray-100 h-96">
                  <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    No Professionals Found
                  </h3>
                  <p className="mt-2 text-gray-500 text-center max-w-md">
                    We couldn't find any workers matching your current filters.
                    Try adjusting your search criteria or clear your filters.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        trade: "all",
                        location: "",
                        availability: "all",
                        rating: 0,
                      })
                    }
                    className="mt-6 px-6 py-2.5 bg-[#3b82f6] text-white rounded-xl font-semibold hover:bg-[#2563eb] transition-colors shadow-lg shadow-blue-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <WorkerProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        worker={selectedWorker}
      />
    </div>
  );
};

export default FindWorkers;
