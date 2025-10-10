import { MOCK_USERS } from "@/const";
import { Chat, Message, User, UserStatus } from "@/types/msn";
import { nanoid } from "nanoid";
import React from "react";

const currentUser: User = {
  id: "8ZqkVv2o9uL0xJ7cP1RsT",
  name: "You",
  email: "you@example.com",
  status: UserStatus.ONLINE,
};

type MSNContextType = {
  users: User[];
  chats: Record<string, Chat>;
  currentUser: User;
  createChat: (participantId: string) => string;
  sendMessage: (
    chatId: string,
    senderId: string,
    content: string,
  ) => Promise<void>;
  getChatByParticipant: (participantId: string) => Chat | undefined;
  getUsername: (userId: string) => string;
  setTypingStatus: (userId: string, chatId: string, isTyping: boolean) => void;
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
      typing: {},
    };

    setChats((prev) => ({ ...prev, [newChat.id]: newChat }));
    return newChat.id;
  };

  const sendMessage = async (
    chatId: string,
    senderId: string,
    content: string,
  ) => {
    const chat = chats[chatId];
    if (!chat) return;

    const newMessage: Message = {
      id: nanoid(),
      senderId,
      content,
      timestamp: Date.now(),
    };

    setChats((prev) => {
      return {
        ...prev,
        [chatId]: {
          ...prev[chatId],
          typing: {
            ...prev[chatId].typing,
            [senderId]: false,
          },
          messages: [...prev[chatId].messages, newMessage],
        },
      };
    });
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

  const setTypingStatus = (
    userId: string,
    chatId: string,
    isTyping: boolean,
  ) => {
    setChats((prev) => {
      const chat = prev[chatId];
      if (!chat) return prev;

      return {
        ...prev,
        [chatId]: {
          ...chat,
          typing: {
            ...chat.typing,
            [userId]: isTyping,
          },
        },
      };
    });
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
        setTypingStatus,
      }}
    >
      {children}
    </MSNContext.Provider>
  );
};
