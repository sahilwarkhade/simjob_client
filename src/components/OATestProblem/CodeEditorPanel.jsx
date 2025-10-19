// src/components/CodeEditorPanel.jsx
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { Loader2, Play, RefreshCw, Send } from "lucide-react";
import { Console } from "./Console";
import { JUDGE0_LANGUAGE_ID_TO_NAME_MAP } from "../../constants";
import {
  codeSubmission,
  evaluateCode,
  evaluateCodeForAllTestCases,
} from "../../services/apis/oaTestApi";
import { useAutoSaving } from "../../hooks/useAutoSaving";
import { CounterClock } from "../General/Clock";
import { useNavigate } from "react-router-dom";

const LanguageSelector = ({ language, setLanguage, programmingLanguages }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-neutral-700 text-white capitalize rounded !px-3 !py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {programmingLanguages?.map((lang) => (
        <option key={lang} value={lang} className="capitalize">
          {lang}
        </option>
      ))}
    </select>
  );
};

export const CodeEditorPanel = ({
  question,
  questionId,
  sectionId,
  testId,
}) => {
  const navigate = useNavigate();
  const availableLanguages = Object.keys(
    question?.boilerplateCode || {}
  ).sort();

  const [language, setLanguage] = useState(availableLanguages[0]);
  const [code, setCode] = useAutoSaving(
    `${questionId}`,
    question?.boilerplateCode[language],
    1500
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResponse, setEvaluationResponse] = useState(null);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(question?.boilerplateCode[newLanguage]);
  };

  const runCodeForAllTestCases = async (e, setLoading) => {
    e.preventDefault();
    setLoading(true);

    const languageId = JUDGE0_LANGUAGE_ID_TO_NAME_MAP[language];
    await evaluateCodeForAllTestCases(
      languageId,
      code,
      question?.problemId,
      setEvaluationResponse
    );

    setLoading(false);
  };

  const runCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const languageId = JUDGE0_LANGUAGE_ID_TO_NAME_MAP[language];
    await evaluateCode(
      languageId,
      code,
      question?.problemId,
      setEvaluationResponse
    );
    setIsLoading(false);
  };

  const submitCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const languageId = JUDGE0_LANGUAGE_ID_TO_NAME_MAP[language];

    const formData = {
      languageId,
      sourceCode: code,
      problemId: question?.problemId,
      programmingLanguage: language,
      questionId: questionId,
      sectionId: sectionId,
    };

    await codeSubmission(formData, navigate);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-neutral-800 rounded-lg h-full flex flex-col">
      <PanelGroup direction="vertical">
        <Panel defaultSize={70} minSize={10}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between !p-2 bg-neutral-800 border-b border-neutral-700">
              <LanguageSelector
                language={language}
                setLanguage={handleLanguageChange}
                programmingLanguages={availableLanguages}
              />
              <div className="flex gap-2">
                <CounterClock
                  color={"text-gray-200"}
                  direction={"backward"}
                  type={"oatest"}
                  id={testId}
                />
                <button
                  onClick={(e) => runCode(e)}
                  disabled={isLoading || isSubmitting}
                  className={`flex items-center gap-1 !px-4 !py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm transition disabled:opacity-50 ${
                    isLoading || isSubmitting
                      ? "cursor-progress"
                      : "cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <Play size={16} />
                  )}
                  {isLoading ? "Running..." : "Run Code"}
                </button>
                <button
                  onClick={(e) => submitCode(e)}
                  disabled={isLoading || isSubmitting}
                  className={`flex items-center gap-1 !px-4 !py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm transition disabled:opacity-50 ${
                    isLoading || isSubmitting
                      ? "cursor-progress"
                      : "cursor-pointer"
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
            <div className="flex-grow">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="panel-handle" />
        <Panel defaultSize={30} minSize={5}>
          <Console
            question={question}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            evaluationResponse={evaluationResponse}
            runCodeForAllTestCases={runCodeForAllTestCases}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default CodeEditorPanel;
