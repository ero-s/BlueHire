import React, { useState, useMemo } from "react";
import WorkerHeader from "../components/WorkerHeader"; // Assuming you have this
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Star, 
  Filter, 
  ArrowUpDown, 
  X 
} from "lucide-react"; // Replaced react-icons with lucide-react for consistency
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

// --- Mock Data ---
const MOCK_JOB_POSTS: JobPost[] = [
  {
    id: "1",
    title: "Urgent: Leaky Pipe Repair",
    clientName: "Jane Doe",
    clientAvatar: "https://picsum.photos/seed/client1/100/100",
    location: "San Francisco, CA",
    pay: 75,
    payType: "hourly",
    description: "I have a persistent leak under my kitchen sink that needs immediate attention. Experience with copper pipes is a must. Please bring your own tools.",
    tags: ["Plumbing", "Urgent", "Residential"],
    postedAt: new Date(Date.now() - 3600000 * 2),
    featured: true,
  },
  {
    id: "2",
    title: "Full House Rewiring Project",
    clientName: "John Smith",
    clientAvatar: "https://picsum.photos/seed/client2/100/100",
    location: "Oakland, CA",
    pay: 8000,
    payType: "fixed",
    description: "Looking for a certified electrician to rewire a 3-bedroom house. Project includes new panel installation and bringing everything up to code.",
    tags: ["Electrical", "Commercial", "Full-time"],
    postedAt: new Date(Date.now() - 86400000 * 1),
  },
  {
    id: "3",
    title: "Backyard Deck Construction",
    clientName: "Emily White",
    clientAvatar: "https://picsum.photos/seed/client3/100/100",
    location: "San Francisco, CA",
    pay: 55,
    payType: "hourly",
    description: "Need a skilled carpenter to build a 200 sq. ft. redwood deck in my backyard. I have the plans and materials ready.",
    tags: ["Carpentry", "Construction", "Outdoor"],
    postedAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: "4",
    title: "Install New Light Fixtures",
    clientName: "Michael Brown",
    clientAvatar: "https://picsum.photos/seed/client4/100/100",
    location: "Berkeley, CA",
    pay: 250,
    payType: "fixed",
    description: "I need 5 ceiling light fixtures and 2 ceiling fans installed in my new apartment. The wiring is already in place.",
    tags: ["Electrical", "Residential"],
    postedAt: new Date(Date.now() - 86400000 * 5),
  },
  {
    id: "5",
    title: "Drywall Repair and Painting",
    clientName: "Sarah Green",
    clientAvatar: "https://picsum.photos/seed/client5/100/100",
    location: "San Mateo, CA",
    pay: 40,
    payType: "hourly",
    description: "A small section of drywall in my living room was damaged. It needs to be patched, sanded, and painted.",
    tags: ["Painting", "Handyman", "Interior"],
    postedAt: new Date(Date.now() - 86400000 * 7),
  },
];

const JOB_CATEGORIES = ["All", "Plumbing", "Electrical", "Carpentry", "Painting", "Handyman"];

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

// --- Sub-Components ---

const JobPostCard: React.FC<{ job: JobPost }> = ({ job }) => {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 relative overflow-hidden border border-transparent hover:border-[#5AB3E6]">
      {job.featured && (
        <div className="absolute top-0 right-0 bg-[#FCD34D] text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          <span>Featured</span>
        </div>
      )}
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
            <DollarSign size={16} className="text-[#5AB3E6]" />${job.pay} <span className="text-gray-500 font-normal">{job.payType}</span>
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
          <button className="px-6 py-2 text-sm font-semibold bg-[#4D7EAF] text-white rounded-full hover:bg-[#3d6691] transition-all hover:-translate-y-0.5 transform whitespace-nowrap shadow-sm">
            Apply Now
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
          <div className="flex flex-wrap gap-2">
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
            {/* Custom Arrow for select */}
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
  const [jobs] = useState<JobPost[]>(MOCK_JOB_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredAndSortedJobs = useMemo(() => {
    let result = jobs;

    if (selectedCategory !== "All") {
      result = result.filter((job) => job.tags.includes(selectedCategory));
    }

    if (locationFilter.trim() !== "") {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "pay_high":
          const payA_high = a.payType === "hourly" ? a.pay * 40 * 52 : a.pay;
          const payB_high = b.payType === "hourly" ? b.pay * 40 * 52 : b.pay;
          return payB_high - payA_high;
        case "pay_low":
          const payA_low = a.payType === "hourly" ? a.pay * 40 * 52 : a.pay;
          const payB_low = b.payType === "hourly" ? b.pay * 40 * 52 : b.pay;
          return payA_low - payB_low;
        case "newest":
        default:
          return b.postedAt.getTime() - a.postedAt.getTime();
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
      
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-40 bg-[#F6F6F6]">
        <WorkerHeader userName="Sherielyn Guadiana" />
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-12 mt-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Job Feed */}
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
              {filteredAndSortedJobs.length > 0 ? (
                filteredAndSortedJobs.map((job) => (
                  <JobPostCard key={job.id} job={job} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                   <div className="bg-gray-50 p-4 rounded-full mb-4">
                      <Briefcase size={32} className="text-gray-400" />
                   </div>
                   <h3 className="text-lg font-semibold text-gray-600">No jobs found</h3>
                   <p className="text-gray-400 text-sm mt-1">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Filters */}
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