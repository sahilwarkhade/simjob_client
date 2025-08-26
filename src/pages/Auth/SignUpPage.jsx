import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthLayout from "../../layouts/AuthLayout";
import { FaGithub } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import {
  continueWithGoogle,
  continueWithGitHub,
  registerUser,
  verifyEmail,
  verifyOTP,
} from "../../services/apis/authApi";
import { toast } from "react-toastify";
import { Spinner } from "../../components/Spinner/Spinner";

const INITIAL_COUNT = 30;

const SignUpPage = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(INITIAL_COUNT);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "Sahil@123",
    confirmPassword: "Sahil@123",
    otp: "",
  });
  const { fullName, email, password, confirmPassword, otp } = formData;

  const { loading, setLoading, isLoggedIn } = useContext(AuthContext);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await registerUser(formData, navigate);
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log("ERROR :: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setIsResendDisabled(true);
    setBtnLoading(true);
    try {
      const response = await verifyEmail(email, "signup");
      if (!response) return;

      if (response.data.success) {
        setIsOtpSent(true);
        setCountdown(INITIAL_COUNT);
      }
    } catch (error) {
      console.log("ERROR :: ", error);
      toast.error("Please, try again later...");
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
      if (!response) return;
      if (response.data.success) setIsOtpVerified(true);
    } catch (error) {
      console.log("ERROR :: ", error);
      toast.error("Please, try again later");
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

  if (isLoggedIn) {
    navigate("/");
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join us and start your journey."
    >
      <div className="!space-y-1">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            await continueWithGoogle(credentialResponse?.credential, navigate);
          }}
          logo_alignment="center"
          size="large"
          theme="outline"
          text="continue_with"
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <div className="relative flex items-center">
          <button
            className="w-full flex items-center justify-center !py-2.5 !px-4 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => continueWithGitHub()}
          >
            <FaGithub className="w-5 h-5 !mr-2 text-black" />
            Continue with GitHub
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink !mx-4 text-gray-400 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <form className="!space-y-4" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="!mt-1">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => handleOnChange(e)}
              placeholder="Enter Your Full Name"
              className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
            />
          </div>
        </div>

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
              // required
              disabled={isOtpVerified}
              placeholder="Enter Your Email Address"
              className={`w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600`}
            />
          </div>
        </div>

        <div className="flex justify-between gap-x-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="!mt-1 relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                // required
                value={password}
                onChange={(e) => handleOnChange(e)}
                placeholder="Your Password"
                className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
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
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="!mt-1 relative">
              <input
                id="confirm-password"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                // required
                value={confirmPassword}
                onChange={(e) => handleOnChange(e)}
                placeholder="Confirm Password"
                className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
              />
              <button
                type="button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
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
        </div>

        {isOtpSent && !isOtpVerified && (
          <div className="flex gap-x-2">
            <div className="w-[75%]">
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
                <p className="w-full text-center text-white !py-2.5 !px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-not-allowed bg-gray-400">
                  {countdown}{" "}
                </p>
              ) : (
                <button
                  type="button"
                  className={`text-white !py-2.5 !px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-pointer bg-gray-700 hover:bg-gray-900`}
                  onClick={(e) => handleVerifyEmail(e)}
                >
                  Resend
                </button>
              )}
            </div>
          </div>
        )}

        {email.length > 0 && !isOtpSent ? (
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
        ) : !isOtpVerified && isOtpSent ? (
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
        ) : (
          <button
            type="submit"
            className="w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-pointer"
          >
            Create Account
          </button>
        )}
      </form>

      <p className="text-center text-sm text-gray-600 !mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpPage;
