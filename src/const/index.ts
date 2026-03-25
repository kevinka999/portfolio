import { User, UserStatus } from "@/types";

export const TASKBAR_HEIGHT = 40;
export const WINDOW_DEFAULT_INSET_RATIO = 0.1;
export const WINDOW_CASCADE_OFFSET = 20;
export const WINDOW_DEFAULT_POSITION = { x: 100, y: 50 };
export const WINDOW_MIN_SIZE = { width: 200, height: 150 };

export const AVAILABLE_LANGUAGES = {
  "pt-br": "Português (BR)",
  "en-us": "English (US)",
};

export const MOCK_USERS: User[] = [
  {
    id: "8lGvXNU39FiptfbiKyhUD",
    name: "Kevin Katzer",
    email: "kevinka999@gmail.com",
    status: UserStatus.ONLINE,
  },
  {
    id: "TMwyVwhwjn198Wa2Puawc",
    name: "John Doe",
    email: "john.doe@example.com",
    status: UserStatus.OFFLINE,
  },
];
