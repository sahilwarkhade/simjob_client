import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const getUserProfile = async () => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/profile/getuserdetails`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    return response?.data?.user;
  } catch (error) {
    console.log("ERROR IN GETTING USER PROFILE :: ", error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const updateUserProfileImage = async (formData) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/user/profile/update/avatar`,
      formData,
      { "Content-Type": "multipart/form-data" }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message);
    return response;
  } catch (error) {
    console.log("ERROR in profile update :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const updatePersonalProfileDetails = async (formData) => {
  const response = await apiConnector(
    "POST",
    `${BASE_URL}/user/profile/update/personaldetails`,
    formData
  );

  return response;
};

export const updateProfessionalProfileDetails = async (formData) => {
  const response = await apiConnector(
    "POST",
    `${BASE_URL}/user/profile/update/professionaldetails`,
    formData
  );

  return response;
};

export const updatePassword = async (
  currentPassword,
  newPassword,
  newConfirmPassword,
  navigate
) => {
  try {
    if (!currentPassword) {
      toast.error("Current Password is required");
      return;
    }

    if (!newPassword) {
      toast.error("Password is required");
      return;
    }

    if (newPassword !== newConfirmPassword) {
      toast.error("Password and confirm password should match");
      return;
    }

    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/update-password`,
      { currentPassword, newPassword, newConfirmPassword }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message);
    navigate("/");
    return response;
  } catch (error) {
    console.log("ERROR in updating password :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const deleteAccount = async () => {
  const response = await apiConnector(
    "DELETE",
    `${BASE_URL}/user/profile/deleteaccount`
  );

  return response;
};

export const contactUs = async (formData, setIsSubmitted) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/contact`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error("Something went wrong, please again later");
    }
    setIsSubmitted(true);
    toast.success(response?.data?.message);
  } catch (error) {
    console.log("ERROR IN SENDING CONTACT US FORM :: ", error);
    toast.error(error?.response?.data?.message);
  }
};
