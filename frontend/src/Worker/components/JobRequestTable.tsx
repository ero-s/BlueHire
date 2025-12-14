import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, Calendar, User, Clock, XCircle, CheckCircle } from 'lucide-react';

// --- Interfaces ---
interface JobRequest {
  id: string;
  clientName: string;
  clientAvatar: string;
  jobType: string;
  location: string;
  schedule: string;
  status: string;
  rawBooking: any; // Contains the full backend object for reference
}

const JobRequestTable: React.FC = () => {
  const [requests, setRequests] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedClient, setSelectedClient] = useState<JobRequest | null>(null);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);

  // 1. Fetch Worker ID
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
      }
      if (!storedUser) setLoading(false);
    };
    fetchWorkerProfile();
  }, []);

  // 2. Fetch Job Requests (Dependent on currentWorkerId)
  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentWorkerId) return; 
      
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/booking/getAll");
        if (response.ok) {
          const allBookings = await response.json();
          
          // --- FILTER LOGIC: Status must be 'Responded' AND worker ID must match --- 
          const myRequests = allBookings.filter((b: any) => 
            b.worker && 
            b.worker.workerID === currentWorkerId && 
            b.status === 'Responded' 
          );

          const mappedRequests: JobRequest[] = myRequests.map((b: any) => {
              const firstName = b.client?.user?.name?.firstName || '';
              const lastName = b.client?.user?.name?.lastName || '';
              const fullName = `${firstName} ${lastName}`.trim();

              return {
                  id: b.bookingID.toString(),
                  clientName: fullName || "Unknown Client",
                  clientAvatar: b.client?.user?.photoURL || 
                      `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&size=128&rounded=true`,
                  jobType: b.serviceCategory || "General Service",
                  location: b.location || "N/A Location",
                  schedule: b.scheduledDateTime ? new Date(b.scheduledDateTime).toLocaleDateString() : "N/A Date",
                  status: 'Accept',
                  rawBooking: b
              };
          });

          setRequests(mappedRequests);
        } else {
            console.error("Failed to fetch bookings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentWorkerId]);

  // 3. Handle Accept Action
  const handleAccept = async (request: JobRequest) => {
    try {
        const payload = { 
            bookingID: request.rawBooking.bookingID,
            status: 'Accepted', // Becomes ongoing
        };

        const response = await fetch(`http://localhost:8080/booking/update?id=${request.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Job Accepted! Moved to your Booking List.");
            setRequests(prev => prev.filter(r => r.id !== request.id));
            if (showProfile) setShowProfile(false);
        } else {
            alert("Failed to accept job.");
        }
    } catch (error) {
        console.error("Error accepting job:", error);
    }
  };

  // 4. Handle Decline Action (NEW)
  const handleDecline = async (request: JobRequest) => {
    if (!window.confirm("Are you sure you want to decline this job request?")) return;

    try {
        const payload = { 
            bookingID: request.rawBooking.bookingID,
            status: 'Declined', // This triggers the "Remove" button on client side
        };

        const response = await fetch(`http://localhost:8080/booking/update?id=${request.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Remove from list immediately
            setRequests(prev => prev.filter(r => r.id !== request.id));
            if (showProfile) setShowProfile(false);
        } else {
            alert("Failed to decline job.");
        }
    } catch (error) {
        console.error("Error declining job:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#4D7EAF]" size={40} />
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto mt-8 border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center mb-6 pl-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Job <span className="text-[#26466F]">Requests</span>
        </h2>
        <span className="ml-3 px-3 py-1 bg-blue-100 text-[#26466F] rounded-full text-xs font-bold">
            {requests.length} New
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto min-h-[300px]">
        {requests.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <p className="text-lg mb-2">🎉 No New Job Requests</p>
                <p>There are no client applications waiting for your final acceptance right now.</p>
              </div>
        ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-blue-50/50 transition duration-100">
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <img src={request.clientAvatar} alt="Client Avatar" className="w-8 h-8 rounded-full object-cover" />
                    <button 
                        onClick={() => { setSelectedClient(request); setShowProfile(true); }}
                        className="text-[#477EE5] hover:text-blue-800 underline font-medium"
                    >
                        {request.clientName}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-400"/>
                        {request.jobType}
                    </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400"/>
                        {request.location}
                    </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400"/>
                        {request.schedule}
                    </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <div className="flex gap-3">
                    {/* Accept Button */}
                    <button
                      onClick={() => handleAccept(request)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full text-white bg-[#26466F] shadow-md hover:bg-[#1E3A5A] transition duration-200"
                    >
                      <CheckCircle size={14} /> Accept
                    </button>

                    {/* Decline Button (NEW) */}
                    <button
                      onClick={() => handleDecline(request)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition duration-200"
                    >
                      <XCircle size={14} /> Decline
                    </button>

                    {/* View Profile Button */}
                    <button
                      onClick={() => { setSelectedClient(request); setShowProfile(true); }}
                      className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-700 bg-white shadow-sm hover:bg-gray-50 transition duration-200"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Profile/Details Modal */}
      {showProfile && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">
            {/* Close Button */}
            <button 
                onClick={() => setShowProfile(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close modal"
            >
                &times;
            </button>
            
            <div className="flex flex-col items-center border-b pb-4 mb-4">
              <img src={selectedClient.clientAvatar} alt="Client" className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow-md" />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{selectedClient.clientName}</h2>
              <p className="text-blue-600 mt-1 font-semibold">{selectedClient.jobType}</p>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Job Details</h3>

            <div className="space-y-3 text-gray-700 text-sm">
               <div className="flex items-center">
                 <MapPin className="w-5 h-5 text-blue-500 mr-3 shrink-0"/>
                 <span className="font-medium w-24">Location:</span>
                 <span className="flex-1">{selectedClient.location}</span>
               </div>
               <div className="flex items-center">
                 <Calendar className="w-5 h-5 text-blue-500 mr-3 shrink-0"/>
                 <span className="font-medium w-24">Date:</span>
                 <span className="flex-1">{selectedClient.schedule}</span>
               </div>
               <div className="flex items-start pt-3 border-t mt-3">
                 <Clock className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-1"/>
                 <span className="font-medium w-24">Description:</span>
                 <span className="flex-1 text-gray-600 italic">
                    {selectedClient.rawBooking.description || "No description provided."}
                 </span>
               </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                {/* Decline Button in Modal */}
                <button 
                    onClick={() => handleDecline(selectedClient)}
                    className="px-4 py-2 text-sm font-medium rounded-full text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition"
                >
                    Decline
                </button>

                {/* Accept Button in Modal */}
                <button 
                    onClick={() => handleAccept(selectedClient)}
                    className="px-4 py-2 text-sm font-medium rounded-full text-white bg-[#26466F] shadow-md hover:bg-[#1E3A5A] transition"
                >
                    Accept Job
                </button>
            </div>      
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRequestTable;