import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

// --- Interfaces ---
// This matches your Java SystemLog Entity
interface SystemLog {
  logID: number;
  action: string;
  timestamp: string; // comes as ISO string from Java
}

const SystemLogsTable: React.FC = () => {
  // --- State ---
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State (Client-side)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Fetch Data ---
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/system-logs');
      if (!response.ok) {
        throw new Error('Failed to fetch system logs');
      }
      const data: SystemLog[] = await response.json();
      
      // Sort logs by ID descending (Newest first)
      // or by timestamp if preferred: new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      const sortedData = data.sort((a, b) => b.logID - a.logID);
      
      setLogs(sortedData);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // --- Helper: Format Date ---
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return isoString;
    }
  };

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white pt-6 px-6 pb-6 rounded-xl shadow-lg w-full max-w-7xl mx-auto mt-8 border border-gray-100">

      {/* Back Arrow Navigation */}
      <div className="mb-4">
        <Link
          to="/Admin"
          className="inline-flex items-center text-gray-500 hover:text-[#26466F] transition-colors group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
          System Logs
          <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs normal-case">
            Total: {logs.length}
          </span>
        </h2>
        <button 
          onClick={fetchLogs}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          title="Refresh Logs"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 text-gray-400">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p className="text-sm">Loading system logs...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50 rounded-lg">
          <AlertCircle size={32} className="mb-2" />
          <p className="font-medium">Error loading logs</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchLogs}
            className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-600 text-sm hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="overflow-x-auto min-h-[400px]">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-left text-xs uppercase font-semibold tracking-wider">
                  <th scope="col" className="px-6 py-3 whitespace-nowrap w-24">Log ID</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">Action Details</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap w-64">Time Stamp</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-100">
                {currentLogs.length > 0 ? (
                  currentLogs.map((log) => (
                    <tr key={log.logID} className="hover:bg-blue-50/30 transition-colors text-sm group">
                      {/* Log ID */}
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-400 group-hover:text-blue-600">
                        #{log.logID}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                        {log.action}
                      </td>

                      {/* Time Stamp */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                        {formatDate(log.timestamp)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                      No logs found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, logs.length)} of {logs.length} entries
              </span>
              
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                
                <div className="flex space-x-1">
                  {/* Simple Pagination Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show generic page numbers for simplicity, usually needs complex offset logic
                    let p = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                       p = currentPage - 2 + i;
                       // boundary check
                       if (p > totalPages) p = totalPages - (4 - i); 
                    }
                    
                    return (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                          currentPage === p 
                            ? "bg-blue-600 text-white shadow-sm font-bold" 
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  })}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 text-gray-700 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SystemLogsTable;