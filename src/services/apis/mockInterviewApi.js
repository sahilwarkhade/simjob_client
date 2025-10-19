import { BASE_URL } from "../../constants";
import { apiConnector } from "../apiConnector";

export const createMockInterview = async (type, formData) => {
  const response = await apiConnector(
    "POST",
    `${BASE_URL}/interview/${type}`,
    formData
  );

  return response;
};
