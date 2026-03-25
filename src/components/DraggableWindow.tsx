import { TASKBAR_HEIGHT } from "@/const";
import { IconType } from "@/types";
import React from "react";
import { MdClose, MdMinimize, MdOutlineSquare } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Divider } from "./Divider";
import { Icon } from "./Icon";
import { ResizeDirectionEnum, ResizeHandle } from "./ResizeHandle";

type DraggableWindowProps = {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
};

const minSize = { width: 200, height: 150 };

const getDesktopRect = (windowElement: HTMLDivElement | null) => {
  const parentRect = windowElement?.parentElement?.getBoundingClientRect();

  if (parentRect) {
    return {
      left: parentRect.left,
      top: parentRect.top,
      width: parentRect.width,
      height: parentRect.height,
    };
  }

  return {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight - TASKBAR_HEIGHT,
  };
};

const clampPosition = (
  nextPosition: { x: number; y: number },
  nextSize: { width: number; height: number },
  desktopBounds: { width: number; height: number },
) => {
  const maxX = Math.max(0, desktopBounds.width - nextSize.width);
  const maxY = Math.max(0, desktopBounds.height - nextSize.height);

  return {
    x: Math.max(0, Math.min(nextPosition.x, maxX)),
    y: Math.max(0, Math.min(nextPosition.y, maxY)),
  };
};

export const DraggableWindow = ({
  children,
  title,
  icon,
  zIndex,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 600, height: 400 },
}: DraggableWindowProps) => {
  const [position, setPosition] = React.useState(initialPosition);
  const [size, setSize] = React.useState(initialSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] =
    React.useState<ResizeDirectionEnum | null>(null);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [prevState, setPrevState] = React.useState({
    position: initialPosition,
    size: initialSize,
  });
  const [desktopSize, setDesktopSize] = React.useState({
    width: 600,
    height: 400,
  });

  const windowRef = React.useRef<HTMLDivElement>(null);
  const dragStartRef = React.useRef({ x: 0, y: 0 });
  const resizeStartRef = React.useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
  });

  React.useEffect(() => {
    const updateDesktopSize = () => {
      const desktopRect = getDesktopRect(windowRef.current);

      setDesktopSize({
        width: desktopRect.width,
        height: desktopRect.height,
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
    onFocus();

    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      dragStartRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    setIsDragging(true);
  };

  const handleResizeStart = (
    e: React.MouseEvent,
    direction: ResizeDirectionEnum,
  ) => {
    if (isMaximized) return;

    e.preventDefault();
    e.stopPropagation();
    setResizeDirection(direction);
    onFocus();

    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      positionX: position.x,
      positionY: position.y,
    };

    setIsResizing(true);
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
    setPosition(clampPosition(prevState.position, prevState.size, desktopSize));
    setSize(prevState.size);
  };

  React.useEffect(() => {
    if (!isMaximized) return;

    setPosition({ x: 0, y: 0 });
    setSize(desktopSize);
  }, [desktopSize, isMaximized]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const desktopRect = getDesktopRect(windowRef.current);
      const desktopBounds = {
        width: desktopRect.width,
        height: desktopRect.height,
      };

      if (isDragging && !isMaximized) {
        setPosition(
          clampPosition(
            {
              x: e.clientX - desktopRect.left - dragStartRef.current.x,
              y: e.clientY - desktopRect.top - dragStartRef.current.y,
            },
            size,
            desktopBounds,
          ),
        );
      }

      if (isResizing && !isMaximized && resizeDirection) {
        const deltaX = e.clientX - resizeStartRef.current.x;
        const deltaY = e.clientY - resizeStartRef.current.y;

        let newWidth = resizeStartRef.current.width;
        let newHeight = resizeStartRef.current.height;
        let newX = resizeStartRef.current.positionX;
        let newY = resizeStartRef.current.positionY;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(
            minSize.width,
            resizeStartRef.current.width + deltaX,
          );
        } else if (resizeDirection.includes("w")) {
          const widthChange = Math.min(
            deltaX,
            resizeStartRef.current.width - minSize.width,
          );
          newWidth = resizeStartRef.current.width - widthChange;
          newX = resizeStartRef.current.positionX + widthChange;
        }

        if (resizeDirection.includes("s")) {
          newHeight = Math.max(
            minSize.height,
            resizeStartRef.current.height + deltaY,
          );
        } else if (resizeDirection.includes("n")) {
          const heightChange = Math.min(
            deltaY,
            resizeStartRef.current.height - minSize.height,
          );
          newHeight = resizeStartRef.current.height - heightChange;
          newY = resizeStartRef.current.positionY + heightChange;
        }

        const boundedPosition = clampPosition(
          { x: newX, y: newY },
          { width: newWidth, height: newHeight },
          desktopBounds,
        );

        setPosition(boundedPosition);
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    resizeDirection,
    size,
    isMaximized,
  ]);

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
    if (!isActive) onFocus();
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
        zIndex,
      }}
      onClick={handleWindowClick}
    >
      {!isMaximized && (
        <>
          {Object.values(ResizeDirectionEnum).map(
            (direction: ResizeDirectionEnum) => (
              <ResizeHandle
                direction={direction}
                handleResizeStart={handleResizeStart}
              />
            ),
          )}
        </>
      )}

      <div
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

        <div className="flex gap-1">
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

      <div className="px-2 py-1 text-xs">
        <div className="flex space-x-4">
          <span className="cursor-pointer hover:underline">File</span>
          <span className="cursor-pointer hover:underline">Edit</span>
          <span className="cursor-pointer hover:underline">View</span>
          <span className="cursor-pointer hover:underline">Help</span>
        </div>
      </div>

      <Divider />

      <div className="bg-win95-gray h-full w-full flex-1 overflow-y-auto p-2">
        {children}
      </div>
    </div>
  );
};
