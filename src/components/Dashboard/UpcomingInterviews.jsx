import { ChevronRight, Clock } from "lucide-react";

const upcomingInterviews = [
  {
    id: 1,
    company: "Netflix",
    role: "Senior Engineer",
    date: "2025-01-15",
    time: "2:00 PM",
    type: "Technical Round",
  },
  {
    id: 2,
    company: "Apple",
    role: "iOS Developer",
    date: "2025-01-18",
    time: "10:00 AM",
    type: "System Design",
  },
];
const UpcomingInterviews = () => {
  return (
    <div>
    <div className="bg-white !p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between !mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Interviews
        </h3>
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          Add New
        </button>
      </div>
      <div className="!space-y-4">
        {upcomingInterviews.map((interview) => (
          <div
            key={interview.id}
            className="flex items-center justify-between !p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center !space-x-2 !mb-1">
                <h4 className="font-medium text-gray-900">
                  {interview.company}
                </h4>
                <span className="text-xs bg-orange-100 text-orange-800 !px-2 !py-1 rounded-full">
                  {interview.type}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {interview.date} at {interview.time}
              </p>
            </div>
            <div className="flex items-center !space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}

        {upcomingInterviews.length === 0 && (
          <div className="text-center !py-8">
            <Calendar className="w-12 h-12 text-gray-300 !mx-auto !mb-4" />
            <p className="text-gray-500">No upcoming interviews</p>
            <button className="!mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Schedule your first interview
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default UpcomingInterviews;
