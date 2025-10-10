import { globalContext } from "@/contexts";
import React from "react";

export const useGlobal = () => {
  const context = React.useContext(globalContext);
  if (!context)
    throw new Error("useGlobal must be used within a GlobalContextProvider");

  return context;
};
