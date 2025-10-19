import { useContext} from "react";
import {
  Mic,
  Brain,
  TrendingUp,
  Calendar,
  Play,
  BarChart3,
  BookOpen,
  MessageSquare,
  Zap,
  History,
} from "lucide-react";
import { NavigationTab } from "../components/Dashboard/NavigationTab";
import { PiExam } from "react-icons/pi";
import QuickStats from "../components/Dashboard/QuickStats";
import RecentActivity from "../components/Dashboard/RecentActivity";
import { MockInterviewForm } from "../components/Dashboard/MockInterviewForm";
import { OaTest } from "../components/Dashboard/OaTest";
import { DashboardContext } from "../context/DashboardContext";
import HistoryTab from "../components/Dashboard/History";

export default function Dashboard() {
  const { activeTab, setActiveTab } = useContext(DashboardContext);

  const skillsProgress = [
    { skill: "Technical Skills", progress: 85, change: "+5%" },
    { skill: "Communication", progress: 78, change: "+8%" },
    { skill: "Problem Solving", progress: 92, change: "+3%" },
    { skill: "Leadership", progress: 65, change: "+12%" },
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
    {
      id: "oatest",
      label: "OA Test",
      icon: <Calendar className="w-4 h-4" />,
    },
    // {
    //   id: "progress",
    //   label: "Progress",
    //   icon: <TrendingUp className="w-4 h-4" />,
    // },
    {
      id: "history",
      label: "History",
      icon: <History className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <QuickStats />

            {/* Quick Actions */}
            <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 !mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 !gap-4">
                <button
                  onClick={() => setActiveTab("mockInterview")}
                  className="flex items-center justify-center !space-x-3 !p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {<Play className="w-5 h-5" />}
                  <span className="font-medium">{"Start New Session"}</span>
                </button>

                <button
                  title="Sorry, currently not available"
                  className="flex items-center justify-center !space-x-3 !p-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">View Resources</span>
                </button>
                <button
                  onClick={() => setActiveTab("oatest")}
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
              <RecentActivity />

              {/* <UpcomingInterviews /> */}
            </div>
          </div>
        )}

        {/* MockInterview Tab*/}
        {activeTab === "mockInterview" && <MockInterviewForm />}

        {activeTab === "oatest" && <OaTest />}

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

        {/* History Tab */}
        {activeTab === "history" && <HistoryTab />}
      </div>
    </div>
  );
}
