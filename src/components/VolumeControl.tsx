import { useAudio } from "@/hooks";
import React from "react";
import { BiVolumeFull } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";

const sliderToVolume = (value: number) => value / 100;
const volumeToSlider = (value: number) => Math.round(value * 100);

export const VolumeControl = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { sfxVolume, ambientVolume, setSfxVolume, setAmbientVolume } =
    useAudio();

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

  return (
    <div className="relative flex h-full w-full" ref={dropdownRef}>
      <button
        className={twMerge(
          "bg-win95-gray flex h-full items-center justify-center px-2 hover:bg-white/50",
          isOpen && "active",
        )}
        onClick={() => setIsOpen((prev) => !prev)}
        title="Sound Controls"
      >
        <Icon icon="speaker" size="verySmall" />
      </button>

      {isOpen && (
        <div
          className="boxshadow-win95 bg-win95-gray absolute right-0 bottom-full mb-1 flex w-60 flex-col gap-3 p-3"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span>SFX</span>
              <span>{volumeToSlider(sfxVolume)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volumeToSlider(sfxVolume)}
              onChange={(event) =>
                setSfxVolume(sliderToVolume(Number(event.target.value)))
              }
              className="win95-slider w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <span>Background</span>
              <span>{volumeToSlider(ambientVolume)}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volumeToSlider(ambientVolume)}
              onChange={(event) =>
                setAmbientVolume(sliderToVolume(Number(event.target.value)))
              }
              className="win95-slider w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
