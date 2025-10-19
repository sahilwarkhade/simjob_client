import { useEffect, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  forgetPassword,
  verifyEmail,
  verifyOTP,
} from "../../services/apis/authApi";

const INITIAL_COUNT = 30;

export const ForgetPassword = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(INITIAL_COUNT);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendBtnLoading, setResendBtnLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    newPassword: "",
    newConfirmPassword: "",
    otp: "",
  });

  const [startEmailVerfication, setStartEmailVerfication] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const { email, newPassword, newConfirmPassword, otp } = formData;
  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsResendDisabled(true);
    if (e.target.name !== "resend-btn") {
      setBtnLoading(true);
    } else {
      setResendBtnLoading(true);
    }
    try {
      await verifyEmail(email, "forget-password");
      setStartEmailVerfication(true);
      setCountdown(INITIAL_COUNT);
      setResendBtnLoading(false);
    } catch (error) {
      console.log("ERROR :: ", error);
      setIsResendDisabled(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      if (response.data.success) {
        setIsOtpVerified(true);
      }
    } catch (error) {
      console.log("ERROR :: ", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const response = await forgetPassword(
        email,
        newPassword,
        newConfirmPassword
      );
      if (response?.data?.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("ERROR :: ", error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (countdown <= 0) {
      setIsResendDisabled(false);
      return;
    }

    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  return (
    <AuthLayout
      title="Forget Password!"
      subtitle="Do you forget your password, reset your password now!"
    >
      <div className="!space-y-4">
        {!isOtpVerified && (
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="!mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => handleOnChange(e)}
                required
                placeholder="Enter Your Email Address"
                className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              />
            </div>
          </div>
        )}
        {startEmailVerfication && !isOtpVerified && (
          <div className="flex lg:gap-x-2 gap-x-1.5">
            <div className="w-[74%]">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <div className="!mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="otp"
                  value={otp}
                  onChange={(e) => handleOnChange(e)}
                  required
                  placeholder="Enter OTP..."
                  className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                />
              </div>
            </div>
            <div className="w-[18%]">
              {isResendDisabled ? (
                <div className="w-full text-center flex items-center justify-center text-white !py-2.5 !px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-not-allowed bg-gray-400">
                  {resendBtnLoading ? (
                    <p className="flex items-center justify-center">
                      <svg
                        className="animate-spin !-ml-1 !mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </p>
                  ) : (
                    countdown
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className={`text-white !py-2.5 lg:!px-4  !px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-pointer bg-gray-700 hover:bg-gray-900`}
                  name="resend-btn"
                  onClick={(e) => handleVerifyEmail(e)}
                >
                  Resend
                </button>
              )}
            </div>
          </div>
        )}
        {isOtpVerified && (
          <>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="!mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={passwordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handleOnChange(e)}
                  required
                  placeholder="Enter new password..."
                  className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible((prev) => !prev)}
                  className="absolute !inset-y-0 !right-0 !pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {passwordVisible ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="newConfirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="!mt-1 relative">
                <input
                  id="newConfirmPassword"
                  name="newConfirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={newConfirmPassword}
                  onChange={(e) => handleOnChange(e)}
                  required
                  placeholder="Enter confirm password..."
                  className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                  className="absolute !inset-y-0 !right-0 !pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {confirmPasswordVisible ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {!startEmailVerfication && !isOtpVerified ? (
          <button
            type="button"
            className={`w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 ${
              btnLoading ? " cursor-not-allowed" : " cursor-pointer"
            }`}
            onClick={(e) => handleVerifyEmail(e)}
            disabled={btnLoading}
          >
            {btnLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin !-ml-1 !mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending OTP...
              </span>
            ) : (
              "Verify Email"
            )}
          </button>
        ) : isOtpVerified ? (
          <button
            type="button"
            className={`w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition ${
              btnLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={(e) => handleForgetPassword(e)}
          >
            {btnLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin !-ml-1 !mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        ) : (
          <button
            type="submit"
            className={`w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-pointer ${
              btnLoading ? " cursor-not-allowed" : " cursor-pointer"
            }`}
            onClick={(e) => handleVerifyOtp(e)}
          >
            {btnLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin !-ml-1 !mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        )}
      </div>
    </AuthLayout>
  );
};
