import { Icon } from "@/components/Icon";
import { languages } from "@/const";

export type IconType = React.ComponentProps<typeof Icon>["icon"];

export enum AppsEnum {
  ABOUT = "about",
  PROJECTS = "projects",
  SKILLS = "skills",
  EXPERIENCE = "experience",
  CONTACT = "contact",
}

export type LanguageAvailables = keyof typeof languages;

export * from "./windows";
