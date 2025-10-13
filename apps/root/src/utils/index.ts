import { WindowState } from "@/types";

export const getLastPositionOpened = (windows: Record<string, WindowState>) => {
  const initialPosition = { x: 100, y: 50 };

  return (
    Object.values(windows)
      .filter((window) => window?.isOpen && window?.initialPosition)
      .map((window) => window?.initialPosition)
      .sort(
        (a, b) => (b?.x || 0) + (b?.y || 0) - (a?.x || 0) - (a?.y || 0),
      )[0] || initialPosition
  );
};
