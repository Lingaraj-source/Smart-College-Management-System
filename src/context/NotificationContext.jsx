import React, { useState, createContext, useCallback } from 'react';
import Toast from '../components/ui/Toast';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            <div className="fixed top-5 right-5 z-[100] space-y-2">
                {notifications.map(n => (
                    <Toast key={n.id} message={n.message} type={n.type} />
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    );
};