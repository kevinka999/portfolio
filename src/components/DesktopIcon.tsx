import { IconType } from "@/types";
import { Icon } from "./Icon";

type DesktopIconProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
  onHover?: () => void;
};

export const DesktopIcon = ({
  icon,
  label,
  onClick,
  onHover,
}: DesktopIconProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={
        "hover:bg-win95-blue flex w-20 flex-col items-center p-1 hover:text-white"
      }
      onClick={handleClick}
      onMouseEnter={onHover}
    >
      <div className="p-1 select-none">
        <Icon icon={icon} size="large" />
      </div>
      <div className="mt-1 px-1 text-center text-xs select-none">{label}</div>
    </div>
  );
};
