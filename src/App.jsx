import React, { useState } from "react";
import { ThemeProvider, useThemeContext } from "./store/ThemeContext";
import MainHeader from "./components/MainHeader";
import CodeReceiver from "./components/CodeReceiver";
import { ToastContainer, toast } from "react-toastify";
import GemList from "./components/skillgem/GemList";
import Notes from "./components/Notes";
import Items from "./components/gear_items/ItemsList";
import { useAppContext } from "./store/AppContext";
import ToTop from "./components/commons/ToTop";

function App() {
  const { isDarkMode } = useThemeContext();
  const { appLoading } = useAppContext();
  const [toTopClasses, setToTopClasses] = useState("hidden");

  const toTopShow = () => {
    if (document.getElementById("mainBody").getBoundingClientRect().top < -20) {
      setToTopClasses("block");
    } else {
      setToTopClasses("hidden");
    }
  }

  window.onscroll = function () {
    toTopShow()
  }

  return (
    <div id="mainBody" className="relative bg-content1 dark:bg-backgroundPrimary min-h-screen">
      <MainHeader/>
      <div className="container mx-auto ">
        <div className="row">
          <div className="columns-1">
            <CodeReceiver />
          </div>
        </div>
        {!appLoading && (
          <div className="row">
            <GemList />
            <Items />
            <Notes />
          </div>
        )}
        <ToTop className={toTopClasses} propClasses={toTopClasses} />
      </div>
      <ToastContainer
        closeOnClick={true}
        autoClose={1200}
        theme={isDarkMode ? "light" : "dark"}
        closeButton={false}
      />
    </div>
  );
}

export default App;
