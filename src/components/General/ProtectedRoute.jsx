import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "../Spinner/Spinner";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

