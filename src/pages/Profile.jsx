import { useState } from "react";
import {
  User,
  Settings,
  Bell,
  Award,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Camera,
  Star,
  TrendingUp,
  Target,
} from "lucide-react";
import { NavigationTab } from "../components/Dashboard/NavigationTab";

export function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "simulations", label: "Simulations", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const simulationHistory = [
    {
      id: 1,
      title: "Software Engineer Interview",
      company: "TechCorp",
      score: 92,
      date: "2024-08-10",
      status: "completed",
    },
    {
      id: 2,
      title: "Product Manager Assessment",
      company: "StartupXYZ",
      score: 87,
      date: "2024-08-08",
      status: "completed",
    },
    {
      id: 3,
      title: "Data Analyst Challenge",
      company: "DataFlow",
      score: 95,
      date: "2024-08-05",
      status: "completed",
    },
    {
      id: 4,
      title: "UX Designer Portfolio Review",
      company: "DesignHub",
      score: 89,
      date: "2024-08-03",
      status: "in-progress",
    },
  ];

  const achievements = [
    {
      title: "Perfect Score",
      description: "Achieved 100% in technical assessment",
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Quick Learner",
      description: "Completed 10 simulations in one week",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Goal Crusher",
      description: "Met all monthly simulation targets",
      icon: Target,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="!pb-32 !pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>

        <div className="max-w-6xl !mx-auto !px-6 relative z-10">
          <div className="flex items-center justify-between !mb-8">
            <div className="flex items-center !space-x-4">
              <h1 className="text-2xl font-bold text-white">SimJob</h1>
            </div>
            <div className="flex items-center !space-x-4">
              <button className="!p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                <Bell size={20} />
              </button>
              <button className="!p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center !space-y-6 md:!space-y-0 md:!space-x-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl transition-transform group-hover:scale-105">
                AJ
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center !space-x-4 !mb-4">
                <h2 className="text-3xl font-bold text-white">Alex Johnson</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="!p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                >
                  <Edit3 size={18} />
                </button>
              </div>
              <p className="text-white/90 text-lg !mb-4">
                Senior Software Engineer | Job Simulation Enthusiast
              </p>
              <div className="flex flex-wrap items-center !gap-6 text-white/80">
                <div className="flex items-center !space-x-2">
                  <Mail size={16} />
                  <span>alex.johnson@email.com</span>
                </div>
                <div className="flex items-center !space-x-2">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center !space-x-2">
                  <MapPin size={16} />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl !p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-white">47</div>
                <div className="text-sm text-white/80">Simulations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl !p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-white">91%</div>
                <div className="text-sm text-white/80">Avg Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl !p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-white/80">Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl !mx-auto !px-6 -mt-16 relative z-20">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg !mb-8 !p-2 border border-gray-100">
          <nav className="flex !space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center !space-x-2 !px-6 !py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
          {/* <NavigationTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/> */}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="!space-y-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 !mb-6">
                    Recent Simulations
                  </h3>
                  <div className="!space-y-4">
                    {simulationHistory.slice(0, 3).map((sim) => (
                      <div
                        key={sim.id}
                        className="flex items-center justify-between !p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center !space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Briefcase className="text-white" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {sim.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {sim.company} • {sim.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center !space-x-4">
                          <div
                            className={`!px-3 !py-1 rounded-full text-sm font-medium ${
                              sim.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {sim.status === "completed"
                              ? `${sim.score}%`
                              : "In Progress"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full !mt-4 !py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors">
                    View All Simulations
                  </button>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 !mb-6">
                    Performance Trends
                  </h3>
                  <div className="h-64 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp
                        className="!mx-auto !mb-4 text-indigo-500"
                        size={48}
                      />
                      <p className="text-gray-600">
                        Performance analytics coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "simulations" && (
              <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 !mb-6">
                  All Simulations
                </h3>
                <div className="!space-y-4">
                  {simulationHistory.map((sim) => (
                    <div
                      key={sim.id}
                      className="flex items-center justify-between !p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center !space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Briefcase className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {sim.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {sim.company} • {sim.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center !space-x-4">
                        <div
                          className={`!px-3 !py-1 rounded-full text-sm font-medium ${
                            sim.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {sim.status === "completed"
                            ? `${sim.score}%`
                            : "In Progress"}
                        </div>
                        <button className="text-indigo-600 hover:text-indigo-800">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 !mb-6">
                  Your Achievements
                </h3>
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center !space-x-4 !p-4 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center ${achievement.color}`}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="!space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 !mb-4">
                Quick Actions
              </h3>
              <div className="!space-y-3">
                <button className="w-full !p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Start New Simulation
                </button>
                <button className="w-full !p-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Analytics
                </button>
                <button className="w-full !p-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Download Resume
                </button>
              </div>
            </div>

            {/* Skills Progress */}
            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 !mb-4">
                Skill Progress
              </h3>
              <div className="!space-y-4">
                {[
                  { skill: "Technical Interview", progress: 92 },
                  { skill: "Communication", progress: 85 },
                  { skill: "Problem Solving", progress: 88 },
                  { skill: "Leadership", progress: 76 },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between !mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.skill}
                      </span>
                      <span className="text-sm text-gray-600">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Simulations */}
            <div className="bg-white rounded-xl shadow-lg !p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 !mb-4">
                Upcoming
              </h3>
              <div className="!space-y-3">
                <div className="flex items-center !space-x-3 !p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Marketing Manager Interview
                    </p>
                    <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center !space-x-3 !p-3 bg-green-50 rounded-lg border border-green-200">
                  <Calendar className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Sales Assessment
                    </p>
                    <p className="text-xs text-gray-600">Aug 15, 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
