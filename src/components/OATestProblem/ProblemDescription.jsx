// src/components/ProblemDescription.jsx
import React from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500',
    Hard: 'text-red-500',
  };
  return <span className={`font-semibold ${colors[difficulty]}`}>{difficulty}</span>;
};

export const ProblemDescription = ({ problem }) => {
  return (
    <div className="bg-neutral-800 rounded-lg !p-5 h-full overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white !mb-2">{problem.title}</h1>
        <div className="flex items-center gap-4 text-sm">
          <DifficultyBadge difficulty={problem.difficulty} />
          <div className="flex items-center gap-1 cursor-pointer hover:text-white text-neutral-400">
            <ThumbsUp size={16} /> <span>12.3K</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white text-neutral-400">
            <ThumbsDown size={16} /> <span>1K</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white text-neutral-400">
            <Star size={16} /> <span>Add to List</span>
          </div>
        </div>
      </div>

      <div className="text-neutral-300 !space-y-4">
        {problem.description.map((paragraph, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.replace(/`([^`]+)`/g, '<code class="bg-neutral-700 rounded !px-1.5 !py-0.5 font-mono text-sm">$1</code>') }} />
        ))}
      </div>

      <div className="!mt-6 !space-y-4">
        {problem.examples.map((example, index) => (
          <div key={index}>
            <p className="font-semibold">Example {index + 1}:</p>
            <div className="code-block">
              <p><strong className="text-neutral-400">Input:</strong> {example.input}</p>
              <p><strong className="text-neutral-400">Output:</strong> {example.output}</p>
              {example.explanation && <p><strong className="text-neutral-400">Explanation:</strong> {example.explanation}</p>}
            </div>
          </div>
        ))}
      </div>
      
      <div className="!mt-6">
        <p className="font-semibold">Constraints:</p>
        <ul className="list-disc list-inside !mt-2 text-neutral-300 !space-y-1">
          {problem.constraints.map((constraint, index) => (
             <li key={index} dangerouslySetInnerHTML={{ __html: constraint.replace(/`([^`]+)`/g, '<code class="bg-neutral-700 rounded !px-1.5 !py-0.5 font-mono text-sm">$1</code>') }} />
          ))}
        </ul>
      </div>
    </div>
  );
};
