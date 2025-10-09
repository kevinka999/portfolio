import { User, UserStatus } from "@/types";

export const TASKBAR_HEIGHT = 40;

export const AVAILABLE_LANGUAGES = {
  "pt-br": "Português (BR)",
  "en-us": "English (US)",
};

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Kevin Katzer",
    status: UserStatus.ONLINE,
  },
  {
    id: "2",
    name: "John Doe",
    status: UserStatus.OFFLINE,
  },
];
