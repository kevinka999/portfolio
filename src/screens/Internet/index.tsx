import { Icon } from "@/components/Icon";
import type { IconType } from "@/types";
import { useState } from "react";

const QUICK_LINKS: { id: string; label: string; icon: IconType }[] = [
  { id: "home", label: "Home", icon: "network-globe" },
  { id: "search", label: "Search", icon: "search-folder" },
  { id: "favorites", label: "Favorites", icon: "world-click" },
  { id: "history", label: "History", icon: "directory" },
];

export const Internet = () => {
  const [address, setAddress] = useState("");

  return (
    <div className="flex h-full flex-col gap-2">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Type the Internet address of a document, and press Enter"
        className="boxshadow-win95-inset w-full shrink-0 border-0 bg-white px-2 py-1.5 text-sm outline-none"
        aria-label="Address"
      />

      <div className="shrink-0 border-t border-gray-400" />

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {QUICK_LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            className="hover:bg-win95-blue flex cursor-pointer items-center gap-1 px-2 py-1 text-sm hover:text-white"
          >
            <Icon icon={link.icon} size="verySmall" />
            {link.label}
          </button>
        ))}
      </div>

      <div className="boxshadow-win95-inset flex-1 bg-white" />
    </div>
  );
};
