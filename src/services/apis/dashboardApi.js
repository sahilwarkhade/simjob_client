import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const getUserStats = async () => {
  try {
    const response = await apiConnector("GET", `${BASE_URL}/user/stats`);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.userStats;
  } catch (error) {
    console.log("ERROR IN GETTING RECENT SESSIONS :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const getHistory = async () => {
  try {
    const response = await apiConnector("GET", `${BASE_URL}/user/history`);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.history;
  } catch (error) {
    console.log("ERROR IN GETTING RECENT SESSIONS :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const getRecentSessions = async () => {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/recentsessions`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.recentSessions;
};
