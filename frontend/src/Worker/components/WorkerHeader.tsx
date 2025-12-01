import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, Search, Menu, ChevronDown, User, LogOut, X, ChevronRight, Clock } from "lucide-react";
import Logo from "../../MainComponents/LandingComponents/Logo/Logo";
import { useNavigate, useLocation, Link } from "react-router-dom";

interface HeaderProps {
  logo?: string;
  userName: string;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/worker/dashboard" },
  { label: "Job Feeds", href: "/worker/jobfeeds" },
  { label: "Bookings", href: "/worker/bookings" },
  { label: "Transactions", href: "/worker/transactions" },
];

const MOCK_CLIENTS = [
  { id: 1, name: "Sherielyn Guadiana", location: "Brgy. Hipodromo, Mabolo" },
  { id: 2, name: "Raziff Gumapon", location: "Cebu City" },
  { id: 3, name: "Shervin Dale Tabernero", location: "Mandaue City" },
  { id: 4, name: "Leni Robredo", location: "Naga City" },
  { id: 5, name: "Juan Dela Cruz", location: "Manila" },
];

const MOCK_NOTIFICATIONS = [
    { id: 1, message: "New job request received for Electrician from Raziff Gumapon.", time: "10 min ago", type: "job_request" },
    { id: 2, message: "Booking confirmed by Sherielyn Guadiana. Status: Ongoing.", time: "2 hours ago", type: "booking_update" },
    { id: 3, message: "Payment of ₱1,500.00 received for Job ID #453.", time: "5 hours ago", type: "payment" },
    { id: 4, message: "Shervin Dale Tabernero sent a message regarding the job details.", time: "1 day ago", type: "message" },
];

const WorkerHeader: React.FC<HeaderProps> = ({ userName }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // --- Notification & Search State ---
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      
      // Close Search if clicked outside
      if (searchRef.current && !searchRef.current.contains(targetNode)) {
        setIsSearchOpen(false);
      }
      // Close Notifications if clicked outside
      if (notificationsRef.current && !notificationsRef.current.contains(targetNode)) {
        setIsNotificationsOpen(false);
      }
      // Close User Menu if clicked outside
      if (isUserMenuOpen && targetNode instanceof Element && !targetNode.closest('.user-menu-button') && !targetNode.closest('.user-menu-dropdown')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]); // Dependency ensures listener stays fresh

  const filteredClients = MOCK_CLIENTS.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleNotificationClick = () => {
      setIsNotificationsOpen(prev => !prev);
      setIsSearchOpen(false);
      setIsUserMenuOpen(false);
  };

  const handleSearchFocus = () => {
      setIsSearchOpen(true);
      setIsNotificationsOpen(false);
      setIsUserMenuOpen(false);
  };

  const handleUserMenuToggle = () => {
      setIsUserMenuOpen(prev => !prev);
      setIsSearchOpen(false);
      setIsNotificationsOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 pt-4 pb-0 flex flex-col items-center justify-between gap-4 bg-[#F6F6F6] z-50">
      <div className="w-full px-4 md:px-12 pt-2 pb-2 flex items-center justify-between gap-4 bg-transparent">

        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <Link to="/worker/dashboard">
            <Logo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 items-center bg-white rounded-full px-2 py-2 shadow-sm border border-gray-100">
          {navItems.map((item, index) => {
            const active = isActiveLink(item.href);
            return (
              <Link
                key={index}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-[#4D7EAF] text-white shadow-md hover:bg-[#3d6691] hover:shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#4D7EAF]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0 relative">

          {/* --- 1. SEARCH BAR & DROPDOWN --- */}
          <div className="hidden sm:flex items-center relative" ref={searchRef}>
              <Search className="absolute left-3 text-gray-400 w-4 h-4 z-10" />
              <input
                  type="text"
                  placeholder="Search clients..."
                  className={`pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] w-48 transition-all duration-300 focus:w-64 ${isSearchOpen ? 'ring-2 ring-[#5AB3E6]' : ''}`}
                  value={searchQuery}
                  onFocus={handleSearchFocus}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {/* Added Clear Button */}
              {searchQuery && (
                <button 
                  onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 z-10"
                >
                  <X size={14} />
                </button>
              )}

              {/* --- RESTORED: Search Dropdown Results --- */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  <div className="p-3 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {filteredClients.length > 0 ? "Clients Found" : "No results"}
                    </span>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <div 
                          key={client.id}
                          className="flex items-center justify-between p-3 hover:bg-blue-50 cursor-pointer transition-colors group border-b last:border-0 border-gray-50"
                        >
                          <div>
                            <p className="font-semibold text-sm text-gray-800 group-hover:text-[#4D7EAF]">{client.name}</p>
                            <p className="text-[10px] text-gray-400">{client.location}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-300 group-hover:text-[#5AB3E6]" />
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-xs">
                        No clients matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>

          {/* Mail Button */}
          <button
            onClick={() => navigate('/worker/chat')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md"
          >
            <Mail className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
          </button>

          {/* --- 2. NOTIFICATION BUTTON & DROPDOWN --- */}
          <div className="relative" ref={notificationsRef}>
             <button
                  onClick={handleNotificationClick}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md"
              >
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
                  {MOCK_NOTIFICATIONS.length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                  )}
              </button>

             {/* --- RESTORED: Notification Dropdown --- */}
             {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <span className="text-xs text-[#4D7EAF] cursor-pointer hover:underline">Mark all as read</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                    {MOCK_NOTIFICATIONS.length > 0 ? (
                      MOCK_NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3">
                           <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'job_request' ? 'bg-[#5AB3E6]' : 'bg-gray-300'}`}></div>
                           <div>
                              <p className="text-sm text-gray-700 leading-snug">{notif.message}</p>
                              <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                <Clock size={10} /> {notif.time}
                              </span>
                           </div>
                        </div>
                      ))
                    ) : (
                       <div className="p-6 text-center text-gray-400 text-sm">No new notifications</div>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-xs font-semibold text-gray-600 hover:text-[#4D7EAF]">View all notifications</button>
                  </div>
                </div>
             )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
              <button
                  onClick={handleUserMenuToggle}
                  className="user-menu-button flex items-center gap-2 bg-white rounded-full p-1 pr-3 shadow-sm select-none transition-shadow hover:shadow-md"
              >
                  <img src="https://picsum.photos/id/64/100/100" alt="Profile" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block whitespace-nowrap">{userName}</span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''} shrink-0`} />
              </button>

              {isUserMenuOpen && (
                  <div className="user-menu-dropdown absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 origin-top-right animate-[fadeIn_0.2s_ease-out]">
                      <button
                          onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate('/worker/profile');
                          }}
                          className="w-full group relative flex items-center px-4 py-3 text-sm text-gray-600 rounded-xl overflow-hidden hover:bg-[#4D7EAF] hover:text-white transition-all"
                      >
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <User size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                              <span className="font-medium">Profile</span>
                          </div>
                      </button>

                      <div className="h-px bg-gray-100 my-1 mx-2"></div>

                      <button
                          onClick={() => {
                              setIsUserMenuOpen(false);
                              navigate('/'); 
                          }}
                          className="w-full group relative flex items-center px-4 py-3 text-sm text-red-500 rounded-xl overflow-hidden hover:bg-red-500 hover:text-white transition-all"
                      >
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <LogOut size={18} className="text-red-400 group-hover:text-white transition-colors" />
                              <span className="font-medium">Logout</span>
                          </div>
                      </button>
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

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="w-full md:hidden bg-white border-t border-gray-100 shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item, index) => {
               const active = isActiveLink(item.href);
               return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                      active
                        ? "bg-[#4D7EAF] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#4D7EAF]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                    {!active && <ChevronRight size={16} className="text-gray-300" />}
                  </Link>
               );
            })}
          </nav>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WorkerHeader;