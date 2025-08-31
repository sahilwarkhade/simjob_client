import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const createOaTest = async (formData, navigate, type) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/test/generate/${type}`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    navigate(`/test?testid=${response?.data?.testID}`);
    return response;
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const getSections = async (testId, setSections) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/test/${testId}/sections`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    console.log("RESPONSE ::: ", response?.data?.sections);
    setSections(response?.data?.sections);
    return response;
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const getQuestion = async (testId, sectionId, questionId,setProblem) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/test/${testId}/sections/${sectionId}/question/${questionId}`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    console.log(response)
    setProblem(response?.data?.question)
    return response;
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message);
  }
};
