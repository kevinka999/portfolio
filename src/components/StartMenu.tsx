import { windowMetadataMap } from "@/const/windows";
import { AppsEnum } from "@/types";
import { Icon } from "./Icon";

type StartMenuProps = {
  apps: AppsEnum[];
  onItemClick: (itemId: string) => void;
};

export const StartMenu = ({ apps, onItemClick }: StartMenuProps) => {
  const handleMenuItemClick = (itemId: string) => {
    onItemClick(itemId);
  };

  return (
    <div
      className="boxshadow-win95 bg-win95-gray absolute bottom-10 left-0 z-50 flex flex-row"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-win95-gray-dark ml-1 flex h-auto items-end justify-end overflow-hidden px-1">
        <div className="pb-2 text-xl font-bold text-white [writing-mode:sideways-lr]">
          <span className="font-bold tracking-widest">Windows</span>
          <span className="mb-1 font-extralight tracking-widest">95</span>
        </div>
      </div>

      <div className="border-win95-gray border-l-8 py-2">
        {apps.map((app) => {
          const appMetadata = windowMetadataMap[app];

          return (
            <button
              key={appMetadata.id}
              className="hover:bg-win95-blue flex w-full items-center px-4 py-1 hover:text-white"
              onClick={() => handleMenuItemClick(appMetadata.id)}
            >
              <span className="mr-3 text-lg">
                <Icon icon={appMetadata.icon} size="medium" />
              </span>
              <span className="text-sm">{appMetadata.title}</span>
            </button>
          );
        })}

        <div className="my-1 border-t border-gray-400"></div>

        <div className="hover:bg-win95-blue flex items-center px-4 py-1 hover:text-white">
          <span className="mr-3 text-lg text-red-600">
            {<Icon icon="plug-out" size="medium" />}
          </span>
          <span className="text-sm select-none">Shut Down...</span>
        </div>
      </div>
    </div>
  );
};
