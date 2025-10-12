import { Icon } from "@/components";
import { TASKBAR_HEIGHT } from "@/const";
import { SystemNotification } from "@/types/notification";
import { nanoid } from "nanoid";
import React from "react";

const NOTIFICATION_MARGIN = 10;

export type SystemNotificationContextType = {
  notifications: SystemNotification[];
  addNotification: (
    notification: Omit<SystemNotification, "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  handleNotificationClick: (notification: SystemNotification) => void;
};

export const SystemNotificationContext =
  React.createContext<SystemNotificationContextType | null>(null);

export const SystemNotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = React.useState<
    SystemNotification[]
  >([]);

  const addNotification = (
    notification: Omit<SystemNotification, "id" | "timestamp">,
  ) => {
    const newNotification: SystemNotification = {
      ...notification,
      id: nanoid(),
      timestamp: Date.now(),
    };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 10000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const handleNotificationClick = (notification: SystemNotification) => {
    notification.onClick();
    removeNotification(notification.id);
  };

  return (
    <SystemNotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        handleNotificationClick,
      }}
    >
      {children}

      <div
        className="fixed right-4 z-99999 flex flex-col"
        style={{
          bottom: `${TASKBAR_HEIGHT + NOTIFICATION_MARGIN}px`,
          gap: `${NOTIFICATION_MARGIN}px`,
        }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className="bg-win95-gray boxshadow-win95 flex w-[300px] cursor-pointer flex-col gap-1 p-2"
          >
            <div className="flex items-center gap-2">
              <Icon icon={notification.type} size="small" />
              <h3 className="text-md">{notification.title}</h3>
            </div>

            <p className="text-sm">{notification.message}</p>
          </div>
        ))}
      </div>
    </SystemNotificationContext.Provider>
  );
};
