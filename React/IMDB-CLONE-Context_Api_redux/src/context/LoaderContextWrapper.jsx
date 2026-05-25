import React, { useState } from "react";

export const LoaderContext = React.createContext();

const LoaderContextWrapper = ({ children }) => {
  const [loader, setLoader] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loader,
        setLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextWrapper;
