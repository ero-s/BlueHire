import React, { useState } from "react";
import { Bell, Mail, Search, Menu, ChevronDown, User, LogOut } from "lucide-react";
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
  { label: "Dashboard", href: "/" },
  { label: "Job Feeds", href: "/jobposts" },
  { label: "Bookings", href: "/bookings" },
  { label: "Transactions", href: "/transactions" },
];

const WorkerHeader: React.FC<HeaderProps> = ({ userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 w-full px-4 md:px-12 pt-4 pb-0 flex flex-wrap items-center justify-between gap-4 md:gap-8 bg-gray-100 z-50 pb-2">
      <div className="w-full px-4 md:px-12 pt-4 pb-0 flex flex-wrap items-center justify-between gap-4 md:gap-8 bg-transparent">
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <Logo/>
        </div>

        {/* Navigation (Simplified Pill Nav) */}
        <nav className="hidden md:flex gap-2 items-center bg-white rounded-full px-2 py-2 shadow-sm border border-gray-100">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? "bg-blue-500 text-white shadow-md hover:shadow-lg hover:scale-105"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0 z-50">
          <div className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 text-gray-400 w-4 h-4" />
              <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-48 transition-all focus:w-56"
              />
          </div>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group">
            <Mail className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
          </button>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors duration-300 group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
          </button>

          {/* User Menu Dropdown */}
          <div className="relative">
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                  <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''} shrink-0`} />
              </button>

              {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 origin-top-right animate-[fadeIn_0.2s_ease-out]">
                      
                      {/* Profile Link */}
                      <a href="#" className="group relative flex items-center px-4 py-3 text-sm text-gray-600 rounded-xl overflow-hidden">
                          {/* Background Sweep Animation (1s duration, top to bottom) */}
                          <div className="absolute top-0 left-0 w-full h-0 bg-blue-500 transition-[height] duration-1000 ease-in-out group-hover:h-full" />
                          
                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <User size={18} className="text-gray-400 group-hover:text-white transition-colors duration-1000" />
                              <span className="font-medium group-hover:text-white transition-colors duration-1000">Profile</span>
                          </div>
                      </a>

                      <div className="h-px bg-gray-100 my-1 mx-2"></div>

                      {/* Logout Link */}
                      <a href="#" className="group relative flex items-center px-4 py-3 text-sm text-red-500 rounded-xl overflow-hidden">
                          {/* Background Sweep Animation (1s duration, top to bottom) */}
                          <div className="absolute top-0 left-0 w-full h-0 bg-blue-500 transition-[height] duration-1000 ease-in-out group-hover:h-full" />
                          
                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-3 w-full">
                              <LogOut size={18} className="text-red-400 group-hover:text-white transition-colors duration-1000" />
                              <span className="font-medium group-hover:text-white transition-colors duration-1000">Logout</span>
                          </div>
                      </a>
                  </div>
              )}
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              <Menu className="w-5 h-5" />
          </button>
        </div>
        
        {/* Simple Keyframe for FadeIn if tailwind plugin not present */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default WorkerHeader;