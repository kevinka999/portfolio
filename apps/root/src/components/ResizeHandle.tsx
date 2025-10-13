import { twMerge } from "tailwind-merge";

export enum ResizeDirectionEnum {
  N = "n",
  S = "s",
  E = "e",
  W = "w",
  NE = "ne",
  NW = "nw",
  SE = "se",
  SW = "sw",
}

type ResizeHandleProps = {
  direction: ResizeDirectionEnum;
  handleResizeStart: (
    e: React.MouseEvent,
    direction: ResizeDirectionEnum,
  ) => void;
};

export const ResizeHandle = ({
  direction,
  handleResizeStart,
}: ResizeHandleProps) => (
  <div
    className={twMerge(
      "absolute bg-transparent",
      direction === "n" && "top-0 left-0 h-1 w-full cursor-n-resize",
      direction === "s" && "bottom-0 left-0 h-1 w-full cursor-s-resize",
      direction === "e" && "top-0 right-0 h-full w-1 cursor-e-resize",
      direction === "w" && "top-0 left-0 h-full w-1 cursor-w-resize",
      direction === "ne" && "top-0 right-0 h-2 w-2 cursor-ne-resize",
      direction === "nw" && "top-0 left-0 h-2 w-2 cursor-nw-resize",
      direction === "se" && "right-0 bottom-0 h-2 w-2 cursor-se-resize",
      direction === "sw" && "bottom-0 left-0 h-2 w-2 cursor-sw-resize",
    )}
    onMouseDown={(e) => handleResizeStart(e, direction)}
  />
);
