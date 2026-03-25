export * from "./windowLayout";

import { WindowState } from "@/types";
import { WINDOW_DEFAULT_POSITION } from "@/const";

export const getLastPositionOpened = (windows: Record<string, WindowState>) => {
  return (
    Object.values(windows)
      .filter((window) => window?.isOpen && window?.initialPosition)
      .map((window) => window?.initialPosition)
      .sort(
        (a, b) => (b?.x || 0) + (b?.y || 0) - (a?.x || 0) - (a?.y || 0),
      )[0] || WINDOW_DEFAULT_POSITION
  );
};
