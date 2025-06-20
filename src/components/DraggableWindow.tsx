import React from "react";
import { Icon } from "./Icon";
import { IconType } from "@/types";
import { twMerge } from "tailwind-merge";
import { MdClose, MdMinimize, MdOutlineSquare } from "react-icons/md";
import { taskbarHeight } from "@/const";

type DraggableWindowProps = {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
};

const initialSize = { width: 600, height: 400 };

export const DraggableWindow = ({
  children,
  title,
  icon,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  initialPosition = { x: 100, y: 50 },
}: DraggableWindowProps) => {
  const [position, setPosition] = React.useState(initialPosition);
  const [size, setSize] = React.useState(initialSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [prevState, setPrevState] = React.useState({
    position: initialPosition,
    size: initialSize,
  });
  const [desktopSize, setDesktopSize] = React.useState({
    width: 600,
    height: 400,
  });

  const windowRef = React.useRef<HTMLDivElement>(null);
  const titleBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateDesktopSize = () => {
      setDesktopSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
    };

    updateDesktopSize();
    window.addEventListener("resize", updateDesktopSize);

    return () => {
      window.removeEventListener("resize", updateDesktopSize);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;

    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    onFocus();

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleTitleBarDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMaximize();
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ position, size });
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize({ width: desktopSize.width, height: desktopSize.height });
      return;
    }

    setIsMaximized(false);
    setPosition(prevState.position);
    setSize(prevState.size);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height - taskbarHeight;

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: boundedX, y: boundedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart, size, isMaximized]);

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  };

  const handleMaximizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleMaximize();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
  };

  return (
    <div
      ref={windowRef}
      className={twMerge(
        "bg-win95-gray boxshadow-win95 absolute flex flex-col p-1 transition-none select-none",
        isDragging && "cursor-move",
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 1000 : 100,
      }}
      onClick={handleWindowClick}
    >
      <div
        ref={titleBarRef}
        className={twMerge(
          "flex cursor-move items-center justify-between px-2 py-1 select-none",
          isActive
            ? "bg-win95-blue text-white"
            : "bg-win95-gray-dark text-win95-gray",
        )}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        <div className="flex items-center">
          {icon && <Icon icon={icon} size="verySmall" className="mr-1" />}
          <span className="text-sm font-normal">{title}</span>
        </div>

        <div className="flex gap-2">
          <button
            className="boxshadow-win95 bg-win95-gray flex h-[16px] w-[18px] cursor-pointer items-center justify-center p-0.5 text-black"
            onClick={handleMinimizeClick}
            aria-label="Minimize"
          >
            <MdMinimize />
          </button>
          <button
            className="boxshadow-win95 bg-win95-gray flex h-[16px] w-[18px] cursor-pointer items-center justify-center p-0.5 text-black"
            onClick={handleMaximizeClick}
            aria-label={isMaximized ? "Restore" : "Maximize"}
          >
            <MdOutlineSquare />
          </button>
          <button
            className="boxshadow-win95 bg-win95-gray flex h-[16px] w-[18px] cursor-pointer items-center justify-center p-0.5 text-black"
            onClick={handleClose}
            aria-label="Close"
          >
            <MdClose />
          </button>
        </div>
      </div>

      <div className="bg-win95-gray border-win95-gray-dark border-b px-2 py-1 text-xs">
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:underline">File</span>
          <span className="cursor-pointer hover:underline">Edit</span>
          <span className="cursor-pointer hover:underline">View</span>
          <span className="cursor-pointer hover:underline">Help</span>
        </div>
      </div>

      <div className="bg-win95-gray h-full w-full flex-1 overflow-y-auto p-2">
        {children}
      </div>
    </div>
  );
};
