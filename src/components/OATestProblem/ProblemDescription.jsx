import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


export const ProblemDescription = ({ problem }) => {
  const navigate=useNavigate();
  return (
    <div className="bg-neutral-800 rounded-lg !p-5 h-full overflow-y-auto">
      <button className="!mb-2" onClick={()=>navigate(-1)}>
        <span className="flex items-center justify-center !px-2 gap-x-1.5 !py-0.5 rounded-2xl text-center text-sm font-semibold cursor-pointer bg-red-700 hover:bg-transparent hover:border transition duration-500">
          <ArrowLeft size={13} />
          Back
        </span>
      </button>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white !mb-2">
          {problem?.title}
        </h1>
      </div>

      <div className="text-neutral-300 !space-y-4">
        <p dangerouslySetInnerHTML={{ __html: problem?.description }}></p>
      </div>

      <div className="!mt-6 !space-y-4">
        {problem?.examples.map((t, index) => {
          return (
            <div key={t?._id}>
              <p className="font-semibold">Example {index + 1}:</p>
              <div className="code-block">
                <p>
                  <strong className="text-neutral-400">Input:</strong>{" "}
                  {t?.input}
                </p>
                <div>
                  <strong className="text-neutral-400">Output:</strong>{" "}
                  <p className="bg-neutral-900 !p-3 rounded">
                    {t?.output}{" "}
                  </p>
                </div>
                {t?.explanation && (
                  <p>
                    <strong className="text-neutral-400">Explanation:</strong>{" "}
                    {t?.explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="!mt-6">
        <p className="font-semibold">Constraints:</p>
        <ul className="list-disc list-inside !mt-2 text-neutral-300 !space-y-1">
          {problem?.constraints?.map(
            (constraint, index) =>
              constraint && (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: constraint.replace(
                      /`([^`]+)`/g,
                      '<code class="bg-neutral-700 rounded !px-1.5 !py-0.5 font-mono text-sm">$1</code>'
                    ),
                  }}
                />
              )
          )}
        </ul>
      </div>
    </div>
  );
};
