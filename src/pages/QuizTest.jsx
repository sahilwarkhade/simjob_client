import { ArrowLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getSectionQuestions,
  sectionAnswerSubmission,
} from "../services/apis/oaTestApi";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { CounterClock } from "../components/General/Clock";
import { OATestContext } from "../context/OATestContext";
import { ClockContextProvider } from "../context/ClockContext";

const QuizTest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const testId = searchParams.get("testid");
  const sectionId = searchParams.get("sectionid");

  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    sessionStorage.getItem(`${sectionId}`)
      ? JSON.parse(sessionStorage.getItem(`${sectionId}`))
      : {}
  );
  const [type, setType] = useState(null);
  const { setSubmittedSections } = useContext(OATestContext);
  const navigate = useNavigate();

  let sumittedSections =
    JSON.parse(sessionStorage.getItem("sumittedSections")) || [];
  const currentQuestion = questions ? questions[currentQuestionIndex] : [];

  const handleAnswerSelect = (questionId, selectedOptionId) => {
    const question = questions.find((q) => q.id === questionId);

    // For Multiple Choice Questions
    if (type === "multiple_choice") {
      const existingAnswers = userAnswers[questionId] || [];
      const isSelected = existingAnswers?.includes(selectedOptionId);

      let newAnswers;
      if (isSelected) {
        newAnswers = existingAnswers?.filter((id) => id !== selectedOptionId);
      } else {
        newAnswers = [...existingAnswers, selectedOptionId];
      }
      setUserAnswers({ ...userAnswers, [questionId]: newAnswers });
    } else {
      // For Single Choice Questions
      setUserAnswers({ ...userAnswers, [questionId]: selectedOptionId });
    }
  };

  useEffect(() => {
    if (Object.keys(userAnswers).length > 0) {
      sessionStorage.setItem(`${sectionId}`, JSON.stringify(userAnswers));
    }
  }, [userAnswers]);

  const {
    data: sectionData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`${sectionId}`, { testId, sectionId }],
    queryFn: async () => {
      const data = await getSectionQuestions(testId, sectionId);
      return data;
    },

    enabled: !!(testId && sectionId),
  });

  useEffect(() => {
    setQuestions(sectionData?.questions);
    setType(sectionData?.type);
  }, [sectionData]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      sectionId,
      userAnswer: userAnswers,
    };

    await sectionAnswerSubmission(formData, navigate, setSubmittedSections);
    sessionStorage.setItem(
      "sumittedSections",
      JSON.stringify([...sumittedSections, sectionId])
    );
  };

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
    <ClockContextProvider timerId={`oatest-${testId}`}>
      <div className="min-h-screen  bg-neutral-800 text-white font-sans">
        <div className="min-h-screen w-screen mx-auto !p-6 !md:p-8 !px-24 bg-white shadow-2xl">
          <div className="!mb-5 flex justify-between !py-4">
            <button onClick={() => navigate(-1)}>
              <span className="flex items-center justify-center !px-3 gap-x-1.5 !py-1 rounded-2xl text-center text-sm font-semibold cursor-pointer bg-red-700 hover:bg-transparent hover:border hover:text-black transition duration-500">
                <ArrowLeft size={13} />
                Back
              </span>
            </button>
            <CounterClock direction={"backward"} type={"oatest"} id={testId} />
          </div>
          {/* Progress Indicator */}
          <div className="!mb-4">
            <p className="text-sm font-medium text-gray-500">
              Question {currentQuestionIndex + 1} of {questions?.length}
            </p>
          </div>

          {/* Question */}
          <h2 className="text-lg font-bold text-gray-800 !mb-6 select-none">
            {currentQuestion?.description}
          </h2>

          {/* Options */}
          <div className="!space-y-4">
            {currentQuestion?.options?.map((option, index) => {
              const isSelected =
                type === "multiple_choice"
                  ? (userAnswers[currentQuestion?._id] || []).includes(option)
                  : userAnswers[currentQuestion?._id] === option;

              return (
                <label
                  key={option || index}
                  className={`flex items-center !p-3 border rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-100"
                      : "bg-white border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type={type === "multiple_choice" ? "checkbox" : "radio"}
                    name={currentQuestion?._id}
                    checked={isSelected}
                    onChange={() =>
                      handleAnswerSelect(currentQuestion?._id, option)
                    }
                    className="w-5 h-5 text-blue-600 form-radio form-checkbox focus:ring-blue-500"
                  />
                  <span className="!ml-4 text-gray-700 select-none">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between !mt-8">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="!px-6 !py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestionIndex === questions?.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="!px-6 !py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors cursor-pointer"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={goToNextQuestion}
                className="!px-6 !py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </ClockContextProvider>
  );
};

export default QuizTest;
