import { Icon } from "@/components/Icon";
import type { IconType } from "@/types";
import { useCallback, useState } from "react";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";

const QUICK_LINKS: {
  id: string;
  label: string;
  icon: IconType;
  url: string;
}[] = [
  {
    id: "poke-arena",
    label: "Poke Arena",
    icon: "fav-pokearena",
    url: import.meta.env.VITE_POKEARENA_PATH,
  },
];

function toAbsoluteUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

const defaultUrl = QUICK_LINKS[0]?.url ?? "";

export const Internet = () => {
  const [address, setAddress] = useState(defaultUrl);
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [iframeKey, setIframeKey] = useState(0);

  const navigate = useCallback(() => {
    const url = toAbsoluteUrl(address);
    if (url) setCurrentUrl(url);
  }, [address]);

  const refresh = useCallback(() => {
    if (currentUrl) setIframeKey((k) => k + 1);
  }, [currentUrl]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") navigate();
    },
    [navigate],
  );

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex shrink-0 items-center gap-1">
        <span
          role="button"
          onClick={refresh}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              refresh();
            }
          }}
          aria-label="Refresh"
          className="hover:bg-win95-blue flex shrink-0 cursor-pointer items-center justify-center p-1.5 hover:text-white"
        >
          <FiRefreshCw size={16} />
        </span>

        <span
          role="button"
          onClick={navigate}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (currentUrl !== defaultUrl) {
                navigate();
              }
            }
          }}
          aria-label="Go"
          className="hover:bg-win95-blue flex shrink-0 cursor-pointer items-center justify-center p-1.5 hover:text-white"
        >
          <FiArrowRight size={16} />
        </span>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type the Internet address of a document, and press Enter"
          className="boxshadow-win95-inset min-w-0 flex-1 border-0 bg-white px-2 py-1.5 text-sm outline-none"
          aria-label="Address"
        />
      </div>

      <div className="shrink-0 border-t border-gray-400" />

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {QUICK_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => {
              setAddress(link.url);
              setCurrentUrl(link.url);
            }}
            className="hover:bg-win95-blue flex cursor-pointer items-center gap-1 px-2 py-1 text-sm hover:text-white"
          >
            <Icon icon={link.icon} size="verySmall" />
            {link.label}
          </button>
        ))}
      </div>

      <div className="boxshadow-win95-inset flex min-h-0 flex-1 overflow-hidden bg-white">
        {currentUrl ? (
          <iframe
            key={iframeKey}
            src={currentUrl}
            title="Browser content"
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : null}
      </div>
    </div>
  );
};
