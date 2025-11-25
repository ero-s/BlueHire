import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronRight } from "lucide-react";

// Mock data for search
const MOCK_CLIENTS = [
  { id: 1, name: "Sherielyn Guadiana", location: "Brgy. Hipodromo, Mabolo" },
  { id: 2, name: "Raziff Gumapon", location: "Cebu City" },
  { id: 3, name: "Shervin Dale Tabernero", location: "Mandaue City" },
  { id: 4, name: "Leni Robredo", location: "Naga City" },
  { id: 5, name: "Juan Dela Cruz", location: "Manila" },
];

const DashboardUpperSection: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter clients based on input
  const filteredClients = MOCK_CLIENTS.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-2">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-[#4D7EAF]">Jose!</span>
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your jobs today.
        </p>
      </div>

      {/* Search Section */}
      <div className="relative w-full md:w-[400px]" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400" size={20} />
          <input
            type="text"
            className={`w-full pl-12 pr-4 py-3 rounded-full border bg-white shadow-sm focus:outline-none transition-all duration-200
              ${isSearchOpen ? "ring-2 ring-[#5AB3E6] border-transparent" : "border-gray-200"}`}
            placeholder="Search Clients..."
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
              className="absolute right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Pop-up Results */}
        {isSearchOpen && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-fade-in-up">
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {filteredClients.length > 0 ? "Clients Found" : "No results"}
              </span>
            </div>
            
            <div className="max-h-[250px] overflow-y-auto">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div 
                    key={client.id}
                    className="flex items-center justify-between p-4 hover:bg-blue-50 cursor-pointer transition-colors group border-b last:border-0 border-gray-50"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-[#4D7EAF]">{client.name}</p>
                      <p className="text-xs text-gray-400">{client.location}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#5AB3E6]" />
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-400 text-sm">
                  No clients matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardUpperSection;