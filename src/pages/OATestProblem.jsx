import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CodeEditorPanel } from "../components/OATestProblem/CodeEditorPanel";
import { ProblemDescription } from "../components/OATestProblem/ProblemDescription";
import { useSearchParams } from "react-router-dom";
import { getQuestion } from "../services/apis/oaTestApi";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner/Spinner";
import { useBlocker } from "../hooks/useBlocker";
import ErrorPage from "./ErrorPage";
import { ClockContextProvider } from "../context/ClockContext";

export function OATestProblem() {
  const [searchParams, setSearchParams] = useSearchParams();
  const testId = searchParams.get("testid");
  const sectionId = searchParams.get("sectionid");
  const questionId = searchParams.get("questionid");

  useBlocker();

  const {
    data: problem,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["question", { testId, sectionId, questionId }],

    queryFn: async () => {
      const data = await getQuestion(testId, sectionId, questionId);
      return data?.question;
    },

    enabled: !!(testId && sectionId && questionId),
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
    <ClockContextProvider timerId={`oatest-${testId}`}>
      <div className="min-h-screen bg-neutral-900 text-white font-sans">
        {/* We can add a top navbar here later if needed */}
        <main className="h-screen w-screen !p-2">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={33} minSize={0}>
              <ProblemDescription problem={problem} />
            </Panel>
            <PanelResizeHandle className="panel-handle" />
            <Panel defaultSize={67} minSize={30}>
              {problem && (
                <CodeEditorPanel
                  question={problem}
                  questionId={questionId}
                  sectionId={sectionId}
                  testId={testId}
                />
              )}
            </Panel>
          </PanelGroup>
        </main>
      </div>
    </ClockContextProvider>
  );
}
