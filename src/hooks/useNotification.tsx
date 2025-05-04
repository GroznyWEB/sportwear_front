import { useState } from "react";
import CustomNotification from "../components/ui/Notification/index"; // Изменили импорт

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationOptions {
  type?: NotificationType;
  duration?: number;
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      message: string;
      type: NotificationType;
    }>
  >([]);

  const showNotification = (
    message: string,
    options: NotificationOptions = {}
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [
      ...prev,
      { id, message, type: options.type || "info" },
    ]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, options.duration || 3000);
  };

  const NotificationComponent = () => {
    return (
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <CustomNotification
            key={index}
            message={notification.message}
            type={notification.type}
          />
        ))}
      </div>
    );
  };

  return { showNotification, NotificationComponent }; // Исправлено имя возвращаемого свойства
};

export default useNotification;
