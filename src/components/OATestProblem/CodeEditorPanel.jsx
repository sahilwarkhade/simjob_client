// src/components/CodeEditorPanel.jsx
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from '@monaco-editor/react';
import { Play, Send } from 'lucide-react';
import {Console}from "./Console"
const LanguageSelector = ({ language, setLanguage }) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ];

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-neutral-700 text-white rounded !px-3 !py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {languages.map(lang => (
        <option key={lang.value} value={lang.value}>{lang.label}</option>
      ))}
    </select>
  );
};

export const CodeEditorPanel = ({ boilerplate }) => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(boilerplate[language]);

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
              <LanguageSelector language={language} setLanguage={handleLanguageChange} />
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white font-semibold !py-1.5 !px-3 rounded text-sm">
                  <Play size={14} /> Run
                </button>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold !py-1.5 !px-3 rounded text-sm">
                  <Send size={14} /> Submit
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
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="panel-handle" />
        <Panel defaultSize={35} minSize={10}>
              <Console/>
        </Panel>
      </PanelGroup>
    </div>
  );
};