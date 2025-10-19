import React, { useState, useEffect } from "react";
import {
  Home,
  RefreshCw,
  Search,
  MessageCircle,
  AlertTriangle,
  FileQuestion,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const naviagte=useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center !p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* 404 Animation */}
        <div className="!mb-8 relative">
          <div
            className={`text-[180px] md:text-[220px] font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-none transition-all duration-200 ${
              glitchActive ? "blur-sm scale-105" : ""
            }`}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-24 h-24 text-purple-400/20 animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="!mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white !mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-300 !mb-2">
            Looks like this page took a different career path.
          </p>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Suggestions */}
        <div className="w-[80%] !mx-auto grid md:grid-cols-2 !gap-4 !mb-12">
          {[
            {
              icon: Home,
              text: "Return to homepage",
              color: "from-purple-500 to-pink-500",
              link: '/'
            },
            {
              icon: MessageCircle,
              text: "Contact support",
              color: "from-orange-500 to-red-500",
              link:'/contactus'
            },
          ].map((item, idx) => (
            <button
              key={idx}
              className="!p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={()=>{naviagte(item.link)}}
            >
              <div
                className={`inline-flex !p-3 rounded-lg bg-gradient-to-br ${item.color} !mb-3 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-300 text-sm font-medium">{item.text}</p>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row !gap-4 justify-center">
          <button className="cursor-pointer !px-8 !py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center !gap-2" onClick={()=>naviagte('/')}>
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          <button className="cursor-pointer !px-8 !py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center !gap-2" onClick={()=>{naviagte(-1)}}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Popular Links */}
        <div className="!mt-16 !pt-8 border-t border-white/10">
          <p className="text-gray-400 !mb-4 text-sm">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center !gap-3">
            {["Dashboard", "Profile", "Pricing", "About", "ContactUS"].map(
              (link, idx) => (
                <Link
                  key={idx}
                  to={`/${link.toLowerCase()}`}
                  className="!px-4 !py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors text-sm border border-white/10"
                >
                  {link}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;