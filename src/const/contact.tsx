import type { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export type ContactLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

export const CONTACT_EMAIL = "kevinka999@gmail.com";

export const contactLinks: ContactLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/kevinkatzer",
    icon: <FaGithub size={12} aria-hidden="true" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kevinkatzer/",
    icon: <FaLinkedin size={12} aria-hidden="true" />,
  },
];
