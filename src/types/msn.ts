export enum UserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type User = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
  typing: Record<string, boolean>;
};
