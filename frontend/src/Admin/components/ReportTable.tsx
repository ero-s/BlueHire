import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// --- Interfaces ---
export interface Report {
  id: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Under Review';
  date: string;
  reporter: string;
}

// --- Mock Data ---
export const MOCK_REPORTS: Report[] = [
  { id: 'RPT-102', description: 'Worker no-show complaint', status: 'Open', date: '2023-10-25', reporter: 'Mark Anthony Reyes' },
  { id: 'RPT-101', description: 'Inappropriate chat behavior', status: 'Open', date: '2023-10-24', reporter: 'Jessa Mae Abella' },
  { id: 'RPT-099', description: 'Payment dispute #4421', status: 'Resolved', date: '2023-10-22', reporter: 'Rolando Uy' },
  { id: 'RPT-098', description: 'Duplicate account reported', status: 'Resolved', date: '2023-10-20', reporter: 'System Admin' },
  { id: 'RPT-097', description: 'Harassment report', status: 'Open', date: '2023-10-19', reporter: 'Kristine Joy Lim' },
  { id: 'RPT-096', description: 'Job cancellation dispute', status: 'Resolved', date: '2023-10-18', reporter: 'Jonathan dela Peña' },
];

// --- Status Badge Component ---
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let styles = "";

  if (status === 'Resolved') {
    styles = "bg-green-100 text-green-700 border border-green-200";
  } else if (status === 'Open') {
    styles = "bg-red-100 text-red-600 border border-red-200 animate-pulse";
  } else {
    styles = "bg-blue-100 text-blue-600 border border-blue-200";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase rounded-full ${styles}`}>
      {status}
    </span>
  );
};

// --- ReportsTable Component ---
const ReportsTable: React.FC = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState<'All' | 'Resolved' | 'Open'>('All');

  // Filter Logic
  const filteredReports = MOCK_REPORTS.filter(report => {
    if (filter === 'All') return true;
    return report.status === filter;
  });

  return (
    // UPDATED: Matched container classes (rounded-xl, shadow-lg, border-gray-100)
    <div className="bg-white pt-6 px-6 pb-6 rounded-xl shadow-lg w-full max-w-7xl mx-auto mt-8 border border-gray-100">

      {/* Back Arrow Navigation */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-[#26466F] transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
          System Reports
        </h2>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
           <label className="text-xs font-medium text-gray-500">Filter Status:</label>
           <select
             className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 bg-white text-gray-700"
             value={filter}
             onChange={(e) => setFilter(e.target.value as 'All' | 'Resolved' | 'Open')}
           >
             <option value="All">All</option>
             <option value="Resolved">Resolved</option>
             <option value="Open">Open</option>
           </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header - UPDATED to match VerificationsTable style */}
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left text-xs uppercase font-semibold tracking-wider">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Report ID</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Description</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                // UPDATED: Matched hover opacity and transition
                <tr key={index} className="hover:bg-blue-50/30 transition-colors text-sm">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {report.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setShowDetails(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                   No reports found matching "{filter}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer - UPDATED to match VerificationsTable style */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span>Showing {filteredReports.length} entries</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex space-x-1">
            <button className="w-6 h-6 rounded bg-blue-600 text-white shadow-sm flex items-center justify-center">1</button>
            <button className="w-6 h-6 rounded hover:bg-gray-100 text-gray-600 flex items-center justify-center">2</button>
            <button className="w-6 h-6 rounded hover:bg-gray-100 text-gray-600 flex items-center justify-center">3</button>
          </div>
          <button className="p-1 text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      {/* Report Details Modal (Unchanged functional logic, just display) */}
      {showDetails && selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex flex-col items-center border-b border-gray-100 pb-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#26466F] mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{selectedReport.id}</h2>
              <span className="mt-2"><StatusBadge status={selectedReport.status} /></span>
            </div>

            {/* Report Details */}
            <div className="mt-6 space-y-4 text-gray-700 text-sm">
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Description:</span>
                <span className="font-medium text-gray-900">{selectedReport.description}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Reported By:</span>
                <span>{selectedReport.reporter}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Date:</span>
                <span>{selectedReport.date}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mt-4 border border-gray-100">
                <span className="font-semibold text-gray-500 block mb-1">Admin Notes:</span>
                <p className="text-gray-600 italic">No notes added yet.</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end gap-2">
              {selectedReport.status === 'Open' && (
                  <button
                    className="px-4 py-2 text-sm rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
                    onClick={() => {
                        setShowDetails(false);
                    }}
                  >
                    Mark as Resolved
                  </button>
              )}
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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

export default ReportsTable;