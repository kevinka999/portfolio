import { App } from "./App.tsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.tsx";
import { MSNProvider } from "./contexts/MSNContext.tsx";
import { WindowsProvider } from "./contexts/WindowsContext.tsx";

import "./global.css";

export const RootComponent = () => {
  return (
    <GlobalContextProvider>
      <WindowsProvider>
        <MSNProvider>
          <App />
        </MSNProvider>
      </WindowsProvider>
    </GlobalContextProvider>
  );
};
