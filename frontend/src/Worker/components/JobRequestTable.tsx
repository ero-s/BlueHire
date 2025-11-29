import React, {useState} from 'react';

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

  const [showProfile, setShowProfile] = useState(false);
  const [selectedClient, setSelectedClient] = useState<JobRequest | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto mt-8 border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center mb-6 pl-2">
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
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
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
                  <div className="flex flex-col gap-2">

                    {/* Accept Button */}
                    <button
                      className="w-32 py-1.5 text-sm font-medium rounded-full 
                                text-white bg-[#5AB3E6] shadow 
                                hover:bg-opacity-90 transition"
                    >
                      {request.status}
                    </button>

                    {/* View Profile Button */}
                    <button
                      onClick={() => {
                        setSelectedClient(request);
                        setShowProfile(true);
                      }}
                      className="w-32 py-1.5 text-sm font-medium rounded-full 
                                border border-[#5AB3E6] text-[#5AB3E6] bg-white shadow 
                                hover:bg-[#5AB3E6] hover:text-white transition"
                    >
                      View Profile
                    </button>

                  </div>
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
      {showProfile && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">

            {/* Profile Header */}
            <div className="flex flex-col items-center">
              <img
                src="https://i.pravatar.cc/150?u=static_client"
                alt="Client Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{selectedClient.clientName}</h2>
              <p className="text-gray-500 mt-1">{selectedClient.jobType} • {selectedClient.schedule}</p>
            </div>

            {/* Client Details */}
            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="font-semibold w-32">Address:</span>
                <span>{selectedClient.location}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Job Type:</span>
                <span>{selectedClient.jobType}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Schedule:</span>
                <span>{selectedClient.schedule}</span>
              </div>

              <div>
                <span className="font-semibold">Client Info:</span>
                <p className="text-gray-600 mt-1">Works full-time & prefers weekday bookings.</p>
              </div>

              <div>
                <span className="font-semibold">Payment Preferences:</span>
                <ul className="list-disc ml-6 mt-1 text-gray-600">
                  <li>GCash</li>
                  <li>Bank Transfer</li>
                </ul>
              </div>
            </div>
            {/* Footer Buttons */}
            <div className="mt-5 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 text-sm rounded-full bg-[#5AB3E6] text-white font-medium shadow hover:bg-opacity-90"
              >
                Message
              </button>

              <button
                onClick={() => setShowProfile(false)}
                className="px-3 py-1.5 text-sm rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>      
          </div>
        </div>
      )}

    </div>
  );
};

export default JobRequestTable;