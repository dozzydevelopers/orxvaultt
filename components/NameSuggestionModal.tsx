
import React from 'react';

interface NameSuggestionModalProps {
    title: string;
    names: string[];
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
    onSelect: (name: string) => void;
}

const NameSuggestionModal: React.FC<NameSuggestionModalProps> = ({ title, names, isLoading, error, onClose, onSelect }) => {
    const handleSelect = (name: string) => {
        onSelect(name);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
            <div className="bg-[var(--background-secondary)] p-6 rounded-2xl max-w-lg w-full shadow-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="my-6 min-h-[200px] bg-[var(--background-primary)] p-2 rounded-lg flex flex-col">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full flex-1">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-secondary)]"></div>
                            <p className="ml-4 text-[var(--text-muted)]">Generating ideas...</p>
                        </div>
                    ) : error ? (
                         <div className="flex items-center justify-center h-full p-4 text-center flex-1">
                            <p className="text-[var(--error-text-body)]">{error}</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {names.map((name, index) => (
                                <li key={index}>
                                    <button 
                                        onClick={() => handleSelect(name)}
                                        className="w-full text-left p-3 rounded-md hover:bg-[var(--border-color-light)] transition-colors text-[var(--text-secondary)]"
                                    >
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex">
                    <button type="button" onClick={onClose} className="w-full border border-[var(--border-color-light)] text-[var(--text-secondary)] font-bold py-2.5 rounded-xl hover:bg-[var(--background-primary)] transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

export default NameSuggestionModal;
