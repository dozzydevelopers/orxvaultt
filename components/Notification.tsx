
import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from './Icons';

const icons = {
    success: <CheckCircleIcon className="w-6 h-6 text-green-400" />,
    error: <XCircleIcon className="w-6 h-6 text-red-400" />,
    info: <InformationCircleIcon className="w-6 h-6 text-blue-400" />,
};

const Notification: React.FC = () => {
    const { notification } = useNotification();

    if (!notification.message) {
        return null;
    }

    return (
        <div
            className="fixed bottom-6 right-6 z-[200] bg-[var(--background-secondary)] text-[var(--text-primary)] px-4 py-3 rounded-xl shadow-lg border border-[var(--border-color-light)] animate-slide-in-then-fade-out flex items-center gap-3"
            role="alert"
        >
            {icons[notification.type]}
            <p className="font-semibold text-sm">{notification.message}</p>
        </div>
    );
};

export default Notification;