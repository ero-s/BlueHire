import React, { useState, useEffect } from 'react';
import { Loader2, MapPin, Calendar, User, Clock } from 'lucide-react';

// --- Interfaces ---
interface JobRequest {
  id: string;
  clientName: string;
  clientAvatar: string;
  jobType: string;
  location: string;
  schedule: string;
  status: string;
  rawBooking: any;
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
    };
    fetchWorkerProfile();
  }, []);

  // 2. Fetch Job Requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!currentWorkerId) return;
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/booking/getAll");
        if (response.ok) {
          const allBookings = await response.json();
          
          // --- FILTER LOGIC UPDATED --- 
          // Show bookings where status is 'Responded' (Client Accepted the worker's application)
          const myRequests = allBookings.filter((b: any) => 
            b.worker && 
            b.worker.workerID === currentWorkerId && 
            b.status === 'Responded' 
          );

          const mappedRequests: JobRequest[] = myRequests.map((b: any) => ({
            id: b.bookingID.toString(),
            clientName: b.client?.user?.name ? `${b.client.user.name.firstName} ${b.client.user.name.lastName}` : "Unknown Client",
            clientAvatar: b.client?.user?.photoURL || `https://ui-avatars.com/api/?name=Client&background=random`,
            jobType: b.serviceCategory || "General Service",
            location: b.location,
            schedule: new Date(b.scheduledDateTime).toLocaleDateString(),
            status: 'Accept', // Button label
            rawBooking: b
          }));

          setRequests(mappedRequests);
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
        // --- ACTION LOGIC ---
        // Worker clicks Accept -> Status becomes 'Accepted' (Ongoing)
        
        // Use sanitized payload if necessary, but typically this is fine if backend is fixed
        const payload = { 
            bookingID: request.rawBooking.bookingID,
            status: 'Accepted',
            // Send null relations just in case backend needs it
            client: null,
            worker: null,
            payment: null,
            // Re-send text fields to avoid null overwrites
            jobTitle: request.rawBooking.jobTitle || "",
            description: request.rawBooking.description || "",
            location: request.rawBooking.location || "",
            scheduledDateTime: request.rawBooking.scheduledDateTime,
            serviceCategory: request.rawBooking.serviceCategory || ""
        };

        const response = await fetch(`http://localhost:8080/booking/update?id=${request.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Job Accepted! It has been moved to your Booking List as Ongoing.");
            // Remove from this table locally
            setRequests(prev => prev.filter(r => r.id !== request.id));
        } else {
            alert("Failed to accept job.");
        }
    } catch (error) {
        console.error("Error accepting job:", error);
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
             <div className="text-center text-gray-400 py-10">No new job requests at the moment.</div>
        ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-gray-200">
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
                    <img src={request.clientAvatar} alt="" className="w-8 h-8 rounded-full" />
                    <button 
                        onClick={() => { setSelectedClient(request); setShowProfile(true); }}
                        className="text-[#477EE5] hover:text-blue-800 underline"
                    >
                        {request.clientName}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.jobType}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.location}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{request.schedule}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <div className="flex flex-col gap-2">
                    {/* Accept Button - Triggers API */}
                    <button
                      onClick={() => handleAccept(request)}
                      className="w-32 py-1.5 text-sm font-medium rounded-full text-white bg-[#5AB3E6] shadow hover:bg-opacity-90 transition"
                    >
                      Accept
                    </button>

                    {/* View Profile Button */}
                    <button
                      onClick={() => { setSelectedClient(request); setShowProfile(true); }}
                      className="w-32 py-1.5 text-sm font-medium rounded-full border border-[#5AB3E6] text-[#5AB3E6] bg-white shadow hover:bg-[#5AB3E6] hover:text-white transition"
                    >
                      View Profile
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Mock Profile Modal */}
      {showProfile && selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">
            <div className="flex flex-col items-center">
              <img src={selectedClient.clientAvatar} alt="Client" className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md" />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{selectedClient.clientName}</h2>
              <p className="text-gray-500 mt-1">{selectedClient.jobType}</p>
            </div>
            
            <div className="mt-6 space-y-4 text-gray-700">
               <div className="flex items-start">
                 <span className="font-semibold w-32">Address:</span>
                 <span>{selectedClient.location}</span>
               </div>
               <div className="flex items-start">
                 <span className="font-semibold w-32">Schedule:</span>
                 <span>{selectedClient.schedule}</span>
               </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
               <button onClick={() => setShowProfile(false)} className="px-3 py-1.5 text-sm rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100">Close</button>
            </div>      
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRequestTable;