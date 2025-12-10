import React, { useState, useEffect, useMemo } from "react";
import WorkerHeader from "../components/WorkerHeader"; 
import { 
  Briefcase, MapPin, DollarSign, Calendar, Star, Filter, ArrowUpDown, X, Loader2 
} from "lucide-react"; 
import Footer from "../components/WorkerFooter";

// --- Types ---
interface JobPost {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  location: string;
  pay: number;
  payType: "hourly" | "fixed";
  description: string;
  tags: string[];
  postedAt: Date;
  featured?: boolean;
}

const JOB_CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Masonry & Concrete",
  "Roofing",
  "Welding & Metal Fabrication",
  "Painting & Decorating",
  "HVAC & Refrigeration",
  "Glazing (Glass)",
  "Flooring & Tiling",
  "Drywall & Insulation",
  "Automotive & Mechanic",
  "Appliance Repair",
  "Locksmithing",
  "Facilities Maintenance",
  "Janitorial & Cleaning",
  "Gardening & Landscaping",
  "Tree Service & Arboriculture",
  "Pest Control",
  "Pool & Spa Maintenance",
  "Assembly & Manufacturing",
  "Warehousing & Logistics",
  "Machine Operation",
  "Packaging & Labeling",
  "Trucking & Driving",
  "Moving & Relocation",
  "Delivery & Courier",
  "General Labor",
  "Waste Management",
  "Event Setup & Tear Down",
  "Demolition"
];

// --- Helper Functions ---
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const getJobsByCategory = (jobs: JobPost[], category: string): JobPost[] => {
  if (category === "All") return jobs;
  return jobs.filter((job) => job.tags.includes(category));
};

// --- Sub-Components ---

const JobPostCard: React.FC<{ job: JobPost; onApply: (id: string) => void; isApplying: boolean }> = ({ job, onApply, isApplying }) => {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 relative overflow-hidden border border-transparent hover:border-[#5AB3E6]">
      <img
        src={job.clientAvatar}
        alt={job.clientName}
        className="w-16 h-16 rounded-full sm:w-20 sm:h-20 self-start object-cover border-2 border-gray-100"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800 hover:text-[#4D7EAF] transition-colors cursor-pointer">
              {job.title}
            </h3>
            <p className="text-sm text-gray-500">by {job.clientName}</p>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1.5 whitespace-nowrap">
            <Calendar size={14} /> {timeAgo(job.postedAt)}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 my-3">
          <span className="flex items-center gap-1.5">
            <MapPin size={16} className="text-[#5AB3E6]" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-gray-800">
            <DollarSign size={16} className="text-[#5AB3E6]" />
            ₱{job.pay.toFixed(2)} <span className="text-gray-500 font-normal">{job.payType}</span>
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-blue-50 text-[#4D7EAF] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <button 
            onClick={() => onApply(job.id)}
            disabled={isApplying}
            className="px-6 py-2 text-sm font-semibold bg-[#4D7EAF] text-white rounded-full hover:bg-[#3d6691] transition-all hover:-translate-y-0.5 transform whitespace-nowrap shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApplying ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </article>
  );
};

const JobFilters: React.FC<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: string;
  onSortChange: (option: string) => void;
  locationValue: string;
  onLocationChange: (location: string) => void;
  onClearFilters: () => void;
}> = ({
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
      <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Filter size={20} className="text-[#4D7EAF]" />
          Filter & Sort
        </h3>

        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
             <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
              type="text"
              id="location"
              value={locationValue}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="e.g. Cebu City"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent focus:outline-none transition text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${
                  selectedCategory === category
                    ? "bg-[#4D7EAF] text-white border-[#4D7EAF] shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#5AB3E6] hover:text-[#4D7EAF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="sort" className="block text-sm font-semibold text-gray-700 mb-2 items-center gap-2">
            <ArrowUpDown size={16} className="text-gray-400" />
            Sort by
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5AB3E6] focus:border-transparent focus:outline-none transition text-sm appearance-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="pay_high">Pay: High to Low</option>
              <option value="pay_low">Pay: Low to High</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 hover:text-gray-800 transition-colors"
        >
          <X size={16} />
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};

// --- Main Page Component ---

const JobFeedPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [locationFilter, setLocationFilter] = useState("");

  // 1. Fetch current Worker ID based on logged in user
  useEffect(() => {
    const fetchWorkerProfile = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        try {
            const response = await fetch("http://localhost:8080/api/worker/getAllWorkers");
            if (response.ok) {
                const workers = await response.json();
                const myProfile = workers.find((w: any) => w.user.userId === user.userId);
                if (myProfile) {
                    setCurrentWorkerId(myProfile.workerID);
                }
            }
        } catch (error) {
            console.error("Failed to load worker profile", error);
        }
      }
    };
    fetchWorkerProfile();
  }, []);

  // 2. Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8080/booking/getAll");
        if (!response.ok) throw new Error("Failed to connect to server");
        
        const bookings = await response.json();
        
        const mappedJobs: JobPost[] = bookings
          .filter((b: any) => b.status === "Pending" && b.worker === null) 
          .map((b: any) => {
              let clientName = "Client";
              if (b.client?.user?.name) {
                  const { firstName, lastName } = b.client.user.name;
                  if (firstName && lastName) clientName = `${firstName} ${lastName}`;
              }

              return {
                id: b.bookingID.toString(),
                title: b.jobTitle || "Untitled Job", 
                clientName: clientName,
                clientAvatar: b.client?.user?.photoURL || `https://ui-avatars.com/api/?name=${clientName}&background=random`,
                location: b.location,
                pay: b.payment ? b.payment.amount : 0, 
                payType: "fixed", 
                description: b.description,
                tags: [b.serviceCategory], 
                postedAt: new Date(b.createdAt),
                featured: false
              };
          });

        setJobs(mappedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to load jobs at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 3. Handle Apply Logic
  const handleApply = async (jobId: string) => {
    if (!currentWorkerId) {
        alert("Please log in as a worker to apply.");
        return;
    }

    setApplyingId(jobId);

    try {
        // --- REAL DB CALL ---
        // We attempt to explicitly send the status "Pending" in the body.
        // This ensures it shows up as "Awaiting Response" in the Booking Table.
        const response = await fetch(`http://localhost:8080/booking/apply/${jobId}/${currentWorkerId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Pending" }) // Try to force Pending status
        });

        if (response.ok) {
            alert("Application successful! You can now check it in the 'Awaiting Response' tab.");
            // Remove the job from the local list
            setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        } else {
            alert("Failed to apply. This job might already be taken.");
        }
    } catch (error) {
        console.error("Application error:", error);
        alert("An error occurred while applying.");
    } finally {
        setApplyingId(null);
    }
  };

  // --- Filter & Sort Logic ---
  const filteredAndSortedJobs = useMemo(() => {
    let result = getJobsByCategory(jobs, selectedCategory);

    if (locationFilter.trim() !== "") {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "pay_high": return b.pay - a.pay;
        case "pay_low": return a.pay - b.pay;
        case "newest": default: return b.postedAt.getTime() - a.postedAt.getTime();
      }
    });

    return result;
  }, [jobs, selectedCategory, sortOption, locationFilter]);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSortOption("newest");
    setLocationFilter("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F6F6] font-sans">
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <WorkerHeader userName="Sherielyn Guadiana" />
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-12 mt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Briefcase className="text-[#4D7EAF]" /> Job Feed
              </h1>
              <p className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                <span className="text-[#4D7EAF] font-bold">{filteredAndSortedJobs.length}</span> results found
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 text-[#4D7EAF] animate-spin mb-4" />
                    <p className="text-gray-500">Finding opportunities...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-8 rounded-2xl text-center">
                    <p className="font-semibold">{error}</p>
                </div>
              ) : filteredAndSortedJobs.length > 0 ? (
                filteredAndSortedJobs.map((job) => (
                  <JobPostCard 
                    key={job.id} 
                    job={job} 
                    onApply={handleApply} 
                    isApplying={applyingId === job.id} 
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                   <h3 className="text-lg font-semibold text-gray-600">No jobs found</h3>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 xl:w-96">
            <JobFilters
              categories={JOB_CATEGORIES}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOption={sortOption}
              onSortChange={setSortOption}
              locationValue={locationFilter}
              onLocationChange={setLocationFilter}
              onClearFilters={handleClearFilters}
            />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobFeedPage;