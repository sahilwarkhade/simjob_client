import { createContext, useState } from "react";

export const AuthContext=createContext();

export const  AuthContextProvider=({children})=>{
    const[loading,setLoading]= useState(false);
    const[token, setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);
    return(
        <AuthContext.Provider value={{loading,setLoading, token, setToken}}>
            {children}
        </AuthContext.Provider>
    )
}