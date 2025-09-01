const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };
  return (
    <span className={`font-semibold ${colors[difficulty]}`}>{difficulty}</span>
  );
};

export const ProblemDescription = ({ problem }) => {
  return (
    <div className="bg-neutral-800 rounded-lg !p-5 h-full overflow-y-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white !mb-2">
          {problem?.question_title}
        </h1>
        {/* <div className="flex items-center gap-4 text-sm">
          <DifficultyBadge difficulty={problem?.difficulty} />
        </div> */}
      </div>

      <div className="text-neutral-300 !space-y-4">
        {/* {problem?.description.map((paragraph, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                /`([^`]+)`/g,
                '<code class="bg-neutral-700 rounded !px-1.5 !py-0.5 font-mono text-sm">$1</code>'
              ),
            }}
          />
        ))} */}
        <p
          dangerouslySetInnerHTML={{ __html: problem?.question_description }}
        ></p>
      </div>

      <div className="!mt-6 !space-y-4">
        {problem?.test_cases?.visible.map((t, index) => {
          let obj = {};
          if (t?.input) {
            obj = JSON.parse(t?.input);
          }
          return (
            <div key={t?.test_case_id}>
              <p className="font-semibold">Example {index + 1}:</p>
              <div className="code-block">
                <p>
                  <strong className="text-neutral-400">Input:</strong>{" "}
                  {Object.keys(obj).map((key) => (
                    <div key={key} className="!py-1.5">
                      <span className="text-white !mb-1.5">{key} = </span>
                      <div className="bg-neutral-900 !p-3 rounded">
                        {" "}
                        {JSON.stringify(obj[key], null, 1)}{" "}
                      </div>
                    </div>
                  ))}
                </p>
                <p>
                  <strong className="text-neutral-400">Output:</strong>{" "}
                  <div className="bg-neutral-900 !p-3 rounded">
                    {t?.expected_output}{" "}
                  </div>
                </p>
                {t.explanation && (
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
          {problem?.constraints?.split("*").map(
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
          {/* ATLEAST TWO VISIBLE TEST CASES ARE REQUIRED */}
          {/* {problem?.constraints?.split('*').map(c=>c && <p>{c}</p>)} */}
        </ul>
      </div>
    </div>
  );
};
