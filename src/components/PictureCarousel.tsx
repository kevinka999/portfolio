import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type CarouselItem = {
  src: string;
  alt: string;
  label: string;
  offset?: string;
};

type PictureCarouselProps = {
  items: CarouselItem[];
};

export const PictureCarousel = ({ items }: PictureCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex w-full flex-col gap-3 border border-stone-300 bg-stone-50 p-3">
      <div className="relative overflow-hidden border border-stone-300 bg-white">
        <img
          src={currentItem.src}
          alt={currentItem.alt}
          className="h-89 w-full object-cover md:h-105"
          style={{ objectPosition: currentItem.offset ?? "center" }}
        />

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="button picture-carousel-nav absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center"
              aria-label="Previous image"
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="button picture-carousel-nav absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center"
              aria-label="Next image"
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-[14px] leading-6 text-stone-600 italic">
          {currentItem.label}
        </p>

        <div className="flex items-center gap-2 text-[14px] leading-5 font-normal text-stone-600">
          {items.map((item, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`button min-w-8 cursor-pointer px-2 py-1 ${isActive && "active"}`}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isActive}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
