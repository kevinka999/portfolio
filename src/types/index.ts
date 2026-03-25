import { Icon } from "@/components/Icon";
import { AVAILABLE_LANGUAGES } from "@/const";

export type IconType = React.ComponentProps<typeof Icon>["icon"];

export enum AppsEnum {
  ABOUT = "about",
  EXPERIENCE = "experience",
  PROJECTS = "projects",
  CONTACT = "contact",
  MSN = "msn",
  INTERNET = "internet",
}

export type LanguageAvailables = keyof typeof AVAILABLE_LANGUAGES;

export * from "./msn";
export * from "./windows";
