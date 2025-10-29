// import { useEffect, useRef, useState } from "react";
// import { useInterview } from "../hooks/useInterview";
// import {
//   Square,
//   Video,
//   VideoOff,
//   Camera,
//   Users,
//   MessageCircle,
// } from "lucide-react";
// import { CounterClock } from "../components/General/Clock";
// import { useSearchParams } from "react-router-dom";
// import SubmitModal from "../components/General/SubmitModal";
// import { CompleteScreen } from "../components/General/CompleteScreen";
// import { ClockContextProvider } from "../context/ClockContext";

// export const InterviewView = () => {
//   const [searchParams] = useSearchParams();
//   const interviewId = searchParams.get("interviewId");

//   const {
//     status,
//     transcripts,
//     provisionalTranscript,
//     isRecording,
//     isInitialized,
//     isAiSpeaking,
//     initialize,
//     endInterview,
//   } = useInterview(interviewId);

//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const [videoError, setVideoError] = useState(null);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showTips, setShowTips] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isEnded, setIsEnded] = useState(false);

//   useEffect(() => {
//     const setupCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { width: 1280, height: 720, facingMode: "user" },
//           audio: false,
//         });
//         streamRef.current = stream;
//         if (videoRef.current) videoRef.current.srcObject = stream;
//       } catch (err) {
//         console.error("Error accessing camera:", err);
//         let errorMessage = "Camera access was denied.";
//         if (err.name === "NotFoundError")
//           errorMessage = "No camera found. Please connect a camera and refresh.";
//         else if (err.name === "NotAllowedError")
//           errorMessage =
//             "Camera access denied. Please allow camera permissions and refresh.";
//         else if (err.name === "NotReadableError")
//           errorMessage = "Camera is being used by another application.";
//         setVideoError(errorMessage);
//       }
//     };

//     if (videoEnabled && videoRef.current) setupCamera();

//     return () => {
//       if (streamRef.current)
//         streamRef.current.getTracks().forEach((track) => track.stop());
//     };
//   }, [videoEnabled]);

//   useEffect(() => {
//     if (videoRef.current && streamRef.current)
//       videoRef.current.srcObject = streamRef.current;
//   }, [isInitialized]);

//   const handleStartInterview = async () => {
//     setIsLoading(true);
//     try {
//       await initialize();
//     } catch (error) {
//       console.error("Failed to initialize interview:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEndInterview = async () => {
//     try {
//       const time = localStorage.getItem(`interview-${interviewId}`);
//       await endInterview(time);
//     } catch (err) {
//       console.error("Error ending interview:", err);
//     } finally {
//       localStorage.removeItem(`interview-${interviewId}`);
//       setIsEnded(true);
//       setShowModal(false);
//     }
//   };

//   const getStatusColor = () => {
//     if (status?.includes("Error") || status?.includes("failed"))
//       return "text-red-400";
//     if (status?.includes("Connected") || status?.includes("Ready"))
//       return "text-emerald-400";
//     if (status?.includes("Listening")) return "text-blue-400";
//     if (status?.includes("Processing")) return "text-amber-400";
//     if (status?.includes("Disconnected")) return "text-gray-400";
//     return "text-gray-400";
//   };

//   const getRecordingIndicatorColor = () => {
//     if (isAiSpeaking) return "text-purple-400";
//     if (isRecording) return "text-red-400";
//     return "text-gray-400";
//   };

//   const getStatusMessage = () => {
//     if (isAiSpeaking) return "🤖 AI is asking a question...";
//     if (isRecording) {
//       if (status.includes("thinking"))
//         return "⏳ Take a moment to think, then start speaking...";
//       return "🎙️ Listening... Pause for 2 seconds when finished";
//     }
//     return "✨ Ready for your response";
//   };

//   const interviewTips = [
//     "You have to complete the interview in one setting",
//     "You are not able to resume this interview",
//     "Speak clearly and at a moderate pace",
//     "Look at the camera when speaking",
//     "Ensure good lighting on your face",
//     "Find a quiet environment",
//     "Take your time to think before answering",
//   ];

//   if (isEnded) {
//     return (
//       <CompleteScreen
//         title="Interview Completed Successfully"
//         description="Your Interview feedback and interview score will be available soon, after that you can check on your app dashboard. Also you will receive your results within 24 hours via email."
//       />
//     );
//   }

//   return (
//     <ClockContextProvider timerId={`interview-${interviewId}`}>
//       <div className="w-screen h-screen bg-white text-white">
//         {!isInitialized ? (
//           <div className="w-full h-full flex flex-col justify-center items-center !p-6 sm:!p-8">
//             <div className="text-center !mb-6 sm:!mb-8">
//               <div className="flex justify-center !mb-4">
//                 <div className="bg-blue-600 rounded-full !p-4">
//                   <Users className="h-8 w-8" />
//                 </div>
//               </div>
//               <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 !mb-4">
//                 AI Mock Interview
//               </h1>
//               <p className="text-base sm:text-lg text-gray-400 max-w-md sm:max-w-lg">
//                 Practice your interview skills with our AI interviewer.
//               </p>
//             </div>

//             <div className="w-full max-w-md sm:max-w-xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden !mb-6 sm:!mb-8 border border-gray-700">
//               {videoError ? (
//                 <div className="h-full flex flex-col justify-center items-center text-center text-gray-400 !p-6 sm:!p-8">
//                   <VideoOff />
//                   <h3 className="text-lg sm:text-xl font-semibold !mb-3 text-gray-300">
//                     Camera Setup Required
//                   </h3>
//                   <p className="text-gray-400 max-w-sm sm:max-w-md leading-relaxed !mb-4">
//                     {videoError}
//                   </p>
//                   <div className="flex flex-wrap justify-center !gap-3">
//                     <button
//                       onClick={() => window.location.reload()}
//                       className="!px-4 !py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
//                     >
//                       Refresh Page
//                     </button>
//                     <button
//                       onClick={() => setShowTips(!showTips)}
//                       className="!px-4 !py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
//                     >
//                       Help
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="relative h-full">
//                   <video
//                     ref={videoRef}
//                     className="w-full h-full object-cover transform -scale-x-100"
//                     autoPlay
//                     playsInline
//                     muted
//                   />
//                   <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center !gap-2 bg-black/50 rounded-full !px-3 !py-1 text-xs sm:text-sm">
//                     {videoEnabled ? (
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                     ) : (
//                       <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
//                     )}
//                     <span>Camera {videoEnabled ? "Active" : "Inactive"}</span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="flex flex-col items-center !gap-4 sm:!gap-6">
//               <div className="flex flex-col sm:flex-row items-center justify-center !gap-4 sm:!gap-6">
//                 <button
//                   onClick={() => setVideoEnabled(!videoEnabled)}
//                   className={`flex items-center justify-center !gap-2 !px-4 !py-2.5 rounded-lg font-medium transition-all cursor-pointer w-full sm:w-auto ${
//                     videoEnabled
//                       ? "bg-gray-700 hover:bg-gray-600 text-white"
//                       : "bg-red-600 hover:bg-red-700 text-white"
//                   }`}
//                 >
//                   {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
//                   {videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
//                 </button>

//                 <button
//                   onClick={handleStartInterview}
//                   disabled={!!videoError || isLoading}
//                   className="relative w-full sm:w-auto !px-6 !py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center justify-center !gap-3">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Starting...
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center !gap-3">
//                       <Camera size={24} />
//                       Begin Interview
//                     </div>
//                   )}
//                 </button>
//               </div>

//               <div className="text-center !mt-4">
//                 <button
//                   onClick={() => setShowTips(!showTips)}
//                   className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer"
//                 >
//                   {showTips ? "Hide Tips" : "Show Interview Tips"}
//                 </button>

//                 {showTips && (
//                   <div className="!mt-4 !p-4 sm:!p-6 bg-gray-800/50 rounded-xl border border-gray-700 max-w-sm sm:max-w-md mx-auto">
//                     <h4 className="font-semibold !mb-3">Tips for Success:</h4>
//                     <ul className="text-sm !space-y-2 text-left">
//                       {interviewTips.map((tip, index) => (
//                         <li key={index} className="flex items-start !gap-2">
//                           <span className="text-blue-400 !mt-0.5">•</span>
//                           {tip}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row w-full h-full">
//             {/* LEFT SIDE */}
//             <div className="w-full lg:w-[70%] h-full relative flex flex-col bg-black">
//               <div className="bg-gray-800 w-full !px-4 sm:!px-6 !py-3 sm:!py-4 flex flex-wrap items-center justify-between border-b border-gray-700 !gap-4">
//                 <div className="flex items-center !gap-4 sm:!gap-6">
//                   <div className="flex items-center !gap-3">
//                     <div className="relative">
//                       <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
//                       <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
//                     </div>
//                     <span className="font-semibold text-lg">Live</span>
//                   </div>
//                   <div className="flex items-center !gap-2 text-sm sm:text-lg font-mono bg-gray-700 !px-3 !py-1 rounded-lg">
//                     <CounterClock type="interview" id={interviewId} />
//                   </div>
//                 </div>

//                 <div className="flex items-center !gap-3">
//                   <button
//                     onClick={() => setVideoEnabled(!videoEnabled)}
//                     className={`!p-2.5 rounded-lg transition-all font-medium !px-4 cursor-pointer ${
//                       videoEnabled
//                         ? "bg-gray-700 hover:bg-gray-600 text-white"
//                         : "bg-red-600 hover:bg-red-700 text-white"
//                     }`}
//                   >
//                     {videoEnabled ? (
//                       <div className="flex items-center !gap-2">
//                         <Video size={18} />
//                         <span className="hidden sm:inline">On</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center !gap-2">
//                         <VideoOff size={18} />
//                         <span className="hidden sm:inline">Off</span>
//                       </div>
//                     )}
//                   </button>

//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="!px-4 !py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center !gap-2 cursor-pointer"
//                   >
//                     <Square size={14} />
//                     End
//                   </button>
//                 </div>
//               </div>

//               <div className="flex-1 relative bg-gray-950 overflow-hidden">
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="relative w-full max-w-3xl aspect-video">
//                     {videoEnabled ? (
//                       <video
//                         ref={videoRef}
//                         autoPlay
//                         muted
//                         playsInline
//                         className="w-full h-full object-cover transform -scale-x-100 rounded-lg"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700 !p-6 text-center">
//                         <div>
//                           <VideoOff
//                             size={48}
//                             className="!mx-auto !mb-3 text-gray-500"
//                           />
//                           <h3 className="text-lg sm:text-xl font-semibold text-gray-300 !mb-2">
//                             Camera Turned Off
//                           </h3>
//                           <p className="text-gray-500 text-sm sm:text-base">
//                             Your video is disabled but audio is still being
//                             recorded.
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2">
//                 <div
//                   className={`flex items-center !gap-3 !px-4 !py-2 rounded-full font-medium ${
//                     isRecording
//                       ? "bg-red-500/20 border border-red-500/30"
//                       : isAiSpeaking
//                       ? "bg-purple-500/20 border border-purple-500/30"
//                       : "bg-gray-500/20 border border-gray-500/30"
//                   }`}
//                 >
//                   {(isRecording || isAiSpeaking) && (
//                     <div
//                       className={`w-3 h-3 rounded-full animate-pulse ${
//                         isRecording ? "bg-red-400" : "bg-purple-400"
//                       }`}
//                     ></div>
//                   )}
//                   <span className={getRecordingIndicatorColor()}>
//                     {isAiSpeaking
//                       ? "AI Speaking"
//                       : isRecording
//                       ? "Recording Your Response"
//                       : "Waiting"}
//                   </span>
//                 </div>
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 !p-4 sm:!p-6">
//                 <div className="max-w-6xl mx-auto text-center">
//                   <p className="text-sm sm:text-lg text-gray-200 font-medium">
//                     {getStatusMessage()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="w-full lg:w-[30%] h-[50vh] lg:h-full bg-gray-800 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700">
//               <div className="!p-4 border-b border-gray-700 bg-gray-750">
//                 <div className="flex items-center !gap-3">
//                   <MessageCircle className="h-6 w-6 text-blue-400" />
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-200">
//                     Interview Conversation
//                   </h2>
//                 </div>
//                 <div className="flex justify-between items-center !pl-9 !pt-3 text-sm">
//                   <span className="text-gray-300">Status:</span>
//                   <span className={`${getStatusColor()}`}>{status}</span>
//                 </div>
//               </div>

//               <div className="flex-1 overflow-y-auto !p-4 sm:!p-6 !space-y-4 sm:!space-y-6 scrollbar-hide">
//                 {transcripts.length === 0 && !provisionalTranscript && (
//                   <div className="text-center text-gray-500 !pt-10 sm:!pt-20">
//                     <div className="text-3xl sm:text-4xl !mb-4">🎤</div>
//                     <h3 className="text-base sm:text-lg font-semibold !mb-2 text-gray-400">
//                       Interview Starting
//                     </h3>
//                     <p className="text-gray-500 text-sm sm:text-base">
//                       The AI interviewer will ask you questions shortly...
//                     </p>
//                   </div>
//                 )}

//                 {transcripts.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-start !gap-3 ${
//                       item.source === "user"
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     {item.source !== "user" && (
//                       <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center !mt-1">
//                         <span className="text-xs font-bold">AI</span>
//                       </div>
//                     )}

//                     <div
//                       className={`max-w-[80%] sm:max-w-[75%] !px-4 !py-3 rounded-2xl ${
//                         item.source === "user"
//                           ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none shadow-lg"
//                           : "bg-gray-700 text-gray-100 rounded-bl-none shadow-md"
//                       }`}
//                     >
//                       <p className="text-sm leading-relaxed">{item.text}</p>
//                     </div>

//                     {item.source === "user" && (
//                       <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center !mt-1">
//                         <span className="text-xs font-bold">You</span>
//                       </div>
//                     )}
//                   </div>
//                 ))}

//                 {provisionalTranscript && (
//                   <div className="flex items-start !gap-3 justify-end">
//                     <div className="max-w-[75%] !px-4 !py-3 rounded-2xl bg-blue-600/60 text-white rounded-br-none shadow-md border border-blue-400/30">
//                       <p className="text-sm leading-relaxed opacity-90">
//                         {provisionalTranscript}
//                       </p>
//                     </div>
//                     <div className="flex-shrink-0 w-8 h-8 bg-blue-600/60 rounded-full flex items-center justify-center !mt-1 border border-blue-400/30">
//                       <span className="text-xs font-bold">You</span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="!p-4 bg-gray-900/80 border-t border-gray-600 text-center">
//                 <div className="text-sm font-medium text-gray-300 !mb-1">
//                   {getStatusMessage()}
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   {isRecording &&
//                     !status.includes("thinking") &&
//                     "Speak clearly and pause when finished"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {showModal && (
//           <SubmitModal
//             title="End Interview"
//             description="Did you complete your interview? If not, you cannot resume this interview."
//             subDescription="You must complete this interview in one sitting."
//             setShowSubmitModal={setShowModal}
//             handleSubmit={handleEndInterview}
//           />
//         )}
//       </div>
//     </ClockContextProvider>
//   );
// };

import { useEffect, useRef, useState } from "react";
import { useInterview } from "../hooks/useInterview";
import {
  Square,
  Video,
  VideoOff,
  Camera,
  Users,
  MessageCircle,
} from "lucide-react";
import { CounterClock } from "../components/General/Clock";
import { useSearchParams } from "react-router-dom";
import SubmitModal from "../components/General/SubmitModal";
import { CompleteScreen } from "../components/General/CompleteScreen";
import { ClockContextProvider } from "../context/ClockContext";

export const InterviewView = () => {
  const [searchParams] = useSearchParams();
  const interviewId = searchParams.get("interviewId");

  const {
    status,
    transcripts,
    provisionalTranscript,
    isRecording,
    isInitialized,
    isAiSpeaking,
    initialize,
    endInterview,
  } = useInterview(interviewId);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [videoError, setVideoError] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720, facingMode: "user" },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera:", err);
        let errorMessage = "Camera access was denied.";
        if (err.name === "NotFoundError")
          errorMessage =
            "No camera found. Please connect a camera and refresh.";
        else if (err.name === "NotAllowedError")
          errorMessage =
            "Camera access denied. Please allow camera permissions and refresh.";
        else if (err.name === "NotReadableError")
          errorMessage = "Camera is being used by another application.";
        setVideoError(errorMessage);
      }
    };

    if (videoEnabled && videoRef.current) setupCamera();

    return () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, [videoEnabled]);

  useEffect(() => {
    if (videoRef.current && streamRef.current)
      videoRef.current.srcObject = streamRef.current;
  }, [isInitialized]);

  const handleStartInterview = async () => {
    setIsLoading(true);
    try {
      await initialize();
    } catch (error) {
      console.error("Failed to initialize interview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndInterview = async () => {
    try {
      const time = localStorage.getItem(`interview-${interviewId}`);
      await endInterview(time);
    } catch (err) {
      console.error("Error ending interview:", err);
    } finally {
      localStorage.removeItem(`interview-${interviewId}`);
      setIsEnded(true);
      setShowModal(false);
    }
  };

  const getStatusColor = () => {
    if (status?.includes("Error") || status?.includes("failed"))
      return "text-red-400";
    if (status?.includes("Connected") || status?.includes("Ready"))
      return "text-emerald-400";
    if (status?.includes("Listening")) return "text-blue-400";
    if (status?.includes("Processing")) return "text-amber-400";
    if (status?.includes("Disconnected")) return "text-gray-400";
    return "text-gray-400";
  };

  const getRecordingIndicatorColor = () => {
    if (isAiSpeaking) return "text-purple-400";
    if (isRecording) return "text-red-400";
    return "text-gray-400";
  };

  const getStatusMessage = () => {
    if (isAiSpeaking) return "🤖 AI is asking a question...";
    if (isRecording) {
      if (status.includes("thinking"))
        return "⏳ Take a moment to think, then start speaking...";
      return "🎙️ Listening... Pause for 2 seconds when finished";
    }
    return "✨ Ready for your response";
  };

  const interviewTips = [
    "You have to complete the interview in one setting",
    "You are not able to resume this interview",
    "Speak clearly and at a moderate pace",
    "Look at the camera when speaking",
    "Ensure good lighting on your face",
    "Find a quiet environment",
    "Take your time to think before answering",
  ];

  if (isEnded) {
    return (
      <CompleteScreen
        title="Interview Completed Successfully"
        description="Your Interview feedback and score will be available soon. You’ll also receive results within 24 hours via email."
      />
    );
  }

  return (
    <ClockContextProvider timerId={`interview-${interviewId}`}>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        {/* BEFORE INTERVIEW */}
        {!isInitialized ? (
          <div className="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/40 to-purple-900/40 animate-gradient opacity-90"></div>
            <div className="absolute -top-1/2 -left-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_top_left,_#3b82f6_0%,_transparent_60%)] opacity-30 animate-pulse-slow"></div>
            <div className="absolute -bottom-1/2 -right-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_bottom_right,_#8b5cf6_0%,_transparent_60%)] opacity-30 animate-pulse-slow"></div>

            {/* MAIN CONTAINER */}
            <div className="relative flex flex-col justify-center items-center text-center !p-4 sm:!p-8 lg:!p-12 !space-y-6 sm:!space-y-8 max-w-5xl w-full mx-auto z-10 animate-fadeIn">
              {/* HEADER */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full inline-flex justify-center items-center shadow-lg shadow-purple-500/30 !p-5 !mb-5 animate-bounce-slow">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 !mb-3 tracking-tight drop-shadow-md">
                  AI Mock Interview
                </h1>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  Sharpen your communication and problem-solving skills with our
                  interactive AI-powered interview platform.
                </p>
              </div>

              {/* VIDEO PREVIEW */}
              <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl aspect-video bg-gray-900/80 border border-gray-700/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md !mb-8 transition-all duration-300 hover:scale-[1.01]">
                {videoError ? (
                  <div className="flex flex-col items-center justify-center h-full !p-6 sm:!p-8 !space-y-4">
                    <VideoOff className="text-gray-500 h-10 w-10" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-200">
                      Camera Setup Required
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {videoError}
                    </p>
                    <div className="flex flex-wrap justify-center !gap-3">
                      <button
                        onClick={() => window.location.reload()}
                        className="!px-4 !py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all cursor-pointer"
                      >
                        Refresh
                      </button>
                      <button
                        onClick={() => setShowTips(!showTips)}
                        className="cursor-pointer !px-4 !py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                      >
                        Help
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover transform -scale-x-100"
                      autoPlay
                      playsInline
                      muted
                    />
                    <div className="absolute top-3 left-3 bg-black/50 rounded-full flex items-center !gap-2 !px-3 !py-1 text-xs sm:text-sm backdrop-blur-md">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          videoEnabled ? "bg-green-400" : "bg-red-400"
                        } animate-pulse`}
                      ></div>
                      <span>Camera {videoEnabled ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-center items-center !gap-4 sm:!gap-6">
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`cursor-pointer flex items-center justify-center !gap-2 !px-5 !py-2.5 rounded-lg font-medium w-full sm:w-auto transition-all duration-300 ${
                    videoEnabled
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                  {videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
                </button>

                <button
                  onClick={handleStartInterview}
                  disabled={!!videoError || isLoading}
                  className="cursor-pointer relative w-full sm:w-auto !px-6 !py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center !gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Starting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center !gap-3">
                      <Camera size={22} />
                      Begin Interview
                    </div>
                  )}
                </button>
              </div>

              {/* TIPS SECTION */}
              <div className="!mt-4 text-center">
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="cursor-pointer text-blue-400 hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
                >
                  {showTips ? "Hide Tips" : "Show Interview Tips"}
                </button>

                {showTips && (
                  <div className="!mt-5 !p-5 sm:!p-6 bg-gray-800/60 rounded-2xl border border-gray-700/70 max-w-sm sm:max-w-md mx-auto backdrop-blur-md shadow-lg">
                    <h4 className="font-semibold !mb-3 text-purple-300 text-lg">
                      Tips for Success
                    </h4>
                    <ul className="text-sm !space-y-2 text-left text-gray-300">
                      {interviewTips.map((tip, i) => (
                        <li key={i} className="flex items-start !gap-2">
                          <span className="text-blue-400 !mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
              @keyframes gradient {
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
              .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 10s ease infinite;
              }
              .animate-pulse-slow {
                animation: pulse 5s infinite ease-in-out;
              }
              .animate-bounce-slow {
                animation: bounce 3s infinite ease-in-out;
              }
              .animate-fadeIn {
                animation: fadeIn 1.2s ease-in-out;
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(15px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </div>
        ) : (
          // INTERVIEW ACTIVE
          <div className="flex flex-col lg:flex-row h-screen">
            {/* VIDEO PANEL */}
            <div className="flex-1 bg-black flex flex-col relative">
              <div className="bg-gray-900/90 border-b border-gray-800 flex flex-wrap items-center justify-between !px-4 sm:!px-6 !py-3 sm:!py-4 !gap-3">
                <div className="flex items-center !gap-4">
                  <div className="flex items-center !gap-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="font-semibold text-sm sm:text-base">
                      Live
                    </span>
                  </div>
                  <div>
                    <CounterClock type="interview" id={interviewId} />
                  </div>
                </div>

                <div className="flex items-center !gap-3">
                  <button
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className={`flex items-center !gap-2 !px-2 !py-1.5 md:!px-4 md:!py-2 rounded-lg font-medium transition-all ${
                      videoEnabled
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {videoEnabled ? (
                      <Video size={18} />
                    ) : (
                      <VideoOff size={18} />
                    )}
                    <span className="hidden sm:inline">
                      {videoEnabled ? "On" : "Off"}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center !gap-2 !px-2 !py-1.5 md:!px-4 md:!py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
                  >
                    <Square size={14} />
                    End
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center bg-gray-950 relative">
                <div className="w-full max-w-4xl aspect-video">
                  {videoEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-lg transform -scale-x-100"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex flex-col justify-center items-center border border-gray-700 rounded-lg !p-6 text-center">
                      <VideoOff className="text-gray-500 !mb-3" size={40} />
                      <h3 className="font-semibold text-gray-300 !mb-2">
                        Camera Turned Off
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base">
                        Your video is disabled, but audio is still active.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 !p-4 sm:!p-6 text-center bg-gradient-to-t from-black/70 via-transparent">
                <p className="text-sm sm:text-lg text-gray-200 font-medium">
                  {getStatusMessage()}
                </p>
              </div>
            </div>

            {/* CHAT PANEL */}
            <div className="w-full lg:w-[35%] h-[50vh] lg:h-full bg-gray-900 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col">
              <div className="!p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center !gap-3">
                  <MessageCircle className="text-blue-400 h-6 w-6" />
                  <h2 className="font-semibold text-gray-200 text-lg sm:text-xl">
                    Conversation
                  </h2>
                </div>
                <span className={`${getStatusColor()} text-sm`}>{status}</span>
              </div>

              <div className="flex-1 overflow-y-auto !p-4 sm:!p-6 !space-y-4 scrollbar-hide">
                {transcripts.length === 0 && !provisionalTranscript && (
                  <div className="text-center text-gray-500 !pt-12 sm:!pt-16">
                    <div className="text-3xl sm:text-4xl !mb-4">🎤</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-400 !mb-2">
                      Interview Starting
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      The AI interviewer will begin shortly...
                    </p>
                  </div>
                )}

                {transcripts.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start !gap-3 ${
                      item.source === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {item.source !== "user" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center !mt-1">
                        <span className="text-xs font-bold">AI</span>
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[75%] !px-4 !py-3 rounded-2xl ${
                        item.source === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                          : "bg-gray-800 text-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{item.text}</p>
                    </div>

                    {item.source === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center !mt-1">
                        <span className="text-xs font-bold">You</span>
                      </div>
                    )}
                  </div>
                ))}

                {provisionalTranscript && (
                  <div className="flex items-start !gap-3 justify-end">
                    <div className="max-w-[75%] !px-4 !py-3 bg-blue-600/60 text-white rounded-2xl rounded-br-none border border-blue-400/30">
                      <p className="text-sm leading-relaxed opacity-90">
                        {provisionalTranscript}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600/60 border border-blue-400/30 rounded-full flex items-center justify-center !mt-1">
                      <span className="text-xs font-bold">You</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <SubmitModal
            title="End Interview"
            description="Are you sure you want to end this session? You cannot resume it once ended."
            subDescription="You must complete this interview in one sitting."
            setShowSubmitModal={setShowModal}
            handleSubmit={handleEndInterview}
          />
        )}
      </div>
    </ClockContextProvider>
  );
};
