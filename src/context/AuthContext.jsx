import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/check`, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        setIsLoggedIn(true);
      }
    })();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ loading, setLoading, isLoggedIn, setIsLoggedIn, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
