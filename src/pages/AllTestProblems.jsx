import { AlertTriangle, CheckCircle, Clock, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useBlocker } from "../hooks/useBlocker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSections } from "../services/apis/oaTestApi";

const MCQTypes = ["single_choice", "multiple_choice", "text"];
const AllTestProblems = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const testid = searchParams.get("testid");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sections, setSections] = useState([]);
  const [programmingLanguages, setProgrammingLanguages] = useState(null);

  useBlocker();

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [timeLeft, isSubmitted]);

  useEffect(() => {
    (async () => {
      const response = await getSections(testid, setSections);
      if (response?.data?.success)
        setProgrammingLanguages(response?.data?.programmingLanguages);

      console.log(response);
    })();
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodingQuestionStart = async (event, sectionId, questionId) => {
    event.preventDefault();

    navigate(
      `/test/section/question?testid=${testid}&sectionid=${sectionId}&questionid=${questionId}`,
      { state: programmingLanguages }
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center !p-6">
        <div className="bg-gray-800 border flex items-center justify-center flex-col border-gray-700 rounded-lg !p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto !mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white !mb-2">
            Test Submitted Successfully!
          </h2>
          <p className="text-gray-300 !mb-4">
            You answered {/*getTotalAnswered()*/} out of{" "}
            {/*getTotalQuestions()*/} questions.
          </p>
          <p className="text-sm text-gray-400">
            Your test feedback and test score is now available on dashboard. And
            you will receive your results within 24 hours via email.
          </p>
          <button className="cursor-pointer !p-2 !mt-2">
            redirecting to{" "}
            <span className="underline-offset-auto text-blue-600">
              dashboard
            </span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col items-center">
      <div className="bg-white border-b border-gray-700 shadow-xl w-full">
        <div className="flex items-center justify-between !px-10 !py-3">
          <div className="flex items-center !space-x-4">
            <div>
              <h1 className="text-xl font-bold">
                {"Software Engineer Assessment"}
              </h1>
            </div>
          </div>

          <div className="flex items-center !space-x-6">
            <div className="flex items-center !space-x-2 bg-gray-700 !px-3 !py-1 rounded">
              <Clock className="w-4 h-4 text-green-400" />
              <span
                className={`font-mono text-sm ${
                  timeLeft < 300 ? "text-red-400" : "text-green-400"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white !px-4 !py-2 rounded text-sm font-medium transition-colors flex items-center !space-x-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
      {/* progess track */}
      <div className="w-7xl overflow-hidden !mt-5">
        <div className="!mb-2 bg-gray-700 rounded-lg !px-3 !py-1.5">
          <h3 className="text-white font-semibold !mb-0.5">
            Progress Overview
          </h3>
          <div className="flex justify-between text-sm !mb-1">
            <span className="text-gray-300">Solved</span>
            <span className="text-green-400">
              {/* {getTotalAnswered()}/{getTotalQuestions()} */}
              10
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className={`bg-green-500 h-2 rounded-full transition-all duration-300 `}
              style={{
                width: `${
                  /*(getTotalAnswered() / getTotalQuestions())*/ 0.2 * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* sections */}
      <div className="!mt-1 w-7xl min-h-[60vh] flex flex-col items-center !space-y-2.5 shadow-xl rounded-lg overflow-hidden">
        <div className="w-full !space-y-1.5">
          {sections.length > 0 &&
            sections?.map((section, index) => {
              return (
                <div className="" key={section?._id}>
                  <div className="bg-gray-200/40 flex justify-between !p-5">
                    <h3 className=" font-medium ">
                      {index + 1 + "]."} {section?.section_name}
                    </h3>
                    {MCQTypes.includes(section?.section_type) && (
                      <button className="bg-green-600 !px-5 text-white font-semibold rounded !py-1.5 cursor-pointer">
                        {" "}
                        Start Section
                      </button>
                    )}
                  </div>
                  {section?.section_type === "coding" &&
                    section?.section_questions.map((question, index) => {
                      return (
                        <div
                          className="!px-10 !py-4 flex justify-between"
                          key={question?.question_id}
                        >
                          <div className="flex gap-x-3">
                            <p className="text-md font-medium capitalize">
                              <span>{index + 1 + ")."}</span>
                              {"  "}
                              {question?.question_title}
                            </p>
                            <span
                              className={`text-sm text-center border h-6 !px-1.5 rounded-2xl capitalize ${
                                question?.difficulty === "easy"
                                  ? "bg-green-500"
                                  : question?.difficulty === "medium"
                                  ? "bg-amber-600"
                                  : "bg-red-700"
                              }`}
                            >
                              {question?.difficulty || "Easy"}
                            </span>
                          </div>
                          <button
                            className="bg-green-600 !px-4 text-white font-semibold rounded !py-1 cursor-pointer"
                            onClick={(event) =>
                              handleCodingQuestionStart(
                                event,
                                section?._id,
                                question?.question_id
                              )
                            }
                          >
                            Start
                          </button>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 bg-gray-300/50 flex items-center justify-center !p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full !p-6">
            <div className="flex items-center !mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400 !mr-3" />
              <h3 className="text-lg font-semibold text-white">Submit Test</h3>
            </div>
            <p className="text-gray-300 !mb-4">
              Are you sure you want to submit your test? You have answered{" "}
              {/*{getTotalAnswered()}*/} out of {/* {getTotalQuestions()} */}{" "}
              questions.
            </p>
            <p className="text-sm text-gray-400 !mb-6">
              Once submitted, you cannot make any changes to your answers.
            </p>
            <div className="flex !space-x-3 justify-end">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="!px-4 !py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsSubmitted(true)}
                className="!px-4 !py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTestProblems;
