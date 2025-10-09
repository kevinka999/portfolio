import { Icon } from "@/components/Icon";
import { AVAILABLE_LANGUAGES } from "@/const";

export type IconType = React.ComponentProps<typeof Icon>["icon"];

export enum AppsEnum {
  ABOUT = "about",
  PROJECTS = "projects",
  SKILLS = "skills",
  EXPERIENCE = "experience",
  CONTACT = "contact",
  MSN = "msn",
}

export type LanguageAvailables = keyof typeof AVAILABLE_LANGUAGES;

export * from "./windows";
