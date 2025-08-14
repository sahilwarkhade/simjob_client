import React, { useState, useEffect } from "react";
import {
  Mic,
  Brain,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Play,
  Pause,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  Zap,
  Eye,
} from "lucide-react";
import UpcomingInterviews from "../components/Dashboard/UpcomingInterviews";
import { NavigationTab } from "../components/Dashboard/NavigationTab";
import { PiExam } from "react-icons/pi";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const userStats = {
    totalSessions: 47,
    averageScore: 8.2,
    improvedAreas: 3,
    streak: 7,
  };

  const recentSessions = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      date: "2025-01-10",
      duration: "25 min",
      score: 8.5,
      status: "completed",
      feedback: "Great technical responses, work on behavioral questions",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "Product Manager",
      date: "2025-01-09",
      duration: "30 min",
      score: 7.8,
      status: "completed",
      feedback: "Strong product thinking, improve on leadership examples",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Data Scientist",
      date: "2025-01-08",
      duration: "22 min",
      score: 8.9,
      status: "completed",
      feedback: "Excellent problem-solving approach",
    },
  ];

  const skillsProgress = [
    { skill: "Technical Skills", progress: 85, change: "+5%" },
    { skill: "Communication", progress: 78, change: "+8%" },
    { skill: "Problem Solving", progress: 92, change: "+3%" },
    { skill: "Leadership", progress: 65, change: "+12%" },
  ];

  const companies = [
    { name: "Google", logo: "🔍", sessions: 12, avgScore: 8.4 },
    { name: "Microsoft", logo: "🪟", sessions: 8, avgScore: 8.1 },
    { name: "Amazon", logo: "📦", sessions: 15, avgScore: 8.7 },
    { name: "Meta", logo: "👤", sessions: 6, avgScore: 7.9 },
    { name: "Netflix", logo: "🎬", sessions: 4, avgScore: 8.3 },
    { name: "Apple", logo: "🍎", sessions: 2, avgScore: 8.0 },
  ];

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "mockInterview",
      label: "Mock Interview",
      icon: <Mic className="w-4 h-4" />,
    },
    { id: "oatest", label: "OA Test", icon: <Calendar className="w-4 h-4" /> },
    {
      id: "progress",
      label: "Progress",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "companies",
      label: "Companies",
      icon: <Briefcase className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8">
          <div className="flex justify-between items-center !h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">SimJob</span>
              </h1>
            </div>
            
            <div className="flex items-center !space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute !left-3 !top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="!pl-10 !pr-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              <button className="relative !p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute !top-1 !right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center !space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <button className="!p-1 text-gray-400 hover:text-gray-600">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      <div className="w-full h-16"></div>
      <div className="max-w-7xl !mx-auto !px-4 sm:!px-6 lg:!px-8 !py-8">
        {/* Navigation Tabs */}
        <NavigationTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="!space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !gap-6">
              <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Sessions
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userStats.totalSessions}
                    </p>
                  </div>
                  <div className="bg-indigo-100 !p-3 rounded-lg">
                    <Target className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 !mt-2">
                  +12% from last month
                </p>
              </div>

              <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Average Score
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userStats.averageScore}/10
                    </p>
                  </div>
                  <div className="bg-purple-100 !p-3 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 !mt-2">
                  +0.3 from last week
                </p>
              </div>

              <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Improved Areas
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userStats.improvedAreas}
                    </p>
                  </div>
                  <div className="bg-green-100 !p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-green-600 !mt-2">
                  Communication, Leadership, Technical
                </p>
              </div>

              <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Current Streak
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userStats.streak} days
                    </p>
                  </div>
                  <div className="bg-orange-100 !p-3 rounded-lg">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-orange-600 !mt-2">Keep it up! 🔥</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-4">
                <button
                  onClick={()=>setActiveTab("mockInterview")}
                  className="flex items-center justify-center !space-x-3 !p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {<Play className="w-5 h-5" />}
                  <span className="font-medium">{"Start New Session"}</span>
                </button>


                <button className="flex items-center justify-center !space-x-3 !p-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">View Resources</span>
                </button>
                <button
                  onClick={()=>setActiveTab('oatest')}
                  className="flex items-center justify-center !space-x-3 !p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {<PiExam className="w-5 h-5" />}
                  <span className="font-medium">Online Assessment</span>
                </button>
              </div>
            </div>

            {/* Recent Activity & Upcoming */}
            <div className="grid lg:grid-cols-1 !gap-6">
              {/* Recent Sessions */}
              <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between !mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Sessions
                  </h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View All
                  </button>
                </div>
                <div className="!space-y-4">
                  {recentSessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between !p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center !space-x-2 !mb-1">
                          <h4 className="font-medium text-gray-900">
                            {session.company}
                          </h4>
                          <span className="text-xs bg-indigo-100 text-indigo-800 !px-2 !py-1 rounded-full">
                            {session.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {session.duration} • Score: {session.score}/10
                        </p>
                      </div>
                      <div className="flex items-center !space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Interviews */}
              {/* <UpcomingInterviews /> */}
            </div>
          </div>
        )}

        {/* MockInterview Tab*/}
        {activeTab === "mockInterview" && (
          <div className="!space-y-6">
            {/* Session Setup */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-6">
                Start New Practice Session
              </h3>

              <div className="grid md:grid-cols-2 !gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 !mb-2">
                    Company
                  </label>
                  <select className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 cursor-pointer">
                    <option>Select Company</option>
                    <option>Google</option>
                    <option>Microsoft</option>
                    <option>Amazon</option>
                    <option>Meta</option>
                    <option>Netflix</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 !mb-2">
                    Role
                  </label>
                  <select className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 cursor-pointer">
                    <option>Select Role</option>
                    <option>Software Engineer</option>
                    <option>Product Manager</option>
                    <option>Data Scientist</option>
                    <option>Designer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 !mb-2">
                    Interview Type
                  </label>
                  <select className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 cursor-pointer">
                    <option>Select Type</option>
                    <option>Technical</option>
                    <option>Behavioral</option>
                    <option>System Design</option>
                    <option>Case Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 !mb-2">
                    Experience Level
                  </label>
                  <select className="w-full !px-3 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600 cursor-pointer">
                    <option>Select Type</option>
                    <option>Fresher</option>
                    <option>Less than 1 year</option>
                    <option>Less than 3 years</option>
                    <option>Less than 5 years</option>
                    <option>Less than 8 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
              </div>

              <div className="!mt-6 flex justify-center">
                <button
                  // onClick={startNewSession}
                  className="flex items-center !space-x-3 !px-8 !py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer"
                >
                  {<Mic className="w-5 h-5" />}
                  <span className="font-medium">{"Start Mock Interview"}</span>
                </button>
              </div>

              {/* {isRecording && (
                <div className="!mt-4 !p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center !space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <p className="text-red-700 font-medium">
                      Interview session is active. AI is listening...
                    </p>
                  </div>
                  <div className="!mt-3 bg-white !p-3 rounded border">
                    <p className="text-sm text-gray-700 italic">
                      "Tell me about yourself and why you're interested in this
                      role at Google."
                    </p>
                  </div>
                </div>
              )} */}
            </div>

            {/* Practice History */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 text-gray-700">
              <div className="flex items-center justify-between !mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Practice History
                </h3>
                <div className="flex items-center !space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select className="text-sm border border-gray-300 rounded-md !px-2 !py-1 focus:ring-2 focus:ring-indigo-500">
                    <option>All Sessions</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
              </div>

              <div className="!space-y-3">
                {recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between !p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center !space-x-3 !mb-2">
                        <h4 className="font-medium text-gray-900">
                          {session.company}
                        </h4>
                        <span className="text-xs bg-indigo-100 text-indigo-800 !px-2 !py-1 rounded-full">
                          {session.role}
                        </span>
                        <span
                          className={`text-xs !px-2 !py-1 rounded-full ${
                            session.score >= 8
                              ? "bg-green-100 text-green-800"
                              : session.score >= 6
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          Score: {session.score}/10
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 !mb-1">
                        {session.feedback}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.date} • {session.duration}
                      </p>
                    </div>
                    <div className="flex items-center !space-x-2">
                      <button className="!p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="!space-y-6">
            {/* Skills Progress */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-6">
                Skills Progress
              </h3>
              <div className="!space-y-6">
                {skillsProgress.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between !mb-2">
                      <span className="font-medium text-gray-900">
                        {skill.skill}
                      </span>
                      <div className="flex items-center !space-x-2">
                        <span className="text-sm text-green-600">
                          {skill.change}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {skill.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-6">
                Performance Over Time
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 !mx-auto !mb-4" />
                  <p className="text-gray-500">
                    Performance chart would go here
                  </p>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-4">
                AI Improvement Suggestions
              </h3>
              <div className="!space-y-4">
                <div className="flex items-start !space-x-3 !p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <Brain className="w-5 h-5 text-blue-600 !mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Strengthen Leadership Examples
                    </h4>
                    <p className="text-sm text-blue-700 !mt-1">
                      Practice with more specific STAR method examples for
                      leadership situations
                    </p>
                  </div>
                </div>

                <div className="flex items-start !space-x-3 !p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Zap className="w-5 h-5 text-green-600 !mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">
                      Technical Deep Dives
                    </h4>
                    <p className="text-sm text-green-700 !mt-1">
                      Focus on explaining complex technical concepts in simpler
                      terms
                    </p>
                  </div>
                </div>

                <div className="flex items-start !space-x-3 !p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-orange-600 !mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900">
                      Communication Pace
                    </h4>
                    <p className="text-sm text-orange-700 !mt-1">
                      Slow down slightly when explaining technical solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === "companies" && (
          <div className="!space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 !gap-6">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between !mb-4">
                    <div className="flex items-center !space-x-3">
                      <span className="text-2xl">{company.logo}</span>
                      <h3 className="font-semibold text-gray-900">
                        {company.name}
                      </h3>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="!space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium">{company.sessions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg Score:</span>
                      <span className="font-medium">{company.avgScore}/10</span>
                    </div>
                  </div>

                  <button className="w-full !mt-4 !px-4 !py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Practice Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
