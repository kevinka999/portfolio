import { WindowsEnum, WindowsInfo } from "@/types";

export const windowInfos: WindowsInfo = {
  [WindowsEnum.ABOUT]: {
    icon: "computer",
    title: "About Me",
  },
  [WindowsEnum.SKILLS]: {
    icon: "internet",
    title: "Skills",
  },
  [WindowsEnum.EXPERIENCE]: {
    icon: "printer",
    title: "Experience",
  },
  [WindowsEnum.CONTACT]: {
    icon: "phone",
    title: "Contact",
  },
  [WindowsEnum.PROJECTS]: {
    icon: "directory",
    title: "Projects",
  },
};

export const taskbarHeight = 40;

export const languages = {
  "pt-br": "Português (BR)",
  "en-us": "English (US)",
};
