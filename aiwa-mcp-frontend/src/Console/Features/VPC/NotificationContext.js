import React, { createContext, useContext, useState } from 'react';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const notify = (message, type) => {
        switch (type) {
            case 'success':
                NotificationManager.success(message);
                break;
            case 'error':
                NotificationManager.error(message);
                break;
            case 'info':
                NotificationManager.info(message);
                break;
            default:
                break;
        }
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <NotificationContainer />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
