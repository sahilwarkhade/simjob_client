import { createContext, useState } from "react";

export const OATestContext = createContext();

export const OATestContextProvider = ({ children }) => {
  const [submittedSections, setSubmittedSections] = useState(
    JSON.parse(sessionStorage.getItem("sumittedSections")) || []
  );
  return (
    <OATestContext.Provider value={{ submittedSections, setSubmittedSections }}>
      {children}
    </OATestContext.Provider>
  );
};
