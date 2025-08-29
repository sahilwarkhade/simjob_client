import { createContext, useState } from "react";

export const DashboardContext=createContext();

export const DashboardContextProvider=({children})=>{
    const [activeTab, setActiveTab]=useState('overview');

    return(
        <DashboardContext.Provider value={{activeTab,setActiveTab}}>
            {children}
        </DashboardContext.Provider>
    )
}