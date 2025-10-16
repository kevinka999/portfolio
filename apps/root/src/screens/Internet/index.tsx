import { MFE_CONFIG } from "@/const/mfe";
import React from "react";
import { mountRootParcel } from "single-spa";

export const Internet = () => {
  const [error, setError] = React.useState<string | null>(null);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    let parcel: any;

    const loadParcel = async () => {
      try {
        const mfeConfig = MFE_CONFIG["@portfolio/guess-the-play"];

        if (!mfeConfig) {
          throw new Error(
            `MFE @portfolio/guess-the-play not found in configuration`,
          );
        }

        parcel = mountRootParcel(
          () => System.import("@portfolio/guess-the-play"),
          {
            domElement: ref.current!,
          },
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load MFE");
        console.error("Failed to load MFE:", err);
      }
    };

    loadParcel();

    return () => {
      if (parcel) parcel.unmount();
    };
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading application: {error}</p>
      </div>
    );
  }

  return <div ref={ref} />;
};
