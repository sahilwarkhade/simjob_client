import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AuthLayout from "../../layouts/AuthLayout";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../context/AuthContext";

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { fullname, email, password, confirmPassword } = formData;

  const navigate=useNavigate();
  const { loading, setLoading } = useContext(AuthContext);

  
  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      console.log("Password and Confirm Password are not matching")
      return;
    }
    
    
    navigate('/login')
  }
  if(loading){
    return <div>loading</div>
  }
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join us and start your journey."
    >
      <div className="!space-y-1">
        <button className="w-full flex items-center justify-center !py-2.5 !px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition  cursor-pointer">
          <FcGoogle className="w-5 h-5 !mr-2" />
          Continue with Google
        </button>
        <div className="relative flex items-center">
          <button className="w-full flex items-center justify-center !py-2.5 !px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer">
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

      <form className="!space-y-4" 
          onSubmit={(e)=>handleSubmit(e)}>
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="!mt-1">
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={fullname}
              onChange={(e) => handleOnChange(e)}
              required
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
              required
              placeholder="Enter Your Email Address"
              className="w-full !px-3 !py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
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
                required
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
                required
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
        <button
          type="submit"
          className="w-full bg-gray-800 text-white !py-2.5 !px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition !mt-6 cursor-pointer"
        >
          Create Account
        </button>
      </form>

      {/* Login Link */}
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
