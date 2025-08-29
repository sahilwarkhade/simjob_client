import { createContext, useEffect, useState } from "react";
import { getUserStats } from "../services/apis/dashboardApi";

export const OverviewContext = createContext();

export const OverviewContextProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);

  

  return (
    <OverviewContext.Provider
      value={{ userStats, setUserStats, recentSessions, setRecentSessions }}
    >
        {children}
    </OverviewContext.Provider>
  );
};

/*\
const userStats = {
    totalMockSessions: 47,
    averageMockScore: 8.2,
    totalOASessions: 12,
    averageOAScore: 7,
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
  ];
 */
