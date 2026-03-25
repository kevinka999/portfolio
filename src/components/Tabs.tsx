import { twMerge } from "tailwind-merge";

type TabsItem<T extends string> = {
  label: string;
  value: T;
};

type TabsProps<T extends string> = {
  items: TabsItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export const Tabs = <T extends string>({
  items,
  value,
  onChange,
  className,
}: TabsProps<T>) => {
  return (
    <div className={twMerge("boxshadow-win95 bg-win95-gray flex p-1", className)}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={twMerge(
            "px-3 py-1 text-sm",
            value === item.value ? "button active" : "hover:bg-white/50",
          )}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
