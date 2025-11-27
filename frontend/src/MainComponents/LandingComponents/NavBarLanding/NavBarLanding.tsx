import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Handles smooth scroll to sections
  const handleScroll = (id: string) => {
    // If not on the landing page, navigate to it first
    if (location.pathname !== '/landing') {
      navigate('/landing');
      // Wait a bit for the page to load, then scroll
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }, 300);
    } else {
      // Already on the landing page, scroll immediately
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const navLinks = [
    { type: 'anchor', id: 'home', text: 'Home' },
    { type: 'anchor', id: 'about', text: 'About' },
    { type: 'anchor', id: 'contact', text: 'Contact' },
    { type: 'router', to: '/signIn', text: 'Sign In' },
  ];

  const linkClass =
    'text-bluehire-dark font-medium hover:text-bluehire-blue transition-colors duration-300 py-2 border-b-2';
  const activeLinkClass = 'text-bluehire-blue border-bluehire-blue';
  const inactiveLinkClass = 'border-transparent';

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleScroll('home')}
          >
            <Logo variant="md" />
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <li key={link.text}>
                  {link.type === 'router' ? (
                    <NavLink
                      to={link.to!}
                      end
                      className={({ isActive }) =>
                        `${linkClass} ${
                          isActive ? activeLinkClass : inactiveLinkClass
                        }`
                      }
                    >
                      {link.text}
                    </NavLink>
                  ) : (
                    <button
                      onClick={() => handleScroll(link.id!)}
                      className={`${linkClass} ${
                        activeSection === link.id
                          ? activeLinkClass
                          : inactiveLinkClass
                      }`}
                    >
                      {link.text}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <Link
              to="/signUp"
              className="bg-bluehire-blue text-white px-6 py-2.5 rounded-lg hover:bg-opacity-90 transition-colors duration-300 text-sm font-semibold shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Open main menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) =>
              link.type === 'router' ? (
                <NavLink
                  key={link.text}
                  to={link.to!}
                  end
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-blue-100 text-bluehire-blue'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {link.text}
                </NavLink>
              ) : (
                <button
                  key={link.text}
                  onClick={() => {
                    handleScroll(link.id!);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === link.id
                      ? 'text-bluehire-blue bg-blue-100'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.text}
                </button>
              )
            )}
            <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col items-start gap-4 px-3">
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center bg-bluehire-blue text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-300 font-semibold shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
