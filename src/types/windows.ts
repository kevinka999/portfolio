import { IconType } from "./index";

export type WindowPosition = {
  x: number;
  y: number;
};

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowMetadata = {
  id: string;
  icon: IconType;
  title: string;
};

export type WindowInfo = WindowMetadata & {
  content: React.ReactNode;
  initialSize?: WindowSize;
  initialPosition?: WindowPosition;
};

export type WindowState = WindowInfo & {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
};
