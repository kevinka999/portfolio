import { MSNContext } from "@/contexts";
import React from "react";

export const useMSN = () => {
  const context = React.useContext(MSNContext);
  if (!context) throw new Error("useMSN must be used within a MSNProvider");

  return context;
};
