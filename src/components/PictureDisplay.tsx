import { twMerge } from "tailwind-merge";

type PictureDisplayProps = {
  alt: string;
  className?: string;
  image: string;
  label: string;
};

export const PictureDisplay = ({
  alt,
  className,
  image,
  label,
}: PictureDisplayProps) => {
  return (
    <div
      className={twMerge(
        "flex w-full min-w-0 flex-col gap-3 border border-stone-300 bg-stone-50 p-3",
        className,
      )}
    >
      <img src={image} alt={alt} className="h-auto w-full bg-white" />
      <p className="text-[14px] leading-6 text-stone-600 italic">{label}</p>
    </div>
  );
};
