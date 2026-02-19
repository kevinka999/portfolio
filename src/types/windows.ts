import { IconType } from "./index";

export type WindowMetadata = {
  id: string;
  icon: IconType;
  title: string;
};

export type WindowInfo = WindowMetadata & {
  content: React.ReactNode;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
};

export type WindowState = WindowInfo & {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
};
