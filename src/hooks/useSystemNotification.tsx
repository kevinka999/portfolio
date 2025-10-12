import { SystemNotificationContext } from "@/contexts/SystemNotificationContext";
import React from "react";

export const useSystemNotification = () => {
  const context = React.useContext(SystemNotificationContext);

  if (!context) {
    throw new Error(
      "useSystemNotification must be used within a SystemNotificationProvider",
    );
  }

  return context;
};
