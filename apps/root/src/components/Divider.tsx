import { twMerge } from "tailwind-merge";

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => {
  const classes = twMerge(
    "bg-win95-gray-dark h-[3px] w-full border-b border-white",
    className,
  );

  return <div className={classes} />;
};
