import React, { useState } from "react";

// --- Interfaces ---
export interface WorkerTransaction {
  date: string;
  clientName: string;
  duration: string;
  serviceType: string;
  payment: string;
}

// --- Mock Data ---
const mockWorkerTransactions: WorkerTransaction[] = [
  { date: "2025-11-28", clientName: "Mark Anthony Reyes", duration: "5h", serviceType: "Carpentry", payment: "₱2,000" },
  { date: "2025-11-27", clientName: "Jessa Mae Abella", duration: "3h", serviceType: "House Cleaning", payment: "₱1,200" },
  { date: "2025-11-26", clientName: "Rolando Uy", duration: "4h", serviceType: "Electrical", payment: "₱1,800" },
  { date: "2025-11-25", clientName: "Kristine Joy Lim", duration: "6h", serviceType: "Babysitting", payment: "₱1,500" },
  { date: "2025-11-24", clientName: "Jonathan dela Peña", duration: "2h", serviceType: "Plumbing", payment: "₱1,000" },
  { date: "2025-11-23", clientName: "Mary Rose Cabahug", duration: "5h", serviceType: "Cooking", payment: "₱2,300" },
  { date: "2025-11-22", clientName: "Carlo Mendoza", duration: "4h", serviceType: "Driving", payment: "₱1,800" },
  { date: "2025-11-21", clientName: "Angela Santos", duration: "3h", serviceType: "House Cleaning", payment: "₱1,100" },
  { date: "2025-11-20", clientName: "Luis Fernandez", duration: "5h", serviceType: "Carpentry", payment: "₱2,100" },
  { date: "2025-11-19", clientName: "Mariel Cruz", duration: "2h", serviceType: "Cooking", payment: "₱900" },
  { date: "2025-11-18", clientName: "Dante Ramos", duration: "4h", serviceType: "Electrical", payment: "₱1,700" },
];

// --- Badge Color ---
const serviceBadgeColor = (service: string) => {
  switch (service.toLowerCase()) {
    case "carpentry": return "bg-blue-100 text-blue-700";
    case "house cleaning": return "bg-indigo-100 text-indigo-700";
    case "electrical": return "bg-green-100 text-green-700";
    case "babysitting": return "bg-red-100 text-red-700";
    case "plumbing": return "bg-purple-100 text-purple-700";
    case "cooking": return "bg-pink-100 text-pink-700";
    case "driving": return "bg-yellow-100 text-yellow-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

// --- Table Component with Pagination ---
const WorkerTransactionTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTx, setSelectedTx] = useState<WorkerTransaction | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockWorkerTransactions.length / itemsPerPage);
  const currentData = mockWorkerTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl mx-auto mt-8 border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Service</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Profile</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {currentData.map((tx, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50 transition duration-100">
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{tx.date}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-[#477EE5] hover:underline cursor-pointer">{tx.clientName}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{tx.duration}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${serviceBadgeColor(tx.serviceType)}`}>
                    {tx.serviceType}
                  </span>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-[#5AB3E6]">{tx.payment}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => { setSelectedTx(tx); setShowProfile(true); }}
                    className="py-1 px-4 text-sm font-medium rounded-full border border-[#5AB3E6] text-[#5AB3E6] bg-white shadow-sm transition duration-150 ease-in-out hover:bg-[#5AB3E6] hover:text-white"
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
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
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Profile Modal */}
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
                src="https://i.pravatar.cc/150?u=client_tx"
                alt="Worker Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{selectedTx.clientName}</h2>
              <p className="text-gray-500 mt-1">{selectedTx.serviceType} • {selectedTx.duration}</p>
            </div>

            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="font-semibold w-32">Date:</span>
                <span>{selectedTx.date}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Service Type:</span>
                <span>{selectedTx.serviceType}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Duration:</span>
                <span>{selectedTx.duration}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32">Payment:</span>
                <span>{selectedTx.payment}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerTransactionTable;
