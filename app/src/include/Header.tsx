import { useState } from "react";
import { NavLink } from "react-router";
import AuthModal from "../components/auth_modal/AuthModal";

const Header = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  return (
    <header className="bg-white shadow-md">
      {/* Top bar with login/signup */}
      <div className="flex justify-end items-center bg-gray-100 px-4 py-2 space-x-4">
        <button 
          className="text-sm text-gray-600 hover:text-blue-600 font-medium cursor-pointer"
          onClick={() => setIsAuthModalOpen(true)}  >
          Login
        </button>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="text-sm bg-blue-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-700 font-medium">
          Sign Up
        </button>
      </div>
      
      {/* Main header content */}
      <div className="p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700">
          <NavLink to="/">SearchtoFIND</NavLink>
        </div>
        
        <nav className="space-x-6">
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
        onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;