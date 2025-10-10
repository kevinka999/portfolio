import { Icon } from "@/components";
import { useMSN, useWindows } from "@/hooks";
import { IconType, User, UserStatus } from "@/types";
import { Chat } from "../../components/Chat";

const headerButtons: { id: string; label: string; icon: IconType }[] = [
  { id: "add", label: "Add", icon: "users" },
  { id: "call", label: "Call", icon: "phone" },
];

export const MSN = () => {
  const { users, currentUser, createChat } = useMSN();
  const { openWindow } = useWindows();

  const onlineUsers = users.filter((user) => user.status === UserStatus.ONLINE);
  const offlineUsers = users.filter(
    (user) => user.status === UserStatus.OFFLINE,
  );

  const handleUserClick = (user: User) => {
    if (user.status === UserStatus.ONLINE) {
      const chatId = createChat(user.id);
      const windowId = chatId;

      openWindow(windowId, {
        id: windowId,
        icon: "msn",
        title: `Chat with ${user.name}`,
        content: <Chat chatId={windowId} />,
        initialSize: { width: 600, height: 500 },
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex flex-row gap-1">
        {headerButtons.map((button) => (
          <button
            key={button.id}
            className="button flex w-15 flex-col items-center gap-1 border-1 border-black p-2 text-sm"
          >
            <Icon icon={button.icon} size="medium" />
            {button.label}
          </button>
        ))}
      </div>

      <div className="boxshadow-win95-inset flex flex-1 flex-col gap-2 overflow-y-auto bg-white p-2">
        <div>
          <div className="flex items-center gap-1">
            <Icon icon="computer-connected" size="verySmall" />
            <h3 className="font-bold">Contacts currently online</h3>
          </div>

          <ul className="flex flex-col gap-1 pl-1">
            {onlineUsers.map((user) => (
              <li
                key={user.id}
                className="hover:bg-win95-blue flex cursor-pointer items-center gap-1 hover:text-white"
                onClick={() => handleUserClick(user)}
              >
                <Icon icon="green-user" size="verySmall" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-1">
            <Icon icon="computer-disconnected" size="verySmall" />
            <h3 className="font-bold">Contacts not online</h3>
          </div>

          <ul className="flex flex-col gap-1 pl-1">
            {offlineUsers.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-1 text-gray-800"
              >
                <Icon icon="red-user" size="verySmall" />
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="boxshadow-win95-inset flex h-15 w-full items-center justify-center gap-1 bg-white">
        <Icon icon="msn" size="medium" />
        <h1 className="font-bold">MNS Messenger Service</h1>
      </div>

      <div className="boxshadow-win95-inset flex items-center px-1.5 py-1 text-sm">
        <Icon icon="green-user" size="verySmall" />
        {currentUser.name} (online)
      </div>
    </div>
  );
};
