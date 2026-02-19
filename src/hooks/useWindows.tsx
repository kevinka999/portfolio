import { WindowsContext } from "@/contexts";
import React from "react";

export const useWindows = () => {
  const context = React.useContext(WindowsContext);
  if (!context)
    throw new Error("useWindows must be used within a WindowsProvider");

  return context;
};
