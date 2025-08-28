import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const getUserProfile = async (setUser) => {
  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/user/profile/getuserdetails`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    setUser(response?.data?.user);
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
    console.log("profile update ::", response);
  } catch (error) {
    console.log("ERROR in profile update :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const updatePersonalProfileDetails = async (formData) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/user/profile/update/personaldetails`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message);
    return response;
  } catch (error) {
    console.log("Error in updatePersonalProfileDetails :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const updateProfessionalProfileDetails = async (formData) => {
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/user/profile/update/professionaldetails`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message);
    return response;
  } catch (error) {
    console.log("Error in updatePersonalProfileDetails :: ", error);
    toast.error(error?.response?.data?.message);
  }
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
    navigate('/')
    return response
  } catch (error) {
    console.log("ERROR in updating password :: ",error);
    toast.error(error?.response?.data?.message);
  }
};
export const deleteAccount = async (setIsLoggedIn, navigate) => {
  try {
    const response = await apiConnector(
      "DELETE",
      `${BASE_URL}/user/profile/deleteaccount`
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success(response?.data?.message);
    setIsLoggedIn(false);
    navigate("/");
  } catch (error) {
    console.log("ERROR in deleting acccount ::", error);
    toast.error(error?.response?.data?.message);
  }
};
