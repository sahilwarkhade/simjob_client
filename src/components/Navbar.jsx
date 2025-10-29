import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";
import { logout } from "../services/apis/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;
      setIsScrolled(scrollPercentage > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsLoggedIn(false);
      navigate("/");
      queryClient.clear();
      toast.success("Successfully Logged Out");
    },
    onError: () => {
      toast.error("Sorry, unable to log out");
    },
  });

  const handleLogout = () => mutate();

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent backdrop-blur-md"
      }`}
    >
      <nav className="flex items-center justify-between max-w-7xl !mx-auto !px-6 !py-4">
        {/* Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold tracking-wider">
            <h2 className="text-blue-900">
              Sim<span className="text-black">job</span>
            </h2>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center !space-x-8 text-gray-800 font-medium">
          <Link
            className="hover:scale-95 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
            to={isLoggedIn ? "/dashboard" : "/pricing"}
          >
            {isLoggedIn ? "Dashboard" : "Pricing"}
          </Link>
          <Link
            className="hover:scale-95 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
            to="/about"
          >
            About
          </Link>
          <Link
            className="hover:scale-95 hover:text-gray-500 transition duration-300"
            onClick={() => setIsOpen(false)}
            to="/contactus"
          >
            Contact Us
          </Link>

          {!isLoggedIn ? (
            <button
              className="btn btn-primary !px-5 !py-2 !ml-2"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          ) : (
            <div className="flex items-center !space-x-3">
              <button
                className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <User className="w-4 h-4 text-white" />
              </button>

              <button
                className="!p-1 text-gray-500 hover:text-gray-700 transition-all duration-200"
                title="Log Out"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="flex flex-col justify-center items-center lg:hidden !space-y-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden flex flex-col items-start bg-white shadow-md text-gray-900 font-medium transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? "opacity-100 translate-y-0 max-h-96"
            : "opacity-0 -translate-y-2 max-h-0"
        }`}
      >
        <div className="w-full !p-5 flex flex-col !space-y-4">
          <Link
            to={isLoggedIn ? "/dashboard" : "/pricing"}
            onClick={() => setIsOpen(false)}
          >
            {isLoggedIn ? "Dashboard" : "Pricing"}
          </Link>

          {isLoggedIn && (
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          )}

          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>

          <Link to="/contactus" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>

          {isLoggedIn ? (
            <button
              className="btn btn-primary !mt-3 !px-5 !py-2 w-full"
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            >
              Log Out
            </button>
          ) : (
            <button
              className="btn btn-primary !mt-3 !px-5 !py-2 w-full"
              onClick={() => {
                setIsOpen(false);
                navigate("/login");
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
