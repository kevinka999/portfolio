import React from "react";
import { useLocalStorage } from "@/hooks";
import { LanguageAvailables } from "@/types";

interface GlobalContextType {
  currentLanguage: LanguageAvailables;
  setLanguage: (language: LanguageAvailables) => void;
}

export const globalContext = React.createContext<GlobalContextType | undefined>(
  undefined,
);

interface GlobalContextProps {
  children: React.ReactNode;
}

export const GlobalContextProvider = ({ children }: GlobalContextProps) => {
  const [currentLanguage, setCurrentLanguage] =
    useLocalStorage<LanguageAvailables>("currentLanguage", "en-us");

  const setLanguage = (language: LanguageAvailables) => {
    setCurrentLanguage(language);
  };

  return (
    <globalContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </globalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = React.useContext(globalContext);
  if (!context)
    throw new Error("useGlobal must be used within a GlobalContextProvider");

  return context;
};
