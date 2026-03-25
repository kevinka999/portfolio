import { About, Contact, Experience, Internet, MSN, Project, Skills } from "@/screens";
import { AppsEnum, WindowInfo, WindowMetadata } from "@/types";

export const windowMetadataMap: Record<AppsEnum, WindowMetadata> = {
  [AppsEnum.ABOUT]: {
    id: "pQ3dY7GzTnMfX4v0H2jUb",
    icon: "computer",
    title: "About Me",
  },
  [AppsEnum.SKILLS]: {
    id: "jR7vT2zGxM1qW3nH8kD4p",
    icon: "internet",
    title: "Skills",
  },
  [AppsEnum.EXPERIENCE]: {
    id: "sN4xW2hR1cVg9KzY5bTqU",
    icon: "printer",
    title: "Experience",
  },
  [AppsEnum.CONTACT]: {
    id: "tF0mL8aE7RzP3uXyH5qCk",
    icon: "phone",
    title: "Contact",
  },
  [AppsEnum.PROJECTS]: {
    id: "Lk1rQeN8gVh9yWm5T2pZx",
    icon: "directory",
    title: "Projects",
  },
  [AppsEnum.MSN]: {
    id: "Zy2kUw4qXa3bVc6dF9hJk",
    icon: "msn",
    title: "MSN",
  },
  [AppsEnum.INTERNET]: {
    id: "sFjmsvOL6VsZPszmiwsXA",
    icon: "internet-explorer",
    title: "Internet",
  },
};

export const windowInfosMap: WindowInfo[] = [
  {
    ...windowMetadataMap[AppsEnum.ABOUT],
    content: <About />,
  },
  {
    ...windowMetadataMap[AppsEnum.PROJECTS],
    content: <Project />,
  },
  {
    ...windowMetadataMap[AppsEnum.SKILLS],
    content: <Skills />,
  },
  {
    ...windowMetadataMap[AppsEnum.EXPERIENCE],
    content: <Experience />,
  },
  {
    ...windowMetadataMap[AppsEnum.CONTACT],
    content: <Contact />,
  },
  {
    ...windowMetadataMap[AppsEnum.MSN],
    content: <MSN />,
    initialSize: { width: 300, height: 700 },
  },
  {
    ...windowMetadataMap[AppsEnum.INTERNET],
    content: <Internet />,
  },
];
