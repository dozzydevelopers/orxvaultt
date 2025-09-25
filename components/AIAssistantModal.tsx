
import React from 'react';

interface AIAssistantModalProps {
    title: string;
    content: string;
    isLoading: boolean;
    onClose: () => void;
    onApply: () => void;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ title, content, isLoading, onClose, onApply }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-lg w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="my-6 min-h-[100px] bg-[var(--background-primary)] p-4 rounded-lg">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-secondary)]"></div>
                        </div>
                    ) : (
                        <p className="text-[var(--text-secondary)] whitespace-pre-wrap">{content}</p>
                    )}
                </div>
                <div className="flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 border border-[var(--border-color-light)] text-[var(--text-secondary)] font-bold py-2.5 rounded-xl hover:bg-[var(--background-primary)] transition-colors">Close</button>
                    <button type="button" onClick={onApply} disabled={isLoading} className="flex-1 bg-[var(--accent-primary)] text-white font-bold py-2.5 rounded-xl hover:bg-[var(--accent-secondary)] transition-colors disabled:opacity-50">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;