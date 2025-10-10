import { useLocalStorage } from "@/hooks";
import { LanguageAvailables } from "@/types";
import React from "react";

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
