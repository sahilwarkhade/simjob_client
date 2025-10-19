import { useState, useEffect } from "react";
import { Play, RefreshCw } from "lucide-react";

export const Console = ({
  question,
  isLoading,
  isSubmitting,
  evaluationResponse,
  runCodeForAllTestCases,
}) => {
  const [activeTab, setActiveTab] = useState("testcase");
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  let obj;
  try {
    if (question?.examples[testCaseIndex]?.input) {
      obj = question?.examples[testCaseIndex].input;
      obj = obj.split(" ").filter((element) => element !== "=");
    }
  } catch (e) {
    console.error("Error parsing test case input JSON:", e);
  }

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`!px-3 !py-2 text-sm font-medium cursor-pointer ${
        activeTab === tabName
          ? "text-white bg-neutral-700 rounded-t-md"
          : "text-neutral-400 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  useEffect(() => {
    if (evaluationResponse && !isLoading) {
      setActiveTab("result");
    }
  }, [evaluationResponse, isLoading]);

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <div className="flex items-center border-b border-neutral-700 !px-2">
        <TabButton tabName="testcase" label="Testcase" />
        <TabButton tabName="result" label="Result" />
      </div>
      <div className="!p-4 flex-grow overflow-y-auto font-mono text-sm text-neutral-200">
        {activeTab === "testcase" && (
          <>
            <div className="flex gap-2 !mb-4 flex-wrap">
              {question?.examples.map((testCase, index) => (
                <button
                  key={testCase?._id}
                  className={`!px-3 !py-1 rounded text-sm transition-all duration-300 cursor-pointer ${
                    testCaseIndex === index
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"
                  }`}
                  onClick={() => setTestCaseIndex(index)}
                >
                  Case {index + 1}
                </button>
              ))}
            </div>

            <div>
              {obj.length > 0 ? (
                obj.map((key, index) => (
                  <div key={key} className="!py-1.5">
                    {index % 2 === 0 ? (
                      <p className="text-white !mb-1.5">{key} = </p>
                    ) : (
                      <div className="bg-neutral-900 !p-3 rounded">{key}</div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">
                  No input for this test case or format invalid.
                </p>
              )}
            </div>
          </>
        )}
        {activeTab === "result" && (
          <div>
            {isLoading && (
              <p className="text-neutral-400">Running tests... Please wait.</p>
            )}

            {!isLoading && !isSubmitting && !evaluationResponse && (
              <p className="text-neutral-400">Run code to see the result.</p>
            )}

            {!isLoading && evaluationResponse && (
              <div>
                <div className="flex justify-between !pr-2">
                  <div className="flex items-center gap-4 !mb-4">
                    <p className="text-neutral-300">Overall Status:</p>
                    <span
                      className={`font-bold ${
                        evaluationResponse?.overallStatus
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {evaluationResponse?.overallStatus
                        ? "Accepted"
                        : "Failed"}
                    </span>
                  </div>
                  <button
                    className={`bg-green-600 !px-3 font-semibold rounded hover:bg-green-900 transition duration-400 flex items-center gap-x-1.5 ${
                      loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={(e) => runCodeForAllTestCases(e, setLoading)}
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Play size={16} />
                    )}
                    {loading ? "Evaluating..." : "Run Code For All Test Cases"}
                  </button>
                </div>

                <div>
                  Test Cases Passed :{" "}
                  {`${evaluationResponse?.passedTestCases}/${evaluationResponse?.response.length}`}
                </div>

                {evaluationResponse?.compilationError && (
                  <div className="text-red-500 !mb-4">
                    <h4>Compilation Error:</h4>
                    <pre className="bg-neutral-900 !p-3 rounded overflow-x-auto whitespace-pre-wrap">
                      {decodeURIComponent(
                        escape(atob(evaluationResponse?.compilationError))
                      )}
                    </pre>
                  </div>
                )}

                {evaluationResponse?.response &&
                  evaluationResponse?.response.length > 0 && (
                    <div className="!mt-4">
                      <h4 className="text-neutral-300 !mb-2">
                        Test Case Details:
                      </h4>
                      <table className="min-w-full text-left text-neutral-200 border-collapse">
                        <thead>
                          <tr className="bg-neutral-700">
                            <th className="!p-2 border border-neutral-600">
                              #
                            </th>
                            <th className="!p-2 border border-neutral-600">
                              Status
                            </th>
                            {/* Only show expected/actual if at least one test case failed or if it's a specific "Wrong Answer" state */}
                            {evaluationResponse?.response.some(
                              (tc) =>
                                !tc?.isCorrect || tc?.status === "Wrong Answer"
                            ) && (
                              <>
                                <th className="!p-2 border border-neutral-600">
                                  Expected
                                </th>
                                <th className="!p-2 border border-neutral-600">
                                  Actual
                                </th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {evaluationResponse?.response.map((tc, idx) => (
                            <tr
                              key={idx}
                              className={
                                tc?.status
                                  ? "bg-neutral-800"
                                  : "bg-red-900 bg-opacity-30"
                              }
                            >
                              <td className="!p-2 border border-neutral-600">
                                {idx + 1}
                              </td>
                              <td
                                className={`!p-2 border border-neutral-600 ${
                                  tc?.status === "Accepted"
                                    ? "text-green-400"
                                    : "text-red-400"
                                }`}
                              >
                                {tc?.status}
                              </td>
                              {evaluationResponse?.response.some(
                                (tc) =>
                                  !tc?.isCorrect ||
                                  tc?.status === "Wrong Answer"
                              ) && (
                                <>
                                  <td className="!p-2 border border-neutral-600">
                                    <pre className="whitespace-pre-wrap">
                                      {tc?.expected}
                                    </pre>
                                  </td>
                                  <td className="!p-2 border border-neutral-600">
                                    <pre className="whitespace-pre-wrap">
                                      {tc?.output ||
                                        decodeURIComponent(
                                          escape(atob(tc?.stderr || ""))
                                        )}
                                    </pre>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
