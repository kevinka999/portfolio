import { AudioContext } from "@/contexts";
import React from "react";

export const useAudio = () => {
  const context = React.useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }

  return context;
};
