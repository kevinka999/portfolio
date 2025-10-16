import { MFEConfig, MFEName } from "@/types/mfe";

export const MFE_CONFIG: Record<MFEName, MFEConfig> = {
  "@portfolio/guess-the-play": {
    name: "@portfolio/guess-the-play",
    url: "http://localhost:3001/assets/main.js",
    scope: "@portfolio/guess-the-play",
  },
};
