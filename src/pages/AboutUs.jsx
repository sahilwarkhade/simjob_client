import React, { useState, useEffect, useContext } from 'react';
import { Mic, Brain, Zap, Target, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate=useNavigate();
  const {token}=useContext(AuthContext)
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Mic className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real-Time Voice Interaction",
      description: "Practice with our AI interviewer using your microphone - just like a real interview experience."
    },
    {
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "AI-Powered Feedback",
      description: "Get instant, honest feedback with no sugar coating. Real insights to improve your performance."
    },
    {
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Company-Specific Practice",
      description: "Tailored questions and scenarios based on your target company's interview patterns."
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Instant Analysis",
      description: "Receive immediate performance analysis and improvement suggestions after each session."
    }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "We believe in genuine feedback that helps you grow, not empty praise."
    },
    {
      title: "Innovation",
      description: "Pioneering real-time AI interview simulation that bridges the gap between practice and reality."
    },
    {
      title: "Accessibility",
      description: "Making quality interview preparation available to everyone, anywhere, anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20 lg:!py-32 text-center flex items-center justify-center flex-col">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 !mb-4 sm:!mb-6 tracking-tight">
            About <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">SimJob</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 !mb-6 sm:!mb-8 max-w-4xl mx-auto leading-relaxed !px-4">
            Revolutionizing interview preparation with AI-powered mock interviews that feel real
          </p>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full !px-6 sm:!px-8 !py-3 border border-gray-200 shadow-lg">
              <span className="text-gray-800 font-medium text-sm sm:text-base">🎯 Real Practice • Real Results • Real Success</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl border border-gray-100 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-6 sm:!mb-8 text-center">
            Our <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Story</span>
          </h2>
          
          <div className="!space-y-6 text-gray-700">
            <p className="text-lg sm:text-xl leading-relaxed">
              We noticed a critical gap in the interview preparation market. While countless platforms offered either peer-to-peer mockups or text-based practice, none provided the <strong className="text-indigo-600">real-time, voice-interactive experience</strong> that truly mirrors actual interviews.
            </p>
            
            <p className="text-base sm:text-lg leading-relaxed">
              That's when SimJob was born. We envisioned a platform where candidates could practice with an AI interviewer that asks questions just like a human would, where you respond using your voice, and receive immediate, honest feedback that actually helps you improve.
            </p>
            
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 !mt-8 border-l-4 border-indigo-500">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center flex-wrap">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 flex-shrink-0" />
                Why SimJob is Different
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Unlike other platforms that focus on scripted responses or peer feedback, SimJob delivers <strong className="text-indigo-600">AI-powered, real-time conversational practice</strong> with company-specific scenarios and brutally honest feedback that accelerates your growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Solution */}
      <div className="bg-gradient-to-br from-gray-50 to-indigo-50 !py-16 sm:!py-20">
        <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 !mb-6">
                  The <span className="text-red-500">Problem</span> We Solved
                </h2>
                <div className="!space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full !mt-2 sm:!mt-3 !mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base">Most platforms only offer peer-to-peer or text-based practice</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full !mt-2 sm:!mt-3 !mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base">Generic feedback that doesn't help improve specific weaknesses</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full !mt-2 sm:!mt-3 !mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base">No real-time voice interaction to simulate actual interview conditions</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 !mb-6">
                  Our <span className="text-green-500">Solution</span>
                </h2>
                <div className="!space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 !mt-1 !mr-4 flex-shrink-0" />
                    <p className="text-sm sm:text-base">AI interviewer that conducts real-time voice conversations</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 !mt-1 !mr-4 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Instant, honest feedback with actionable improvement suggestions</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 !mt-1 !mr-4 flex-shrink-0" />
                    <p className="text-sm sm:text-base">Company-specific OA practice and interview scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
          What Makes Us <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Unique</span>
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-white to-indigo-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center !mb-4 sm:!mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl !p-2 sm:!p-3 1mr-3 sm:1mr-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 !py-16 sm:!py-20">
        <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-8 sm:!mb-12 text-center">
              Powered by <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Advanced AI</span>
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 !mb-6">How SimJob Works</h3>
                <div className="!space-y-4 sm:!space-y-6">
                  <div className="flex items-start">
                    <div className="bg-indigo-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center !mr-4 flex-shrink-0 text-sm sm:text-base font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 !mb-1">Choose Your Target</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Select your target company and role for customized practice</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center !mr-4 flex-shrink-0 text-sm sm:text-base font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 !mb-1">Start Voice Conversation</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Begin real-time conversation with our AI interviewer</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-pink-500 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center !mr-4 flex-shrink-0 text-sm sm:text-base font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 !mb-1">Get Honest Feedback</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Receive instant, actionable feedback and improvement tips</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-indigo-600 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center !mr-4 flex-shrink-0 text-sm sm:text-base font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 !mb-1">Track & Improve</h4>
                      <p className="text-gray-700 text-sm sm:text-base">Monitor your progress and refine your skills continuously</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 !mb-4 sm:!mb-6">Why Choose SimJob?</h4>
                <div className="!space-y-3 sm:!space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">No scheduling conflicts with peers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Practice unlimited times, 24/7</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Consistent, unbiased evaluation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Company-specific preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 !mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Instant, genuine feedback</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
    Platform <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Features</span>
  </h2>
  
  <div className="grid sm:grid-cols-2 !gap-6 sm:!gap-8 max-w-6xl mx-auto">
    {features.map((feature, index) => (
      <div 
        key={index}
        className="group bg-white rounded-xl sm:rounded-2xl !p-6 sm:!p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <div className="flex items-center !mb-4 sm:!mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg sm:rounded-xl !p-2 sm:!p-3 !mr-3 sm:!mr-4 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{feature.title}</h3>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{feature.description}</p>
      </div>
    ))}
  </div>
</div>

{/* Values Section */}
<div className="bg-gradient-to-r from-orange-50 to-pink-50 !py-16 sm:!py-20">
  <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
        Our <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Values</span>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 !gap-6 sm:!gap-8">
        {values.map((value, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl !p-6 sm:!p-8 text-center border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 !mb-3 sm:!mb-4">{value.title}</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

{/* Mission Section */}
<div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl !p-8 sm:!p-12 lg:!p-16 text-center shadow-2xl max-w-6xl mx-auto">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white !mb-6 sm:!mb-8">Our Mission</h2>
    <p className="text-lg sm:text-xl lg:text-2xl text-indigo-100 leading-relaxed max-w-4xl mx-auto !mb-8 sm:!mb-12">
      To democratize interview success by providing every job candidate with access to realistic, 
      AI-powered practice sessions that deliver honest feedback and measurable improvement.
    </p>
    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full !px-6 sm:!px-8 !py-3 sm:!py-4 border border-white/30">
      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white !mr-3" />
      <span className="text-white font-medium text-sm sm:text-base">Empowering candidates worldwide, one interview at a time</span>
    </div>
  </div>
</div>

{/* Technology Advantage */}
<div className="bg-gradient-to-br from-gray-50 to-purple-50 !py-16 sm:!py-20">
  <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8">
    <div className="bg-white rounded-2xl sm:rounded-3xl !p-6 sm:!p-12 lg:!p-16 shadow-xl max-w-6xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-8 sm:!mb-12">
        The <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SimJob</span> Advantage
      </h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 !gap-6 sm:!gap-8 !mb-8 sm:!mb-12">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl !p-6 border border-indigo-200">
          <div className="bg-indigo-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto !mb-4">
            <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 !mb-2 text-sm sm:text-base">Voice-First Design</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Real conversations, not typing exercises</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl !p-6 border border-purple-200">
          <div className="bg-purple-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto !mb-4">
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 !mb-2 text-sm sm:text-base">Smart AI Analysis</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Deep insights into your performance</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl !p-6 border border-pink-200 sm:col-span-2 lg:col-span-1">
          <div className="bg-pink-500 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto !mb-4">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="font-bold text-gray-900 !mb-2 text-sm sm:text-base">Targeted Preparation</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Company-specific scenarios and questions</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl !p-6 sm:!p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 !mb-4">The Future of Interview Preparation</h3>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          SimJob represents the next evolution in interview preparation. By combining advanced AI technology with real-time voice interaction, we're creating an experience that's as close to a real interview as possible, without the pressure of an actual job on the line.
        </p>
      </div>
    </div>
  </div>
</div>

{/* Values Section */}
<div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-16 sm:!py-20">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 !mb-12 sm:!mb-16 text-center">
    Our <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Values</span>
  </h2>
  
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 !gap-6 sm:!gap-8 max-w-6xl mx-auto">
    {values.map((value, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl sm:rounded-2xl !p-6 sm:!p-8 text-center border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 !mb-3 sm:!mb-4">{value.title}</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{value.description}</p>
      </div>
    ))}
  </div>
</div>

{/* CTA Section */}
<div className="bg-gradient-to-br from-indigo-50 to-purple-50 !py-16 sm:!py-20">
  <div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 flex justify-center items-center">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl !p-8 sm:!p-12 lg:!p-16 text-center shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white !mb-4 sm:!mb-6">Ready to Ace Your Interview?</h2>
      <p className="text-base sm:text-lg lg:text-xl text-indigo-100 !mb-6 sm:!mb-8 leading-relaxed">
        Join thousands of candidates who've improved their interview skills with SimJob's AI-powered platform.
      </p>
      <button onClick={()=>navigate(token ? "/dashboard" : "/signup")} className="group bg-white text-indigo-600 !px-6 sm:!px-8 !py-3 sm:!py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 inline-flex items-center shadow-lg cursor-pointer">
        Start Practicing Now
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 !ml-2 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  </div>
</div>

{/* Footer */}
<div className="container mx-auto !px-4 sm:!px-6 lg:!px-8 !py-8 sm:!py-12 text-center border-t border-gray-200">
  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
    © 2025 SimJob. Transforming interview preparation with AI innovation.
  </p>
</div>

    </div>
  );
}