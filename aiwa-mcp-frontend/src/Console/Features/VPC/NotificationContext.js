import React, { createContext, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const notify = (message, type = 'info', timeout = 3000) => {
    switch (type) {
      case 'success':
        NotificationManager.success(message, 'Success', timeout);
        break;
      case 'error':
        NotificationManager.error(message, 'Error', timeout);
        break;
      case 'warning':
        NotificationManager.warning(message, 'Warning', timeout);
        break;
      default:
        NotificationManager.info(message, 'Info', timeout);
    }
  };

  return (
    <NotificationContext.Provider value={notify}>
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
