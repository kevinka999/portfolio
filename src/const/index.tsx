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
    icon: "directory",
    title: "Experience",
  },
  [WindowsEnum.CONTACT]: {
    icon: "phone",
    title: "Contact",
  },
  [WindowsEnum.PROJECTS]: {
    icon: "printer",
    title: "Projects",
  },
};

export const taskbarHeight = 40;
