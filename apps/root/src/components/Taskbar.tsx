import { TASKBAR_HEIGHT } from "@/const";
import { windowMetadataMap } from "@/const/windows";
import { useDoubleClick } from "@/hooks";
import { AppsEnum, IconType, WindowState } from "@/types";
import React from "react";
import { BiTime } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";
import { LanguageSwitcher } from "./LanguageSwitcher";

const taskbarIcons: { id: string; icon: IconType; title: string }[] = [
  {
    id: windowMetadataMap[AppsEnum.MSN].id,
    title: windowMetadataMap[AppsEnum.MSN].title,
    icon: "msn",
  },
];

interface TaskbarProps {
  windows: Record<string, WindowState>;
  isMenuOpen: boolean;
  currentActiveZIndexWindow: number;
  onClickMenu: () => void;
  onWindowClick: (windowId: string) => void;
  onOpenWindow: (windowId: string) => void;
}

export const Taskbar = ({
  windows,
  isMenuOpen,
  onClickMenu,
  currentActiveZIndexWindow,
  onWindowClick,
  onOpenWindow,
}: TaskbarProps) => {
  const [time, setTime] = React.useState<Date>(new Date());

  const { onClick: handleIconClick } = useDoubleClick({
    onDoubleClick: onOpenWindow,
    delay: 500,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleTaskbarButtonClick = (windowId: string) => {
    onWindowClick(windowId);
  };

  return (
    <div
      className="bg-win95-gray z-50 flex items-center justify-between border-t border-white"
      style={{
        height: TASKBAR_HEIGHT,
      }}
    >
      <div className="flex-shrink-0">
        <button
          className={twMerge(
            "button bg-win95-gray mx-1 flex h-8 items-center px-2",
            isMenuOpen ? "active" : "",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClickMenu();
          }}
        >
          <Icon icon="logo" size="medium" alt="Start" className="mr-1" />
          <span className="font-bold">Start</span>
        </button>
      </div>

      <div className="flex flex-grow items-center space-x-1 overflow-x-auto px-1">
        {Object.entries(windows).map(([windowId, windowState]) => {
          if (!windowState.isOpen) return null;

          const isActiveAndVisible =
            windowState.zIndex === currentActiveZIndexWindow &&
            !windowState.isMinimized;

          return (
            <button
              key={windowId}
              className={twMerge(
                "button bg-win95-gray flex h-8 max-w-[200px] min-w-[120px] items-center px-2",
                isActiveAndVisible ? "active" : "",
              )}
              onClick={() => handleTaskbarButtonClick(windowId)}
              title={windowState.title}
            >
              <div className="mr-2">
                <Icon icon={windowState.icon} size="small" />
              </div>
              <span className="truncate text-sm">{windowState.title}</span>
            </button>
          );
        })}
      </div>

      <div className="border-win95-gray-dark flex h-full items-center border-l">
        <LanguageSwitcher />
      </div>

      <div className="border-win95-gray-dark flex h-full items-center border-l px-2">
        {taskbarIcons.map((icon) => (
          <button
            key={icon.id}
            onClick={() => handleIconClick(icon.id)}
            title={icon.title}
          >
            <Icon icon={icon.icon} size="verySmall" />
          </button>
        ))}
      </div>

      <div className="border-win95-gray-dark flex h-full flex-shrink-0 items-center border-l">
        <div className="bg-win95-gray flex items-center justify-center px-2 text-xs">
          <BiTime size={14} className="mr-1" />
          <span className="mt-1 select-none">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
