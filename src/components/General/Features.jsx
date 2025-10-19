import oATest from "../../assets/OATest.png";
import mockInterview from "../../assets/mockInterview.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import CTAButton from "./CTAButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Features = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 flex justify-center items-center">
      <div className="w-full max-w-7xl mx-auto !px-4 sm:!px-6 lg:!px-8 !pt-20 pb-20 flex flex-col justify-center items-center">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center !mb-12 lg:!mb-20 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold !mb-8 leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ace Your Next Interview
            </span>
          </h2>
          <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
            SimJob brings together AI-driven mock interviews, real-time
            feedback, and company-specific preparation tools, helping you
            sharpen your skills and boost your confidence before the big day.
          </p>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col gap-14 lg:gap-24 items-center justify-center">
          {/* Feature 1 - Mock Interview */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center !p-6 w-full">
            <div className="w-full lg:w-1/2 order-1 lg:order-1">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                {/* Glowing Gradient Behind the Image */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-glowGradient"></div>

                {/* Main Image with Vertical Drift */}
                <img
                  src={mockInterview}
                  alt="Mock Interview Practice"
                  className="w-full h-auto relative z-10 animate-verticalParallax hover:scale-105 transition-transform duration-300"
                />

                {/* Subtle Top Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20"></div>
              </div>

              <style jsx>{`
                /* Image Vertical Drift */
                @keyframes verticalParallax {
                  0% {
                    transform: translateY(0px) scale(1);
                  }
                  50% {
                    transform: translateY(-8px) scale(1.02);
                  }
                  100% {
                    transform: translateY(0px) scale(1);
                  }
                }
                .animate-verticalParallax {
                  animation: verticalParallax 9s ease-in-out infinite;
                }

                /* Glowing Gradient Animation */
                @keyframes glowGradient {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
                .animate-glowGradient {
                  background-size: 300% 300%;
                  animation: glowGradient 10s ease infinite;
                }
              `}</style>
            </div>

            <div className="w-full lg:w-1/2 !space-y-6 order-2 lg:order-2 text-center lg:text-left">
              <h3 className="text-xl sm:text-3xl font-bold bg-gradient-to-r text-black">
                AI-Powered Mock Interviews
              </h3>
              <p className="text-gray-400 text-sm sm:text-lg font-normal leading-relaxed">
                Step into realistic, AI-driven mock interviews that adapt to
                your role, experience, and industry. SimJob simulates real
                interview environments so you can practice with confidence and
                precision.
              </p>
              <div className="!space-y-4 !mt-8">
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Role-specific question sets tailored to your career path
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Realistic interviewer behavior & follow-up questions
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Performance tracking to monitor your improvement over time
                  </p>
                </div>
              </div>
              <div className="!pt-8 !mt-8 flex justify-center lg:justify-start">
                <CTAButton
                  btnText={"Start Interview"}
                  onclick={() =>
                    isLoggedIn ? navigate("/dashboard") : navigate("/login")
                  }
                />
              </div>
            </div>
          </div>

          {/* Feature 2 - Skills Assessment */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center !p-6 w-full">
            <div className="w-full lg:w-1/2 !space-y-6 order-2 lg:order-1 text-center lg:text-left">
              <h3 className="text-black text-xl sm:text-3xl font-bold bg-gradient-to-r">
                Master Every Online Assessment
              </h3>
              <p className="text-gray-400 text-sm sm:text-lg font-normal leading-relaxed">
                Ace the technical and aptitude tests recruiters love to throw at
                you. Our OA platform lets you practice coding challenges, logic
                puzzles, and problem-solving tasks under real test conditions.
              </p>
              <div className="!space-y-4 !mt-8">
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Timed assessments with instant scoring
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Coding environment with multiple language support
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Detailed solutions & explanations to learn from mistakes
                  </p>
                </div>
              </div>
              <div className="!pt-8 !mt-8 flex justify-center lg:justify-start">
                <CTAButton
                  btnText={"Start Assessment"}
                  onclick={() =>
                    isLoggedIn ? navigate("/dashboard") : navigate("/login")
                  }
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                {/* Glowing Gradient Behind the Image */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-glowGradient"></div>

                {/* Main Image with Vertical Drift */}
                <img
                  src={oATest}
                  alt="Mock Interview Practice"
                  className="w-full h-auto relative z-10 animate-verticalParallax hover:scale-105 transition-transform duration-300"
                />

                {/* Subtle Top Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20"></div>
              </div>

              <style jsx>{`
                /* Image Vertical Drift */
                @keyframes verticalParallax {
                  0% {
                    transform: translateY(0px) scale(1);
                  }
                  50% {
                    transform: translateY(-8px) scale(1.02);
                  }
                  100% {
                    transform: translateY(0px) scale(1);
                  }
                }
                .animate-verticalParallax {
                  animation: verticalParallax 9s ease-in-out infinite;
                }

                /* Glowing Gradient Animation */
                @keyframes glowGradient {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
                .animate-glowGradient {
                  background-size: 300% 300%;
                  animation: glowGradient 10s ease infinite;
                }
              `}</style>
            </div>
          </div>

          {/* Feature 3 - AI Feedback */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center !p-6 w-full">
            <div className="w-full lg:w-1/2 order-1">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                {/* Glowing Gradient Behind the Image */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-glowGradient"></div>

                {/* Main Image with Vertical Drift */}
                <img
                  src={mockInterview}
                  alt="Mock Interview Practice"
                  className="w-full h-auto relative z-10 animate-verticalParallax hover:scale-105 transition-transform duration-300"
                />

                {/* Subtle Top Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20"></div>
              </div>

              <style jsx>{`
                /* Image Vertical Drift */
                @keyframes verticalParallax {
                  0% {
                    transform: translateY(0px) scale(1);
                  }
                  50% {
                    transform: translateY(-8px) scale(1.02);
                  }
                  100% {
                    transform: translateY(0px) scale(1);
                  }
                }
                .animate-verticalParallax {
                  animation: verticalParallax 9s ease-in-out infinite;
                }

                /* Glowing Gradient Animation */
                @keyframes glowGradient {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
                .animate-glowGradient {
                  background-size: 300% 300%;
                  animation: glowGradient 10s ease infinite;
                }
              `}</style>
            </div>
            <div className="w-full lg:w-1/2 !space-y-6 order-2 text-center lg:text-left">
              <h3 className="text-black text-xl sm:text-3xl font-bold bg-gradient-to-r">
                Get Smarter, Faster Feedback
              </h3>
              <p className="text-gray-400 text-sm sm:text-lg font-normal leading-relaxed">
                Don't wait hours or days for feedback—get actionable insights as
                you speak, code, or write. Our AI coach evaluates your
                communication, problem-solving, and technical accuracy in real
                time.
              </p>
              <div className="!space-y-4 !mt-8">
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Instant feedback on clarity, confidence, and structure
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Pinpoint areas of improvement for your next attempt
                  </p>
                </div>
                <div className="flex gap-4 items-start text-gray-700 font-medium justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 !mt-1">
                    <IoIosCheckmarkCircle className="text-white text-sm" />
                  </div>
                  <p className="text-sm sm:text-lg">
                    Personalized tips and resources to upskill effectively
                  </p>
                </div>
              </div>
              <div className="!pt-8 !mt-8 flex justify-center lg:justify-start">
                <CTAButton
                  btnText={"Start Interview"}
                  onclick={() =>
                    isLoggedIn ? navigate("/dashboard") : navigate("/login")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
