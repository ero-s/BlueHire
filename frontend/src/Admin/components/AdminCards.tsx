import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, RefreshCw } from 'lucide-react';

// --- 1. Interfaces ---

interface SystemLog {
  logID: number;
  action: string;
  timestamp: string;
}

interface Report {
  id: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Under Review';
}

// ✅ UPDATED: Backend Document Interface to support generic Users
interface BackendDocument {
  documentID: number;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  uploadedAt: string;
  documentFileURL: string;
  documentType: string;
  // Assuming the backend returns the nested User object
  user?: {
    userID: number;
    username: string;
    role: string;
    name: {
        firstName: string;
        lastName: string;
    }
  };
}

// Interface for Dashboard Stats
interface DashboardStats {
  users: number;
  clients: number;
  workers: number;
  queue: number;
}

// --- 2. Mock Data (For Reports only) ---
const MOCK_REPORTS: Report[] = [
  { id: 'RPT-102', description: 'Worker no-show complaint', status: 'Open' },
  { id: 'RPT-101', description: 'Inappropriate chat behavior', status: 'Under Review' },
  { id: 'RPT-099', description: 'Payment dispute #4421', status: 'Resolved' },
];

// --- 3. Component Parts ---

// A. STATS CARD
const StatItem: React.FC<{ title: string; value: number | string; alert?: boolean }> = ({ title, value, alert }) => (
  <div className="flex flex-col justify-center px-6 py-4 border-r border-gray-100 last:border-0">
    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</h3>
    <div className="flex items-end gap-2">
      <p className={`text-3xl font-bold ${alert ? 'text-red-600' : 'text-gray-900'}`}>{value}</p>
      {alert && <span className="text-xs text-red-500 font-medium mb-1.5 bg-red-50 px-2 py-0.5 rounded-full">Pending</span>}
    </div>
  </div>
);

const AggregatesOverview: React.FC<{ stats: DashboardStats; loading: boolean }> = ({ stats, loading }) => {
  if (loading) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full p-8 flex justify-center">
            <Loader2 className="animate-spin text-blue-500" />
        </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 w-full overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0">
        <StatItem title="TOTAL USERS" value={stats.users.toLocaleString()} />
        <StatItem title="CLIENTS" value={stats.clients.toLocaleString()} />
        <StatItem title="WORKERS" value={stats.workers.toLocaleString()} />
        <StatItem title="VERIFICATION QUEUE" value={stats.queue.toLocaleString()} alert={stats.queue > 0} />
      </div>
    </div>
  );
};

// --- Unified Status Badge Component ---
const StatusBadge: React.FC<{ status: string, type: 'log' | 'report' | 'verification' }> = ({ status, type }) => {
  let styles = "bg-gray-100 text-gray-800";
  const upperStatus = status ? status.toUpperCase() : "UNKNOWN";

  if (type === 'verification') {
    if (upperStatus === 'VERIFIED') styles = "bg-green-100 text-green-700 border border-green-200";
    else if (upperStatus === 'PENDING') styles = "bg-yellow-100 text-yellow-700 border border-yellow-200";
    else if (upperStatus === 'REJECTED') styles = "bg-red-100 text-red-700 border border-red-200";
  }
  else if (type === 'report') {
    if (status === 'Resolved') styles = "bg-green-100 text-green-600";
    else if (status === 'Under Review') styles = "bg-blue-100 text-blue-600";
    else if (status === 'Open') styles = "bg-red-100 text-red-600 animate-pulse";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase font-bold rounded-full ${styles}`}>
      {status}
    </span>
  );
};

// B. SYSTEM LOGS CARD
const SystemLogsCard: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch("http://localhost:8080/system-logs");
        if (res.ok) {
          const data: SystemLog[] = await res.json();
          const sorted = data.sort((a, b) => b.logID - a.logID).slice(0, 5);
          setLogs(sorted);
        }
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getLogStyle = (action: string) => {
    const text = action.toLowerCase();
    if (text.includes("error") || text.includes("deleted") || text.includes("failed")) {
      return { color: "text-red-600", bg: "bg-red-50", type: "CRITICAL" };
    } else if (text.includes("updated") || text.includes("warning")) {
      return { color: "text-amber-600", bg: "bg-amber-50", type: "UPDATE" };
    } else if (text.includes("created") || text.includes("registered") || text.includes("success")) {
      return { color: "text-green-600", bg: "bg-green-50", type: "NEW" };
    }
    return { color: "text-blue-600", bg: "bg-blue-50", type: "INFO" };
  };

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Recent System Logs</h3>
      </div>
      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium w-16">ID</th>
              <th className="py-2 font-medium w-24">Time</th>
              <th className="py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {loading ? (
              <tr><td colSpan={3} className="py-8 text-center"><Loader2 className="animate-spin inline" /></td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={3} className="py-8 text-center text-gray-400 text-xs">No logs recorded.</td></tr>
            ) : (
              logs.map((log) => {
                const style = getLogStyle(log.action);
                return (
                  <tr key={log.logID} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-gray-400 text-xs font-mono">#{log.logID}</td>
                    <td className="py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(log.timestamp)}</td>
                    <td className="py-3 text-gray-700">
                      <div className="flex items-center gap-2">
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${style.bg} ${style.color}`}>{style.type}</span>
                         <span className="truncate max-w-[180px]" title={log.action}>{log.action}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
        <button onClick={() => navigate('/admin/SystemLogs')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
          View All <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

// C. REPORTS CARD
const ReportsCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Reports</h3>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold">New: {MOCK_REPORTS.filter(r => r.status === 'Open').length}</span>
      </div>
      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="py-2 font-medium">ID</th>
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
        <button onClick={() => navigate('/admin/Reports')} className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
          View All <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

// D. VERIFICATIONS TABLE (Updated for User Verification)
const VerificationsTable: React.FC<{ onUpdate: () => void }> = ({ onUpdate }) => {
  const [documents, setDocuments] = useState<BackendDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<BackendDocument | null>(null);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/documents");
      if (response.ok) {
        const data = await response.json();
        // Sort: Pending first, then by date
        const sortedData = data.sort((a: any, b: any) => {
            if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
            if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
            return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        });
        setDocuments(sortedData);
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [onUpdate]); // Re-fetch if parent says update needed

  const handleStatusUpdate = async (doc: BackendDocument, newStatus: string) => {
    if (!window.confirm(`Mark this document as ${newStatus}?`)) return;

    try {
      // We assume PUT /documents/{id} accepts the full object with updated status
      const updatedPayload = { ...doc, status: newStatus };
      
      const response = await fetch(`http://localhost:8080/documents/${doc.documentID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPayload),
      });

      if (response.ok) {
        fetchDocuments(); 
        setShowDetails(false);
        onUpdate(); // Trigger Stats Refresh in Parent
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleView = (entry: BackendDocument) => {
    setSelectedEntry(entry);
    setShowDetails(true);
  };

  // Helper to get User Name safely
  const getUserName = (doc: BackendDocument) => {
    if (doc.user && doc.user.name) {
        return `${doc.user.name.firstName} ${doc.user.name.lastName}`;
    }
    return "Unknown User";
  };

  // Helper to get Role safely
  const getUserRole = (doc: BackendDocument) => {
      return doc.user?.role || "N/A";
  };

  return (
    <div className="bg-white pt-6 px-6 pb-6 rounded-xl shadow-lg w-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide flex items-center gap-2">
            User Verifications
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full normal-case font-normal">
                (Clients & Workers)
            </span>
        </h2>
        <button onClick={fetchDocuments} className="text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw size={18}/>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-left text-xs uppercase font-semibold tracking-wider">
              <th className="px-6 py-3 whitespace-nowrap">Doc ID</th>
              <th className="px-6 py-3 whitespace-nowrap">User Name</th>
              <th className="px-6 py-3 whitespace-nowrap">Role</th>
              <th className="px-6 py-3 whitespace-nowrap">Doc Type</th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading ? (
               <tr><td colSpan={6} className="text-center py-4"><Loader2 className="animate-spin inline" /></td></tr>
            ) : documents.length === 0 ? (
               <tr><td colSpan={6} className="text-center py-4 text-gray-500">No pending verifications.</td></tr>
            ) : (
              documents.map((entry) => (
                <tr key={entry.documentID} className="hover:bg-blue-50/30 transition-colors text-sm">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">#{entry.documentID}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{getUserName(entry)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getUserRole(entry) === 'WORKER' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                          {getUserRole(entry)}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{entry.documentType}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={entry.status} type="verification" /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                    <button onClick={() => handleView(entry)} className="text-blue-600 hover:text-blue-900 font-semibold">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showDetails && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-in zoom-in duration-200">
            <div className="flex flex-col items-center border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-800">Verify User Document</h2>
              <span className="mt-2"><StatusBadge status={selectedEntry.status} type="verification" /></span>
            </div>
            <div className="mt-6 space-y-3 text-gray-700 text-sm">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">User:</span>
                <span className="font-medium">{getUserName(selectedEntry)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Role:</span>
                <span className="font-medium">{getUserRole(selectedEntry)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Document Type:</span>
                <span className="font-medium">{selectedEntry.documentType}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Path:</span>
                <span className="text-xs text-gray-400 max-w-[200px] truncate">{selectedEntry.documentFileURL}</span>
              </div>
              <div className="bg-gray-100 h-32 rounded flex items-center justify-center text-gray-400 text-xs italic">
                  [Document Preview Placeholder]
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-2">
              {selectedEntry.status === 'PENDING' && (
                <>
                  <button onClick={() => handleStatusUpdate(selectedEntry, "VERIFIED")} className="px-4 py-2 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700">Approve</button>
                  <button onClick={() => handleStatusUpdate(selectedEntry, "REJECTED")} className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600">Reject</button>
                </>
              )}
              <button onClick={() => setShowDetails(false)} className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Exported Component ---

const AdminCards: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({ users: 0, clients: 0, workers: 0, queue: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Used to reload stats when a doc is verified

  // Fetch Real Stats from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/administrator/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, [refreshTrigger]);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="w-full">
        {/* 1. Top Section: Real Data from Backend */}
        <div className="mb-6">
            <AggregatesOverview stats={stats} loading={statsLoading} />
        </div>

        {/* 2. Middle Section: Logs and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <SystemLogsCard />
            <ReportsCard />
        </div>

        {/* 3. Bottom Section: Verifications (User Verification) */}
        <div className="mb-8">
            <VerificationsTable onUpdate={triggerRefresh} />
        </div>
    </div>
  );
};

export default AdminCards;