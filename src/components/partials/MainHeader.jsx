import React from "react";
import DarkThemeSwitcher from "./DarkThemeSwitcher";
import { toast } from "react-toastify";

const MainHeader = () => {
  return (
    <div className="container backdrop-blur sticky top-0 overflow-hidden flex justify-between items-center min-w-full py-5 px-5 md:px-10 mx-0 bg-white/30 dark:bg-gray-800/30 transition-all">
      <h1 className="text-center mx-0 p-0 font-bold uppercase text-light dark:text-dark">
        Pob Find
      </h1>
      <div>
        <DarkThemeSwitcher />
      </div>
    </div>
  );
};

export default MainHeader;
