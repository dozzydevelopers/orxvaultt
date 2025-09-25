

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface NotificationState {
    message: string | null;
    type: 'success' | 'error' | 'info';
}

interface NotificationContextType {
    notification: NotificationState;
    showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<NotificationState>({ message: null, type: 'info' });

    const hideNotification = useCallback(() => {
        setNotification({ message: null, type: 'info' });
    }, []);

    const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => {
            hideNotification();
        }, 3000); // Auto-hide after 3 seconds
    }, [hideNotification]);


    return (
        <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
