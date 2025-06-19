import { Windows } from "@/types";

export const getLastPositionOpened = (windows: Windows) => {
  const initialPosition = { x: 100, y: 50 };

  return (
    Object.values(windows)
      .filter((window) => window.isOpen && window.initialPosition)
      .map((window) => window.initialPosition!)
      .sort((a, b) => b.x + b.y - (a.x + a.y))[0] || initialPosition
  );
};
