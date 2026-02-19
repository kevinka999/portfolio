import React from "react";
import { Icon } from "./Icon";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export type Media = {
  type: "image" | "video";
  src: string;
  alt: string;
  thumb?: string;
};

type CarouselProps = {
  medias: Media[];
};

type MediaComponentProps = {
  src: string;
  alt: string;
  thumb?: string;
};

const Video = ({ src, thumb }: MediaComponentProps) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <video src={src} controls className="h-full" poster={thumb}>
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-1 left-1 flex items-center rounded bg-red-600 px-1 py-0.5 text-xs text-white">
        <div className="mr-1">
          <Icon icon="video" size="small" />
        </div>
        VIDEO
      </div>
    </div>
  );
};

const Image = ({ src, alt }: MediaComponentProps) => {
  return (
    <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
  );
};

const mediaComponent: Record<
  Media["type"],
  (props: MediaComponentProps) => React.ReactNode
> = {
  image: Image,
  video: Video,
};

export const Carousel = ({ medias }: CarouselProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  };

  const currentMedia = medias[currentMediaIndex];

  return (
    <div className="boxshadow-win95 bg-black p-1">
      <div className="relative flex h-80 items-center justify-center bg-gray-900">
        {React.createElement(mediaComponent[currentMedia.type], {
          src: currentMedia.src,
          alt: currentMedia.alt,
          thumb: currentMedia.thumb,
        })}

        {medias.length > 1 && (
          <>
            <button
              onClick={prevMedia}
              className="button bg-win95-gray absolute top-1/2 left-1 -translate-y-1/2 transform cursor-pointer p-2"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextMedia}
              className="button bg-win95-gray absolute top-1/2 right-1 -translate-y-1/2 transform cursor-pointer p-2"
            >
              <FaArrowRight />
            </button>
          </>
        )}

        <div className="bg-opacity-70 absolute right-1 bottom-1 bg-black p-1 text-white">
          {currentMediaIndex + 1}/{medias.length}
        </div>
      </div>
    </div>
  );
};
