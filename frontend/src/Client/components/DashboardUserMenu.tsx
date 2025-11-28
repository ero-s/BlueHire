import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuUser, LuLogOut, LuChevronDown } from "react-icons/lu";

interface UserMenuProps {
  profileImg: string;
  className?: string;
}

const DashboardUserMenu: React.FC<UserMenuProps> = ({ profileImg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleActionClick = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white pl-1 pr-3 py-1 rounded-full shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-blue-400 focus:ring-blue-400 focus:outline-none transition-all duration-300"
      >
        <img
          src={profileImg}
          alt="User"
          className="w-8 h-8 rounded-full border-2 border-blue-500"
        />
        <span className="text-sm font-medium text-gray-700 hidden lg:block">
          John D.
        </span>
        <LuChevronDown
          className={`hidden lg:block text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={16}
        />
      </button>

      {/* Dropdown Menu with transition */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 origin-top-right transition-all duration-200 ease-out
                   ${isOpen ? "transform opacity-100 scale-100" : "transform opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="py-2">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500 truncate">
              john.doe@example.com
            </p>
          </div>
          <div className="mt-1">
            <a
              href="#"
              onClick={handleActionClick("/profile")}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors rounded-md mx-1"
            >
              <LuUser size={16} />
              <span>Profile</span>
            </a>
          </div>
          <div className="mt-1 pt-1 border-t border-gray-100">
            <a
              href="#"
              onClick={handleActionClick("/landing")}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-md mx-1"
            >
              <LuLogOut size={16} />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserMenu;
