// src/components/CodeEditorPanel.jsx
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { Loader2, Play, RefreshCw, Send } from "lucide-react";
import { Console } from "./Console";

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

export const CodeEditorPanel = ({ boilerplate, question }) => {
  console.log('question :::',question)

  const availableLanguages = Object.keys(question?.starter_code || {}).sort();

  const [language, setLanguage] = useState(availableLanguages[0]);
  const [code, setCode] = useState(boilerplate[language]);
  const [isLoading, setIsLoading] = useState(false); // For Run button
  const [isSubmitting, setIsSubmitting] = useState(false); // For Submit button

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(boilerplate[newLanguage]);
  };

  return (
    <div className="bg-neutral-800 rounded-lg h-full flex flex-col">
      <PanelGroup direction="vertical">
        <Panel defaultSize={65} minSize={20}>
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between !p-2 bg-neutral-800 border-b border-neutral-700">
              <LanguageSelector
                language={language}
                setLanguage={handleLanguageChange}
                programmingLanguages={availableLanguages}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => runCode()}
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
                  onClick={() => submitCode()}
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
                  {isSubmitting ? "Submitting..." : "Submit Final"}
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
        <Panel defaultSize={35} minSize={10}>
          <Console question={question}/>
        </Panel>
      </PanelGroup>
    </div>
  );
};

// src/components/CodeEditorPanel.jsx
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import MonacoEditor, { Editor } from "@monaco-editor/react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Play, Send, RefreshCw, Loader2 } from "lucide-react"; // Icons

// // --- Utility: Language ID Mapping for Judge0 ---
// // You should fetch this from your backend or define it centrally
// const JUDGE0_LANGUAGE_IDS = {
//   python: 71, // Python 3
//   java: 62, // Java (OpenJDK 13.0.1)
//   cpp: 54, // C++ (GCC 9.2.0)
//   javascript: 63, // JavaScript (Node.js 18.15.0)
//   // Add other languages as supported by Judge0 and your platform
// };

// // --- Helper: Default Boilerplate Code (matches your schema) ---
// // This would typically come from your `question` object
// // const getDefaultBoilerplate = (language) => {
// //   switch (language) {
// //     case 'python': return "import sys\nimport json\nfrom typing import List\n\nclass Solution:\n    def solve(self, input_data):\n        # Your code here\n        pass\n\ndef main():\n    lines = sys.stdin.readlines()\n    input_str = ''.join(lines)\n    input_data = json.loads(input_str)\n    \n    solver = Solution()\n    result = solver.solve(input_data)\n    \n    print(json.dumps(result))\n\n# main()";
// //     case 'java': return "import java.util.*;\nimport com.google.gson.Gson;\nimport com.google.gson.reflect.TypeToken;\nimport java.lang.reflect.Type;\n\nclass Solution {\n    public Object solve(Object inputData) {\n        // Your code here\n        return null;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        StringBuilder sb = new StringBuilder();\n        while(sc.hasNextLine()) {\n            sb.append(sc.nextLine());\n        }\n        String input = sb.toString();\n        Gson gson = new Gson();\n        \n        // Adjust TypeToken based on expected input for the problem\n        Object inputData = gson.fromJson(input, Object.class); \n        \n        Solution solution = new Solution();\n        Object result = solution.solve(inputData);\n        \n        System.out.println(gson.toJson(result));\n    }\n}";
// //     case 'cpp': return "#include <iostream>\n#include <vector>\n#include <string>\n#include <json.hpp> // Assuming nlohmann/json\n\nusing json = nlohmann::json;\n\nclass Solution {\npublic:\n    json solve(json input_data) {\n        // Your code here\n        return nullptr;\n    }\n};\n\nint main() {\n    std::string line;\n    std::string input_str;\n    while (std::getline(std::cin, line)) {\n        input_str += line;\n    }\n    json j = json::parse(input_str);\n    \n    Solution sol;\n    json result = sol.solve(j);\n    \n    std::cout << result.dump() << std::endl;\n\n    return 0;\n}";
// //     case 'javascript': return "/**\n * @param {any} inputData\n * @return {any}\n */\nclass Solution {\n    solve(inputData) {\n        // Your code here\n        return null;\n    }\n}\n\n// The judge will create inputData from stdin and call solution.solve(inputData)\n// and then print the result to stdout.\n// Example of how input would be handled if run directly:\n// const input_str = require('fs').readFileSync(0, 'utf8');\n// const inputData = JSON.parse(input_str);\n// const solver = new Solution();\n// const result = solver.solve(inputData);\n// console.log(JSON.stringify(result));";
// //     default: return '// Select a language to get starter code';
// //   }
// // };

// export function CodeEditorPanel({ question, onFinalSubmit }) {
//   // `question` prop should contain: question_id, question_title, question_description,
//   // test_cases.visible, starter_code (Map from your schema)
//   console.log(question);
//   const availableLanguages = Object.keys(question?.starter_code || {});

//   const [selectedLanguage, setSelectedLanguage] = useState(
//     availableLanguages[0] || "javascript" // Default to first available or JS
//   );
//   const [code, setCode] = useState(
//     question.starter_code?.[selectedLanguage]
//   ); /*|| getDefaultBoilerplate(selectedLanguage);*/
//   const [output, setOutput] = useState("");
//   const [executionTime, setExecutionTime] = useState(null);
//   const [memoryUsage, setMemoryUsage] = useState(null);
//   const [status, setStatus] = useState(""); // Running, Passed, Failed, Error
//   const [isLoading, setIsLoading] = useState(false); // For Run button
//   const [isSubmitting, setIsSubmitting] = useState(false); // For Submit button

//   // Ref to store the actual File object for submission, if needed for complex file uploads
//   // For basic code submission, it's just the string 'code'

//   // Effect to update code when question or language changes
//   useEffect(() => {
//     // If the selected language is not supported by the question, default to first available
//     if (question.starter_code && !question.starter_code[selectedLanguage]) {
//       setSelectedLanguage(availableLanguages[0] || "javascript");
//     }
//     setCode(
//       question.starter_code?.[selectedLanguage] ||
//         getDefaultBoilerplate(selectedLanguage)
//     );
//     setOutput("");
//     setStatus("");
//     setExecutionTime(null);
//     setMemoryUsage(null);
//   }, [
//     question.question_id,
//     selectedLanguage,
//     question.starter_code,
//     availableLanguages,
//   ]);

//   // Handle language change from dropdown
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     if (newLang !== selectedLanguage) {
//       if (
//         window.confirm(
//           "Changing language will reset your code to the starter template. Are you sure?"
//         )
//       ) {
//         setSelectedLanguage(newLang);
//         // Code will be reset by useEffect due to selectedLanguage change
//       }
//     }
//   };

//   // --- Run Code Logic (against visible test cases) ---
//   const runCode = async () => {
//     setIsLoading(true);
//     setOutput("");
//     setStatus("Running...");
//     setExecutionTime(null);
//     setMemoryUsage(null);

//     if (!code || !selectedLanguage) {
//       toast.error("Code and language must be selected.");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/code/run",
//         {
//           language_id: JUDGE0_LANGUAGE_IDS[selectedLanguage],
//           code: code,
//           test_cases: question.test_cases?.visible || [], // Send visible test cases
//           question_id: question.question_id, // For backend context
//           // You might need to send boilerplate if not included in `code` or if judge0 needs it separately
//         },
//         { withCredentials: true }
//       );

//       const { submissionToken } = response.data;
//       if (!submissionToken) {
//         throw new Error("Failed to get submission token from backend.");
//       }

//       // Poll Judge0 for results (or use a callback from your backend)
//       let resultResponse;
//       let submissionStatus;
//       do {
//         await new Promise((res) => setTimeout(res, 1000)); // Poll every 1 second
//         resultResponse = await axios.get(
//           `http://localhost:5000/api/code/status/${submissionToken}`,
//           { withCredentials: true }
//         );
//         submissionStatus = resultResponse.data.status?.description; // Judge0 status
//       } while (
//         submissionStatus === "In Queue" ||
//         submissionStatus === "Processing"
//       );

//       const result = resultResponse.data;

//       // Process Judge0 results
//       setOutput(
//         result.stdout || result.stderr || result.compile_output || "No output"
//       );
//       setExecutionTime(result.time ? `${result.time}s` : "N/A");
//       setMemoryUsage(result.memory ? `${result.memory} KB` : "N/A");

//       if (result.status?.id === 3) {
//         // Status ID 3 is Accepted (Judge0 convention)
//         // Further logic needed if multiple test cases for visible cases
//         if (result.expected_output === result.stdout.trim()) {
//           // Simple check for single case
//           setStatus("Passed (Visible Test Cases)");
//         } else {
//           setStatus("Failed (Wrong Answer)");
//         }
//       } else if (result.status?.id >= 5 && result.status?.id <= 12) {
//         // Runtime Error, Compile Error, Time Limit Exceeded etc.
//         setStatus(result.status?.description || "Execution Error");
//         toast.error(result.status?.description || "Code execution failed.");
//       } else {
//         setStatus(result.status?.description || "Unknown Status");
//       }
//     } catch (error) {
//       console.error("Error running code:", error);
//       setOutput(
//         "Error during execution: " +
//           (error.response?.data?.message || error.message)
//       );
//       setStatus("System Error");
//       toast.error("Error running code. Check console for details.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Final Submit Logic (against hidden test cases) ---
//   const submitCode = async () => {
//     setIsSubmitting(true);
//     // You might want to run visible tests first before allowing final submit
//     // await runCode();

//     if (!code || !selectedLanguage) {
//       toast.error(
//         "Code and language must be selected before final submission."
//       );
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // This makes the API call to your backend's submit-answer endpoint
//       // The backend will then send to Judge0 with hidden test cases
//       // and store the result in your DB (e.g., Result model).
//       const response = await axios.post(
//         "http://localhost:5000/api/test/submit-answer",
//         {
//           testId: "current_test_id", // Get this from props/context
//           sectionId: "current_section_id", // Get this from props/context
//           questionId: question.question_id,
//           submittedAnswer: code, // The user's code
//           language: selectedLanguage, // Language name for backend to map
//           // Note: Evaluation will be done fully on backend now
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         toast.success("Code submitted for evaluation!");
//         // After submission, maybe move to the next question or show a success screen
//         onFinalSubmit(question.question_id, code); // Callback to parent
//       } else {
//         toast.error(response.data.message || "Failed to submit code.");
//       }
//     } catch (error) {
//       console.error("Error submitting code:", error);
//       toast.error(
//         "An error occurred during final submission. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gray-900 text-gray-100">
//       {/* Language Selector and Action Buttons */}
//       <div className="flex items-center justify-between !p-3 border-b border-gray-700 bg-gray-800">
//         <select
//           value={selectedLanguage}
//           onChange={handleLanguageChange}
//           className="bg-gray-700 text-gray-100 rounded !px-3 !py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           disabled={isLoading || isSubmitting}
//         >
//           {availableLanguages.map((lang) => (
//             <option key={lang} value={lang}>
//               {lang.charAt(0).toUpperCase() + lang.slice(1)}
//             </option>
//           ))}
//         </select>
//         <div className="flex gap-2">
//           <button
//             onClick={runCode}
//             disabled={isLoading || isSubmitting}
//             className="flex items-center gap-1 !px-4 !py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm transition disabled:opacity-50"
//           >
//             {isLoading ? (
//               <RefreshCw size={16} className="animate-spin" />
//             ) : (
//               <Play size={16} />
//             )}
//             {isLoading ? "Running..." : "Run Code"}
//           </button>
//           <button
//             onClick={submitCode}
//             disabled={isLoading || isSubmitting}
//             className="flex items-center gap-1 !px-4 !py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm transition disabled:opacity-50"
//           >
//             {isSubmitting ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <Send size={16} />
//             )}
//             {isSubmitting ? "Submitting..." : "Submit Final"}
//           </button>
//         </div>
//       </div>

//       {/* Code Editor */}
//       {/* <div className="flex-1">
//         <MonacoEditor
//           height="100%"
//           language={selectedLanguage}
//           value={code}
//           onChange={(newValue) => setCode(newValue)}
//           theme="vs-dark"
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//             wordWrap: "on",
//             scrollBeyondLastLine: false,
//             readOnly: isLoading || isSubmitting, // Disable editing while code is running/submitting
//           }}
//         />
//       </div> */}

//       <div className="flex-grow">
//         <Editor
//           height="100%"
//           language={selectedLanguage}
//           theme="vs-dark"
//           value={code}
//           onChange={(value) => setCode(value)}
//           options={{
//             minimap: { enabled: false },
//             fontSize: 14,
//             wordWrap: "on",
//             scrollBeyondLastLine: false,
//           }}
//         />
//       </div>
//       {/* Output / Console Area */}
//       <div className="bg-gray-800 !p-4 border-t border-gray-700 overflow-y-auto max-h-[30%]">
//         <h3 className="text-md font-semibold !mb-2">
//           Output{" "}
//           <span
//             className={`text-sm !ml-2 ${
//               status.includes("Passed")
//                 ? "text-green-400"
//                 : status.includes("Failed") || status.includes("Error")
//                 ? "text-red-400"
//                 : "text-gray-400"
//             }`}
//           >
//             ({status})
//           </span>
//         </h3>
//         {executionTime && memoryUsage && (
//           <p className="text-xs text-gray-400 !mb-1">
//             Time: {executionTime} | Memory: {memoryUsage}
//           </p>
//         )}
//         <pre className="bg-gray-700 !p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
//           {output || "No output yet."}
//         </pre>
//       </div>
//     </div>
//   );
// }

export default CodeEditorPanel;

/*
const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: compileLanguage.id,
      source_code: btoa(codeRef.current),
      stdin: btoa(""),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "64328505efmsh8da827dbfcfe3aep1168d0jsn82cfb00ffc59",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "64328505efmsh8da827dbfcfe3aep1168d0jsn82cfb00ffc59",
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        const outputDetails = response.data;
        setOutputDetails(outputDetails);
        socketRef.current.emit("output-details", { roomId, outputDetails });
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    }
  }; */
