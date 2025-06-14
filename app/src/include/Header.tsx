import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import AuthModal from "../components/auth_modal/AuthModal";
import { getRequestToken } from "../lib/tmdb";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("tmdb_user");
    return stored ? JSON.parse(stored) : null;
  });
  const sessionId = localStorage.getItem("tmdb_session");

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem("user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tmdb_session");
    localStorage.removeItem("tmdb_user");
    window.location.href = "/";
  };
  const redirectUrl =
    import.meta.env.REACT_APP_TMDB_REDIRECT_URL || `${window.location.origin}/auth/callback`;
  const redirectToTMDBLogin = async () => {
    const token = await getRequestToken();
     const requestToken = token.request_token;
    window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
      redirectUrl
    )}`;
  };


  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-end items-center bg-gray-100 px-4 py-2 space-x-4 text-sm">
        {sessionId ? (
          <div className="text-gray-600 flex items-center space-x-4">
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout} className="text-red-500 hover:underline cursor-pointer transition duration-200">
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={redirectToTMDBLogin}
              className="text-gray-600 hover:text-blue-600 font-medium  cursor-pointer transition duration-200"
            >
              Login with TMDB
            </button>
            <button
              className="text-gray-600 hover:text-white font-medium transition duration-200  px-3 py-1 rounded  cursor-not-allowed hover:bg-gray-300"
              onClick={() => {
                setIsLoginMode(true);
                setIsAuthModalOpen(true);
              }} disabled
              title="Login is currently disabled"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLoginMode(false);
                setIsAuthModalOpen(true);
              }}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium transition duration-200 bg-gray-200 px-3 py-1 rounded cursor-not-allowed hover:bg-gray-300"
              disabled
              title="Sign Up is currently disabled"
            >
              Sign Up
            </button>
          </>
        )
        }
      </div >

      {/* Main header content */}
      < div className="p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" >
        <div className="text-2xl font-bold text-blue-700">
          <NavLink to="/">SearchtoFIND</NavLink>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mycrud"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Thoughts
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 ${isActive ? "text-blue-600 font-medium" : ""
              }`
            }
          >
            About
          </NavLink>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            Contact
          </a>
        </nav>
      </div >

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialLoginMode={isLoginMode}
      />
    </header >
  );
};

export default Header;
