import { AVAILABLE_LANGUAGES } from "@/const";
import { useGlobal } from "@/hooks";
import { LanguageAvailables } from "@/types";
import React from "react";
import { twMerge } from "tailwind-merge";

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { currentLanguage, setLanguage } = useGlobal();

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageClick = (language: LanguageAvailables) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative flex h-full w-full" ref={dropdownRef}>
      <button
        className={twMerge(
          "bg-win95-gray flex h-full items-center justify-center px-2 hover:bg-white/50",
          isOpen && "active",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={`/images/${currentLanguage}.png`}
          alt={currentLanguage}
          className="h-4 w-6"
        />
      </button>

      {isOpen && (
        <div className="boxshadow-win95 bg-win95-gray absolute right-0 bottom-full mb-1 flex w-max min-w-[120px] flex-col gap-1 p-1">
          {Object.entries(AVAILABLE_LANGUAGES).map(([key, value]) => (
            <button
              key={key}
              className={twMerge(
                "button flex w-full items-center gap-2 px-2 py-1 whitespace-nowrap",
                currentLanguage === key && "active",
              )}
              onClick={() => handleLanguageClick(key as LanguageAvailables)}
            >
              <img src={`/images/${key}.png`} alt={value} className="h-4 w-6" />
              <span className="text-xs">{value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
