import React, { useContext, useState } from 'react';

const ThemContext = React.createContext({
  isDarkMode: true,
  toggleTheme: () => {},
});


// Custom context hook
const useThemeContext = () => {
  const context = useContext(ThemContext);
  if(!context) {
    throw new Error('useStore must be used within a Provider');
  }
  return context;
}


const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = (checked) => {
    const html = document.querySelector("html");
    if (checked) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }
    setIsDarkMode(checked);
  }

  const themeContextValue = {
    isDarkMode,
    toggleTheme,
  }

  return (
    <ThemContext.Provider value={themeContextValue}>
      {children}
    </ThemContext.Provider>
  )
}


 
export { ThemeProvider, useThemeContext }