import React, { useEffect, useState, useRef, useContext } from "react";
import { User, Code, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HowItWorks = () => {
  const steps = [
    {
      icon: <User className="text-blue-500 lg:w-10 lg:h-10 w-5 h-5" />,
      title: "Pick Your Role & Goal",
      description:
        "Select your target role, industry, and interview type — from technical coding to HR and aptitude.",
    },
    {
      icon: <Code className="text-green-500 lg:w-10 lg:h-10 w-5 h-5" />,
      title: "Experience a True-to-Life Interview",
      description:
        "Our AI simulates real recruiters and test platforms so you can practice coding, problem-solving, and communication under realistic conditions.",
    },
    {
      icon: <Zap className="text-yellow-500 lg:w-10 lg:h-10 w-5 h-5" />,
      title: "Improve as You Go",
      description:
        "AI evaluates your performance in real time — spotting strengths, highlighting mistakes, and giving specific suggestions to improve instantly.",
    },
    {
      icon: <TrendingUp className="text-purple-500 lg:w-10 lg:h-10 w-5 h-5 " />,
      title: "Measure. Refine. Succeed.",
      description:
        "Monitor your improvement with detailed analytics and be fully prepared when it's time for the actual interview.",
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const stepIndex = stepRefs.current.indexOf(entry.target);
        if (entry.isIntersecting && stepIndex !== -1) {
          setActiveStep(stepIndex);
          setVisibleSteps((prev) => new Set([...prev, stepIndex]));
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const getProgressHeight = () => {
    if (activeStep === 0) return "25%";
    if (activeStep === 1) return "50%";
    if (activeStep === 2) return "75%";
    return "100%";
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 via-white to-blue-50 !py-24 overflow-hidden flex items-center justify-center"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-[28rem] h-[28rem] bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto !px-6 text-center flex items-center justify-center flex-col">
        {/* Header */}
        <div className="flex flex-col items-center justify-center !mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold !mb-8 leading-tight">
            How We Help You{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ace Every Interview
            </span>
          </h2>
          <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
            Master your interview skills with our AI-powered platform in four
            simple steps
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Vertical Progress Bar */}
          <div className="absolute left-4 md:left-21 lg:left-46 top-0 bottom-0 flex flex-col items-center">
            <div className="absolute top-16 bottom-16 w-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute top-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{ height: `calc(${getProgressHeight()} - 4rem)` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="!ml-10 lg:!ml-24 w-full md:w-2/3 lg:!space-y-16 !space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`group relative transition-all duration-700 ease-out ${
                  visibleSteps.has(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -left-13 md:-left-20  top-8 z-20">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 ${
                      index <= activeStep
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 border-white shadow-lg scale-110"
                        : "bg-white border-gray-300 shadow"
                    }`}
                  >
                    {index === activeStep && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50"></div>
                    )}
                    {index < activeStep ? (
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`text-lg font-bold ${
                          index <= activeStep ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                </div>

                {/* Step Card */}
                <div
                  className={`relative !p-6 bg-white rounded-xl shadow-lg border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    index === activeStep
                      ? "border-blue-200 ring-2 ring-blue-100"
                      : "border-gray-100 hover:border-blue-100"
                  }`}
                >
                  {index === activeStep && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                  )}
                  <div className="relative z-10">
                    <div className="max-md:flex max-md:gap-5">
                      <div className="!mb-6 inline-flex items-center justify-center lg:w-16 lg:h-16 h-7 w-7 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner group-hover:scale-110 transition-transform">
                        {React.cloneElement(step.icon, {
                          className: `${step.icon.props.className} transition-colors duration-300`,
                        })}
                      </div>
                      <h3 className="text-sm lg:text-2xl font-bold text-gray-900 !mb-3 group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm lg:text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center !mt-20">
          <button
            className="!px-8 !py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
            onClick={() =>
              isLoggedIn ? navigate("/dashboard") : navigate("/login")
            }
          >
            Start Your Interview Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
