import { TASKBAR_HEIGHT } from "@/const";
import { IconType, WindowPosition, WindowSize } from "@/types";
import {
  clampWindowPosition,
  clampWindowSize,
  getEffectiveMinimumWindowSize,
  resolveWindowLayout,
  WINDOW_DEFAULT_POSITION,
} from "@/utils";
import React from "react";
import { MdClose, MdMinimize, MdOutlineSquare } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { Divider } from "./Divider";
import { Icon } from "./Icon";
import { ResizeDirectionEnum, ResizeHandle } from "./ResizeHandle";

type DesktopRect = WindowSize & {
  left: number;
  top: number;
};

type WindowLayout = {
  position: WindowPosition;
  size: WindowSize;
};

type DraggableWindowProps = {
  children: React.ReactNode;
  title: string;
  icon?: IconType;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  initialPosition?: WindowPosition;
  initialSize?: WindowSize;
};

const getDesktopRect = (windowElement: HTMLDivElement | null): DesktopRect => {
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

const isSamePosition = (first: WindowPosition, second: WindowPosition) =>
  first.x === second.x && first.y === second.y;

const isSameSize = (first: WindowSize, second: WindowSize) =>
  first.width === second.width && first.height === second.height;

const getClampedWindowLayout = (
  position: WindowPosition,
  size: WindowSize,
  desktopBounds: WindowSize,
): WindowLayout => {
  const boundedSize = clampWindowSize(size, desktopBounds);

  return {
    size: boundedSize,
    position: clampWindowPosition(position, boundedSize, desktopBounds),
  };
};

const getResizedWindowLayout = ({
  deltaX,
  deltaY,
  desktopBounds,
  direction,
  startPosition,
  startSize,
}: {
  deltaX: number;
  deltaY: number;
  desktopBounds: WindowSize;
  direction: ResizeDirectionEnum;
  startPosition: WindowPosition;
  startSize: WindowSize;
}): WindowLayout => {
  const minimumSize = getEffectiveMinimumWindowSize(desktopBounds);

  let left = startPosition.x;
  let top = startPosition.y;
  let right = startPosition.x + startSize.width;
  let bottom = startPosition.y + startSize.height;

  if (direction.includes("e")) {
    right = Math.min(
      desktopBounds.width,
      Math.max(left + minimumSize.width, right + deltaX),
    );
  }

  if (direction.includes("w")) {
    left = Math.max(0, Math.min(right - minimumSize.width, left + deltaX));
  }

  if (direction.includes("s")) {
    bottom = Math.min(
      desktopBounds.height,
      Math.max(top + minimumSize.height, bottom + deltaY),
    );
  }

  if (direction.includes("n")) {
    top = Math.max(0, Math.min(bottom - minimumSize.height, top + deltaY));
  }

  return getClampedWindowLayout(
    { x: left, y: top },
    { width: right - left, height: bottom - top },
    desktopBounds,
  );
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
  initialPosition = WINDOW_DEFAULT_POSITION,
  initialSize,
}: DraggableWindowProps) => {
  const [position, setPosition] =
    React.useState<WindowPosition>(initialPosition);
  const [size, setSize] = React.useState<WindowSize>(
    initialSize ??
      clampWindowSize({ width: 0, height: 0 }, { width: 0, height: 0 }),
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] =
    React.useState<ResizeDirectionEnum | null>(null);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [prevState, setPrevState] = React.useState<WindowLayout>({
    position: initialPosition,
    size: initialSize ?? { width: 0, height: 0 },
  });
  const [desktopSize, setDesktopSize] = React.useState<WindowSize | null>(null);

  const windowRef = React.useRef<HTMLDivElement>(null);
  const hasInitializedLayoutRef = React.useRef(false);
  const dragStartRef = React.useRef({ x: 0, y: 0 });
  const resizeStartRef = React.useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
  });

  React.useLayoutEffect(() => {
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

  React.useLayoutEffect(() => {
    if (!desktopSize) return;

    if (!hasInitializedLayoutRef.current) {
      const initialLayout = resolveWindowLayout({
        desktopBounds: desktopSize,
        initialPosition,
        initialSize,
      });

      hasInitializedLayoutRef.current = true;
      setPosition(initialLayout.position);
      setSize(initialLayout.size);
      setPrevState(initialLayout);
      return;
    }

    if (isMaximized) {
      const maximizedPosition = { x: 0, y: 0 };

      if (!isSamePosition(position, maximizedPosition)) {
        setPosition(maximizedPosition);
      }

      if (!isSameSize(size, desktopSize)) {
        setSize(desktopSize);
      }

      return;
    }

    const boundedLayout = getClampedWindowLayout(position, size, desktopSize);

    if (!isSameSize(size, boundedLayout.size)) {
      setSize(boundedLayout.size);
    }

    if (!isSamePosition(position, boundedLayout.position)) {
      setPosition(boundedLayout.position);
    }
  }, [desktopSize, initialPosition, initialSize, isMaximized, position, size]);

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
    const availableDesktopSize =
      desktopSize ?? getDesktopRect(windowRef.current);

    if (!isMaximized) {
      setPrevState({ position, size });
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize(availableDesktopSize);
      return;
    }

    const restoredLayout = getClampedWindowLayout(
      prevState.position,
      prevState.size,
      availableDesktopSize,
    );

    setIsMaximized(false);
    setPosition(restoredLayout.position);
    setSize(restoredLayout.size);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const desktopRect = getDesktopRect(windowRef.current);
      const desktopBounds = {
        width: desktopRect.width,
        height: desktopRect.height,
      };

      if (isDragging && !isMaximized) {
        setPosition(
          clampWindowPosition(
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
        const resizedLayout = getResizedWindowLayout({
          deltaX,
          deltaY,
          desktopBounds,
          direction: resizeDirection,
          startPosition: { x: newX, y: newY },
          startSize: { width: newWidth, height: newHeight },
        });

        setPosition(resizedLayout.position);
        setSize(resizedLayout.size);
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
  }, [isDragging, isResizing, resizeDirection, size, isMaximized]);

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

      <div className="bg-win95-gray h-full min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto p-2">
        {children}
      </div>
    </div>
  );
};
