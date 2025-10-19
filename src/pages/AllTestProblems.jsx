import { Send } from "lucide-react";
import { useContext, useState } from "react";
import { useBlocker } from "../hooks/useBlocker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSections, submitTest } from "../services/apis/oaTestApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner/Spinner";
import { CounterClock } from "../components/General/Clock";
import { OATestContext } from "../context/OATestContext";
import { toast } from "react-toastify";
import SubmitModal from "../components/General/SubmitModal";
import { CompleteScreen } from "../components/General/CompleteScreen";
import { ClockContextProvider } from "../context/ClockContext";

const MCQTypes = ["single_choice", "multiple_choice", "text"];

const AllTestProblems = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const testid = searchParams.get("testid");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useBlocker();

  const { submittedSections } = useContext(OATestContext);
  const queryClient = useQueryClient();

  const {
    data: sections,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`sections-${testid}`, testid],
    queryFn: async () => {
      const data = await getSections(testid);
      return data?.sections;
    },
    enabled: !!testid,
  });

  const { mutate } = useMutation({
    mutationFn: () => submitTest(testid),
    onSuccess: async () => {
      setIsSubmitted(true);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user-recent-sessions"] }),
        queryClient.invalidateQueries({ queryKey: ["user-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["user-history"] }),
        queryClient.invalidateQueries({ queryKey: ["sections", testid] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setShowSubmitModal(false);
    },
  });

  const handleCodingQuestionStart = async (event, sectionId, questionId) => {
    event.preventDefault();
    navigate(
      `/test/section/question?testid=${testid}&sectionid=${sectionId}&questionid=${questionId}`
    );
  };

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    mutate(testid);
    localStorage.removeItem(`oatest-${testid}-running`);
    localStorage.removeItem(`oatest-${testid}`);
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
  if (isSubmitted) {
    return (
      <CompleteScreen
        title={"Test Submitted Successfully!"}
        description={
          "Your test feedback and test score will be available soon, after that you can check on your app dashboard. Also you will receive your results within 24 hours via email."
        }
      />
    );
  }
  return (
    <ClockContextProvider timerId={`oatest-${testid}`}>
      <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col items-center">
        <div className="bg-white border-b border-gray-700 shadow-xl w-full">
          <div className="flex items-center justify-between !px-10 !py-3">
            <div className="flex items-center !space-x-4">
              <div>
                <h1 className="text-xl font-bold">{"Online Assessment"}</h1>
              </div>
            </div>

            <div className="flex items-center !space-x-6">
              <CounterClock
                direction={"backward"}
                type={"oatest"}
                id={testid}
              />
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
        {/* <div className="w-7xl overflow-hidden !mt-5">
        <div className="!mb-2 bg-gray-700 rounded-lg !px-3 !py-1.5">
          <h3 className="text-white font-semibold !mb-0.5">
            Progress Overview
          </h3>
          <div className="flex justify-between text-sm !mb-1">
            <span className="text-gray-300">Solved</span>
            <span className="text-green-400">
              {getTotalAnswered()}/{getTotalQuestions()}
              10
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className={`bg-green-500 h-2 rounded-full transition-all duration-300 `}
              style={{
                width: `${
                  (getTotalAnswered() / getTotalQuestions()) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div> */}

        {/* sections */}
        <div className="!mt-20 w-7xl min-h-[60vh] flex flex-col items-center !space-y-2.5 shadow-xl rounded-lg overflow-hidden">
          <div className="w-full !space-y-1.5">
            {(sections.length > 0 || console.log(sections)) &&
              sections?.map((section, index) => {
                return (
                  <div className="" key={section?._id}>
                    <div className="bg-gray-200/40 flex justify-between !p-5">
                      <h3 className=" font-medium ">
                        {index + 1 + "]."} {section?.name}
                      </h3>
                      {MCQTypes.includes(section?.type) && (
                        <button
                          className={`${
                            submittedSections.includes(section?._id)
                              ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-800 cursor-pointer"
                          } !px-5 text-white font-semibold rounded !py-1.5  duration-500 transition-all `}
                          onClick={() =>
                            navigate(
                              `/test/section/quiz?testid=${testid}&sectionid=${section?._id}`
                            )
                          }
                          disabled={submittedSections.includes(section?._id)}
                        >
                          {" "}
                          {submittedSections.includes(section?._id)
                            ? "Submitted"
                            : "Start Section"}
                        </button>
                      )}
                    </div>
                    {section?.type === "coding" &&
                      section?.questions.map((question, index) => {
                        return (
                          <div
                            className="!px-10 !py-4 flex justify-between"
                            key={question?._id}
                          >
                            <div className="flex gap-x-3">
                              <p className="text-md font-medium capitalize">
                                <span>{index + 1 + ")."}</span>
                                {"  "}
                                {question?.title}
                              </p>
                            </div>
                            <button
                              className="bg-green-600 !px-4 text-white font-semibold rounded !py-1 hover:bg-green-800 duration-500 transition-all cursor-pointer"
                              onClick={(event) =>
                                handleCodingQuestionStart(
                                  event,
                                  section?._id,
                                  question?._id
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
          <>
            <SubmitModal
              title={"Submit Test"}
              description={
                "Are you sure you want to submit your test? Once you submit you can't come to this test again"
              }
              subDescription={
                "Once submitted, you cannot make any changes to your answers."
              }
              setShowSubmitModal={setShowSubmitModal}
              handleSubmit={handleSubmitTest}
            />
          </>
        )}
      </div>
    </ClockContextProvider>
  );
};

export default AllTestProblems;
