import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// --- Interfaces ---
export interface SystemLog {
  id: string;
  type: string;
  action: string;
  status: 'Success' | 'Warning' | 'Error';
  timestamp: string;
}

// --- Mock Data ---
export const MOCK_LOGS: SystemLog[] = [
  { id: 'LOG-001', action: 'Admin login detected', type: 'Auth', status: 'Success', timestamp: 'Oct 25, 2023 • 08:30 AM' },
  { id: 'LOG-002', action: 'Database backup started', type: 'System', status: 'Success', timestamp: 'Oct 25, 2023 • 09:00 AM' },
  { id: 'LOG-003', action: 'Failed login attempt (Client)', type: 'User', status: 'Warning', timestamp: 'Oct 25, 2023 • 09:15 AM' },
  { id: 'LOG-004', action: 'Transaction timeout', type: 'Payment', status: 'Error', timestamp: 'Oct 25, 2023 • 10:45 AM' },
  { id: 'LOG-005', action: 'New worker registration', type: 'Worker', status: 'Success', timestamp: 'Oct 25, 2023 • 11:20 AM' },
];

// --- SystemLogsTable Component ---
const SystemLogsTable: React.FC = () => {
  return (
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
          System Logs
        </h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left text-xs uppercase font-semibold tracking-wider">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Log ID</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Action</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Time Stamp</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-100">
            {MOCK_LOGS.map((log, index) => (
              <tr key={index} className="hover:bg-blue-50/30 transition-colors text-sm">
                {/* Log ID */}
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">
                  {log.id}
                </td>

                {/* Action */}
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                  {log.action}
                </td>

                {/* Time Stamp */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {log.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span>Showing {MOCK_LOGS.length} entries</span>
        <div className="flex items-center space-x-1">
          <button className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex space-x-1">
            <button className="w-6 h-6 rounded bg-blue-600 text-white shadow-sm flex items-center justify-center">1</button>
            <button className="w-6 h-6 rounded hover:bg-gray-100 text-gray-600 flex items-center justify-center">2</button>
          </div>
          <button className="p-1 text-gray-700 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default SystemLogsTable;