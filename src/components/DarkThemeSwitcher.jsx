import React, { useState } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const dardModeSSwitchHandler = (checked) => {
    toggleTheme(checked);
  };

  return (
    <DarkModeSwitch
      className="dark:bg-gray-300 bg-zinc-600 p-1 rounded-full"
      checked={isDarkMode}
      onChange={dardModeSSwitchHandler}
      defaultValue={isDarkMode}
    />
  );
};

export default DarkThemeSwitcher;
