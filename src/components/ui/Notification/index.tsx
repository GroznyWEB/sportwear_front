// components/ui/Notification.tsx
import React, { useState, useEffect } from 'react';
import styles from './Notification.module.scss';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose?: () => void;
}

const CustomNotification : React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  console.log('aaaaaaaaaaaaaaaaaaaaaa');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'error': return <FaTimes />;
      case 'warning': return <FaExclamationTriangle />;
      default: return <FaInfoCircle />;
    }
  };

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.icon}>{getIcon(type)}</div>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
};

export default CustomNotification ;