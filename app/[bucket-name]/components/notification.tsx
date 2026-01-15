import { Button } from "../../../components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

interface NotificationProps {
  notification: {
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null;
  onClose: () => void;
}

export const Notification = ({ notification, onClose }: NotificationProps) => {
  if (!notification) return null;

  return (
    <div className="fixed top-16 right-4 z-40 w-96">
      <Alert
        variant={notification.type === "error" ? "destructive" : "default"}
        className={`border-l-4 relative shadow-lg ${
          notification.type === "success"
            ? "border-l-green-500 bg-green-50 dark:bg-zinc-900"
            : notification.type === "error"
            ? "border-l-red-500 bg-white dark:bg-zinc-900"
            : notification.type === "info"
            ? "border-l-blue-500 bg-blue-50 dark:bg-zinc-900"
            : "border-l-yellow-500 bg-yellow-50 dark:bg-zinc-900"
        }`}
      >
        {notification.type === "success" && (
          <CheckCircle className="h-4 w-4 text-green-600" />
        )}
        {notification.type === "error" && (
          <XCircle className="h-4 w-4 text-red-600" />
        )}
        {notification.type === "warning" && (
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
        )}
        {notification.type === "info" && (
          <Info className="h-4 w-4 text-blue-600" />
        )}
        <AlertTitle
          className={
            notification.type === "success"
              ? "text-green-800 dark:text-green-200"
              : notification.type === "warning"
              ? "text-yellow-800 dark:text-yellow-200"
              : notification.type === "info"
              ? "text-blue-800 dark:text-blue-200"
              : ""
          }
        >
          {notification.title}
        </AlertTitle>
        <AlertDescription
          className={
            notification.type === "success"
              ? "text-green-700 dark:text-green-300"
              : notification.type === "warning"
              ? "text-yellow-700 dark:text-yellow-300"
              : notification.type === "info"
              ? "text-blue-700 dark:text-blue-300"
              : ""
          }
        >
          {notification.message}
        </AlertDescription>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={onClose}
        >
          <X className="h-3 w-3" />
        </Button>
      </Alert>
    </div>
  );
};
