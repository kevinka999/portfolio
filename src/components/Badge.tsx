import { twMerge } from "tailwind-merge";

type BadgeProps = {
  text: string;
  size?: "small" | "medium" | "large";
};

const sizeMap: Record<NonNullable<BadgeProps["size"]>, string> = {
  small: "px-1 py-0.5 text-xs ",
  medium: "px-2 py-1 text-sm ",
  large: "px-3 py-2 text-base ",
};

export const Badge = ({ text, size = "medium" }: BadgeProps) => {
  return (
    <span className={twMerge("bg-win95-gray boxshadow-win95", sizeMap[size])}>
      {text}
    </span>
  );
};
