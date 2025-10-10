import { MOCK_USERS } from "@/const";
import { Chat, Message, User, UserStatus } from "@/types/msn";
import { nanoid } from "nanoid";
import React from "react";

const currentUser: User = {
  id: "8ZqkVv2o9uL0xJ7cP1RsT",
  name: "You",
  status: UserStatus.ONLINE,
};

type MSNContextType = {
  users: User[];
  chats: Record<string, Chat>;
  currentUser: User;
  createChat: (participantId: string) => string;
  sendMessage: (chatId: string, content: string) => void;
  getChatByParticipant: (participantId: string) => Chat | undefined;
  getUsername: (userId: string) => string;
};

export const MSNContext = React.createContext<MSNContextType | undefined>(
  undefined,
);

export const MSNProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = React.useState<Record<string, Chat>>({});
  const [users] = React.useState<User[]>(MOCK_USERS);

  const createChat = (participantId: string): string => {
    const existingChat = Object.values(chats).find(
      (chat) =>
        chat.participants.includes(currentUser.id) &&
        chat.participants.includes(participantId),
    );

    if (existingChat) return existingChat.id;

    const newChat: Chat = {
      id: nanoid(),
      participants: [currentUser.id, participantId],
      messages: [],
    };

    setChats((prev) => ({ ...prev, [newChat.id]: newChat }));
    return newChat.id;
  };

  const sendMessage = (chatId: string, content: string) => {
    const chat = chats[chatId];
    if (!chat) return;

    const newMessage: Message = {
      id: nanoid(),
      senderId: currentUser.id,
      content,
      timestamp: Date.now(),
    };

    setChats((prev) => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: [...prev[chatId].messages, newMessage],
      },
    }));
  };

  const getChatByParticipant = (participantId: string) =>
    Object.values(chats).find(
      (chat) =>
        chat.participants.includes(currentUser.id) &&
        chat.participants.includes(participantId),
    );

  const getUsername = (userId: string): string => {
    if (userId === currentUser.id) return currentUser.name;
    const user = users.find((user) => user.id === userId);
    if (!user) return "";

    return user.name;
  };

  return (
    <MSNContext.Provider
      value={{
        users,
        chats,
        currentUser,
        createChat,
        sendMessage,
        getChatByParticipant,
        getUsername,
      }}
    >
      {children}
    </MSNContext.Provider>
  );
};
