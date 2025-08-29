import { CheckCircle, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext";

const RecentActivity = ({ recentSessions, isUsingTab = true }) => {
  const { setActiveTab } = useContext(DashboardContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isUsingTab) {
      setActiveTab("history");
    } else {
      navigate("/dashboard");
      setActiveTab("history");
    }
  };
  return (
    <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between !mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
        <button
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer"
          onClick={() => handleClick()}
        >
          View All
        </button>
      </div>
      <div className="!space-y-4">
        {recentSessions.slice(0, 3).map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between !p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center !space-x-2 !mb-1">
                <h4 className="font-medium text-gray-900">{session.company}</h4>
                <span className="text-xs bg-indigo-100 text-indigo-800 !px-2 !py-1 rounded-full">
                  {session.role}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {session.duration} • Score: {session.score}/10
              </p>
            </div>
            <div className="flex items-center !space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
