import { WindowInfo, WindowState } from "@/types";
import { getLastPositionOpened } from "@/utils";
import React from "react";

type WindowsContextType = {
  windows: Record<string, WindowState>;
  openWindow: (windowId: string, state?: WindowInfo) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  bringToFront: (windowId: string) => void;
  isWindowOpen: (windowId: string) => boolean;
  getCurrentActiveZIndexWindow: () => number;
};

export const WindowsContext = React.createContext<
  WindowsContextType | undefined
>(undefined);

export const WindowsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windowsState, setWindowsState] = React.useState<
    Record<string, WindowState>
  >({});

  const bringToFront = (windowId: string) => {
    setWindowsState((prev) => {
      const lastIndex = Math.max(...Object.values(prev).map((w) => w.zIndex));

      return {
        ...prev,
        [windowId]: {
          ...prev[windowId],
          zIndex: lastIndex + 1,
          isMinimized: false,
          isOpen: true,
        },
      };
    });
  };

  const openWindow = (windowId: string, state?: WindowInfo) => {
    setWindowsState((prev) => {
      const lastPositionOpened = getLastPositionOpened(prev);
      const windowState = prev[windowId] || state;

      if (!windowState)
        throw new Error(`No window content for ${windowId} found`);

      const lastIndex =
        Object.values(prev).length > 0
          ? Math.max(...Object.values(prev).map((w) => w.zIndex))
          : 1000;

      if (windowState?.isOpen) {
        return {
          ...prev,
          [windowId]: {
            ...prev[windowId],
            isMinimized: false,
            zIndex: lastIndex + 1,
          },
        };
      }

      return {
        ...prev,
        [windowId]: {
          ...windowState,
          isOpen: true,
          isMinimized: false,
          zIndex: lastIndex + 1,
          initialPosition: windowState?.initialPosition || {
            x: lastPositionOpened.x + 20,
            y: lastPositionOpened.y + 20,
          },
        },
      };
    });
  };

  const minimizeWindow = (windowId: string) => {
    setWindowsState((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true },
    }));
  };

  const closeWindow = (windowId: string) => {
    setWindowsState((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isOpen: false,
        isMinimized: false,
      },
    }));
  };

  const isWindowOpen = (windowId: string) =>
    windowsState[windowId]?.isOpen || false;

  const getCurrentActiveZIndexWindow = () => {
    const openedWindows = Object.values(windowsState).filter(
      (w) => w.isOpen && !w.isMinimized,
    );

    return openedWindows.length > 0
      ? Math.max(...openedWindows.map((w) => w.zIndex))
      : 0;
  };

  return (
    <WindowsContext.Provider
      value={{
        windows: windowsState,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
        isWindowOpen,
        getCurrentActiveZIndexWindow,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};
