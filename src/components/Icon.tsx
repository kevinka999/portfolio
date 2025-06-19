import { twMerge } from "tailwind-merge";

type IconAvailable =
  | "computer"
  | "directory"
  | "internet-folder"
  | "internet"
  | "logo"
  | "phone"
  | "notepad"
  | "outlook"
  | "printer"
  | "search-folder"
  | "network-globe"
  | "plug-out";

type IconProps = {
  icon: IconAvailable;
  className?: string;
  alt?: string;
  size: "small" | "medium" | "large";
};

const iconMap: Record<IconAvailable, string> = {
  computer: "/images/computer.png",
  directory: "/images/directory.png",
  "internet-folder": "/images/internet-folder.png",
  internet: "/images/internet.png",
  logo: "/images/logo.png",
  phone: "/images/phone.png",
  notepad: "/images/notepad.png",
  outlook: "/images/outlook.png",
  printer: "/images/printer.png",
  "search-folder": "/images/search-folder.png",
  "network-globe": "/images/network-globe.png",
  "plug-out": "/images/plug-out.png",
};

const sizeMap: Record<IconProps["size"], string> = {
  small: "w-6 h-6",
  medium: "w-8 h-8",
  large: "w-12 h-12",
};

export const Icon = ({ icon, className, size, alt = "Icon" }: IconProps) => {
  return (
    <img
      src={iconMap[icon]}
      alt={alt}
      className={twMerge(className, sizeMap[size])}
    />
  );
};
