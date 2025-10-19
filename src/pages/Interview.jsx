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
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [showTips, setShowTips] = useState(false);
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
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        let errorMessage = "Camera access was denied.";
        if (err.name === "NotFoundError") {
          errorMessage =
            "No camera found. Please connect a camera and refresh.";
        } else if (err.name === "NotAllowedError") {
          errorMessage =
            "Camera access denied. Please allow camera permissions and refresh.";
        } else if (err.name === "NotReadableError") {
          errorMessage = "Camera is being used by another application.";
        }
        setVideoError(errorMessage);
      }
    };

    if (videoEnabled && videoRef.current) {
      setupCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoEnabled]);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
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
      if (status.includes("thinking")) {
        return "⏳ Take a moment to think, then start speaking...";
      }
      return "🎙️ Listening... Pause for 2 seconds when finished";
    }
    return "✨ Ready for your response";
  };

  // Tips for better interview performance
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
        title={"Interview Completed Successfully"}
        description={
          "Your Interview feedback and interview score will be available soon, after that you can check on your app dashboard. Also you will receive your results within 24 hours via email."
        }
      />
    );
  }
  return (
    <ClockContextProvider timerId={`interview-${interviewId}`}>
      <div className="w-screen h-screen bg-white text-white">
        {!isInitialized ? (
          <div className="w-full h-full flex flex-col justify-center items-center !p-8">
            {/* Header */}
            <div className="text-center !mb-8">
              <div className="flex justify-center !mb-4">
                <div className="bg-blue-600 rounded-full !p-4">
                  <Users className="h-8 w-8" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-800  !mb-4">
                AI Mock Interview
              </h1>
              <p className="text-lg text-gray-400 max-w-lg">
                Practice your interview skills with our AI interviewer.
              </p>
            </div>

            {/* Camera Preview */}
            <div className="w-full max-w-xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden !mb-8 border border-gray-700">
              {videoError ? (
                <div className="h-full flex flex-col justify-center items-center text-center text-gray-400 !p-8">
                  <VideoOff />
                  <h3 className="text-xl font-semibold !mb-3 text-gray-300">
                    Camera Setup Required
                  </h3>
                  <p className="text-gray-400 max-w-md leading-relaxed !mb-4">
                    {videoError}
                  </p>
                  <div className="flex !gap-3">
                    <button
                      onClick={() => window.location.reload()}
                      className="!px-4 !py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                    >
                      Refresh Page
                    </button>
                    <button
                      onClick={() => setShowTips(!showTips)}
                      className="!px-4 !py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
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
                  <div className="absolute top-4 left-4 flex items-center !gap-2 bg-black/50 rounded-full !px-3 !py-1 text-sm">
                    {videoEnabled ? (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    )}
                    <span>Camera {videoEnabled ? "Active" : "Inactive"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls and Tips */}
            <div className="flex flex-col items-center !gap-6">
              {/* Video Toggle */}
              <div className="flex items-center !gap-4">
                <button
                  onClick={() => setVideoEnabled(!videoEnabled)}
                  className={`flex items-center !gap-2 !px-4 !py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                    videoEnabled
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                  {videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
                </button>

                {/* Start Button */}
                <button
                  onClick={handleStartInterview}
                  disabled={!!videoError || isLoading}
                  className="relative !px-6 !py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-101 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:hover:from-blue-600 disabled:hover:to-purple-600 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center !gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Starting Interview...
                    </div>
                  ) : (
                    <div className="flex items-center !gap-3">
                      <Camera size={24} />
                      Begin Interview
                    </div>
                  )}
                </button>
              </div>

              {/* Tips Section */}
              <div className="text-center">
                <button
                  onClick={() => setShowTips(!showTips)}
                  className="text-blue-400 hover:text-blue-300 font-medium underline cursor-pointer"
                >
                  {showTips ? "Hide Tips" : "Show Interview Tips"}
                </button>

                {showTips && (
                  <div className="!mt-4 !p-6 bg-gray-800/50 rounded-xl border border-gray-700 max-w-md">
                    <h4 className="font-semibold !mb-3">Tips for Success:</h4>
                    <ul className="text-sm !space-y-2 text-left">
                      {interviewTips.map((tip, index) => (
                        <li key={index} className="flex items-start !gap-2">
                          <span className="text-blue-400 !mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full h-full">
            <div className="w-[70%] h-full relative flex flex-col bg-black">
              {/* Enhanced Top Bar */}
              <div className="bg-gray-800 w-full !px-6 !py-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center !gap-6">
                  <div className="flex items-center !gap-3">
                    <div className="relative">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="font-semibold text-lg">Live</span>
                  </div>
                  <div className="flex items-center !gap-2 text-lg font-mono bg-gray-700 !px-3 !py-1 rounded-lg">
                    {/* <Clock size={16} />
                  00:00 */}
                    <CounterClock type={"interview"} id={interviewId} />
                  </div>
                </div>

                <div className="flex items-center !gap-3">
                  <button
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className={`!p-2.5 rounded-lg transition-all font-medium !px-4 cursor-pointer ${
                      videoEnabled
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {videoEnabled ? (
                      <div className="flex items-center !gap-2">
                        <Video size={18} />
                        <span className="hidden sm:inline">On</span>
                      </div>
                    ) : (
                      <div className="flex items-center !gap-2">
                        <VideoOff size={18} />
                        <span className="hidden sm:inline">Off</span>
                      </div>
                    )}
                  </button>
                  <button
                    className="!px-4 !py-2.5 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center !gap-2 cursor-pointer"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <Square size={14} />
                    End Interview
                  </button>
                </div>
              </div>

              {/* Video Area */}
              <div className="flex-1 relative bg-gray-950 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-4xl aspect-video">
                    {videoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover transform -scale-x-100 rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                        <div className="text-center">
                          <VideoOff
                            size={64}
                            className="!mx-auto !mb-4 text-gray-500"
                          />
                          <h3 className="text-xl font-semibold !mb-2 text-gray-300">
                            Camera Turned Off
                          </h3>
                          <p className="text-gray-500">
                            Your video is disabled but audio is still being
                            recorded
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Status Bar */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2">
                <div
                  className={`flex items-center !gap-3 !px-4 !py-2 rounded-full font-medium ${
                    isRecording
                      ? "bg-red-500/20 border border-red-500/30"
                      : isAiSpeaking
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : "bg-gray-500/20 border border-gray-500/30"
                  }`}
                >
                  {isRecording && (
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  )}
                  {isAiSpeaking && (
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  )}
                  <span className={getRecordingIndicatorColor()}>
                    {isAiSpeaking
                      ? "AI Speaking"
                      : isRecording
                      ? "Recording Your Response"
                      : "Waiting"}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 !p-6">
                <div className="max-w-7xl mx-auto">
                  {/* Status Message */}
                  <div className="text-center">
                    <p className="text-lg text-gray-200 font-medium">
                      {getStatusMessage()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[30%] h-full bg-gray-800 flex flex-col border-l border-gray-700">
              <div className="!p-4 border-b border-gray-700 bg-gray-750">
                <div className="flex items-center !gap-3">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-200">
                    Interview Conversation
                  </h2>
                </div>
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-center !pl-9 !pt-3">
                    <div className="flex items-center !gap-x-4 text-sm">
                      <span className="text-gray-300">Interview Status:</span>
                      <span className={`${getStatusColor()}`}>{status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto !p-6 !space-y-6 scrollbar-hide">
                {transcripts.length === 0 && !provisionalTranscript && (
                  <div className="text-center text-gray-500 !pt-20">
                    <div className="text-4xl !mb-4">🎤</div>
                    <h3 className="text-lg font-semibold !mb-2 text-gray-400">
                      Interview Starting
                    </h3>
                    <p className="text-gray-500">
                      The AI interviewer will ask you questions shortly...
                    </p>
                  </div>
                )}

                {transcripts.map((item, index) => (
                  <div
                    key={index}
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
                      className={`max-w-[75%] !px-4 !py-3 rounded-2xl ${
                        item.source === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none shadow-lg"
                          : "bg-gray-700 text-gray-100 rounded-bl-none shadow-md"
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
                    <div className="max-w-[75%] !px-4 !py-3 rounded-2xl bg-blue-600/60 text-white rounded-br-none shadow-md border border-blue-400/30">
                      <p className="text-sm leading-relaxed opacity-90">
                        {provisionalTranscript}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600/60 rounded-full flex items-center justify-center !mt-1 border border-blue-400/30">
                      <span className="text-xs font-bold">You</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Footer */}
              <div className="!p-4 bg-gray-900/80 border-t border-gray-600">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-300 !mb-1">
                    {getStatusMessage()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isRecording &&
                      !status.includes("thinking") &&
                      "Speak clearly and pause when finished"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <SubmitModal
            title={"End Interview"}
            description={
              "Did you complete your interview? If not you are not able resume this interview"
            }
            subDescription={
              "You have to complete this interview in one sitting"
            }
            setShowSubmitModal={setShowModal}
            handleSubmit={handleEndInterview}
          />
        )}
      </div>
    </ClockContextProvider>
  );
};
