import {
  WINDOW_CASCADE_OFFSET,
  WINDOW_DEFAULT_INSET_RATIO,
  WINDOW_DEFAULT_POSITION,
  WINDOW_MIN_SIZE,
} from "@/const";
import { WindowPosition, WindowSize } from "@/types";

type DesktopBounds = WindowSize;

type ResolveWindowLayoutParams = {
  desktopBounds: DesktopBounds;
  initialPosition?: WindowPosition;
  initialSize?: WindowSize;
};

export const getEffectiveMinimumWindowSize = (
  desktopBounds: DesktopBounds,
): WindowSize => ({
  width: Math.min(WINDOW_MIN_SIZE.width, desktopBounds.width),
  height: Math.min(WINDOW_MIN_SIZE.height, desktopBounds.height),
});

export const clampWindowSize = (
  size: WindowSize,
  desktopBounds: DesktopBounds,
): WindowSize => {
  const minimumSize = getEffectiveMinimumWindowSize(desktopBounds);

  return {
    width: Math.min(
      desktopBounds.width,
      Math.max(minimumSize.width, Math.round(size.width)),
    ),
    height: Math.min(
      desktopBounds.height,
      Math.max(minimumSize.height, Math.round(size.height)),
    ),
  };
};

export const clampWindowPosition = (
  position: WindowPosition,
  size: WindowSize,
  desktopBounds: DesktopBounds,
): WindowPosition => {
  const boundedSize = clampWindowSize(size, desktopBounds);
  const maxX = Math.max(0, desktopBounds.width - boundedSize.width);
  const maxY = Math.max(0, desktopBounds.height - boundedSize.height);

  return {
    x: Math.max(0, Math.min(Math.round(position.x), maxX)),
    y: Math.max(0, Math.min(Math.round(position.y), maxY)),
  };
};

export const getDefaultWindowSize = (
  desktopBounds: DesktopBounds,
): WindowSize => {
  const requestedSize = {
    width: desktopBounds.width * (1 - WINDOW_DEFAULT_INSET_RATIO * 2),
    height: desktopBounds.height * (1 - WINDOW_DEFAULT_INSET_RATIO * 2),
  };

  return clampWindowSize(requestedSize, desktopBounds);
};

export const resolveWindowLayout = ({
  desktopBounds,
  initialPosition = WINDOW_DEFAULT_POSITION,
  initialSize,
}: ResolveWindowLayoutParams) => {
  const size = clampWindowSize(
    initialSize ?? getDefaultWindowSize(desktopBounds),
    desktopBounds,
  );
  const position = clampWindowPosition(initialPosition, size, desktopBounds);

  return { position, size };
};

export const getCascadedWindowPosition = (
  position: WindowPosition,
): WindowPosition => ({
  x: position.x + WINDOW_CASCADE_OFFSET,
  y: position.y + WINDOW_CASCADE_OFFSET,
});

export { WINDOW_DEFAULT_POSITION };
