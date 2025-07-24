import { Icon } from "@/components/Icon";
import { languages } from "@/const";

export type IconType = React.ComponentProps<typeof Icon>["icon"];

export type WindowState = {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialSize?: { width: number; height: number };
  initialPosition?: { x: number; y: number };
};

export type WindowInfo = {
  icon: IconType;
  title: string;
};

export enum WindowsEnum {
  ABOUT = "about",
  PROJECTS = "projects",
  SKILLS = "skills",
  EXPERIENCE = "experience",
  CONTACT = "contact",
}

export type Windows = Record<WindowsEnum, WindowState>;
export type WindowsInfo = Record<WindowsEnum, WindowInfo>;

export type LanguageAvailables = keyof typeof languages;
