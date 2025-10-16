import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootComponent } from "./Root";
import "./single-spa-config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);
