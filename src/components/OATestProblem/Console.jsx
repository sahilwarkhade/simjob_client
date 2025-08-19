// src/components/Console.jsx
import React, { useState } from 'react';

export const Console = () => {
  const [activeTab, setActiveTab] = useState('testcase');

  const TabButton = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`!px-3 !py-2 text-sm font-medium ${
        activeTab === tabName
          ? 'text-white bg-neutral-700 rounded-t-md'
          : 'text-neutral-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <div className="flex items-center border-b border-neutral-700 !px-2">
        <TabButton tabName="testcase" label="Testcase" />
        <TabButton tabName="result" label="Result" />
      </div>
      <div className="!p-4 flex-grow overflow-y-auto font-mono text-sm">
        {activeTab === 'testcase' && (
          <div>
            <div className="flex gap-2 !mb-4">
                <div className="bg-neutral-700 !p-2 rounded">Case 1</div>
                <div className="bg-neutral-900 !p-2 rounded border border-neutral-700">Case 2</div>
                <div className="bg-neutral-900 !p-2 rounded border border-neutral-700">Case 3</div>
            </div>
            <div>
                <p className="text-neutral-400 !mb-1">nums =</p>
                <div className="bg-neutral-900 !p-2 rounded">[2,7,11,15]</div>
            </div>
             <div className="mt-3">
                <p className="text-neutral-400 !mb-1">target =</p>
                <div className="bg-neutral-900 !p-2 rounded">9</div>
            </div>
          </div>
        )}
        {activeTab === 'result' && (
          <div>
            <p className="text-neutral-400">Run code to see the result.</p>
            {/* Example of a success result */}
            {/* <div className="text-green-500 font-bold">Accepted</div>
            <div className="mt-2">
                <p>Output: <span className="text-white">[0,1]</span></p>
                <p>Expected: <span className="text-white">[0,1]</span></p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};
