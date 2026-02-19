import React from "react";

interface UseDoubleClickOptions {
  onDoubleClick: (id: string) => void;
  delay?: number;
}

export const useDoubleClick = ({
  onDoubleClick,
  delay = 500,
}: UseDoubleClickOptions) => {
  // Store last click time for each id
  const [lastClickTime, setLastClickTime] = React.useState<
    Record<string, number>
  >({});

  // Handle click event
  const handleClick = React.useCallback(
    (id: string) => {
      const now = Date.now();
      const lastClick = lastClickTime[id] || 0;
      const timeDiff = now - lastClick;

      // If the time difference is less than delay, consider it a double click
      if (timeDiff < delay) {
        onDoubleClick(id);
        // Reset the last click time
        setLastClickTime((prev) => ({ ...prev, [id]: 0 }));
      } else {
        // Update the last click time
        setLastClickTime((prev) => ({ ...prev, [id]: now }));
      }
    },
    [delay, lastClickTime, onDoubleClick],
  );

  return { onClick: handleClick };
};
