import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.tsx";

import "./global.css";

const RootComponent = () => {
  return (
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
);
