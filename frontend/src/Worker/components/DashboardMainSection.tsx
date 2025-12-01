import React from "react";
import { useNavigate } from "react-router-dom"; 
import ProfilePic from "../../MainAssets/images/profile.png"; 
import { Star, CheckSquare, Square } from "lucide-react"; 
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

// Mock Data
const CHART_DATA = [
  { name: "Mon", value: 15 },
  { name: "Tue", value: 35 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 25 },
];

const JOB_REQUESTS = [
  { id: 1, client: "Sherielyn Dale Tabernero", type: "House Cleaning", location: "Mandaue City", status: "Completed", checked: true },
  { id: 2, client: "Sherielyn Guadiana", type: "General Cleaning", location: "Brgy. Hipodromo, Mabolo", status: "Pending", checked: false },
  { id: 3, client: "Raziff Gumapon", type: "House Cleaning", location: "Cebu City", status: "Pending", checked: false },
];

const DashboardMainSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Top Row: Stats & Chart --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Ongoing Jobs */}
        <div 
          // UPDATED: Passing state 'Ongoing'
          onClick={() => navigate('/worker/bookings', { state: { status: 'Ongoing' } })}
          className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center items-center h-[200px] hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-[#5AB3E6]"
        >
          <h3 className="text-lg text-gray-600 font-medium mb-2 group-hover:text-[#4D7EAF]">Ongoing Jobs</h3>
          <span className="text-6xl font-normal text-gray-900 group-hover:scale-110 transition-transform">10</span>
          <span className="text-xs text-[#5AB3E6] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to manage</span>
        </div>

        {/* Completed Jobs */}
        <div 
          // UPDATED: Passing state 'Completed'
          onClick={() => navigate('/worker/bookings', { state: { status: 'Completed' } })}
          className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center items-center h-[200px] hover:shadow-md transition-all cursor-pointer group border border-transparent hover:border-[#5AB3E6]"
        >
          <h3 className="text-lg text-gray-600 font-medium mb-2 group-hover:text-[#4D7EAF]">Completed Jobs</h3>
          <span className="text-6xl font-normal text-gray-900 group-hover:scale-110 transition-transform">1</span>
          <span className="text-xs text-[#5AB3E6] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to manage</span>
        </div>

        {/* Earnings & Reports Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm col-span-1 md:col-span-2 h-[200px] flex flex-col relative hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-gray-700 font-medium">Earnings & Reports</h3>
            <button 
              onClick={() => navigate('/worker/earnings')}
              className="text-sm font-semibold text-[#4D7EAF] hover:underline hover:text-[#3a628a] transition-colors"
            >
               View All
            </button>
          </div>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA} barSize={20}>
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
                  {CHART_DATA.map((index) => (
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
               View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
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
                {JOB_REQUESTS.map((job) => (
                  <tr key={job.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-sm">
                    <td className="py-4 pr-4">
                      {job.checked ? 
                        <CheckSquare className="text-[#4D7EAF] cursor-pointer" size={20} /> : 
                        <Square className="text-gray-300 cursor-pointer hover:text-gray-400" size={20} />
                      }
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-[#4D7EAF] underline cursor-pointer hover:text-[#3a628a]">{job.client}</span>
                    </td>
                    <td className="py-4 px-2 text-gray-600">{job.type}</td>
                    <td className="py-4 px-2 text-gray-600">{job.location}</td>
                    <td className="py-4 pl-2 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${job.status === 'Completed' ? 'bg-blue-50 text-[#4D7EAF]' : 'bg-gray-100 text-gray-500'}`}>
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800">Recent Reviews</h3>
            <button 
              onClick={() => navigate('/worker/reviews')}
              className="text-sm font-semibold text-[#4D7EAF] hover:underline hover:text-[#3a628a] transition-colors"
            >
               View All
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center md:items-start min-w-[140px] text-center md:text-left">
              <div className="relative mb-3">
                 <img 
                  src={ProfilePic} 
                  alt="Joseph Sabello" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Joseph Sabello</h4>
              <p className="text-sm text-gray-500 mt-1">Total Spent: <span className="font-semibold text-gray-800">₱1550</span></p>
              <p className="text-sm text-gray-500">Total Review: <span className="font-semibold text-gray-800">1</span></p>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} className="text-gray-300" />
                </div>
                <span className="text-xs text-gray-400">25 - 9 - 14</span>
              </div>
              
              <div className="relative">
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  "Excellent service from start to finish! The janitor arrived on time, quickly identified his task, and clean it efficiently—everything was left clean and working perfectly, and the pricing was fair and transparent."
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardMainSection;