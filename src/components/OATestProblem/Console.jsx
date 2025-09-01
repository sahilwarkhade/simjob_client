import { useState, useEffect } from "react";

export const Console = ({
  question,
  submissionResults, 
  loadingSubmission, 
  submissionError,   
}) => {
  const [activeTab, setActiveTab] = useState("testcase");
  const [testCaseIndex, setTestCaseIndex] = useState(0);
  let obj = {};
  try {
    if (question?.test_cases?.visible[testCaseIndex]?.input) {
      obj = JSON.parse(question.test_cases.visible[testCaseIndex].input);
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
    if (submissionResults && !loadingSubmission) {
      setActiveTab("result");
    }
  }, [submissionResults, loadingSubmission]);

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
              {question?.test_cases?.visible.map((testCase, index) => (
                <button
                  key={testCase?.test_case_id}
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
              {Object.keys(obj).length > 0 ? ( 
                Object.keys(obj).map((key) => (
                  <div key={key} className="!py-1.5">
                    <p className="text-white !mb-1.5">{key} ={" "}</p>
                    <div className="bg-neutral-900 !p-3 rounded"> 
                      {JSON.stringify(obj[key], null,1)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">No input for this test case or format invalid.</p>
              )}
            </div>
          </>
        )}
        {activeTab === "result" && (
          <div>
            {loadingSubmission && (
              <p className="text-neutral-400">Running tests... Please wait.</p>
            )}

            {!loadingSubmission && submissionError && (
              <div className="text-red-500 !mb-4">
                <h4>Submission Failed:</h4>
                <pre className="bg-neutral-900 !p-3 rounded overflow-x-auto whitespace-pre-wrap">{submissionError}</pre>
              </div>
            )}

            {!loadingSubmission && !submissionResults && !submissionError && (
              <p className="text-neutral-400">Run code to see the result.</p>
            )}

            {!loadingSubmission && submissionResults && (
              <div>
                <div className="flex items-center gap-4 !mb-4">
                  <p className="text-neutral-300">Overall Status:</p>
                  <span className={`font-bold ${
                    submissionResults.overallStatus === 'Accepted' ? 'text-green-500' :
                    submissionResults.overallStatus === 'Partial Pass' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {submissionResults.overallStatus}
                  </span>
                  <p className="text-neutral-300">Score:</p>
                  <span className="text-white font-bold">{submissionResults.score}</span>
                </div>

                {submissionResults.compilationOutput && (
                  <div className="text-red-500 !mb-4">
                    <h4>Compilation Error:</h4>
                    <pre className="bg-neutral-900 !p-3 rounded overflow-x-auto whitespace-pre-wrap">{submissionResults.compilationOutput}</pre>
                  </div>
                )}
                {submissionResults.runtimeErrorOutput && (
                  <div className="text-red-500 !mb-4">
                    <h4>Runtime Error:</h4>
                    <pre className="bg-neutral-900 !p-3 rounded overflow-x-auto whitespace-pre-wrap">{submissionResults.runtimeErrorOutput}</pre>
                  </div>
                )}

                {submissionResults.testCases && submissionResults.testCases.length > 0 && (
                  <div className="!mt-4">
                    <h4 className="text-neutral-300 !mb-2">Test Case Details:</h4>
                    <table className="min-w-full text-left text-neutral-200 border-collapse">
                      <thead>
                        <tr className="bg-neutral-700">
                          <th className="!p-2 border border-neutral-600">#</th>
                          <th className="!p-2 border border-neutral-600">Status</th>
                          <th className="!p-2 border border-neutral-600">Time</th>
                          <th className="!p-2 border border-neutral-600">Memory</th>
                          {/* Only show expected/actual if at least one test case failed or if it's a specific "Wrong Answer" state */}
                          {submissionResults.testCases.some(tc => !tc.isCorrect || tc.status === 'Wrong Answer') && (
                              <>
                                  <th className="!p-2 border border-neutral-600">Expected</th>
                                  <th className="!p-2 border border-neutral-600">Actual</th>
                              </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {submissionResults.testCases.map((tc, idx) => (
                          <tr key={idx} className={tc.isCorrect ? "bg-neutral-800" : "bg-red-900 bg-opacity-30"}>
                            <td className="!p-2 border border-neutral-600">{idx + 1}</td>
                            <td className={`!p-2 border border-neutral-600 ${tc.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              {tc.statusDescription || tc.status}
                            </td>
                            <td className="!p-2 border border-neutral-600">{tc.time || 'N/A'}s</td>
                            <td className="!p-2 border border-neutral-600">{tc.memory ? `${Math.round(tc.memory / 1024)}MB` : 'N/A'}</td>
                            {submissionResults.testCases.some(tc => !tc.isCorrect || tc.status === 'Wrong Answer') && (
                                <>
                                    <td className="!p-2 border border-neutral-600"><pre className="whitespace-pre-wrap">{tc.expectedOutput}</pre></td>
                                    <td className="!p-2 border border-neutral-600"><pre className="whitespace-pre-wrap">{tc.actualOutput}</pre></td>
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