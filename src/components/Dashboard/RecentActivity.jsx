import { CheckCircle, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../../context/DashboardContext";
import { getRecentSessions } from "../../services/apis/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../Spinner/Spinner";
import { toast } from "react-toastify";

const RecentActivity = ({ isUsingTab = true }) => {
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

  const {
    data: recentSessions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-recent-sessions"],
    queryFn: getRecentSessions,
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    toast.error(error.message);
  }
  return (
    <div className="bg-white !p-4 md:!p-6 rounded-xl shadow-sm border border-gray-200">
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
        {recentSessions.length <= 0 ? (
          <div className="text-center text-gray-500 !py-10">
            No sessions found.
          </div>
        ) : (
          recentSessions?.slice(0, 3)?.map((session) => {
            console.log(session?.type);
            return (
              <div
                key={session._id}
                className="flex items-center justify-between !p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={async () => {
                  const url = `/dashboard/${session?.type}/feedback/${session?._id}`;
                  navigate(url);
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center !space-x-2 !mb-2.5">
                    <h4 className=" text-gray-900 font-medium  capitalize">
                      •{session?.companyName || "Practice"}
                    </h4>
                    <span className="text-xs text-shadow-slate-200 bg-indigo-100 text-indigo-800 !px-2 !py-1 rounded-full capitalize">
                       {session?.role?.split('_')?.join(" ") || session?.difficulty || session?.difficultyLevel || 'Easy'}
                    </span>
                  </div>
                  <div className="!mt-5 text-sm text-gray-600 flex flex-col gap-4 md:flex-row gap-x-5">
                    <p className="">
                      Score:{" "}
                      <span
                        className={`text-xs !px-2 !py-0.5 rounded-full ${
                          session.score >= 8
                            ? "bg-green-100 text-green-800"
                            : session.score >= 6
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {Number(session?.score).toPrecision(2)} / 10
                      </span>
                    </p>
                    <p className="">
                      Duration:{" "}
                      <span className="bg-red-400 text-center text-xs !px-2 !py-0.5 rounded-2xl text-white">
                        {session?.duration ? `${session?.duration} `: "120 "}mins
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center !space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
