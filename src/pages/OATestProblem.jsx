import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CodeEditorPanel } from "../components/OATestProblem/CodeEditorPanel";
import { ProblemDescription } from "../components/OATestProblem/ProblemDescription";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getQuestion } from "../services/apis/oaTestApi";

export function OATestProblem() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const testId = searchParams.get("testid");
  const sectionId = searchParams.get("sectionid");
  const questionId = searchParams.get("questionid");
  const [problem, setProblem] = useState(null);
  const [question, setQuestion] = useState(null);
  let programmingLanguages;
  useEffect(() => {
    (async () => {
      const response=await getQuestion(testId, sectionId, questionId, setProblem);
      programmingLanguages=location.state;
      setQuestion(response?.data?.question)
    })();
  }, [location.state]);
  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      {/* We can add a top navbar here later if needed */}
      <main className="h-screen w-screen !p-2">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={30} minSize={0}>
            <ProblemDescription problem={problem} />
          </Panel>
          <PanelResizeHandle className="panel-handle" />
          <Panel defaultSize={55} minSize={30}>
            {question && (
              <CodeEditorPanel question={question} boilerplate={problem?.starter_code[0]} programmingLanguages={programmingLanguages} />
            )}
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}
