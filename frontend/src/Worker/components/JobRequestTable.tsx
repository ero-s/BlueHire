import React from 'react';

// --- Mock Data and Interfaces ---
export interface JobRequest {
  clientName: string;
  jobType: string;
  location: string;
  schedule: string;
  status: 'Accept';
}

export const mockJobRequests: JobRequest[] = [
  { clientName: 'Mark Anthony Reyes', jobType: 'Carpenter', location: 'Cebu City, Lahug', schedule: '5x per week', status: 'Accept' },
  { clientName: 'Jessa Mae Abella', jobType: 'House Cleaner', location: 'Mandaue City, Banilad', schedule: '2x per week', status: 'Accept' },
  { clientName: 'Rolando Uy', jobType: 'Electrician', location: 'Mandaue City, Banilad', schedule: '3x per week', status: 'Accept' },
  { clientName: 'Kristine Joy Lim', jobType: 'Babysitter', location: 'Mandaue City, Banilad', schedule: '4x per week', status: 'Accept' },
  { clientName: 'Jonathan dela Peña', jobType: 'Plumber', location: 'Talisay City, Lawaan', schedule: '1x per week', status: 'Accept' },
  { clientName: 'Mary Rose Cabahug', jobType: 'Cook', location: 'Mandaue City, Banilad', schedule: '6x per week', status: 'Accept' },
  { clientName: 'Carlo Mendoza', jobType: 'Driver', location: 'Mandaue City, Tipolo', schedule: '5x per week', status: 'Accept' },
];

// --- JobRequestTable Component ---
const JobRequestTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto mt-8 border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center mb-6 pl-2">
        {/* Left Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-gray-700 cursor-pointer mr-3"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800">
          Job{' '}
          <span className="text-[#26466F]">
            Requests
          </span>
        </h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Client Name</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Type</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {mockJobRequests.map((request, index) => (
              <tr key={index} className="hover:bg-blue-50/50 transition duration-100">
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                  {/* Client Name: Changed text-blue-600 to text-[#477EE5] */}
                  <a href="#" className="text-[#477EE5] hover:text-blue-800 underline">
                    {request.clientName}
                  </a>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.jobType}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.location}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.schedule}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  {/* Status Button: Changed bg-gradient-to-b from-blue-400 to-blue-500 to a solid bg-[#5AB3E6] */}
                  <button
                    className="py-1 px-4 text-sm font-medium rounded-full text-white shadow-md transition duration-150 ease-in-out
                                 bg-[#5AB3E6] hover:bg-opacity-90"
                  >
                    {request.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-end items-center mt-6 pr-2 text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select className="border border-gray-300 rounded-md py-1 text-sm px-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option>10</option>
            <option>5</option>
            <option>25</option>
          </select>
        </div>
        <span className="ml-4 mr-4 text-gray-700 font-medium">1-5 of 13</span>
        {/* Pagination Arrows */}
        <div className="flex border border-gray-300 rounded-lg divide-x divide-gray-300 overflow-hidden">
          <button className="p-2 text-gray-400 hover:bg-gray-50 disabled:opacity-50">
            {/* Chevron Left */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button className="p-2 text-gray-700 hover:bg-gray-50">
            {/* Chevron Right */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobRequestTable;