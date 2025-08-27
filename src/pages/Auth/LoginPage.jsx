import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthLayout from "../../layouts/AuthLayout";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { continueWithGitHub,continueWithGoogle } from "../../services/apis/authApi";
import { loginUser } from "../../services/apis/authApi";
import { Spinner } from "../../components/Spinner/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "Sahil@123",
  });
  const { email, password } = formData;
  const { loading, setLoading, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(formData);

      if (response?.data?.success) {
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (err) {
      console.log("ERROR :: ", err);
    } finally {
      setLoading(false);
    }
  };

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
      title="Welcome Back!"
      subtitle="Let's get you signed in securely."
    >
      {/* Social Logins */}
      <div className="!space-y-3">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            await continueWithGoogle(credentialResponse.credential, navigate,setIsLoggedIn);
          }}
          logo_alignment="center"
          size="large"
          theme="outline"
          text="continue_with"
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
        <div className="relative flex items-center">
          <button
            className="w-full flex items-center justify-center !py-2.5 !px-4 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => continueWithGitHub()}
          >
            <FaGithub className="w-5 h-5 !mr-2 text-black" />
            Continue with GitHub
          </button>
        </div>
      </div>

      {/* Separator */}
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink !mx-4 text-gray-400 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Email Form */}
      <form className="!space-y-6" onSubmit={(e) => handleSubmit(e)}>
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

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="text-sm">
              <Link
                to="/forget-password"
                className="font-medium text-indigo-600 hover:text-indigo-500  cursor-pointer"
              >
                Forgot Your Password?
              </Link>
            </div>
          </div>
          <div className="!mt-1 relative">
            <input
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => handleOnChange(e)}
              required
              placeholder="Your Password"
              className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute !inset-y-0 !right-0 !pr-3 flex items-center text-gray-500  cursor-pointer"
            >
              {passwordVisible ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition cursor-pointer"
        >
          Log in with Email
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600">
        Don't Have an Account?{" "}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500  cursor-pointer"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
