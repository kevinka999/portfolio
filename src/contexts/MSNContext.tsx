import { MOCK_USERS } from "@/const";
import { useSystemNotification, useWindows } from "@/hooks";
import { Chat, Message, User, UserStatus } from "@/types/msn";
import { nanoid } from "nanoid";
import React from "react";

const currentUser: User = {
  id: "8ZqkVv2o9uL0xJ7cP1RsT",
  name: "You",
  email: "you@example.com",
  status: UserStatus.ONLINE,
};

type MessageNotification = {
  chatId: string;
  messageId: string;
  senderId: string;
  content: string;
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
  const [messageNotifications, setMessageNotifications] = React.useState<
    MessageNotification[]
  >([]);
  const [users] = React.useState<User[]>(MOCK_USERS);
  const { addNotification } = useSystemNotification();
  const { windows, openWindow } = useWindows();

  React.useEffect(() => {
    if (messageNotifications.length === 0) return;

    messageNotifications.forEach((notification) => {
      const chat = chats[notification.chatId];
      if (!chat) return;

      const isChatWindowOpen = Object.values(windows).some(
        (window) =>
          window.id === notification.chatId &&
          window.isOpen &&
          !window.isMinimized,
      );

      if (!isChatWindowOpen) {
        const sender = users.find((user) => user.id === notification.senderId);
        if (sender) {
          addNotification({
            title: "Você tem uma nova mensagem",
            message: `${sender.name} te enviou uma mensagem, clique para ver`,
            onClick: () => {
              const chat = chats[notification.chatId];
              if (chat) openWindow(chat.id);
            },
            type: "info",
          });
        }
      }
    });

    setMessageNotifications([]);
  }, [
    messageNotifications,
    openWindow,
    windows,
    chats,
    users,
    addNotification,
  ]);

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

    if (senderId !== currentUser.id) {
      setMessageNotifications((prev) => [
        ...prev,
        {
          chatId,
          messageId: newMessage.id,
          senderId,
          content: newMessage.content,
        },
      ]);
    }

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
