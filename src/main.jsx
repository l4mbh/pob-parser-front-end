import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./store/ThemeContext.jsx";
import "react-toastify/ReactToastify.min.css";
import { AppProvider } from "./store/AppContext.jsx";

import '@fortawesome/fontawesome-free/css/all.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
