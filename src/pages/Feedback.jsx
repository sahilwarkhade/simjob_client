import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
  AlertCircle,
} from "lucide-react";
import { getFeedback } from "../services/apis/oaTestApi";
import { Spinner } from "../components/Spinner/Spinner";
import ErrorPage from "./ErrorPage";
import { useParams } from "react-router-dom";

export default function Feedback() {
  const { testId, type} = useParams();
  const {
    data: feedbackData,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${testId}-feedback`],
    queryFn: () => getFeedback(testId,type),
  });

  

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <ErrorPage error={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 !py-8 !px-4">
      <div className="max-w-5xl !mx-auto !mt-12">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg !p-8 !mb-6">
          <div className="flex items-center justify-between !mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 !mb-2">
                Feedback Report
              </h1>
              <p className="text-slate-600">
                Detailed assessment of your performance
              </p>
            </div>
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBadgeColor(
                  feedbackData?.overallScore
                )} text-white shadow-lg`}
              >
                <div>
                  <div className="text-3xl font-bold">
                    {feedbackData?.overallScore}
                  </div>
                  <div className="text-xs">out of 10</div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Summary */}
          <div className="!mt-6 !p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h3 className="font-semibold text-slate-800 !mb-2 flex items-center">
              <AlertCircle className="w-5 h-5 !mr-2 text-slate-600" />
              Overall Summary
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {feedbackData?.overallSummary}
            </p>
          </div>
        </div>

        {/* Strong Points */}
        <div className="bg-white rounded-xl shadow-lg !p-6 !mb-6">
          <h2 className="text-2xl font-bold text-slate-800 !mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 !mr-2 text-green-600" />
            Strong Points
          </h2>
          <div className="space-y-3">
            {feedbackData?.strongPoints?.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start !p-3 bg-green-50 rounded-lg border border-green-100"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 !mt-2 !mr-3 flex-shrink-0"></div>
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Points */}
        <div className="bg-white rounded-xl shadow-lg !p-6 !mb-6">
          <h2 className="text-2xl font-bold text-slate-800 !mb-4 flex items-center">
            <XCircle className="w-6 h-6 !mr-2 text-red-600" />
            Areas for Improvement
          </h2>
          <div className="!space-y-3">
            {feedbackData?.weakPoints?.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start !p-3 bg-red-50 rounded-lg border border-red-100"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 !mt-2 !mr-3 flex-shrink-0"></div>
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section-wise Feedback */}
        <div className="bg-white rounded-xl shadow-lg !p-6 !mb-6">
          <h2 className="text-2xl font-bold text-slate-800 !mb-4 flex items-center">
            <Award className="w-6 h-6 !mr-2 text-blue-600" />
            Section-wise Performance
          </h2>
          <div className="!space-y-4">
            {feedbackData?.sectionFeedback?.map((section, idx) => (
              <div
                key={idx}
                className={`!p-4 rounded-lg border-2 ${getScoreColor(
                  section.score
                )}`}
              >
                <div className="flex items-center justify-between !mb-3">
                  <h3 className="text-lg font-semibold">
                    {section?.sectionName}
                  </h3>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold !mr-1">
                      {section?.score}
                    </span>
                    <span className="text-sm">/10</span>
                  </div>
                </div>
                <p className="text-slate-700">{section.feedback}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="bg-white rounded-xl shadow-lg !p-6 !mb-6">
          <h2 className="text-2xl font-bold text-slate-800 !mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 !mr-2 text-purple-600" />
            Recommended Action Items
          </h2>
          <div className="!space-y-3">
            {feedbackData?.improvementSuggestions?.map((suggestion, idx) => (
              <div
                key={idx}
                className="flex items-start !p-3 bg-purple-50 rounded-lg border border-purple-100"
              >
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold !mr-3 flex-shrink-0 !mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-slate-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Improvements */}
        <div className="bg-white rounded-xl shadow-lg !p-6">
          <h2 className="text-2xl font-bold text-slate-800 !mb-4">
            Specific Improvements Needed
          </h2>
          <div className="!space-y-4">
            {feedbackData?.improvedPoints?.map((point, idx) => (
              <div
                key={idx}
                className="!p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="!mt-8 text-center text-slate-600 text-sm">
          <p>
            Keep practicing and refer to the action items above to improve your
            skills.
          </p>
          <p className="!mt-1">Good luck with your interview preparation!</p>
        </div>
      </div>
    </div>
  );
}
