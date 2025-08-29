import { toast } from "react-toastify";
import { apiConnector } from "../apiConnector";
import { BASE_URL } from "../../constants";

export const continueWithGoogle = async (idToken, navigate, setIsLoggedIn) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/auth/google`, {
      idToken,
    });

    if (!response?.data?.success) {
      toast.error("Please, try again later");
      return;
    }

    toast.success("Logged in successfully");
    setIsLoggedIn(true);
    navigate("/");
  } catch (error) {
    console.log("ERROR IN LOGIN WITH GOOGLE :: ", error);
    toast.error("Failed to continue with google");
  }
};

export const continueWithGitHub = async () => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${"Ov23liR2RpGlqlV3Jnz1"}&scope=user:email&redirect_uri=${"http://localhost:4000/api/v1/auth/github/callback"}`;
  window.location.href = authUrl;
};

export const verifyEmail = async (email, type) => {
  try {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    const response = await apiConnector("POST", `${BASE_URL}/auth/send-otp`, {
      email,
      type: type,
    });

    if (!response?.data?.success) {
      throw new Error("Not able to send OTP");
    }
    toast.success("OTP sent successfully");
    return response;
  } catch (error) {
    console.log("ERROR IN SENDING OTP :: ", error);
    toast.error("Not able to send OTP");
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    if (!otp) {
      toast.error("OTP is required");
      return;
    }
    const response = await apiConnector("POST", `${BASE_URL}/auth/verify-otp`, {
      email,
      otp,
    });

    if (!response?.data?.success) {
      throw new Error("Unable to verify OTP, please try again");
    }

    toast.success("OTP verified successfully");
    return response;
  } catch (error) {
    console.log("ERROR in verifing OTP :: ", error);
    toast.error("Unable to verify OTP");
  }
};

export const registerUser = async (formData, navigate) => {
  const { fullName, email, password, confirmPassword } = formData;

  if (!fullName || !email) {
    toast.error(`${fullName ? "Email is required" : "Full Name is required"}`);
    return;
  }
  if (!password) {
    toast.error(`Password is required`);
    return;
  }
  if (password !== confirmPassword) {
    toast.error(`Password and Confirm Password are not matching`);
    return;
  }

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/register`,
      formData
    );

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error(response?.data?.message);
    }

    return response;
  } catch (error) {
    console.log("ERROR in registering user :: ", error);
    toast.error("Something went wrong");
    navigate("/signup");
  }
};

export const loginUser = async (formData) => {
  const { email, password } = formData;
  if (!email) {
    toast.error("Email is required");
    return;
  }
  if (!password) {
    toast.error("Password is required");
    return;
  }
  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/login`,
      formData
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    console.log(response?.data);
    toast.success("User logged in successfully");
    return response;
  } catch (error) {
    console.log("ERROR in login :: ", error);
    toast.error(error?.response?.data?.message);
  }
};

export const forgetPassword = async (
  email,
  newPassword,
  confirmNewPassword
) => {
  if (!newPassword) {
    toast.error("Password is required");
    return;
  }
  if (newPassword !== confirmNewPassword) {
    toast.error("Your password is not matching with your confirm password");
    return;
  }

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/forget-password`,
      { email, newPassword, newConfirmPassword: confirmNewPassword }
    );

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      return;
    }

    toast.success("Password changed successfully");
    return response;
  } catch (error) {
    console.log("Error in forget password :: ", error);
    toast.error(error?.message);
  }
};

export const logout = async (setIsLoggedIn) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/auth/logout`);
    if (!response?.data?.success) {
      toast.error("Somthing went wrong, please try after sometime");
      return;
    }

    setIsLoggedIn(false);
    toast.success("Logout successfully");
  } catch (error) {
    console.log("ERROR in LOGOUT :: ", error);
    toast.error(error.message);
  }
};
