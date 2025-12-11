import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Star, CheckSquare, Square, Loader2 } from "lucide-react"; 
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// --- Interfaces for Backend Data ---
interface BookingOverview {
  id: string;
  clientName: string;
  jobType: string;
  location: string;
  status: 'Responded' | 'Accepted' | 'Completed' | 'Cancelled';
  checked: boolean; // Assuming this relates to acceptance status
}

interface DashboardStats {
  ongoingJobs: number;
  completedJobs: number;
  // NOTE: Earnings data structure is assumed based on the mock CHART_DATA
  chartData: { name: string; value: number }[];
  jobRequests: BookingOverview[];
  // NOTE: Assuming single latest review for the overview card
  latestReview: {
    clientName: string;
    rating: number;
    comment: string;
    date: string;
    clientPhotoUrl: string;
    totalSpent: number; // Placeholder for worker dashboard
  } | null;
}

// --- Component Start ---

const DashboardMainSection: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);
  
  const [stats, setStats] = useState<DashboardStats>({
    ongoingJobs: 0,
    completedJobs: 0,
    chartData: [],
    jobRequests: [],
    latestReview: null,
  });

  // Helper to safely get worker ID from local storage
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
            if (myProfile) setCurrentWorkerId(myProfile.workerID);
          }
        } catch (error) {
          console.error("Failed to load worker profile", error);
        }
      } else {
        setLoading(false); // Stop loading if no user is found
      }
    };
    fetchWorkerProfile();
  }, []);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentWorkerId) return;

      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/booking/getAll");
        if (response.ok) {
          const allBookings = await response.json();
          
          const workerBookings = allBookings.filter((b: any) => 
            b.worker && b.worker.workerID === currentWorkerId
          );

          // 1. Calculate Stats
          const ongoingJobs = workerBookings.filter((b: any) => b.status === 'Accepted').length;
          const completedJobs = workerBookings.filter((b: any) => b.status === 'Completed').length;
          
          // 2. Fetch Job Requests (Status: 'Responded') - Limit to 3 for dashboard overview
          const jobRequests: BookingOverview[] = workerBookings
            .filter((b: any) => b.status === 'Responded')
            .slice(0, 3)
            .map((b: any) => ({
              id: b.bookingID.toString(),
              clientName: b.client?.user?.name ? `${b.client.user.name.firstName} ${b.client.user.name.lastName}` : "Unknown Client",
              jobType: b.serviceCategory || "General Service",
              location: b.location || "N/A Location",
              status: b.status,
              checked: false, // Dashboard overview treats requests as unchecked
            }));

          // 3. Mock Chart Data (Replacing with hardcoded mock as real endpoint is unknown)
          const chartData = [
            { name: "Mon", value: 15 },
            { name: "Tue", value: 35 },
            { name: "Wed", value: 45 },
            { name: "Thu", value: 30 },
            { name: "Fri", value: 50 },
            { name: "Sat", value: 40 },
            { name: "Sun", value: 25 },
          ];

          // 4. Mock Latest Review (Replacing with mock data as real endpoint is unknown)
          const latestReview = {
            clientName: "Joseph Sabello (Mock)",
            rating: 4,
            comment: "Excellent service from start to finish! The worker arrived on time, quickly identified his task, and clean it efficiently—everything was left clean and working perfectly, and the pricing was fair and transparent.",
            date: "2025-09-14",
            clientPhotoUrl: `https://ui-avatars.com/api/?name=JS&background=random&color=fff&size=128&rounded=true`,
            totalSpent: 1550, 
          };


          setStats({
            ongoingJobs,
            completedJobs,
            jobRequests,
            chartData,
            latestReview,
          });

        } else {
          console.error("Failed to fetch bookings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentWorkerId]);


  // Helper function to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={18} 
          fill={i <= rating ? "currentColor" : "none"} 
          className={i <= rating ? "text-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return <div className="flex text-yellow-400">{stars}</div>;
  };

  if (loading) return (
    <div className="flex justify-center items-center h-[500px]">
      <Loader2 className="animate-spin text-[#4D7EAF]" size={40} />
      <span className="ml-3 text-lg text-gray-600">Loading Dashboard Data...</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Top Row: Stats & Chart --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Ongoing Jobs */}
        <div 
          onClick={() => navigate('/worker/bookings', { state: { status: 'Accepted' } })}
          className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center items-center h-[200px] hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-[#5AB3E6]"
        >
          <h3 className="text-lg text-gray-600 font-medium mb-2 group-hover:text-[#4D7EAF]">Ongoing Jobs</h3>
          <span className="text-6xl font-normal text-gray-900 group-hover:scale-110 transition-transform">{stats.ongoingJobs}</span>
          <span className="text-xs text-[#5AB3E6] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to manage</span>
        </div>

        {/* Completed Jobs */}
        <div 
          onClick={() => navigate('/worker/bookings', { state: { status: 'Completed' } })}
          className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center items-center h-[200px] hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-[#5AB3E6]"
        >
          <h3 className="text-lg text-gray-600 font-medium mb-2 group-hover:text-[#4D7EAF]">Completed Jobs</h3>
          <span className="text-6xl font-normal text-gray-900 group-hover:scale-110 transition-transform">{stats.completedJobs}</span>
          <span className="text-xs text-[#5AB3E6] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to manage</span>
        </div>

        {/* Earnings & Reports Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm col-span-1 md:col-span-2 h-[200px] flex flex-col relative hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-gray-700 font-medium">Earnings & Reports (Mock Data)</h3>
            <button 
              onClick={() => navigate('/worker/earnings')}
              className="text-sm font-semibold text-[#4D7EAF] hover:underline hover:text-[#3a628a] transition-colors"
            >
              View All
            </button>
          </div>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData} barSize={20}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((_item, index) => (
                    <Cell key={`cell-${index}`} fill="#4D7EAF" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Bottom Row: Tables & Reviews --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Job Requests Table */}
        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Job Requests</h3>
            <button 
              onClick={() => navigate('/worker/jobrequests')}
              className="text-sm font-semibold text-[#4D7EAF] hover:underline hover:text-[#3a628a] transition-colors"
            >
              View All ({stats.jobRequests.length})
            </button>
          </div>
          
          <div className="overflow-x-auto">
            {stats.jobRequests.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No new job requests waiting.</div>
            ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-gray-800 border-b border-gray-100">
                  <th className="py-3 pr-4 w-10"></th>
                  <th className="py-3 px-2">Client Name</th>
                  <th className="py-3 px-2">Job Type</th>
                  <th className="py-3 px-2">Location</th>
                  <th className="py-3 pl-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.jobRequests.map((job) => (
                  <tr key={job.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-sm">
                    <td className="py-4 pr-4">
                      {/* Checkbox logic is often tied to selection, simplifying here */}
                      <Square className="text-gray-300 cursor-pointer hover:text-gray-400" size={20} />
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-[#4D7EAF] underline cursor-pointer hover:text-[#3a628a]">{job.clientName}</span>
                    </td>
                    <td className="py-4 px-2 text-gray-600">{job.jobType}</td>
                    <td className="py-4 px-2 text-gray-600">{job.location}</td>
                    <td className="py-4 pl-2 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700`}>
                        Responded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        </div>

        {/* Recent Reviews Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800">Recent Reviews (Mock Data)</h3>
            <button 
              onClick={() => navigate('/worker/reviews')}
              className="text-sm font-semibold text-[#4D7EAF] hover:underline hover:text-[#3a628a] transition-colors"
            >
              View All
            </button>
          </div>
          
          {stats.latestReview ? (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start min-w-[140px] text-center md:text-left">
              <div className="relative mb-3">
                 <img 
                   src={stats.latestReview.clientPhotoUrl} 
                   alt={stats.latestReview.clientName} 
                   className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                 />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{stats.latestReview.clientName.replace('(Mock)', '').trim()}</h4>
              <p className="text-sm text-gray-500 mt-1">Total Spent: <span className="font-semibold text-gray-800">₱{stats.latestReview.totalSpent}</span></p>
              <p className="text-sm text-gray-500">Review Date: <span className="font-semibold text-gray-800">{stats.latestReview.date}</span></p>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(stats.latestReview.rating)}
                <span className="text-xs text-gray-400">{stats.latestReview.date}</span>
              </div>
              
              <div className="relative">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "{stats.latestReview.comment}"
                </p>
              </div>
            </div>
          </div>
          ) : (
            <div className="text-center text-gray-400 py-10">No reviews yet.</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardMainSection;