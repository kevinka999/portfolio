import { useEffect, useState } from "react";

const DEFAULT_SMILE = ":)";
const WINK_SMILE = ";)";
const WINK_INTERVAL_MS = 4000;
const WINK_DURATION_MS = 300;

export const BlinkingSmile = () => {
  const [smile, setSmile] = useState(DEFAULT_SMILE);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSmile(WINK_SMILE);

      window.setTimeout(() => {
        setSmile(DEFAULT_SMILE);
      }, WINK_DURATION_MS);
    }, WINK_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return smile;
};
