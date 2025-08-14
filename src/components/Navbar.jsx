import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { token } = useContext(AuthContext);

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <nav className="nav">
        <div className="nav-brand">
          <Link to={"/"}>
            <h2 className="text-blue-900">
              Sim<span className="text-black">job</span>
            </h2>
          </Link>
        </div>
        <div className="nav-links">
          <Link to={token ? "/dashboard" : "/pricing"}>
            {token ? "Dashboard" : "Pricing"}
          </Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contactus"}>Contact Us</Link>
          {!token ? (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          ) : (
            // <button className="rounded-full text-gray-700 border border-gray-600 !p-1 cursor-pointer" onClick={()=>navigate('/profile')}>
            //   <HiMiniIdentification className="w-8 h-8" />
            // </button>
            <div className="flex items-center !space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ">
                  <button className="cursor-pointer" onClick={(e)=>navigate('/profile')}>
                    <User className="w-4 h-4 text-white cursor-pointer" />
                  </button>
                </div>
                <span className="text-sm font-medium text-gray-700">UserName</span>
                <button className="!p-1 text-gray-500 hover:text-gray-700 cursor-pointer transition-all duration-200" title="LogOut">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
          )}
        </div>
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`flex flex-col !space-y-4 !p-4 bg-white shadow-md lg:hidden text-gray-900
    transition-all duration-500 ease-out transform
    ${
      isOpen
        ? "opacity-100 translate-y-0 max-h-96"
        : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
    }`}
      >
        <Link to={token ? "/dashboard" : "/pricing"} onClick={() => setIsOpen(false)}>
         {token ? "Dashboard" : "Pricing"}
        </Link>
        {!token ? <button
          className="btn btn-primary !mt-2"
          onClick={() => {
            setIsOpen(false);
            navigate("/signup");
          }}
        >
          Get Started
        </button> : <Link to={'/profile'}>Profile</Link>}
        <Link to="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <Link to="/contactus" onClick={() => setIsOpen(false)}>
          Contact Us
        </Link>
        {token && <button
          className="btn btn-primary !mt-2"
          onClick={() => {
            setIsOpen(false);
            navigate("/signup");
          }}
        >
          Log Out
        </button>}
        
      </div>
    </header>
  );
};

export default Navbar;
