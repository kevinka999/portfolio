# agent.md

## Overview

This project is an artistic portfolio built in React that simulates an operating system inspired by Windows 95.

The app works like a desktop:

- [`src/App.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\App.tsx) renders the desktop, icons, taskbar, start menu, and all open windows.
- Each portfolio page should be treated like a system app.
- Each app appears in the interface inside a `DraggableWindow`.
- The content of each window lives in `src/screens`.

## Main structure

- [`src/App.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\App.tsx)
  Manages window opening, focus, and minimization, and renders the `DraggableWindow`s based on global state.
- [`src/components/DraggableWindow.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\components\DraggableWindow.tsx)
  Base component for draggable and resizable windows.
- [`src/const/windows.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\const\windows.tsx)
  Central app registry for the desktop: metadata, ids, icons, titles, content, and initial size.
- [`src/screens`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\screens)
  Folder for screens/apps. Each screen represents the internal content of a window.
- [`src/contexts/WindowsContext.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\contexts\WindowsContext.tsx)
  Controls the state of open, minimized, and focused windows.

## How to add a new app

1. Create the screen in `src/screens/ScreenName/index.tsx`.
2. Export the screen in [`src/screens/index.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\screens\index.tsx).
3. Register the app in [`src/const/windows.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\const\windows.tsx), defining:
   - `id`
   - `icon`
   - `title`
   - `content`
   - `initialPosition` or `initialSize` when it makes sense
4. If needed, add or update the app enum/type in `src/types`.

Important note:

- `App.tsx` uses `windowInfosMap` and `windowMetadataMap` to build the desktop, taskbar, and start menu.
- If the app is not properly registered in these maps, it will not appear or open.

## Implementation conventions

- Always use React Function Components.
- Prefer small components with a clear responsibility.
- Each page/app should be a component inside `@/screens`.
- Use the `@/` alias for internal imports whenever it makes sense.
- Whenever possible, move pure functions, constants, and static objects outside the component to avoid unnecessary recreation on each render.
- Avoid `React.useCallback` and `React.useMemo` by default.
- Only use `useCallback` or `useMemo` when there is a real and meaningful recalculation or rerender cost.

## Standard order inside components

Follow this order:

1. React states
2. hooks
3. functions and consts
4. return

Example organization:

```tsx
const EXTERNAL_OPTIONS = [...];

export const ExampleScreen = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { windows } = useWindows();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const label = isOpen ? "Open" : "Closed";

  return <div>{label}</div>;
};
```

## Screen pattern

- Each screen should represent the content of a window, not the window itself.
- The frame, dragging, resizing, and window controls belong to `DraggableWindow`.
- A screen should focus on layout, content, and internal page behavior.
- If a screen grows too much, split it into smaller components inside `src/components` or into a subfolder of that screen itself.

## Best practices for this project

- Preserve the retro operating system fantasy.
- Before creating new logic, check whether it belongs in:
  - `components` for reusable UI
  - `screens` for pages/apps
  - `contexts` for global state
  - `hooks` for reusable behavior
  - `utils` for pure functions
  - `const` for static configuration and registries
- Prefer explicit and clear typing.
- Keep components easy to read.

## Current observed state

- The `About`, `Projects`, `Skills`, `MSN`, and `Internet` screens are already connected to the window system.
- `Experience` and `Contact` already have metadata in `windows.tsx`, but currently use `content: <></>`.
- [`src/screens/index.tsx`](C:\Users\Kevin Katzer\Documents\Repositories\portfolio\src\screens\index.tsx) exports only the screens currently connected.

## Quick summary

Think about this project like this:

- `App.tsx` = desktop and window orchestration
- `windows.tsx` = app registry
- `screens/*` = content of each app
- `DraggableWindow` = system window shell
- `WindowsContext` = window state

When creating new features, maintain the Windows 95 desktop illusion and prefer simple composition instead of abstracting too early.
