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
  | "plug-out"
  | "video"
  | "image"
  | "world-click"
  | "multiple-note"
  | "msn"
  | "users"
  | "green-user"
  | "red-user"
  | "black-user"
  | "computer-connected"
  | "computer-disconnected"
  | "warning"
  | "error"
  | "info";

type IconProps = {
  icon: IconAvailable;
  className?: string;
  alt?: string;
  size: "verySmall" | "small" | "medium" | "large";
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
  video: "/images/video.png",
  image: "/images/image.png",
  "world-click": "/images/world-click.png",
  "multiple-note": "/images/multiple-note.png",
  msn: "/images/msn.png",
  users: "/images/users.svg",
  "green-user": "/images/green-user.svg",
  "red-user": "/images/red-user.svg",
  "black-user": "/images/black-user.svg",
  "computer-connected": "/images/conn_pcs_on_on.png",
  "computer-disconnected": "/images/conn_pcs_no_network.png",
  warning: "/images/warning.png",
  error: "/images/error.png",
  info: "/images/info.png",
};

const sizeMap: Record<IconProps["size"], string> = {
  verySmall: "w-4 h-4",
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
