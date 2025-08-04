// src/context/AppContext.js
import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [showSearchbar, setSearchbar] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const toggleSearchbar = () => setSearchbar(prev => !prev);

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      showSearchbar,
      setSearchbar,
      toggleSearchbar
    }}>
      {children}
    </AppContext.Provider>
  );
};
