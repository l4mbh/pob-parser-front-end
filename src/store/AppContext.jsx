import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  codeDetected: "",
  setCodeDetected: () => {},
  items: null,
  setItems: () => {},
  skillGems: [],
  setSkillGems: () => {},
  notes: null,
  setNotes: () => {},
  appLoading: false,
  setAppLoading: () => {},
});

// Custom context hook
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStore must be used within a Provider");
  }
  return context;
};

// Custom provider
const AppProvider = ({ children }) => {
  const [decodedJSON, setDecodedJSON] = useState(null);
  const [skillGems, setSkillGems] = useState(null);
  const [items, setItems] = useState(null);
  const [notes, setNotes] = useState(null);
  const [appLoading, setAppLoading] = useState(false);

  const appContextValue = {
    decodedJSON,
    setDecodedJSON,
    skillGems,
    setSkillGems,
    items,
    setItems,
    notes,
    setNotes,
    appLoading,
    setAppLoading
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
