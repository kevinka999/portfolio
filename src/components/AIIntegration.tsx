import { systemPrompt } from "@/const/systemPrompt";
import { useAIChat, useMSN } from "@/hooks";
import React from "react";

const AI_USER_ID = "8lGvXNU39FiptfbiKyhUD";

export const AIIntegration = () => {
  const { chats, setTypingStatus, sendMessage } = useMSN();
  const { generateResponse } = useAIChat({
    systemPrompt,
  });

  const foundChat = Object.values(chats).find((chat) =>
    chat.participants.includes(AI_USER_ID),
  );

  const lastMessageRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (!foundChat) return;

    const lastMessage = foundChat.messages[foundChat.messages.length - 1];
    if (!lastMessage || lastMessage.senderId === AI_USER_ID) return;

    if (lastMessageRef.current === lastMessage.id) return;
    lastMessageRef.current = lastMessage.id;

    async function handleGenerateResponse() {
      setTypingStatus(AI_USER_ID, foundChat!.id, true);
      const response = await generateResponse(lastMessage.content);
      sendMessage(foundChat!.id, AI_USER_ID, response);
    }

    handleGenerateResponse();
  }, [foundChat, setTypingStatus, sendMessage, generateResponse]);

  return null;
};
