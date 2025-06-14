import { useState } from "react";
import { NavLink } from "react-router";
import AuthModal from "../components/auth_modal/AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      {/* Top bar */}
      <div className="flex justify-end items-center bg-gray-100 px-4 py-2 space-x-4 text-sm">
        <button
          className="text-gray-600 hover:text-blue-600 font-medium"
          onClick={() => setIsAuthModalOpen(true)}
        >
          Login
        </button>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium"
        >
          Sign Up
        </button>
      </div>

      {/* Main header content */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-2xl font-bold text-blue-700">
          <NavLink to="/">SearchtoFIND</NavLink>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mycrud"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Thoughts
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${
                isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            About
          </NavLink>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
