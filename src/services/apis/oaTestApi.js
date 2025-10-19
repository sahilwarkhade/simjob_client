import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const createOaTest = async (formData, type) => {
  const response = await apiConnector(
    "POST",
    `${BASE_URL}/test/generate/${type}`,
    formData
  );

  return response;
};

export const getSections = async (testId) => {
  const response = await apiConnector(
    "GET",
    `${BASE_URL}/test/${testId}/sections`
  );
  if (!response?.data?.success) {
    throw new Error(response?.data?.message);
  }
  return response?.data;
};

export const getFeedback = async (testId, type) => {
  console.log(type)
  const url =
    type === "test"
      ? `${BASE_URL}/test/feedback/${testId}`
      : `${BASE_URL}/interview/feedback/${testId}`;

  const response = await apiConnector("GET", url);

  if (!response?.data?.success) {
    throw new Error(response?.data?.message);
  }

  return response?.data?.feedback;
};

export const getQuestion = async (testId, sectionId, questionId) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/test/${testId}/sections/${sectionId}/question/${questionId}`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data;
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const evaluateCode = async (
  languageId,
  sourceCode,
  id,
  setEvaluationResponse
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/test/run/usercode`,
      { languageId, sourceCode, id }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }

    console.log(response?.data);
    setEvaluationResponse(response?.data);
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const evaluateCodeForAllTestCases = async (
  languageId,
  sourceCode,
  id,
  setEvaluationResponse
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/test/run/all/testcases`,
      { languageId, sourceCode, id }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }

    console.log(response?.data);
    setEvaluationResponse(response?.data);
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const getSectionQuestions = async (testId, sectionId) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/test/${testId}/sections/${sectionId}/questions`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }

    return response?.data;
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const codeSubmission = async (formData, navigate) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/test/submit/code`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    console.log(response);
    toast.success(response?.data?.message);
    navigate(-1);
  } catch (error) {
    console.log("ERROR IN SUBMITTING USER CODE :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const sectionAnswerSubmission = async (
  formData,
  navigate,
  setSubmittedSections
) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/test/submit/section`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }

    toast.success(response?.data?.message);
    setSubmittedSections((prev) => [...prev, formData.sectionId]);
    navigate(-1);
  } catch (error) {
    console.log("ERROR in creating OA Test :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const submitTest = async (testId) => {
  const response = await apiConnector("POST", `${BASE_URL}/test/submit/test`, {
    testId,
  });

  return response;
};
