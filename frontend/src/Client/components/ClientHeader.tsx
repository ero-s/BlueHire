import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, Search, Menu, ChevronDown, User, LogOut, X, ChevronRight } from "lucide-react";
import Logo from "../../MainComponents/LandingComponents/Logo/Logo"; // Adjust path as needed

interface HeaderProps {
  logo?: string;
  userName: string;
}

interface NavItem {
  label: string;
  href: string;
}

// --- Client Specific Navigation ---
const navItems: NavItem[] = [
  { label: "Dashboard", href: "/" },
  { label: "Workers", href: "/jobposts" }, // Client searches for Workers
  { label: "Bookings", href: "/bookings" },
  { label: "Transactions", href: "/transactions" },
];

// --- Mock Data for Search (Workers) ---
const MOCK_WORKERS = [
  { id: 1, name: "Jose P. Rizal", role: "Plumber", location: "Cebu City" },
  { id: 2, name: "Maria Clara", role: "House Cleaning", location: "Mandaue City" },
  { id: 3, name: "Juan Luna", role: "Electrician", location: "Lapu-Lapu City" },
  { id: 4, name: "Gabriela Silang", role: "Nanny", location: "Talisay" },
  { id: 5, name: "Andres Bonifacio", role: "Carpenter", location: "Liloan" },
];

const ClientHeader: React.FC<HeaderProps> = ({ userName }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- Search Logic ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredWorkers = MOCK_WORKERS.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    worker.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 pt-4 pb-0 flex flex-col items-center justify-between gap-4 bg-[#F6F6F6] z-50">
      <div className="w-full px-4 md:px-12 pt-2 pb-2 flex items-center justify-between gap-4 bg-transparent">
        
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 items-center bg-white rounded-full px-2 py-2 shadow-sm border border-gray-100">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? "bg-[#4D7EAF] text-white shadow-md hover:bg-[#3d6691] hover:shadow-lg"
                  : "text-gray-600 hover:bg-blue-50 hover:text-[#4D7EAF]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0 relative">
          
          {/* --- Search Bar with Pop-up --- */}
          <div className="hidden sm:flex items-center relative" ref={searchRef}>
              <Search className="absolute left-3 text-gray-400 w-4 h-4 z-10" />
              <input 
                  type="text" 
                  placeholder="Search workers..." 
                  className={`pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] w-48 transition-all duration-300 focus:w-64 ${isSearchOpen ? 'ring-2 ring-[#5AB3E6]' : ''}`}
                  value={searchQuery}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 z-10"
                >
                  <X size={14} />
                </button>
              )}

              {/* Search Dropdown Results */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {filteredWorkers.length > 0 ? "Workers Found" : "No results"}
                    </span>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                    {filteredWorkers.length > 0 ? (
                      filteredWorkers.map((worker) => (
                        <div 
                          key={worker.id}
                          className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer transition-colors group border-b last:border-0 border-gray-50"
                        >
                          <div>
                            <p className="font-semibold text-sm text-gray-800 group-hover:text-[#4D7EAF]">{worker.name}</p>
                            <p className="text-[10px] text-gray-400">{worker.role} • {worker.location}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-[#5AB3E6]" />
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-xs">
                        No workers matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md">
            <Mail className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
          </button>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative">
              <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 bg-white rounded-full p-1 pr-3 shadow-sm select-none transition-shadow hover:shadow-md"
              >
                  <img
                      src="https://picsum.photos/id/64/100/100"
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block whitespace-nowrap">
                      {userName}
                  </span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''} shrink-0`} />
              </button>

              {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 origin-top-right animate-[fadeIn_0.2s_ease-out]">
                      <a href="#" className="group relative flex items-center px-4 py-3 text-sm text-gray-600 rounded-xl overflow-hidden hover:bg-[#4D7EAF] hover:text-white transition-all">
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <User size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                              <span className="font-medium">Profile</span>
                          </div>
                      </a>
                      <div className="h-px bg-gray-100 my-1 mx-2"></div>
                      <a href="#" className="group relative flex items-center px-4 py-3 text-sm text-red-500 rounded-xl overflow-hidden hover:bg-red-500 hover:text-white transition-all">
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <LogOut size={18} className="text-red-400 group-hover:text-white transition-colors" />
                              <span className="font-medium">Logout</span>
                          </div>
                      </a>
                  </div>
              )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-[#4D7EAF] hover:bg-blue-50 transition-colors"
          >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- Mobile Navigation Dropdown --- */}
      {isMobileMenuOpen && (
        <div className="w-full md:hidden bg-white border-t border-gray-100 shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  index === 0
                    ? "bg-[#4D7EAF] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#4D7EAF]"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
                {index !== 0 && <ChevronRight size={16} className="text-gray-300" />}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ClientHeader;