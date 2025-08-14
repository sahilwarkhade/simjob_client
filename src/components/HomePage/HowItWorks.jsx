// import React, { useEffect, useState } from "react";
// import { FaUserTie, FaLaptopCode, FaBolt, FaChartLine } from "react-icons/fa";

// const HowItWorks = () => {
//   const steps = [
//     {
//       icon: <FaUserTie className="text-blue-500 text-5xl" />,
//       title: "Pick Your Role & Goal",
//       description:
//         "Select your target role, industry, and interview type — from technical coding to HR and aptitude."
//     },
//     {
//       icon: <FaLaptopCode className="text-green-500 text-5xl" />,
//       title: "Experience a True-to-Life Interview",
//       description:
//         "Our AI simulates real recruiters and test platforms so you can practice coding, problem-solving, and communication under realistic conditions."
//     },
//     {
//       icon: <FaBolt className="text-yellow-500 text-5xl" />,
//       title: "Improve as You Go",
//       description:
//         "AI evaluates your performance in real time — spotting strengths, highlighting mistakes, and giving specific suggestions to improve instantly."
//     },
//     {
//       icon: <FaChartLine className="text-purple-500 text-5xl" />,
//       title: "Measure. Refine. Succeed.",
//       description:
//         "Monitor your improvement with detailed analytics and be fully prepared when it’s time for the actual interview."
//     }
//   ];

//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     let timeout = setTimeout(() => {
//       setProgress(100); // animate the line to full width
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <section className="relative bg-gradient-to-b from-gray-50 to-white !!py-24">
//       {/* Decorative glow */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-1/3 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-150"></div>
//       </div>

//       <div className="relative w-[1200px] max-w-full mx-auto !!px-6 text-center">
//         {/* Heading */}
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 !!mb-6">
//           How SimJob Prepares You for Success
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto !!mb-20">
//           From sign-up to success, every step is designed to make you interview-ready.
//         </p>

//         {/* Line Animation */}
//         <div className="relative">
//           <div className="absolute top-[60px] left-0 right-0 h-1 bg-gray-200 z-0"></div>
//           <div
//             className="absolute top-[60px] left-0 h-1 bg-blue-500 z-10 transition-all duration-[1500ms] ease-out"
//             style={{ width: `${progress}%` }}
//           ></div>

//           {/* Steps */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-20">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 className="!p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1"
//               >
//                 <div className="flex justify-center !!mb-6">{step.icon}</div>
//                 <h3 className="text-xl font-semibold text-gray-900 !!mb-3">
//                   {step.title}
//                 </h3>
//                 <p className="text-gray-600">{step.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;


// import React, { useEffect, useState, useRef } from "react";
// import { User, Code, Zap, TrendingUp } from "lucide-react";

// const HowItWorks = () => {
//   const steps = [
//     {
//       icon: <User className="text-blue-500 w-10 h-10" />,
//       title: "Pick Your Role & Goal",
//       description:
//         "Select your target role, industry, and interview type — from technical coding to HR and aptitude.",
//     },
//     {
//       icon: <Code className="text-green-500 w-10 h-10" />,
//       title: "Experience a True-to-Life Interview",
//       description:
//         "Our AI simulates real recruiters and test platforms so you can practice coding, problem-solving, and communication under realistic conditions.",
//     },
//     {
//       icon: <Zap className="text-yellow-500 w-10 h-10" />,
//       title: "Improve as You Go",
//       description:
//         "AI evaluates your performance in real time — spotting strengths, highlighting mistakes, and giving specific suggestions to improve instantly.",
//     },
//     {
//       icon: <TrendingUp className="text-purple-500 w-10 h-10" />,
//       title: "Measure. Refine. Succeed.",
//       description:
//         "Monitor your improvement with detailed analytics and be fully prepared when it's time for the actual interview.",
//     },
//   ];

//   const [activeStep, setActiveStep] = useState(0);
//   const [visibleSteps, setVisibleSteps] = useState(new Set());
//   const stepRefs = useRef([]);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observerOptions = {
//       root: null,
//       rootMargin: "-20% 0px -20% 0px",
//       threshold: 0.3,
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const stepIndex = stepRefs.current.indexOf(entry.target);
        
//         if (entry.isIntersecting && stepIndex !== -1) {
//           setActiveStep(stepIndex);
//           setVisibleSteps(prev => new Set([...prev, stepIndex]));
//         }
//       });
//     }, observerOptions);

//     // Observe all step elements
//     stepRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       stepRefs.current.forEach((ref) => {
//         if (ref) observer.unobserve(ref);
//       });
//     };
//   }, []);

//   const getProgressHeight = () => {
//     if (activeStep === 0) return "25%";
//     if (activeStep === 1) return "50%";
//     if (activeStep === 2) return "75%";
//     return "100%";
//   };

//   return (
//     <section 
//       ref={sectionRef}
//       className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 !!py-24 overflow-hidden"
//     >
//       {/* Background decoration */}
//       <div className="absolute inset-0 opacity-30">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto !!px-6">
//         {/* Section Header */}
//         <div className="text-center !!mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 !!mb-4">
//             How It Works
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Master your interview skills with our AI-powered platform in four simple steps
//           </p>
//         </div>

//         <div className="relative">
//           {/* Vertical Progress Bar */}
//           <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center">
//             {/* Background line */}
//             <div className="absolute top-16 bottom-16 w-1 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full"></div>
            
//             {/* Animated progress line */}
//             <div
//               className="absolute top-16 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
//               style={{ height: `calc(${getProgressHeight()} - 4rem)` }}
//             ></div>

//             {/* Step indicators */}
//             <div className="relative z-10 flex flex-col !space-y-16 !pt-8">
//               {steps.map((_, index) => (
//                 <div key={index} className="w-12 h-12"></div>
//               ))}
//             </div>
//           </div>

//           {/* Steps Content */}
//           <div className="!ml-24 !space-y-16">
//             {steps.map((step, index) => (
//               <div
//                 key={index}
//                 ref={(el) => (stepRefs.current[index] = el)}
//                 className={`group relative transform transition-all duration-700 ease-out ${
//                   visibleSteps.has(index)
//                     ? "translate-y-0 opacity-100"
//                     : "translate-y-12 opacity-0"
//                 }`}
//                 style={{
//                   transitionDelay: `${index * 150}ms`,
//                 }}
//               >
//                 {/* Step Number Badge - positioned in front */}
//                 <div className="absolute -left-20 top-8 z-20">
//                   <div
//                     className={`flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-500 ease-out transform ${
//                       index <= activeStep
//                         ? "bg-gradient-to-br from-blue-500 to-purple-500 border-white shadow-xl scale-110"
//                         : "bg-white border-gray-300 hover:border-gray-400 shadow-md"
//                     }`}
//                   >
//                     {/* Pulse animation for active step */}
//                     {index === activeStep && (
//                       <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
//                     )}
                    
//                     {/* Step number or checkmark */}
//                     {index < activeStep ? (
//                       <svg
//                         className="w-6 h-6 text-white"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={3}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     ) : (
//                       <span className={`text-lg font-bold ${index <= activeStep ? 'text-white' : 'text-gray-500'}`}>
//                         {index + 1}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Step card */}
//                 <div
//                   className={`relative !p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ${
//                     index === activeStep
//                       ? "border-blue-200 ring-2 ring-blue-100"
//                       : "border-gray-100 hover:border-blue-100"
//                   }`}
//                 >
//                   {/* Gradient overlay for active step */}
//                   {index === activeStep && (
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl"></div>
//                   )}

//                   <div className="relative z-10">
//                     {/* Icon with enhanced animation */}
//                     <div className="!!mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
//                       <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
//                         {React.cloneElement(step.icon, {
//                           className: `${step.icon.props.className} transition-colors duration-300`,
//                         })}
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <h3 className="text-2xl font-bold text-gray-900 !!mb-3 group-hover:text-blue-600 transition-colors duration-300">
//                       {step.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed text-lg">
//                       {step.description}
//                     </p>
//                   </div>

//                   {/* Hover effect background */}
//                   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Call to action */}
//         <div className="text-center !!mt-16">
//           <button className="!!px-8 !!py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
//             Start Your Interview Journey
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;


import React, { useEffect, useState, useRef } from "react";
import { User, Code, Zap, TrendingUp } from "lucide-react";

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
            {/* <h2 className="text-4xl font-extrabold text-gray-900 !mb-4">
                How We Help You Ace Every Interview
            </h2> */}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-800 font-bold !mb-8 leading-tight">
                How We Help You{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ace Every Interview
                </span>
            </h2>
            <p className="font-medium text-gray-400 text-sm sm:text-lg !px-4 sm:!px-8 leading-relaxed mx-auto">
                Master your interview skills with our AI-powered platform in four simple steps
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
            <button className="!px-8 !py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer">
                Start Your Interview Journey
            </button>
            </div>
        </div>
        </section>
    );
    };

    export default HowItWorks;
