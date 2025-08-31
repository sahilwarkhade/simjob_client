import React, { useState, useEffect, useRef } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorStop,
  MessageSquare,
  Send,
  Clock,
  User,
  Briefcase,
  ChevronRight,
  Play,
  Square,
  Volume2,
  Settings,
  BookOpen,
  BarChart3,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

export const InterviewView = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isInterviewActive, setIsInterviewActive] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [interviewTime, setInterviewTime] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(true);

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  // Sample interview questions by category
  const interviewQuestions = {
    technical: [
      "Can you explain the difference between synchronous and asynchronous programming?",
      "How would you optimize a slow-performing database query?",
      "Describe your experience with microservices architecture.",
      "Walk me through how you would design a scalable system.",
    ],
    behavioral: [
      "Tell me about a time you had to meet a tight deadline.",
      "Describe a situation where you had to work with a difficult team member.",
      "How do you prioritize tasks when everything seems urgent?",
      "Give an example of when you took initiative on a project.",
    ],
    situational: [
      "How would you handle a production outage during peak hours?",
      "What would you do if you disagreed with your manager's technical decision?",
      "How would you approach learning a new technology quickly?",
      "Describe how you would mentor a junior developer.",
    ],
  };

  useEffect(() => {
    if (isInterviewActive) {
      intervalRef.current = setInterval(() => {
        setInterviewTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInterviewActive]);

  useEffect(() => {
    if (videoEnabled && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, microphone : true})
        .then((stream) => {
            console.log("stream :: ", stream)
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.log("Video access denied"));
    }
  }, [videoEnabled]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  //   const startInterview = () => {
  //     if (!selectedRole) {
  //       alert("Please select a job role first");
  //       return;
  //     }
  //     setIsInterviewActive(true);
  //     setIsRecording(true);
  //     setCurrentView("interview");
  //     // Simulate AI asking first question
  //     setTimeout(() => {
  //       const firstQuestion = interviewQuestions.behavioral[0];
  //       setCurrentQuestion(firstQuestion);
  //       setChatMessages([
  //         {
  //           type: "ai",
  //           content:
  //             "Hello! I'm your AI interviewer today. Let's begin with your mock interview.",
  //           timestamp: new Date(),
  //         },
  //         { type: "ai", content: firstQuestion, timestamp: new Date() },
  //       ]);
  //     }, 1000);
  //   };

  const endInterview = () => {
    setIsInterviewActive(false);
    setIsRecording(false);
    setCurrentView("feedback");
    setInterviewTime(0);
  };

  const submitAnswer = () => {
    if (!userAnswer.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { type: "user", content: userAnswer, timestamp: new Date() },
    ]);

    // Simulate AI response and next question
    setTimeout(() => {
      const categories = Object.keys(interviewQuestions);
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const questions = interviewQuestions[randomCategory];
      const nextQuestion =
        questions[Math.floor(Math.random() * questions.length)];

      setChatMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Great answer! Let me ask you another question.",
          timestamp: new Date(),
        },
        { type: "ai", content: nextQuestion, timestamp: new Date() },
      ]);
      setCurrentQuestion(nextQuestion);
    }, 1500);

    setUserAnswer("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Main Interview Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-gray-800 !px-6 !py-4 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center !gap-4">
              <div className="flex items-center !gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Recording</span>
              </div>
              <div className="text-xl font-mono">
                {formatTime(interviewTime)}
              </div>
            </div>

            <div className="flex items-center !gap-3">
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`!p-3 rounded-lg transition-all ${
                  videoEnabled
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`!p-3 rounded-lg transition-all ${
                  audioEnabled
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button
                onClick={() => setScreenShareEnabled(!screenShareEnabled)}
                className={`!p-3 rounded-lg transition-all ${
                  screenShareEnabled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {screenShareEnabled ? (
                  <MonitorStop size={20} />
                ) : (
                  <Monitor size={20} />
                )}
              </button>
              <button
                onClick={endInterview}
                className="!px-6 !py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center !gap-2"
              >
                <Square size={16} />
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
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff
                        size={48}
                        className="!mx-auto !mb-4 text-gray-600"
                      />
                      <p className="text-gray-500">Camera is turned off</p>
                    </div>
                  </div>
                )}

                {/* AI Interviewer Avatar */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
                  <div className="text-white">
                    <Volume2 size={32} className="animate-pulse" />
                    <p className="text-xs !mt-2 font-medium">AI Interviewer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Question Display */}
            {currentQuestion && (
              <div className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-95 backdrop-blur rounded-lg !p-4 max-w-3xl !mx-auto">
                <div className="flex items-start !gap-3">
                  <MessageSquare className="text-blue-500 !mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-400 !mb-1">
                      Current Question:
                    </p>
                    <p className="text-lg">{currentQuestion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="!p-4 border-b border-gray-700">
            <h3 className="font-semibold text-lg">Interview Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto !p-4 !space-y-4">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs !px-4 !py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs !mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="!p-4 border-t border-gray-700">
            <div className="flex !gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && submitAnswer()}
                placeholder="Type your answer..."
                className="flex-1 !px-4 !py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={submitAnswer}
                className="!p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
