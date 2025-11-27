import React, { useState, useMemo } from "react";
import type { JobPost } from "../components/JobPosts/types.ts";
import Header from "../components/DashboardHeader.tsx";
import Footer from "../components/ClientFooter.tsx";
import JobPostCard from "../components/JobPostCard.tsx";
import JobFilters from "../components/JobFilters.tsx";
import { LuBriefcase } from "react-icons/lu";
import logo from "../../MainAssets/images/BlueHireLogo.png";
import "../assets/css/JobPostsPage.css";

const MOCK_JOB_POSTS: JobPost[] = [
  {
    id: "1",
    title: "Urgent: Leaky Pipe Repair",
    clientName: "Jane Doe",
    clientAvatar: "https://picsum.photos/seed/client1/100/100",
    location: "San Francisco, CA",
    pay: 75,
    payType: "hourly",
    description:
      "I have a persistent leak under my kitchen sink that needs immediate attention. Experience with copper pipes is a must. Please bring your own tools.",
    tags: ["Plumbing", "Urgent", "Residential"],
    postedAt: new Date(Date.now() - 3600000 * 2), // 2 hours ago
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
    description:
      "Looking for a certified electrician to rewire a 3-bedroom house. Project includes new panel installation and bringing everything up to code. Must be licensed and insured.",
    tags: ["Electrical", "Commercial", "Full-time"],
    postedAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
  },
  {
    id: "3",
    title: "Backyard Deck Construction",
    clientName: "Emily White",
    clientAvatar: "https://picsum.photos/seed/client3/100/100",
    location: "San Francisco, CA",
    pay: 55,
    payType: "hourly",
    description:
      "Need a skilled carpenter to build a 200 sq. ft. redwood deck in my backyard. I have the plans and materials ready. Looking for someone with a portfolio of similar work.",
    tags: ["Carpentry", "Construction", "Outdoor"],
    postedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
  },
  {
    id: "4",
    title: "Install New Light Fixtures",
    clientName: "Michael Brown",
    clientAvatar: "https://picsum.photos/seed/client4/100/100",
    location: "Berkeley, CA",
    pay: 250,
    payType: "fixed",
    description:
      "I need 5 ceiling light fixtures and 2 ceiling fans installed in my new apartment. The wiring is already in place, just need to swap out the old fixtures.",
    tags: ["Electrical", "Residential"],
    postedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
  },
  {
    id: "5",
    title: "Drywall Repair and Painting",
    clientName: "Sarah Green",
    clientAvatar: "https://picsum.photos/seed/client5/100/100",
    location: "San Mateo, CA",
    pay: 40,
    payType: "hourly",
    description:
      "A small section of drywall in my living room was damaged. It needs to be patched, sanded, and painted. I will provide the paint to match the wall color.",
    tags: ["Painting", "Handyman", "Interior"],
    postedAt: new Date(Date.now() - 86400000 * 7), // 1 week ago
  },
];

const JOB_CATEGORIES = [
  "All",
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "Handyman",
];

const JobPostsPage: React.FC = () => {
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
          const payA_high = a.payType === "hourly" ? a.pay * 40 * 52 : a.pay; // rough annual
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
    <div>
      <Header logo={logo} userName="Shervin" />
      <div className="flex flex-col min-h-screen job-posts-page-container ">
        <main className="job-posts-main-content">
          <div className="job-posts-layout">
            {/* Left Side: Job Feed */}
            <div className="job-feed-column">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <LuBriefcase /> Job Feed
                </h1>
                <p className="text-sm text-gray-500">
                  {filteredAndSortedJobs.length} results found
                </p>
              </div>
              <div className="job-feed-list">
                {filteredAndSortedJobs.map((job) => (
                  <JobPostCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Right Side: Filters */}
            <div className="job-filters-wrapper">
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
    </div>
  );
};

export default JobPostsPage;
