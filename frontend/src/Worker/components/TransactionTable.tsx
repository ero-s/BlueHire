import React, { useState, useEffect } from "react";
import axios from "axios";

// --- Types based on your Java Models ---

interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface User {
  userId: number;
  name: Name;
  email: string;
  contactNumber: string;
  address: { street?: string; city?: string; zipCode?: string }; // Simplified address
  photoURL?: string;
}

interface Client {
  clientID: number;
  user: User;
  company_name?: string;
}

interface Payment {
  paymentId?: number;
  amount: number;
  paymentStatus: string;
}

interface Booking {
  bookingID: number;
  scheduledDateTime: string; // LocalDateTime comes as string ISO
  jobTitle: string;
  serviceCategory: string;
  description: string;
  location: string;
  status: string;
  client: Client;
  worker?: { workerID: number }; // We need this to filter
  payment?: Payment; // Payment might be null
}

// --- Component ---
const WorkerTransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Booking | null>(null);

  // TODO: Replace this with the actual ID from your Login Context/Session
  const CURRENT_WORKER_ID = 1;

  // --- Fetch Data from Spring Boot ---
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Calling the endpoint defined in BookingController
        const response = await axios.get("http://localhost:8080/booking/getAll");

        // Filter: Only show bookings for the current worker that are not pending/cancelled
        // (Adjust logic based on what you consider a "Transaction")
        const workerBookings = response.data.filter((b: Booking) =>
          b.worker?.workerID === CURRENT_WORKER_ID
        );

        setTransactions(workerBookings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load transactions.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // --- Helpers ---
  const formatDate = (isoString: string) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString("en-PH", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return "Pending";
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  const getClientName = (client: Client) => {
    if (!client || !client.user || !client.user.name) return "Unknown Client";
    return `${client.user.name.firstName} ${client.user.name.lastName}`;
  };

  const serviceBadgeColor = (service: string) => {
    const s = service ? service.toLowerCase() : "";
    if (s.includes("carpentry")) return "bg-blue-100 text-blue-700";
    if (s.includes("cleaning")) return "bg-indigo-100 text-indigo-700";
    if (s.includes("electrical")) return "bg-green-100 text-green-700";
    if (s.includes("baby")) return "bg-red-100 text-red-700";
    if (s.includes("plumb")) return "bg-purple-100 text-purple-700";
    if (s.includes("cook")) return "bg-pink-100 text-pink-700";
    if (s.includes("driv")) return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  // --- Pagination Logic ---
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div className="p-10 text-center text-gray-500">Loading transactions...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto mt-8 border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Client</th>
              {/* Note: Duration is not in Booking Model, showing Job Title instead or Time */}
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Service</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Profile</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.length > 0 ? (
              currentData.map((tx) => (
                <tr key={tx.bookingID} className="hover:bg-blue-50/50 transition duration-100">
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(tx.scheduledDateTime)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-[#477EE5] hover:underline cursor-pointer">
                    {getClientName(tx.client)}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">
                    {tx.jobTitle}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${serviceBadgeColor(tx.serviceCategory)}`}>
                      {tx.serviceCategory}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-[#5AB3E6]">
                    {/* Assuming Payment object has an 'amount' field. If not, this needs adjustment */}
                    {tx.payment ? formatCurrency(tx.payment.amount) : "Unpaid"}
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    <button
                      onClick={() => { setSelectedTx(tx); setShowProfile(true); }}
                      className="py-1 px-4 text-sm font-medium rounded-full border border-[#5AB3E6] text-[#5AB3E6] bg-white shadow-sm transition duration-150 ease-in-out hover:bg-[#5AB3E6] hover:text-white"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Profile/Details Modal */}
      {showProfile && selectedTx && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <img
                src={selectedTx.client.user.photoURL || "https://i.pravatar.cc/150?u=default"}
                alt="Client Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{getClientName(selectedTx.client)}</h2>
              <p className="text-gray-500 mt-1">{selectedTx.serviceCategory}</p>
              <p className="text-sm text-gray-400">{selectedTx.client.company_name}</p>
            </div>

            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="font-semibold w-32">Job Title:</span>
                <span>{selectedTx.jobTitle}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Description:</span>
                <span className="text-sm">{selectedTx.description}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Location:</span>
                <span>{selectedTx.location}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Date:</span>
                <span>{formatDate(selectedTx.scheduledDateTime)}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Status:</span>
                <span className="px-2 py-0.5 rounded text-xs bg-gray-200">{selectedTx.status}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Payment:</span>
                <span className="text-[#5AB3E6] font-bold">
                  {selectedTx.payment ? formatCurrency(selectedTx.payment.amount) : "Unpaid"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerTransactionTable;