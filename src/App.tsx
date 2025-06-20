import React from "react";
import { DesktopIcon, DraggableWindow, StartMenu, Taskbar } from "./components";
import { Windows, WindowsEnum } from "./types";
import { windowInfos } from "./const";
import { getLastPositionOpened } from "./utils";
import { About } from "./screens/About";

const mapPageComponent: Record<WindowsEnum, React.ReactNode> = {
  [WindowsEnum.ABOUT]: <About />,
  [WindowsEnum.PROJECTS]: <></>,
  [WindowsEnum.SKILLS]: <></>,
  [WindowsEnum.EXPERIENCE]: <></>,
  [WindowsEnum.CONTACT]: <></>,
};

const initialWindows: Windows = {
  [WindowsEnum.ABOUT]: {
    isOpen: true,
    isMinimized: false,
    zIndex: 1000,
    initialPosition: { x: 100, y: 50 },
  },
  [WindowsEnum.PROJECTS]: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
  },
  [WindowsEnum.SKILLS]: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
  },
  [WindowsEnum.EXPERIENCE]: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
  },
  [WindowsEnum.CONTACT]: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
  },
};

export const App = () => {
  const [windows, setWindows] = React.useState<Windows>(initialWindows);
  const [activeWindow, setActiveWindow] = React.useState<WindowsEnum | null>(
    WindowsEnum.ABOUT,
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [nextZIndex, setNextZIndex] = React.useState(1001);

  const bringToFront = (windowId: WindowsEnum) => {
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

  const openWindow = (windowId: WindowsEnum) => {
    setWindows((prev) => {
      const window = prev[windowId];

      if (window.isOpen) {
        bringToFront(windowId);
        return prev;
      }

      const lastPositionOpened = getLastPositionOpened(prev);
      const newWindow = {
        ...prev,
        [windowId]: {
          isOpen: true,
          isMinimized: false,
          zIndex: nextZIndex,
          initialPosition: {
            x: lastPositionOpened.x + 20,
            y: lastPositionOpened.y + 20,
          },
        },
      };
      setActiveWindow(windowId);
      setNextZIndex((prev) => prev + 1);
      return newWindow;
    });
  };

  const minimizeWindow = (windowId: WindowsEnum) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true },
    }));
  };

  const closeWindow = (windowId: WindowsEnum) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false, isMinimized: false },
    }));
  };

  const handleTaskbarClick = (windowId: WindowsEnum) => {
    const window = windows[windowId];

    if (window.isMinimized) {
      bringToFront(windowId);
      return;
    }

    if (
      window.zIndex === Math.max(...Object.values(windows).map((w) => w.zIndex))
    ) {
      minimizeWindow(windowId);
      return;
    }

    bringToFront(windowId);
  };

  const toggleStartMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeStartMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className="bg-win95-background flex min-h-screen flex-col overflow-hidden"
      onClick={closeStartMenu}
    >
      <div className="relative h-full flex-grow overflow-hidden p-4">
        <div className="absolute top-4 left-4 grid grid-cols-1 gap-6">
          {Object.keys(windows).map((itemId) => {
            const id: WindowsEnum = itemId as WindowsEnum;

            return (
              <DesktopIcon
                icon={windowInfos[id].icon}
                label={windowInfos[id].title}
                onClick={() => openWindow(id)}
              />
            );
          })}
        </div>

        {Object.entries(windows).map(([windowId, windowState]) => {
          const id: WindowsEnum = windowId as WindowsEnum;
          if (!windowState.isOpen || windowState.isMinimized) return null;

          return (
            <DraggableWindow
              key={windowId}
              title={windowInfos[id].title}
              icon={windowInfos[id].icon}
              isActive={activeWindow === windowId}
              onClose={() => closeWindow(windowId as WindowsEnum)}
              onFocus={() => bringToFront(windowId as WindowsEnum)}
              onMinimize={() => minimizeWindow(windowId as WindowsEnum)}
              initialPosition={windowState.initialPosition}
            >
              {mapPageComponent[id]}
            </DraggableWindow>
          );
        })}
      </div>

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={(windowId) =>
          handleTaskbarClick(windowId as WindowsEnum)
        }
        isMenuOpen={isMenuOpen}
        onClickMenu={toggleStartMenu}
      />

      {isMenuOpen && (
        <StartMenu
          windowsToShow={Object.keys(windows) as WindowsEnum[]}
          onItemClick={(item) => {
            openWindow(item as WindowsEnum);
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};
