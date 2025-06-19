import React from "react";
import { DesktopIcon } from "./components/DesktopIcon";
import { StartMenu } from "./components/StartMenu";
import { Taskbar } from "./components/Taskbar";
import { Windows, WindowsEnum } from "./types";
import { windowInfos } from "./const";

const initialWindows: Windows = {
  [WindowsEnum.ABOUT]: {
    isOpen: true,
    isMinimized: false,
    zIndex: 1000,
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
      <div className="relative h-full flex-grow overflow-hidden p-4"></div>

      <div className="absolute top-4 left-4 grid grid-cols-1 gap-6">
        {Object.keys(windows).map((itemId) => {
          const id: WindowsEnum = itemId as WindowsEnum;

          return (
            <DesktopIcon
              icon={windowInfos[id].icon}
              label={windowInfos[id].title}
              onClick={() => {}}
            />
          );
        })}
      </div>

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onWindowClick={() => {}}
        isMenuOpen={isMenuOpen}
        onClickMenu={toggleStartMenu}
      />

      {isMenuOpen && (
        <StartMenu
          windowsToShow={Object.keys(windows) as WindowsEnum[]}
          onItemClick={(itemId) => {
            setIsMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};
