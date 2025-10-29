import { CheckCircle} from "lucide-react";
import { Link } from "react-router-dom";

export const CompleteScreen = ({ title, description }) => {
  return (
    <>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center !p-6">
        <div className="bg-gray-800 border flex items-center justify-center flex-col border-gray-700 rounded-lg !p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto !mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white !mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-400">
            {description}
          </p>
          <button className="cursor-pointer !p-2 !mt-2">
            redirecting to{" "}
            <Link
              to={"/dashboard"}
              className="underline-offset-auto text-blue-600"
            >
              dashboard
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};
