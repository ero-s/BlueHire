import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. Interfaces ---

interface SystemLog {
  id: string;
  type: string;
  description: string;
  status: 'Success' | 'Warning' | 'Error';
}

interface Report {
  id: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Under Review';
}

interface VerificationEntry {
  documentId: string;
  workerName: string;
  documentType: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  // Added date property for the modal details
  dateSubmitted: string;
}

// --- 2. Mock Data ---

const MOCK_STATS = {
  users: "1,240",
  clients: "350",
  workers: "890",
  queue: "45",
};

const MOCK_LOGS: SystemLog[] = [
  { id: 'LOG-001', type: 'Auth', description: 'Admin login detected', status: 'Success' },
  { id: 'LOG-002', type: 'System', description: 'Database backup started', status: 'Success' },
  { id: 'LOG-003', type: 'User', description: 'Failed login attempt (Client)', status: 'Warning' },
  { id: 'LOG-004', type: 'Payment', description: 'Transaction timeout', status: 'Error' },
  { id: 'LOG-005', type: 'Worker', description: 'New worker registration', status: 'Success' },
];

const MOCK_REPORTS: Report[] = [
  { id: 'RPT-102', description: 'Worker no-show complaint', status: 'Open' },
  { id: 'RPT-101', description: 'Inappropriate chat behavior', status: 'Under Review' },
  { id: 'RPT-099', description: 'Payment dispute #4421', status: 'Resolved' },
  { id: 'RPT-098', description: 'Duplicate account reported', status: 'Resolved' },
];

// Added dates to mock verifications
const MOCK_VERIFICATIONS: VerificationEntry[] = [
  { documentId: 'DOC-7721', workerName: 'Juan Dela Cruz', documentType: 'National ID', status: 'Pending', dateSubmitted: 'Oct 26, 2023' },
  { documentId: 'DOC-7722', workerName: 'Maria Clara', documentType: 'NBI Clearance', status: 'Verified', dateSubmitted: 'Oct 24, 2023' },
  { documentId: 'DOC-7723', workerName: 'Andres Bonifacio', documentType: 'Driver License', status: 'Rejected', dateSubmitted: 'Oct 23, 2023' },
  { documentId: 'DOC-7724', workerName: 'Jose Rizal', documentType: 'TESDA Certificate', status: 'Verified', dateSubmitted: 'Oct 22, 2023' },
  { documentId: 'DOC-7725', workerName: 'Emilio Aguinaldo', documentType: 'Police Clearance', status: 'Pending', dateSubmitted: 'Oct 26, 2023' },
  { documentId: 'DOC-7726', workerName: 'Apolinario Mabini', documentType: 'National ID', status: 'Verified', dateSubmitted: 'Oct 20, 2023' },
  { documentId: 'DOC-7727', workerName: 'Antonio Luna', documentType: 'UMID', status: 'Pending', dateSubmitted: 'Oct 25, 2023' },
  { documentId: 'DOC-7728', workerName: 'Gabriela Silang', documentType: 'Barangay Clearance', status: 'Rejected', dateSubmitted: 'Oct 21, 2023' },
];

// --- 3. Component Parts ---

const StatItem: React.FC<{ title: string; value: string; alert?: boolean }> = ({ title, value, alert }) => (
  <div className="flex flex-col justify-center px-6 py-4">
    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h3>
    <div className="flex items-end gap-2">
      <p className={`text-3xl font-bold ${alert ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
      {alert && <span className="text-xs text-red-500 font-medium mb-1.5 bg-red-50 px-2 py-0.5 rounded-full">Action Required</span>}
    </div>
  </div>
);

const AggregatesOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatItem title="NO. OF USERS" value={MOCK_STATS.users} />
        <StatItem title="NO. OF CLIENTS" value={MOCK_STATS.clients} />
        <StatItem title="NO. OF WORKERS" value={MOCK_STATS.workers} />
        <StatItem title="WORKER VERIFICATION QUEUE" value={MOCK_STATS.queue} alert={true} />
      </div>
    </div>
  );
};

// --- Status Badge Component ---
const StatusBadge: React.FC<{ status: string, type: 'log' | 'report' | 'verification' }> = ({ status, type }) => {
  let styles = "bg-gray-100 text-gray-800";

  if (type === 'verification') {
    if (status === 'Verified') styles = "bg-green-100 text-green-700 border border-green-200";
    else if (status === 'Pending') styles = "bg-yellow-100 text-yellow-700 border border-yellow-200";
    else if (status === 'Rejected') styles = "bg-red-100 text-red-700 border border-red-200";
  }
  else if (type === 'log') {
    if (status === 'Success') styles = "text-green-600";
    else if (status === 'Warning') styles = "text-yellow-600";
    else if (status === 'Error') styles = "text-red-600 font-semibold";
  }
  else if (type === 'report') {
    if (status === 'Resolved') styles = "bg-green-100 text-green-600";
    else if (status === 'Under Review') styles = "bg-blue-100 text-blue-600";
    else if (status === 'Open') styles = "bg-red-100 text-red-600 animate-pulse";
  }

  if (type === 'log') {
    return <span className={`text-xs font-medium ${styles}`}>{status}</span>;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full ${styles}`}>
      {status}
    </span>
  );
};

// --- Middle Section: System Logs Card ---
const SystemLogsCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Recent System Logs</h3>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium">Log ID</th>
              <th className="py-2 font-medium">Type</th>
              <th className="py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 text-gray-500 text-xs">{log.id}</td>
                <td className="py-3 font-medium text-gray-700">{log.type}</td>
                <td className="py-3 text-gray-600 truncate max-w-[200px]">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
        <button
          onClick={() => navigate('/admin/SystemLogs')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          View All <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

// --- Middle Section: Reports Card ---
const ReportsCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Reports</h3>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">New: 1</span>
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium">Report ID</th>
              <th className="py-2 font-medium">Description</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MOCK_REPORTS.map((report) => (
              <tr key={report.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 text-gray-500 text-xs">{report.id}</td>
                <td className="py-3 text-gray-700 font-medium">{report.description}</td>
                <td className="py-3"><StatusBadge status={report.status} type="report" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
        <button
          onClick={() => navigate('/admin/Reports')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          View All <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

// --- Bottom Section: Verifications Table ---
const VerificationsTable: React.FC = () => {
  const navigate = useNavigate();
  // State for the modal
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<VerificationEntry | null>(null);

  const handleView = (entry: VerificationEntry) => {
    setSelectedEntry(entry);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedEntry(null);
  };

  return (
    <div className="bg-white pt-6 px-6 pb-6 rounded-xl shadow-lg w-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Worker Verifications</h2>
        <div className="flex gap-2 items-center">
            <input type="text" placeholder="Search ID..." className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left text-xs uppercase font-semibold tracking-wider">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Document ID</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Worker Name</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Document Type</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">Status</th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {MOCK_VERIFICATIONS.map((entry, index) => (
              <tr key={index} className="hover:bg-blue-50/30 transition-colors text-sm">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">{entry.documentId}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{entry.workerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.documentType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={entry.status} type="verification" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                  {/* View Button Triggers Modal */}
                  <button
                    onClick={() => handleView(entry)}
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span>Showing 1 to {MOCK_VERIFICATIONS.length} of 45 entries</span>
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

      {/* Verification Details Modal */}
      {showDetails && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-in zoom-in duration-200">

            {/* Modal Header */}
            <div className="flex flex-col items-center border-b border-gray-100 pb-4">
               {/* Document Icon */}
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#26466F] mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{selectedEntry.documentId}</h2>
              <span className="mt-2"><StatusBadge status={selectedEntry.status} type="verification" /></span>
            </div>

            {/* Entry Details */}
            <div className="mt-6 space-y-4 text-gray-700 text-sm">
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Worker Name:</span>
                <span className="font-medium text-gray-900">{selectedEntry.workerName}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Document Type:</span>
                <span className="font-medium text-gray-900">{selectedEntry.documentType}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-32 text-gray-500">Submitted On:</span>
                <span>{selectedEntry.dateSubmitted}</span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg mt-4 border border-gray-100 text-center">
                <span className="text-xs text-gray-400 block mb-2">DOCUMENT PREVIEW</span>
                <div className="h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs italic">
                    [Image Placeholder]
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end gap-2">
              {selectedEntry.status === 'Pending' && (
                <>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm rounded-full bg-green-600 text-white font-medium shadow hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm rounded-full bg-red-500 text-white font-medium shadow hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={handleClose}
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


// --- Main Exported Component ---

const AdminCards: React.FC = () => {
  return (
    <div className="w-full">
        {/* 1. Top Section: Unified Aggregate Card */}
        <div className="mb-6">
            <AggregatesOverview />
        </div>

        {/* 2. Middle Section: Logs and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SystemLogsCard />
            <ReportsCard />
        </div>

        {/* 3. Bottom Section: Verifications Table */}
        <div className="mb-8">
            <VerificationsTable />
        </div>
    </div>
  );
};

export default AdminCards;