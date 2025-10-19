import {
  Home,
  RefreshCw,
  MessageCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const naviagte = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center !p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Error Icon */}
        <div className="!mb-8 relative inline-block">
          <div className="relative">
            <div className="w-32 h-32 !mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-16 h-16 text-white" />
            </div>
            <div className="absolute inset-0 w-32 h-32 !mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-xl opacity-50 animate-ping"></div>
          </div>
        </div>

        {/* Content */}
        <div className="!mb-8">
          <div className="inline-flex items-center !gap-2 !px-4 !py-2 bg-red-500/20 rounded-full !mb-6 backdrop-blur-sm border border-red-500/30">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">Error 500</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white !mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-gray-300 !mb-2">
            The simulation encountered an unexpected error.
          </p>
          <p className="text-gray-400">
            Don't worry, our team has been notified and is working on a fix.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="!mb-12 !p-6 bg-white/5 border border-red-500/20 rounded-xl backdrop-blur-sm text-left max-w-2xl !mx-auto">
          <div className="flex items-start !gap-4">
            <div className="!p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold !mb-2">What happened?</h3>
              <p className="text-gray-400 text-sm !mb-4">
                {/* Our servers encountered an unexpected condition that prevented
                it from fulfilling your request. This could be due to temporary
                server issues or maintenance. */}
                {error}
              </p>
              <div className="!p-3 bg-black/30 rounded-lg border border-white/10">
                <p className="text-gray-500 text-xs font-mono">
                  Error ID: ERR-
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="text-gray-500 text-xs font-mono">
                  Timestamp: {new Date().toISOString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What to do */}
        <div className="grid md:grid-cols-3 !gap-4 !mb-12">
          {[
            {
              icon: RefreshCw,
              text: "Refresh the page",
              desc: "Try reloading",
            },
            { icon: Home, text: "Go to homepage", desc: "Start fresh" },
            {
              icon: MessageCircle,
              text: "Contact support",
              desc: "Get help now",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="!p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="inline-flex !p-3 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 !mb-3 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white text-sm font-semibold !mb-1">
                {item.text}
              </p>
              <p className="text-gray-400 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row !gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="!px-8 !py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center !gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            className="cursor-pointer !px-8 !py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center !gap-2"
            onClick={() => naviagte("/")}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Status Link */}
        <div className="!mt-12 !pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm">
            Check our{" "}
            <Link
              to={"/"}
              className="text-red-400 hover:text-red-300 underline"
            >
              system status page
            </Link>{" "}
            for real-time updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
