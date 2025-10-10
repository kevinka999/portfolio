import { WindowInfo, WindowState } from "@/types";
import { getLastPositionOpened } from "@/utils";
import React from "react";

type WindowsContextType = {
  windows: Record<string, WindowState>;
  activeWindow: string | null;
  openWindow: (windowId: string, state: WindowInfo) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  bringToFront: (windowId: string) => void;
  isWindowOpen: (windowId: string) => boolean;
};

export const WindowsContext = React.createContext<
  WindowsContextType | undefined
>(undefined);

export const WindowsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [windows, setWindows] = React.useState<Record<string, WindowState>>({});
  const [activeWindow, setActiveWindow] = React.useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = React.useState<number>(1001);

  const openWindow = (windowId: string, state: WindowInfo) => {
    setWindows((prev) => {
      const lastPositionOpened = getLastPositionOpened(prev);

      bringToFront(windowId);
      if (prev[windowId]) return prev;

      return {
        ...prev,
        [windowId]: {
          ...state,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZIndex,
          initialPosition: state.initialPosition || {
            x: lastPositionOpened.x + 20,
            y: lastPositionOpened.y + 20,
          },
        },
      };
    });
  };

  const bringToFront = (windowId: string) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: {
        ...prev[windowId],
        isMinimized: false,
        zIndex: nextZIndex,
      },
    }));
    setActiveWindow(windowId);
    setNextZIndex((prev) => prev + 1);
  };

  const minimizeWindow = (windowId: string) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true },
    }));
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false, isMinimized: false },
    }));
  };

  const isWindowOpen = (windowId: string) => windows[windowId]?.isOpen || false;

  return (
    <WindowsContext.Provider
      value={{
        windows,
        activeWindow,
        openWindow,
        closeWindow,
        minimizeWindow,
        bringToFront,
        isWindowOpen,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};
