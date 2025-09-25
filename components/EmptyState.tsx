import React from 'react';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    message: string;
    actionText?: string;
    onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, actionText, onAction }) => (
    <div className="text-center py-20 bg-[var(--background-secondary)] rounded-2xl flex flex-col items-center">
        <div className="text-[var(--text-faint)] w-16 h-16 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-[var(--text-primary)]">{title}</h3>
        <p className="text-[var(--text-muted)] mt-2 max-w-sm">{message}</p>
        {actionText && onAction && (
            <button onClick={onAction} className="mt-6 inline-block bg-[var(--accent-primary)] text-white font-bold py-2.5 px-6 rounded-full hover:bg-[var(--accent-secondary)] transition-colors">
                {actionText}
            </button>
        )}
    </div>
);

export default EmptyState;
