import React, { createContext, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const activeNotificationRef = React.useRef(null);

  const notificationService = {
    notify: (message, type = 'info', timeout = 3000) => {
      if (activeNotificationRef.current) {
        NotificationManager.remove(activeNotificationRef.current);
      }

      switch (type) {
        case 'success':
          activeNotificationRef.current = NotificationManager.success(message, 'Success', timeout);
          break;
        case 'error':
          activeNotificationRef.current = NotificationManager.error(message, 'Error', timeout);
          break;
        case 'warning':
          activeNotificationRef.current = NotificationManager.warning(message, 'Warning', timeout);
          break;
        case 'loading':
          activeNotificationRef.current = NotificationManager.info(message, 'Loading', 0);
          break;
        default:
          activeNotificationRef.current = NotificationManager.info(message, 'Info', timeout);
      }
      
      return {
        close: () => {
          if (activeNotificationRef.current) {
            NotificationManager.remove(activeNotificationRef.current);
            activeNotificationRef.current = null;
          }
        }
      };
    }
  };

  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === null) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
