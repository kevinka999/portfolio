import React from "react";
import { DesktopIcon, DraggableWindow, StartMenu, Taskbar } from "./components";
import { windowInfosMap, windowMetadataMap } from "./const/windows";
import { useWindows } from "./hooks";
import { AppsEnum } from "./types";

const DESKTOP_APPS = Object.values(AppsEnum).map(
  (app) => windowMetadataMap[app].id,
);

const START_MENU_APPS = Object.values(AppsEnum);

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    bringToFront,
    getCurrentActiveZIndexWindow,
  } = useWindows();

  const handleTaskbarClick = (windowId: string) => {
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

  const toggleStartMenu = () => setIsMenuOpen((prev) => !prev);

  const closeStartMenu = () => setIsMenuOpen(false);

  return (
    <div
      className="bg-win95-background flex min-h-screen flex-col overflow-hidden"
      onClick={closeStartMenu}
    >
      <div className="relative h-full flex-grow overflow-hidden p-4">
        <div className="absolute top-4 left-4 grid grid-cols-1 gap-6">
          {DESKTOP_APPS.map((windowId) => {
            const appInfo = windowInfosMap.find(
              (window) => window.id === windowId,
            );
            if (!appInfo) return null;

            return (
              <DesktopIcon
                key={windowId}
                icon={appInfo.icon}
                label={appInfo.title}
                onClick={() => openWindow(windowId, appInfo)}
              />
            );
          })}
        </div>

        {Object.entries(windows).map(([windowId, windowState]) => {
          if (!windowState.isOpen || windowState.isMinimized) return null;

          return (
            <DraggableWindow
              key={windowId}
              title={windowState.title}
              icon={windowState.icon}
              zIndex={windowState.zIndex}
              isActive={windowState.zIndex === getCurrentActiveZIndexWindow()}
              onClose={() => closeWindow(windowId)}
              onFocus={() => bringToFront(windowId)}
              onMinimize={() => minimizeWindow(windowId)}
              initialPosition={windowState.initialPosition}
              initialSize={windowState.initialSize}
            >
              {windowState.content}
            </DraggableWindow>
          );
        })}
      </div>

      <Taskbar
        windows={windows}
        currentActiveZIndexWindow={getCurrentActiveZIndexWindow()}
        onWindowClick={handleTaskbarClick}
        isMenuOpen={isMenuOpen}
        onClickMenu={toggleStartMenu}
        onOpenWindow={(windowId) => {
          const appInfo = windowInfosMap.find(
            (window) => window.id === windowId,
          );
          if (!appInfo) return;
          openWindow(windowId, appInfo);
        }}
      />

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-99998"
        >
          <StartMenu
            apps={START_MENU_APPS}
            onItemClick={(item) => {
              const appInfo = windowInfosMap.find(
                (window) => window.id === item,
              );
              if (!appInfo) return;

              openWindow(item, appInfo);
              setIsMenuOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
