import { useMSN } from "@/hooks";
import dayjs from "dayjs";
import React from "react";

type ChatProps = {
  chatId: string;
};

export const Chat = ({ chatId }: ChatProps) => {
  const [newMessage, setNewMessage] = React.useState<string>("");
  const { users, chats, sendMessage, getUsername, currentUser } = useMSN();

  const chat = chats[chatId];
  if (!chat) return null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(chat.id, currentUser.id, newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const lastMessage = chat.messages[chat.messages.length - 1] || null;
  const participantUser = users.find(
    (user) => user.id === chat.participants[1],
  );
  const isParticipantTyping = chat.typing[participantUser?.id || ""];

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="text-sm">
        To: {participantUser?.name}
        {" <"}
        {participantUser?.email}
        {">"}
      </div>

      <div className="boxshadow-win95-inset flex flex-1 flex-col gap-2 overflow-y-auto bg-white p-2">
        {chat.messages.map((message, index) => {
          const username = getUsername(message.senderId);

          return (
            <div key={`${message.id}-${index}`} className="text-left">
              <div className="text-sm">{username} says:</div>
              <div className="text-lg">{message.content}</div>
            </div>
          );
        })}

        {isParticipantTyping && (
          <div className="text-sm text-gray-600 italic">
            {participantUser?.name} is typing...
          </div>
        )}
      </div>

      <div className="flex w-full gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="boxshadow-win95-inset flex-1 resize-none bg-white p-1"
        />
        <button
          onClick={handleSendMessage}
          className="button cursor-pointer border-1 border-black p-4"
        >
          <span className="underline">S</span>
          end
        </button>
      </div>

      <div className="boxshadow-win95-inset flex items-center px-1.5 py-1 text-sm">
        {lastMessage ? (
          <>
            Last message received on{" "}
            {dayjs(lastMessage.timestamp).format("M/D/YY")} at{" "}
            {dayjs(lastMessage.timestamp).format("h:mma")}
          </>
        ) : (
          <>No messages yet</>
        )}
      </div>
    </div>
  );
};
