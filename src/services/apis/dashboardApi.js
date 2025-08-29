import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const getUserStats = async (setUserStats) => {
  try {
    const response = await apiConnector("GET", `${BASE_URL}/user/stats`);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    console.log(response?.data?.userStats)
    setUserStats(response?.data?.userStats);
  } catch (error) {
    console.log("ERROR IN GETTING RECENT SESSIONS :: ", error);
    toast.error(error?.response?.data?.message);
  }
};
export const getRecentSessions = async (setRecentSessions) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/recentsessions`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    setRecentSessions(response?.data?.recentSessions);
  } catch (error) {
    console.log("ERROR IN GETTING RECENT SESSIONS :: ", error);
    toast.error(error?.response?.data?.message);
  }
};
