export enum UserStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type User = {
  id: string;
  name: string;
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
  participants: [string, string];
  messages: Message[];
};
