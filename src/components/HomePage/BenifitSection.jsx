// import React, { useEffect } from "react";
// import { FaRobot, FaLaptopCode, FaBolt, FaGlobe, FaChartLine } from "react-icons/fa";

// const benefitsData = [
//   {
//     icon: <FaRobot className="text-4xl text-indigo-600" />,
//     title: "AI-Driven Personalization",
//     description: "Practice interviews tailored to your role, skills, and experience level for maximum effectiveness."
//   },
//   {
//     icon: <FaLaptopCode className="text-4xl text-indigo-600" />,
//     title: "Real Company OA Tests",
//     description: "Prepare with coding challenges and aptitude tests used by top recruiters in real scenarios."
//   },
//   {
//     icon: <FaBolt className="text-4xl text-indigo-600" />,
//     title: "Instant Feedback Loop",
//     description: "Get actionable, real-time feedback as you speak, code, or write to improve instantly."
//   },
//   {
//     icon: <FaGlobe className="text-4xl text-indigo-600" />,
//     title: "Anytime, Anywhere",
//     description: "Access from any device and practice in a distraction-free, simulated environment."
//   },
//   {
//     icon: <FaChartLine className="text-4xl text-indigo-600" />,
//     title: "Proven Success Rate",
//     description: "Thousands of candidates have boosted their interview performance with SimJob."
//   }
// ];

// const Benefits = () => {
//   useEffect(() => {
//     const cards = document.querySelectorAll(".benefit-card");
//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-up");
//           } else {
//             entry.target.classList.remove("animate-fade-up");
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );
//     cards.forEach(card => observer.observe(card));
//     return () => cards.forEach(card => observer.unobserve(card));
//   }, []);

//   return (
//     <section className="w-full bg-white flex justify-center items-center !py-16">
//       <div className="max-w-[1200px] w-full !px-4">
//         {/* Title */}
//         <div className="text-center !mb-12">
//           <h2 className="text-4xl font-bold text-gray-900">
//             Why Professionals Choose SimJob
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Benefits that make your preparation smarter, faster, and more effective.
//           </p>
//         </div>

//         {/* Benefits Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {benefitsData.map((benefit, index) => (
//             <div
//               key={index}
//               className="benefit-card opacity-0 transform translate-y-6 transition-all duration-700 bg-white shadow-md rounded-xl !p-6 hover:shadow-lg"
//             >
//               <div className="mb-4">{benefit.icon}</div>
//               <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
//               <p className="text-gray-600 mt-2">{benefit.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CSS Animation */}
//       <style>{`
//         @keyframes fadeUp {
//           0% {
//             opacity: 0;
//             transform: translateY(24px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fade-up {
//           opacity: 1 !important;
//           transform: translateY(0) !important;
//           animation: fadeUp 0.8s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Benefits;


import React, { useEffect, useRef } from "react";
import {
  FaRobot,
  FaCode,
  FaClock,
  FaLaptop,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaRobot className="text-4xl text-blue-500" />,
    title: "AI-Driven Personalization",
    description:
      "Practice interviews tailored to your role, skills, and experience level.",
  },
  {
    icon: <FaCode className="text-4xl text-green-500" />,
    title: "Real Company OA Tests",
    description:
      "Prepare with coding challenges and aptitude tests used by top recruiters.",
  },
  {
    icon: <FaClock className="text-4xl text-yellow-500" />,
    title: "Instant Feedback Loop",
    description:
      "Get real-time, actionable insights to improve on the spot.",
  },
  {
    icon: <FaLaptop className="text-4xl text-purple-500" />,
    title: "Anytime, Anywhere",
    description:
      "Practice from any device with a distraction-free interface.",
  },
  {
    icon: <FaChartLine className="text-4xl text-pink-500" />,
    title: "Proven Success Rate",
    description:
      "Thousands of job-seekers boosted their interview performance.",
  },
  {
    icon: <FaUsers className="text-4xl text-red-500" />,
    title: "Community Support",
    description:
      "Join a growing network of learners and share your journey.",
  },
];

const Benefits = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUp");
          } else {
            entry.target.classList.remove("animate-fadeUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current.querySelectorAll(".benefit-card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section className="w-full bg-gray-50 flex justify-center items-center !py-16">
      <div className="max-w-[1200px] w-full !px-6 flex flex-col items-center justify-center">
        {/* Title */}
        <div className="max-w-4xl mx-auto text-center !mb-12 lg:!mb-20 flex flex-col justify-center items-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold !mb-8 leading-tight">
            Why Professionals {" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose SimJob
            </span>
          </h2>
          <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
            Level up your interview preparation with AI-powered tools, tailored challenges, and instant insights—everything you need to land your dream job, all in one place.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card bg-white rounded-xl shadow-md !p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-xl opacity-0"
            >
              <div className="!mb-4 flex justify-center">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 !mt-2">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
