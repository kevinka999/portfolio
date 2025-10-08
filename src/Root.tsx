import { App } from "./App.tsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.tsx";
import { WindowsProvider } from "./contexts/WindowsContext.tsx";

import "./global.css";

export const RootComponent = () => {
  return (
    <GlobalContextProvider>
      <WindowsProvider>
        <App />
      </WindowsProvider>
    </GlobalContextProvider>
  );
};
