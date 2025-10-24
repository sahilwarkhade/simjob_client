import { ChevronRight, Eye, Filter } from "lucide-react";
import { Dropdown } from "../General/Dropdown";
import { historyOptions } from "../../constants";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHistory } from "../../services/apis/dashboardApi";
import { Spinner } from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 4;
const History = () => {
  const [selectedHistoryType, setSelectedHistoryType] = useState(
    historyOptions[0]
  );

  const [renderSessions, setRenderSessions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const navigate = useNavigate();

  const {
    data: history,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-history"],
    queryFn: getHistory,
  });

  useEffect(() => {
    if (!history) return;

    let filteredHistory = history;

    if (selectedHistoryType?.value !== "all_sessions") {
      filteredHistory = history?.filter((item) =>
        selectedHistoryType?.value === "interview_sessions"
          ? item?.type === "interview"
          : selectedHistoryType?.value === "oatest_sessions"
          ? item?.type === "test"
          : item?.status === "pending"
      );
    }

    // filteredHistory.sort(
    //   (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    // );

    setRenderSessions(filteredHistory);
    setPageNumber(0)
  }, [selectedHistoryType, history]);

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

  const totalPages = Math.ceil(renderSessions.length / PAGE_SIZE);
  const start = pageNumber * PAGE_SIZE;
  const end = pageNumber * PAGE_SIZE + PAGE_SIZE;

  return (
    <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 text-gray-700 select-none">
      {/* Header */}
      <div className="flex items-center justify-between !mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Practice History
        </h3>

        <div className="flex items-center !space-x-2 w-36 text-sm">
          <Filter className="w-5 h-5 text-gray-500" />
          <Dropdown
            options={historyOptions}
            value={selectedHistoryType}
            onChange={setSelectedHistoryType}
            variant="outline"
            size="sm"
            placeholder="Select Type"
          />
        </div>
      </div>

      {/* History List */}
      <div className="!space-y-3">
        {renderSessions?.length === 0 ? (
          <div className="text-center text-gray-500 !py-10">
            No sessions found.
          </div>
        ) : (
          <>
            {renderSessions.slice(start, end).map((session) => (
              <div
                key={session._id || session.id}
                className={`flex items-center justify-between !p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                  session?.status === "pending"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={async () => {
                  if (session?.status !== "pending") {
                    const url = `/dashboard/${session?.type}/feedback/${session?._id}`;
                    navigate(url);
                  }
                  return;
                }}
              >
                <div className="flex-1">
                  {/* Title Row */}
                  <div className="flex items-center !space-x-3 !mb-2">
                    <h4 className="font-medium text-gray-900 capitalize">
                      • {session?.companyName || "Practice"}
                    </h4>

                    <span className="text-xs bg-indigo-100 text-indigo-800 !px-2 !py-1 rounded-full capitalize">
                      {session?.role?.split("_")?.join(" ") ||
                        session?.difficulty ||
                        session?.difficultyLevel ||
                        "Easy"}
                    </span>
                    {session?.status === "pending" ? (
                      <span className="text-xs !px-2 !py-1 rounded-full bg-red-100 text-red-800">
                        Pending...
                      </span>
                    ) : (
                      <span
                        className={`text-xs !px-2 !py-1 rounded-full ${
                          session?.score >= 8
                            ? "bg-green-100 text-green-800"
                            : session?.score >= 6
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        Score: {session?.score ?? 0}/10
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  {session?.feedback?.overallSummary ? (
                    <p className="text-sm text-gray-600/60 !mb-2.5">
                      {session?.feedback?.overallSummary.slice(0, 90)}...
                    </p>
                  ) : session?.status === "pending" ? (
                    <p className="text-sm text-gray-400 italic !mb-1">
                      First complete the test...
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 italic !mb-1">
                      No feedback available...
                    </p>
                  )}

                  {/* Meta Info */}

                  {session?.status === "pending" ? (
                    <button
                      className="!mt-1.5 text-xs font-semibold rounded-full bg-black !px-2.5 !py-1 text-white cursor-pointer hover:bg-gray-300/50 hover:text-gray-700 transition duration-500"
                      onClick={async () => {
                        const url = `/test?testid=${session?._id}`;
                        navigate(url);
                      }}
                    >
                      Complete Now
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-x-3 text-xs text-gray-700">
                      <p>
                        Duration:{" "}
                        <span className="bg-gray-100 text-gray-800 !px-2 !py-0.5 rounded-2xl">
                          {session?.duration || "120"}{" mins"}
                        </span>
                      </p>
                      <p>
                        <span className="bg-gray-100 text-gray-800 !px-2 !py-0.5 rounded-2xl">
                          {new Date(session?.updatedAt).toDateString()}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {session?.status !== 'pending' && <div className="flex items-center !space-x-2 !ml-2">
                  <button className="!p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>}
              </div>
            ))}
            <div className="flex justify-between">
              <button
                className={`border !px-2.5 !py-1 rounded-lg text-sm font-semibold tracking-wider ${
                  pageNumber === 0
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:shadow-2xl hover:scale-102 transition duration-500 hover:bg-gray-400/50"
                }`}
                disabled={pageNumber == 0}
                onClick={() => setPageNumber((prev) => prev - 1)}
              >
                Previous
              </button>
              <button
                className={`border !px-2.5 !py-1 rounded-lg text-sm font-semibold tracking-wider ${
                  pageNumber === totalPages - 1
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:shadow-2xl hover:scale-102 transition duration-500 hover:bg-gray-400/50"
                }`}
                disabled={pageNumber === totalPages - 1}
                onClick={() => setPageNumber((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
