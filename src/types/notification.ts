export type SystemNotification = {
  id: string;
  title: string;
  type: "info" | "warning" | "error";
  message: string;
  timestamp: number;
  onClick: () => void;
};
