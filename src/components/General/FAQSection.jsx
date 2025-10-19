import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What is SimJob?",
    answer:
      "SimJob is an AI-powered platform that simulates real interview environments and online assessments, helping you practice and improve with instant feedback.",
  },
  {
    question: "Can I choose the type of interview?",
    answer:
      "Yes! You can select interviews based on your role, experience level, and industry to get the most relevant practice.",
  },
  {
    question: "How does the real-time feedback work?",
    answer:
      "Our AI coach evaluates your communication, problem-solving, and technical skills as you perform tasks, giving actionable insights instantly.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required. SimJob runs entirely in your browser, so you can start practicing right away.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
      <div className="w-full max-w-4xl mx-auto !px-6">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center !mb-12 lg:!mb-20 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold !mb-8 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
            Got questions? We've got answers. Here's everything you need to know
            to get started with SimJob and ace your next interview.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="!space-y-4">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${
                openIndex === index
                  ? "ring-2 ring-blue-500/20 shadow-blue-100"
                  : ""
              }`}
            >
              <button
                className="w-full flex justify-between items-center !p-4 text-left group-hover:bg-white/50 transition-colors duration-300 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-light text-lg text-gray-900 !pr-8 group-hover:text-blue-700 transition-colors duration-300">
                  {faq?.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transition-all duration-500 ${
                    openIndex === index
                      ? "rotate-180 scale-110"
                      : "group-hover:scale-105"
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="!px-8 !pb-8 !pt-0">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent !mb-6"></div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center !mt-16">
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button
            className="inline-flex items-center !px-8 !py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={() => navigate("/contactus")}
          >
            <svg
              className="w-5 h-5 !mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
