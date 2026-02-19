import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootComponent } from "./Root";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);
