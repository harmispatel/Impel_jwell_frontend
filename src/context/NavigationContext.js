import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [previousUrl, setPreviousUrl] = useState(null);

  const setPreviousPageUrl = (url) => {
    setPreviousUrl(url);
  };

  return (
    <NavigationContext.Provider value={{ previousUrl, setPreviousPageUrl }}>
      {children}
    </NavigationContext.Provider>
  );
};
