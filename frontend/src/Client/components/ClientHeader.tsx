import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Bell, Mail, Search, Menu, ChevronDown, User, LogOut, X, ChevronRight } from "lucide-react";
import Logo from "../../MainComponents/LandingComponents/Logo/Logo";

interface HeaderProps {
  logo?: string;
  userName: string;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/clientDashboard" },
  { label: "Workers", href: "/findWorkers" },
  { label: "Bookings", href: "/bookings" },
  { label: "Transactions", href: "/transactions" },
];

const MOCK_WORKERS = [
  { id: 1, name: "Jose P. Rizal", role: "Plumber", location: "Cebu City" },
  { id: 2, name: "Maria Clara", role: "House Cleaning", location: "Mandaue City" },
  { id: 3, name: "Juan Luna", role: "Electrician", location: "Lapu-Lapu City" },
  { id: 4, name: "Gabriela Silang", role: "Nanny", location: "Talisay" },
  { id: 5, name: "Andres Bonifacio", role: "Carpenter", location: "Liloan" },
];

// 🟢 CORRECTED: Notifications relevant to a hiring client
const MOCK_NOTIFICATIONS = [
    { id: 1, message: "Mark Anthony Reyes accepted your job request for carpentry.", time: "5 min ago", type: "accepted" },
    { id: 2, message: "Your payment of ₱800.00 to Rolando Uy is complete.", time: "1 hour ago", type: "payment" },
    { id: 3, message: "Jessa Mae Abella sent a question about the House Cleaning job.", time: "3 hours ago", type: "message" },
    { id: 4, message: "Review pending for past job: Plumber. Please rate Jonathan dela Peña.", time: "1 day ago", type: "review" },
];


const ClientHeader: React.FC<HeaderProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(window.location.pathname || "/");

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // --- Search Logic ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);


  // Unified click-outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close Search if click is outside search container
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }

      // Close Notifications/User Menu if click is outside their containers
      const targetNode = event.target as Node;

      // Check notification popup
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(targetNode)
      ) {
        setIsNotificationsOpen(false);
      }

      // Close user menu
      if (isUserMenuOpen && !targetNode.closest('.user-menu-button') && !targetNode.closest('.user-menu-dropdown')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);


  // Helper to check active link
  const isActiveLink = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const filteredWorkers = MOCK_WORKERS.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Helper function to handle notification button click
  const handleNotificationClick = () => {
      setIsNotificationsOpen(prev => !prev);
      // Ensure other popups are closed when opening notifications
      setIsSearchOpen(false);
      setIsUserMenuOpen(false);
  };

  // Helper function to handle search button click
  const handleSearchFocus = () => {
      setIsSearchOpen(true);
      // Ensure other popups are closed when opening search
      setIsNotificationsOpen(false);
      setIsUserMenuOpen(false);
  };

  // Helper function to handle user menu button click
  const handleUserMenuToggle = () => {
      setIsUserMenuOpen(prev => !prev);
      // Ensure other popups are closed when opening user menu
      setIsSearchOpen(false);
      setIsNotificationsOpen(false);
  };


  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 pt-4 pb-0 flex flex-col items-center justify-between gap-4 bg-[#F6F6F6] z-50">
      <div className="w-full px-4 md:px-12 pt-2 pb-2 flex items-center justify-between gap-4 bg-transparent">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <Logo />
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
          {/* --- Search Bar --- */}
          <div className="hidden sm:flex items-center relative" ref={searchRef}>
            <Search className="absolute left-3 text-gray-400 w-4 h-4 z-10" />
            <input
              type="text"
              placeholder="Search workers..."
              className={`pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5AB3E6] w-48 transition-all duration-300 focus:w-64 ${isSearchOpen ? "ring-2 ring-[#5AB3E6]" : ""}`}
              value={searchQuery}
              onFocus={handleSearchFocus} // Use custom handler
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="absolute right-3 text-gray-400 hover:text-gray-600 z-10"
              >
                <X size={14} />
              </button>
            )}

            {/* Search Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                <div className="p-3 bg-gray-50 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {filteredWorkers.length > 0
                      ? "Workers Found"
                      : "No results"}
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
                          <p className="font-semibold text-sm text-gray-800 group-hover:text-[#4D7EAF]">
                            {worker.name}
                          </p>
                          <p className="text-[10px] text-gray-400">
                            {worker.role} • {worker.location}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          className="text-gray-300 group-hover:text-[#5AB3E6]"
                        />
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

          {/* Mail Button */}
          <button
            onClick={() => navigate('/clientChat')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md"
          >
            <Mail className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
          </button>

          {/* Notification Button and Popup */}
          <div className="relative" ref={notificationsRef}>
              <button
                  onClick={handleNotificationClick} // Use custom handler
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group hover:shadow-md"
              >
                  <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#4D7EAF] transition-colors duration-300" />
                  {MOCK_NOTIFICATIONS.length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                  )}
              </button>

              {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                      <div className="p-3 bg-gray-50 border-b border-gray-100">
                          <span className="text-sm font-bold text-gray-800">
                              Notifications ({MOCK_NOTIFICATIONS.length})
                          </span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                          {MOCK_NOTIFICATIONS.map((notif) => (
                              <div
                                  key={notif.id}
                                  className="flex flex-col p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-0 border-gray-50"
                                  onClick={() => {
                                      setIsNotificationsOpen(false);
                                      // Logic for navigation based on notification type
                                  }}
                              >
                                  <p className="font-medium text-sm text-gray-800">
                                      {notif.message}
                                  </p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                      {notif.time}
                                  </p>
                              </div>
                          ))}
                      </div>
                      <div className="p-3 border-t border-gray-100 text-center">
                          <Link
                              to="/notifications"
                              className="text-sm font-medium text-[#5AB3E6] hover:text-[#4D7EAF]"
                              onClick={() => setIsNotificationsOpen(false)}
                          >
                              See all notifications
                          </Link>
                      </div>
                  </div>
              )}
          </div>

          {/* User Menu Dropdown */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle} // Use custom handler
              className="user-menu-button flex items-center gap-2 bg-white rounded-full p-1 pr-3 shadow-sm select-none transition-shadow hover:shadow-md"
            >
              <img
                src="https://picsum.photos/id/64/100/100"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block whitespace-nowrap">
                {userName}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""} shrink-0`}
              />
            </button>

              {isUserMenuOpen && (
                  <div className="user-menu-dropdown absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out]">

                      {/* Profile Button */}
                      <button
                        onClick={() => { setIsUserMenuOpen(false); navigate('/clientProfile'); }}
                        className="w-full group relative flex items-center px-4 py-3 text-sm text-gray-600 rounded-xl overflow-hidden hover:bg-[#4D7EAF] hover:text-white transition-all"
                      >
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <User size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                              <span className="font-medium">Profile</span>
                          </div>
                      </button>

                      <div className="h-px bg-gray-100 my-1 mx-2"></div>

                      {/* Logout Button */}
                      <button
                        onClick={() => { setIsUserMenuOpen(false); navigate('/landing'); }}
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-[#4D7EAF] hover:bg-blue-50 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
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

export default ClientHeader;