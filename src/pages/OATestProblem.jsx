import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import { CodeEditorPanel } from "../components/OATestProblem/CodeEditorPanel";
import { ProblemDescription } from "../components/OATestProblem/ProblemDescription";
import { problem } from "../constants";

export function OATestProblem() {
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
            <CodeEditorPanel boilerplate={problem.boilerplate} />
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}