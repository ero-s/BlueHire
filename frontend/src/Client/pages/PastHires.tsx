import React from "react";
import { Star, ExternalLink } from "lucide-react";
import type { PastHire } from "./types";

const MOCK_PAST_HIRES: PastHire[] = [
  {
    id: "TRX-9821",
    worker: {
      id: "w1",
      name: "Mario Rossi",
      category: "Plumbing",
      avatar: "https://i.pravatar.cc/150?u=11",
    },
    date: "Oct 15, 2023",
    paymentAmount: 120.0,
    paymentStatus: "Paid",
    rating: 5,
  },
  {
    id: "TRX-9822",
    worker: {
      id: "w2",
      name: "Sarah Connor",
      category: "Electrical",
      avatar: "https://i.pravatar.cc/150?u=12",
    },
    date: "Sep 28, 2023",
    paymentAmount: 85.5,
    paymentStatus: "Paid",
    rating: 4,
  },
  {
    id: "TRX-9823",
    worker: {
      id: "w3",
      name: "Luigi Verma",
      category: "Cleaning",
      avatar: "https://i.pravatar.cc/150?u=13",
    },
    date: "Aug 10, 2023",
    paymentAmount: 200.0,
    paymentStatus: "Refunded",
    rating: 1,
  },
  {
    id: "TRX-9824",
    worker: {
      id: "w4",
      name: "Peach Toadstool",
      category: "Gardening",
      avatar: "https://i.pravatar.cc/150?u=14",
    },
    date: "July 22, 2023",
    paymentAmount: 150.0,
    paymentStatus: "Paid",
    rating: 5,
  },
];

const PastHires: React.FC = () => {
  const handleRowClick = (id: string) => {
    // In a real app, this route would exist. For now, we simulate the action.
    console.log(`Navigating to Transaction List / Details for ${id}`);
    // Simulate redirection to transactions
    // navigate(`/transactions/${id}`);
    alert(`Redirecting to Transaction Details for ${id}`);
  };

  return (
    <div>
      <div className="p-6 md:p-10 mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Past Hires</h1>
          <p className="text-gray-500">
            View your history of service providers and transactions.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  <th className="px-6 py-4">Worker Name</th>
                  <th className="px-6 py-4">Service Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_PAST_HIRES.map((hire) => (
                  <tr
                    key={hire.id}
                    onClick={() => handleRowClick(hire.id)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={hire.worker.avatar}
                          alt={hire.worker.name}
                          className="w-10 h-10 rounded-full object-cover shadow-sm"
                        />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {hire.worker.name}
                          </p>
                          <p className="text-xs text-gray-400">ID: {hire.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {hire.worker.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {hire.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          ${hire.paymentAmount.toFixed(2)}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold ${hire.paymentStatus === "Refunded" ? "text-red-500" : "text-green-500"}`}
                        >
                          {hire.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < hire.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-[#3b82f6] transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {MOCK_PAST_HIRES.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No past hires found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastHires;
