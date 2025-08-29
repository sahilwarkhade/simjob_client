import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      (async () => {
      const response = await axios.get(`${BASE_URL}/check`, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        setIsLoggedIn(true);
      }
    })();
    } catch (error) {
      console.log("ERROR IN CHECKING USER");
      toast.error('Reload the page')
    }
    finally{
      setLoading(false)
    }
  }, [isLoggedIn,setIsLoggedIn,user]);

  return (
    <AuthContext.Provider
      value={{ loading, setLoading, isLoggedIn, setIsLoggedIn, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
