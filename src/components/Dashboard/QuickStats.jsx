import { Star, Target } from "lucide-react";
import { getUserStats } from "../../services/apis/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../Spinner/Spinner";
import ErrorPage from "../../pages/ErrorPage";

const QuickStats = () => {
  const {
    data: userStats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6">
      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Total Mock Sessions
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {userStats ? userStats?.totalMockInterviews : "--"}
            </p>
          </div>
          <div className="bg-indigo-100 !p-3 rounded-lg">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
        </div>
        <p className="text-xs text-green-600 !mt-2">+12% from last month</p>
      </div>

      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Average Mock Score
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {userStats ? Number(userStats?.averageMockScore).toPrecision(3) : "--"}/10
            </p>
          </div>
          <div className="bg-purple-100 !p-3 rounded-lg">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <p className="text-xs text-green-600 !mt-2">+0.3 from last week</p>
      </div>

      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {/* Improved Areas */}
              Total OA Sessions
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {/* {userStats.improvedAreas} */}
              {userStats ? userStats?.totalOaTests : "--"}
            </p>
          </div>
          <div className="bg-green-100 !p-3 rounded-lg">
            <Target className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-xs text-green-600 !mt-2">
          Communication, Leadership, Technical
        </p>
      </div>

      <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              {/* Current Streak */}
              Average OA Score
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {/* {userStats.streak} days */}
              {userStats ? Number(userStats?.averageOaScore).toPrecision(3) : "--"}/10
            </p>
          </div>
          <div className="bg-orange-100 !p-3 rounded-lg">
            <Star className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <p className="text-xs text-orange-600 !mt-2">Keep it up! 🔥</p>
      </div>
    </div>
  );
};

export default QuickStats;
